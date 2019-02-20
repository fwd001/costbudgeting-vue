<template>
  <div class="proInput">
    <!-- table2 -->
    <el-row class="table-title">
      <div class="title">
      </div>
      <div class="search1">
        <div class="select ml-20">
          <el-select
            style="width: 280px"
            multiple
            collapse-tags
            @change='select'
            filterable
            clearable
            size="mini"
            v-model="studioFlock"
            placeholder="工作室群">
            <el-option
              v-for="item in allStudioFlock"
              :key="item.id"
              :label="item.name"
              :value="item.dep_no">
            </el-option>
          </el-select>
        </div>
        <div class="select ml-20">
          <el-select
            style="width: 280px"
            multiple
            collapse-tags
            @change='select2'
            filterable
            clearable
            size="mini"
            v-model="studio"
            placeholder="工作室">
            <el-option
              v-for="item in allStudio"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="select ml-20">
          <el-select
            size="mini"
            multiple
            collapse-tags
            v-model="project"
            filterable
            placeholder="请选择项目"
            v-on:change="select3"
            style="width: 200px">
            <el-option
              v-for="item in allProject"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="select ml-20">
          <el-date-picker
            style="width: 118px;"
            size="mini"
            v-model="monthData"
            @change="selectData"
            value-format="yyyy/MM"
            type="month"
            placeholder="选择月">
          </el-date-picker>
        </div>
        <!-- 类型 -->
        <div class="select ml-20">
          <el-select
            style="width: 200px"
            multiple
            collapse-tags
            @change='select4'
            clearable
            size="mini"
            v-model="typeIds"
            filterable
            placeholder="类型">
            <el-option
              v-for="item in allType"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <!-- 工种 -->
        <div class="select ml-20">
          <el-select style="width: 200px" filterable multiple collapse-tags @change='select5' clearable size="mini" v-model="professionIds" placeholder="工种">
            <el-option
              v-for="(item, index) in allProfession"
              :key="index"
              :label="item.name"
              :value="item.index">
            </el-option>
          </el-select>
        </div>
        <!-- 姓名 -->
        <div class="select ml-20">
          <el-select
            style="width: 222px;"
            v-model="infoName"
            size="mini"
            @change="getList"
            placeholder="姓名"
            multiple
            collapse-tags
            filterable
            default-first-option
            ref="members">
            <el-option
              v-for="item in allMember"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>

        <!-- 导出 -->
        <div class="select ml-20">
          <el-button type="primary" size="mini" @click="btnExport" round>导出</el-button>
        </div>
        <!-- 异常数据 -->
        <el-row  class="select ml-20" style="line-height: 28px;">
          <el-checkbox @change="changeCheckBox" v-model="abnormal">异常数据</el-checkbox>
        </el-row>
      </div>
    </el-row>
    <div class="mt20">
      <el-table
        @cell-dblclick="cellDbClick"
        v-loading="tableLoading2"
        :cell-style="cellStyle"
        header-cell-class-name="grayHeader"
        :data="tableData2"
        border
        :stripe="true"
        style="width: 100%"
        height="545">
        <el-table-column
          v-for="(item, index) in column2"
          :fixed="index === 0"
          :width="index === column2.length-1? 'auto':'200'"
          :label="item.title"
          :render-header="renderHeader"
          :prop="item.key"
          :key="item.key"
          min-width="200"
          align='right'>
          <template slot-scope="scope">
            <el-row v-if="item.key === 'check'">
              <el-row>
               <el-checkbox @change="checkboxChange(scope.row)" v-model="scope.row.check[0]">投入度有误</el-checkbox>
              </el-row>
              <el-row>
                <el-checkbox @change="checkboxChange(scope.row)" v-model="scope.row.check[1]">信息有误</el-checkbox>
              </el-row>
            </el-row>
            <el-row v-else-if="item.key === 'remark'">
              <el-row v-show="scope.row.edit">
               <el-input @blur="inputChange(scope.row)" v-model="scope.row.remark" placeholder="备注"></el-input>
              </el-row>
              <el-row class="ellipsis" v-show="!scope.row.edit">
                {{scope.row[item.key]}}
              </el-row>
            </el-row>
            <el-row v-else>
              {{scope.row[item.key] | getThousandNum(1)}}
            </el-row>
          </template>
        </el-table-column>
        <el-table-column
          v-if="abnormal"
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="edit(scope.row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="mt20">
      <div class="block" style="text-align: center;">
        <el-pagination :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next" :page-size="pagesize"
          :current-page.sync="currentPage2" :total="total2" @current-change="paginationTable2" @size-change="handleSizeChange">
        </el-pagination>
      </div>
    </div>
    <!-- 编辑人员信息 -->
    <el-dialog title="编辑人员信息"
      :visible.sync="dialogVisible2"
      width="600px">
      <el-form
        v-loading="isLoading2"
        size="small"
        :model="ruleForm2"
        :rules="rules2"
        ref="ruleForm2"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="姓名" prop="name">
          {{ruleForm2.name}}
        </el-form-item>
        <el-form-item label="一级部门" prop="studioFlockId">
          <!-- <el-select
            v-model="ruleForm2.studioFlockId"
            filterable
            placeholder="请输入一级部门"
            clearable
            @change="select7">
            <el-option
              v-for="item in allStudioFlock2"
              :key="item.id"
              :label="item.name"
              :value="item.dep_no">
            </el-option>
          </el-select> -->
          {{ruleForm2.studioFlock}}
        </el-form-item>
        <el-form-item
          label="二级部门"
          prop="studioId">
          <!-- <el-select
            v-model="ruleForm2.studioId"
            placeholder="二级部门"
            filterable
            clearable>
            <el-option
              v-for="item in allStudio2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
          {{ruleForm2.studio}}
        </el-form-item>
        <!-- 项目 -->
        <el-form-item
          label="项目"
          prop="typeId"
          @change="select7">
          <!-- <el-select
            v-model="ruleForm2.projectId"
            placeholder="请选择项目"
            clearable>
            <el-option
              v-for="item in allProject2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
          {{ruleForm2.project}}
        </el-form-item>
        <el-form-item
          label="类型"
          prop="typeId"
          @change="select7">
          <!-- <el-select
            v-model="ruleForm2.typeId"
            placeholder="请选择类型"
            clearable
            @change="select8">
            <el-option
              v-for="item in allType2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
          {{ruleForm2.type}}
        </el-form-item>
        <el-form-item
          label="工种"
          prop="professionId">
          <!-- <el-select
            v-model="ruleForm2.professionId"
            placeholder="请选择工种"
            clearable>
            <el-option
              v-for="item in allProfession2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select> -->
          {{ruleForm2.profession}}
        </el-form-item>
        <el-form-item
          v-for="item in inputList"
          :key="item.key"
          :label="item.title"
          :prop="item.key">
          <el-input
            v-model="ruleForm2[item.key]">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">立即提交</el-button>
          <el-button @click="dialogVisible2 = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import {
  getTableList2,
  getProInputGroup,
  getTypeList,
  // getWorkTypeList,
  getTableList2IndexUsers,
  edigTableList2Data,
  getProInputStudio,
  getTypeList2
} from '@/api/api2'
import { setTagTitle } from '@/assets/utils/index'
export default {
  props: {
    projectOpt: Array
  },
  data () {
    return {
      pagesize: 10,
      // 项目投入度表
      // 工作室群
      allStudioFlock: [],
      oldGroupOptions: [[]],
      studioFlock: [],
      // 工作室
      allStudio: [],
      oldStudioOptions: [[]],
      studio: [],

      // 项目
      allProject: [],
      oldProjectOptions: [[]],
      project: [],
      // 信息变更
      allType: [
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
      infoName: [],
      // 月份
      monthData: '',
      tableLoading2: false,
      currentPage2: 1,
      total2: 0,
      tableData2: [],
      column2: [],
      // 异常数据
      abnormal: false,
      // 编辑框数据
      allStudioFlock2: [],
      allStudio2: [],
      allProject2: [],
      allType2: [],
      allProfession2: [],
      inputList: [],
      dialogVisible2: false,
      isLoading2: false,
      ruleFormMode: {
        id: '',
        name: '',
        studioFlock: '',
        studioFlockId: '',
        studio: '',
        studioId: '',
        projectId: '',
        project: '',
        typeId: '',
        type: '',
        professionId: '',
        profession: '',
        inputError: '',
        infoError: '',
        remark: ''
      },
      ruleForm2: {},

      rules2: {
        // studioFlockId: [{ required: true, message: '请选择一级部门', trigger: 'blur' }],
        // studioId: [{ required: true, message: '请选择二级部门', trigger: 'blur' }],
        // projectId: [{ required: true, message: '请选择项目', trigger: 'blur' }],
        // typeId: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        // professionId: [{ required: true, message: '请填写工种', trigger: 'blur' }]
      }
      // professionObj: []
    }
  },
  watch: {
    projectOpt: {
      handler (val) {
        this.allProject = val.map(v => v)
        this.allProject2 = val.map(v => v)
        this.allProject.unshift({
          id: 'all',
          name: '全部项目'
        })
      },
      immediate: true
    },
    dialogVisible2 (val) {
      if (!val) {
        this.$refs.ruleForm2.resetFields()
      }
    }
  },
  computed: {
    professionObj () {
      // console.log(this.professionIds)
      if (this.professionIds.length !== 0) {
        return this.professionIds.map(v => {
          if (v !== 'all') {
            return this.allProfession[v + 1]
          }
        })
      } else {
        return []
      }
    }
  },
  created () {
    // 初始化月份
    this.initMonth()
    // 获取人员投入度数据
    this.getTypeList()
    this.getWorkTypeList(null, this.monthData, 0)
    this.getStudioAll(() => {
      this.getList()
    })
    this.getIndexUsers()
  },
  methods: {
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoading2 = true
          let data = {
            id: this.ruleForm2.id,
            remark: this.ruleForm2.remark,
            inputError: this.ruleForm2.inputError,
            infoError: this.ruleForm2.infoError,
            workType: this.ruleForm2.professionId,
            involvement: this.ruleForm2[this.inputList[0].key]
          }
          this.editRowData(data, () => {
            this.getList()
            this.isLoading2 = false
            this.dialogVisible2 = false
          })
          // 提交表单
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    paginationTable2 (val) {
      this.getList()
    },
    getList () {
      // console.log(this.professionObj)
      this.tableLoading2 = true
      let data = {
        groupNo: this.studioFlock,
        departmentId: this.studio,
        projectId: this.project,
        workClass: this.typeIds,
        workType: this.professionObj,
        usersId: this.infoName,
        pageSize: this.pagesize,
        page: this.currentPage2,
        abnormal: this.abnormal,
        month: this.monthData
      }
      getTableList2(data).then(res => {
        this.tableLoading2 = false
        if (res.code !== -404) {
          this.column2 = res.data.column
          this.tableData2 = res.data.record
          this.total2 = res.data.total
          this.$nextTick(() => {
            setTagTitle('.main-home')
            this.setTagTitle2()
          })
        }
      })
    },
    // 项目投入度表
    // 获取工作室工作室群
    changeCheckBox () {
      this.currentPage2 = 1
      this.getList()
    },
    async getStudioAll (callback) {
      const res = await Promise.all([getProInputGroup(), getProInputStudio([])])
      let success = res.every(item => item.code !== -404)
      if (success) {
        this.allStudioFlock = res[0].data.map(item => item)
        this.allStudioFlock2 = res[0].data.map(item => item)
        this.allStudio = res[1].data.map(item => item)
        this.allStudio2 = res[1].data.map(item => item)
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
        // this.getProData()
        callback && callback()
      }
    },
    // 获取类型list
    async getTypeList () {
      const res = await getTypeList()
      if (res.code !== -404) {
        this.allType = res.data.map(item => item)
        this.allType2 = res.data.map(item => item)
        // console.log(res)
        this.allType.unshift({id: 'all', name: '全部类型'})
      }
    },
    // 获取工种list
    async getWorkTypeList (classId, month, flag) {
      const res = await getTypeList2({classId, month})
      if (res.code !== -404 && res.data) {
        if (flag === 0) {
          this.oldProfessionOption = [[]]
          this.allProfession2 = res.data.map(item => item)
          this.allProfession = res.data.map((item, index) => {
            return {...item, index}
          })
          this.allProfession.unshift({index: 'all', name: '全部工种'})
        } else if (flag === 1) {
          this.oldProfessionOption = [[]]
          this.allProfession = res.data.map((item, index) => {
            return {...item, index}
          })
          this.allProfession.unshift({index: 'all', name: '全部工种'})
        } else {
          this.allProfession2 = res.data.map(item => item)
        }
        this.professionIds = []
      }
    },
    // 获取工作室list
    async getStudioList (id, flag) {
      this.studio = []
      // 联动工作室
      const res = await getProInputStudio({dep_nos: id})
      if (res.code !== -404) {
        if (flag) {
          this.allStudio = res.data.map(v => v)
          this.allStudio.unshift({
            dep_no: 'all',
            id: 'all',
            level: 2,
            name: '全部工作室'
          })
        } else {
          this.allStudio2 = res.data.map(v => v)
        }
      }
    },
    // 获取人员列表
    async getIndexUsers () {
      this.infoName = []
      let data = {
        groupNo: this.studioFlock,
        departmentId: this.studio,
        projectId: this.project,
        workClass: this.typeIds,
        workType: this.professionIds
      }
      const res = await getTableList2IndexUsers(data)
      if (res.code !== -404) {
        // console.log(res)
        this.allMember = res.data
      }
    },
    seleceAll (all, name, oldGroup, val) {
      const allGroupValues = []
      // 保留所有值
      for (const item of this[all]) {
        if (name === 'studioFlock') {
          allGroupValues.push(item.dep_no)
        } else if (name === 'professionIds') {
          allGroupValues.push(item.index)
        } else {
          allGroupValues.push(item.id)
        }
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal =
        this[oldGroup].length === 1 ? this[oldGroup][0] : []

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
      this[oldGroup][0] = this[name]
    },
    select (val) {
      this.seleceAll('allStudioFlock', 'studioFlock', 'oldGroupOptions', val)
      // console.log(val)
      this.getStudioList(this.studioFlock.filter(v => v !== 'all'), true)
      this.getIndexUsers()
      this.getList()
    },
    select2 (val) {
      this.seleceAll('allStudio', 'studio', 'oldStudioOptions', val)
      this.getIndexUsers()
      this.getList()
    },
    // 选择项目
    select3 (val) {
      this.seleceAll('allProject', 'project', 'oldProjectOptions', val)
      this.$store.commit('getProjectsUpdata', this.project)
      this.getIndexUsers()
      this.getList()
      // this.$store.commit('getProjectsUpdata', val)
    },
    selectData () {
      this.getWorkTypeList(this.typeIds.filter(v => v !== 'all'), this.monthData, 1)
      this.getList()
    },
    select4 (val) {
      this.seleceAll('allType', 'typeIds', 'oldTypeOption', val)
      this.getWorkTypeList(this.typeIds.filter(v => v !== 'all'), this.monthData, 1)
      this.getIndexUsers()
      this.getList()
    },
    select5 (val) {
      this.seleceAll('allProfession', 'professionIds', 'oldProfessionOption', val)
      this.getIndexUsers()
      this.getList()
    },
    async btnExport () {
      // let data = {
      //   groupNo: this.studioFlock,
      //   departmentId: this.studio,
      //   projectId: this.project,
      //   workClass: this.typeIds,
      //   workType: this.professionIds,
      //   usersId: this.infoName,
      //   abnormal: this.abnormal,
      //   month: this.monthData
      // }
      let groupNo = ''
      this.studioFlock.forEach(i => {
        if (i !== 'all') {
          groupNo += '&groupNo[]=' + i
        }
      })

      let departmentId = ''
      this.studio.forEach(i => {
        if (i !== 'all') {
          departmentId += '&departmentId[]=' + i
        }
      })
      let projectId = ''
      this.project.forEach(i => {
        if (i !== 'all') {
          projectId += '&projectId[]=' + i
        }
      })

      let workClass = ''
      this.typeIds.forEach(i => {
        if (i !== 'all') {
          workClass += '&workClass[]=' + i
        }
      })
      let workType = ''
      this.professionIds.forEach(i => {
        if (i !== 'all') {
          workType += '&workType[]=' + i
        }
      })
      let usersId = ''
      this.infoName.forEach(i => {
        if (i !== 'all') {
          usersId += '&usersId[]=' + i
        }
      })
      let abnormal = '&abnormal=' + this.abnormal
      let month = '&month=' + this.monthData

      let ie = 'isExcel=1'

      let url = '/api/index/export?' + ie + groupNo + departmentId + projectId + workClass + workType + usersId + abnormal + month
      // console.log(url)
      window.location.href = url
    },
    // 编辑框选择联动
    select6 (val) {

    },
    select7 (val) {
      this.ruleForm2.studioId = ''
      this.getStudioList([val], false)
    },
    select8 (val) {
      this.ruleForm2.professionId = ''
      this.getWorkTypeList([val], 2)
    },
    cellDbClick (row, column, cell, event) {
      // console.log(column)
      if (column.property === 'remark') {
        row.edit = true
        // console.log(cell)
        this.$nextTick(() => {
          cell.querySelector('input').focus()
        })
      }
    },
    // 输入框消失事件
    inputChange (row) {
      row.edit = false
      // 发送修改请求
      let data = {
        id: row.id,
        remark: row.remark,
        inputError: row.check[0] ? 1 : 0,
        infoError: row.check[1] ? 1 : 0,
        workType: row.workTypeId,
        involvement: row[row.date[0].key]
      }
      this.editRowData(data)
      // this.getList()
    },
    // 点击checkbox
    checkboxChange (row) {
      // 发送修改请求
      let data = {
        id: row.id,
        remark: row.remark,
        inputError: row.check[0] ? 1 : 0,
        infoError: row.check[1] ? 1 : 0,
        workType: row.workTypeId,
        involvement: row[row.date[0].key]
      }
      this.editRowData(data)
      // this.getList()
    },
    edit (row) {
      // console.log(row)
      this.ruleForm2 = {...this.ruleFormMode}
      row.date.forEach(v => {
        this.$set(this.ruleForm2, v.key, '')
        this.$set(this.rules2, v.key, [{ required: true, message: '请填写投入度', trigger: 'blur' }])
      })
      this.inputList = row.date
      this.ruleForm2.id = row.id
      this.ruleForm2.name = row.name
      this.ruleForm2.studioFlockId = row.department1Id
      this.ruleForm2.studioFlock = row.department1
      this.ruleForm2.studioId = row.department2Id
      this.ruleForm2.studio = row.department2
      this.ruleForm2.projectId = row.projectId
      this.ruleForm2.project = row.project
      this.ruleForm2.typeId = row.typeId
      this.ruleForm2.type = row.type
      this.ruleForm2.professionId = row.workTypeId
      this.ruleForm2.profession = row.workType
      this.ruleForm2.inputError = row.check[0] ? 1 : 0
      this.ruleForm2.infoError = row.check[1] ? 1 : 0
      this.ruleForm2.remark = row.remark
      this.inputList.forEach(i => {
        this.ruleForm2[i.key] = row[i.key]
      })
      this.dialogVisible2 = true
      // console.log(this.ruleForm2)
    },
    // 修改单行数据
    // { id, involvement, workType, remark, workType }
    async editRowData (data, callback) {
      const res = await edigTableList2Data(data)
      if (res.code !== -404) {
        // console.log(res)
        callback && callback()
      } else {
        this.getList()
      }
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
      if (column.property !== 'department1' && column.property !== 'department2' && column.property !== 'project' && column.property !== 'type' && column.property !== 'name' && column.label !== '操作' && column.property !== 'workType' && column.property !== 'check' && column.property !== 'remark') {
        return {textAlign: 'right'}
      } else {
        return {textAlign: 'left'}
      }
    },
    // 设置过滤框标签title
    setTagTitle2 () {
      if (document.querySelector('.proInput')) {
        var tagTextList = document.querySelector('.proInput').querySelectorAll('.el-select__tags-text')
        tagTextList.forEach((item) => {
          item.setAttribute('title', item.innerText)
        })
      }
    },
    renderHeader (h, { column, $index }) {
      // console.log(column)
      if (column.property === 'remark') {
        return h('div', {
          class: 'el-icon-edit',
          style: {fontWeight: 900}
        }, column.label)
      } else {
        return column.label
      }
    },
    initMonth () {
      let date = new Date()
      let month = ''
      month = date.getFullYear() + '/' + date.getMonth()
      this.monthData = month
    }
  }
}
</script>

<style lang="less">
.proInput {
  // .el-tag:first-child .el-select__tags-text {
  //   display: inline-block;
  //   width: 62px;
  //   overflow: hidden;
  //   text-overflow: ellipsis;
  //   white-space: nowrap;
  //   vertical-align: middle;
  // }
  .el-table th div {
    line-height: 1;
  }
}
</style>
