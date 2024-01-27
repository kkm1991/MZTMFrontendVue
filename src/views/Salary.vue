<template>
   
  <div class="justify-content-center">
    <div class="row shadow-sm my-2 p-3 visiblehidden">
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
    <div class="container-legal  justify-content-center  " id="print-section">
       
      <div class="row  p-2 ms-2 fw-bolder fs-5 text-decoration-underline text-center  ">
        <div class="col">Mitzu Tun Myint co.,ltd (ဘုတ်ဆုံမ ငရုတ်သီးမှုန့် လုပ်ငန်း)  ဌာန - {{ depstitle }} ({{ date }}) </div>
         
      </div>
      <table class="table table-hover table-transparent text-center  align-middle    ">
      <thead class="fs-sm">
        
        <tr>
                   <th scope="col">စဉ်</th> 
                   <th scope="col"> အမည်</th>  
                   <th scope="col"> အခြေခံလစာ</th> 
                   <th scope="col"> ရှားပါးစရိတ်</th> 
                   <th scope="col"> ချီးမြင့်ငွေ</th> 
                   <th scope="col"> ရက်မှန်ကြေး</th> 
                   <th scope="col"> ကားခ</th> 
                   <th scope="col"> စုစုပေါင်း</th> 
                   <th scope="col"> ထမင်းဖိုး</th> 
                   <th scope="col"> အလုပ်ပျက်ရက်</th> 
                   <th scope="col"> လူမှု့ဖူလုံရေး</th> 
                   <th scope="col"> ဒဏ်ကြေး</th> 
                   <th scope="col"> ချေးငွေဆပ်</th> 
                   <th scope="col"> လစာကြိုထုတ်</th> 
                   <th scope="col"> ခေါင်းစဉ်</th> 
                   <th scope="col"> အခြားနှုတ်ငွေ</th> 
                   <th scope="col"> စုစုပေါင်း</th> 
                   <th scope="col">  </th> 
                   <th scope="col">  </th> 
           

        </tr>
      </thead>
      <tbody >
        <tr
        v-for="(list, index) in searchbydeps"
        :key="list.id"  
          
        >
        <td scope="col fw-bold  ">{{ index + 1 }}</td>
        <td scope="col"><div  >{{ list.staff.name }}</div> </td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.basicSalary }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.basicSalary"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.rareCost }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.rareCost"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.bonus }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.bonus"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.attendedBonus }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.attendedBonus"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.busFee }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.busFee"></td>
        <td scope="col"><div  >{{ list.FirstTotal=list.basicSalary+list.rareCost +list.bonus+list.attendedBonus+list.busFee }}</div></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.mealDeduct }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.mealDeduct"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.absence }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.absence"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.ssbFee }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.ssbFee"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.fine }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.fine"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.redeem }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.redeem"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.advance_salary }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.advance_salary"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.otherDeductLable }}</div><input type="text" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.otherDeductLable"></td>
        <td scope="col"><div v-if="!list.enableEdit">{{ list.otherDeduct }}</div><input type="number" class="form-control form-control-sm" v-if="list.enableEdit" v-model="list.otherDeduct"></td>
        <td scope="col"><div  >{{ list.finalTotal=list.FirstTotal-(list.mealDeduct+list.absence+list.ssbFee+list.fine+list.redeem+list.advance_salary+list.otherDeduct)}}</div></td>
        <td scope="col actionbutton">
          <button
            class="btn btn-light btnnotdisplay "
            v-if="!list.enableEdit"
            @click="toggleEdit(list)"
          >
            <i class="fa-solid fa-pen text-primary"></i>
          </button>
          <button
            class="btn btn-light  btnnotdisplay"
            v-if="list.enableEdit"
            @click="saveEdit(list)"
          >
            <i class="fa-solid text-success fa-clipboard-check"></i>

          </button>
        </td>
         <td scope="col">
          <button
            class="btn btn-light me-2 btnnotdisplay"
            v-if="!confirmDialogVisible"
            @click="deleteconfirm(list)"
          >
          <i class="fa-solid fa-user-minus text-danger"></i>
          </button>
         </td>
          <ConfirmDialog v-if="confirmDialogVisible" :message="confirmmessage" :onConfirm="handleConfirm" :onCancle="handleCancel"/>
        </tr>
      </tbody>
      <tfoot class="fw-bold ">
        <td class="col"></td>
        <td class="col"></td>
         
        <td class="col text-success " >{{sumBasicSalary}}</td>
        <td class="col text-success ">{{sumrareCost}}</td>
        <td class="col text-success ">{{sumbonus}}</td>
        <td class="col text-success ">{{sumattendedBonus}}</td>
        <td class="col text-success ">{{sumbusFee}}</td>
        <td class="col text-success ">{{sumFirstTotal}}</td>
        <td class="col text-danger ">{{summealDeduct}}</td>
        <td class="col text-danger ">{{sumabsence}}</td>
        <td class="col text-danger ">{{sumssbFee}}</td>
        <td class="col text-danger ">{{sumfine}}</td>
        <td class="col text-danger ">{{sumredeem}}</td>
        <td class="col text-danger ">{{sumadvance_salary}}</td>
        <td class="col text-danger ">{{}}</td>
        <td class="col text-danger ">{{sumotherDeducte}}</td>
        <td class="col text-danger ">{{sumfinalTotal}}</td>
      </tfoot>
    </table>
  </div>
  <div class="row justify-content-center">
    <div class="col-2 "><button class="btn btn-warning w-100 m-auto" @click="printbtn"><i class="fs-3 fa-solid fa-print"></i></button></div>
  </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed ,reactive,watch} from "vue";
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
const depstitle=ref("")


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

//select box ကနေရွေးလိုက်တာ က id ပဲပါတာ title ကို watch နဲ့ pedStore ထဲကပြန်ဆွဲထုတ်ပြီး depstitle ထဲကိုထဲ့ပေးတာ
watch(() => deps.value, (newValue) => {
  const selectedDep=pedStore.state.deps.find(dep=>dep.id=== newValue[0])
   console.log(newValue)
  depstitle.value=selectedDep ? selectedDep.title : "";
})


const printbtn=()=>{
  window.print()
}
//salary footer အတွက်
const createSumCompute=(propertyName)=>{
 return computed(()=>{
  return searchbydeps.value.reduce((acc,list)=>acc+(list[propertyName] || 0),0)
 })
}
const sumBasicSalary=createSumCompute('basicSalary')
const sumrareCost=createSumCompute('rareCost')
const sumbonus=createSumCompute('bonus')
const sumattendedBonus=createSumCompute('attendedBonus')
const sumbusFee=createSumCompute('busFee')
const sumFirstTotal=createSumCompute('FirstTotal')
const summealDeduct=createSumCompute('mealDeduct')
const sumabsence=createSumCompute('absence')
const sumssbFee=createSumCompute('ssbFee')
const sumfine=createSumCompute('fine')
const sumredeem=createSumCompute('redeem')
const sumadvance_salary=createSumCompute('advance_salary')
const sumotherDeducte=createSumCompute('otherDeduct')
const sumfinalTotal=createSumCompute('finalTotal')
 
//salary footer အတွက်

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




@media print{
  body *{
    visibility: hidden;
  }
  #print-section,
  #print-section *{
    visibility: visible;
    margin: auto;
  }

  .btnnotdisplay{
    display: none;
  }
  .nav-container{
    display: none;
  }
  .visiblehidden{
    visibility: hidden;
    position: absolute;
    top: -9999px; /* Move it off the screen */
  }

}
</style>
