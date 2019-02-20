<template>
  <el-row>
    <el-row class="table-title">
      <div class="title">
        <div style="width: 109px">项目属性变更</div>
      </div>
      <div class="select ml-20">
        <el-select style="width: 280px"
          multiple
          collapse-tags
          @change='select1'
          clearable
          size="mini"
          v-model="filter.studioFlock"
          placeholder="工作室群">
          <el-option
            v-for="item in allStudioFlock1"
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
          clearable
          size="mini"
          v-model="filter.studio"
          placeholder="工作室">
          <el-option
            v-for="item in allStudio1"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </el-row>
    <el-row class="mt20">
      <el-col :span="24">
        <el-table
          v-loading="listLoading"
          :data="list"
          border
          height="529"
          style="width: 100%">
          <el-table-column
            prop="proNum"
            label="项目代号"
            width="120">
          </el-table-column>
          <el-table-column
            prop="proName"
            label="项目名称"
            width="">
          </el-table-column>
          <el-table-column
            prop="studioFlock"
            label="工作室群"
            width="180">
          </el-table-column>
          <el-table-column
            prop="studio"
            label="工作室"
            width="180">
          </el-table-column>
          <el-table-column
            v-for="item in column"
            :key="item.key"
            :prop="item.key"
            :label="item.title"
            width="180">
          </el-table-column>
          <el-table-column
            label="项目属性变更"
            width="120">
            <template slot-scope="{row, column, $index}">
              <el-button @click="aditInfo(row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          :total="total"
          :current-page.sync="page"
          style="text-align: center;"
          class="mt20"
          @current-change="handleCurrentChange">
        </el-pagination>
      </el-col>
    </el-row>
    <!-- 项目属性变更 -->
    <el-dialog title="项目属性变更"
      :visible.sync="dialogVisible"
      width="600px">
      <el-form
        v-loading="isLoading"
        size="small"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm">
        <el-form-item label="项目代号" prop="proNum">
          <!-- <el-input v-model="ruleForm.proNum"></el-input> -->
          {{ruleForm.proNum}}
        </el-form-item>
        <el-form-item label="项目名称" prop="proName">
          <el-input v-model="ruleForm.proName"></el-input>
        </el-form-item>
        <el-form-item
          label="工作室群"
          prop="studioFlockId">
          <el-select
            v-model="ruleForm.studioFlockId"
            filterable
            placeholder="请输入工作室群"
            clearable
            @change="select3">
            <el-option
              v-for="item in allStudioFlock2"
              :key="item.id"
              :label="item.name"
              :value="item.dep_no">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="工作室"
          prop="studioId">
          <el-select
            v-model="ruleForm.studioId"
            placeholder="请选择工作室"
            filterable
            clearable>
            <el-option
              v-for="item in allStudio2"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          v-for="item in column"
          :label="item.title"
          :prop="item.key+'Id'"
          :key="item.key">
          <el-select
            v-model="ruleForm[item.key+'Id']"
            placeholder="请选择人员"
            filterable
            default-first-option
            clearable>
            <el-option
              v-for="item in allMember"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
import {
  getStudioList,
  getProjectsPropUser,
  getProjectsPropList,
  editProjectsProp
} from '@/api/api2'
export default {
  name: 'ProjectProp',
  props: {
    allStudioFlock: Array,
    allStudio: Array
  },
  data () {
    return {
      filter: {
        studioFlock: [],
        studio: []
      },
      allStudioFlock1: [],
      allStudio1: [],
      allStudioFlock2: [],
      allStudio2: [],
      oldGroupOptions: [[]],
      oldStudioOptions: [[]],
      column: [
        {title: '创建人(PM1)', key: 'name1'},
        {title: 'PM2', key: 'name2'}
      ],

      list: [
        {id: 1, proNum: '...', proName: '...', studioFlock: '...', studioFlockId: 1, studio: '...', studioId: 12, name1: 'xxx', name1Id: 12, name2: '...', name2Id: 12},
        {id: 2, proNum: '...', proName: '...', studioFlock: '...', studioFlockId: 1, studio: '...', studioId: 12, name1: 'xxx', name1Id: 12, name2: '...', name2Id: 12},
        {id: 3, proNum: '...', proName: '...', studioFlock: '...', studioFlockId: 1, studio: '...', studioId: 12, name1: 'xxx', name1Id: 12, name2: '...', name2Id: 12}
      ],
      total: 0,
      page: 1,
      pageSize: 10,
      listLoading: true,
      ruleForm: {
        proNum: '',
        proName: '',
        studioFlockId: '',
        studioId: ''
      },
      rules: {
        name: [{ required: true, message: '请填写阶段', trigger: 'blur' }]
      },
      dialogVisible: false,
      isLoading: false,
      allMember: []
    }
  },

  watch: {
    allStudioFlock: {
      handler: function (val) {
        this.allStudioFlock1 = val.map(v => v)
        this.allStudioFlock2 = val.filter(v => v.id !== 'all')
      },
      immediate: true
    },
    allStudio: {
      handler: function (val) {
        this.allStudio1 = val.map(v => v)
        this.allStudio2 = val.filter(v => v.id !== 'all')
      },
      immediate: true
    }
  },
  created () {
    this.getUserInfo()
    this.getList()
  },
  methods: {
    async getList () {
      this.listLoading = true
      const data = {
        dep_nos: this.filter.studioFlock,
        studioIds: this.filter.studio,
        page: this.page,
        pageSize: this.pageSize
      }
      const res = await getProjectsPropList(data)
      if (res.code !== -404) {
        // console.log(res)
        this.list = res.data.record
        this.column = res.data.column
        this.total = res.data.total
        this.listLoading = false
      }
    },
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogVisible = false
          this.editProjectProp(this[formName])
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 选择过滤框时间
    async select1 (val) {
      const allGroupValues = []
      // 保留所有值
      for (const item of this.allStudioFlock1) {
        allGroupValues.push(item.dep_no)
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldGroupOptions.length === 1 ? this.oldGroupOptions[0] : []

      // 若是全部选择
      if (val.includes('all')) this.filter.studioFlock = allGroupValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) { this.filter.studioFlock = [] }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.filter.studioFlock = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allGroupValues.length - 1) { this.filter.studioFlock = ['all'].concat(val) }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldGroupOptions[0] = this.filter.studioFlock
      // console.log(val)
      // 联动工作室
      const res = await getStudioList({dep_nos: this.filter.studioFlock})
      if (res.code !== -404) {
        this.allStudio1 = res.data
        this.allStudio1.unshift({
          dep_no: 'all',
          id: 'all',
          level: 2,
          name: '全部工作室'
        })
        this.filter.studio = []
        this.getList()
      }
    },
    select2 (val) {
      const allGroupValues = []
      // 保留所有值
      for (const item of this.allStudio1) {
        allGroupValues.push(item.id)
      }

      // 用来储存上一次的值，可以进行对比
      const oldVal =
        this.oldStudioOptions.length === 1 ? this.oldStudioOptions[0] : []

      // 若是全部选择
      if (val.includes('all')) this.filter.studio = allGroupValues

      // 取消全部选中 上次有 当前没有 表示取消全选
      if (oldVal.includes('all') && !val.includes('all')) { this.filter.studio = [] }

      // 点击非全部选中 需要排除全部选中 以及 当前点击的选项
      // 新老数据都有全部选中
      if (oldVal.includes('all') && val.includes('all')) {
        const index = val.indexOf('all')
        val.splice(index, 1) // 排除全选选项
        this.filter.studio = val
      }

      // 全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes('all') && !val.includes('all')) {
        if (val.length === allGroupValues.length - 1) { this.filter.studio = ['all'].concat(val) }
      }

      // 储存当前最后的结果 作为下次的老数据
      this.oldStudioOptions[0] = this.filter.studio
      this.getList()
    },
    async select3 (val) {
      const res = await getStudioList({dep_nos: [val]})
      if (res.code !== -404) {
        this.ruleForm.studioId = ''
        this.allStudio2 = res.data
      }
    },
    // 点击编辑
    aditInfo (row) {
      this.dialogVisible = true
      // console.log(row)
      for (let k in row) {
        this.ruleForm[k] = row[k]
      }
    },
    // 切换分页方法
    handleCurrentChange (val) {
      this.page = val
      this.getList()
    },
    // 监听页面大小变化
    handleSizeChange (val) {
      this.pageSize = val
      this.page = 1
      this.getList()
    },
    // 获取成员
    async getUserInfo () {
      this.column.forEach(i => {
        // this.ruleForm[i.key] = ''
        this.$set(this.ruleForm, i.key + 'Id', '')
      })
      var data = {
        studioGroups: [this.ruleForm.studioFlockId],
        studios: [this.ruleForm.studioId]
      }
      const res = await getProjectsPropUser(data)
      if (res.code !== -400) {
        this.allMember = res.data
      }
    },
    // 编辑数据
    async editProjectProp (param) {
      const res = await editProjectsProp(param)
      if (res.code !== -404) {
        this.getList()
      }
    }
  }
}
</script>

<style scoped>

</style>
