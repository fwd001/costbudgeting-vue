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
      memberId: 1,
      titleName: '运营',
      urlPower: 'operation'
    }
  }
}
</script>

<style>

</style>
