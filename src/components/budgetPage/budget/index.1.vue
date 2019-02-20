<template>
  <el-row class="budget">
    <el-row class="table-title">
      <div class="title">
        预算
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
            <template slot-scope="scope">
              {{scope.row[item.key + ''] | getThousandNum}}
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-pagination
          layout="prev, pager, next"
          :total="50"
          :current-page.sync="hisCostPage"
          style="text-align: center;"
          class="mt20"
          @current-change="handleCurrentChange">
        </el-pagination> -->
      </el-col>
    </el-row>
  </el-row>
</template>

<script>
import { getBudgetIndex, getProjectList } from '@/api/api'
import { } from '@/assets/js/config'
import { setTagTitle } from '@/assets/utils'
export default {
  data () {
    return {
      // 项目投入度：项目
      project1: '',
      allProject1: [

      ],
      /* 历史成本值-研发 */
      historyCostData: {
        column: [
          // {key: 'costType', title: '成本项', width: '200'},
          // {key: '1', title: '总研发成本', width: '200'},
          // {key: '2', title: 'GR0（区间月和）', width: '200'},
          // {key: '3', title: 'GR1', width: '200'},
          // {key: '4', title: 'GR2', width: '200'},
          // {key: '2018/4', title: '2018/4', width: '200'},
          // {key: '2018/5', title: '2018/5', width: '200'},
          // {key: '2018/6', title: '2018/6', width: '200'}
        ],
        record: [
          // {
          //   costType: '工作室研发人数',
          //   '1': '19',
          //   '2': '6',
          //   '3': '26',
          //   '4': '28',
          //   '2018/4': '',
          //   '2018/5': '',
          //   '2018/6': ''
          // },
          // {
          //   costType: '1.1-工作室研发人力成本',
          //   '1': '13,569,044',
          //   '2': '1,470,503',
          //   '3': '8,806,153',
          //   '4': '3,292,388',
          //   '2018/4': '',
          //   '2018/5': '',
          //   '2018/6': ''
          // },
          // {
          //   costType: '总计',
          //   '1': '64,080,452',
          //   '2': '2,939,017',
          //   '3': '8,806,153',
          //   '4': '3,292,388',
          //   '2018/4': '',
          //   '2018/5': '',
          //   '2018/6': ''
          // }
        ]
      },
      hisCostPage: 1,
      hisCostTotal: 0
    }
  },
  created () {
    getProjectList()
      .then(res => {
        // console.log(res)
        if (res !== -404) {
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
      this.getTable(this.project1)
    },
    getTable (projectId) {
      getBudgetIndex({projectId})
        .then(res => {
          // console.log(res)
          if (res !== -404) {
            this.historyCostData = res.data
            this.$nextTick(() => {
            // DOM 现在更新了
              setTagTitle('.budget')
            })
          }
        })
    },
    // cell样式
    cellStyle ({row, column, rowIndex, columnIndex}) {
      // console.log(column.colSpan)
      if (column.property !== 'name') {
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
