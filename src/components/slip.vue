<template>
    <div>
<!-- Button trigger modal -->
<button type="button" class="btn" data-bs-toggle="modal" :data-bs-target="`#exampleModal${salaryID.value}`"  >
    <i class="fa-solid fa-receipt"></i>
</button>

<!-- Modal -->
<div class="modal fade modal-sm" :id="`exampleModal${salaryID.value}`" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Salary Slip</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <div class=""> {{slipdata.id}}</div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>

<script setup>
import {ref,onMounted,computed} from 'vue'
import { useCounterStore } from '@/stores/counter';
import { useSalaryStore } from '@/stores/salary';
import axios from 'axios';
const salaryID= defineProps(['salaryId'])
const slipdata=ref([]);
const authstore=useCounterStore();
const salaryStore=useSalaryStore();

// const modalId = computed(() =>``);
// const modalIdbtn = computed(() => `);
 onMounted(() => {
     
   try{
    axios.get(`http://127.0.0.1:8000/api/salary/slip`,{
        params:salaryID,
        headers:{
            Authorization:`Bearer ${authstore.loginData.token}`,
        Accept:"application/json"
        }
    }).then((res)=>{
      console.log(res.data)
      slipdata.value=res.data
    })
   }catch(error){

   }
 })
 
</script>

<style lang="scss" scoped>

</style>