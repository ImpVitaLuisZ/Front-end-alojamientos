# Sprint 3: CRUD y comodidades

Estado al 4 de noviembre de 2026: código implementado; 37/37 pruebas, sintaxis y build correctos. Pruebas reales CRUD, capturas, revisión, publicación y ZIP todavía pendientes. No se presenta un mock como evidencia de MySQL.

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
- [ ] Capturas reales y adaptación móvil.
- [ ] Commit, push, PR en borrador, revisión y merge autorizado.
- [ ] ZIP de Entrega3 y presentación por Luis en Q10.

Se conserva el alojamiento ficticio de Sprint 1. Las pruebas nuevas deben utilizar registros claramente identificados como desechables y cuentas de prueba autorizadas. No se incluyen reservas, pagos ni subida de fotos. El Trabajo 4 consolidará lo integrado sin funciones nuevas.
