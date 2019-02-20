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
      // id: 301,
      // memberId: 2,
      // titleName: '技术框架',
      // urlPower: 'code'
      memberId: 308,
      titleName: '技术框架',
      urlPower: 'code'
    }
  }
}
</script>

<style>

</style>
