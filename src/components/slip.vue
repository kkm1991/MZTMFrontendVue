<template class="print-only">
  <div class="slip-container print-only">
    <button type="button" v-print="'#exampleModal'" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="openModal()" >
    <i class="fa-solid fa-receipt"></i>
</button>

    <!-- Modal -->
    <div
      class="modal fade modal-sm    "
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-fullscreen-xxl-down "  id="print-section"      >
        <div class="modal-content">
          <div class="modal-header visiblehidden "  >
            <h1 class="modal-title fs-5" id="exampleModalLabel">Salary Slip</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div
            class="modal-body  text-start"
            v-for="(slip, index) in salaryStore.state.salarySlip"
            :key="index"
          >
            <div class="row mb-3">
              <div class="col">ရက်စွဲ </div>
              <div class="col">
                {{ slip ? formatDate(slip.created_at) : "" }}
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">အမည် </div>
              <div class="col">{{ slip ? slip.staff_name : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">ဌာန </div>
              <div class="col">{{ slip ? slip.dep_title : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">အခြေခံလစာ </div>
              <div class="col">{{ slip ? slip.basicSalary : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">ရှားပါးစရိတ် </div>
              <div class="col">{{ slip ? slip.rareCost : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">ချီးမြင့်ငွေ </div>
              <div class="col">{{ slip ? slip.bonus : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">ရက်မှန်ကြေး </div>
              <div class="col">{{ slip ? slip.attendedBonus : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">ကားခ </div>
              <div class="col">{{ slip ? slip.busFee : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">စုစုပေါင်း </div>
              <div class="col">{{ slip ? slip.FirstTotal : "" }}</div>
            </div>
            <hr />
            <div class="row mb-3">
              <div class="col">စားစရိတ် </div>
              <div class="col">{{ slip ? slip.mealDeduct : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">အလုပ်ပျက်ရက် </div>
              <div class="col">{{ slip ? slip.absence : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">လူမှု့ဖူလုံရေး </div>
              <div class="col">{{ slip ? slip.ssbFee : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">ဒဏ်ကြေး </div>
              <div class="col">{{ slip ? slip.fine : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">ချေးငွေဆပ် </div>
              <div class="col">{{ slip ? slip.redeem : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">ကြိုတင်လစာထုတ် </div>
              <div class="col">{{ slip ? slip.advance_salary : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">{{ slip ? slip.otherDeductLable : "" }}</div>
              <div class="col">{{ slip ? slip.otherDeduct : "" }}</div>
            </div>
            <div class="row mb-3">
              <div class="col">လစာစုစုပေါင်း  </div>
              <div class="col">{{ slip ? slip.finalTotal : "" }}</div>
            </div>
          </div>
          <div class="modal-footer visiblehidden">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="printbtn">
              <i class="fs-3 fa-solid fa-print"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSalaryStore } from '@/stores/salary';
const salaryStore=useSalaryStore()
 import { onMounted } from 'vue';
const salaryid = defineProps(['salaryId']);

 

 
 
const printbtn=( )=>{
// Save the original visibility state
 

// Set the visibility to visible for the slip component
 

// Trigger the print dialog
window.print();

 
}

const openModal=()=>{
  salaryStore.loadpayslip(salaryid)
  salaryStore.state.hidetoggle=false
  console.log(salaryid)
}
const formatDate=(datestring)=>{
  if(!datestring) return '';
  const date = new Date(datestring);
  const month=new Intl.DateTimeFormat('en', { month: 'long' }).format(date)
  const year = date.getFullYear();

    return `${month} ${year}`;
}
</script>

<style lang="scss" scoped>

@media print {
  

  #slip-section,
  #slip-section * {
    visibility: visible;
    margin: auto;
  }
  .visiblehidden{
    visibility: hidden;
    position: absolute;
    top: -9999px; /* Move it off the screen */
  }
  /* Add any additional print styles here */
}
     
 

</style>
