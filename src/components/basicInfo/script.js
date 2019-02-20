import {
  getTableStage,
  addProject,
  modifyProject,
  deleteProject,
  getBaseInfoList,
  getStudioGroupList,
  getStudioList,
  getGameSourceList,
  getGameCategoryList,
  getGameTypeList,
  getTableStageNew,
  getFilterUsers,
  getBaseInfoStatus
} from '@/api/api2'
import { setTagTitle } from '@/assets/utils/index'
export default {
  data () {
    return {
      dialogVisible: false,
      searchForm: {
        studioGroup: [],
        studio: []
      },
      ruleForm: {
        name: '',
        code: '',
        studio_group: '',
        studio: '',
        game_type: '',
        usp: '',
        game_category: '',
        game_source: '',
        producer: '',
        bp: '',
        hrbp: [],
        pm: [],
        statusId: ''
      },
      // 添加表单校验规则
      rules: {
        name: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入项目代码', trigger: 'blur' }],
        studio_group: [{ required: true, message: '请选择工作室群', trigger: 'change' }],
        studio: [{ required: true, message: '请选择工作室', trigger: 'change' }],
        game_type: [{ required: true, message: '请选择品类', trigger: 'change' }],
        usp: [{ required: true, message: '请输入usp', trigger: 'blur' }],
        game_category: [{ required: true, message: '请选择类型', trigger: 'change' }],
        game_source: [{ required: true, message: '请选择类型', trigger: 'change' }],
        producer: [{ required: true, message: '请输入产品制作人', trigger: 'blur' }],
        bp: [{ required: true, message: '请输入财务（BP）', trigger: 'blur' }],
        profession: [{ required: true, message: '请选择工种', trigger: 'change' }],
        project: [{ required: true, message: '请选择项目', trigger: 'change' }],
        input: [{ validator: this.checkInput, trigger: 'blur' }
          // { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '目前只支持2为小数' }
        ]
      },
      rules1: {
        input: [{ validator: this.checkInput, trigger: 'blur' }
        // { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '目前只支持2为小数' }
        ]
      },

      stageOpt: [],
      stageOpt1: [],
      tableData: [],
      total: 0,
      pagesize: 10,
      currentPage: 1,
      // 工作室群 -- 下拉
      studioGroupOpt_search: [],
      studioGroupOpt_dialog: [],
      // 工作室 -- 下拉
      studioOpt_search: [],
      studioOpt_dialog: [],
      studioOpt_all_dialog: [],
      // 品类 -- 下拉
      categoryOpt: [],
      gameTypeOpt: [],
      developmentTypeOpt: [],
      producerOpt: [],
      dialogType: 'add',
      oldOptions: [],
      oldGroupOptions: [],
      state: true,
      stageObj: {},
      listId: '',
      studio_group_name: '',
      studio_name: '',
      tableLoading: false,
      dialogLoading: false,
      // 添加框所有成员
      allMember: [],
      searchMember: [],
      searchMember1: [],
      allStatus: []
    }
  },
  async created () {
    this.getUserInfo()
    this.getBaseInfoStatus()
    getGameSourceList(this.id).then(res => {
      if (res.code !== -404) {
        this.developmentTypeOpt = res.data
      } else {
      }
    })
    getStudioGroupList().then(res => {
      if (res.code !== -404) {
        this.studioGroupOpt_search = res.data
        this.studioGroupOpt_dialog = JSON.parse(JSON.stringify(res.data))
        this.studioGroupOpt_search.unshift({
          dep_no: 'all',
          id: 'all',
          level: 2,
          name: '全部工作室群'
        })
      } else {
      }
    })
    getStudioList([]).then(res => {
      if (res.code !== -404) {
        this.studioOpt_search = res.data
        this.studioOpt_all_dialog = res.data
        this.studioOpt_search.unshift({
          dep_no: 'all',
          id: 'all',
          level: 2,
          name: '全部工作室'
        })
      } else {
      }
    })
    getGameCategoryList().then(res => {
      if (res.code !== -404) {
        this.gameTypeOpt = res.data
      } else {
      }
    })
    getGameTypeList().then(res => {
      if (res.code !== -404) {
        this.categoryOpt = res.data
      } else {
      }
    })
    const res = await getTableStage()
    if (res.code !== -404) {
      this.stageOpt1 = res.data
      for (let v of this.stageOpt) {
        this.$set(this.stageObj, v.id, '')
      }
    }
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.searchMember = []
        this.searchMember1 = []
        this.$nextTick(() => {
          this.resetFields()
        })
        // console.log('guanbbi')
        // this.resetFields()
        // this.resetFields()
      }
    }
  },
  mounted () {
    this.tableRender()
  },
  methods: {
    // 添加成员
    addMember () {
      this.getTableStage()
      this.dialogType = 'add'
      for (let i in this.ruleForm) {
        if (i === 'hrbp' || i === 'pm') {
          this.ruleForm[i] = []
        } else {
          this.ruleForm[i] = ''
        }
      }

      for (let i in this.stageObj) {
        this.stageObj[i] = ''
      }
      this.$nextTick(() => {
        this.resetFields()
      })
      this.dialogVisible = true

      this.getStudio_dialog()
    },
    resetFields () {
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields()
      }
    },
    // 提交表单
    submitForm (type) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.dialogLoading = true
          if (type === 'add') this.ruleFormAdd()
          if (type === 'modify') this.ruleFormModify()
        } else {
          return false
        }
      })
    },
    ruleFormAdd () {
      // ajax
      const o1 = this.ruleForm
      const o2 = this.stageObj
      let o3 = Object.assign(o1, o2)
      addProject(o3).then(res => {
        this.dialogLoading = false
        if (res.code !== -404) {
          this.dialogVisible = false
          let data = {
            dep_nos: this.searchForm.studioGroup,
            studioIds: this.searchForm.studio,
            pagesize: this.pagesize,
            page: 1
          }
          this.tableRender(data)
          this.currentPage = 1
        } else {
        }
      })
    },
    ruleFormModify () {
      // ajax
      const o1 = this.ruleForm
      const o2 = this.stageObj
      let o3 = Object.assign(o1, o2)
      let id = this.listId
      modifyProject({ id, ...o3 }).then(res => {
        this.dialogLoading = false
        if (res.code !== -404) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '编辑成功!',
            duration: 1200
          })
          let data = {
            dep_nos: this.searchForm.studioGroup,
            studioIds: this.searchForm.studio,
            pagesize: this.pagesize,
            page: this.currentPage
          }
          this.tableRender(data)
        } else {
        }
      })
    },
    paginationTable (val) {
      let res = {
        dep_nos: this.searchForm.studioGroup,
        studioIds: this.searchForm.studio,
        pagesize: this.pagesize,
        page: val
      }
      this.tableRender(res)
    },
    // table列表
    tableRender (res) {
      let data
      data =
        res === undefined
          ? {
            studioIds: [],
            pagesize: this.pagesize,
            page: 1
          }
          : res
      this.tableLoading = true
      getBaseInfoList(data).then(res => {
        this.tableLoading = false
        if (res.code !== -404) {
          this.tableData = res.data
          this.total = res.total
          this.$nextTick(() => {
            setTagTitle('.baseinfo')
          })
        } else {
        }
      })
    },
    // 获取在妍在营
    async getBaseInfoStatus () {
      const res = await getBaseInfoStatus()
      if (res.code !== -404) {
        // console.log(res)
        this.allStatus = res.data
      }
    },
    tableEditor (row) {
      // console.log(row)
      this.getTableStage(row.id, () => {
        this.dialogType = 'modify'
        this.dialogVisible = true
        this.id = row.id
        // this.ruleForm = {}
        this.searchMember1 = [...row.hrbp, ...row.pm]
        this.$nextTick(() => {
          for (let i in row) {
            if (
              i !== 'id' &&
              i !== 'name' &&
              i !== 'code' &&
              i !== 'game_type' &&
              i !== 'studio_group' &&
              i !== 'studio' &&
              i !== 'usp' &&
              i !== 'game_category' &&
              i !== 'game_source' &&
              i !== 'producer' &&
              i !== 'bp' &&
              i !== 'hrbp' &&
              i !== 'pm' &&
              i !== 'status' &&
              i !== 'statusId' &&
              i !== 'now_stage'
            ) {
              this.stageObj[i] = row[i]
              // this.$set(this.stageObj, i, row[i])
            }
            // else if (
            //   i === 'hrbp' ||
            //   i === 'pm'
            // ) {
            //   // console.log(row[i])
            //   this.ruleForm[i] = row[i] ? row[i].map(v => v.id) : []
            //   // this.$set(this.ruleForm, i, row[i] ? row[i].map(v => v.id) : [])
            // } else {
            //   console.log(row[i])
            //   let val = row[i] === '' ? row[i] : row[i] - 0
            //   this.$set(this.ruleForm, i, val)
            // }
          }
          this.ruleForm.id = row.id
          this.ruleForm.name = row.name
          this.ruleForm.code = row.code
          this.ruleForm.game_type = row.game_type
          this.ruleForm.studio_group = row.studio_group
          this.studio_group_name = row.studio_group_name
          this.ruleForm.studio = row.studio
          this.studio_name = row.studio_name
          this.ruleForm.usp = row.usp
          this.ruleForm.game_category = row.game_category
          this.ruleForm.game_source = row.game_source
          this.ruleForm.producer = row.producer
          this.ruleForm.bp = row.bp
          this.ruleForm.hrbp = row.hrbp ? row.hrbp.map(v => v.id) : []
          this.ruleForm.pm = row.pm ? row.pm.map(v => v.id) : []
          // this.ruleForm.status = row.status
          this.ruleForm.statusId = row.statusId.length === 0 ? row.statusId : row.statusId - 0
          this.ruleForm.now_stage = row.now_stage
        })

        this.getStudio_dialog('', 'modify')
        // this.resetFields()
      })
    },
    tableDelete (id, index) {
      // console.log(id)
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let data = {
            id: id
          }
          deleteProject(data).then(res => {
            if (res.code !== -404) {
              this.tableData.splice(index.$index, 1)
              let data = {
                dep_nos: this.searchForm.studioGroup,
                studioIds: this.searchForm.studio,
                pagesize: this.pagesize,
                page: 1
              }
              this.tableRender(data)
            } else {
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    getStudio_search (studio) {
      this.selectAll_Group(studio)
      let data = {
        dep_nos: this.searchForm.studioGroup
      }

      getStudioList(data).then(res => {
        if (res.code !== -404) {
          this.studioOpt_search = []
          this.searchForm.studio = []
          this.studioOpt_search = res.data
          this.studioOpt_search.unshift({
            dep_no: 'all',
            id: 'all',
            level: 2,
            name: '全部工作室'
          })
          for (var val of res.data) {
            this.searchForm.studio.push(val.id)
          }
          this.oldOptions[0] = this.searchForm.studio
          // renderTable
          let resData = {
            dep_nos: this.searchForm.studioGroup,
            studioIds: this.searchForm.studio,
            pagesize: this.pagesize,
            page: 1
          }
          this.tableRender(resData)
          this.currentPage = 1
        } else {
        }
      })
    },
    getStudio_dialog (studio, type) {
      this.studioOpt_dialog = []

      if (type !== 'modify') {
        this.ruleForm.studio = ''
      }

      let temp
      for (let i of this.studioGroupOpt_dialog) {
        if (this.ruleForm.studio_group === i.id) {
          temp = i.dep_no
        }
      }
      let data = {
        dep_nos: [temp]
      }
      getStudioList(data).then(res => {
        if (res.code !== -404) {
          this.studioOpt_dialog = res.data
          for (let v of this.studioGroupOpt_dialog) {
            if (v.id === this.ruleForm.studio_group) {
              this.studio_group_name = v.name
            }
          }
          for (let v of this.studioOpt_all_dialog) {
            if (v.id === this.ruleForm.studio) {
              this.studio_name = v.name
            }
          }
        } else {
        }
      })
    },
    selectAll_Group (val) {
      const allGroupValues = []
      // 保留所有值
      for (const item of this.studioGroupOpt_search) {
        allGroupValues.push(item.dep_no)
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal =
        this.oldGroupOptions.length === 1 ? this.oldGroupOptions[0] : []

      // 若是全部选择
      if (val.includes('all')) this.searchForm.studioGroup = allGroupValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) { this.searchForm.studioGroup = [] }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.searchForm.studioGroup = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allGroupValues.length - 1) { this.searchForm.studioGroup = ['all'].concat(val) }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldGroupOptions[0] = this.searchForm.studioGroup
    },
    selectAll (val) {
      const allValues = []
      // 保留所有值
      for (const item of this.studioOpt_search) {
        allValues.push(item.id)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldOptions.length === 1 ? this.oldOptions[0] : []

      // 若是全部选择
      if (val.includes('all')) this.searchForm.studio = allValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) { this.searchForm.studio = [] }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.searchForm.studio = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allValues.length - 1) { this.searchForm.studio = ['all'].concat(val) }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldOptions[0] = this.searchForm.studio

      let studioIds =
        this.searchForm.studio.length === 0 ? [] : this.searchForm.studio
      let res = {
        dep_nos: this.searchForm.studioGroup,
        studioIds: studioIds,
        pagesize: this.pagesize,
        page: 1
      }
      this.tableRender(res)
      this.currentPage = 1
    },
    // 监听页面变化
    handleSizeChange (val) {
      // console.log(val)
      this.pagesize = val
      this.currentPage = 1
      // this.paginationTable2(this.currentPage2)
      let res = {
        dep_nos: this.searchForm.studioGroup,
        studioIds: this.searchForm.studio,
        pagesize: this.pagesize,
        page: this.currentPage
      }
      this.tableRender(res)
    },
    cellStyle ({row, column, rowIndex, columnIndex}) {
      // console.log(column.colSpan)
      if (column.property !== 'name' && column.property !== 'edit') {
        return {textAlign: 'right'}
      } else {
        return {textAlign: 'center'}
      }
    },
    // 获取动态表头
    async getTableStage (id, callback) {
      const res = await getTableStageNew({id})
      if (res.code !== -404) {
        this.stageOpt = res.data
        for (let v of this.stageOpt) {
          this.$set(this.stageObj, v.id, '')
        }
        callback && callback()
      }
    },
    // 模糊过滤
    remoteMethod (query) {
      if (query !== '') {
        this.searchMember = this.allMember.filter(item => {
          return item.name.toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.searchMember = []
      }
    },
    remoteMethod1 (query) {
      if (query !== '') {
        this.searchMember1 = this.allMember.filter(item => {
          return item.name.toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.searchMember = []
      }
    },
    // 获取成员
    async getUserInfo () {
      // this.infoName = []
      const res = await getFilterUsers()
      if (res.code !== -400) {
        this.allMember = res.data
      }
    },
    // 获取人名字符串
    getNameString (row) {
      if (row) {
        return row.map(v => v.name).join('、')
      }
    }
  }

}
