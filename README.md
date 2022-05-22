# MISO - Pruebas automatizadas

## Entrega semana 7

### Integrantes

- Ronald Lugo <r.lugoq@uniandes.edu.co>
- Juan Sebastian Ballesteros <j.ballesterosm@uniandes.edu.co>
- Rafael Brache <r.brache@uniandes.edu.co>
- Edinson Morales <e.moralesm2@uniandes.edu.co>

### Funcionalidades y escenarios probados
| Funcionalidades | Escenarios                                                | Kraken | Segunda herr |
|-----------------|-----------------------------------------------------------|--------|--------------|  
| Post            | Creación y publicación inmediata de Post exitosa          |   si   |  Playwright  | 
| Post            | Creación y publicación programada de Post exitosa         |   si   |  Playwright  | 
| Post            | Despublicar un post de manera exitosa                     |   si   |  Playwright  | 
| Post+Tag        | Asignar tag a Post y publicar actualización               |   si   |  Playwright  | 
| Post            | Eliminar Post satisfactoriamente                          |   si   |  Playwright  | 
| Page            | Creación y publicación de Page                            |   si   |  Playwright  | 
| Page            | Creación y publicación programada de Page exitosa         |   si   |  Playwright  |  
| Page            | Eliminar Page                                             |   si   |  Playwright  |  
| Page            | Despublicar un Page                                       |   si   |  Playwright  |  
| Page + Tags     | Asignar tag a Page                                        |   si   |  Playwright  |
| Tags            | Creación de un tag exitoso                                |   si   |  Playwright  |  
| Member          | Añadir miembro                                            |   si   |  Playwright  |  
| Member          | modificar miembro creado                                  |   si   |  Playwright  |  
| Member          | eliminar miembro creado                                   |   si   |  Playwright  |  
| Member          | Encontrar miembro creado                                  |   si   |  Playwright  |  
| Member          | Buscar miembro creado                                     |   si   |  Playwright  |
| Tags            | Encontrar de un tag creado                                |   si   |  Playwright  |  
| Tags            | Actualizacion de un tag exitosa                           |   si   |  Playwright  |  
| Tags            | Eliminacion de un tag exitoso                             |   si   |  Playwright  |  
| 20              |                                                           |        |              |  

### Patrones
- **Kraken**
	- **Given-When-Then**: archivos `features/*.feature`
	- **Page Objects**: 
		- se definen en `features/web/pages_objects/clases.page.js`
		- se usan en `features/step_definitions/step.js`
		- se usan en `features/step_definitions/page-step.js`
- **Playwright**
	- **Given-When-Then**: `index.js`
	- **Page Objects**: `page_objects/`

### Aplicación bajo pruebas 

#### Ghost: pruebas de regresión
**versión de referencia:** 3.42.0 
**versión de prueba:** 4.46.0

1. Pre-requisitos: versiones compatibles con las dos versiones de Ghost
	- versión de node: V14.19.1 
	- versión de npm: 6.14.16 

	**Opcional en windows: instalar nvm:**
	- descargar instalador para windows: https://github.com/coreybutler/nvm-windows/releases
	- abrir powershell como administrador
	- `nvm install 14.19.1` | instalar versión de prerequisito
	- `nvm ls` | listar versiones instaladas
	- `nvm use 14.19.1` | usar versión específica
	- abrir powershell con usuario normal
	- `node -v` | confirmar versión actual de node

2. Instalar Ghost-cli
	- abrir terminal
	- crear carpeta ghost-cli e ingresar
		- `mkdir ghost-cli`
		- `cd ghost-cli`
	- instalar ghost-cli
		- `npm install ghost-cli@latest`
		- `cd ..`
	- instalar versión de prueba
		- `mkdir ghost `
		- `cd ghost` 
		- `..\ghost-cli\node_modules\.bin\ghost install 4.46.0 --local`
	- en paso anterior, si no se ejecuta el comando cambiar el backslash por slash normal, es decir cambiar \ por /
	- configuración de ghost. Confirmar url en pantalla. (el usuario y password que se configure se usarán más adelante) http://localhost:2368/ghost/#/setup 
		- `ADMIN1: r.brache@uniandes.edu.co`
		- `PASSWORD1: uniandes21`
	- listar ghosts instalados 
		- `..\ghost-cli\node_modules\.bin\ghost ls`
	- detener ghost 
		- `..\ghost-cli\node_modules\.bin\ghost stop`
	- instalar versión de referencia
	  - `mkdir ghost-v3`
	  - `cd ghost-v3`
	  - `..\ghost-cli\node_modules\.bin\ghost install 3.42.0 --local`
	- en paso anterior, si no se ejecuta el comando cambiar el backslash por slash normal, es decir cambiar \ por /
	- detener ghost 
	  - `..\ghost-cli\node_modules\.bin\ghost stop`
	- configurar port de versión de ghost de referencia
	- editar config.development.json para cambiar el puerto 
	  - `url: https://pruebas-automatizadas.herokuapp.com/`
	- iniciar ghost versión de referencia
		- `cd ..\ghost-v3`
	  - `..\ghost-cli\node_modules\.bin\ghost start`
	- configuración de ghost. Confirmar url en pantalla. (registrar el mismo usuario y password de versión de prueba) https://pruebas-automatizadas.herokuapp.com/ghost/#/setup
		- `ADMIN1: r.brache@uniandes.edu.co`
		- `PASSWORD1: uniandes21`
	- iniciar ghost versión de prueba
	  - `cd ..\ghost`
	  - `..\ghost-cli\node_modules\.bin\ghost start`

### Pruebas E2E

**Clonar repositorio**
- `git clone https://github.com/MISO-4103-202212-PruebasAutomatizadas/Ghost.git miso-automatizadas-equipo46`
- `cd .\miso-automatizadas-equipo46`
- `git pull origin`

#### Kraken

**versiones** *versiones compatibles con las dos versiones de Ghost*
- versión de node: V14.19.1 
- versión de npm: 6.14.16 

**configuraciones**
- `cd .\krakenGhost`
- `npm install`

1. properties.json: es necesario actualizar ADMIN1 y PASSWORD1
	- ADMIN1: usuario de ghost local   -> *se espera que se sea el mismo en las dos versiones de ghost, en caso contrario se debe modificar en cada prueba*
	- PASSWORD1: password de ghost local   -> *se espera que se sea el mismo en las dos versiones de ghost, en caso contrario se debe modificar en cada prueba*
	- POSTTITLE: titulo post de prueba 
	- POSTDESC: descripción de post de prueba 
	- MINUTESADDPUBLISHPOST: minutos a futuro para programar la publicación de un post 
	- TAGTEST1: tag de prueba 
	- PAGETITLE : titulo page de prueba
	- PAGEDESC : Contenido de page de prueba
	- PATHEXPORTSCREENSHOT: ../pruebasDeRegresion/report/ghostV    -> *Path de exportación. Se concatena con VERSIONGHOST*
	- URL: https://pruebas-automatizadas.herokuapp.com/ | http://localhost:2368/   -> *la selección depende de la versión a probar. En heroku para Ghost V3.42.0, puerto 2368 para Ghost 4.46.0*
	- URLADMIN: https://pruebas-automatizadas.herokuapp.com/ghost | http://localhost:2368/ghost   -> *la selección depende de la versión a probar. En heroku para Ghost V3.42.0, 2368 para Ghost 4.46.0*
	- VERSIONGHOST: 3 | 4  -> *3: versión de referencia Ghost V3.42.0, 4: versión de prueba Ghost 4.46.0*

**ejecución de pruebas**
1. Pre-requisitos
	- Iniciar ghost de referencia y ghost de prueba 
	- Tener instalado el navegador chrome o similar donde se realizará la prueba
	- Al ejecutarse por primera vez kraken otorgar permisos de privacidad, aceptar terminos en ventana emergente (solo en sistema operativo windows)
2. Configuración de usuario y password, se recomienda que para las dos versiones de ghost se usen este mismo usuario y contraseña
	- Configurar properties.json
	- `ADMIN1: r.brache@uniandes.edu.co`
	- `PASSWORD1: uniandes21`
3. **Ejecutar para ghost de referencia**
	- Configurar properties.json
		- `URL: https://pruebas-automatizadas.herokuapp.com/`
		- `URLADMIN: https://pruebas-automatizadas.herokuapp.com/ghost`
		- `VERSIONGHOST: 3`
4. Ejecutar en terminal externa o de vscode
	`node .\node_modules\kraken-node\bin\kraken-node run`
5. Verificar la generación de imágenes
	- `cd ..\pruebasDeRegresion\report\ghostV3`
	- formato: `ghostV3/kraken_esc_${this.userId}_<descripcion_paso>.png`
6. **Ejecutar para ghost de base**
	- Configurar properties.json
		- `URL: http://localhost:2368/`
		- `URLADMIN: http://localhost:2368/ghost`
		- `VERSIONGHOST: 4`
7. Ejecutar en terminal externa o de vscode
	`node .\node_modules\kraken-node\bin\kraken-node run`
8. Verificar la generación de imágenes
	- `cd ..\pruebasDeRegresion\report\ghostV4`
	- formato: `ghostV4/kraken_esc_${this.userId}_<descripcion_paso>.png`
9. Manejo de excepciones
	- Excepción: EPERM: operation not permitted. Error por permisos en carpetas al iniciar más de una instancia de navegador
		- Causa: incompatibilidad de permisos en directorios windows
		- Workaround: comentarear 4 escenarios y ejecutarlos uno a uno 
	- Excepción: errores con el formato `Error: element ("a[href*='posts']") still not displayed after 5000ms`
		- Causa: dependiendo de los recursos de máquina, carga actual, entre otros factores, esporádicamente se pueden presentar estos casos
		- Workaround: comentarear 4 escenarios y ejecutarlos uno a uno para comprobar el funcionamiento con la menor carga posible (realizar lo mismo para los demás archivos .feature)
	- Excepción: Error: Command failed: adb devices -l
		- Causa: 'adb' is not recognized as an internal or external command
		- Workaround: 
			- Revisar en archivos .feature que no existan referencias @web
			- Instalar platform-tools
				- Instalación en windows 
				Ir a: `https://developer.android.com/studio/releases/platform-tools `
				Descargar: Download SDK Platform-Tools for Windows 
				Descomprimir y migrar carpeta platform-tools a la ruta `C:\Users\<<user>>\AppData\Local\Android\Sdk`
				agregar a la variable de entorno **PATH** de usuario: `C:\Users\<<user>>\AppData\Local\Android\Sdk\platform-tools `
	- Excepción: Error Ghost: "only 100 tries per IP address every 3600 seconds" 
		- Causa: Configuración por defecto de Ghost 
		- Workaround: Ingresar a base de datos de Ghost `ghost\content\data\ghost-local` con un visor de sqlite / editar tabla **brute** / cambiar el valor del campo count de 100 a 1. Confirmar los cambios

#### Playwright
**versiones**
- versión de node: V14.19.1 
- versión de npm: 6.14.16

**configuraciones**
- `cd .\playwrightGhost`
- `npm install playwright`
- para correr: node [nombre archivio]

1. Cambiar valores segun corresponda en index.js, index_members.js, index_tags y index-page.js con:
	- configurar en archivo properties.json con datos de pruebas:
		- es necesario actualizar userAdmin y adminPass
		- userAdmin: usuario de ghost local 
		- adminPass: password de ghost local 
		- postTitle: titulo post de prueba  
		- postDesc: descripción de post de prueba 
		- minutesAddPublishPost: minutos a futuro para programar la publicación de un post 
		- tag: tag de prueba	
		- pageTitle: titulo page de prueba
		- Dependiendo de que versión de ghost quiera realizar la prueba, solo debe cambiar las constante "ghostVersion" y poner un 3 (ghost versión 3) o un 4 (ghost versión 4).
	
2. Correr las pruebas para index.js, index_members.js, index_tags y index-page.js  (node index.js).

#### Resemblejs
**versiones**
- versión de node: V14.19.1 
- versión de npm: 6.14.16

**configuraciones**
- `cd .\pruebasDeRegresion\`
- `npm install`

1. .\resemblejs\config.json
	- referencePath: ../report/ghostV3/  -> *path imágenes Ghost de referencia*
  - testPath: ../report/ghostV4/  -> *path imágenes Ghost de prueba*
  - resultsPath: ../report/results/  -> *path resultados de resemblejs*
  - reportJsonName: results.json  -> *nombre del archivo json generado por resemblejs*
  - optionsCompare:  -> *opciones de configuración de la comparación*
    - output: 
      - errorColor: 
        - red: 255
        - green: 0
        - blue: 255
      - errorType: movement
      - largeImageThreshold: 1200
      - useCrossOrigin: false
      - outputDiff: true
  - scaleToSameSize: true  -> *comparación de imágenes en la misma escala*
  - ignore: "antialiasing  
2. ejecutar pruebas de regresión con resemblejs
	- `cd .\resemblejs\`
	- `node .\index.js`
3. verificar generación de resultados
	- `path: ..\report\results\`  -> *verificar creación de imágenes y results.json*
4. iniciar servidor web local para consultar reporte
	- `cd pruebasDeRegresion\`
	-	`node .\node_modules\http-server\bin\http-server`
	- `ir a http://127.0.0.1:8080/report/`  -> *confirmar que el puerto que inició el servidor sea el 8080* 

### Pros y contra

**Kraken**
- PROS
  - La funcionalidad signaling es muy útil para simular escenarios sincronizados con más de un usuario
  - El formato del reporte es muy útil, intuitivo y usable
  - Las imágenes generadas generalmente son acordes al step correspondiente (pocas imágenes en blanco o erradas)
  - El soporte del patrón `Given-When-Then` es muy útil desde la perspectiva de pruebas E2E y la comunicación con los stakeholders
  - La implementación del patrón `Page objects` fue relativamente sencilla
  - El soporte de eventos como waitForDisplayed reduce la ocurrencia de eventos aleatorios como tiempo de respuesta, carga alta, entre otros, que afectan la estabilidad en la ejecución de las pruebas
- CONTRA
  - El proceso de instalación en windows fue bastante complicado 
  - El manejo de excepciones no es tan claro en algunos casos como en casos de comillas erradas
  - La implementación de escenarios paralelos que se hablan entre si, genera un trade-off respecto al principio del patrón `Given-When-Then` que sugiere que cada escenario debe ser independiente, es decir, no debe depender de la ejecución de otro escenario
  - Los `Step` no soportan `expect`de manera nativa. Conceptualmente frente al manejo de `Given-When-Then` es mucho más claro el manejo de expect o asserts, que indiquen explíctamente el cumplimiento de la prueba
  - No se observó soporte nativo para las `Page objects`
	- El consumo y carga de recursos de la máquina al momento de ejecutar las pruebas, afecta significativamente el resultado de las pruebas, generando falsos positivos en el sentido que arroja errores porque no encuentra un elemento, pero en realidad si lo carga, solo que tardó más del timeout
  - El setup de las pruebas es muy manual
  - Se necesitan instalaciones que posiblemente no se utilicen

**Playwright**
- PROS 
	- Nivel de detalle en la simulación de eventos reales que realizaría un usuario, como en el caso de type, que simula la digitación, más que solo colocar un dato en un campo
	- La generación de imágenes es bastante consistente y útil
	- Simulación de keyboard, que permitió agregar funcionalidades como presionar un Tab
	- El manejo asíncrono de eventos es muy útil para reducir los tiempos muertos y aprovechar al máximo el recurso de máquina disponible
	- Se pueden ejecutar test en paralelo
	- El setup de la herramienta es simple
	- Capacidad de hacer test en diferentes browsers
- CONTRA
	- Bajo el manejo actual (index.js), no hay un soporte claro al patrón `Given-When-Then`
	- Al manejar todos los escenarios en el index.js, dificulta la lectura, entendimiento, modificación y ejecución independiente de los mismos
	- Ausencia per se de reportes útiles para seguimiento o para un stakeholder
	- Ausencia por default de mensajes en pantalla que indiquen el flujo de las ejecuciones

**Resemblejs**
- PROS
	- Facilidad de integración en diferentes contextos. La ejecución de la comparación se realiza instanciando el método compareImages
	- Capacidad de personalización de la prueba a través del config.json
	- Metadata generada del resultado de la comparación, con información como el grado de match y el tiempo de procesamiento
	- Generación de imágenes útiles para la regresión visual
- CONTRA
	- No genera un reporte nativo que permita identificar toda la información que brinda
	- La calidad de la imágen de comparación es buena, sin embargo podría mejorar

**Backstop**
- PROS
	- Integración nativa con Puppeteer y Playwright 
	- Flexibilidad de uso comparando con una versión previamente aprobada, o con dos url simultáneas
	- Grado de granularidad en la configuración, principalmente en la definición del nivel de comparación que indica que son similares para identificar diferencias
	- El reporte interactivo es muy usable y útil, tanto en la pantalla general como al ingresar a una imágen específica
	- La calidad de la imágen resultado es muy buena
- CONTRA
	- Al tener integraciones nativas, genera mayor dificultad al tratar de integrarlo con otras herramientas
	- No se logró identificar como usarlo a partir de imágenes ya existentes


## Semana 7: Validación de datos

### Estrategias de validación de datos

| Estrategia        | Objetivo                              | Implementación                     |
|-------------------|---------------------------------------|------------------------------------|
| A priori          | Contar con datos predefinidos orientados al cumplimiento del oráculo en el que son usados | Archivo Json *datapools/post.datapool.js* con estructura *[element][valid\|invalid][values]*. Se realiza la carga a través de *import* y se usa en los escenarios definidos. Se usa la estrategia `dataPoolVar.element.status.forEach((item, index) => { test('test', async ({page}) => { ... }) })`, de tal forma que cada valor definido se ejecuta en el escenario de manera aislada |
| Pseudo-aleatorio  | Generar un pool de datos aleatorios en tiempo de ejecución, basados en un esquema previamente establecido, el cual está orientado al oráculo para el que son usados | Consumo de API Mockaroo, el cual retorna un archivo JSON con datos del esquema establecido. El esquema está configurado con datos de tipo *sentences, datetime, time, linkedid skill, username, words, paragraphs, naughty string*. La integración con el proyecto se realiza a través del paquete de node *mockaroo* y se instancia en *test.beforeAll* generando el pool una única vez por ejecución, a través del cliente `new Mockaroo.Client({ apiKey: ... })` y generando/obteniendo los datos a través de `client.generate({count,schema}).then(function(records) { poolLocal = records })`, de tal manera que el pool pueda ser usado en todos los escenarios establecidos. Los valores correspondientes se leen de `properties.js` | 
| Aleatorios        | Generar datos aleatorios en tiempo de ejecución al momento en que son requeridos | Uso de paquete `@faker-js/faker`. Se asigna la semilla en `beforeAll` a partir de la configuración de `properties.js`. Se instancia en cada escenario donde es requerido de la forma `faker.tipo.dato()`. Principalmente fueron usados en casos donde se requería una cantidad fija de caracteres. | 

### Escenarios

| Nro | Escenario                  | Tipo de test | Estrategia principal  | Hallazgo identificado |
|-----|----------------------------|--------------|-----------------------|-----------------------|
| 1   | Crear post con titulo y descripcion vacios | Positiva | A priori | |  
| 2   | Crear post con titulo válido | Positiva | A priori | |  
| 3   | Crear post con titulo inválido | Negativa | Aleatorio | |  
| 4   | Crear post titulo con caracteres especiales | Positiva | Pseudo aleatorio | |  
| 5   | Crear post con url válida | Positiva | Pseudo aleatorio | Issue-27 |  
| 6   | Crear post con url vacia | Negativa | A priori | Issue-28 |  
| 7   | Crear post con url invalida por valor | Negativa | A priori | |  
| 8   | Crear post con url invalida por longitud | Negativa | Aleatorio | Issue-29 |  
| 9   | Programar publicación de post con fecha y hora valida | Positiva | Aleatorio | |  
| 10  | Programar publicación de post con fecha y hora en el pasado | Negativa | Aleatorio | |  
| 11  | Programar publicación de post con formato de fecha invalido | Negativa | Pseudo aleatorio | |  
| 12  | Programar/desprogramar/publicar post con fecha y hora invalida | Negativa | Aleatorio | Issue-30 |  
| 13  | Programar publicación de post con formato de hora invalido | Negativa | Aleatorio | |  
| 14  | Crear post con tag aleatorio válido | Positiva | Pseudo aleatorio | |  
| 15  | Crear post con tag aleatorio inválido | Negativa | Aleatorio | Issue-31 |  
| 16  | Crear post con tag existente | Positiva | A priori | |  
| 17  | Publicar post sin author | Negativa | A priori | |  
| 18  | Publicar post con author aleatorio | Negativa | Pseudo aleatorio | |  
| 19  | Crear post con metadata title vacio | Positiva | A priori | |  
| 20  | Crear post con metadata title válido | Positiva | Pseudo aleatorio | |  
| 21  | Crear post con metadata title válido mayor a 60 caracteres | Positiva | Aleatorio | |  
| 22  | Crear post con metadata title válido mayor a 300 caracteres | Negativa | Aleatorio | |  
| 23  | Crear post con metadata description vacio | Positiva | A priori | |  
| 24  | Crear post con metadata description válido | Positiva | Pseudo aleatorio | |  
| 25  | Crear post con metadata description válido mayor a 145 caracteres | Positiva | Aleatorio | |  
| 26  | Crear post con metadata description válido mayor a 500 caracteres | Negativa | Aleatorio | |  
| 27  | Crear post con metadata url canónica vacia | Positiva | A priori | |  
| 28  | Crear post con metadata url canónica válida | Positiva | A priori | |  
| 29  | Crear post con metadata url canónica inválida | Negativa | Pseudo aleatorio | |  
| 30  | Crear post con excerpt aleatorio | Positiva | Aleatorio | |  

### Implementación

**versiones**
- versión de node: V16.15.0
- versión de npm: 6.14.16
- versión de aplicación de prueba: Ghost 4.46.0

**instalación**
- `cd .\playwrightGhostDatos\`
- `npm install`

**configuraciones**
- properties.js
	- url: url de ghost como visitante
	- urlAdmin: url de ghost como admin
	- pathReports: ubicación de imágenes generadas por cada escenario
	- userAdmin: usuario de ghost local
	- adminPass: password de ghost local
	- mockarooPostApiKey: ApiKey en Mockaroo para acceder al archivo json generado a partir del esquema
	- mockarooPostCount: cantidad de registros que se esperan obtener
	- mockarooPostSchema: esquema del que se espera recibir datos
	- fakerSeed: semilla para datos aleatorios de faker
- datapools/post.datapool.js
	- configuración de valores para pool de datos a priori

**ejecución**
- Ejecución de todas las pruebas *verificar ubicación en playwrightGhostDatos*
	`npx playwright test`
- Ejecución de un feature en particular
	`npx playwright test file.spec.ts`
- Ejecución de un escenario particular
	`npx playwright test -g "Scenario: n"`

**manejo de errores**
- En caso de generarse *errores en page.goto o page.type*, algunos causales son:
	- verificar que ghost haya iniciado y que se haya configurado correctamente la url
	- verificar manualmente que la api de Mockaroo esté disponible y que no haya completado las 200 peticiones diarias de la versión free `https://my.api.mockaroo.com/postSchema.json?key=XXXXXX` *XXXXX se encuentra disponible en properties.js*

**referencia**
- Repositorio: https://github.com/MISO-4103-202212-PruebasAutomatizadas/Ghost
- Instrucciones: Readme - apartado 'Semana 7: Validación de datos'
- Wiki: https://github.com/MISO-4103-202212-PruebasAutomatizadas/Ghost/wiki/Semana-7:-Validaci%C3%B3n-de-datos
- Issues (prefijo DATOS): https://github.com/MISO-4103-202212-PruebasAutomatizadas/Ghost/issues