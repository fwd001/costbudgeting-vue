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
      // id: 15,
      // memberId: 2,
      // titleName: 'UED',
      // urlPower: 'ued'
      memberId: 307,
      titleName: 'UED',
      urlPower: 'ued'
    }
  }
}
</script>

<style>

</style>
