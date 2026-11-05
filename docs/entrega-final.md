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
| Instalación independiente y comandos | Clone desde GitHub, npm install, 37 tests, dev, build y preview comprobados; resultados abajo |
| ZIP igual a versión publicada | VERIFICACION-ENTREGA4.json junto al ZIP registra commit, SHA256 y comparación byte por byte |

## Ajustes y límites documentados

- En Tutorial 2 se conservó http.js y el wrapper obtenerJSON para compatibilidad con la SPA pública: el texto del tutorial usaba un nombre distinto y omitía esa exportación. No se inventaron endpoints.
- El detalle público y las ilustraciones CSS existentes se conservaron. En Sprint 3 se corrigió la altura de tarjetas de Mis alojamientos para evitar solapamiento en móvil; no cambió el contrato de Flask.
- La revisión independiente encontró 12 px de desbordamiento horizontal del detalle a 390 px. Se usa g-4 en móvil y se conserva g-lg-5 en escritorio; no se oculta el desbordamiento mediante CSS.
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

## Resultado de la instalación independiente

Se clonó la rama publicada docs/frontend-entrega-final desde GitHub en una carpeta distinta del proyecto de trabajo. `npm install` terminó con exit 0, sin modificar package-lock.json y sin vulnerabilidades reportadas por npm. Node v24.21.0 y npm 11.19.0. Se copió únicamente .env.example; no se copiaron credenciales del backend.

Después del ajuste móvil se actualizó esa copia por fast-forward al commit `52fb6344e94be8a8caa596b7534f195b2794eae6`. `npm test`: 37 aprobadas, cero fallos. `npm run build`: exit 0, Vite 8.3.5, 98 módulos. Se verificó sintaxis de 46 archivos JS; la copia quedó limpia. Los commits posteriores de esta consolidación agregan documentación y evidencias, no cambian el código ejecutado.

`npm run dev -- --port 3000 --strictPort` mostró Inicio conectado y el catálogo real. `npm run preview -- --host localhost --port 3000 --strictPort` sirvió los recursos compilados, permitió abrir/recargar el detalle 2 y redirigió la ruta privada al login. No se observaron errores de consola durante ese recorrido. El detalle quedó sin desbordamiento horizontal en móvil y tableta. Los procesos temporales dev/preview se detuvieron después de verificar; la API local original se conserva.

- [Resultados y alcance exacto](evidencias/entrega-final/instalacion-independiente.json).
- Salidas reales: [instalación](evidencias/entrega-final/npm-install.txt), [37 pruebas](evidencias/entrega-final/npm-test.txt), [compilación](evidencias/entrega-final/npm-build.txt).
- Capturas: [Inicio real](evidencias/entrega-final/inicio-dev-real.png), [detalle en tableta](evidencias/entrega-final/detalle-preview-tablet-real.png), [detalle en móvil](evidencias/entrega-final/detalle-preview-movil-real.png).

**Pendiente de evidencia visual:** la rúbrica pide capturas de la ejecución de pruebas y build. Se conservan sus salidas reales completas, pero no se obtuvo esa captura: la página local preparada para mostrar los registros agotó tiempo y el navegador bloqueó su página interna de error. Antes de presentar, se puede ejecutar npm test y npm run build en la terminal y capturar los resultados. Una vista reconstruida no se presenta como una captura original.

## Archivos para la explicación guiada

| Acción | Dónde seguirla |
| --- | --- |
| Inicio y navegación | [main.js](../src/js/main.js), [router.js](../src/js/router/router.js), [routes.js](../src/js/router/routes.js) |
| Formulario y preventDefault | [RegistroPage.js](../src/js/pages/RegistroPage.js), [auth.api.js](../src/js/api/auth.api.js) |
| Petición y respuesta HTTP | [http.js](../src/js/api/http.js), [publica.api.js](../src/js/api/publica.api.js) |
| JWT, estado y roles | [sesion.js](../src/js/state/sesion.js), [Navbar.js](../src/js/components/Navbar.js) |
| Crear, editar y borrar | [CrearAlojamientoPage.js](../src/js/pages/CrearAlojamientoPage.js), [EditarAlojamientoPage.js](../src/js/pages/EditarAlojamientoPage.js), [alojamientos.api.js](../src/js/api/alojamientos.api.js) |
| Formulario compartido y comodidades | [AlojamientoForm.js](../src/js/components/AlojamientoForm.js), [ComodidadesSelector.js](../src/js/components/ComodidadesSelector.js), [gestion.js](../src/js/utils/gestion.js) |

La revisión puede comenzar por el submit de RegistroPage, seguir una petición hasta Flask y volver a la respuesta. Después conviene recorrer una operación de alojamiento y explicar por qué ocultar un botón no sustituye los permisos del servidor.
