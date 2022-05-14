import json from 'http://127.0.0.1:8080/report/results/results.json' assert { type: 'json' };

var i = 0;
var content = "";

json.forEach(item => {

    content += 
    `<div class='accordion accordion-flush' id='accordionFlushExample'>
        <div class='accordion-item'>
            <h2 class='accordion-header' id='flush-heading${i}'>
                <button class='accordion-button collapsed' type='button' data-bs-toggle='collapse' data-bs-target='#flush-collapse${i}' aria-expanded='false' aria-controls='flush-collapse${i}'>
                    <span class='info mx-4'>${item.file}</span> <span class='info mx-4'>Diferencia (%): ${item.data.misMatchPercentage}</span> <span class='info mx-4'>Duración: ${item.data.analysisTime} segs</span></br>
                    <span class="lead">${JSON.stringify(item.data)}</span>
                </button>
            </h2>
        <div id='flush-collapse${i}' class='accordion-collapse collapse' aria-labelledby='flush-heading${i}' >
            <div class='accordion-body row'>
                <div class='col-4'>
                    <h4 class='text-center'><code>Reference</code></h4>
                    <img src='ghostV3/${item.file}' alt='reference test_1' class='img-fluid' />
                </div>
                <div class='col-4'>
                    <h4 class='text-center'><code>Test</code></h4>
                    <img src='ghostV4/${item.file}' alt='test test_1' class='img-fluid'/>
                </div>
                <div class='col-4'>
                    <h4 class='text-center'><code>Compare</code></h4>
                    <img src='results/${item.file}' alt='result compare test_1' class='img-fluid'/>
                </div>
            </div>
        </div>
    </div>`;

    
    i++;

});

var element = document.getElementById('content');
    element.innerHTML = content;
