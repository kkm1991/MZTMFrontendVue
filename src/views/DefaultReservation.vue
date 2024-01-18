<template>
    <div class="justify-content-center ">
       
        <div class="row shadow-sm my-2 p-3 fw-bold">
            <div class="col-2">အမည်</div>
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
        </div>
        <div class="row shadow-sm my-3 p-3  align-middle " v-for="(list ,index) in reservationStore.defaultReservation.defaultlist" :key="list.id">
            <div class="col-2">{{list.name}}</div>
            <div class="col">{{list.rareCost}}</div>
            <div class="col">{{list.bonus}}</div>
            <div class="col">{{list.attendedBonus}}</div>
            <div class="col">{{list.busFee}}</div>
            <div class="col">{{list.mealDeduct}}</div>
            <div class="col">{{list.absence}}</div>
            <div class="col">{{list.ssbFee}}</div>
            <div class="col">{{list.fine}}</div>
            <div class="col">{{list.redeem}}</div>
            <div class="col">{{list.advance_salary}}</div>
            <div class="col">{{list.otherDeductLable}}</div>
            <div class="col">{{list.otherDeduct}}</div>
        </div>
    </div>
</template>

<script setup>
import { useReservationStore } from '@/stores/reservationStore';
import { useCounterStore } from '@/stores/counter';
import { onMounted } from 'vue';
import axios from 'axios';
 
const reservationStore=useReservationStore();
const authstore=useCounterStore();
onMounted(() => {
    reservationStore.reservationtoggle=false;
    reservationStore.defaultReservation.defaultlist.length=0
    axios.get("http://127.0.0.1:8000/api/reservation/load/default",{
        headers:{
          Authorization:`Bearer ${authstore.loginData.token}`,
          Accept:"application/json"
        }
      }).then((res)=>{
        reservationStore.defaultReservation.defaultlist.push(...res.data)
      })
})
 
     
  
</script>

<style lang="scss" scoped>

</style>