import {
  getProjects,
  getCostPageList,
  getGrOptList,

  getChartCostData,
  getChartCompareData,

  getTableList1,
  getTableList2,
  getTableList3
} from '@/api/api2'
import { setTagTitle } from '@/assets/utils/index'
import BasicInfo from '@/components/basicInfo/index'
import EChartCost from './echartCost/index'
import EChartCompare from './echartCompare/index'
import EChartProportion from './echartProportion/index'
export default {
  components: {
    EChartCost,
    EChartCompare,
    EChartProportion,
    BasicInfo
  },
  data () {
    return {
      activeName: 'first',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      lineData: {},
      lineData2: {},
      dialogVisible: false,
      searchForm: {
        projectId: '',
        type: '',
        stage: '',
        date: ''
      },
      projectOpt: [],
      costPageOpt: [],
      projectGrOpt: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      total1: 0,
      total2: 0,
      total3: 0,
      pagesize: 10,
      currentPage1: 1,
      currentPage2: 1,
      currentPage3: 1,
      tableLoading1: false,
      tableLoading2: false,
      tableLoading3: false,
      column1: [],
      column2: [],
      column3: [],
      pie1: {
        // title: '到（9月底）总成本',
        // sum: [
        //   {'value': 335, 'name': '人员'},
        //   {'value': 679, 'name': '前置发行成本'},
        //   {'value': 1548, 'name': '外包成本'},
        //   {'value': 1118, 'name': 'IP成本'}
        // ],
        // details: [
        //   {'value': 335, 'name': '代理'},
        //   {'value': 310, 'name': '美术外包'},
        //   {'value': 234, 'name': '音频外包'},
        //   {'value': 135, 'name': '翻译外包'},
        //   {'value': 1048, 'name': '研发人力'},
        //   {'value': 251, 'name': '美术人力'},
        //   {'value': 147, 'name': '中台人力'},
        //   {'value': 102, 'name': '其他'}
        // ],
        // legend: ['人员', 'IP成本', '外包成本', '前置发行成本', '代理', '美术外包', '音频外包', '翻译外包', '研发人力', '美术人力', '中台人力', '其他']
      },
      pie2: {}
    }
  },
  computed: {
    datailText () {
      if (this.lineData.text) {
        var text = '<div>' + this.lineData.text.replace(/\n/g, '<br />') + '</div>'
        // var text = '<span>' + this.lineData.text.split('/n').join('<br/>') + '<span>'
        // console.log(text)
        return text
      } else {
        return ''
      }
    }
  },
  created () {
    this.getProjectsFun()
  },
  watch: {
    listData (val) {
      this.searchFormRequest()
    }
  },
  mounted () {
    // 动态刷新页面
    window.onresize = () => {
      const reg = /costhome/
      const hash = document.location.hash
      if (hash && reg.test(hash)) {
        if (this.activeName === 'first') {
          setTimeout(() => {
            this.$refs.pie1.myChart.resize()
            this.$refs.pie2.myChart.resize()
            this.$refs.echartLine.myChart.resize()
          }, 10)
        } else if (this.activeName === 'second') {

        } else if (this.activeName === 'third') {
          setTimeout(() => {
            this.$refs.echartLine2.myChart.resize()
          }, 10)
        }
      }
    }
  },
  methods: {
    async getProjectsFun () {
      await getProjects().then(res => {
        if (res.code !== -404) {
          this.projectOpt = res.data
          if (res.data.length > 0) this.searchForm.projectId = res.data[0].id
        } else {
        }
      })

      await getCostPageList().then(res => {
        if (res.code !== -404) {
          this.costPageOpt = res.data
          if (res.data.length > 0) this.searchForm.type = res.data[0].id
        } else {
        }
      })

      this.searchFormRequest()
    },
    // 添加成员
    addMember () {
      this.dialogVisible = true
      let data = {
        projectId: this.searchForm.projectId
        // pageSize: this.pagesize,
        // page: 1
      }
      this.getList3(data)
    },
    paginationTable1 (val) {
      let res = {
        projectId: this.searchForm.projectId,
        pagesize: this.pagesize,
        page: val
      }
      this.getList1(res)
    },
    paginationTable2 (val) {
      let res = {
        projectId: this.searchForm.projectId,
        pageSize: this.pagesize,
        page: val
      }
      this.getList2(res)
    },
    // paginationTable3 (val) {
    //   let res ={
    //     projectId: this.searchForm.projectId,
    //     pagesize: this.pagesize,
    //     page: val
    //   }
    //   this.getList3(res)
    // },
    // chart数据
    chartCostRender (data) {
      getChartCostData(data).then(res => {
        this.tableLoading = false
        if (res.code !== -404) {
          this.lineData = res.data
          this.$nextTick(() => {
            setTagTitle('.main-home')
          })
        }
      })
    },
    chartCompareRender (data) {
      getChartCompareData(data).then(res => {
        this.tableLoading = false
        if (res.code !== -404) {
          this.lineData2 = res.data
        }
      })
    },
    // 下拉监听
    async searchFormRequest (id) {
      let dataChart = {
        projectId: this.searchForm.projectId
      }
      let data = {
        projectId: this.searchForm.projectId,
        pageSize: this.pagesize,
        page: 1
      }
      let data3 = {
        projectId: this.searchForm.projectId,
        date: this.searchForm.date,
        pageSize: this.pagesize,
        page: 1
      }

      this.chartCostRender(dataChart)

      this.getList1(data3)
      this.getList2(data)

      this.currentPage1 = 1
      this.currentPage2 = 1
      // this.currentPage3 = 1

      await getGrOptList({projectId: this.searchForm.projectId}).then(res => {
        if (res.code !== -404) {
          this.projectGrOpt = res.data
          if (res.data.length > 0) this.searchForm.stage = res.data[0].id
        } else {
        }
      })

      let data2 = {
        projectId: this.searchForm.projectId,
        type: this.searchForm.type,
        stage: this.searchForm.stage
      }
      this.chartCompareRender(data2)
    },
    // 下拉监听
    costPageSelect (id) {
      let data2 = {
        projectId: this.searchForm.projectId,
        type: this.searchForm.type,
        stage: this.searchForm.stage
      }
      this.chartCompareRender(data2)
    },

    // 日期选择后 提示
    dateSelectedTips () {
      // 当前日期：(1 —— 10)

      //           选择日期 (当月) –>  截止到上上月总成本
      //           选择日期 (上月) –> 截止到上月总成本

      // 当前日期：(11 —— 月底)
      //           选择日期 (当月) –>  截止到上月总成本

      const checkedDate = JSON.parse(JSON.stringify(this.searchForm.date))
      if (!checkedDate) return
      const date = new Date()

      const year = date.getFullYear()
      let month = date.getMonth() + 1; month = (month < 10 ? '0' + month : month)
      const day = date.getDate()

      const selectedYY = (JSON.parse(JSON.stringify(checkedDate))).slice(0, 4) // 选择日期 年
      const selectedMM = (JSON.parse(JSON.stringify(checkedDate))).slice(5, 7) // 选择日期 月
      const selectedDD = (JSON.parse(JSON.stringify(checkedDate))).slice(8) // 选择日期 天

      if (day * 1 < 11) {
        switch (ture) {
          case (selectedYY == year && selectedMM == month):
            this.$message({
              type: 'info',
              message: '获取到的为: 截止到（' + this.monthArrayFn(month)[0] + '）的总成本，上月（' + this.monthArrayFn(month)[1] + '）成本还在跑批中，请' + month + '月' + '11日后再查询。'
            })
            break

          case (selectedYY == year && selectedMM * 1 == month * 1 - 1):
            this.$message({
              type: 'info',
              message: '获取到的为: 截止到（' + this.monthArrayFn(month)[1] + '）的总成本'
            })
            break

          case ((selectedYY * 1 - 1) == year * 1 && selectedMM * 1 == 12):
            this.$message({
              type: 'info',
              message: '获取到的为: 截止到（' + this.monthArrayFn(month)[1] + '）的总成本'
            })
            break

          default:
        }
      } else if (selectedYY == year && selectedMM == month) {
        this.$message({
          type: 'info',
          message: '获取到的为: 截止到（' + this.monthArrayFn(month)[1] + '）的总成本'
        })
      }
    },
    // 月份计算
    monthArrayFn (month) {
      let monthArr = []
      let date01
      let date02
      if (month * 1 == 1) {
        date01 = '11月'
        date02 = '12月'
      } else if (month * 1 == 2) {
        date01 = '12月'
        date02 = '01月'
      } else {
        date01 = '0' + (month * 1 - 2) + '月'
        date02 = '0' + (month * 1 - 1) + '月'
      }
      monthArr = [date01, date02]
      return monthArr
    },

    // 日期选择 监听
    dateChange (checkedDate) {
      let data3 = {
        projectId: this.searchForm.projectId,
        date: this.searchForm.date,
        pageSize: this.pagesize,
        page: 1
      }
      this.getList1(data3, this.dateSelectedTips)
      this.currentPage1 = 1
    },
    // 饼图接口
    getList1 (data, tipsFn) {
      this.tableLoading1 = true
      getTableList1(data).then(res => {
        this.tableLoading1 = false
        if (res.code !== -404) {
          if (tipsFn) tipsFn()
          this.column1 = res.data.column
          this.tableData1 = res.data.record
          this.pie1 = res.data.pie1
          this.pie2 = res.data.pie2
          this.$nextTick(() => {
            setTagTitle('.main-home')
          })
        } else {

        }
      })
    },
    getList2 (data) {
      this.tableLoading2 = true
      getTableList2(data).then(res => {
        this.tableLoading2 = false
        if (res.code !== -404) {
          this.column2 = res.data.column
          this.tableData2 = res.data.record
          this.total2 = res.data.total
          this.$nextTick(() => {
            setTagTitle('.main-home')
          })
        }
      })
    },
    getList3 (data) {
      this.tableLoading3 = true
      getTableList3(data).then(res => {
        this.tableLoading3 = false
        if (res.code !== -404) {
          this.column3 = res.data.column
          this.tableData3 = res.data.record
          // this.total3 = res.data.total
          this.$nextTick(() => {
            // console.log('asdfasd')
            setTagTitle('.main-home')
          })
        } else {

        }
      })
    },
    chartResize () {
      setTimeout(() => {
        this.$refs.echartLine.myChart.resize()
        // this.$refs.echartLine2.myChart.resize()
        // this.$refs.pie1.myChart.resize()
        // this.$refs.pie2.myChart.resize()
      }, 10)
    },
    // 监听页面变化
    handleSizeChange (val) {
      // console.log(val)
      this.pagesize = val
      this.currentPage2 = 1
      this.paginationTable2(this.currentPage2)
    },
    // cell样式
    cellStyle ({row, column, rowIndex, columnIndex}) {
      // console.log(column.colSpan)
      if (column.property !== 'costPage' && column.property !== 'phase' && column.property !== 'workType' && column.property !== 'name') {
        return {textAlign: 'right'}
      } else {
        return {textAlign: 'left'}
      }
    },
    // 切换标签页
    handleClick (tab, event) {
      // console.log(tab, event)
      if (tab.index === '0') {
        setTimeout(() => {
          this.$refs.echartLine.myChart.resize()
          this.$refs.pie1.myChart.resize()
          this.$refs.pie2.myChart.resize()
        }, 100)
      } else if (tab.index === '1') {
        setTimeout(() => {
          this.$refs.echartLine2.myChart.resize()
        }, 100)
      } else if (tab.index === '2') {

      }
    }
  }

}
