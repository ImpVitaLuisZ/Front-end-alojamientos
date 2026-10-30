# Entrega 1 — SPA pública

Estado al 30 de octubre de 2026: **flujo principal verificado con un alojamiento de práctica obtenido de la API real**. Destino público: [ImpVitaLuisZ/Front-end-alojamientos](https://github.com/ImpVitaLuisZ/Front-end-alojamientos). El cambio se revisa mediante PR hacia main, sin merge automático ni despliegue.

## Alcance

La instalación, los comandos, las rutas y el contrato HTTP están en el [README](../README.md). Sprint 1 incluye cinco vistas públicas y 404, navegación con History API, filtro local por título/ciudad y estados de carga, vacío y error. Las ilustraciones son decorativas.

No requiere login, JWT ni CRUD en el frontend. Según el tutorial §17, una cuenta normal y un alojamiento bastan para la comprobación principal. Crear/asociar una comodidad mediante administrador es **opcional para Sprint 1**, no un bloqueo para validar el catálogo y el detalle.

## Evidencia comprobada

Revisión del código de aplicación en `3288d348b3e3ac83e5b97c33d78650a91b9c31ba`, rama `feat/frontend-sprint-01-spa-publica`. Esta documentación se prepara después de ese commit.

| Comprobación | Resultado |
| --- | --- |
| `npm test` | 9/9 aprobadas; código 0 |
| `npm run build` | Correcto, Vite 8.3.5; código 0 |
| API real y CORS | Salud 200; registro de usuario normal 201, login 200 y creación de alojamiento 201; listado y detalle 2 devuelven 200; origen localhost:5173 permitido |
| Navegador con API real | Tarjeta del alojamiento 2, precio COP, filtro por título/ciudad, sin coincidencias, detalle y recarga de URL directa correctos; sin errores de consola observados |
| Navegador con respuestas sintéticas | Tarjetas, filtro por título/ciudad, sin coincidencias, detalle, carga, vacío, errores HTTP/red, URL directa, 404 y Atrás/Adelante |
| Navegación y filtro sintéticos | Mismo documento durante la navegación; filtrar no genera GET adicionales |
| Integración con un registro real | Verificada: usuario normal de práctica 6 y alojamiento ficticio 2, creados con autorización. Catálogo de 0 a 1 registro; propietario 6 comprobado. |

Las respuestas sintéticas se sirvieron temporalmente fuera del proyecto, con un aviso visible. Después se completó el flujo con el alojamiento ficticio persistido mediante la API local: “PRUEBA LOCAL Sprint 1 - Apartamento”, Medellín, $180.000 por noche, sin comodidades. No representa una propiedad disponible. La aplicación sigue consultando Flask y no contiene mocks permanentes.

Las pruebas de catálogo vacío y detalle inexistente se hicieron antes de crear ese registro y se conservan como evidencia histórica. La contraseña generada y el token se usaron solo en memoria, sin guardarlos en archivos ni incorporarlos al proyecto. La cuenta no se promovió a administrador y las cuentas anteriores no se modificaron.

## Lista para cerrar la entrega

- [x] Fuentes, lockfile, README y nueve pruebas presentes.
- [x] Tests y build comprobados con las dependencias existentes.
- [x] Conexión real, CORS, estado vacío y 404 verificados.
- [x] Casos de interfaz verificados con datos sintéticos identificados.
- [x] Crear con autorización un usuario normal de práctica y un único alojamiento ficticio, sin duplicarlo ni modificar cuentas anteriores.
- [x] Verificar tarjeta, búsqueda por título/ciudad, búsqueda sin coincidencias y detalle usando el ID real 2; capturar la evidencia.
- [x] Confirmar el repositorio público ImpVitaLuisZ/Front-end-alojamientos, independiente del backend.
- [x] Preparar la revisión de archivos e historial, las pruebas y las evidencias de Sprint 1.
- [ ] Revisión humana del PR en borrador antes de autorizar su merge; no se envía APPROVE automáticamente.
- [ ] El estudiante revisa el ZIP fuente y lo adjunta en la actividad correspondiente.
- [ ] El estudiante revisa, explica la SPA y presenta la Entrega 1 en su actividad correspondiente.

No se creó ninguna comodidad ni se cambió ningún rol. La comodidad administrativa es opcional para Sprint 1. Reutilizar el login de la cuenta nueva en otra sesión necesitará acordar un manejo seguro de su contraseña, ya que no se conservó una copia; esto no impide consultar el catálogo público.

## Evidencias incluidas

Se incluyen copias revisadas y sin credenciales en [evidencias/sprint-01](evidencias/sprint-01/). Las evidencias originales también se conservan en la carpeta local de Entrega1. Los IDs corresponden a datos ficticios de la base local, no a datos incluidos en el ZIP ni a un servicio desplegado.

| Archivo | Qué demuestra |
| --- | --- |
| [sprint1-validacion-publicacion-20261030.txt](evidencias/sprint-01/sprint1-validacion-publicacion-20261030.txt) | Tests 9/9 y build repetidos antes de publicar, ambos exit 0 |
| [sprint1-tests-build-20261030.txt](evidencias/sprint-01/sprint1-tests-build-20261030.txt) | Salidas de tests y build |
| [sprint1-integracion-real-20261030.json](evidencias/sprint-01/sprint1-integracion-real-20261030.json) | GET reales, cantidades y CORS antes de crear datos |
| [sprint1-catalogo-real-vacio.jpg](evidencias/sprint-01/sprint1-catalogo-real-vacio.jpg) | Estado vacío previo, consultado a Flask |
| [sprint1-navegador-sintetico.json](evidencias/sprint-01/sprint1-navegador-sintetico.json) | Resultados de los casos sintéticos |
| [sprint1-catalogo-sintetico.jpg](evidencias/sprint-01/sprint1-catalogo-sintetico.jpg) | Tarjetas ficticias, identificadas como prueba |
| [sprint1-detalle-sintetico.jpg](evidencias/sprint-01/sprint1-detalle-sintetico.jpg) | Detalle ficticio, identificado como prueba |
| [sprint1-datos-reales-creados.json](evidencias/sprint-01/sprint1-datos-reales-creados.json) | HTTP de registro/login/creación y GET públicos, IDs y datos ficticios; sin credenciales |
| [sprint1-navegador-real-con-datos.json](evidencias/sprint-01/sprint1-navegador-real-con-datos.json) | Filtros y detalle del registro real 2 |
| [sprint1-catalogo-real-con-datos.jpg](evidencias/sprint-01/sprint1-catalogo-real-con-datos.jpg) | Tarjeta obtenida de la API local |
| [sprint1-detalle-real-con-datos.jpg](evidencias/sprint-01/sprint1-detalle-real-con-datos.jpg) | Detalle del alojamiento 2 obtenido de la API local |

El informe interno `INFORME-SPRINT-01.md` conserva el diagnóstico detallado y está ignorado por Git. No se incluyen credenciales, cuentas personales ni documentos del profesor en esta documentación publicable.

El ZIP fuente, cuando corresponda, incluirá fuentes, tests, README, esta documentación, configuración pública y lockfile. Excluirá `.git/`, `.env`, `node_modules/`, `dist/`, informes internos y documentos privados. Las evidencias revisadas de docs/evidencias forman parte de este snapshot; no se incluye un volcado de MySQL.


## Seguimiento

[Issue #1: Sprint 1 frontend](https://github.com/ImpVitaLuisZ/Front-end-alojamientos/issues/1). La rama de revisión es `feat/frontend-sprint-01-spa-publica` y la base es `main`. El backend se mantiene en su repositorio independiente.
