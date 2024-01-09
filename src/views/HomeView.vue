<script setup>
import { useCounterStore } from "@/stores/counter";
import { useStaffStore } from "@/stores/staffstore";
import { usepedStore } from "@/stores/pedStore";
import addStaff from "@/components/addStaff.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
const authstore = useCounterStore();
const staffstore = useStaffStore();
const pedStore=usepedStore();
var key = ref("");

//onMounted start
onMounted(() => {
  axios.get("http://localhost:8000/api/list/deps").then((res)=>{
      pedStore.loadpdeps(res.data);
  });
  axios.get("http://localhost:8000/api/list/positions").then((res)=>{
      pedStore.loadposition(res.data);
  });
  axios.get("http://localhost:8000/api/list/educations").then((res)=>{
      pedStore.loadpeducation(res.data);
  });

  //welcome notification
  authstore.notification("Welcome " + authstore.loginData.userInfo.name);

  const loadlistdata = {
    key: authstore.loginData.userInfo.dep,
  };
  //အကယ်ရဲ့ login ဝင်ထားတဲ့သူက admin ဆိုရင်အကုန်လုံးပြမယ် user ဆိုရင် သူနဲ့ဆိုင်တဲ့ dep ရဲ့ဝန်ထမ်းလစာပေးစာရင်းပဲပြမယ်
  if (authstore.loginData.userInfo.role == "admin") {
    loadlistdata.key = null;
  }

  axios
    .get("http://127.0.0.1:8000/api/staffs/list", {
      params: loadlistdata,
      headers: {
        Authorization: `Bearer ${authstore.loginData.token}`,
        Accept: "application/json",
      },
    })
    .then((res) => {
      staffstore.loadstaffslist(res.data);
    });
});
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
  console.log(statusdata);
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
</script>

<template>
  <main class="m-1">
    <addStaff/>
    <table class="table table-hover table-transparent">
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
          
         
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(staff, index) in staffstore.state.stafflist"
          :key="staff.id"
        >
          <td>{{ staff.id }}</td>
          <td><img :src="'http://127.0.0.1:8000/storage/uploads/'+staff.image" style="width: 100px; height: 125px;" alt=""></td>
          <td>{{ staff.name }}</td>
          
         
          <td>{{ staff.nrc }}</td>
          <td>{{ staff.start_working_date }}</td>
          <td>{{ staff.educationtitle }}</td>
          <td>{{ staff.deptitle }}</td>
          <td>{{ staff.positiontitle }}</td>
          <td>{{ staff.basic_salary }}</td>
          <td>{{ staff.debt }}</td>
        
          
          <td class="text-center">
            <button
              class="btn btn-success"
              v-if="staff.active_status"
              @click="changestatus(staff.id, !staff.active_status)"
            ></button>
            <button
              class="btn btn-danger"
              v-else="staff.active_status"
              @click="changestatus(staff.id, !staff.active_status)"
            ></button>
          </td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style></style>
