import Vue from 'vue'
// import {
//   getTableStage
// } from '@/api/api2'
// 引入基本模板
let echarts = require('echarts/lib/echarts')
require('echarts/theme/vintage.js') // 主题
require('echarts/lib/chart/line')
require('echarts/lib/chart/bar')
require('echarts/lib/chart/pie')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
Vue.prototype.$echarts = echarts // 引入组件

export default {
  name: 'EChartProportion',
  props: {
    lineData: Object,
    nameId: String
  },
  components: {
  },
  data () {
    return {
      myChart: null
    }
  },
  created () {
    // console.log(this.nameId)
    this.$nextTick(function () {
      this.EChartsInit(this.lineData)
      // this.myChart.resize = () => {
      //   let width = document.body.clientWidth
      //   console.log(width)
      // }
    })
  },
  watch: {
    lineData () {
      this.EChartsInit(this.lineData)
      this.refresh()
    }
  },
  mounted () {},
  methods: {
    EChartsInit (data) {
      // console.log(data)
      const that = this
      this.myChart = echarts.init(document.getElementById(this.nameId), 'light')
      let series = [
        {
          name: '访问来源',
          type: 'pie',
          selectedMode: 'single',
          center: ['50%', '45%'],
          radius: '32%',
          label: {
            normal: {
              formatter: (p) => {
                return p.name + '：' + that.formatNum(p.value) + '\n{per|' + p.percent + '%}'
              },
              borderRadius: 4,
              rich: {
                b: {
                  fontSize: 16,
                  lineHeight: 24
                },
                per: {
                  color: '#eee',
                  lineHeight: 24,
                  backgroundColor: '#334455',
                  padding: [2, 2],
                  borderRadius: 2
                }
              }
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          data: data.sum ? data.sum.map(item => {
            if (item.name === '人员成本' || item.name === '人员预算') {
              item.itemStyle = { color: 'rgb(175, 148, 125)' }
            } else if (item.name === '外包成本' || item.name === '外包预算') {
              item.itemStyle = { color: 'rgb(143, 211, 190)' }
            } else if (item.name === 'IP成本' || item.name === 'IP预算') {
              item.itemStyle = { color: 'rgb(116, 136, 187)' }
            } else if (item.name === '前置发行成本' || item.name === '前置发行预算') {
              item.itemStyle = { color: 'rgb(224, 164, 210)' }
            }
            return item
          }) : []
        }
        // {
        //   name: '访问来源',
        //   type: 'pie',
        //   radius: ['40%', '55%'],
        //   center: ['40%', '50%'],

        //   label: {
        //     normal: {
        //       formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
        //       backgroundColor: '#eee',
        //       borderColor: '#aaa',
        //       borderWidth: 1,
        //       borderRadius: 4,
        //       // shadowBlur:3,
        //       // shadowOffsetX: 2,
        //       // shadowOffsetY: 2,
        //       // shadowColor: '#999',
        //       // padding: [0, 7],
        //       rich: {
        //         a: {
        //           color: '#999',
        //           lineHeight: 22,
        //           align: 'center'
        //         },
        //         // abg: {
        //         //   backgroundColor: '#333',
        //         //   width: '100%',
        //         //   align: 'right',
        //         //   height: 22,
        //         //   borderRadius: [4, 4, 0, 0]
        //         // },
        //         hr: {
        //           borderColor: '#aaa',
        //           width: '100%',
        //           borderWidth: 0.5,
        //           height: 0
        //         },
        //         b: {
        //           fontSize: 16,
        //           lineHeight: 33
        //         },
        //         per: {
        //           color: '#eee',
        //           backgroundColor: '#334455',
        //           padding: [2, 4],
        //           borderRadius: 2
        //         }
        //       }
        //     }
        //   },
        //   data: data.details
        // }
      ]
      let legend = {
        orient: 'vertical',
        right: 10,
        bottom: 20,
        // orient: 'vertical',
        // x: 'right',
        // y: 'bottom',
        data: data.legend
      }

      let option = {
        title: {
          text: data.title,
          subtext: data.subTitle,
          x: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: legend,
        // toolbox: {
        //   show: true,
        //   orient: 'vertical',
        //   top: '10%',
        //   right: '1.2%',
        //   feature: {
        //     dataView: {show: false, readOnly: false},
        //     magicType: {show: true, type: ['line', 'bar', 'tiled', 'stack']},
        //     restore: {show: true},
        //     saveAsImage: {show: true}
        //   }
        // },

        // xAxis: [
        //   {
        //     type: 'category',
        //     boundaryGap: false,
        //     data: data.xAxis
        //   }
        // ],
        // yAxis: [
        //   {
        //     type: 'value'
        //   }
        // ],
        series: series,
        color: ['rgb(55, 162, 218)', 'rgb(255, 159, 127)', 'rgb(251, 114, 147)', 'rgb(231, 188, 243)']
      }
      this.myChart.setOption(option)
    },
    refresh () {
      let option1 = this.myChart.getOption()
      this.myChart.clear()
      this.myChart.setOption(option1)
    },
    formatNum (strNum) {
      if (strNum.length <= 3) {
        return strNum
      }
      if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
        return strNum
      }
      let a = RegExp.$1
      let b = RegExp.$2
      let c = RegExp.$3
      var re = new RegExp()
      re.compile('(\\d)(\\d{3})(,|$)')
      while (re.test(b)) {
        b = b.replace(re, '$1,$2$3')
      }
      return a + '' + b + '' + c
    }
  }
}
