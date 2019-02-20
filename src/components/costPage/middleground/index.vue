<template>
  <el-row class="middleCost">
    <el-row class="table-title">
      <div class="title">
        中台成本
      </div>
      <div class="select ml-20">
        <el-select
          size="mini"
          v-model="project1"
          placeholder="请选择项目"
          @change="proChange">
          <el-option
            v-for="item in allProject1"
            :key="item.project_id"
            :label="item.project_name"
            :value="item.project_id + ''">
          </el-option>
        </el-select>
      </div>
    </el-row>
    <el-row class="mt20">
      <el-col :span="24">
        <el-table
          v-loading="loading"
          :data="historyCostData.record"
          border
          style="width: 100%"
          :cell-style="cellStyle"
          :header-cell-style="{textAlign: 'center'}">
          <el-table-column
            v-for="(item, index) in historyCostData.column"
            :fixed="index === 0 || index === 1"
            :key="item.key"
            :prop="item.key + ''"
            :label="item.title"
            width="180"
            align="right">
            <template slot-scope="{row, column, $index}">
              <div v-if="$index === 0 || $index === 1 || $index === 2 || $index === 3 || $index === 4 || $index === 5 || $index === 6">{{row[item.key + ''] | getThousandNum(1)}}</div>
              <div v-else>{{row[item.key + ''] | getThousandNum(0)}}</div>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { getCenterControlIndex, getProjectList } from '@/api/api'
import { } from '@/assets/js/config'
import { setTagTitle } from '@/assets/utils'
export default {
  data () {
    return {
      // 项目投入度：项目
      project1: '',
      allProject1: [],
      /* 历史成本值-研发 */
      historyCostData: {
        column: [],
        record: []
      },
      hisCostPage: 1,
      hisCostTotal: 0,
      loading: true
    }
  },
  created () {
    getProjectList()
      .then(res => {
        // console.log(res)
        if (res.code !== -400) {
          this.allProject1 = res.data
          if (this.allProject1) {
            this.project1 = this.allProject1[0].project_id + ''
          }
          this.getTable(this.project1)
        }
      })
  },
  watch: {
  },
  methods: {
    proChange () {
      this.loading = true
      this.getTable(this.project1)
    },
    getTable (projectId) {
      getCenterControlIndex({projectId})
        .then(res => {
          // console.log(res)
          if (res.code !== -400) {
            this.historyCostData = res.data
            this.loading = false
            this.$nextTick(() => {
              // DOM 现在更新了
              setTagTitle('.middleCost')
            })
          }
        })
    },
    // cell样式
    cellStyle ({row, column, rowIndex, columnIndex}) {
      // console.log(column.colSpan)
      if (column.property !== 'costType') {
        return {textAlign: 'right'}
      } else {
        return {textAlign: 'left'}
      }
    }
  },
  mounted () {
  }
}

</script>

<style>

</style>
