# Sprint 3: CRUD y comodidades

Estado al 4 de noviembre de 2026: código implementado; 37/37 pruebas, sintaxis y build correctos. Creación y edición del propietario verificadas con datos reales, además de vistas móviles. PR #6 publicado en borrador; faltan Admin, relaciones, borrado, revisión y ZIP final. No se presenta un mock como evidencia de MySQL.

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
- [ ] CRUD real con propietario y Admin; rechazo real 403 del ajeno.
- [ ] Comodidades 201/409, asociación/reemplazo/[] y error 400.
- [ ] Confirmación de borrado, 204 y consulta posterior 404.
- [x] Capturas reales de creación, Mis alojamientos y edición móvil a 390 px.
- [ ] Capturas de los recorridos Admin y comodidades restantes.
- [x] Commit, push y [PR #6 en borrador](https://github.com/ImpVitaLuisZ/Front-end-alojamientos/pull/6), enlazado a Issue #5.
- [ ] Revisión e integración después de completar las pruebas reales.
- [ ] ZIP de Entrega3 y presentación por Luis en Q10.

Se conserva el alojamiento ficticio de Sprint 1. Las pruebas nuevas deben utilizar registros claramente identificados como desechables y cuentas de prueba autorizadas. No se incluyen reservas, pagos ni subida de fotos. El Trabajo 4 consolidará lo integrado sin funciones nuevas.

## Prueba real del propietario y revisión móvil

El usuario de prueba 6 inició sesión y creó el alojamiento ficticio desechable 3. Flask respondió 201 y asignó usuario_id 6 sin que el formulario enviara ese campo. El formulario rechazó título vacío y precio cero. Al editar la ciudad a Bogotá, PATCH respondió 200 y el dato persistió al recargar. El alojamiento 2 de Sprint 1 se conserva sin cambios.

Las peticiones directas con esa cuenta comprobaron 400 para campos obligatorios ausentes, precio cero y comodidad inexistente; crear comodidad con rol normal dio 403. Son verificaciones reales HTTP, separadas de los 37 tests con fetch simulado.

A 390 × 844 px se detectó que la clase h-100 de la tarjeta ocupaba toda la columna y dejaba su enlace Editar fuera de ella: la tarjeta siguiente lo tapaba. Mis alojamientos ahora usa columnas flexibles y una regla de altura limitada a esa vista. Se conservó el componente público. Las filas quedan separadas por 24 px, sin desbordamiento horizontal. Las 37 pruebas y el build se repitieron y pasaron después del ajuste.

[Evidencia real del propietario](evidencias/sprint-03/propietario-real-20261104.json), [creación](evidencias/sprint-03/sprint3-creado-real-20261104.png), [lista móvil](evidencias/sprint-03/sprint3-mis-alojamientos-movil-real-20261104.png) y [edición móvil](evidencias/sprint-03/sprint3-edicion-movil-real-20261104.png).

La automatización del navegador se atascó al intentar abrir window.confirm. No se observó DELETE en el log y GET del alojamiento 3 continuó respondiendo 200. Esa confirmación y el borrado todavía no se marcan como aprobados. El registro se conserva para terminar la prueba de comodidades antes de eliminarlo.

## Recorrido para entender el código

1. Abrir CrearAlojamientoPage.js: submit recibe el evento y preventDefault evita recargar. datosDelFormulario lee los campos; validarAlojamiento decide si se puede enviar.
2. Seguir prepararAlojamiento en utils/gestion.js: recorta espacios y convierte el precio a número. El objeto tiene cuatro campos y no contiene usuario_id.
3. Abrir crearAlojamiento en api/alojamientos.api.js: llama a solicitarJSON con POST y el token de la sesión. Flask determina la propiedad y guarda el registro en MySQL.
4. Volver a la página: await espera la respuesta; el ID recibido forma la URL del detalle. El caso observado fue /alojamientos/3.
5. En EditarAlojamientoPage.js comparar las tres acciones: Guardar cambios envía campos, Guardar comodidades reemplaza asociaciones y Eliminar necesita confirmación. Son peticiones independientes.
6. En MisAlojamientosPage.js el filtro organiza los registros del usuario; puedeModificar orienta la interfaz. Ninguna de esas funciones sustituye la autorización de Flask.

Para la explicación final conviene recorrer una acción completa antes de revisar todos los archivos. Luis revisará los resultados y el código antes de presentar los cuatro trabajos; el asistente no realiza la presentación en Q10.
