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
      // id: 13,
      // memberId: 2,
      // titleName: '项目管理',
      // urlPower: 'manage'
      memberId: 306,
      titleName: '项目管理',
      urlPower: 'manage'
    }
  }
}
</script>

<style>

</style>
