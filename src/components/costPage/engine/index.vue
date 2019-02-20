<template>
  <!-- <CostCom :id="id" :memberId="memberId" :titleName="titleName" :urlPower="urlPower"></CostCom> -->
   <CostCom :memberId="memberId" :titleName="titleName" :urlPower="urlPower"></CostCom>
</template>

<script>
// import Cost from '@/components/costPage/middleComponents/index'
import Cost from '@/components/costPage/costComponents/index'
export default {
  components: {
    CostCom: Cost
  },
  data () {
    return {
      // id: 302,
      // memberId: 2,
      // titleName: '引擎',
      // urlPower: 'engine'
      memberId: 309,
      titleName: '引擎',
      urlPower: 'engine'
    }
  }
}
</script>

<style>

</style>
