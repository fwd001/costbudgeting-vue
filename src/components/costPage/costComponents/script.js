import {
  getWorkerType,
  gethistoryInput,
  getProjectList,
  getMonthQuery,
  getHistoryCost,
  editMember,
  delMember,
  getProjectUsers,
  getQuailtyInput,
  getQuailtyAloneInput,
  delQuailtyAloneInput,
  setOutsourceUserSalary } from '@/api/api'
import { getUserList } from '@/api/api2'
import { CODE_SUCCESS } from '@/assets/js/config'
import { setTagTitle } from '@/assets/utils'
export default {
  data () {
    return {
      // 表格高度
      tableHeight: 0,
      // 选中标签页
      activeName: 'first',
      // 工作类型id
      // id: 14,
      // 暂时成员id
      // memberId: 1,
      // 0~1 校验
      rex: /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/,
      // 正浮点数正则
      rex1: /^[0-9]\d{0,5}(\.\d{1,2})?$/,
      // 项目投入度：项目
      project: '',
      project1: '',
      allProject1: [],
      // 成员类型
      allMemType: [
        {id: 1, name: '正式员工'},
        {id: 2, name: '外包员工'}
      ],
      memType: '',
      // 显示新增弹框
      dialogVisible: false,
      ruleForm: {
        id: '',
        month: '',
        name: '',
        professionId: '', // 工种
        project: '',
        systemInput: '' // 投入度
      },
      // 添加表单校验规则
      rules: {
        month: [{ required: true, message: '请选择月份', trigger: 'blur' }],
        id: [{ required: true, message: '请选择人员', trigger: 'blur' }],
        professionId: [
          { required: true, message: '请选择工种', trigger: 'blur' }
        ],
        project: [{ required: true, message: '请选择项目', trigger: 'blur' }],
        systemInput: [{ validator: this.checkInput, trigger: 'blur' }
          // { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '目前只支持2为小数' }
        ]
      },
      // 添加框所有成员
      allMember: [],
      searchMember: [],
      searchMember1: [],
      // 添加框所有工种
      allProfession: [],

      // 项目投入度table
      proInputData: {column: [], record: []},

      // 历史投入度
      // 成员选择框
      allHistoryMember: [],
      historyMember: '',
      // 项目选择框
      allHPro: [],
      allHPro2: [],
      HPro: '',
      HPro2: [],
      oldHPro2: [[]],
      // 月份选择器
      monthVal: '',
      // 表数据
      historyTableData: {column: [], record: []},
      // 模拟数据
      // historyTableData1: {
      //   column: [
      //     {key: 'name', title: '姓名'},
      //     {key: '1', title: '2018/1'},
      //     {key: '2', title: '2018/1'},
      //     {key: '3', title: '2018/1'},
      //     {key: 'sum', title: '合计'}
      //   ],
      //   record: [
      //     {
      //       name: '卡1',
      //       '1': '女神：1.10',
      //       '2': '盗墓笔记：0.20',
      //       '3': '镜花水月：0.40',
      //       'sum': '1.00'
      //     },
      //     {
      //       name: '卡2',
      //       '1': '女神：0.6',
      //       '2': '盗墓笔记：0.20',
      //       '3': '镜花水月：0.40',
      //       'sum': '1.20'
      //     },
      //     {
      //       name: '卡3',
      //       '1': '女神：0.10',
      //       '2': '镜花水月：0.50',
      //       'sum': '1.00'
      //     },
      //     {
      //       name: '卡4',
      //       '1': '盗墓笔记：0.20',
      //       '2': '镜花水月：0.50',
      //       'sum': '1.12'
      //     },
      //     {
      //       name: '人数合计',
      //       '1': '投入额合计：1.80'
      //     }
      //   ]
      // },
      /* 历史成本值-研发 */
      historyCostData: {
        column: [],
        record: []
      },
      // 分页
      proPage: 1,
      proTotal: 0,

      hisPage: 1,
      hisTotal: 0,

      hisCostPage: 1,
      hisCostTotal: 0,

      pageSize: 10,

      isLoading: false,
      pickerOptions0: {
        disabledDate (time) {
          let date = new Date()
          let month = ''
          month = date.getFullYear() + '-' + date.getMonth() + '-01'
          return time.getTime() > new Date(month)
        }
      },
      // 投入度和工时比切换
      inputName: 'systemInput',
      loading1: true,
      loading2: true,
      loading3: true
    }
  },
  props: {
    memberId: Number,
    titleName: String,
    urlPower: String
  },
  computed: {
    // 是否显示工种
    isProfession () {
      // console.log('asdfasd')
      if (this.ruleForm.id) {
        let user = this.searchMember.find(item => this.ruleForm.id === item.id)
        if (user) {
          if (user.workTypeId === -1) {
            this.ruleForm.professionId = ''
          } else {
            if (this.allProfession.some(item => item.id === user.workTypeId)) {
              // console.log('有的')
              this.ruleForm.professionId = user.workTypeId
            } else {
              this.$message.error('人员工种不符合该部门，请重新选择')
              return 0
              // console.log('没有的')
            }
          }
          return user.workTypeId
        } else {
          return -1
        }
      } else {
        this.searchMember = []
        return -1
      }
    }
  },
  created () {
    this.getNowMonth()
    // 获取项目列表和工种列表
    Promise.all([getProjectList(), getWorkerType(this.memberId)])
      .then((res) => {
        let success = res.every(item => item.code !== -400)
        if (success) {
          // console.log(res)
          this.allProject1 = res[0].data.map(i => i)
          this.allHPro = res[0].data.map(i => i)
          this.allHPro2 = res[0].data.map(i => i)
          this.allHPro2.unshift({
            project_id: 'all',
            project_name: '全部项目'
          })
          this.allProfession = res[1].data.map(i => i)
          this.getProjectInDegrees(this.proPage, this.pageSize, this.project, this.memType)
          this.getColumn()
        }
      })
      .catch(err => {
        console.log(err)
      })
    this.getUserInfo(this.memberId)
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
    }
  },
  methods: {
    // 添加成员
    addMember () {
      this.dialogVisible = true
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true
          var {
            month,
            id: userId,
            professionId: workTypeId,
            project: projectId,
            systemInput: involvement
          } = this[formName]

          editMember({
            add: 1,
            month,
            userId,
            workTypeId,
            projectId,
            involvement,
            memberClassId: this.memberId,
            type: this.urlPower})
            .then(res => {
              this.dialogVisible = false
              this.isLoading = false
              if (res.code === CODE_SUCCESS) {
                this.proPage = 1
                this.getProjectInDegrees(this.proPage, this.pageSize, this.project, this.memType)
                this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
                this.getHistoryCostTableData()
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 投入度校验规则
    checkInput (rule, value, callback) {
      if (value) {
        let flag = this.rex.test(value)
        if (!flag) {
          callback(new Error('仅支持0-1，保留两位小数'))
        } else {
          if (value > 1) {
            callback(new Error('仅支持0-1，保留两位小数'))
          } else {
            callback()
          }
        }
      } else {
        callback()
      }
    },
    // 删除项目投入度
    delData (row) {
      // console.log('删除' + row.month)
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var { month, id: userId } = row
        delMember({month, userId, memberClassId: this.memberId, type: this.urlPower})
          .then(res => {
            if (res.code === CODE_SUCCESS) {
              this.getProjectInDegrees(this.proPage, this.pageSize, this.project, this.memType)
              this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
              this.getHistoryCostTableData()
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
    // 删除项目投入度
    delInput (row, column) {
      this.$confirm('确定要删除该人员的项目投入度吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(row[column.property + 'Id'])
        delQuailtyAloneInput({involvementId: row[column.property + 'Id'], type: this.urlPower})
          .then(res => {
            if (res.code === CODE_SUCCESS) {
              // console.log(res)
              this.replaceAlone(res.data)
              this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
              this.getHistoryCostTableData()
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
    // 第二页cell样式
    cellStyle ({row, column, rowIndex, columnIndex}) {
      // console.log(row, column)
      // if (columnIndex !== 0 && row[column.property] > 1) {
      //   return 'highLight'
      // } else {
      //   return ''
      // }
      if (column.property === 'sum' && row.sum > 1) {
        return 'highLight'
      } else {
        return ''
      }
    },
    // 获取项目投入度数据第一页数据
    getProjectInDegrees (page, pageSize, projectId, memberType, date) {
      this.loading1 = true
      getQuailtyInput({
        date,
        page,
        pageSize,
        memberType,
        memberClassId: this.memberId,
        projectId,
        type: this.urlPower})
        .then(res => {
          // console.log(res)
          if (res.code !== -404) {
            this.loading1 = false
            this.proInputData = res.data
            this.proTotal = res.data.total
            this.$nextTick(() => {
              // DOM 现在更新了
              setTagTitle('.costCom')
            })
          }
        })
    },
    // 获取历史投入度 第二页数据
    gethistoryInputTableData (proId, memId, date) {
      this.loading2 = true
      gethistoryInput({
        projectId: proId,
        memberId: memId,
        date: date,
        memberClassId: this.memberId,
        type: this.urlPower})
        .then(res => {
          if (res.code !== -400) {
            this.loading2 = false
            this.historyTableData = res.data
            this.$nextTick(() => {
              // DOM 现在更新了
              setTagTitle('.costCom')
            })
          }
        })
    },
    // 获取第三页数据
    getHistoryCostTableData () {
      this.loading3 = true
      getHistoryCost({memberClassId: this.memberId, type: this.urlPower, projectId: this.HPro2})
        .then(res => {
          // console.log(res)
          if (res.code !== -404) {
            this.loading3 = false
            this.historyCostData = res.data
            this.$nextTick(() => {
              setTagTitle('.costCom')
            })
          }
        })
    },
    // 切换分页方法
    handleCurrentChange (val) {
      // console.log(val)
      // console.log(this.activeName)
      if (this.activeName === 'first') {
        this.getProjectInDegrees(val, this.pageSize, this.project)
      } else if (this.activeName === 'second') {
        // console.log('第二页')
      } else {
        // console.log('第二页')
      }
    },
    // 获取成员
    getUserInfo (workClass, date) {
      this.ruleForm.id = ''
      getUserList({workClass, date})
        .then(res => {
          // console.log(res)
          if (res.code !== -400) {
            this.allMember = res.data
            this.allHistoryMember = res.data
          }
        })
    },
    // 点击确认触发
    confirm (row) {
      // console.log(row)
      if (row.currentProject === '') {
        this.$message.error('错了哦，没有该项目')
        return
      }
      let flag = this.rex.test(row[this.inputName])
      if (flag && row[this.inputName] <= 1) {
        // console.log('通过了')
        var {
          month,
          id: userId,
          // professionId: workTypeId,
          currentProject: projectId,
          [this.inputName]: involvement
        } = row

        editMember({
          month,
          userId,
          projectId,
          involvement,
          // workTypeId,
          memberClassId: this.memberId,
          type: this.urlPower})
          .then(res => {
            if (res.code === CODE_SUCCESS) {
              this.replaceAlone(res.data)
              this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
              this.getHistoryCostTableData()
            }
          })
      } else {
        this.$message.error('错了哦，仅支持0-1，保留两位小数')
      }
    },
    // 日期修改触发
    changeMonth (row) {
      getQuailtyAloneInput({
        workTypeId: '',
        date: row.month,
        memberId: row.id,
        memberClassId: this.memberId,
        projectId: row.currentProject,
        type: this.urlPower})
        .then(res => {
          this.replaceAlone(res.data)
        })
    },
    // 替换单行
    replaceAlone (data) {
      let index = this.proInputData.record.findIndex(item => item.id === data.record.id)
      this.proInputData.record.splice(index, 1, data.record)
      this.getColumn()
    },
    // 动态计算列
    getColumn () {
      let val = this.proInputData.record.map(item => item.inputCount)
      const count = Math.max.apply(Math, val)
      var column = []
      for (let i = 0; i < count; i++) {
        column.push({
          key: 'input' + (i + 1),
          title: '项目投入度' + (i + 1)
        })
      }
      this.proInputData.column = column
    },
    selectEvent (val) {
      this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
    },
    // 第1页选择产品
    selectPro1 (val) {
      this.getProjectInDegrees(this.proPage, this.pageSize, this.project, this.memType)
      this.$store.commit('getProjectsUpdata', val)
    },
    // 选择成员类型
    selectMemType (val) {
      this.getProjectInDegrees(this.proPage, this.pageSize, this.project, this.memType)
    },

    // 第2页选择产品
    selectPro (val) {
      this.historyMember = ''
      getProjectUsers({projectId: this.HPro, date: this.monthVal})
        .then(res => {
          this.allHistoryMember = res.data
          this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
        })
      this.$store.commit('getProjectsUpdata', val)
    },
    // 第3页选择产品
    selectPro3 (val) {
      const allGroupValues = []
      // 保留所有值
      for (const item of this.allHPro2) {
        allGroupValues.push(item.project_id)
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal =
        this.oldHPro2.length === 1 ? this.oldHPro2[0] : []

      // 若是全部选择
      if (val.includes('all')) this.HPro2 = allGroupValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) { this.HPro2 = [] }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.HPro2 = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allGroupValues.length - 1) { this.HPro2 = ['all'].concat(val) }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldHPro2[0] = this.HPro2
      // console.log(val)
      // 联动工作室
      this.$store.commit('getProjectsUpdata', this.HPro2)
      this.getHistoryCostTableData()
    },
    getNowMonth () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()
      month = (month < 10 ? '0' + month : month)
      this.monthVal = (year.toString() + '/' + month.toString())
    },
    queryMonth (i, row) {
      // console.log(row)
      getMonthQuery({projectId: row.projectId, date: row.month, memberId: row.id})
        .then(res => {
          // console.log(res)
          if (res.code !== -404) {
            if (res.data.length !== 0) {
              // console.log(this.proInputData)
              var current = this.proInputData.find(item => item.id === res.data.id)
              current[this.inputName] = res.data[this.inputName]
              current.projectInput = res.data.projectInput
            } else {
              var current2 = this.proInputData.find(item => item.id === row.id)
              current2[this.inputName] = 0
              current2.projectInput = 0
            }
          }
        })
    },
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
        this.searchMember1 = this.allHistoryMember.filter(item => {
          return item.name.toLowerCase()
            .indexOf(query.toLowerCase()) > -1
        })
      } else {
        this.searchMember = []
      }
    },
    // 删除置灰
    delGray ({row}) {
      // console.log(row)
      if (row.is_delete === 1) {
        return 'isGray'
      }
    },
    // 点击标签页切换
    handleClick (tab) {
      // console.log(tab.index)
      // console.log(tab)
      if (tab.index === '1') {
        this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
      } else if (tab.index === '2') {
        this.getHistoryCostTableData()
      }
    },
    // 第三页cell样式
    cellStyle2 ({row, column, rowIndex, columnIndex}) {
      // console.log(column.colSpan)
      if (column.property !== 'month' && column.property === 'sum') {
        return {textAlign: 'right'}
      } else {
        return {textAlign: 'left'}
      }
    },
    // 第一页样式
    cellStyle1 ({row, column, rowIndex, columnIndex}) {
      if (column.property === 'outsourceSalary') {
        if (row.outsource === 0) {
          return {textAlign: 'right', backgroundColor: 'grey'}
        } else {
          return {textAlign: 'right'}
        }
      } else {
        return {textAlign: 'left'}
      }
    },
    // 监听页面大小变化
    handleSizeChange (val) {
      // console.log(val)
      this.pageSize = val
      this.proPage = 1
      this.getProjectInDegrees(this.proPage, this.pageSize, this.project, this.memType)
    },
    // 双击表格
    dbClickCell (row, column, cell, event) {
      if (column.property === 'outsourceSalary') {
        if (row.outsource === 1) {
          row.edit = true
          this.$nextTick(() => {
            cell.querySelector('input').focus()
          })
        }
      }
    },

    // 修改接口
    async editImput (row, callback) {
      const data = {
        month: row.month,
        salary: row.outsourceSalary,
        userId: row.id
      }
      const res = await setOutsourceUserSalary(data)
      if (res.code !== -404) {
        this.$nextTick(() => {
          // DOM 现在更新了
          setTagTitle('.costCom')
        })
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
      } else {
        callback && callback()
      }
    },

    // 输入框失焦点
    manInputEdit (row) {
      // console.log(row)
      const isNum = this.rex1.test(row.outsourceSalary)
      if (isNum) {
        // console.log('数字')
        this.editImput(row, () => {
          this.getProjectInDegrees(this.proPage, this.pageSize, this.project, this.memType)
          this.$message({
            message: '请求失败',
            type: 'error'
          })
        })
      } else {
        this.$message({
          message: '请填写正确格式',
          type: 'error'
        })
        this.getProjectInDegrees(this.proPage, this.pageSize, this.project, this.memType)
      }
      row.edit = false
    }
  },
  mounted () {}
}
