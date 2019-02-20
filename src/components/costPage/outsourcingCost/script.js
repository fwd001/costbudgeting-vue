import {
  getOutsourcingCostList,
  getOutsourcingCostList2,
  getOutsourcingCostList3,

  getProjects,
  getCurrency,
  getArtOpt,
  getAudioOpt

} from '@/api/api2'
import { setTagTitle } from '@/assets/utils/index'
export default {
  data () {
    return {
      activeName: 'first',
      // 工作类型id
      id: 4,
      // 项目投入度：项目
      project1: '',
      allProject1: [
        {
          value: '1',
          label: '盗墓笔记'
        },
        {
          value: '2',
          label: '天使国内'
        }
      ],
      // 显示新增弹框
      dialogVisible: false,
      dialogVisible2: false,
      searchForm1: {
        project: ''
      },
      searchForm2: {
        project: []
      },
      searchForm3: {
        project: []
      },
      ruleForm1: {
        projectId: '',
        artId: '',
        unitPrice: '',
        currencyId: ''
      },
      ruleForm2: {
        projectId: '',
        audioId: '',
        unitCost: ''
      },
      // 添加表单校验规则
      rules: {
        projectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        artId: [{ required: true, message: '请选择美术外包内容', trigger: 'change' }],
        currencyId: [{ required: true, message: '请选择币种', trigger: 'change' }],
        unitPrice: [{ required: true, message: '请输入单价', trigger: 'blur' }]
      },
      rules2: {
        projectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        audioId: [{ required: true, message: '请输入音频外包内容', trigger: 'change' }],
        unitCost: [{ required: true, message: '请输入单位成本值', trigger: 'blur' }]
      },

      stageOpt: [],
      tableData: [],
      tableData2: [],
      tableData3: [],
      column: [],
      column2: [],
      column3: [],
      total: 0,
      total2: 0,
      total3: 0,
      pageSize: 10,
      currentPage: 1,
      currentPage2: 1,
      currentPage3: 1,
      // 工作室群 -- 下拉
      studioGroupOpt_search: [],
      studioGroupOpt_dialog: [],
      // 工作室 -- 下拉
      studioOpt_search: [],
      studioOpt_dialog: [],
      // 品类 -- 下拉
      categoryOpt: [],
      gameTypeOpt: [],
      developmentTypeOpt: [],
      producerOpt: [],
      dialogType: '',
      dialogType2: '',
      oldOptions: [],
      oldOptions2: [],
      state: true,
      stageObj: {},
      listId: '',
      listId2: '',
      projectOpt: [],
      projectOpt2: [],
      projectOpt3: [],
      currencyOpt: [],
      artOpt: [],
      audioOpt: [],
      formItemObj1: {},
      formItemObj2: {},
      nickNameOpt: [],
      searchNamelist: [],
      loading: false,
      nickAllNameOpt: [],
      tableLoading1: false,
      dialogLoading1: false,
      tableLoading2: false,
      dialogLoading2: false,
      tableLoading3: false
    }
  },
  created () {
    this.getProjectsFun()

    getCurrency().then(res => {
      if (res.code !== -404) {
        this.currencyOpt = res.data
      } else {
      }
    })
    getArtOpt().then(res => {
      if (res.code !== -404) {
        this.artOpt = res.data
      } else {
      }
    })
    getAudioOpt().then(res => {
      if (res.code !== -404) {
        this.audioOpt = res.data
      } else {
      }
    })
  },
  mounted () {
  },
  watch: {},
  methods: {
    async getProjectsFun () {
      await getProjects().then(res => {
        if (res.code !== -404) {
          this.projectOpt = res.data
          this.projectOpt2 = JSON.parse(JSON.stringify(res.data))
          this.projectOpt3 = JSON.parse(JSON.stringify(res.data))
          this.searchForm1.project = res.data[0].id
          this.searchForm3.project = res.data[0].id
          this.$store.commit('getProjectsUpdata', this.searchForm1.project)
          this.projectOpt2.unshift({
            id: 'all',
            name: '全部项目'
          })
          this.projectOpt3.unshift({
            id: 'all',
            name: '全部项目'
          })

          this.searchForm2.project = []
          this.searchForm3.project = []
          // 全选项目
          // for (const item of this.projectOpt2) {
          //   this.searchForm2.project.push(item.id)
          // }
          // for (const item of this.projectOpt3) {
          //   this.searchForm3.project.push(item.id)
          // }
          // this.oldOptions[0] = this.searchForm2.project
          // this.oldOptions2[0] = this.searchForm3.project
        } else {
        }
      })
      let data1 = {
        projectId: this.searchForm1.project,
        page: 1,
        pageSize: this.pageSize
      }
      this.getTableList(data1)
    },
    getTableList (data) {
      this.tableLoading1 = true
      getOutsourcingCostList(data).then(res => {
        this.tableLoading1 = false
        if (res.code !== -404) {
          this.column = res.data.list.column
          this.tableData = res.data.list.record
          this.total = res.data.total
          this.$nextTick(() => {
            setTagTitle('.manpower')
          })
        } else {

        }
      })
    },
    paginationTable (val) {
      let data = {
        projectId: this.searchForm1.project,
        pageSize: this.pageSize,
        page: val
      }
      this.getTableList(data)
    },
    getTableList2 (data) {
      this.tableLoading2 = true
      getOutsourcingCostList2(data).then(res => {
        this.tableLoading2 = false
        if (res.code !== -404) {
          this.column2 = res.data.list.column
          this.tableData2 = res.data.list.record
          this.total2 = res.data.total
          this.$nextTick(() => {
            setTagTitle('.manpower')
          })
        } else {

        }
      })
    },
    getTableList3 (data) {
      this.tableLoading3 = true
      getOutsourcingCostList3(data).then(res => {
        this.tableLoading3 = false
        if (res.code !== -404) {
          this.column3 = res.data.list.column
          this.tableData3 = res.data.list.record
          this.total3 = res.data.total
          this.$nextTick(() => {
            setTagTitle('.manpower')
          })
        } else {

        }
      })
    },
    paginationTable2 (val) {
      let data = {
        projectId: this.searchForm2.project,
        pageSize: this.pageSize,
        page: val
      }
      this.getTableList2(data)
    },
    paginationTable3 (val) {
      let data = {
        projectId: this.searchForm3.project,
        pageSize: this.pageSize,
        page: val
      }
      this.getTableList3(data)
    },
    handleClick (tab, event) {
      this.pageSize = 10
      let data1 = {
        projectId: this.searchForm1.project,
        page: this.currentPage,
        pageSize: this.pageSize
      }
      let data2 = {
        projectId: this.searchForm2.project,
        page: this.currentPage2,
        pageSize: this.pageSize
      }
      let data3 = {
        projectId: this.searchForm3.project,
        page: this.currentPage3,
        pageSize: this.pageSize
      }
      if (tab.index === '0') this.getTableList(data1)
      if (tab.index === '1') this.getTableList2(data2)
      if (tab.index === '2') this.getTableList3(data3)
    },
    searchForm1Request (id) {
      let data = {
        projectId: id,
        pageSize: this.pageSize,
        page: 1
      }
      this.$store.commit('getProjectsUpdata', id)
      this.getTableList(data)
      this.currentPage = 1
    },
    searchForm2Request (id) {
      this.selectAll_Project(id)
      let data = {
        projectId: this.searchForm2.project,
        page: 1,
        pageSize: this.pageSize
      }
      this.$store.commit('getProjectsUpdata', this.searchForm2.project)
      this.getTableList2(data)
      this.currentPage2 = 1
    },
    selectAll_Project (val) {
      const allProjectValues = []
      // 保留所有值
      for (const item of this.projectOpt2) {
        allProjectValues.push(item.id)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : []

      // 若是全部选择
      if (val.includes('all')) this.searchForm2.project = allProjectValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) this.searchForm2.project = []

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.searchForm2.project = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allProjectValues.length - 1) this.searchForm2.project = ['all'].concat(val)
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldOptions[0] = this.searchForm2.project
    },
    searchForm3Request (id) {
      this.selectAll_Project2(id)
      let data = {
        projectId: this.searchForm3.project,
        page: 1,
        pageSize: this.pageSize
      }
      this.$store.commit('getProjectsUpdata', this.searchForm3.project)
      this.getTableList3(data)
      this.currentPage3 = 1
    },

    selectAll_Project2 (val) {
      const allProjectValues = []
      // 保留所有值
      for (const item of this.projectOpt2) {
        allProjectValues.push(item.id)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions2.length === 1 ? this.oldOptions2[0] : []

      // 若是全部选择
      if (val.includes('all')) this.searchForm3.project = allProjectValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) this.searchForm3.project = []

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.searchForm3.project = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allProjectValues.length - 1) this.searchForm3.project = ['all'].concat(val)
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldOptions2[0] = this.searchForm3.project
    },
    // 第三页cell样式
    cellStyle2 ({row, column, rowIndex, columnIndex}) {
      // console.log(column.colSpan)

      if (column.property !== 'projectName' && column.property !== 'name') {
        return {textAlign: 'right'}
      } else {
        // debugger
        return {textAlign: 'left'}
      }
    },
    // 监听页面大小变化
    handleSizeChange (val) {
      // console.log(val)
      this.pageSize = val
      if (this.activeName === 'first') {
        this.currentPage = 1
        this.paginationTable(this.currentPage)
      } else if (this.activeName === 'second') {
        this.currentPage2 = 1
        this.paginationTable2(this.currentPage2)
      } else {
        this.currentPage3 = 1
        this.paginationTable3(this.currentPage3)
      }
    }
  }
}
