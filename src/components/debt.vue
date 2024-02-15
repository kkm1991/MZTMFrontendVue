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
          <div class="col-2"><div v-if="!Loanedittoggle">{{ formatdate(record.created_at) }}</div> <div v-if="Loanedittoggle"><input v-model="record.created_at" type="date" class="form-control"></div></div>
          <div class="col-2"><div v-if="!Loanedittoggle">{{ record.amount }}</div> <div v-if="Loanedittoggle"> <input type="number" v-model="record.amount" class="form-control"> </div></div>
          <div class="col-5"><div v-if="!Loanedittoggle">{{ record.description }}</div> <div v-if="Loanedittoggle"><input type="text"   v-model="record.description"  class="form-control"></div> </div>
          <div class="col-2">
            <button class="btn me-1 " v-if="!Loanedittoggle" @click="editrecord()"><i class="fa-solid fa-pen text-primary"></i></button>
            <button class="btn me-1 " v-if="Loanedittoggle" @click="updaterecord(record)"><i class="fa-solid fa-check text-primary"></i></button>
            <button class="btn" @click="debtStore.deleteloan(record.id)"><i class="fa-solid fa-trash text-danger"></i></button>
          </div>
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
          <div class="col-2"><div v-if="!Paymentedittoggle || record.description=='salary'">{{ formatdate(record.created_at) }}</div> <div v-if="Paymentedittoggle && record.description!=='salary'"><input v-model="record.created_at" type="date" class="form-control"></div></div>
          <div class="col-2"><div v-if="!Paymentedittoggle || record.description=='salary'">{{ record.amount }}</div> <div v-if="Paymentedittoggle && record.description!=='salary'"> <input type="number" v-model="record.amount" class="form-control"> </div></div>
          <div class="col-5"><div v-if="!Paymentedittoggle || record.description=='salary'">{{ record.description }}</div> <div v-if="Paymentedittoggle && record.description!=='salary'"><input type="text"   v-model="record.description"  class="form-control"></div> </div>
          <div class="col-2" v-if="record.description!=='salary'">
            <button class="btn me-1 " v-if="!Paymentedittoggle" @click="paymenteditrecord()"><i class="fa-solid fa-pen text-primary"></i></button>
            <button class="btn me-1 " v-if="Paymentedittoggle" @click="paymentupdaterecord(record)"><i class="fa-solid fa-check text-primary"></i></button>
            <button class="btn" @click="debtStore.deleteloan(record.id)"><i class="fa-solid fa-trash text-danger"></i></button>
          </div>
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
const Loanedittoggle=ref(false)
const Paymentedittoggle=ref(false)

const formatdate=(datestring)=>{
  const date=new Date(datestring);

   // Extract the year, month, and day
   const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-indexed, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    
    // Return the formatted date as a string
    return   `${day}-${month}-${year}`
}

const paymenteditrecord=()=>{
  Paymentedittoggle.value=!Paymentedittoggle.value
}

const paymentupdaterecord=(record)=>{
  debtStore.updateloan(record)
  Paymentedittoggle.value=!Paymentedittoggle.value
}

const editrecord=()=>{
  Loanedittoggle.value=!Loanedittoggle.value
}

const updaterecord=(record)=>{
 
  debtStore.updateloan(record)
  Loanedittoggle.value=!Loanedittoggle.value
}
 
</script>

<style lang="scss" scoped>
 
  
</style>