MISION M2 - Async Odyssey - Web Development I
=============================================

## Como probarlo

Abre index.html en el navegador (o con Live Server).
Al entrar en la pagina web cuantos superheroes hay actualmente en la base de datos, cual es su poder promedio, cual es el más poderoso y cual es el tipo dominante.
Puedes buscar personajes por su nombre, o por su tipo y ordenarlos por orden alfabético o poder.
Te enseña el nombre del superheroe, su imagen, cuanto poder tiene en una escala del 1-10, cuales son sus poderes, de donde vienen sus poderes, la altura, el peso y su historia.

## Uso de IA

He usado la IA de la misma forma que la anterior practica: usando un prompt principal con ChatGPT y Claude y comparando las respuestas para elegir la que mas me convenga, aunque en este caso solo he usado la IA para la parte nueva sobre la practica.
Mi javaScript tiene 3 archivos: api.js que se encarga de conectar con la API que uso, hacer busquedas y la cache, la cache dura 24h y permite que no este todo el rato conectando con la API para hacer busquedas sobre el contenido; logic.js se encarga de los calculos y operaciones que hago sobre los datos de la API; y main.js que se encarga del javaScript normal de la pagina web como es el buscado o los desplegables y conectar todas las partes, esto lo hago yo y no he usado la IA para ello.
Ejemplo de prompt real:

Quiero que desarrolles el JavaScript de una página web llamada DC Hero Database, una base de datos de superhéroes de DC donde se puedan consultar personajes, buscar por nombre, filtrar por tipo y ordenar por nivel de poder.

La página debe consumir una API pública real, concretamente https://akabab.github.io/superhero-api/api/all.json, y mostrar información de los personajes, como su nombre, imagen, estadísticas y nivel de poder.

La práctica tiene como lema «El event loop no espera a nadie» y debe cumplir estos requisitos:

Utilizar fetch, async/await y manejo de errores con try/catch y response.ok.

Utilizar map, filter y reduce para transformar y procesar los datos.

Organizar el código mediante módulos ES, separando la petición a la API, la lógica de los datos y la interacción con el DOM.

Mostrar estados de carga, error y ausencia de resultados.

Evitar que la aplicación falle si la API devuelve datos incompletos o se produce un error.

Añadir una caché con localStorage como funcionalidad adicional.

Utilizar JavaScript puro, sin frameworks ni librerías externas.

El proyecto debe funcionar con Vite y tener una estructura clara, un package.json coherente y código fácil de entender y defender en un examen.

Quiero que generes el JavaScript necesario para implementar la aplicación, expliques brevemente la responsabilidad de cada archivo y compruebes que los módulos funcionan correctamente entre sí, dando ejemplos donde se podría hacer de otras alternativas.

No quiero una solución innecesariamente compleja: prioriza un código claro, funcional y que cumpla la rúbrica de la práctica.

## Autopsia

- El primer problema que me encontré al trabajar con la API y hacer la página web fue el como asignar el ID interno de cada héroe de la web, aunque parezca algo sencillo. ChatGPT me dijo de utilizar el ID de la API, que aunque significaria que no tendria dos variables diferentes de ID, tambien significa que los identificadores pueden tener números muy separados y no ser consecutivos ya que no cojo todos los personajes que tiene la API, solo unos heroes especificos; mientras que la opcion que me dio Claude fue el generar un ID que fuese la posicion de llegada de los personajes, que el primer personaje del array fuese el #1, el segundo el #2... Esto es mas sencillo y garantiza que los IDs sean consecutivos pero tiene el problema de que ahora hay 2 variables y depende del orden de los personajes, si cambio al principio del programa el orden del array al superheroe #1, ya no seria el #1 y puede ser un ligero problema. Terminé escogiendo la opcion de Claude ya que preferia que el ID interno del programa no fuese el mismo que el de la API. 

-

