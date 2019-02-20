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
      // id: 304,
      // memberId: 2,
      // titleName: 'IP企划',
      // urlPower: 'ip'
      memberId: 311,
      titleName: 'IP企划',
      urlPower: 'ip'
    }
  }
}
</script>

<style>

</style>
