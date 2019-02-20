import { getProjectList, getIpBudgetSumList, getIpBudgetbaseInfoList, addIpBudget, editIpBudget, getIpBudgetMonth, delIpBudget } from '@/api/api'
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
      id: 4,
      rex: /(^[1-9](\d+)?(\.\d{1,2})?$)|(^0$)|(^\d\.\d{1,2}$)/,
      // 显示新增弹框
      dialogVisible: false,
      // 项目
      project: '',
      project1: '',
      allProject1: [
        // {
        //   project_id: '1',
        //   project_name: '盗墓笔记'
        // },
        // {
        //   project_id: '2',
        //   project_name: '天使国内'
        // }
      ],
      ruleForm: {
        content: '',
        cost_type: '',
        projectid: ''
      },
      timeRange: [],
      // 添加表单校验规则
      rules: {
        cost_type: [{ required: false, message: '输入成本类型', trigger: 'blur' }],
        content: [{ required: true, message: '输入IP内容', trigger: 'blur' }],
        projectid: [{ required: true, message: '请选择项目', trigger: 'blur' }]
      },
      // 添加框所有项目
      allProject2: [
        // {
        //   value: '1',
        //   label: '盗墓笔记项目'
        // },
        // {
        //   value: '2',
        //   label: '天使国内'
        // }
      ],
      // 显示编辑弹框
      dialogVisible2: false,
      ruleForm2: {
        // id: '',
        // content: '',
        // cost_type: '',
        // project: '',
        // costValue: '' // 成本值
      },
      // 编辑表单校验规则
      rules2: {
        // costType: [{ required: false, message: '输入成本类型', trigger: 'blur' }],
        // ipContent: [{ required: true, message: '输入IP内容', trigger: 'blur' }],
        // project: [{ required: true, message: '请选择项目', trigger: 'blur' }],
        // '2018/06': [
        //   // { required: true, message: '请输入成本值', trigger: 'blur' }
        //   { validator: this.checkInput, trigger: 'blur' }
        //   // { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '目前只支持2为小数' }
        // ]
      },

      // IP成本tableData
      proInputData: [
        // {
        //   id: '1',
        //   ipContent: '小艾',
        //   costType: 'ip',
        //   project: '盗墓笔记项目',
        //   projectId: '1',
        //   month: '2018-05',
        //   costValue: '1000'
        // },
        // {
        //   id: '2',
        //   ipContent: '小艾2',
        //   costType: 'ip',
        //   project: '盗墓笔记项目',
        //   projectId: '1',
        //   month: '2018-03',
        //   costValue: '1000'
        // },
        // {
        //   id: '3',
        //   ipContent: '小艾3',
        //   costType: 'ip',
        //   project: '盗墓笔记项目',
        //   projectId: '1',
        //   month: '2018-02',
        //   costValue: '1000'
        // },
        // {
        //   id: '4',
        //   ipContent: '小艾4',
        //   costType: 'ip',
        //   project: '盗墓笔记项目',
        //   projectId: '1',
        //   month: '2018-01',
        //   costValue: '1000'
        // },
        // {
        //   id: '5',
        //   ipContent: 'ip合成成本',
        //   costValue: '5000'
        // }
      ],

      /* 历史IP预算合计列表 */
      historyCostData: {
        column: [
          //     {key: 'IPcontent', title: 'IP内容'},
          //     {key: 'type', title: '成本类型'},
          //     {key: 'project', title: '所属项目'},
          //     {key: '2019-01', title: '2019-01'},
          //     {key: '2019-02', title: '2019-02'},
          //     {key: '2019-03', title: '2019-03'},
          //     {key: '2019-04', title: '2019-04'},
          //     {key: '2019-05', title: '2019-05'},
          //     {key: '2019-06', title: '2019-06'},
          //     {key: 'sum', title: '合计'}
        ],
        record: [
          //     {
          //       IPcontent: '大i',
          //       'type': 'ip',
          //       'project': '山海净化4',
          //       '2019-01': '2000',
          //       '2019-02': '3000',
          //       '2019-03': '5000',
          //       '2019-04': '6000',
          //       '2019-05': '7000',
          //       '2019-06': '8000',
          //       'sum': '16000'
          //     },
          //     {
          //       IPcontent: '大i2',
          //       'type': 'ip',
          //       'project': '山海净化1',
          //       '2019-01': '2000',
          //       '2019-02': '3000',
          //       '2019-03': '5000',
          //       '2019-04': '6000',
          //       '2019-05': '7000',
          //       '2019-06': '8000',
          //       'sum': '16000'
          //     },
          //     {
          //       IPcontent: '大i3',
          //       'type': 'ip',
          //       'project': '山海净化2',
          //       '2019-01': '2000',
          //       '2019-02': '3000',
          //       '2019-03': '5000',
          //       '2019-04': '6000',
          //       '2019-05': '7000',
          //       '2019-06': '8000',
          //       'sum': '16000'
          //     },
          //     {
          //       IPcontent: 'ip合计成本',
          //       'type': '',
          //       'project': '',
          //       '2019-01': '2000',
          //       '2019-02': '3000',
          //       '2019-03': '5000',
          //       '2019-04': '6000',
          //       '2019-05': '7000',
          //       '2019-06': '8000',
          //       'sum': '16000'
          //     }
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

      isMask: false,
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() > Date.now() - 8.64e7
        }
      },
      loading1: true,
      loading2: true
    }
  },
  created () {
    getProjectList()
      .then(res => {
        if (res.code !== -400) {
          this.allProject1 = res.data
          this.allProject2 = res.data
          if (this.allProject1) {
            this.project1 = this.allProject1[0].project_id
            this.project = this.allProject1[0].project_id
            this.getIpCostListTableData(this.hisPage, this.pageSize, this.project)
            this.$store.commit('getProjectsUpdata', this.project1)
            // this.getMonthRange(this.project)
          }
        }
      })
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
      this.getMonthRange(this.project)
      this.ruleForm.projectid = this.project
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // console.log(this[formName])
          let rule = true
          this.timeRange.forEach(item => {
            // console.log(this[formName][item.title])
            let flag = this.rex.test(this[formName][item.title])
            if (!flag && this[formName][item.title]) {
              this.$message.error(item.title + ': 错了哦，仅支持保留两位小数')
              rule = false
            }
          })
          if (rule) {
            this.dialogVisible = false
            this.dialogVisible2 = false
            if (formName === 'ruleForm') {
              this.addIpCostListTableData(this[formName])
            } else {
              this.editIpCostListTableData(this[formName])
            }
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 编辑按钮
    editData (row) {
      this.dialogVisible2 = true
      // console.log(row)
      // this.ruleForm2.id = row.id
      // this.ruleForm2.ipContent = row.ipContent
      // this.ruleForm2.costType = row.costType
      // this.ruleForm2.costValue = row.costValue
      // this.ruleForm2.project = row.projectId
      for (let k in row) {
        this.ruleForm2[k] = row[k]
      }
      this.getMonthRange(row.projectid)
    },
    // 删除项目投入度
    delData (row) {
      // console.log('删除' + row.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delIpBudget({id: row.id})
          .then(res => {
            if (res.code !== -404) {
              this.proPage = this.proTotal <= 10 ? 1 : this.proPage
              this.getIpCostListTableData(this.proPage, this.pageSize, this.project)
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
    // 切换分页方法
    handleCurrentChange (val) {
      // console.log(val)
      // console.log(this.activeName)
      if (this.activeName === 'first') {
        this.getIpCostListTableData(this.proPage, this.pageSize, this.project)
      } else if (this.activeName === 'second') {
        this.gethisTableData(val, this.pageSize, this.project1)
      } else {
        // console.log('第二页')
      }
    },
    // 获取第二页表数据
    gethisTableData (page, pagesize, projectid) {
      this.loading2 = true
      getIpBudgetSumList({page, pagesize, projectid})
        .then(res => {
          // console.log(res)
          if (res.code === CODE_SUCCESS) {
            this.loading2 = false
            this.historyCostData = res.data
            this.hisTotal = res.data.total
            this.$nextTick(() => {
              // DOM 现在更新了
              setTagTitle('.ipBudget')
            })
          }
        })
    },
    // 获取第一页表数据
    getIpCostListTableData (page, pagesize, projectid) {
      this.loading1 = true
      getIpBudgetbaseInfoList({projectid, page, pagesize})
        .then(res => {
          // console.log(res)
          if (res.code === CODE_SUCCESS) {
            this.loading1 = false
            this.proInputData = res.data
            this.proTotal = res.data.total
            this.$nextTick(() => {
              // DOM 现在更新了
              setTagTitle('.ipBudget')
            })
          }
        })
    },
    // 增加数据
    addIpCostListTableData (data) {
      // console.log({...data})
      addIpBudget(data)
        .then(res => {
          this.proPage = 1
          if (res.code === CODE_SUCCESS) {
            this.getIpCostListTableData(this.proPage, this.pageSize, this.project)
          }
        })
    },
    // 编辑数据
    editIpCostListTableData (data) {
      // console.log(data)
      editIpBudget(data)
        .then(res => {
          // console.log(res)
          if (res.code === CODE_SUCCESS) {
            this.getIpCostListTableData(this.proPage, this.pageSize, this.project)
          }
        })
    },
    proChange (val) {
      // console.log(val)
      if (this.activeName === 'first') {
        this.proPage = 1
        this.getIpCostListTableData(this.proPage, this.pageSize, val)
        this.getMonthRange(val)
        this.$store.commit('getProjectsUpdata', val)
      } else {
        this.hisPage = 1
        this.gethisTableData(this.hisPage, this.pageSize, val)
        this.$store.commit('getProjectsUpdata', val)
      }
    },
    getMonthRange (projectid) {
      getIpBudgetMonth({projectid})
        .then(res => {
          // console.log(res)
          this.timeRange = res.data
          let ruleForm = {}
          this.timeRange.forEach(item => {
            ruleForm[item.key] = ''
          })
          ruleForm.cost_type = this.ruleForm.cost_type
          ruleForm.content = this.ruleForm.content
          ruleForm.projectid = this.ruleForm.projectid
          this.ruleForm = ruleForm
          // this.ruleForm2 = ruleForm
        })
    },
    getMR (val) {
      // console.log(val)
      this.getMonthRange(val)
    },
    handleClick (tab, event) {
      if (tab.index === '1') {
        this.hisPage = 1
        this.pageSize = 10
        this.gethisTableData(this.hisPage, this.pageSize, this.project1)
      } else if (tab.index === '0') {
        this.hisPage = 1
        this.pageSize = 10
        this.getIpCostListTableData(this.proPage, this.pageSize, this.project)
      }
    },
    // 第三页cell样式
    cellStyle2 ({row, column, rowIndex, columnIndex}) {
      // console.log(column.colSpan)
      if (column.property !== 'content' && column.property !== 'cost_type' && column.property !== 'project') {
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
        this.proPage = 1
        this.getIpCostListTableData(this.proPage, this.pageSize, this.project)
      } else {
        this.hisPage = 1
        this.gethisTableData(this.hisPage, this.pageSize, this.project1)
      }
    }
  }
}
