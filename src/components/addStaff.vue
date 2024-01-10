<template>
  <div>
    <button class="btn btn-light" type="button" @click="cleardata" data-bs-target="#collapseExample"
      aria-expanded="false" aria-controls="collapseExample">
      + Add new staff
    </button>
    <!-- iscollapsed အပေါ်မူတည်ပြီးအဖွင့်အပိတ်လုပ်ထားတယ် -->
    <div id="collapseExample" :class="{ collapse: staffstore.iscollapsed }">
      <div class="card card-body">
        <!-- First row start -->
        <div class="row">
          <!-- name start -->
          <div class="col-4">
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingPassword" placeholder="Password"
                v-model="staffstore.staffdata.name" />
              <label for="floatingPassword">Name</label>
            </div>
          </div>
          <!-- name end -->
          <!-- father_name start -->
          <div class="col-4">
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingPassword" placeholder="Password"
                v-model="staffstore.staffdata.father_name" />
              <label for="floatingPassword">Father name</label>
            </div>
          </div>
          <!-- father_name end -->
           <!-- nrc -->
           <div class="col-4">
            <div class="form-floating">
              <input type="text" class="form-control" id="floatingPassword" placeholder="0"
                v-model="staffstore.staffdata.nrc" />
              <label for="floatingPassword">NRC</label>
            </div>
          </div>
          <!-- nrc -->

          
        </div>
        <!-- First row end -->

        <!-- Second row start -->
        <div class="row">
          <!-- DOB start -->
          <div class="col-4 align-items-center">
            <label for="datepicker">Select Date of Birth:</label>
            <input type="date" id="datepicker" name="datepicker" class="form-control" height="100px"
              v-model="staffstore.staffdata.dob" />
          </div>
          <!-- DOB end -->

          <!-- start working date start -->
          <div class="col-4 align-items-center">
            <label for="datepicker">Select Start working date :</label>
            <input type="date" id="datepicker" name="datepicker" class="form-control" height="100px"
              v-model="staffstore.staffdata.start_working_date" />
          </div>
          <!-- start working date end -->

          <!-- image start -->
          <div class="col-4 align-items-center">
            <label for="datepicker">Select image :</label>
            <input type="file" id="filepicker" name="filepicker" class="form-control" height="100px"
              @change="handleFileChange" />
          </div>
          <!-- image end -->
        </div>
        <!-- Second row end -->

        <!-- Third row start -->
        <div class="row mt-3">
          <div class="col-4">
            <!-- deps start -->
            <div class="form-floating">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                v-model="staffstore.staffdata.depID">
                <option selected></option>
                <option class="py-3" v-for="(dep, index) in pedStore.state.deps" :key="dep.id" :value="dep.id">
                  {{ dep.title }}
                </option>
              </select>
              <label for="floatingSelect">Department</label>
            </div>
            <!-- deps end -->
          </div>

          <!-- position -->
          <div class="col-4">
            <div class="form-floating">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                v-model="staffstore.staffdata.positionID">
                <option selected></option>
                <option class="py-3" v-for="(pos, index) in pedStore.state.positions" :key="pos.id" :value="pos.id">
                  {{ pos.title }}
                </option>
              </select>
              <label for="floatingSelect">Position</label>
            </div>
          </div>
          <!-- position -->
          <!-- Education start -->
          <div class="col-4">
            <div class="form-floating">
              <select class="form-select" id="floatingSelect" aria-label="Floating label select example"
                v-model="staffstore.staffdata.educationID">
                <option selected></option>
                <option class="py-3" v-for="(dep, index) in pedStore.state.educations" :key="dep.id" :value="dep.id">
                  {{ dep.title }}
                </option>
              </select>
              <label for="floatingSelect">Education</label>
            </div>
          </div>
          <!-- Education end -->
         
        </div>
        <!-- Third row end -->

        <!-- Fourth row start -->
        <div class="row mt-3">
           <!-- salary -->
           <div class="col-4">
            <div class="form-floating">
              <input type="number" class="form-control" id="floatingPassword" placeholder="0"
                v-model="staffstore.staffdata.basic_salary" />
              <label for="floatingPassword">Basic Salary</label>
            </div>
          </div>
          <!-- salary -->

          <!-- address -->
          <div class="col-4">
            <div class="form-floating">
              <input type="Text" class="form-control" id="floatingPassword" placeholder="0" />
              <label for="floatingPassword">Address</label>
            </div>
          </div>
          <!-- address -->

          <div class="col-2">
            <button class="btn btn-outline-success form-control h-100" type="submit" @click="togglecollapse"
              data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Save
            </button>
          </div>
          <div class="col-2">
            <button class="btn btn-warning form-control h-100" type="button" @click="closecollapse"
              data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              Close
            </button>
          </div>
        </div>

        <!-- Fourth row start -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { usepedStore } from "@/stores/pedStore";
import { useCounterStore } from "@/stores/counter";
import { useStaffStore } from "@/stores/staffstore";
import { ref, reactive } from "vue";
import axios from "axios";


const pedStore = usepedStore();
const authstore = useCounterStore();
const staffstore=useStaffStore()
const cleardata=()=>{
    staffstore.staffdata.id=null
    staffstore.staffdata.name = ""
    staffstore.staffdata.depID = ""
    staffstore.staffdata.nrc = ""
    staffstore.staffdata.positionID = ""
    staffstore.staffdata.educationID = ""
    staffstore.staffdata.basic_salary = ""
    staffstore.staffdata.address = ""
    staffstore.staffdata.dob = ""
    staffstore.staffdata.start_working_date = ""
    staffstore.staffdata.image=null
    staffstore.iscollapsed=!staffstore.iscollapsed
}

const togglecollapse = () => {
  if (
    staffstore.staffdata.name != "" &&
    staffstore.staffdata.depID != "" &&
    staffstore.staffdata.positionID != "" &&
    staffstore.staffdata.educationID != "" &&
    staffstore.staffdata.basic_salary != ""
  ) {
    staffcreate();
    staffstore.iscollapsed = !staffstore.iscollapsed;
    cleardata()
  } 
  else {
    authstore.errornoti("Please Check , some information are required !");
  }
};

const closecollapse=()=>{
  if(staffstore.iscollapsed==false){
    cleardata()
    
  }
}

const staffcreate=()=>{

  const formData = new FormData();
    formData.append('id', staffstore.staffdata.id);
    formData.append('name', staffstore.staffdata.name);
    formData.append('nrc', staffstore.staffdata.nrc);
    formData.append('father_name', staffstore.staffdata.father_name);
    formData.append('start_working_date',  staffstore.staffdata.start_working_date);
    formData.append('dob', staffstore.staffdata.dob);
    formData.append('image', staffstore.staffdata.image);
    formData.append('depID', staffstore.staffdata.depID);
    formData.append('positionID', staffstore.staffdata.positionID);
    formData.append('educationID', staffstore.staffdata.educationID);
    formData.append('basic_salary', staffstore.staffdata.basic_salary);
    formData.append('address', staffstore.staffdata.address);

    console.log(staffstore.staffdata);
    axios.post('http://localhost:8000/api/staffs/create',formData,{
      headers:{
      Authorization:`Bearer ${authstore.loginData.token}`,
      Accept:"application/json"
    }}).then((res)=>{
      if(res.data.message){
        authstore.errornoti(res.data.message)
      }
      else{
        staffstore.loadstaffslist(res.data)
        cleardata()
       
      }
       
    })
}

   
 
const handleFileChange = (event) => {
 staffstore.staffdata.image = event.target.files[0];
};

 
</script>

 