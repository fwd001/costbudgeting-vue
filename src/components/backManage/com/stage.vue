<template>
  <div class="app-container">
    <el-row class="table-title" style="line-height: 28px;">
      <div class="title">
        过审阶段变更
      </div>
      <div class="add ml-20">
        <!-- <el-button size="small" icon="el-icon-plus" circle></el-button> -->
        <el-button size="mini" @click="dialogVisible=true" round type="primary">新增</el-button>
      </div>
    </el-row>
    <el-row class="mt20">
      <!-- Note that row-key is necessary to get a correct row order. -->
      <el-table v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 431px">

        <el-table-column align="center" label="过审阶段" width="200">
          <template slot-scope="scope">
            <template v-if="scope.row.edit">
              <el-input v-model="ruleForm2.name" class="edit-input" size="small"/>
              <el-button class="cancel-btn" size="mini" type="warning" @click="cancelEdit(scope.row)">cancel</el-button>
            </template>
            <span v-else>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button v-if="scope.row.edit" type="text" size="small" @click="confirmEdit(scope.row)" style="color: #67C23A">Ok</el-button>
            <el-button v-else type="text" size="small" @click="showInput(scope.row)">改</el-button>
            <el-button type="text" size="small" @click="confirmDel(scope.row)" style="color: #F56C6C">删</el-button>
          </template>
        </el-table-column>

        <el-table-column align="center" label="拖拽" width="80">
          <template slot-scope="scope">
            <span class="my-handle">
              <svg-icon class="drag-handler" id="drag-handler" icon-class="drag"/>
            </span>
          </template>
        </el-table-column>

      </el-table>
     </el-row>
    <!-- 新增类型 -->
    <el-dialog title="添加阶段"
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
        <el-form-item label="过审阶段" prop="name">
          <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList } from '@/api/article'
import Sortable from 'sortablejs'
import {
  getStateList,
  delStateListData,
  addStateListData,
  editStateListData
} from '@/api/api2'
export default {
  name: 'DragTable',
  data () {
    return {
      list: [
        {id: 1, name: '...', edit: false},
        {id: 2, name: '...', edit: false},
        {id: 3, name: '...', edit: false}
      ],
      total: null,
      listLoading: true,
      sortable: null,
      ruleForm: {
        name: '',
        sort: 0
      },
      ruleForm2: {
        id: null,
        name: ''
      },
      rules: {
        name: [{ required: true, message: '请填写阶段', trigger: 'blur' }]
      },
      oldList: [],
      newList: [],
      dialogVisible: false,
      isLoading: false
    }
  },
  watch: {
    dialogVisible (val) {
      if (!val) {
        this.$refs.ruleForm.resetFields()
      }
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      this.listLoading = true
      const res = await getStateList()
      if (res.code !== -404) {
        this.list = res.data
      }
      this.oldList = this.list.map(v => v.id)
      this.newList = this.oldList.slice()
      this.$nextTick(() => {
        this.setSort()
        this.listLoading = false
      })
    },
    setSort () {
      const el = document.querySelectorAll('.app-container .el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost', // Class name for the drop placeholder,
        handle: '.my-handle',
        setData: function (dataTransfer) {
          dataTransfer.setData('Text', '')
          // console.log(1)
          // to avoid Firefox bug
          // Detail see : https://github.com/RubaXa/Sortable/issues/1012
        },
        onEnd: async (evt) => {
          const targetRow = this.list.splice(evt.oldIndex, 1)[0]
          this.list.splice(evt.newIndex, 0, targetRow)

          // for show the changes, you can delete in you code
          const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
          this.newList.splice(evt.newIndex, 0, tempIndex)
          const res = await editStateListData({
            sort: this.newList
          })
          if (res.code !== -404) {
            this.getList()
          }
        }
      })
    },
    // 提交
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.dialogVisible = false
          // console.log(this[formName])
          const res = await addStateListData(this.ruleForm)
          if (res.code !== -404) {
            // console.log(res)
            this.getList()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 删除阶段
    confirmDel (row) {
      this.$confirm('此操作将永久删除该阶段, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await delStateListData({id: row.id})
        if (res.code !== -404) {
          this.getList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 显示编辑框
    showInput (row) {
      row.edit = !row.edit
      this.ruleForm2.name = row.name
      this.ruleForm2.id = row.id
    },
    cancelEdit (row) {
      row.edit = false
      this.$message({
        message: '取消编辑',
        type: 'warning'
      })
    },
    // 确认修改
    async confirmEdit (row) {
      row.edit = false
      const res = await editStateListData(this.ruleForm2)
      if (res.code !== -404) {
        this.getList()
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style>
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 18px!important;
  height: 18px!important;
  /* cursor: pointer; */
}
.my-handle {
  cursor: move;
  cursor: -webkit-grabbing;
}
.show-d{
  margin-top: 15px;
}
.edit-input {
  padding-right: 80px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 11px;
  padding: 9px 15px !important;
}
.cell .el-button--small, .el-button--small.is-round {
    padding: 9px 5px;
  }
</style>
