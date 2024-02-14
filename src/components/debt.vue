<template   >
    <div>
<!-- Button trigger modal -->
<button type="button" class="custom-btn btn-12" data-bs-toggle="modal" data-bs-target="#staticBackdrop" @click="debtStore.loadrecord(staff_id)">
  <span>Click!</span> <span>{{ debt }}</span>
</button>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl " id="print-section">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel"> {{ debtStore.name }} Loan and Payment records    </h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <addLoan :staff_id="debtStore.state.staffid"/>

        <label for="" class="d-flex fw-bold text-decoration-underline text-danger">Loan Records</label>
        <div class="row p-2 m-2 shadow-sm" v-for="(record , index) in debtStore.loanlist" :key="record.id">
          <div class="col-1">{{ index + 1 }}</div>
          <div class="col-2">{{ formatdate(record.created_at) }}</div>
          <div class="col-1">{{ record.amount }}</div>
          <div class="col-8">{{ record.description }}</div>
        </div>
        <div class="row  m-2 p-2 shadow-sm">
          <div class="col-1"> </div>
          <div class="col-2">Total </div>
          <div class="col-1 fw-bold text-danger">{{ debtStore.loantotal }}</div>
          <div class="col-8"> </div>
        </div>
        <hr>
        <label for="" class="d-flex fw-bold text-decoration-underline text-success">Payment Record</label>
        <div class="row p-2 m-2 shadow-sm" v-for="(record , index) in debtStore.paymentlist" :key="record.id">
          <div class="col-1">{{ index + 1 }}</div>
          <div class="col-2">{{formatdate(record.created_at)  }}</div>
          <div class="col-1">{{ record.amount }}</div>
          <div class="col-8">{{ record.description }}</div>
        </div>
        <div class="row  m-2 p-2 shadow-sm">
          <div class="col-1"> </div>
          <div class="col-2">Total</div>
          <div class="col-1 fw-bold text-success">{{ debtStore.paymenttotal }}</div>
          <div class="col-8"> </div>
        </div>
      </div>
      <div class="modal-footer visiblehidden">
        <button type="button" class="custom-btn btn-12" data-bs-dismiss="modal"><span>Click!</span><span>Close</span></button>
         
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script setup>
import {useDebtStore} from '../stores/debtstore'
import { ref,onMounted,computed } from 'vue';
import {useStaffStore} from '../stores/staffstore'
const staffstore=useStaffStore()
const {debt,staff_id,index}=defineProps(['debt','staff_id','index'])
const debtStore=useDebtStore();
import addLoan from './addLoan.vue';

const formatdate=(datestring)=>{
  const date=new Date(datestring);

   // Extract the year, month, and day
   const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    
    // Return the formatted date as a string
    return   `${day}-${month}-${year}`
}

 
</script>

<style lang="scss" scoped>
 
  
</style>