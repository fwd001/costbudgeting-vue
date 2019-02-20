<template>
  <CostCom :memberId="memberId" :titleName="titleName" :urlPower="urlPower"></CostCom>
</template>

<script>
import Cost from '@/components/costPage/costComponents/index'
export default {
  components: {
    CostCom: Cost
  },
  data () {
    return {
      memberId: 3,
      titleName: '美术',
      urlPower: 'art'
    }
  }
}
</script>

<style>

</style>
