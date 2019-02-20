<template>
  <first-page :titleName="titleName" :costData="costData" @getTable="getTable" ></first-page>
</template>

<script>
import FirstPage from '@/components/firstPage'
import { getCenterControlIndex } from '@/api/api'
export default {
  data () {
    return {
      costData: {
        column: [],
        record: []
      },
      titleName: '中台成本'
    }
  },
  components: {
    FirstPage
  },
  created () {
  },
  methods: {
    async getTable (projectId, callback) {
      const res = await getCenterControlIndex({projectId})
      if (res.code !== -404) {
        this.costData = res.data
        callback && callback()
      }
    }
  },
  mounted () {}
}

</script>

<style>
</style>
