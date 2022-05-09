# MISO - Pruebas automatizadas

## Entrega semana 5

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
| 11              |                                                           |        |              |  
| 12              | Añadir miembro                                            |   si   |  Playwright  |  
| 13              | modificar miembro                                         |   si   |  Playwright  |  
| 14              | modificar perfil                                          |   si   |  Playwright  |  
| 15              | invitar personas staff                                    |   si   |  Playwright  |  
| 16              | reenviar invitacion staff                                 |   si   |  Playwright  |  
| 17              |                                                           |        |              |  
| 18              |                                                           |        |              |  
| 19              |                                                           |        |              |  
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

#### Ghost versión 4.46.0

1. Pre-requisitos:
	- versión de node: V16.15.0
	- versión de npm: 8.5.5	
2. Instalar Ghost-cli
	- abrir terminal
	- crear carpeta ghost-cli e ingresar
		- `mkdir ghost-cli`
		- `cd ghost-cli`
	- instalar ghost-cli
		- `npm install ghost-cli@latest`
		- `cd ..`
		- `mkdir ghost `
		- `cd ghost` 
		- `..\ghost-cli\node_modules\.bin\ghost install 4.46.0 --local`
	- en paso anterior, si no se ejecuta el comando cambiar el backslash por slash normal, es decir cambiar \ por /
	- configuración de ghost. Confirmar url en pantalla. (el usuario y password que se configure se usarán más adelante) http://localhost:2368/ghost/#/setup 
	- listar ghosts instalados 
		- `..\ghost-cli\node_modules\.bin\ghost ls`
	- detener ghost 
		- `..\ghost-cli\node_modules\.bin\ghost stop`
	- iniciar ghost 
		- `..\ghost-cli\node_modules\.bin\ghost start`

### Pruebas E2E

**Clonar repositorio**
- `git clone https://github.com/MISO-4103-202212-PruebasAutomatizadas/Ghost.git miso-automatizadas-equipo46`
- `cd .\miso-automatizadas-equipo46`
- `git pull origin`

#### Kraken

**versiones**
- versión de node: V16.15.0
- versión de npm: 8.5.5

**configuraciones**
- `cd .\krakenGhost`
- `npm install`

1. properties.json: es necesario actualizar ADMIN1 y PASSWORD1
	- ADMIN1: usuario de ghost local 
	- PASSWORD1: password de ghost local 
	- POSTTITLE: titulo post de prueba 
	- POSTDESC: descripción de post de prueba 
	- MINUTESADDPUBLISHPOST: minutos a futuro para programar la publicación de un post 
	- TAGTEST1: tag de prueba 
	- <PAGETITLE> : titulo page de prueba
	- <PAGEDESC> : Conetido de page de prueba
2. page_objects: en caso que ghost local tenga una url diferente a `http://localhost:2368`, se debe actualizar en los siguientes page_objects
	- dashboard.page.js
	- login.page.js
	- page.js
	- post_edit.page.js
	- post.page.js
	- tag_edit.page.js
	- tags.page.js
	- page.page.js
	- page_edit.page.js

**ejecución de pruebas**
1. Pre-requisitos
	- Iniciar ghost 
	- Tener instalado el navegador chrome o similar donde se realizará la prueba
	- Al ejecutarse por primera vez kraken otorgar permisos de privacidad, aceptar terminos en ventana emergente (solo en sistema operativo windows)
2. Ejecutar en terminal externa o de vscode
	`node .\node_modules\kraken-node\bin\kraken-node run`
3. Manejo de excepciones
	- Excepción: EPERM: operation not permitted. Error por permisos en carpetas al iniciar más de una instancia de navegador
		- Causa: incompatibilidad de permisos en directorios windows
		- Workaround: comentarear 4 escenarios y ejecutarlos uno a uno 
	- Excepción: errores con el formato `Error: element ("a[href*='posts']") still not displayed after 5000ms`
		- Causa: dependiendo de los recursos de máquina, carga actual, entre otros factores, esporádicamente se pueden presentar estos casos
		- Workaround: comentarear 4 escenarios y ejecutarlos uno a uno para comprobar el funcionamiento con la menor carga posible
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

#### Playwrite
** versiones **
- versión de node: V16.15.0
- versión de npm: 8.5.5

** configuraciones **
- `cd .\playwrightGhost`
- `npm install playwright`
- `code .`

1. index.js: es necesario actualizar userAdmin y adminPass
	- userAdmin: usuario de ghost local 
	- adminPass: password de ghost local 
	- postTitle: titulo post de prueba 
	- postDesc: descripción de post de prueba 
	- minutesAddPublishPost: minutos a futuro para programar la publicación de un post 
	- tag: tag de prueba 

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
