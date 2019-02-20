import Vue from 'vue'
import {
  getHcList,
  getProjects,
  getworkerClass,
  getRank,
  getWorkerType,
  deleteHc,
  modifyHc,
  addHc,

  getUserList,
  getUserType,
  getLaborList,
  addLabor,
  modifyLabor,
  deleteLabor,

  getPredictorList
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
        project: ''
      },
      searchForm3: {
        project: ''
      },
      ruleForm1: {
        projectId: '',
        rank: '',
        class: '',
        type: ''
      },
      ruleForm2: {
        projectId: '',
        uid: '',
        class: '',
        type: ''
      },
      // 添加表单校验规则
      rules: {
        projectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        rank: [{ required: true, message: '请选择级别', trigger: 'change' }],
        class: [{ required: true, message: '请选择类型', trigger: 'change' }],
        type: [{ required: true, message: '请选择工种', trigger: 'change' }]
      },
      rules2: {
        projectId: [{ required: true, message: '请选择项目', trigger: 'change' }],
        uid: [{ required: true, message: '请输入姓名', trigger: 'change' }],
        class: [{ required: true, message: '请选择类型', trigger: 'change' }],
        type: [{ required: true, message: '请选择工种', trigger: 'change' }]
      },
      // 查看历史拖入度选项
      historyChecked: false,

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
      state: true,
      stageObj: {},
      listId: '',
      listId2: '',
      projectOpt: [],
      workerClassOpt: [],
      rankOpt: [],
      workerTypeOpt1: [],
      workerTypeOpt2: [],
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
      tableLoading3: false,
      rankName: '',
      className: '',
      typeName: '',
      uidName2: '',
      className2: '',
      typeName2: '',
      class_add: '',
      type_add: '',
      addAndSelectedClass: false,
      addAndSelectedType: false
    }
  },
  created () {
    this.getProjectsFun()

    getworkerClass().then(res => {
      if (res.code !== -404) {
        this.workerClassOpt = res.data
      } else {
      }
    })
    getRank().then(res => {
      if (res.code !== -404) {
        this.rankOpt = res.data
      } else {
      }
    })
    getUserList('').then(res => {
      if (res.code !== -404) {
        this.nickAllNameOpt = res.data
      } else {
      }
    })
    this.getWorkerTypeFun1()
    this.getWorkerTypeFun2()
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    getWorkerTypeFun1 (val) {
      getWorkerType({id: val}).then(res => {
        if (res.code !== -404) {
          this.workerTypeOpt1 = res.data
          this.ruleForm1.type = ''
        } else {
        }
      })
    },
    getWorkerTypeFun2 (val) {
      getWorkerType({id: val}).then(res => {
        if (res.code !== -404) {
          this.workerTypeOpt2 = res.data
          this.ruleForm2.type = ''
        } else {
        }
      })
    },
    async getProjectsFun () {
      await getProjects().then(res => {
        if (res.code !== -404) {
          this.projectOpt = res.data
          this.searchForm1.project = res.data[0].id
          this.searchForm2.project = res.data[0].id
          this.searchForm3.project = res.data[0].id
          this.$store.commit('getProjectsUpdata', this.searchForm1.project)
        } else {
        }
      })
      let data1 = {
        projectId: this.searchForm1.project,
        page: 1,
        pageSize: this.pageSize
      }
      this.getHcTableList(data1)
    },
    addMember1 () {
      this.dialogType = 'add'
      this.formItemObj1 = {}
      const o2 = JSON.parse(JSON.stringify(this.column))
      o2.splice(0, 4)
      for (let item of o2) {
        this.$set(this.formItemObj1, item.title, '')
      }

      if (this.$refs.ruleForm1) {
        this.$refs.ruleForm1.resetFields()
      }
      for (let i in this.ruleForm1) {
        this.ruleForm1[i] = ''
      }
      this.dialogVisible = true
    },
    addMember2 () {
      this.type_add = ''
      this.class_add = ''

      this.dialogType2 = 'add'
      this.formItemObj2 = {}
      const o2 = JSON.parse(JSON.stringify(this.column2))
      o2.splice(0, 4)
      for (let item of o2) {
        this.$set(this.formItemObj2, item.title, '')
      }

      if (this.$refs.ruleForm2) {
        this.$refs.ruleForm2.resetFields()
      }
      for (let i in this.ruleForm2) {
        this.ruleForm2[i] = ''
      }
      this.nickNameOpt = []
      this.dialogVisible2 = true
    },
    // 提交表单
    submitForm1 (type) {
      this.$refs.ruleForm1.validate(valid => {
        if (valid) {
          for (let i in this.formItemObj1) {
            if (
              i !== 'id' &&
                i !== 'projectId' && i !== 'projectName' &&
                i !== 'rank' && i !== 'rankName' &&
                i !== 'class' && i !== 'className' &&
                i !== 'type' && i !== 'typeName') {
              // const reg = /^([1-9]\d*|[0]{1,1})$/
              const reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
              if (!(reg.test(this.formItemObj1[i])) && this.formItemObj1[i] !== '') {
                const msg = i + ': 仅支持非负数，最多保留两位小数!'
                this.$message({
                  type: 'warning',
                  message: msg
                })
                return false
              }
            }
          }

          this.dialogLoading1 = true
          this.ruleForm1.projectId = this.searchForm1.project
          if (type === 'add') this.ruleForm1Add()
          if (type === 'modify') this.ruleForm1Modify()
        } else {
          return false
        }
      })
    },
    ruleForm1Add () {
      // ajax
      const o1 = this.ruleForm1
      const o2 = this.formItemObj1
      let o3 = Object.assign(o1, o2)
      Vue.delete(o3, 'projectName')
      Vue.delete(o3, 'rankName')
      Vue.delete(o3, 'className')
      Vue.delete(o3, 'typeName')
      addHc(o3).then(res => {
        this.dialogLoading1 = false
        if (res.code !== -404) {
          this.dialogVisible = false
          let data = {
            projectId: this.searchForm1.project,
            page: 1,
            pageSize: this.pageSize
          }
          this.getHcTableList(data)
          this.currentPage = 1
        } else {

        }
      })
    },
    ruleForm1Modify () {
      // ajax
      const o1 = this.ruleForm1
      const o2 = this.formItemObj1
      let o3 = Object.assign(o1, o2)
      Vue.delete(o3, 'projectName')
      Vue.delete(o3, 'rankName')
      Vue.delete(o3, 'className')
      Vue.delete(o3, 'typeName')
      let id = this.listId
      modifyHc({id, ...o3}).then(res => {
        this.dialogLoading1 = false
        if (res.code !== -404) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          let data = {
            projectId: this.searchForm1.project,
            page: this.currentPage,
            pageSize: this.pageSize
          }
          this.getHcTableList(data)
        } else {

        }
      })
    },
    // 提交表单2
    submitForm2 (type) {
      this.$refs.ruleForm2.validate(valid => {
        if (valid) {
          for (let i in this.formItemObj2) {
            if (
              i !== 'id' &&
              i !== 'projectId' && i !== 'projectName' &&
              i !== 'uid' && i !== 'uidName' &&
              i !== 'class' && i !== 'className' &&
              i !== 'type' && i !== 'typeName') {
              // const reg = /^([1-9]\d*|[0]{1,1})$/
              const reg = /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/
              if (!(reg.test(this.formItemObj2[i])) && this.formItemObj2[i] !== '') {
                const msg = i + ': 仅支持0-1的数字，最多保留两位小数!'
                this.$message({
                  type: 'warning',
                  message: msg
                })
                return false
              }
            }
          }

          this.dialogLoading2 = true
          this.ruleForm2.projectId = this.searchForm2.project
          if (type === 'add') this.ruleForm2Add()
          if (type === 'modify') this.ruleForm2Modify()
        } else {
          return false
        }
      })
    },
    ruleForm2Add () {
      // ajax
      const o1 = this.ruleForm2
      const o2 = this.formItemObj2
      let o3 = Object.assign(o1, o2)
      Vue.delete(o3, 'projectName')
      Vue.delete(o3, 'uidName')
      Vue.delete(o3, 'className')
      Vue.delete(o3, 'typeName')
      addLabor(o3).then(res => {
        this.dialogLoading2 = false
        if (res.code !== -404) {
          this.dialogVisible2 = false
          let data = {
            projectId: this.searchForm2.project,
            page: 1,
            pageSize: this.pageSize,
            history: this.historyChecked
          }
          this.getLaborTableList(data)
          this.currentPage2 = 1
        } else {

        }
      })
    },
    ruleForm2Modify () {
      // ajax
      const o1 = this.ruleForm2
      const o2 = this.formItemObj2
      let o3 = Object.assign(o1, o2)
      Vue.delete(o3, 'projectName')
      Vue.delete(o3, 'uidName')
      Vue.delete(o3, 'className')
      Vue.delete(o3, 'typeName')
      let id = this.listId2
      modifyLabor({id, ...o3}).then(res => {
        this.dialogLoading2 = false
        if (res.code !== -404) {
          this.dialogVisible2 = false
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          let data = {
            projectId: this.searchForm2.project,
            page: this.currentPage2,
            pageSize: this.pageSize,
            history: this.historyChecked
          }
          this.getLaborTableList(data)
        } else {

        }
      })
    },
    resetFields (dom) {
      if (this.$refs[dom]) {
        this.$refs[dom].resetFields()
      }
    },
    clearValidate (dom) {
      if (this.$refs[dom]) {
        this.$refs[dom].clearValidate()
      }
    },
    tableEditor1 (row) {
      this.dialogType = 'modify'
      this.dialogVisible = true
      for (let i in row) {
        if (
          i !== 'id' &&
          i !== 'projectId' && i !== 'projectName' &&
          i !== 'rank' && i !== 'rankName' &&
          i !== 'class' && i !== 'className' &&
          i !== 'type' && i !== 'typeName') {
          this.$set(this.formItemObj1, i, row[i])
        } else {
          this.$set(this.ruleForm1, i, row[i])
        }
      }
      this.rankName = row['rankName']
      this.className = row['className']
      this.typeName = row['typeName']
      this.$nextTick(() => {
        this.clearValidate('ruleForm1')
      })
    },
    tableEditor2 (row) {
      this.dialogType2 = 'modify'
      this.dialogVisible2 = true
      for (let i in row) {
        if (
          i !== 'id' &&
          i !== 'projectId' && i !== 'projectName' &&
          i !== 'uid' && i !== 'uidName' &&
          i !== 'class' && i !== 'className' &&
          i !== 'type' && i !== 'typeName') {
          this.$set(this.formItemObj2, i, row[i])
        } else {
          this.ruleForm2[i] = row[i]
        }
      }
      this.uidName2 = row['uidName']
      this.className2 = row['className']
      this.typeName2 = row['typeName']
      this.nickNameOpt = [
        {
          id: this.ruleForm2['uid'],
          name: this.ruleForm2['uidName']
        }
      ]
      this.$set(this.ruleForm2, ['uid'], row['uid'])
      this.$nextTick(() => {
        this.clearValidate('ruleForm2')
      })
    },
    tableDelete1 (id, index) {
      // console.log(id)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: id
        }
        deleteHc(data).then(res => {
          if (res.code !== -404) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.tableData.splice(index.$index, 1)
            const num = this.total % this.pageSize
            this.currentPage = num === 1 ? this.currentPage - 1 : this.currentPage
            let data = {
              projectId: this.searchForm1.project,
              page: this.currentPage,
              pageSize: this.pageSize
            }
            this.getHcTableList(data)
          } else {

          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    tableDelete2 (id, index) {
      // console.log(id)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          id: id
        }
        deleteLabor(data).then(res => {
          if (res.code !== -404) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.tableData2.splice(index.$index, 1)
            const num = this.total2 % this.pageSize
            this.currentPage2 = num === 1 ? this.currentPage2 - 1 : this.currentPage2
            let data = {
              projectId: this.searchForm2.project,
              page: this.currentPage2,
              pageSize: this.pageSize,
              history: this.historyChecked
            }
            this.getLaborTableList(data)
          } else {

          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    getHcTableList (data) {
      this.tableLoading1 = true
      getHcList(data).then(res => {
        this.tableLoading1 = false
        if (res.code !== -404) {
          this.column = res.data.column
          this.tableData = res.data.record
          this.total = res.data.total
          this.formItemObj1 = {}
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
      this.getHcTableList(data)
    },
    getLaborTableList (data) {
      this.tableLoading2 = true
      getLaborList(data).then(res => {
        this.tableLoading2 = false
        if (res.code !== -404) {
          this.column2 = res.data.column
          this.tableData2 = res.data.record
          this.total2 = res.data.total
          this.formItemObj2 = {}
          this.$nextTick(() => {
            setTagTitle('.manpower')
          })
        } else {

        }
      })
    },
    getPreDictorTableList (data) {
      this.tableLoading3 = true
      getPredictorList(data).then(res => {
        this.tableLoading3 = false
        if (res.code !== -404) {
          this.column3 = res.data.column
          this.tableData3 = res.data.record
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
        page: val,
        history: this.historyChecked
      }
      this.getLaborTableList(data)
    },
    paginationTable3 (val) {
      let data = {
        projectId: this.searchForm3.project,
        pageSize: this.pageSize,
        page: val
      }
      this.getLaborTableList(data)
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
        pageSize: this.pageSize,
        history: this.historyChecked
      }
      let data3 = {
        projectId: this.searchForm3.project,
        page: this.currentPage3,
        pageSize: this.pageSize
      }

      if (tab.index === '0') this.getHcTableList(data1)
      if (tab.index === '1') this.getLaborTableList(data2)
      if (tab.index === '2') this.getPreDictorTableList(data3)
    },
    searchForm1Request (id) {
      let data = {
        projectId: id,
        pageSize: this.pageSize,
        page: 1
      }
      this.$store.commit('getProjectsUpdata', id)
      this.getHcTableList(data)
      this.currentPage = 1
    },
    searchForm2Request (id) {
      let data = {
        projectId: id,
        page: 1,
        pageSize: this.pageSize,
        history: this.historyChecked
      }
      this.$store.commit('getProjectsUpdata', id)
      this.getLaborTableList(data)
      this.currentPage2 = 1
    },
    searchForm3Request (id) {
      let data = {
        projectId: id,
        page: 1,
        pageSize: this.pageSize
      }
      this.$store.commit('getProjectsUpdata', id)
      this.getPreDictorTableList(data)
      this.currentPage3 = 1
    },
    remoteMethod (query) {
      if (query !== '') {
        this.nickNameOpt = this.nickAllNameOpt.filter(item => {
          return item.name.toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.nickNameOpt = []
      }
    },
    getName (id, array) {
      for (let item of array) {
        if (item.id == id) {
          return item.name
        }
      }
    },
    getUserId (id) {
      getUserType({id: id}).then(res => {
        if (res.code !== -404) {
          this.class_add = ''
          this.type_add = ''

          if (res.data.workerClass != 0) {
            this.ruleForm2.class = res.data.workerClass
            this.class_add = this.getName(this.ruleForm2.class, this.workerClassOpt)
          } else {
            this.class_add = ''
            this.ruleForm2.class = ''
          }

          if (res.data.workerType != 0) {
            this.ruleForm2.type = res.data.workerType
            this.type_add = this.getName(this.ruleForm2.type, this.workerTypeOpt2)
          } else {
            this.type_add = ''
            this.ruleForm2.type = ''
          }
        }
      })
    },
    // 第三页cell样式
    cellStyle2 ({row, column, rowIndex, columnIndex}) {
      // console.log(column.colSpan)
      if (column.property !== 'rankName' && column.property !== 'projectName' && column.property !== 'className' && column.property !== 'typeName' && column.property !== 'edit' && column.property !== 'uidName') {
        return {textAlign: 'right'}
      } else {
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
