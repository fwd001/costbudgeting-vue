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
      // id: 303,
      // memberId: 2,
      // titleName: '音频设计',
      // urlPower: 'audio'
      memberId: 310,
      titleName: '音频设计',
      urlPower: 'audio'
    }
  }
}
</script>

<style>

</style>
