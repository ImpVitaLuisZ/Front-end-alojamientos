# Sprint 3: CRUD y comodidades

Estado al 4 de noviembre de 2026: código implementado; 37/37 pruebas, sintaxis y build correctos. Verificados con Flask/MySQL reales: propietario, Admin, rechazo de usuario ajeno, comodidades, asociaciones y borrados 204/404. La comprobación visual de Confirmar/Cancelar sigue pendiente por bloqueo del navegador de pruebas. PR #6 permanece en borrador para revisión; no está integrado. El ZIP de esta versión conserva expresamente esa limitación. No se presenta un mock como evidencia de MySQL.

## Base y proceso

Sprint 2 integrado en main mediante PR #4 (d31da64148ba38a2338e44514ec7ed5132b7f77d). Se comprobaron 23/23 pruebas antes de modificar archivos. [Issue #5](https://github.com/ImpVitaLuisZ/Front-end-alojamientos/issues/5), rama feat/frontend-sprint-03-crud-comodidades.

Se leyeron SPRINT-03.md y TUTORIAL-03.md del material estudiantil y la rúbrica del Trabajo 3. Los bloques del tutorial se aplicaron en el orden pruebas → implementación; no se utilizó solucion-referencia. La fase RED falló por módulos ausentes y rutas aún sin implementar. La fase GREEN pasó 37 pruebas: 23 heredadas y 14 nuevas. Build Vite 8.3.5: 98 módulos. MySQL: revisión Alembic 003 (head), verificada sin aplicar migraciones.

Se conservan los módulos que exige el tutorial, dependencias, las pruebas anteriores y el detalle público personalizado. Se añadieron guardas contra envíos duplicados y se adaptó la Navbar para que las nuevas opciones se colapsen en pantallas medianas. Los textos visibles explican las acciones al usuario; los detalles de JWT y SQL permanecen en la documentación.

## Mapa del código y flujo

- api/alojamientos.api.js: crearAlojamiento, actualizarAlojamiento, eliminarAlojamiento y asignarComodidades usan las rutas reales y el JWT de la pestaña.
- api/comodidades.api.js: crearComodidad envía solo nombre; requiere Admin en Flask.
- utils/gestion.js: validarAlojamiento, prepararAlojamiento, validarComodidad, puedeModificar e idsComodidadesSeleccionadas.
- AlojamientoForm.js comparte campos entre Crear y Editar; ComodidadesSelector.js marca las asociaciones existentes y permite retirar todas.
- CrearAlojamientoPage.js valida y envía POST, luego abre el detalle devuelto por Flask.
- MisAlojamientosPage.js filtra por usuario_id la colección pública; no crea un endpoint inexistente.
- EditarAlojamientoPage.js carga detalle y catálogo, permite PATCH de campos, PATCH de asociaciones y DELETE con confirmación.
- AdminCrearComodidadPage.js crea una comodidad y conserva los mensajes de error del servidor.
- routes.js, validaciones.js, Navbar.js y DetallePage.js conectan los nuevos recorridos sin cambiar router.js ni las consultas públicas.

Flujo: formulario → validación y cuatro campos normalizados → servicio JS → http.js → Flask → validación/permisos → MySQL → respuesta → mensaje o navegación. La interfaz orienta; Flask determina propietario y autorización. 401 elimina sesión protegida, 403 la conserva, 204 no contiene JSON.

## Evidencia y cierre

- [x] 23 regresiones antes de empezar, RED observado, 37/37 después.
- [x] Sintaxis de todos los JS, build y diff verificados.
- [x] MySQL en migración 003 y contratos reales leídos.
- [x] Ruta de creación sin sesión redirige al login con next local.
- [x] CRUD real con propietario y Admin; rechazo real 403 del ajeno.
- [x] Comodidades 201/409, asociación/reemplazo/[] y error 400.
- [x] DELETE real 204 y consulta posterior 404 para los dos registros desechables.
- [ ] Confirmar y Cancelar en el diálogo del navegador; limitación descrita abajo.
- [x] Capturas reales de creación, Mis alojamientos y edición móvil a 390 px.
- [x] Capturas del aviso 409 de Admin, permisos y detalle con comodidades.
- [x] Commit, push y [PR #6 en borrador](https://github.com/ImpVitaLuisZ/Front-end-alojamientos/pull/6), enlazado a Issue #5.
- [ ] Revisión e integración después de completar las pruebas reales.
- [ ] Revisar el ZIP de Entrega3 contra su VERIFICACION-ENTREGA3.json y cerrar la comprobación manual pendiente.
- [ ] Presentación por Luis en Q10 después de entender y revisar el código.

Se conserva el alojamiento ficticio de Sprint 1. Las pruebas nuevas deben utilizar registros claramente identificados como desechables y cuentas de prueba autorizadas. No se incluyen reservas, pagos ni subida de fotos. El Trabajo 4 consolidará lo integrado sin funciones nuevas.

## Prueba real del propietario y revisión móvil

El usuario de prueba 6 inició sesión y creó el alojamiento ficticio desechable 3. Flask respondió 201 y asignó usuario_id 6 sin que el formulario enviara ese campo. El formulario rechazó título vacío y precio cero. Al editar la ciudad a Bogotá, PATCH respondió 200 y el dato persistió al recargar. El alojamiento 2 de Sprint 1 se conserva sin cambios.

Las peticiones directas con esa cuenta comprobaron 400 para campos obligatorios ausentes, precio cero y comodidad inexistente; crear comodidad con rol normal dio 403. Son verificaciones reales HTTP, separadas de los 37 tests con fetch simulado.

A 390 × 844 px se detectó que la clase h-100 de la tarjeta ocupaba toda la columna y dejaba su enlace Editar fuera de ella: la tarjeta siguiente lo tapaba. Mis alojamientos ahora usa columnas flexibles y una regla de altura limitada a esa vista. Se conservó el componente público. Las filas quedan separadas por 24 px, sin desbordamiento horizontal. Las 37 pruebas y el build se repitieron y pasaron después del ajuste.

[Evidencia real del propietario](evidencias/sprint-03/propietario-real-20261104.json), [creación](evidencias/sprint-03/sprint3-creado-real-20261104.png), [lista móvil](evidencias/sprint-03/sprint3-mis-alojamientos-movil-real-20261104.png) y [edición móvil](evidencias/sprint-03/sprint3-edicion-movil-real-20261104.png).

## Integración final de Admin, comodidades y borrado

La autorización específica permitió restablecer las contraseñas temporales de las cuentas locales 6 y 7 y comprobar login 200. Se conservaron sus roles normal y Admin, respectivamente. No se creó ninguna cuenta adicional ni se modificaron los usuarios anteriores. Las contraseñas y JWT no se publican ni se guardan en la entrega.

| Comprobación real | Resultado |
| --- | --- |
| Admin crea comodidad WiFi; repite el nombre; crea Cocina | 201, 409 con aviso visible y 201; IDs 2 y 3 |
| Admin crea segundo alojamiento desechable | 201, ID 4 y propietario 7 |
| Admin modifica precio del alojamiento 3 de otro propietario | 200, precio 185000 y propietario 6 conservado |
| Usuario 6 intenta PATCH, DELETE y asociaciones sobre 4 | 403 en los tres casos; sesión conservada |
| Usuario normal intenta crear comodidad | 403 |
| Formulario incompleto, precio cero, comodidad inexistente | 400 |
| Propietario marca las dos casillas y guarda | PATCH 200; GET y detalle público muestran ambas |
| Volver a editar y desmarcar todas | Casillas persistentes al volver; PATCH 200 y GET con [] |
| Eliminar registros desechables 3 y 4 desde servicios JS | DELETE 204 sin JSON; GET posterior 404 para ambos |
| Consultar registro 2 de Sprint 1 | 200 y contenido idéntico a la línea base |

Quedan las comodidades ficticias 2 y 3 en el catálogo. No se inventó una ruta de borrado de comodidades ni se alteró el esquema. Las capturas del alojamiento 3 corresponden al registro real antes de su limpieza autorizada; ahora ese ID responde 404.

La herramienta del navegador se bloqueó al abrir `window.confirm`: no logró observar el diálogo. Un intento anterior terminó tardíamente a las 17:41:44 local con DELETE 401 por sesión caducada; el registro seguía presente después. El nuevo intento también agotó tiempo. Por eso se completó el borrado mediante los servicios JS reales con login legítimo, sin cambiar la confirmación del código. **No se afirma que Confirmar/Cancelar y la redirección posterior hayan sido verificados visualmente.** El cierre de esa pestaña también agotó tiempo; su estado de cierre es incierto. Los secretos temporales fueron descartados.

Pendiente manual concreto: con una cuenta de prueba conocida y un nuevo registro expresamente desechable, pulsar Eliminar, cancelar y comprobar que no hay DELETE; volver a pulsar, aceptar y comprobar DELETE 204, vuelta a Mis alojamientos y GET 404. No usar el alojamiento 2 de Sprint 1 para esa prueba. La preparación de otra cuenta o registro no se realiza automáticamente en esta entrega.

[Resultados y log HTTP sanitizado](evidencias/sprint-03/integracion-real-20261104.json), [aviso de duplicado](evidencias/sprint-03/sprint3-comodidad-409-real-20261104.png), [permiso sobre alojamiento ajeno](evidencias/sprint-03/sprint3-permiso-ajeno-real-20261104.png) y [detalle con comodidades](evidencias/sprint-03/sprint3-comodidades-detalle-real-20261104.png).

## Recorrido para entender el código

1. Abrir CrearAlojamientoPage.js: submit recibe el evento y preventDefault evita recargar. datosDelFormulario lee los campos; validarAlojamiento decide si se puede enviar.
2. Seguir prepararAlojamiento en utils/gestion.js: recorta espacios y convierte el precio a número. El objeto tiene cuatro campos y no contiene usuario_id.
3. Abrir crearAlojamiento en api/alojamientos.api.js: llama a solicitarJSON con POST y el token de la sesión. Flask determina la propiedad y guarda el registro en MySQL.
4. Volver a la página: await espera la respuesta; el ID recibido forma la URL del detalle. El caso observado fue /alojamientos/3.
5. En EditarAlojamientoPage.js comparar las tres acciones: Guardar cambios envía campos, Guardar comodidades reemplaza asociaciones y Eliminar necesita confirmación. Son peticiones independientes.
6. En MisAlojamientosPage.js el filtro organiza los registros del usuario; puedeModificar orienta la interfaz. Ninguna de esas funciones sustituye la autorización de Flask.

Para la explicación final conviene recorrer una acción completa antes de revisar todos los archivos. Luis revisará los resultados y el código antes de presentar los cuatro trabajos; el asistente no realiza la presentación en Q10.
