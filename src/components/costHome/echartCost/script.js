import Vue from 'vue'

// require('echarts/theme/vintage.js')
// import {
//   getEchartsTheme
// } from '@/api/api2'
// import { setTagTitle } from '@/assets/utils/index'
// import { stringify } from 'querystring'
// 引入基本模板
import echarts from 'echarts/lib/echarts'
import '@/assets/js/shine'
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/legend')
require('echarts/lib/component/markLine')
require('echarts/lib/component/graphic')
require('echarts/lib/component/markPoint')
Vue.prototype.$echarts = echarts // 引入组件

export default {
  name: 'EChartCost',
  props: {
    lineData: Object
  },
  components: {},
  data () {
    return {
      myChart: null,
      itemW: 0,
      curTitle: ''
    }
  },
  async created () {
    // this.getCurrentData()
    this.$nextTick(() => {
      // console.log(this.lineData)
      this.EChartsInit(this.lineData)
    })
  },
  watch: {
    lineData () {
      this.getWidth(this.lineData)
      this.EChartsInit(this.lineData)
      this.refresh()
    }
  },
  mounted () {},
  methods: {
    EChartsInit (val) {
      // console.log(val)
      const color = ['rgb(113, 184, 188)',
        'rgb(246, 187, 126)',
        'rgb(226, 202, 172)',
        'rgb(165, 161, 149)',
        'rgb(143, 211, 190)',
        'rgb(116, 136, 187)',
        'rgb(224, 164, 210)',
        'rgb(175, 148, 125)']
      const color1 = ['rgba(113, 184, 188, .9)', 'rgba(246, 187, 126, .9)', 'rgba(226, 202, 172, .9)', 'rgba(165, 161, 149, .9)', 'rgba(143, 211, 190, .9)', 'rgba(116, 136, 187, .9)', 'rgba(224, 164, 210, .9)', 'rgba(175, 148, 125, .9)']
      this.myChart = echarts.init(document.getElementById('myChart1'), 'shine')
      let series = []
      let legend = []
      let that = this
      for (let i in val.series) {
        let item = {
          name: val.series[i].name,
          type: 'line',
          // smooth: true,
          itemStyle: {
            normal: {
              lineStyle: {
                width: val.series[i].name === '合计' ? 1 : 0,
                type: val.series[i].name === '合计' ? 'dashed' : 'solid'
              }
            }
          },
          label: {
            normal: {
              show: val.series[i].name === '合计',
              position: [1, -6],
              rotate: 70,
              color: '#303133'
            }
          },
          stack: val.series[i].name === '合计' ? '' : '总量',
          areaStyle: {
            opacity: val.series[i].name === '合计' ? 0 : 1,
            color: {
              type: 'linear',
              x: val.series[i].percent - 0.01,
              y: 0,
              x2: val.series[i].percent,
              y2: 0,
              colorStops: [{
                offset: 0, color: color[i] // 0% 处的颜色
              }, {
                offset: 1, color: color1[i] // 100% 处的颜色
              }],
              globalCoord: false // 缺省为 false
            }
          },
          markPoint: {
            symbol: val.series[i].name === '合计' ? 'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAHNCAYAAAA0f6rxAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABPSURBVFhH7c2xDYAwFMTQL7bO9ECkDGCZhsKvOF3nWWvd87r2bB8PUtQepKg9SFF7kKL2IEXtQYragxS1BylqD1LUHqSoPUhRe5DfR4+ZB8xTWSG48+HZAAAAAElFTkSuQmCC' : 'none',
            symbolSize: [3, 370],
            symbolOffset: [that.itemW, -180],
            data: [{
              name: '',
              coord: [that.curTitle, 0]
            }]
          },
          data: val.series[i].data
        }
        series.push(item)

        legend.push(val.series[i].name)
      }
      let option = {
        title: {
          text: ''
        },

        toolbox: {
          show: true,
          orient: 'vertical',
          top: '10%',
          right: '1.2%',
          feature: {
            dataView: { show: false, readOnly: false },
            magicType: { show: true, type: ['line', 'bar', 'tiled', 'stack'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              // formatter: '{value} 万',
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          icon: 'roundRect',
          // orient: 'vertical',
          // left: '1%',
          // bottom: 20,
          data: legend
        },
        grid: {
          left: '3%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        // graphic: [
        //   {
        //     type: 'text',
        //     right: (function () {
        //       // console.log(this.$refs.myChart1)
        //       // console.log(100 - parseFloat(data.percent) + '%')
        //       // return 100 - parseFloat(data.percent) + '%'
        //       return '50%'
        //     })(),
        //     bottom: '7.7%',
        //     z: 11,
        //     style: {
        //       fill: '#F56C6C',
        //       text: '★',
        //       font: '20px Microsoft YaHei'
        //     }
        //   }
        // ],
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            // triggerEvent: true,
            data: this.getCurrentData(val.xAxis)
          }
        ],
        yAxis: [
          {
            name: '单位: 万',
            nameLocation: 'end',
            // nameTextStyle: {
            //   shadowOffsetX: 20
            // },
            // axisLabel: {formatter: '{value}万'},
            // triggerEvent: true,
            type: 'value'
          }
        ],
        series: series
      }
      this.myChart.setOption(option)
      // console.log(option)
      // 给图表绑定事件
      // this.myChart.off('click')
      // this.myChart.on('click', (params) => {
      //   this.handleClickFn(params)
      // })
    },
    handleClickFn (params) {
      if (params.componentType === 'xAxis') {
        console.log(
          ' x轴标签--- ' + 'name：' + params.value + ' value：' + params.value
        )
      } else if (params.componentType === 'yAxis') {
        console.log(' y轴标签--- ' + 'name：' + params.value)
      } else {
        console.log(
          ' 柱状图--- ' +
            'name：' +
            params.name +
            ' value：' +
            params.value +
            ' index：' +
            params.componentIndex
        )
      }
      console.log(params)
    },
    refresh () {
      let option1 = this.myChart.getOption()
      this.getWidth(this.lineData)
      this.myChart.clear()
      this.myChart.setOption(option1)
    },
    // 获取width
    getWidth (val) {
      if (val.xAxis) {
        this.itemW = this.$refs.myChart1.offsetWidth * 0.84 / (val.xAxis.length - 1) * (parseFloat(val.percent) / 100)
        if (val.nowMonth) {
          this.curTitle = val.nowMonth
        } else {
          this.curTitle = 1000
        }
        // console.log(this.itemW)
      }
    },
    // 获取时间颜色
    getCurrentData (data) {
      if (data) {
        var dtCur = new Date()
        var yearCur = dtCur.getFullYear()
        var monCur = dtCur.getMonth() + 1
        monCur = monCur < 10 ? '0' + monCur : monCur
        const nowData = yearCur + '/' + monCur
        var arr = data.map(item => {
          if (item.indexOf(nowData) !== -1) {
            return {
              value: item,
              textStyle: {
                fontSize: 16,
                color: '#303133',
                fontWeight: 700
              }
            }
          } else {
            return item
          }
        })
        return arr
      } else {
        return []
      }
    }
  }
}
