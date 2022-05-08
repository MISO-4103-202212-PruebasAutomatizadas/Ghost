# MISO - Pruebas automatizadas

## Entrega semana 5

### Integrantes

- Ronald Lugo <r.lugoq@uniandes.edu.co>
- 
- 
- 

### Funcionalidades y escenarios probados
| Funcionalidades | Escenarios                                                | Kraken | Segunda herr |
|-----------------|-----------------------------------------------------------|--------|--------------|  
| Post            | Creación y publicación inmediata de Post exitosa          |   si   |              | 
| Post            | Creación y publicación programada de Post exitosa         |   si   |              | 
| Post            | Despublicar un post de manera exitosa                     |   si   |              | 
| Post            | Asignar tag a Post y publicar actualización               |   si   |              | 
| Post            | Eliminar Post satisfactoriamente                          |   si   |              | 
| 6               |                                                           |        |              | 
| 7               |                                                           |        |              |  
| 8               |                                                           |        |              |  
| 9               |                                                           |        |              |  
| 10              |                                                           |        |              |  
| 11              |                                                           |        |              |  
| 12              |                                                           |        |              |  
| 13              |                                                           |        |              |  
| 14              |                                                           |        |              |  
| 15              |                                                           |        |              |  
| 16              |                                                           |        |              |  
| 17              |                                                           |        |              |  
| 18              |                                                           |        |              |  
| 19              |                                                           |        |              |  
| 20              |                                                           |        |              |  


### Aplicación bajo pruebas 

#### Ghost versión 4.46.0

1. Pre-requisitos:
	- versión de node: V16.15.0
	- versión de npm: 8.5.5
2. Instalar Ghost-cli
	- abrir terminal
	- crear carpeta ghost-cli e ingresar
	`mkdir ghost-cli`
	`cd ghost-cli`
	- instalar ghost-cli 
	`npm install ghost-cli@latest`
	`cd ..`
	`mkdir ghost `
	`cd ghost` 
	`..\ghost-cli\node_modules\.bin\ghost install 4.46.0 --local`
	- configuración de ghost. Confirmar url en pantalla. (el usuario y password que se configure se usarán más adelante)
	http://localhost:2368/ghost/#/setup 
	- listar ghosts instalados 
	`..\ghost-cli\node_modules\.bin\ghost ls`
	- detener ghost 
	`..\ghost-cli\node_modules\.bin\ghost stop`
	- iniciar ghost 
	`..\ghost-cli\node_modules\.bin\ghost start`

### Pruebas E2E

** Clonar repositorio **
`git clone https://github.com/MISO-4103-202212-PruebasAutomatizadas/Ghost.git miso-automatizadas-equipo46`
`cd .\miso-automatizadas-equipo46`
`git pull origin`

#### Kraken

** versiones **
- versión de node: V16.15.0
- versión de npm: 8.5.5

** configuraciones **
`cd .\krakenGhost`
`npm install`
`code .`

1. properties.json: es necesario actualizar ADMIN1 y PASSWORD1
	- ADMIN1: usuario de ghost local 
	- PASSWORD1: password de ghost local 
	- POSTTITLE: titulo post de prueba 
	- POSTDESC: descripción de post de prueba 
	- MINUTESADDPUBLISHPOST: minutos a futuro para programar la publicación de un post 
	- TAGTEST1: tag de prueba 
2. page_objects: en caso que ghost local tenga una url diferente a `http://localhost:2368`, se debe actualizar en los siguientes page_objects
	- dashboard.page.js
	- login.page.js
	- page.js
	- post_edit.page.js
	- post.page.js
	- tag_edit.page.js
	- tags.page.js

** ejecución de pruebas **
1. Pre-requisitos
	- Iniciar ghost 
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

### Pros y contra

** Kraken **
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

** Segunda herramienta **
- PROS 
- CONTRA
