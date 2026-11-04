# Sprint 2: autenticación, sesión y autorización

Estado al 4 de noviembre de 2026: implementación, 23 pruebas, build, contratos HTTP reales y recorrido autenticado en navegador aprobados. Quedan la revisión e integración del PR y la entrega de Luis en Q10. Las capturas sintéticas se distinguen de las nuevas capturas reales.

## Continuidad y alcance

Base: main en `d0bfb73ace2a3ae7a798aeb068c74cf077c71a8f`, después del [PR #2 de Sprint 1](https://github.com/ImpVitaLuisZ/Front-end-alojamientos/pull/2). El ZIP de Entrega1 conserva `b5518560906f2608a4ddbe983877feabfa4e458d`.

Sprint 2 se desarrolla en `feat/frontend-sprint-02-autenticacion`, vinculado a [Issue #3](https://github.com/ImpVitaLuisZ/Front-end-alojamientos/issues/3). Se siguieron los pasos del tutorial estudiantil sin copiar el proyecto de solución. Las vistas y nueve pruebas públicas de S1 permanecen intactas; no se añadieron dependencias ni funciones de Sprint 3.

Incluye registro con confirmación, login, JWT en sessionStorage, logout local, Navbar según sesión/rol, rutas protegidas, perfil y listado administrativo de solo lectura. `confirmar` no se envía al backend. El rol mostrado viene del último login; Flask comprueba el permiso vigente de cada petición. No se inventan endpoints de logout, renovación de token ni edición de perfil.

Se corrigió una inconsistencia del §6 del tutorial: menciona cliente.js y omite obtenerJSON aunque exige mantener las consultas públicas. Se conserva http.js con un wrapper compatible. AbortError se mantiene al leer JSON; un 401 atrasado de otra sesión no elimina una sesión nueva.

## Verificación

- **Automática, 4 de noviembre:** npm test, 23/23 y cero fallos; npm run build, Vite 8.3.5 y 89 módulos; diff sin errores. Los tests HTTP automatizados simulan fetch.
- **Navegador sintético, 30 de octubre:** registro 201/400/409, confirmación, login 200/401, perfil y recarga, Navbar por rol, guard de usuario normal sin GET admin, tabla administrativa, escape HTML, vacío, red, logout, Atrás protegido, 403 que conserva sesión y 401 que la borra.
- **Navegador real, 4 de noviembre:** login, perfil de usuario 7, recarga con sesión conservada, Navbar Admin, tabla real de cuatro usuarios, logout y redirección de la ruta privada a login. Los formularios muestran los errores reales 401 y 409; estados corroborados con el log de acceso de Flask. Sin errores de consola observados.
- **HTTP real, 4 de noviembre:** servicios JS del frontend y comprobaciones HTTP directas contra Flask/MySQL, según la tabla siguiente. No sustituye la evidencia visual del navegador.

| Operación real | Resultado |
| --- | --- |
| Salud, catálogo, comodidades y alojamiento ficticio 2 | 200; catálogo con 1 alojamiento, comodidades vacías |
| Registro normal de usuario ficticio 7 | 201 |
| Login normal y perfil | 200; usuario_id 7 coincide |
| Admin solicitado por usuario 7 antes de promoción | 403; sesión conservada |
| Registro duplicado | 409; sin segunda cuenta |
| Login con contraseña incorrecta de esa cuenta | 401 |
| Logout local y perfil posterior sin token | 401 |
| Formularios sin campos obligatorios | 400 antes de operar sobre cuentas |
| Perfil con credencial sintética inválida | 401 y limpieza de la sesión de prueba |
| Preflight CORS para Authorization/Content-Type | 200; localhost:5173 permitido |
| Nuevo login después de promoción autorizada | 200; rol admin confirmado |
| Perfil y listado Admin con ese login | 200; listado con 4 usuarios |

La cuenta anterior 6 permanece normal. Se creó una única cuenta adicional, 7, y después se promovió con autorización expresa. También se autorizó restablecer únicamente su contraseña para completar la prueba. Ninguna contraseña ni JWT real se guarda en código, evidencias, documentos o Git; la credencial de prueba permaneció temporalmente en memoria y se descartó después de cerrar sesión. El traspaso entre procesos fue cifrado y el archivo temporal se eliminó. Los procesos no modificaron alojamientos ni comodidades.

[Evidencia HTTP real sanitizada](evidencias/sprint-02/verificacion-real-20261104.json), [registro de pruebas visuales sintéticas](evidencias/sprint-02/verificacion.json), [perfil sintético](evidencias/sprint-02/sprint2-perfil-sintetico.png) y [tabla sintética](evidencias/sprint-02/sprint2-admin-sintetico.png). Los IDs 901 de esas capturas son fixtures; no corresponden a los usuarios reales de MySQL.

[Perfil real](evidencias/sprint-02/sprint2-perfil-real-20261104.png), [Admin real](evidencias/sprint-02/sprint2-admin-real-20261104.png) y [conflicto 409 real](evidencias/sprint-02/sprint2-registro-409-real-20261104.png). El alta 201 y el permiso del usuario normal se comprobaron por HTTP real; su recorrido visual fue sintético. No se presenta esa parte como una captura de navegador real.

## Cómo explicar el código

1. RegistroPage.js escucha submit. preventDefault evita la recarga tradicional; se leen y validan los campos, se deshabilita el botón y se llama a registrarUsuario.
2. auth.api.js define la operación. http.js envía JSON y, para consultas privadas, Authorization Bearer; conserva el status HTTP del error.
3. LoginPage.js guarda access_token y los datos públicos del usuario mediante sesion.js. sessionStorage conserva la sesión en esa pestaña; no guarda la contraseña.
4. El router dirige a login si falta sesión y muestra acceso restringido si el usuario no es Admin. La Navbar refleja ese estado; la seguridad efectiva permanece en Flask.
5. PerfilPage.js muestra campos nulos como Sin registrar. AdminUsuariosPage.js muestra únicamente ID, correo y rol, escapados como HTML.
6. Un 401 protegido elimina su sesión; un 403 informa permiso insuficiente y la conserva. Logout borra la copia local del token, no lo revoca en el servidor. Las consultas públicas continúan funcionando.

## Entrega2 y revisión

- [x] Implementación S2, 23 pruebas y build correctos.
- [x] Contratos HTTP reales, incluido el rechazo de usuario normal y el acceso Admin autorizado.
- [x] Login, perfil, recarga, Admin, logout y errores de formulario comprobados en navegador real.
- [ ] Revisar e integrar el PR hacia main enlazado a Issue #3. La publicación de la rama y su PR está autorizada.
- [ ] Luis adjunta el ZIP, enlaces y evidencias en la actividad específica de Q10.

El ZIP de Entrega2 se genera desde el commit publicado, con README, fuentes, tests y estas evidencias; excluye .env, node_modules, dist y archivos privados. La guía externa LEEME-ENTREGA2.md registra el commit, PR, nombre del ZIP y su verificación. Entrega1 conserva su snapshot original. Este sprint no incluye CRUD ni comodidades administrativas de Sprint 3.

Las rúbricas originales de Trabajos 3 y 4 se leyeron completas: Trabajo 3 añade CRUD/comodidades con 37 pruebas y operaciones reales. Trabajo 4 consolida S1–S3 sin funciones nuevas: README/docs completos, historial y PR integrados en main, evidencias, ZIP equivalente a GitHub y prueba de instalación independiente. La publicación exigida es GitHub, sin hosting obligatorio.

## Integración posterior

PR #4 revisado e integrado el 4 de noviembre de 2026, con autorización específica de Luis. Merge en main: d31da64148ba38a2338e44514ec7ed5132b7f77d. Issue #3 cerrado. Sin revisión formal APPROVE. Las 23 pruebas se ejecutaron nuevamente al comenzar Sprint 3 y pasaron. El ZIP de Entrega2 conserva e7fe1d6cb618cc830d732cd8bc2c81af5b43305a; no se reemplaza por un snapshot de Sprint 3.
