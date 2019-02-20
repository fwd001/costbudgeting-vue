import {
  getStudioGroupList,
  getStudioList,
  getProjectSearch,
  proOpenOrClose,
  getProfessionData,
  getTypeList,
  delProfession,
  addWorkType,
  addProfession,
  editProfession,
  getFilterUsers,
  getWorkTypeList,
  getSearchUsers,
  getsearchDepartment,
  editUsersInfo
} from '@/api/api2'
import Stage from './com/stage.vue'
import ProjectProp from './com/projectProp.vue'
import { parseTime } from '@/utils'
export default {
  components: {
    Stage,
    ProjectProp
  },
  data () {
    return {
      activeName: 'first',
      // 工作室群
      allStudioFlock: [
        {
          studioId: 1,
          studioNane: '战神'
        }
      ],
      studioFlock: [],
      studioFlock3: [],
      // 工作室
      allStudio: [
        {
          studioId: 1,
          studioNane: 'M1'
        }
      ],
      oldGroupOptions: [[]],
      oldStudioOptions: [[]],
      studio: [],
      studio3: [],

      proData: [
        {id: 1, studioFlock: 'xxx', studio: 'xxx', projectId: 'xxx', project: 'xxx', isClose: false},
        {id: 2, studioFlock: 'xxx', studio: 'xxx', projectId: 'xxx', project: 'xxx', isClose: false}

      ],
      // 工种配置接口
      professionData: [
        {typeId: 2, type: 'xxx', professionId: 1, profession: 'xxx'},
        {typeId: 2, type: 'xxx', professionId: 2, profession: 'xxx'}
      ],

      page: 1,
      pageSize: 10,
      total: 0,

      page2: 1,
      pageSize2: 10,
      total2: 0,

      page3: 1,
      pageSize3: 10,
      total3: 0,

      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      dialogVisible4: false,
      isLoading: false,
      isLoading2: false,
      isLoading3: false,
      isLoading4: false,
      allType: [
        {id: 1, name: '运营'},
        {id: 2, name: '美术'},
        {id: 3, name: '中台'},
        {id: 4, name: '质量'},
        {id: 5, name: 'UED'}
      ],

      ruleForm: {
        type: ''
      },
      rules: {
        type: [{ required: true, message: '请填写类型', trigger: 'blur' }]
      },
      ruleForm2: {
        typeId: '',
        profession: ''
      },
      rules2: {
        typeId: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        profession: [{ required: true, message: '请填写工种', trigger: 'blur' }]
      },
      ruleForm3: {
        typeId: '',
        profession: '',
        professionId: ''
      },
      rules3: {
        typeId: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        profession: [{ required: true, message: '请填写工种', trigger: 'blur' }]
      },
      // 信息变更
      allType2: [
        {id: 1, name: '运营'},
        {id: 2, name: '美术'},
        {id: 3, name: '中台'},
        {id: 4, name: '质量'},
        {id: 5, name: 'UED'}
      ],
      oldTypeOption: [[]],
      typeIds: [],
      allProfession: [
        {id: 1, name: '运营'},
        {id: 2, name: '美术'},
        {id: 3, name: '中台'},
        {id: 4, name: '质量'},
        {id: 5, name: 'UED'}
      ],
      oldProfessionOption: [[]],
      professionIds: [],
      // 姓名
      // 添加框所有成员
      allMember: [],
      infoName: '',
      infoData: [
        {id: 1, studioFlock: '...', studioFlockId: '1', studio: '...', studioId: '1', name: 'xxx', type: '...', typeId: '1', profession: '...', professionId: '1'},
        {id: 1, studioFlock: '...', studioFlockId: '1', studio: '...', studioId: '1', name: 'xxx', type: '...', typeId: '1', profession: '...', professionId: '1'},
        {id: 1, studioFlock: '...', studioFlockId: '1', studio: '...', studioId: '1', name: 'xxx', type: '...', typeId: '1', profession: '...', professionId: '1'}

      ],
      ruleForm4: {
        userId: '',
        name: '',
        studioFlock: '',
        studioFlockId: '',
        studio: '',
        studioId: '',
        typeId: '',
        professionId: ''
      },
      rules4: {
        studioFlockId: [{ required: false, message: '请选择类型', trigger: 'blur' }],
        studioId: [{ required: false, message: '请选择类型', trigger: 'blur' }],
        typeId: [{ required: false, message: '请选择类型', trigger: 'blur' }],
        professionId: [{ required: false, message: '请填写工种', trigger: 'blur' }]
      },
      // 人员信息编辑框数据源
      allStudioFlock3: [],
      searchStudioFlock3: [],
      allStudio3: [],
      searchStudio3: [],
      allType3: [],
      allProfession3: [],
      loading1: true,
      loading2: true,
      loading3: true
    }
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.$refs.ruleForm.resetFields()
      }
    },
    dialogVisible2 (val) {
      if (!val) {
        this.$refs.ruleForm2.resetFields()
      }
    },
    dialogVisible3 (val) {
      if (!val) {
        this.$refs.ruleForm3.resetFields()
      }
    },
    dialogVisible4 (val) {
      if (!val) {
        this.$refs.ruleForm4.resetFields()
      }
    }
  },
  created () {
    this.getStudioAll()
  },
  methods: {
    // 选择分页
    handleClick (tab, index) {
      // console.log(tab, index)
      if (tab.index === '0') {

      } else if (tab.index === '1') {
        this.getTypeList()
        this.getProfessionData()
      } else if (tab.index === '2') {
        this.getTypeList()
        this.getUserInfo()
        this.getWorkTypeList([], true)
        this.getWorkTypeList()
        this.getMemberInfoData()
      } else if (tab.index === '3') {
      }
    },
    select (val) {
      const allGroupValues = []
      var name = ''
      if (this.activeName === 'first') {
        name = 'studioFlock'
      } else if (this.activeName === 'second') {
        // this.getUserInfo()
      } else if (this.activeName === 'third') {
        name = 'studioFlock3'
      }
      // 保留所有值
      for (const item of this.allStudioFlock) {
        allGroupValues.push(item.dep_no)
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal =
        this.oldGroupOptions.length === 1 ? this.oldGroupOptions[0] : []

      // 若是全部选择
      if (val.includes('all')) this[name] = allGroupValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) { this[name] = [] }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this[name] = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allGroupValues.length - 1) { this[name] = ['all'].concat(val) }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldGroupOptions[0] = this[name]
      // console.log(val)
      // 联动工作室
      getStudioList({dep_nos: val})
        .then(res => {
          this.allStudio = res.data
          this.allStudio.unshift({
            dep_no: 'all',
            id: 'all',
            level: 2,
            name: '全部工作室'
          })
          // this.studio = ['all']
          if (this.activeName === 'first') {
            this.studio = []
            this.getProData()
          } else if (this.activeName === 'second') {
            this.getUserInfo()
          } else if (this.activeName === 'third') {
            this.studio3 = []
            this.getMemberInfoData()
          }
        })
    },
    select2 (val) {
      const allGroupValues = []
      // 保留所有值
      for (const item of this.allStudio) {
        allGroupValues.push(item.id)
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal =
        this.oldStudioOptions.length === 1 ? this.oldStudioOptions[0] : []

      // 若是全部选择
      if (val.includes('all')) this.studio = allGroupValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) { this.studio = [] }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.studio = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allGroupValues.length - 1) { this.studio = ['all'].concat(val) }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldStudioOptions[0] = this.studio
      if (this.activeName === 'first') {
        this.getProData()
      } else if (this.activeName === 'second') {
        this.getUserInfo()
      } else if (this.activeName === 'third') {
        this.getMemberInfoData()
      }
    },
    // 关闭选项
    checkboxChange (row) {
      let status = row.isClose - 0
      // console.log(status)
      proOpenOrClose({projectId: row.id, status})
        .then(res => {
          if (res.code === -404) {
            this.$message({
              message: '请求失败',
              type: 'error'
            })
            row.isClose = !row.isClose
          } else {
            if (row.isClose) {
              this.$message({
                message: '关闭成功',
                type: 'success',
                duration: 700
              })
            } else {
              this.$message({
                message: '开启成功',
                type: 'success',
                duration: 700
              })
            }
          }
        })
    },
    // 获取类型列表
    getTypeList () {
      getTypeList()
        .then(res => {
          if (res.code !== -404) {
            this.allType3 = res.data.map(item => item)
            this.allType2 = res.data.map(item => item)
            this.allType = res.data.map(item => item)
            // console.log(res)
            this.allType2.unshift({id: 'all', name: '全部类型'})
          }
        })
    },
    // 获取第一页列表数据
    getProData () {
      this.loading1 = true
      getProjectSearch({studioGroups: this.studioFlock, studios: this.studio, page: this.page, pageSize: this.pageSize})
        .then(res => {
          this.loading1 = false
          if (res.code !== -404) {
            // console.log(res.code)
            this.proData = res.data.list
            this.total = res.data.count
          }
        })
    },
    // 获取第二页列表数据
    getProfessionData () {
      this.loading2 = true
      getProfessionData({page: this.page2, pageSize: this.pageSize2})
        .then(res => {
          // console.log(res)
          if (res.code !== -404) {
            this.loading2 = false
            this.total2 = res.data.count
            this.professionData = res.data.list
            this.dialogVisible = false
            this.isLoading = false
            this.dialogVisible2 = false
            this.isLoading2 = false
            this.dialogVisible3 = false
            this.isLoading3 = false
          }
        })
    },
    // 切换分页方法
    handleCurrentChange (val) {
      // console.log(val)
      // console.log(this.activeName)
      if (this.activeName === 'first') {
        this.page = val
        this.getProData()
      } else if (this.activeName === 'second') {
        // console.log('第二页')
        this.page2 = val
        this.getProfessionData()
      } else if (this.activeName === 'third') {
        // console.log('第三页')
        this.page3 = val
        this.getMemberInfoData()
      }
    },
    // 第三页cell样式
    cellStyle2 ({row, column, rowIndex, columnIndex}) {
      // console.log(column.colSpan)
      if (column.property !== 'month') {
        return {textAlign: 'right'}
      } else {
        return {textAlign: 'left'}
      }
    },
    // 监听页面大小变化
    handleSizeChange (val) {
      // console.log(val)
      if (this.activeName === 'first') {
        this.pageSize = val
        this.page = 1
        this.getProData()
      } else if (this.activeName === 'second') {
        // console.log('第二页')
        this.pageSize2 = val
        this.page2 = 1
        this.getProData()
        this.getProfessionData()
      } else if (this.activeName === 'third') {
        // console.log('第三页')
        this.pageSize3 = val
        this.page3 = 1
        this.getMemberInfoData()
      }
    },
    // 新增类型界面
    addType () {
      this.dialogVisible = true
    },
    // 新增工种界面
    addProfession () {
      this.dialogVisible2 = true
    },
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName === 'ruleForm') {
            this.isLoading = true
            addWorkType({workClassName: this.ruleForm.type})
              .then(res => {
                // console.log(res)
                if (res.code !== -404) {
                  this.getTypeList()
                  this.getProfessionData()
                }
              })
          } else if (formName === 'ruleForm2') {
            this.isLoading2 = true
            addProfession({workTypeName: this.ruleForm2.profession, workClassId: this.ruleForm2.typeId})
              .then(res => {
                // console.log(res)
                if (res.code !== -404) {
                  this.getTypeList()
                  this.getProfessionData()
                }
              })
          } else if (formName === 'ruleForm3') {
            this.isLoading3 = true
            editProfession({workTypeName: this.ruleForm3.profession, workClassId: this.ruleForm3.typeId, workTypeId: this.ruleForm3.professionId})
              .then(res => {
                // console.log(res)
                if (res.code !== -404) {
                  this.getTypeList()
                  this.getProfessionData()
                }
              })
          } else if (formName === 'ruleForm4') {
            this.isLoading4 = true
            let data = {
              userId: this.ruleForm4.userId,
              workClassId: this.ruleForm4.typeId,
              workTypeId: this.ruleForm4.professionId,
              depId: this.ruleForm4.studioId
            }
            editUsersInfo(data)
              .then(res => {
                // console.log(res)
                this.isLoading4 = false
                this.dialogVisible4 = false
                if (res.code !== -404) {
                  this.getMemberInfoData()
                }
              })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    editData (row) {
      this.dialogVisible3 = true
      this.ruleForm3.typeId = row.typeId
      this.ruleForm3.profession = row.profession
      this.ruleForm3.professionId = row.professionId
    },
    delData (row) {
      this.$confirm('此操作将删除本条工种, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delProfession({id: row.professionId})
          .then(res => {
            if (res.code !== -404) {
              if (this.total2 % this.pageSize2 === 1) {
                this.page2--
              }
              // console.log(this.page2)
              this.getProfessionData()
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /* 人员信息变动 */
    // 选择类型
    async select3 (val) {
      const allGroupValues = []
      // 保留所有值
      for (const item of this.allType2) {
        allGroupValues.push(item.id)
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal =
        this.oldTypeOption.length === 1 ? this.oldTypeOption[0] : []

      // 若是全部选择
      if (val.includes('all')) this.typeIds = allGroupValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) { this.typeIds = [] }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.typeIds = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allGroupValues.length - 1) { this.typeIds = ['all'].concat(val) }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldTypeOption[0] = this.typeIds
      if (this.activeName === 'first') {
      } else if (this.activeName === 'second') {
      } else if (this.activeName === 'third') {
        this.getWorkTypeList(this.typeIds)
        this.getUserInfo()
        this.getMemberInfoData()
      }
    },
    // 选择工种
    select4 (val) {
      const allGroupValues = []
      // 保留所有值
      for (const item of this.allProfession) {
        allGroupValues.push(item.id)
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal =
        this.oldProfessionOption.length === 1 ? this.oldProfessionOption[0] : []

      // 若是全部选择
      if (val.includes('all')) this.professionIds = allGroupValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) { this.professionIds = [] }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.professionIds = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allGroupValues.length - 1) { this.professionIds = ['all'].concat(val) }
      }
      // 储存当前最后的结果 作为下次的老数据
      this.oldProfessionOption[0] = this.professionIds
      if (this.activeName === 'first') {
      } else if (this.activeName === 'second') {
      } else if (this.activeName === 'third') {
        this.getUserInfo()
        this.getMemberInfoData()
      }
    },
    select5 (val) {
      this.getMemberInfoData()
    },
    // 编辑框选择联动
    select6 (val) {
      this.getAllStudio3(val)
    },
    select7 (val) {
      // console.log(val)
      this.getWorkTypeList([val], true)
    },
    // 获取工作室工作室群
    async getStudioAll () {
      const res = await Promise.all([getStudioGroupList(), getStudioList([])])
      let success = res.every(item => item.code !== -404)
      if (success) {
        this.allStudioFlock = res[0].data.map(item => item)
        this.allStudio = res[1].data.map(item => item)
        // this.allStudioFlock3 = res[0].data.map(item => item)
        // this.allStudio3 = res[1].data.map(item => item)
        this.allStudioFlock.unshift({
          dep_no: 'all',
          id: 'all',
          level: 2,
          name: '全部工作室群'
        })
        this.allStudio.unshift({
          dep_no: 'all',
          id: 'all',
          level: 2,
          name: '全部工作室'
        })
        this.getProData()
      }
    },
    // 获取成员
    async getUserInfo () {
      this.infoName = []
      var data = {
        studioGroups: this.studioFlock,
        studios: this.studio,
        workClassIds: this.typeIds,
        workTypeIds: this.professionIds
      }
      const res = await getFilterUsers(data)
      if (res.code !== -400) {
        this.allMember = res.data
        // console.log(this.allMember)
      }
    },
    // 获取工种
    async getWorkTypeList (workClassIds, edit = false) {
      this.ruleForm4.professionId = ''
      this.professionIds = []
      const res = await getWorkTypeList({workClassIds})
      if (res.code !== -404) {
        if (edit) {
          this.allProfession3 = res.data.map(item => item)
        } else {
          this.allProfession = res.data.map(item => item)
          this.allProfession.unshift({id: 'all', name: '全部工种'})
        }
      }
    },
    // 获取第三表人员信息列表
    async getMemberInfoData () {
      this.loading3 = true
      const data = {
        studioGroups: this.studioFlock3,
        studios: this.studio3,
        workClassIds: this.typeIds,
        workTypeIds: this.professionIds,
        userIds: this.infoName,
        page: this.page3,
        pageSize: this.pageSize3
      }
      const res = await getSearchUsers(data)
      if (res.code !== -404) {
        // console.log(res)
        this.loading3 = false
        this.infoData = res.data.list
        this.total3 = res.data.count
      }
    },
    aditInfo (row) {
      this.getAllStudioFlock3()
      this.dialogVisible4 = true
      // console.log(row)
      this.ruleForm4.userId = row.id
      this.ruleForm4.name = row.name
      this.ruleForm4.studioFlock = row.studioFlock
      this.ruleForm4.studioFlockId = row.studioFlockId
      this.ruleForm4.studio = row.studio
      this.ruleForm4.studioId = row.studioId
      this.ruleForm4.typeId = row.typeId
      this.ruleForm4.professionId = row.professionId
    },
    // 获取全部工作室群或工作室
    async getAllStudio3 (id) {
      const res = await getsearchDepartment({id: id})
      if (res.code !== -404) {
        this.ruleForm4.studioId = ''
        this.allStudio3 = res.data
      }
    },
    async getAllStudioFlock3 () {
      const res = await getsearchDepartment()
      if (res.code !== -404) {
        // console.log(res)
        this.allStudioFlock3 = res.data
        this.allStudio3 = res.data
      }
    },
    // 模糊搜索群
    remoteMethod (query) {
      if (query !== '') {
        this.searchStudioFlock3 = this.allStudioFlock3.filter(item => {
          return item.dep_name.toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.searchStudioFlock3 = []
      }
    },
    handleDownload () {
      console.log(this.proData)
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['工作室群', '工作室', '项目代号', '项目名', '是否关闭']
        const filterVal = ['studioFlock', 'studio', 'projectId', 'project', 'isClose']
        const data = this.formatJson(filterVal, this.proData)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
      })
    },
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    }
  }
}
