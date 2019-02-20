import { getProjectList, getIpCost, getIpCostList, addIpCostList, editIpCostList, delIpCostList } from '@/api/api'
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
      // 项目投入度：项目
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
        ipContent: '',
        costType: '',
        month: '',
        project: '',
        costValue: '' // 成本值
      },
      // 添加表单校验规则
      rules: {
        month: [{ required: true, message: '请选择月份', trigger: 'blur' }],
        costType: [{ required: false, message: '输入成本类型', trigger: 'blur' }],
        ipContent: [{ required: true, message: '输入IP内容', trigger: 'blur' }],
        project: [{ required: true, message: '请选择项目', trigger: 'blur' }],
        costValue: [
          { required: true, message: '请输入成本值', trigger: 'blur' },
          { validator: this.checkInput, trigger: 'blur' },
          { max: 15, message: '长度不能超过15位', trigger: 'blur' }
          // { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '目前只支持2为小数' }
        ]
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
        id: '',
        ipContent: '',
        costType: '',
        month: '',
        project: '',
        costValue: '' // 成本值
      },
      // 编辑表单校验规则
      rules2: {
        // month: [{ required: true, message: '请选择月份', trigger: 'blur' }],
        // costType: [{ required: false, message: '输入成本类型', trigger: 'blur' }],
        // ipContent: [{ required: true, message: '输入IP内容', trigger: 'blur' }],
        // project: [{ required: true, message: '请选择项目', trigger: 'blur' }],
        costValue: [
          { required: true, message: '请输入成本值', trigger: 'blur' },
          { validator: this.checkInput, trigger: 'blur' },
          { max: 15, message: '长度不能超过15位', trigger: 'blur' }
          // { pattern: /^[0-9]+(.[0-9]{0,2})?$/, message: '目前只支持2为小数' }
        ]
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

      /* 历史IP成本值 */
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
      isLoading: false,
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
            this.getIpCostListTableData(this.proPage, this.pageSize, this.project)
            this.$store.commit('getProjectsUpdata', this.project1)
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
      this.dialogVisible = true
    },
    // 投入度校验规则
    checkInput (rule, value, callback) {
      if (value) {
        let flag = this.rex.test(value)
        if (!flag) {
          callback(new Error('仅支持保留2位小数'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },
    // 提交表单
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading = true
          if (formName === 'ruleForm') {
            this.addIpCostListTableData(this[formName].ipContent, this[formName].costType, this[formName].project, this[formName].month + '/01', this[formName].costValue)
          } else {
            this.editIpCostListTableData(this[formName].id, this[formName].ipContent, this[formName].costType, this[formName].projectId, this[formName].month + '/01', this[formName].costValue)
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
      this.ruleForm2.id = row.id
      this.ruleForm2.ipContent = row.ipContent
      this.ruleForm2.costType = row.costType
      this.ruleForm2.month = row.month
      this.ruleForm2.costValue = row.costValue
      this.ruleForm2.project = row.project
      this.ruleForm2.projectId = row.projectId
    },
    // 删除项目投入度
    delData (row) {
      // console.log('删除' + row.id)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delIpCostList({id: row.id})
          .then(res => {
            if (res.code === CODE_SUCCESS) {
              this.proPage = this.proTotal % this.pageSize === 1 ? this.proPage - 1 : this.proPage
              this.getIpCostListTableData(this.hisPage, this.pageSize, this.project)
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
        this.getIpCostListTableData(val, this.pageSize, this.project)
      } else if (this.activeName === 'second') {
        this.gethisTableData(val, this.pageSize, this.project1)
      } else {
        // console.log('第二页')
      }
    },
    // 获取第二页表数据
    gethisTableData (page, pagesize, projectid) {
      this.loading2 = true
      getIpCost({page, pagesize, projectid})
        .then(res => {
          // console.log(res)
          if (res.code === CODE_SUCCESS) {
            this.loading2 = false
            this.historyCostData = res.data
            this.hisTotal = res.data.total
            if (this.historyCostData.record[0]) {
              this.project1 = this.historyCostData.record[0].projectid
            }
            // this.hackReset = false
            // this.$nextTick(() => {
            //   this.hackReset = true
            // })
            // this.$forceUpdate()
            this.$nextTick(() => {
              // DOM 现在更新了
              setTagTitle('.ipCost')
            })
          }
        })
    },
    // 获取第一页表数据
    getIpCostListTableData (page, pagesize, projectId) {
      this.loading1 = true
      getIpCostList({page, pagesize, projectId})
        .then(res => {
          // console.log(res)
          if (res.code === CODE_SUCCESS) {
            this.loading1 = false
            this.proInputData = res.data
            this.proTotal = res.total
            this.$nextTick(() => {
              // DOM 现在更新了
              setTagTitle('.ipCost')
            })
          }

          // this.proInputData.push({
          //   ipContent: 'ip合成成本',
          //   costValue: res.data.reduce((count, item) => {
          //     count += item.costValue
          //     return count
          //   }, 0)
          // })
        })
    },
    // 增加数据
    addIpCostListTableData (content, type, id, time, value) {
      addIpCostList({content: content, cost_type: type, project_id: id, time: time, cost_value: value})
        .then(res => {
          // console.log(res)
          this.proPage = 1
          if (res.code === CODE_SUCCESS) {
            this.getIpCostListTableData(this.proPage, this.pageSize, this.project)
          }
          this.dialogVisible = false
          this.isLoading = false
        })
    },
    // 编辑数据
    editIpCostListTableData (id, content, type, proId, time, value) {
      editIpCostList({id: id, content: content, cost_type: type, project_id: proId, time: time, cost_value: value})
        .then(res => {
          // console.log(res)
          if (res.code === CODE_SUCCESS) {
            this.getIpCostListTableData(this.proPage, this.pageSize, this.project)
          }
          this.dialogVisible2 = false
          this.isLoading = false
        })
    },
    proChange (val) {
      if (this.activeName === 'first') {
        this.proPage = 1
        this.getIpCostListTableData(this.proPage, this.pageSize, val)
        // this.getMonthRange(val)
      } else {
        this.hisPage = 1
        this.gethisTableData(this.hisPage, this.pageSize, val)
      }
      this.$store.commit('getProjectsUpdata', val)
    },
    handleClick (tab) {
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
      if (column.property !== 'month' && column.property !== 'ipContent' && column.property !== 'costType' && column.property !== 'project' && column.property !== 'content' && column.property !== 'cost_type') {
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
