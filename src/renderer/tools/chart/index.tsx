
import  ReactDOM  from  'react-dom';

import $ from 'jquery'

import * as React from "react";
import Drag from './Drag'
import * as echarts from 'echarts';
import { Scene} from "babylonjs";
import {AbstractEditorPlugin} from "../../editor/tools/plugin";

export const title = "图表添加";

export default class PreviewPlugin extends AbstractEditorPlugin<{}> {

    scene:Scene

    constructor(props) {
        super(props);
        // this.state = {
        //     charts:
        // }
    }

    public componentDidMount(): void {
        const _html_ = $('.boxsw').html();
        console.log('===========');
        console.log(_html_)
    }

    private setPageCharts(e, res) {
        console.log(e)
        console.log(res)
        // @ts-ignore
        let charts: any = JSON.parse(sessionStorage.getItem('charts'))


        let option = {}

        switch (res.id) {
            case 0: {//柱状图
                option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: [120, 200, 150, 80, 70, 110, 130],
                            type: 'bar',
                            showBackground: true,
                            backgroundStyle: {
                                color: 'rgba(180, 180, 180, 0.2)'
                            }
                        }
                    ]
                };
                break;
            }

            case 1: {//饼图
                option = {
                    title: {
                        text: 'Referer',
                        subtext: 'Fake',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left'
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: '50%',
                            data: [
                                {value: 1048, name: 'Search Engine'},
                                {value: 735, name: 'Direct'},
                                {value: 580, name: 'Email'},
                                {value: 484, name: 'Union Ads'},
                                {value: 300, name: 'Video Ads'}
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                };
                break
            }

            case 2: {//折线图
                option = {
                    xAxis: {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: [150, 230, 224, 218, 135, 147, 260],
                            type: 'line'
                        }
                    ]
                };
                break
            }
        }


        // @ts-ignore
        let code = charts ? charts.length : 0;
        $('.boxsw').append(`<div class="chartPre" id="charts${code}" code="${code}">${res.name}</div>`)
        // @ts-ignore
        ReactDOM.render(<div><Drag id={code} option={option} /></div>,document.getElementById(id))

        let ids = `cid` + code
        this.setBarChart(ids,option);

    }

    private setBarChart(id,option) {
        let chartDom: any = document.getElementById(id);
        let myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
    }

    // private setPieChart(id) {
    //     let chartDom: any = document.getElementById(id);
    //     let myChart = echarts.init(chartDom);
    //     // @ts-ignore
    //     let charts: any = JSON.parse(localStorage.getItem('charts'))
    //     let option;

    //     option = {
    //         title: {
    //             text: 'Referer of a Website',
    //             subtext: 'Fake Data',
    //             left: 'center'
    //         },
    //         tooltip: {
    //             trigger: 'item'
    //         },
    //         legend: {
    //             orient: 'vertical',
    //             left: 'left'
    //         },
    //         series: [
    //             {
    //                 name: 'Access From',
    //                 type: 'pie',
    //                 radius: '50%',
    //                 data: [
    //                     {value: 1048, name: 'Search Engine'},
    //                     {value: 735, name: 'Direct'},
    //                     {value: 580, name: 'Email'},
    //                     {value: 484, name: 'Union Ads'},
    //                     {value: 300, name: 'Video Ads'}
    //                 ],
    //                 emphasis: {
    //                     itemStyle: {
    //                         shadowBlur: 10,
    //                         shadowOffsetX: 0,
    //                         shadowColor: 'rgba(0, 0, 0, 0.5)'
    //                     }
    //                 }
    //             }
    //         ]
    //     };

    //     option && myChart.setOption(option);
    //     // @ts-ignore
    //     charts.push(option)
    //     // @ts-ignore
    //     localStorage.setItem('charts', JSON.stringify(charts))
    // }


    // private setLineChart(id) {
    //     let chartDom: any = document.getElementById(id);
    //     let myChart = echarts.init(chartDom);
    //     // @ts-ignore
    //     let charts: any = JSON.parse(localStorage.getItem('charts'))
    //     let option;

    //     option = {
    //         xAxis: {
    //             type: 'category',
    //             data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    //         },
    //         yAxis: {
    //             type: 'value'
    //         },
    //         series: [
    //             {
    //                 data: [150, 230, 224, 218, 135, 147, 260],
    //                 type: 'line'
    //             }
    //         ]
    //     };

    //     option && myChart.setOption(option);
    //     // @ts-ignore
    //     charts.push(option)
    //     // @ts-ignore
    //     localStorage.setItem('charts', JSON.stringify(charts))
    // }

    /**
     * Renders the component.
     */
    public render(): React.ReactNode {

        let libs = [
            {
                id: 0,
                name: '柱状图'
            }, {
                id: 1,
                name: '饼图'
            },
            {
                id: 2,
                name: '折线图'
            },
        ]

        return (
            <>
                <div className={'chartbox'}>
                    {
                        libs.map((res) => {
                            return (
                                <div className={'chart1'} key={res.id} onDragEnd={(e) => {
                                    this.setPageCharts(e, res)
                                }} draggable={true}>{res.name}</div>
                            )
                        })
                    }
                </div>
            </>
        );
    }

    /**
     * Called on the plugin is ready.
     */
    public onReady(): void {
        // Empty for now...
    }

    /**
     * Called on the plugin is closed.
     */
    public onClose(): void {
        // Empty for now...
    }

    /**
     * Called on the user wants to open the documentation in his browser.
     */
    // private async _handleOpenInBrowser(): Promise<void> {
    //     // if (!this._iframe) { return; }

    //     // await shell.openExternal(this._iframe.src);
    //     // this.editor.closePlugin(title);
    // }
}
