# Sprint 2: autenticación, sesión y autorización

Estado al 30 de octubre de 2026: implementación local y pruebas simuladas aprobadas; integración autenticada real pendiente. No es todavía una entrega final ni se ha publicado la rama.

## Continuidad y alcance

Base: `main` en `d0bfb73ace2a3ae7a798aeb068c74cf077c71a8f`, después del merge autorizado del [PR #2](https://github.com/ImpVitaLuisZ/Front-end-alojamientos/pull/2). La [Issue #1](https://github.com/ImpVitaLuisZ/Front-end-alojamientos/issues/1) está cerrada. El ZIP original de Entrega1 conserva el snapshot `b5518560906f2608a4ddbe983877feabfa4e458d`.

Trabajo de Sprint 2: [Issue #3](https://github.com/ImpVitaLuisZ/Front-end-alojamientos/issues/3), rama `feat/frontend-sprint-02-autenticacion`. Se siguieron los pasos 5–20 del tutorial estudiantil de Frontend, sin copiar el proyecto de solución. Las vistas y las nueve pruebas públicas de Sprint 1 permanecen intactas. No se añadieron dependencias ni operaciones de Sprint 3.

Incluye registro con confirmación, login, JWT por pestaña, logout local, Navbar por rol, guards, perfil y usuarios administrativos de solo lectura. Se corrigió una inconsistencia del §6 del tutorial: menciona `cliente.js` y omite el export `obtenerJSON`, aunque sus criterios exigen conservarlo. Se mantuvo `http.js` y un wrapper compatible. Se conservó AbortError al leer JSON y se protegió una sesión nueva frente a un 401 atrasado de otra sesión.

## Evidencia y límites

- `npm test`: **23/23**, cero fallos: nueve de regresión y catorce nuevas. Los tests HTTP usan fetch simulado.
- `npm run build`: correcto, Vite 8.3.5, 89 módulos. `git diff --check`: correcto.
- Navegador con respuestas sintéticas: registro 201/400/409, confirmación, login 200/401, perfil, recarga, Navbar, restricción de usuario normal sin GET admin, tabla admin, HTML escapado, vacío, error de red, 403 que conserva sesión, 401 que la borra, logout y Atrás protegido.
- API real: `/health` 200. En la SPA real se comprobaron el catálogo (un alojamiento, ID 2), su detalle y el guard de `/perfil` sin sesión. Sin errores de consola observados.
- **Pendiente:** recorrido autenticado real desde la SPA: registro 201, login/perfil 200, duplicado 409, validación 400, denegación administrativa 403 y listado admin 200. Los resultados sintéticos no demuestran permisos ni persistencia en MySQL.

[Resultados detallados](evidencias/sprint-02/verificacion.json), [perfil sintético](evidencias/sprint-02/sprint2-perfil-sintetico.png) y [tabla sintética](evidencias/sprint-02/sprint2-admin-sintetico.png). Las capturas muestran un aviso visible de simulación. No contienen contraseñas ni JWT reales; los IDs 901 son solo fixtures.

## Cómo explicarlo y revisarlo

1. Abra `/perfil` sin sesión: el router envía a login, sin pedir datos privados.
2. Registro comprueba correo, mínimo de seis caracteres y confirmación. Solo envía correo y contraseña; no inicia sesión.
3. Tras login, la pestaña guarda la sesión y cambia la Navbar. El perfil se obtiene enviando Bearer; campos vacíos no son un error.
4. El usuario normal ve una pantalla restringida en `/admin/usuarios`. Ocultar el enlace ayuda a navegar; la seguridad efectiva está en Flask.
5. Un 401 protegido significa que se debe iniciar sesión de nuevo. Un 403 significa permiso insuficiente: no hay que borrar la sesión.
6. Cierre sesión y abra el catálogo: las consultas públicas siguen disponibles. Atrás no permite recuperar una vista privada sin sesión.

## Próximo paso real y permisos

Se necesita una cuenta local cuya contraseña conozca Luis, o autorización para registrar otra cuenta ficticia normal. La contraseña generada para el usuario 6 no se guardó y no se puede reutilizar. No se intentó adivinarla, restablecerla ni reutilizar credenciales de MySQL.

Para Admin se requiere elegir una cuenta de práctica concreta y autorizar su promoción. El tutorial §27 documenta, desde el backend y con su entorno, `python -m scripts.promover_admin <correo-confirmado>`. El script existente fue leído; no se ejecutó ni se cambió ningún rol. Después de una promoción autorizada hay que iniciar sesión de nuevo para actualizar el menú.

Después de completar la integración real: revisar cambios, autorizar publicación, push de esta rama y PR hacia main enlazado con `Closes #3`. No se ha creado un ZIP final de Entrega2 ni se ha iniciado Sprint 3.
