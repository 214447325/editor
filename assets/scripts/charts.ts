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
            // https://cdn.bootcss.com/echarts/4.2.1/echarts.simple.min.js
            // $('body').append(` <script src="https://cdn.bootcss.com/echarts/4.2.1/echarts.simple.min.js" type="text/javascript"></script>`)
            let dom = document.getElementById(i.id);
            // @ts-ignore
            dom?.style = style
            console.log('333333333333333')
            // console.log(require('echarts'))
            // setChart(i.id,i.option);
            let echarts = require('echarts');
            
            let chartDom: any = document.getElementById(i.id);
            // @ts-ignore
            let myChart = echarts.init(chartDom);
            (i.option) && myChart.setOption(i.option);
        }
    }
    
    // let charts = scene.charts ?? []
    // console.log(charts);
    // let $ = require('jquery');
    // let chartArray = scene.metadata.postProcesses
    // let test = chartArray ? chartArray.test : ''
    // console.log(chartArray);
    // console.log(test);
    // if(chartArray && chartArray.length > 0) {
        // for(let i of chartArray) {
        //     let style = i.style;
        //     $('#test').append(`<div id="${i.id}" style="${style}"><div>`)
        //     setChart(i.id,i.option);
        // }
    // }


    // console.log()

}

// export function setChart(id,option) {
//     console.log('*******************************');
//     console.log(id)
//     console.log(option)
    // let echarts = require('echarts');
    // let chartDom: any = document.getElementById(id);
    // let myChart = echarts.init(chartDom);
    // option && myChart.setOption(option);
// }