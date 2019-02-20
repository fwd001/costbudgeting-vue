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
  delQuailtyAloneInput } from '@/api/api'
import { getUserList } from '@/api/api2'
import { CODE_SUCCESS } from '@/assets/js/config'
import { setTagTitle } from '@/assets/utils'
export default {
  props: {
    id: Number,
    memberId: Number,
    titleName: String,
    urlPower: String
  },
  data () {
    return {
      // 表格高度
      tableHeight: 0,
      // 选中标签页
      activeName: 'first',
      // 工作类型id
      // id: 13,
      // 暂时成员id
      // memberId: 2,

      rex: /^(0(\.\d{1,2})?|1(\.0{1,2})?)$/,
      // 项目投入度：项目
      project1: '',
      allProject1: [
        // {
        //   value: '1',
        //   label: '盗墓笔记'
        // },
        // {
        //   value: '2',
        //   label: '天使国内'
        // }
      ],
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
        systemInput: [
          { validator: this.checkInput, trigger: 'blur' }
          // { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '目前只支持2为小数' }
        ]
      },
      // 添加框所有成员
      allMember: [
        // {
        //   value: '1',
        //   label: '盗墓笔记成员'
        // },
        // {
        //   value: '2',
        //   label: '天使国内'
        // }
      ],
      searchMember: [],
      // 添加框所有工种
      allProfession: [
        // {
        //   value: '1',
        //   label: '盗墓笔记工种'
        // },
        // {
        //   value: '2',
        //   label: '天使国内'
        // }
      ],

      // 项目投入度table
      proInputData: {
        column: [
          {
            title: '项目投入度',
            key: 'input1'
          }
          // {
          //   title: '项目投入度2',
          //   key: 'input2'
          // },
          // {
          //   title: '项目投入度3',
          //   key: 'input3'
          // }
        ],
        record: [
          // {
          //   id: '1',
          //   month: '2016-02',
          //   name: '王小虎1',
          //   profession: '盗墓笔记工种',
          //   professionId: '1',
          //   allProject: [
          //     {id: '233', porject: '天使国内1'},
          //     {id: '234', porject: '天使国内3'},
          //     {id: '235', porject: '天使国内4'}
          //   ],
          //   currentProject: '233',
          //   systemInput: '0.2',
          //   projectInput: '0.3',
          //   input1: '天使国内12312312323：0.3',
          //   input1Id: '1',
          //   input2: '天使国内3：1',
          //   input2Id: '2',
          //   input3: '天使国内4：0.2',
          //   input3Id: '3',
          //   inputCount: 3
          // },
          // {
          //   id: '1',
          //   month: '2016-02',
          //   name: '王小虎1',
          //   profession: '盗墓笔记工种',
          //   professionId: '1',
          //   allProject: [
          //     {id: '233', porject: '天使国内1'},
          //     {id: '234', porject: '天使国内3'},
          //     {id: '235', porject: '天使国内4'}
          //   ],
          //   currentProject: '233',
          //   systemInput: '0.2',
          //   projectInput: '0.3',
          //   input1: '天使国内12312312323：0.3',
          //   input1Id: '1',
          //   input2: '天使国内3：1',
          //   input2Id: '2',
          //   inputCount: 2
          // }
        ]
      },

      // 历史投入度
      // 成员选择框
      allHistoryMember: [
        // {
        //   id: '1',
        //   name: '盗墓笔记成员'
        // },
        // {
        //   id: '2',
        //   name: '天使国内'
        // }
      ],
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
      historyTableData: {
        column: [
          // {key: 'month', title: '月份'},
          // {key: '1', title: '卡布达1'},
          // {key: '2', title: '卡布达2'},
          // {key: '3', title: '卡布达3'}
        ],
        record: [
          // {
          //   month: '2013-1',
          //   '1': '女神：1.1',
          //   '2': '盗墓笔记：0.2',
          //   '3': '镜花水月：0.4'
          // },
          // {
          //   month: '2013-2',
          //   '1': '女神：0.6',
          //   '2': '盗墓笔记：0.2',
          //   '3': '镜花水月：0.4'
          // },
          // {
          //   month: '2013-3',
          //   '1': '女神：0.1',
          //   '2': '盗墓笔记：0.2',
          //   '3': '镜花水月：0.5'
          // },
          // {
          //   month: '合计',
          //   '1': '1',
          //   '2': '0.9',
          //   '3': '2'
          // }
        ]
      },
      /* 历史成本值-研发 */
      historyCostData: {
        column: [
          // {key: 'month', title: '月份'},
          // {key: '1', title: '2019-03'},
          // {key: '2', title: '2019-02'},
          // {key: '3', title: '2019-01'},
          // {key: '4', title: '合计'}
        ],
        record: [
          // {
          //   month: '天使国内',
          //   '1': '1000',
          //   '2': '2000',
          //   '3': '3000',
          //   '4': '6000'
          // },
          // {
          //   month: '女神',
          //   '1': '1000',
          //   '2': '500',
          //   '3': '1500',
          //   '4': '3000'
          // },
          // {
          //   month: '合计',
          //   '1': '2000',
          //   '2': '2500',
          //   '3': '4500',
          //   '4': '9000'
          // }
        ]
      },
      // 分页
      proPage: 1,
      proTotal: 0,

      hisPage: 1,
      hisTotal: 0,

      hisCostPage: 1,
      hisCostTotal: 0,

      pageSize: 10,

      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },

      // 双击修改系统投入度
      // editInDegrees: []
      isLoading: false,
      // 投入度和工时比切换
      inputName: 'systemInput',
      loading1: true,
      loading2: true,
      loading3: true
    }
  },
  created () {
    this.getNowMonth()
    Promise.all([getProjectList(), getWorkerType(4)])
      .then((res) => {
        let success = res.every(item => item.code === CODE_SUCCESS)
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
          this.getProjectInDegrees(this.id, this.proPage, this.pageSize)
          this.getColumn()
        }
      })
      .catch(err => {
        console.log(err)
      })
    // this.tableHeight = getFullHeight(220)
    this.getUserInfo()
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
      // console.log('添加人员')
      this.dialogVisible = true
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true
          // this.isMask = true
          // console.log(this[formName])
          var {
            month,
            id: userId,
            // professionId: workTypeId,
            project: projectId,
            systemInput: involvement
          } = this[formName]

          editMember({
            add: 1,
            month,
            userId,
            workTypeId: this.id,
            projectId,
            involvement,
            memberClassId: this.memberId,
            type: this.urlPower})
            .then(res => {
              this.dialogVisible = false
              this.isLoading = false
              if (res.code === CODE_SUCCESS) {
                this.proPage = 1
                this.getProjectInDegrees(this.id, this.proPage, this.pageSize)
                this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
                this.getHistoryCostTableData()
                // var current2 = this.proInputData.find(item => item.id === userId)
                // current2.projectInput = involvement
                // this.isMask = false
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
            this.getProjectInDegrees(this.id, this.proPage, this.pageSize)
            this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
            this.getHistoryCostTableData()
            if (res.code === CODE_SUCCESS) {
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
              // this.getProjectInDegrees(this.id, this.proPage, this.pageSize)
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
      if (columnIndex !== 0 && row[column.property] > 1) {
        return 'highLight'
      } else {
        return ''
      }
    },
    // 获取项目投入度数据第一页数据
    getProjectInDegrees (workTypeId, page, pageSize, date) {
      this.loading1 = true
      getQuailtyInput({workTypeId, date, page, pageSize, memberClassId: this.memberId, type: this.urlPower})
        .then(res => {
          if (res.code !== -404) {
            this.loading1 = false
            // console.log(res)
            this.proInputData = res.data
            this.proTotal = res.data.total
            this.$nextTick(() => {
            // DOM 现在更新了
              setTagTitle('.middleCom')
            })
          }
        })
    },
    // 获取历史投入度 第二页数据
    gethistoryInputTableData (proId, memId, date) {
      this.loading2 = true
      gethistoryInput({projectId: proId, memberId: memId, date: date, memberClassId: this.memberId, workTypeId: this.id, type: this.urlPower})
        .then(res => {
          if (res.code !== -400) {
            this.loading2 = false
            this.historyTableData = res.data
            this.$nextTick(() => {
              // DOM 现在更新了
              setTagTitle('.middleCom')
            })
          }
        })
    },
    // 获取第三页数据
    getHistoryCostTableData () {
      this.loading3 = true
      getHistoryCost({memberClassId: this.memberId, workTypeId: this.id, type: this.urlPower, projectId: this.HPro2})
        .then(res => {
          // console.log(res)
          if (res.code !== -404) {
            this.loading3 = false
            this.historyCostData = res.data
            this.$nextTick(() => {
              // DOM 现在更新了
              setTagTitle('.middleCom')
            })
          }
        })
    },
    // 切换分页方法
    handleCurrentChange (val) {
      // console.log(val)
      // console.log(this.activeName)
      if (this.activeName === 'first') {
        this.getProjectInDegrees(this.id, val, this.pageSize)
      } else if (this.activeName === 'second') {
        console.log('第二页')
      } else {
        // console.log('第二页')
      }
    },
    // 获取成员
    getUserInfo (name) {
      getUserList({name})
        .then(res => {
          // console.log(res)
          this.allMember = res.data
          this.allHistoryMember = res.data
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
        var {month, id: userId, currentProject: projectId, [this.inputName]: involvement} = row

        editMember({
          month,
          userId,
          projectId,
          involvement,
          workTypeId: this.id,
          memberClassId: this.memberId,
          type: this.urlPower})
          .then(res => {
            if (res.code === CODE_SUCCESS) {
              // this.getProjectInDegrees(this.id, this.proPage, this.pageSize)
              // console.log(res)
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
        workTypeId: row.professionId,
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
    selectEvent () {
      this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
    },
    // 第二页选择产品
    selectPro (val) {
      getProjectUsers({projectId: this.HPro, date: this.monthVal})
        .then(res => {
          this.allHistoryMember = res.data
          this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
        })
    },
    // 第3页选择产品
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
      this.getHistoryCostTableData()
    },
    getNowMonth () {
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth() + 1
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
    // 删除置灰
    delGray ({row}) {
      // console.log(row)
      if (row.is_delete === 1) {
        return 'isGray'
      }
    },
    // 点击标签页切换
    handleClick (tab) {
      if (tab.index === '1') {
        this.gethistoryInputTableData(this.HPro, this.historyMember, this.monthVal)
      } else if (tab.index === '2') {
        this.getHistoryCostTableData()
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
      this.pageSize = val
      this.proPage = 1
      // this.getProjectInDegrees(this.proPage, this.pageSize, this.project)
      this.getProjectInDegrees(this.id, this.proPage, this.pageSize)
    }
  },
  mounted () {}
}
