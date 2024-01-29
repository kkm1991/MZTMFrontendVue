<template>
    <div>
        <header >
            <div class="row  align-items-center justify-content-end mb-5">
                <div class="col-3 ms-3"> <input type="month" class="form-control" v-model="datemonth" @change="salaryStore.salaryReport(datemonth)" > </div>
                <div class="col-2  ">Select Month/Year</div>
            </div>
        </header>
        <body class="justify-content-center ">
                <div class="container" id="print-section">

                    <div class="row my-1 fw-bold text-center"><div class="col text-decoration-underline">
                        MitzuTunMyint co.,ltd ဘုတ်ဆုံမ ငရုတ်သီးမှုန့် ({{ datemonth }}) လစာ အချုပ်
                    </div></div>
                    <div class="row my-2 p-3 fw-bold text-center">
                        <div class="col">စဉ်</div>
                        <div class="col">ဌာန</div>
                        <div class="col">ဝန်ထမ်း</div>
                        <div class="col">ဌာနလစာစုစုပေါင်း</div>
                    </div>
                    <div class="row my-2 p-3 text-center shadow-sm" v-for="(report,index) in salaryStore.state.salaryReport" :key="index">
                        <div class="col">{{ index+1 }}</div>
                        <div class="col">{{ report.title}}</div>
                        <div class="col">{{ report.staff_count }} ယောက်</div>
                        <div class="col">{{ report.total_salary }} ကျပ်</div>
                    </div>
                    <div class="row my-2 p-3 fw-bold text-center">
                        <div class="col"> </div>
                        <div class="col"> </div>
                        <div class="col">{{staff_count_total}} ယောက်</div>
                        <div class="col">{{summary_salaries_total}} ကျပ်</div>
                    </div>
                </div>
        </body>
            <footer>
                <div class="col text-center"><button class="custom-btn btn-12" @click="printreport"><span>Click!</span><span><i class="fs-5 fa-solid fa-print"></i></span></button></div>
            </footer>
    </div>
</template>

<script setup>
import { useSalaryStore } from '@/stores/salary';
import { ref,computed } from 'vue';


const datemonth=ref(null)
 
const salaryStore=useSalaryStore();

const createSumCompute=(propertyName)=>{
 return computed(()=>{
  return salaryStore.state.salaryReport.reduce((acc,list)=>acc+(list[propertyName] || 0),0)
 })
}

const createSumtotalsalary=(propertyName)=>{
 return computed(()=>{
  return salaryStore.state.salaryReport.reduce((acc,list)=>acc+Number(list[propertyName] || 0),0)
 })
}

const staff_count_total=createSumCompute('staff_count')
const summary_salaries_total=createSumtotalsalary('total_salary')
const printreport=()=>{
    window.print()
}

</script>

<style lang="scss" scoped>
@media print{
  body *{
    visibility: hidden;
  }
  #print-section,
  #print-section *{
    visibility: visible;
    margin: auto;
  }
 

}
</style>