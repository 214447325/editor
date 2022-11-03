export function chartsInit(scriptMap, scene) {
    let div = document.createElement('div');
    div.id = "test";
    // @ts-ignore
    document.querySelector('body').append(div)
    console.log('ppp ppp');
    console.log(scene)
    console.log(scriptMap)
    const data = scene.metadata.postProcesses;
    console.log('1111111')
    let $ = require('jquery');
    if(data.charts) {
        console.log('22222')
        console.log(data.charts)
        for(let i of data.charts) {
            let style = i.style;
            $('#test').append(`<div id="${i.id}" ><div>`)
            let dom = document.getElementById(i.id);
            // @ts-ignore
            dom?.style = style
            console.log('333333333333333')
            let echarts = require('echarts');
            if(echarts) {
                let chartDom: any = document.getElementById(i.id);
                // @ts-ignore
                let myChart = echarts.init(chartDom);
                (i.option) && myChart.setOption(i.option);
            }
            
        }
    }

}
