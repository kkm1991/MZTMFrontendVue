<template>
   
   <div class=" justify-content-center fs-5">
    <div class="row shadow-sm my-2 p-5 fw-bold">
      <div class="col-1">ID</div>
      <div class="col-2">Name</div>
      <div class="col-2">Deparment</div>
      <div class="col-2">Position</div>
      <div class="col-2">Salary</div>
      <div class="col-1">Loan</div>
      <div class="col-1">Reservation</div>
      <div class="col-1">Pay</div>
    </div>
    <div class="row shadow-sm  my-2 p-5" v-for="(staff,index) in paymentStore.state.staffpaymentlist" :key="staff.id">
      <div class="col-1">{{ staff.id }}</div>
      <div class="col-2">{{ staff.name }}</div>
      <div class="col-2">{{ staff.deptitle }}</div>
      <div class="col-2">{{ staff.positiontitle }}</div>
      <div class="col-2">{{ staff.basic_salary }}</div>
      <div class="col-1">{{ staff.debt }}</div>
      <div class="col-1"><addReservation/></div>
      <div class="col-1"><button class="btn btn-light"><i class="fa-regular fa-square-plus fs-2"></i></button></div>
    </div>
   </div>
    
   
</template>

<script setup>
  import { onMounted } from 'vue';
  import { usePaymentStore } from '@/stores/paymentstore';
  import { useCounterStore } from '@/stores/counter';
  import addReservation from '@/components/addReservation.vue'
  const paymentStore=usePaymentStore()
  const authstore=useCounterStore()
  onMounted(() => {
    paymentStore.loadpaymentlist()
  })

</script>

<style lang="scss" scoped>

</style>