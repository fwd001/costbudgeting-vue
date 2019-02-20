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
      memberId: 4,
      titleName: '研发',
      urlPower: 'research'
    }
  }
}
</script>

<style>

</style>
