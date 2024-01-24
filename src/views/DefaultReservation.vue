<template>
    <div class="justify-content-center ">
      <div class="col-3 d-flex  text-end me-4 align-items-center" ><i class="fa-solid fa-magnifying-glass fs-5 mx-2 "></i> <input type="text" class="form-control " v-model="searchname" name="" id=""></div>
        <div class="row shadow-sm my-2 p-3 fw-bold">
            <div class="col-1">အမည်</div>
            <div class="col">ရှားပါးစရိတ်</div>
            <div class="col">ချီးမြင့်ငွေ</div>
            <div class="col">ရက်မှန်ကြေး</div>
            <div class="col">ကားခ</div>
            <div class="col">ထမင်းဖိုး</div>
            <div class="col">အလုပ်ပျက်ရက်</div>
            <div class="col">လူမှု့ဖူလုံရေး</div>
            <div class="col">ဒဏ်ကြေး</div>
            <div class="col">ချေးငွေဆပ်</div>
            <div class="col">လစာကြိုထုတ်</div>
            <div class="col">ခေါင်းစဉ်</div>
            <div class="col">အခြားနှုတ်ငွေ</div>
            <div class="col"></div>
        </div>
        <div class="row shadow-sm my-3 p-3  align-middle " v-for="(list ,index) in paginatedAndFilteredDefaultList" :key="list.id">
            <div class="col-1"> {{list.name}}   </div>      
            <div class="col"><div v-if="!list.enableEdit">{{list.rareCost}}</div> <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.rareCost"></div>  
            <div class="col"><div v-if="!list.enableEdit">{{list.bonus}}</div>  <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.bonus"></div>
            <div class="col"><div v-if="!list.enableEdit">{{list.attendedBonus}}</div> <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.attendedBonus"></div>
            <div class="col"><div v-if="!list.enableEdit">{{list.busFee}}</div> <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.busFee"></div> 
            <div class="col"><div v-if="!list.enableEdit">{{list.mealDeduct}}</div>  <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.mealDeduct"></div>
            <div class="col"><div v-if="!list.enableEdit">{{list.absence}}</div> <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.absence"></div>
            <div class="col"><div v-if="!list.enableEdit">{{list.ssbFee}}</div> <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.ssbFee"></div>
            <div class="col"><div v-if="!list.enableEdit">{{list.fine}}</div> <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.fine"></div>
            <div class="col"><div v-if="!list.enableEdit">{{list.redeem}}</div> <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.redeem"></div>
            <div class="col"><div v-if="!list.enableEdit">{{list.advance_salary}}</div> <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.advance_salary"></div> 
            <div class="col"><div v-if="!list.enableEdit">{{list.otherDeductLable}}</div> <input class="form-control form-control-sm" type="text" v-if="list.enableEdit" v-model="list.otherDeductLable"></div>
            <div class="col"><div v-if="!list.enableEdit">{{list.otherDeduct}}</div> <input class="form-control form-control-sm" type="number" v-if="list.enableEdit" v-model="list.otherDeduct"></div> 
            <div class="col">
              <button class="btn btn-light me-2" v-if="!list.enableEdit"  @click="toggleEdit(list)"><i class="fa-solid fa-pen text-primary"></i></button>
              <button class="btn btn-light me-2" v-if="list.enableEdit"  @click=" saveEdit(list) "><i class="fa-solid text-success fa-clipboard-check"></i></button>
            </div>
             
        </div>
       
    

         
    </div>
     
</template>

<script setup>
import { onMounted,ref,computed,watch } from 'vue';
import { useReservationStore } from '@/stores/reservationStore';
import { useCounterStore } from '@/stores/counter';
import Pagination from '@/components/Pagination.vue';
import axios from 'axios';
 
const reservationStore=useReservationStore();
const authstore=useCounterStore();
const  enableEdit= ref(false)

onMounted(() => {
    reservationStore.loadDefaultReservation()
})
 
const toggleEdit=(item)=>{
  item.enableEdit=!item.enableEdit
}

const saveEdit=(list)=>{
 const updateEdit ={
        rareCost: list.rareCost,
        bonus: list.bonus,
        attendedBonus: list.attendedBonus,
        busFee: list.busFee,
        mealDeduct: list.mealDeduct,
        absence: list.absence,
        ssbFee: list.ssbFee,
        fine: list.fine,
        redeem: list.redeem,
        advance_salary: list.advance_salary,
        otherDeductLable: list.otherDeductLable,
        otherDeduct: list.otherDeduct,
        id: list.id,
 }
 reservationStore.updateDefaultReservation(updateEdit)
 list.enableEdit=!list.enableEdit;
}
   // paginate start
 
const searchname=ref("")

 

const paginatedAndFilteredDefaultList = computed(() => {
   
  return reservationStore.Reservation.defaultreservationlist.filter(row => {
    const filter = searchname.value.toUpperCase();
    const textval = row.name.toUpperCase();
    return textval.indexOf(filter) > -1;
  });
});

 

 
 
// paginate end

  
</script>

<style lang="scss" scoped>

</style>