<template>
  <first-page :titleName="titleName" :costData="costData" @getTable="getTable" ></first-page>
</template>

<script>
import FirstPage from '@/components/firstPage'
import { getCostIndex } from '@/api/api'
export default {
  data () {
    return {
      costData: {
        column: [],
        record: []
      },
      titleName: '成本首页'
    }
  },
  components: {
    FirstPage
  },
  created () {
  },
  methods: {
    async getTable (projectId, callback) {
      const res = await getCostIndex({projectId})
      if (res.code !== -404) {
        this.costData = res.data
        callback && callback()
      }
    }
  },
  mounted () {
  }
}

</script>

<style>
</style>
