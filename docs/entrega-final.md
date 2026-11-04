# Trabajo 4: consolidación y publicación

Consolidación del frontend de los tres tutoriales, según la rúbrica «Entrega final, documentación y publicación del proyecto frontend en GitHub». No añade funcionalidades ni requiere un hosting. El backend permanece separado.

## Correspondencia con los tutoriales

| Requisito | Implementación y evidencia |
| --- | --- |
| Tutorial 1: SPA modular, páginas públicas, catálogo, detalle y comodidades | HTML/CSS/Vanilla, Vite, Bootstrap; [Sprint 1](sprint-01.md), 9 pruebas originales |
| Tutorial 2: registro, login, JWT/sessionStorage, perfil, roles y logout | [Sprint 2](sprint-02.md), 14 pruebas nuevas y pruebas reales de API/navegador |
| Tutorial 3: CRUD, Mis alojamientos, comodidades y permisos | [Sprint 3](sprint-03.md), 14 pruebas nuevas; 37 acumuladas y operaciones reales |
| README instalable, configuración pública y módulos | [README](../README.md), .env.example, package-lock.json |
| Historial conservado e integración de los tres sprints | PR 2, 4 y 6 integrados; ramas y ZIP de cada etapa conservados |
| Limpieza del entregable | Git archive incluye solo archivos versionados; excluye .env, dependencias, dist, informes internos y material privado |
| Instalación independiente y comandos | Ver resultados de verificación al finalizar esta revisión |
| ZIP igual a versión publicada | VERIFICACION-ENTREGA4.json junto al ZIP registra commit, SHA256 y comparación byte por byte |

## Ajustes y límites documentados

- En Tutorial 2 se conservó http.js y el wrapper obtenerJSON para compatibilidad con la SPA pública: el texto del tutorial usaba un nombre distinto y omitía esa exportación. No se inventaron endpoints.
- El detalle público y las ilustraciones CSS existentes se conservaron. En Sprint 3 se corrigió la altura de tarjetas de Mis alojamientos para evitar solapamiento en móvil; no cambió el contrato de Flask.
- La consolidación actualiza el pie que todavía decía Sprint 1 y expresa el límite de precio sin terminología de base de datos. No cambia rutas, permisos, dependencias ni lógica de negocio.
- Las pruebas automatizadas simulan fetch; las evidencias HTTP y visuales reales se identifican por separado. Los datos ficticios persistidos están rotulados como prueba.
- Falta observar manualmente Confirmar/Cancelar y la redirección del borrado: la herramienta no pudo controlar window.confirm. DELETE 204 y GET 404 fueron verificados por los servicios JS contra Flask/MySQL. La integración de PR 6 se autorizó conservando esa limitación; no equivale a afirmar aceptación visual completa.
- Las cuentas de prueba tienen contraseñas temporales descartadas. El proyecto no entrega credenciales; para una revisión autenticada futura se necesita una cuenta local conocida. No se modifican cuentas automáticamente al instalar.

## Recorrido para revisar y entender el proyecto

1. **Pantalla pública:** index.html carga main.js. El router decide la página a partir de la URL; los componentes generan las partes reutilizables.
2. **Leer datos:** AlojamientosPage llama a publica.api.js; http.js hace fetch a Flask. Flask consulta MySQL y devuelve JSON; la página lo transforma en tarjetas.
3. **Enviar un formulario:** RegistroPage escucha submit y usa preventDefault. Valida los campos y llama a registrarUsuario; la confirmación de contraseña se queda en la interfaz.
4. **Sesión:** LoginPage recibe un JWT y datos públicos. sesion.js los guarda en sessionStorage de la pestaña. El navegador no conoce la contraseña de MySQL ni decide permisos del servidor.
5. **Crear y editar:** AlojamientoForm comparte campos; gestion.js valida y normaliza; alojamientos.api.js envía POST/PATCH. Flask asigna propietario y autoriza cada cambio.
6. **Comodidades:** el selector lee los IDs marcados. Guardar reemplaza la lista completa; [] retira asociaciones sin borrar el catálogo.
7. **Errores y pruebas:** 400 informa datos inválidos, 401 protegido borra sesión, 403 conserva sesión, 404 indica ausencia y 409 duplicado. Leer un test de cada grupo y compararlo con la evidencia real correspondiente.

La presentación en Q10 corresponde a Luis después de revisar el resultado y el código. No se ha presentado ninguna actividad automáticamente.
