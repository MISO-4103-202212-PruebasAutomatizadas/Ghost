const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const path = require('path');
const fs = require('fs');

const { referencePath, testPath, resultsPath, reportJsonName, optionsCompare } = config;

async function generateReportCompare(){

  console.log("inicia proceso: ");
  console.log(`directorio de referencia: ${referencePath}`);
  console.log(`directorio de test: ${testPath}`);
  
  fs.readdir( path.resolve(__dirname, referencePath), async (err, files) => {
    if (err) throw err;
    
    let resultInfo = [];

    fs.truncate(`${resultsPath}${reportJsonName}`, 0, function(){console.log('reporte JSON preparado')});

    await Promise.all(
      files.map( async (file) => {
        console.log(`procesando imagen: ${file}`);
        if(fs.existsSync(`${referencePath}${file}`) && fs.existsSync(`${testPath}${file}`)) {
          const data = await compareImages(
            fs.readFileSync(`${referencePath}${file}`),
            fs.readFileSync(`${testPath}${file}`),
            optionsCompare
          );
          resultInfo.push(
            {
              file: file,
              data: {
                isSameDimensions: data.isSameDimensions,
                dimensionDifference: data.dimensionDifference,
                rawMisMatchPercentage: data.rawMisMatchPercentage,
                misMatchPercentage: data.misMatchPercentage,
                diffBounds: data.diffBounds,
                analysisTime: data.analysisTime
              }
            });
    
            fs.writeFileSync(`${resultsPath}${file}`, data.getBuffer());
        } else {
          console.log("Uno de los archivos de comparación no existe");
        }
      })
    )
    
    fs.writeFile(`${resultsPath}${reportJsonName}`, `${JSON.stringify(resultInfo)}`, err => {
      if(err) throw err;
      console.log(`reporte JSON generado: ${reportJsonName} `);
    });  
    
    console.log("finaliza proceso. Revisar reporte");
    
    return resultInfo;
  });    
}(async ()=> { let result = await generateReportCompare(); })();