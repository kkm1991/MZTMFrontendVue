<script setup>
import { useCounterStore } from "@/stores/counter";
import { useStaffStore } from "@/stores/staffstore";
import { usepedStore } from "@/stores/pedStore";
import addStaff from "@/components/addStaff.vue";
import Pagination from "@/components/Pagination.vue";
import ConfirmDialog from "@/components/ConfirmDialog.vue";
import debt from "@/components/debt.vue";
 
import { ref, onMounted,computed,watch } from "vue";
import axios from "axios";
const authstore = useCounterStore();
const staffstore = useStaffStore();
const pedStore=usepedStore();

var key = ref("");


// //searchbox start
// const searchbyname=computed(()=>{
//   const filter=searchname.toUpperCase();
//   return staffstore.state.stafflist.filter(row=>{
//     const textval=row.name.toUpperCase();
//     return textval.indexOf(filter)>-1
//   })
// })
// //searchbox end


// paginate start
const itemsPerPage=ref(10);
const currentPage=ref(1);
const totalPages = ref(1);
const searchname=ref("")
const paginatedAndFilteredStaffList = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return staffstore.state.stafflist.filter(row => {
    const filter = searchname.value.toUpperCase();
    const textval = row.name.toUpperCase();
    return textval.indexOf(filter) > -1;
  }).slice(startIndex, endIndex);
});

watch(() => staffstore.state.stafflist, () => {
  totalPages.value = Math.ceil(staffstore.state.stafflist.length / itemsPerPage.value);
});
const goToPage=(page)=>{
  if(page >= 1 && page <= totalPages.value){
    currentPage.value=page;
  }
}
// paginate end



//onMounted start
onMounted(() => {
  axios.get("http://127.0.0.1:8000/api/list/deps").then((res)=>{
      pedStore.loadpdeps(res.data);
  });
  axios.get("http://127.0.0.1:8000/api/list/positions").then((res)=>{
    console.log(res.data)
      pedStore.loadposition(res.data);
  });
  axios.get("http://127.0.0.1:8000/api/list/educations").then((res)=>{
      pedStore.loadpeducation(res.data);
  });

  //welcome notification
  authstore.notification("Welcome " + authstore.loginData.userInfo.name);

  staffstore.loadstaffslist()
})
//onMounted end

//change status start
const changestatus = (staffid, status) => {
  if (authstore.loginData.userInfo.role === "user") {
    key = authstore.loginData.userInfo.dep;
  } else {
    key = null;
  }

  const statusdata = {
    userstatus: status,
    staff_id: staffid,
    key: key,
  };
  
  axios
    .post("http://127.0.0.1:8000/api/staffs/status", statusdata, {
      headers: {
        Authorization: `Bearer ${authstore.loginData.token}`,
        Accept: "application/json",
      },
    })
    .then((res) => {
      staffstore.loadstaffslist(res.data);
    });
};
//change status end

//delete start
const confirmDialogVisible=ref(false);
const staff_id=ref(null)
const staff_name=ref('')


const deletestaff=(staff)=>{
  confirmDialogVisible.value=true
   staff_id.value=staff.id
   staff_name.value=staff.name
   console.log(confirmmessage)
}

const confirmmessage=`Are u sure to delete ${staff_name.value}`


 
const handleConfirm=()=> {
       
  axios.get('http://127.0.0.1:8000/api/staffs/delete',
  {
    params:{id:staff_id.value},
    headers:{
    Authorization:`Bearer ${authstore.loginData.token}`,
    Accept:"application/json"
  }}).then((res)=>{
    staffstore.loadstaffslist(res.data)

  })
       confirmDialogVisible.value = false;
       staff_id.value=null
       staff_name.value=null
    }

     // Handle cancel action
  const  handleCancel=()=> {
     
      console.log('Cancelled');
       confirmDialogVisible.value = false;
       staff_id.value=null
       staff_name.value=null
    }

</script>

<template>
  <main class="m-1">
    <div class="row">
      <div class="col"> <addStaff/></div> 
      
    </div>
      <table class="table table-hover table-transparent text-center     ">
      <thead class="">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Photo</th>
          <th scope="col">Name</th>
          <th scope="col">NRC</th>
          <th scope="col">Working Date</th>
          <th scope="col">Education</th>
          <th scope="col">Dep</th>
          <th scope="col">Position</th>
          <th scope="col">Basic Salary</th>
          <th scope="col">Debt</th>
          <th scope="col"> </th>
          <th scope="col"> <input type="text" class="form-control "  placeholder="Search" v-model="searchname" name="" id=""></th>
        </tr>
      </thead>
      <tbody >
        <tr
          v-for="(staff, index) in paginatedAndFilteredStaffList"
          :key="staff.id"  
          
        >
          <td class="align-middle" >{{ staff.id }}</td>
          <td class="align-middle"><img class="rounded-circle" :src="'http://127.0.0.1:8000/storage/uploads/'+staff.image" style="width: 100px; height: 125px;" alt=""></td>
          <td class="align-middle">{{ staff.name }}</td>
          <td class="align-middle">{{ staff.nrc }}</td>
          <td class="align-middle">{{ staff.start_working_date }}</td>
          <td class="align-middle">{{ staff.educationtitle }}</td>
          <td class="align-middle">{{ staff.deptitle }}</td>
          <td class="align-middle">{{ staff.positiontitle }}</td>
          <td class="align-middle">{{ staff.basic_salary }}</td>
          <td class="align-middle"> <debt :debt="staff.debt" :staff_id="staff.id" :staff_name="staff.name" :index="index"/></td>
        
          
          <td class="align-middle"  >
            <button
              class="btn  "
              v-if="staff.active_status"
              @click="changestatus(staff.id, !staff.active_status)"
            ><i class="fa-solid fa-user text-success"></i></button>
            <button
              class="btn "
              v-else="staff.active_status"
              @click="changestatus(staff.id, !staff.active_status)"
            ><i class="fa-solid fa-user text-danger"></i></button>
          </td >
               
          <td class="align-middle" >
            <button class="btn  me-2"  v-if="authstore.loginData.userInfo.role=='admin'" @click="deletestaff(staff)"><i class="fa-solid fa-trash text-danger"></i></button>
            <ConfirmDialog  v-if="confirmDialogVisible" :message="'Are you sure to delete '+staff_name+' profile'" :onConfirm="handleConfirm" :onCancle="handleCancel"/>
            <button class="btn "  v-if="authstore.loginData.userInfo.role=='admin'" @click="staffstore.toeditstaff(staff)"><i class="fa-solid fa-pen text-primary"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    <pagination :currentPage="currentPage" :totalPages="totalPages" :goToPage="goToPage" />
  </main>
</template>

<style>
   
</style>
