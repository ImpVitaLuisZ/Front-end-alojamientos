import test from 'node:test';
import assert from 'node:assert/strict';
import { registrarUsuario, iniciarSesionAPI, consultarPerfil, listarUsuariosAdmin } from '../src/js/api/auth.api.js';
import { guardarSesion, obtenerSesion } from '../src/js/state/sesion.js';
const originalFetch = globalThis.fetch;
const originalStorage = globalThis.sessionStorage;
const usuario = { id: 9, correo: 'prueba@example.com', rol: 'usuario' };
const datos = { correo: usuario.correo, contrasena: 'solo-fixture' };
const respuesta = (status, data) => ({ ok: status < 400, status, json: async () => data });

test.beforeEach(() => {
  const almacen = new Map();
  globalThis.sessionStorage = { getItem: (k) => almacen.get(k) ?? null, setItem: (k, v) => almacen.set(k, v), removeItem: (k) => almacen.delete(k) };
});
test.after(() => { globalThis.fetch = originalFetch; globalThis.sessionStorage = originalStorage; });

test('registro envía solo correo/contraseña y conserva 201, 400 y 409', async () => {
  globalThis.fetch = async (url, opciones) => {
    assert.equal(new URL(url).pathname, '/api/v1/usuarios/registro');
    assert.equal(opciones.method, 'POST');
    assert.equal(opciones.headers['Content-Type'], 'application/json');
    assert.equal(opciones.headers.Authorization, undefined);
    assert.deepEqual(JSON.parse(opciones.body), datos);
    return respuesta(201, { success: true, data: usuario });
  };
  assert.equal((await registrarUsuario({ ...datos, confirmar: datos.contrasena })).data.rol, 'usuario');
  for (const status of [400, 409]) {
    globalThis.fetch = async () => respuesta(status, { error: { message: 'Validación de prueba', details: { correo: ['No válido'] } } });
    await assert.rejects(registrarUsuario(datos), (e) => e.status === status && e.details.correo[0] === 'No válido');
  }
});

test('login usa POST JSON sin Bearer y conserva la respuesta', async () => {
  guardarSesion('sesion-fixture', usuario);
  globalThis.fetch = async (url, opciones) => {
    assert.equal(new URL(url).pathname, '/api/v1/usuarios/login');
    assert.equal(opciones.method, 'POST');
    assert.equal(opciones.headers['Content-Type'], 'application/json');
    assert.deepEqual(JSON.parse(opciones.body), datos);
    assert.equal(opciones.headers.Authorization, undefined);
    return respuesta(200, { success: true, data: { access_token: 'respuesta-fixture', usuario } });
  };
  assert.equal((await iniciarSesionAPI(datos)).data.access_token, 'respuesta-fixture');
});

test('perfil y administración usan GET Bearer y conservan AbortSignal', async () => {
  guardarSesion('sesion-fixture', usuario);
  const rutas = [];
  const controller = new AbortController();
  globalThis.fetch = async (url, opciones) => {
    rutas.push(new URL(url).pathname);
    assert.equal(opciones.method, 'GET');
    assert.equal(opciones.body, undefined);
    assert.equal(opciones.headers.Authorization, 'Bearer sesion-fixture');
    assert.equal(opciones.signal, controller.signal);
    return respuesta(200, { success: true, data: [] });
  };
  await consultarPerfil(controller.signal);
  await listarUsuariosAdmin(controller.signal);
  assert.deepEqual(rutas, ['/api/v1/usuarios/perfil', '/api/v1/admin/usuarios']);
  const abort = new DOMException('Cancelado', 'AbortError');
  globalThis.fetch = async () => ({ ok: true, status: 200, json: async () => { throw abort; } });
  await assert.rejects(consultarPerfil(), (e) => e === abort);
});

test('401 público y 403 protegido conservan la sesión', async () => {
  guardarSesion('sesion-fixture', usuario);
  globalThis.fetch = async () => respuesta(401, { error: { message: 'Credenciales inválidas.' } });
  await assert.rejects(iniciarSesionAPI(datos), (e) => e.status === 401);
  assert.equal(obtenerSesion()?.token, 'sesion-fixture');
  globalThis.fetch = async () => respuesta(403, { error: { message: 'Acceso restringido.' } });
  await assert.rejects(listarUsuariosAdmin(), (e) => e.status === 403);
  assert.equal(obtenerSesion()?.token, 'sesion-fixture');
});

test('401 protegido limpia su sesión, incluso sin JSON, sin borrar una sesión nueva', async () => {
  for (const malformado of [false, true]) {
    guardarSesion('sesion-fixture', usuario);
    globalThis.fetch = async () => ({ ok: false, status: 401, json: async () => {
      if (malformado) throw new SyntaxError('No es JSON');
      return { error: { message: 'Token expirado.' } };
    } });
    await assert.rejects(consultarPerfil(), (e) => e.status === 401);
    assert.equal(obtenerSesion(), null);
  }
  guardarSesion('sesion-anterior-fixture', usuario);
  globalThis.fetch = async () => {
    guardarSesion('sesion-nueva-fixture', usuario);
    return respuesta(401, { error: { message: 'Token anterior expirado.' } });
  };
  await assert.rejects(consultarPerfil(), (e) => e.status === 401);
  assert.equal(obtenerSesion()?.token, 'sesion-nueva-fixture');
});
