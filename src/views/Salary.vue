<template>
  <div class="justify-content-center">
    <div class="row shadow-sm my-2 p-3">
      <div class="col-8">
        <div class="input-group">
          <input
            type="month"
            name=""
            class="form-control"
            id=""
            v-model="date"
            @change="salaryStore.searchsalarylist(date)"
          />
          <select
            class="form-select"
            id="inputGroupSelect04"
            aria-label="Example select with button addon"
            v-model="deps"
          >
            <option value="" selected>ဌာန အားလုံး...</option>
            <!-- [] ကို :value မှာသုံးထားတာက အဲ့ဒီ id နဲ့သွားရှာရမှာက array ထဲမှာမို.လို. ရှာရမယ့် key ကလည်း array type ဖြစ်အောင် -->
            <option
              :value="[dep.id]"
              v-for="(dep, index) in pedStore.state.deps"
              :key="dep.id"
            >
              {{ dep.title }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="container-legal">
      <div class="row shadow-sm my-2 p-3 fw-bold">
        <div class="col">စဉ်</div>
        <div class="col">အမည်</div>
        <div class="col">ဌာန</div>
        <div class="col">အခြေခံလစာ</div>
        <div class="col">ရှားပါးစရိတ်</div>
        <div class="col">ချီးမြင့်ငွေ</div>
        <div class="col">ရက်မှန်ကြေး</div>
        <div class="col">ကားခ</div>
        <div class="col">စုစုပေါင်း</div>

        <div class="col">ထမင်းဖိုး</div>
        <div class="col">အလုပ်ပျက်ရက်</div>
        <div class="col">လူမှု့ဖူလုံရေး</div>
        <div class="col">ဒဏ်ကြေး</div>
        <div class="col">ချေးငွေဆပ်</div>
        <div class="col">လစာကြိုထုတ်</div>
        <div class="col">ခေါင်းစဉ်</div>
        <div class="col">အခြားနှုတ်ငွေ</div>
        <div class="col">စုစုပေါင်း လစာ</div>
        <div class="col"></div>
      </div>
      <div
        class="row shadow-sm my-3 p-3 text-start"
        v-for="(list, index) in searchbydeps"
        :key="list.id"
      >
        <div class="col fw-bold"> {{ index + 1 }}</div>
        <div class="col"><div  >{{ list.staff.name }}</div> </div>
        <div class="col"><div  >{{ list.staff.dep.title }}</div> </div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.basicSalary }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.basicSalary"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.rareCost }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.rareCost"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.bonus }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.bonus"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.attendedBonus }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.attendedBonus"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.busFee }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.busFee"></div>
        <div class="col"><div  >{{ list.FirstTotal=list.basicSalary+list.rareCost +list.bonus+list.attendedBonus+list.busFee }}</div></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.mealDeduct }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.mealDeduct"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.absence }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.absence"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.ssbFee }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.ssbFee"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.fine }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.fine"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.redeem }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.redeem"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.advance_salary }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.advance_salary"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.otherDeductLable }}</div><input type="text" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.otherDeductLable"></div>
        <div class="col"><div v-if="!list.enableEdit">{{ list.otherDeduct }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.otherDeduct"></div>
        <div class="col"><div  >{{ list.finalTotal=list.FirstTotal-(list.mealDeduct+list.absence+list.ssbFee+list.fine+list.redeem+list.advance_salary+list.otherDeduct)}}</div></div>
        <div class="col">
          <button
            class="btn btn-light me-2"
            v-if="!list.enableEdit"
            @click="toggleEdit(list)"
          >
            <i class="fa-solid fa-pen text-primary"></i>
          </button>
          <button
            class="btn btn-light me-2"
            v-if="list.enableEdit"
            @click="saveEdit(list)"
          >
            <i class="fa-solid text-success fa-clipboard-check"></i>
          </button>
        </div>
        <div class="col">
          
          <button
            class="btn btn-light me-2"
            v-if="!confirmDialogVisible"
            @click="deleteconfirm(list)"
          >
          <i class="fa-solid fa-user-minus text-danger"></i>
          </button>
          <ConfirmDialog v-if="confirmDialogVisible" :message="confirmmessage" :onConfirm="handleConfirm" :onCancle="handleCancel"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed ,reactive} from "vue";
import { usepedStore } from "@/stores/pedStore";
import { useSalaryStore } from "@/stores/salary";
import { useCounterStore } from "@/stores/counter";
// import { toast } from "vue3-toastify";
// import "vue3-toastify/dist/index.css";
import axios from "axios";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
const confirmDialogVisible=ref(false);
const date = ref(null);
const deps = ref(null);
const enableEdit = ref(false);
const pedStore = usepedStore();
const salaryStore = useSalaryStore();
const authStore=useCounterStore();
const deleteData=reactive({
  reservation_id:"",
  id:"",
  
})

onMounted(() => {
  salaryStore.loadsalarylist();
});



const confirmmessage=`Are u sure to delete this salary` 
const deleteconfirm=(list)=>{
 confirmDialogVisible.value=true;
 deleteData.reservation_id=list.reservation_id;
 deleteData.id=list.id
  
}
const handleConfirm=()=> {
       
      salaryStore.deletesalary(deleteData)
       confirmDialogVisible.value = false;
       deleteData.reservation_id=""
       deleteData.id=""
      
    }
  const  handleCancel=()=> {
      // Handle cancel action
      console.log('Cancelled');
       confirmDialogVisible.value = false;
       deleteData.reservation_id=""
       deleteData.id=""

    }

const searchbydeps = computed(() => {
    const depsValue=deps.value;
  if (depsValue == "" || depsValue == null) {
    return salaryStore.state.searchsalarylist;

  }
  return salaryStore.state.searchsalarylist.filter((list) => {
    if (Array.isArray(depsValue)) {
      return depsValue.includes(list.staff.depID);
    }
  });

});

const toggleEdit = (item) => {
  item.enableEdit = !item.enableEdit;
};

const saveEdit = (list) => {
  const updateEdit = {
        id:list.id,
        basicSalary:list.basicSalary,
        rareCost:list.rareCost,
        bonus:list.bonus,
        attendedBonus:list.attendedBonus,
        busFee:list.busFee,
        FirstTotal:list.FirstTotal,
        mealDeduct:list.mealDeduct,
        absence:list.absence,
        ssbFee:list.ssbFee,
        fine:list.fine,
        redeem:list.redeem,
        advance_salary:list.advance_salary,
        otherDeductLable:list.otherDeductLable,
        otherDeduct:list.otherDeduct,
        staff_id:list.staff_id,
        reservation_id:list.reservation_id,
        finalTotal:list.finalTotal,
  };
  updatesalary(updateEdit);
  list.enableEdit = !list.enableEdit;
};

const updatesalary=(updatedata)=>{
    console.log(updatedata)
    axios.patch('http://127.0.0.1:8000/api/salary/update',updatedata,{
        headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
    }).then((res)=>{
        console.log(res.data)
        if(res.data.message){
            authStore.notification(res.data.message)
             
        }
    })
}
</script>

<style lang="scss" scoped>
.container-legal {
  width: 14in;
  height: 8.5in;
}
</style>
