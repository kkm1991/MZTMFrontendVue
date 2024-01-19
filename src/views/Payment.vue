<template>
    <div class="col-3 d-flex  text-end me-4 align-items-center" ><i class="fa-solid fa-magnifying-glass fs-5 mx-2 "></i> <input type="text" class="form-control " v-model="searchname" name="" id=""></div>
   <div class=" justify-content-center ">
    <div class="row shadow-sm my-2 p-3 fw-bold">
      <div class="col-1">ID</div>
      <div class="col-2">Name</div>
      <div class="col-2">Deparment</div>
      <div class="col-2">Position</div>
      <div class="col-2">Salary</div>
      <div class="col-1">Loan</div>
      <div class="col-1">Reservation</div>
      <div class="col-1">Pay</div>
    </div>
    <div class="row shadow-sm  my-2 p-3" v-for="(staff,index) in paginatedAndFilteredPaymentList" :key="staff.id">
      <div class="col-1">{{ staff.id }}</div>
      <div class="col-2">{{ staff.name }}</div>
      <div class="col-2">{{ staff.deptitle }}</div>
      <div class="col-2">{{ staff.positiontitle }}</div>
      <div class="col-2">{{ staff.basic_salary }}</div>
      <div class="col-1">{{ staff.debt }}</div>
      <!-- addReservation component ဆီကို props နဲ့ staffid ကိုပေးလိုက်တယ် ဟိုဖက်က defineProps နဲ့ပြန်ဖမ်းရမယ် -->
      <div class="col-1"><addReservation :staffid="staff.id"/></div>
      <div class="col-1"><button class="btn btn-light"><i class="fa-regular text-success fa-square-plus fs-2"></i></button></div>
    </div>
    
   </div>
   <Pagination :currentPage="currentPage" :totalPages="totalPages" :goToPage="goToPage" />
   
</template>

<script setup>
  import { onMounted,ref,computed,watch } from 'vue';
  import { usePaymentStore } from '@/stores/paymentstore';
  import { useCounterStore } from '@/stores/counter';
  import { useReservationStore } from '@/stores/reservationStore';
  import addReservation from '@/components/addReservation.vue'
  import Pagination from '@/components/Pagination.vue';
  const paymentStore=usePaymentStore()
  const authstore=useCounterStore()
  const reservationStore=useReservationStore()
  onMounted(() => {
    reservationStore.reservationtoggle=true
    paymentStore.loadpaymentlist()
  })
  //paginate start
  const itemsPerPage=ref(2);
  const currentPage=ref(1);
  const totalPages = ref(1); 

  const searchname=ref("") //အမည်ရှာဖို.

  const paginatedAndFilteredPaymentList = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return paymentStore.state.staffpaymentlist.filter(row => {
    const filter = searchname.value.toUpperCase();
    const textval = row.name.toUpperCase();
    return textval.indexOf(filter) > -1;
  }).slice(startIndex, endIndex);
});

  watch(()=>paymentStore.state.staffpaymentlist,()=>{
    totalPages.value=Math.ceil(paymentStore.state.staffpaymentlist.length / itemsPerPage.value) // length ကို lenght နဲ့အမြဲမှားတယ်သတိထားပါ

  }) 
  const goToPage=(page)=>{
    if(page >= 1 && page <= totalPages.value){
      currentPage.value=page
      console.log('it work')
    }
  }

  //paginate end
 

</script>

<style lang="scss" scoped>

</style>