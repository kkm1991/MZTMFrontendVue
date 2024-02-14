<template>
  <div>
    <button
      class="custom-btn btn-12"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseLoan"
      aria-expanded="false"
      aria-controls="collapseLoan"
    >
      <span>Add New!</span>
      <span><i class="fa-solid fa-file-circle-plus"></i></span>
    </button>

    <!--  add Loan start -->
    <div class="collapse" id="collapseLoan">
      <div class="row p-3 m-2 shadow-sm align-items-center  ">
        <div class="col-2">New</div>
        <div class="col-2">
            <select name="" v-model="debtstore.data.loandata.type" id="" class="form-control" @click="required.type=false">
                <option value="loan">Loan</option>
                <option value="payment">Payment</option>
            </select>
            <span class="text-danger" v-if="required.type">Type Required</span>
        </div>
        <div class="col-2">
          <input type="number" class="form-control"   v-model="debtstore.data.loandata.amount" id="" placeholder="Amount" @change="required.amount=false">
          <span class="text-danger" v-if="required.amount">Amount Required</span>
        </div>
        <div class="col-4">
          <input type="text" class="form-control" v-model="debtstore.data.loandata.description" id="" @change="required.description=false"  placeholder="Description">
          <span class="text-danger" v-if="required.description">Description Required</span>
        </div>
        <div class="col-1"><button class="custom-btn btn-12" @click="addloan"><span>Add!</span><span><i class="fa-regular  fa-square-plus"></i></span></button></div>
      </div>
    </div>
    <!-- add loan end -->
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import { useDebtStore } from '@/stores/debtstore';
import { useCounterStore } from '@/stores/counter';
 
const debtstore=useDebtStore()
const type=ref(null)
const amount=ref(null)
const description=ref(null)
const required=reactive({
  type:false,
  amount:false,
  description:false
})
 

const addloan=()=>{
  if(  debtstore.data.loandata.type==null){
   required.type=true;
  }
  else{
    required.type=false
  }

  if(debtstore.data.loandata.amount==null){
    required.amount=true
  }
  else{
    required.amount=false
  }
  if(debtstore.data.loandata.description==null){
    required.description=true
  }
  else{
    required.description=false
  }
  debtstore.data.loandata.staff_id=debtstore.state.staffid
   debtstore.addLoan()
  
}
</script>

<style lang="scss" scoped></style>
