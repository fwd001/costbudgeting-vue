import Vue from 'vue'
// import {
//   getTableStage
// } from '@/api/api2'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
require('echarts/theme/vintage.js') // 主题
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
Vue.prototype.$echarts = echarts // 引入组件

export default {
  name: 'EChartCompare',
  props: {
    lineData: Object
  },
  components: {
  },
  data () {
    return {
      myChart: null
    }
  },
  created () {
    this.$nextTick(function () {
      this.EChartsInit(this.lineData)
    })
  },
  watch: {
    lineData () {
      this.EChartsInit(this.lineData)
      this.refresh()
    }
  },
  mounted () {
  },
  methods: {
    EChartsInit (data) {
      this.myChart = echarts.init(document.getElementById('myChart2'), 'light')
      let series = []
      let legend = []
      for (let i in data.series) {
        let item = i === '1' ? {
          name: data.series[i].name,
          type: 'line',
          // smooth: true,
          showSymbol: false,
          symbolSize: 6,
          data: data.series[i].data,
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(16, 79, 193,1)'
              }, {
                offset: 1,
                color: 'rgba(125, 178, 244,1)'
              }], false)
            }
          },

          itemStyle: {
            normal: {
              color: 'rgba(16, 79, 193,1)'
            }
          },
          lineStyle: {
            normal: {
              width: 0
            }
          }
        } : {
          name: data.series[i].name,
          type: 'line',
          // smooth: true,
          symbolSize: 10,
          data: data.series[i].data,
          itemStyle: { // 折线拐点的样式
            normal: {
              color: '#FAC220' // 折线拐点的颜色
            }
          },
          lineStyle: {
            normal: {
              color: '#FAC220',
              width: 2,
              type: 'dashed'
            }
          }
        }
        series.push(item)
        legend.push(data.series[i].name)
      }
      let option = {
        title: {
          text: ''
        },
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   feature: {
        //     dataZoom: {
        //       yAxisIndex: 'none'
        //     },
        //     dataView: {readOnly: false},
        //     magicType: {type: ['line', 'bar']},
        //     restore: {},
        //     saveAsImage: {}
        //   }
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          icon: 'roundRect',
          data: legend
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          top: '10%',
          right: '1.2%',
          feature: {
            dataView: {show: false, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'tiled', 'stack']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: data.xAxis
          }
        ],
        yAxis: [
          {
            name: '单位: 万',
            type: 'value'
          }
        ],
        series: series
      }
      this.myChart.setOption(option)
    },
    refresh () {
      let option1 = this.myChart.getOption()
      this.myChart.clear()
      this.myChart.setOption(option1)
    }
  }
}
