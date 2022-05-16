# MISO - Pruebas automatizadas

## Entrega semana 6

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
| Tags            | Creación de un tag exitoso                                |   si   |  No          |  
| Member          | Añadir miembro                                            |   si   |  Playwright  |  
| Member          | modificar miembro creado                                  |   si   |  Playwright  |  
| Member          | eliminar miembro creado                                   |   si   |  Playwright  |  
| Member          | Encontrar miembro creado                                  |   si   |  Playwright  |  
| Member          | Buscar miembro creado                                     |   si   |  Playwright  |  
| Tags            | Encontrar de un tag creado                                |   si   |  No          |  
| Tags            | Actualizacion de un tag exitosa                           |   si   |  No          |  
| Tags            | Eliminacion de un tag exitoso                             |   si   |  No          |  
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
		- `ADMIN1: test@uniandes.edu.co`
		- `PASSWORD1: Uniandes21`
	- listar ghosts instalados 
		- `..\ghost-cli\node_modules\.bin\ghost ls`
	- detener ghost 
		- `..\ghost-cli\node_modules\.bin\ghost stop`
	- instalar versión de referencia
	  - `mkdir ghost-v3`
	  - `..\ghost-cli\node_modules\.bin\ghost install 3.42.0 --local`
	- en paso anterior, si no se ejecuta el comando cambiar el backslash por slash normal, es decir cambiar \ por /
	- detener ghost 
	  - `..\ghost-cli\node_modules\.bin\ghost stop`
	- configurar port de versión de ghost de referencia
	- editar config.development.json para cambiar el puerto 
	  - `url: http://localhost:2369/`
	  - `server.port: 2369`
	- iniciar ghost versión de referencia
		- `cd ..\ghost-v3`
	  - `..\ghost-cli\node_modules\.bin\ghost start`
	- configuración de ghost. Confirmar url en pantalla. (registrar el mismo usuario y password de versión de prueba) http://localhost:2369/ghost/#/setup
		- `ADMIN1: test@uniandes.edu.co`
		- `PASSWORD1: Uniandes21`
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
	- URL: http://localhost:2369/ | http://localhost:2368/   -> *la selección depende de la versión a probar. 2369 para Ghost V3.42.0, 2368 para Ghost 4.46.0*
	- URLADMIN: http://localhost:2369/ghost | http://localhost:2368/ghost   -> *la selección depende de la versión a probar. 2369 para Ghost V3.42.0, 2368 para Ghost 4.46.0*
	- VERSIONGHOST: 3 | 4  -> *3: versión de referencia Ghost V3.42.0, 4: versión de prueba Ghost 4.46.0*

**ejecución de pruebas**
1. Pre-requisitos
	- Iniciar ghost de referencia y ghost de prueba 
	- Tener instalado el navegador chrome o similar donde se realizará la prueba
	- Al ejecutarse por primera vez kraken otorgar permisos de privacidad, aceptar terminos en ventana emergente (solo en sistema operativo windows)
2. Configuración de usuario y password
	- Configurar properties.json
	- `ADMIN1: test@uniandes.edu.co`
	- `PASSWORD1: Uniandes21`
3. **Ejecutar para ghost de referencia**
	- Configurar properties.json
		- `URL: http://localhost:2369/`
		- `URLADMIN: http://localhost:2369/ghost`
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

1. index.js: es necesario actualizar userAdmin y adminPass
	- userAdmin: usuario de ghost local 
	- adminPass: password de ghost local 
	- postTitle: titulo post de prueba 
	- postDesc: descripción de post de prueba 
	- minutesAddPublishPost: minutos a futuro para programar la publicación de un post 
	- tag: tag de prueba
	- Dependiendo de que versión de ghost quiera realizar la prueba, solo debe cambiar las constante "ghostVersion" y poner un 3 (ghost versión 3) o 	    un 4 (ghost versión 4) y correr las pruebas (node index.js). 
2. index-page.js: es necesario actualizar userAdmin y adminPass
	- userAdmin: usuario de ghost local 
	- adminPass: password de ghost local 
	- pageTitle: titulo page de prueba 
	- pageDesc: descripción de page de prueba 
	- minutesAddPublishPost: minutos a futuro para programar la publicación de un page 
	- tag: tag de prueba 
	- Dependiendo de que versión de ghost quiera realizar la prueba, solo debe cambiar las constante "ghostVersion" y poner un 3 (ghost versión 3) o 	    un 4 (ghost versión 4) y correr las pruebas (node index-page.js). 



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