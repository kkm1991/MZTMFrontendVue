<script setup>
import { useCounterStore } from "@/stores/counter";
import { useStaffStore } from "@/stores/staffstore";
import { ref, onMounted } from "vue";
import axios from "axios";
const authstore = useCounterStore();
const staffstore = useStaffStore();

onMounted(() => {
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
</script>

<template>
  <main class="m-1 ">
    <table class="table  table-hover  table-transparent ">
      <thead class="">
        <tr>
          <th scope="col"  >#</th>
          <th scope="col">Name</th>
          <th scope="col">Father</th>
          <th scope="col">DOB</th>
          <th scope="col">Start Working Date</th>
          <th scope="col">Education</th>
          <th scope="col">Dep</th>
          <th scope="col">Position</th>
          <th scope="col">Basic Salary</th>
          <th scope="col">Debt</th>
          <th scope="col">Address</th>
          <th scope="col">Photo</th>
          <th scope="col">Status</th>
        
        </tr>
        
      </thead>
      <tbody>
          <tr v-for="(staff,index) in staffstore.state.stafflist" :key="staff.id">
            <td >{{staff.id}}</td>
          <td >{{staff.name}}</td>
          <td >{{staff.father_name}}</td>
          <td >{{staff.nrc}}</td>
          <td >{{staff.start_working_date}}</td>
          <td >{{staff.educationID}}</td>
          <td >{{staff.depID}}</td>
          <td >{{staff.positionID}}</td>
          <td >{{staff.basic_salary}}</td>
          <td >{{staff.debt}}</td>
          <td >{{staff.address}}</td>
          <td >{{staff.image}}</td>
          <td >{{staff.active_status}}</td>
          </tr>
        </tbody>
    </table>
  </main>
</template>

<style>

</style>