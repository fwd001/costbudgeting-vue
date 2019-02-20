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
    // return {
    //   id: 14,
    //   memberId: 2,
    //   titleName: '质量管理',
    //   urlPower: 'quality'
    // }
    return {
      memberId: 305,
      titleName: '质量管理',
      urlPower: 'quality'
    }
  }
}
</script>

<style>

</style>
