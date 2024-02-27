<template>
  <div class="justify-content-center">
    <div class="row shadow-sm my-2 p-3">
      <div class="col-8">
        <div class="input-group">
        <input type="month" name="" class="form-control" id="" v-model="date" @change="reservationStore.searchMonthlyReservation(date);">
        <select
          class="form-select"
          id="inputGroupSelect04"
          aria-label="Example select with button addon"
          v-model="deps"
        >
          <option value="" selected>ဌာန အားလုံး...</option>
          <!-- [] ကို :value မှာသုံးထားတာက အဲ့ဒီ id နဲ့သွားရှာရမှာက array ထဲမှာမို.လို. ရှာရမယ့် key ကလည်း array type ဖြစ်အောင် -->
          <option :value=" [dep.id] " v-for="(dep , index) in pedStore.state.deps" :key="dep.id"  >{{dep.title}}</option>
           
        </select>
        
      </div>
      </div>
    </div>
    <div class="row shadow-sm my-2 p-3 fw-bold">
      <div class="col-1">စဉ်</div>
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
    <div
      class="row shadow-sm my-3 p-3 align-middle"
      v-for="(list, index) in searchbydeps"
      :key="list.id"
    >
    <div class="col-1 fw-bold ">{{ index+1 }}</div>
      <div class="col-2">{{ list.staff?.name ? list.staff.name : "Deleted Staff" }}</div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.rareCost }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.rareCost"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.bonus }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.bonus"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.attendedBonus }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.attendedBonus"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.busFee }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.busFee"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.mealDeduct }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.mealDeduct"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.absence }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.absence"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.ssbFee }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.ssbFee"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.fine }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.fine"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.redeem }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.redeem"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.advance_salary }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.advance_salary"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.otherDeductLable }}</div>
        <input
          class="form-control"
          type="text"
          v-if="list.enableEdit"
          v-model="list.otherDeductLable"
        />
      </div>
      <div class="col">
        <div v-if="!list.enableEdit">{{ list.otherDeduct }}</div>
        <input
          class="form-control"
          type="number"
          v-if="list.enableEdit"
          v-model="list.otherDeduct"
        />
      </div>
    </div>
    <div class="row shadow-sm my-2 p-3 fw-bold text-success">
      <div class="col-1"></div>
      <div class="col-2">စုစုပေါင်း</div>
      <div class="col">{{sumOfrareCost}}</div>
      <div class="col">{{sumOfbonus}}</div>
      <div class="col">{{sumOfattendedBonus}}</div>
      <div class="col">{{sumOfbusFee}}</div>
      <div class="col">{{sumOfmealDeduct}}</div>
      <div class="col">{{sumOfabsence}}</div>
      <div class="col">{{sumOfssbFee}}</div>
      <div class="col">{{sumOffine}}</div>
      <div class="col">{{sumOfredeem}}</div>
      <div class="col">{{sumOfadvance_salary}}</div>
      <div class="col"> </div>
      <div class="col">{{sumOfotherDeduct}}</div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useReservationStore } from "@/stores/reservationStore";
import { usepedStore } from "@/stores/pedStore";
const reservationStore = useReservationStore();
const pedStore=usepedStore()
onMounted(() => {
  reservationStore.loadMonthlyReservation();
});

const date=ref(null)
const deps=ref(null)

 
const searchbydeps = computed(() => {
  const depsValue=deps.value;
  //အကဲ၍ ဌာနမရွေးခဲ့ရင် reservationStore ထဲမှာရှိတဲ့ monthlyreservationlist array ထဲကဟာတွေအကုန်ပြမယ်
  if(depsValue=="" || depsValue==null){
    return reservationStore.Reservation.monthlyreservationlist;
  }
  // ဌာနရွေးခဲ့ရင်တော့ filter လုပ်ပြီးပြတယ်
  return reservationStore.Reservation.monthlyreservationlist.filter((list)=>{
  
    if (Array.isArray(depsValue)) {
      return depsValue.includes(list.staff.depID);
    }
  })
  
})


const sumOfrareCost=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.rareCost ||0),0);
})
const sumOfbonus=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.bonus ||0),0);
})
const sumOfattendedBonus=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.attendedBonus ||0),0);
})
const sumOfbusFee=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.busFee ||0),0);
})
const sumOfmealDeduct=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.mealDeduct ||0),0);
})
const sumOfabsence=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.absence ||0),0);
})
const sumOfssbFee=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.ssbFee ||0),0);
})
const sumOffine=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.fine ||0),0);
})
const sumOfredeem=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.redeem ||0),0);
})
const sumOfadvance_salary=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.advance_salary ||0),0);
})
const sumOfotherDeduct=computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list.otherDeduct ||0),0);
})
</script>

<style lang="scss" scoped></style>
