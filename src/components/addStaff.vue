<template>
  <div>
    <button
      class="custom-btn btn-12"
      type="button"
      @click="cleardata"
      data-bs-target="#collapseExample"
      aria-expanded="false"
      aria-controls="collapseExample"
    >
      <span>Click!</span><span><i class="fa-solid fa-user-plus"></i></span>
    </button>

    <button
      class="custom-btn btn-12"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseExample2"
      aria-expanded="false"
      aria-controls="collapseExample2"
    >
      <span>Click!</span> <span><i class="fa-solid fa-file-circle-plus"></i></span>
    </button>

     <!-- CRUD position,education,department start -->
    <div class="collapse " id="collapseExample2">
      <div class="row p-3   ">
        <div class="col transparent ">
          <div class="fw-bold text-center mb-2">Departments List</div>
          <div class="card card-body transparent">
            <div class="row p-2 shadow-sm align-items-center "> 
              <div class="col-8"><input type="text" class="form-control me-2" v-model="newdep"></div>
              <div class="col-4 "><i class="fa-solid text-success fa-square-plus fs-2" @click="adddeps"></i></div>
            </div>
            <div class="row p-2 shadow-sm align-middle" v-for="(dep,index) in pedStore.state.deps" :key="dep.id">
                  <div class="col-2">{{ dep.id }}</div>
                  <div class="col"><div class="" v-if="!dep.edittoggle">{{ dep.title }}</div> <div class="form-control" v-if="dep.edittoggle"><input type="text" v-model="dep.title"></div></div>
                  <div class="col text-end"><i v-if="!dep.edittoggle" @click="dep.edittoggle=!dep.edittoggle" class="fa-solid fa-pen text-primary me-3"></i>    <i v-if="dep.edittoggle" @click="editdepbtn(dep)" class="fa-regular text-success fa-circle-check me-3"></i>    <i class="fa-solid fa-trash text-danger" @click="pedStore.deletedeps(dep.id)"></i></div>
            </div>
          </div>
        </div>
        <div class="col transparent">
          <div class="fw-bold text-center mb-2">Positions List</div>
          <div class="card card-body  transparent">
            <div class="row p-2 shadow-sm align-items-center "> 
              <div class="col-8"><input type="text" class="form-control me-2" v-model="newpos"></div>
              <div class="col-4 "><i class="fa-solid text-success fa-square-plus fs-2" @click="addpos"></i></div>
            </div>
            <div class="row p-2 shadow-sm align-middle" v-for="(pos,index) in pedStore.state.positions" :key="pos.id">
                  <div class="col-1">{{ pos.id }}</div>
                  <div class="col"><div class="" v-if="!pos.edittoggle">{{ pos.title }}</div> <div class="form-control" v-if="pos.edittoggle"><input type="text" v-model="pos.title"></div></div>
                  <div class="col text-end"><i v-if="!pos.edittoggle" @click="pos.edittoggle=!pos.edittoggle" class="fa-solid fa-pen text-primary me-3"></i>    <i v-if="pos.edittoggle" @click="editpositonbtn(pos)" class="fa-regular text-success fa-circle-check me-3" ></i>    <i class="fa-solid fa-trash text-danger" @click="pedStore.deletepostion(pos.id)"></i></div>
            </div>
          </div>
        </div>
        <div class="col transparent">
          <div class="fw-bold text-center mb-2">Education List</div>
          <div class="card card-body  transparent">
            <div class="row p-2 shadow-sm align-items-center "> 
              <div class="col-8"><input type="text" class="form-control me-2" v-model="newedu"></div>
              <div class="col-4 "><i class="fa-solid text-success fa-square-plus fs-2" @click="addedu"></i></div>
            </div>
            <div class="row p-2 shadow-sm align-middle" v-for="(edu,index) in pedStore.state.educations" :key="edu.id">
                  <div class="col-1">{{ edu.id }}</div>
                  <div class="col"><div class="" v-if="!edu.edittoggle">{{ edu.title }}</div> <div class="form-control" v-if="edu.edittoggle"><input type="text" v-model="edu.title"></div></div>
                  <div class="col text-end"><i v-if="!edu.edittoggle" @click="edu.edittoggle=!edu.edittoggle" class="fa-solid fa-pen text-primary me-3"></i>    <i v-if="edu.edittoggle" @click="editedubtn(edu)" class="fa-regular text-success fa-circle-check me-3"></i>    <i class="fa-solid fa-trash text-danger" @click="pedStore.deleteeducation(edu.id)"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- CRUD position,education,department end -->

    <!-- add staff start -->
    <!-- iscollapsed အပေါ်မူတည်ပြီးအဖွင့်အပိတ်လုပ်ထားတယ် -->
    <div id="collapseExample" :class="{ collapse: staffstore.iscollapsed }">
      <div class="card card-body transparent">
        <!-- First row start -->
        <div class="row">
          <!-- name start -->
          <div class="col-4">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="staffstore.staffdata.name"
              />
              <label for="floatingPassword">Name</label>
            </div>
          </div>
          <!-- name end -->
          <!-- father_name start -->
          <div class="col-4">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="staffstore.staffdata.father_name"
              />
              <label for="floatingPassword">Father name</label>
            </div>
          </div>
          <!-- father_name end -->
          <!-- nrc -->
          <div class="col-4">
            <div class="form-floating">
              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="0"
                v-model="staffstore.staffdata.nrc"
              />
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
            <input
              type="date"
              id="datepicker"
              name="datepicker"
              class="form-control"
              height="100px"
              v-model="staffstore.staffdata.dob"
            />
          </div>
          <!-- DOB end -->

          <!-- start working date start -->
          <div class="col-4 align-items-center">
            <label for="datepicker">Select Start working date :</label>
            <input
              type="date"
              id="datepicker"
              name="datepicker"
              class="form-control"
              height="100px"
              v-model="staffstore.staffdata.start_working_date"
            />
          </div>
          <!-- start working date end -->

          <!-- image start -->
          <div class="col-4 align-items-center">
            <label for="datepicker">Select image :</label>
            <input
              type="file"
              id="filepicker"
              name="filepicker"
              class="form-control"
              height="100px"
              @change="handleFileChange"
            />
          </div>
          <!-- image end -->
        </div>
        <!-- Second row end -->

        <!-- Third row start -->
        <div class="row mt-3">
          <div class="col-4">
            <!-- deps start -->
            <div class="form-floating">
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                v-model="staffstore.staffdata.depID"
              >
                <option selected></option>
                <option
                  class="py-3"
                  v-for="(dep, index) in pedStore.state.deps"
                  :key="dep.id"
                  :value="dep.id"
                >
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
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                v-model="staffstore.staffdata.positionID"
              >
                <option selected></option>
                <option
                  class="py-3"
                  v-for="(pos, index) in pedStore.state.positions"
                  :key="pos.id"
                  :value="pos.id"
                >
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
              <select
                class="form-select"
                id="floatingSelect"
                aria-label="Floating label select example"
                v-model="staffstore.staffdata.educationID"
              >
                <option selected></option>
                <option
                  class="py-3"
                  v-for="(dep, index) in pedStore.state.educations"
                  :key="dep.id"
                  :value="dep.id"
                >
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
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="0"
                v-model="staffstore.staffdata.basic_salary"
              />
              <label for="floatingPassword">Basic Salary</label>
            </div>
          </div>
          <!-- salary -->

          <!-- address -->
          <div class="col-4">
            <div class="form-floating">
              <input
                type="Text"
                class="form-control"
                id="floatingPassword"
                placeholder="0"
              />
              <label for="floatingPassword">Address</label>
            </div>
          </div>
          <!-- address -->

          <div class="col-2">
            <button
              class="btn btn-outline-success form-control h-100"
              type="submit"
              @click="togglecollapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Save
            </button>
          </div>
          <div class="col-2">
            <button
              class="btn btn-warning form-control h-100"
              type="button"
              @click="closecollapse"
              data-bs-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Close
            </button>
          </div>
        </div>

        <!-- Fourth row start -->
      </div>
    </div>
    <!-- add staff end -->

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
const staffstore = useStaffStore();
const edittoggle=ref(false)
const newdep=ref("");
const newpos=ref("");
const newedu=ref("");

const cleardata = () => {
  staffstore.staffdata.id = null;
  staffstore.staffdata.name = "";
  staffstore.staffdata.depID = "";
  staffstore.staffdata.nrc = "";
  staffstore.staffdata.positionID = "";
  staffstore.staffdata.educationID = "";
  staffstore.staffdata.basic_salary = "";
  staffstore.staffdata.address = "";
  staffstore.staffdata.dob = "";
  staffstore.staffdata.start_working_date = "";
  staffstore.staffdata.image = null;
  staffstore.iscollapsed = !staffstore.iscollapsed;
};

const adddeps=()=>{
  if(newdep.value==null || newdep.value.trim()===""){
    authstore.errornoti("Title is empty!")
  }
  else{
    pedStore.adddeps(newdep.value)
    authstore.notification('Added !')
    newdep.value=""
  }
  
}
const addpos=()=>{
  if(newpos.value==null || newpos.value.trim()===""){
    authstore.errornoti("Title is empty!")
  }
  else{
    pedStore.addpostion(newpos.value)
    authstore.notification('Added !')
    newpos.value=""
  }
  
}
const addedu=()=>{
  if(newedu.value==null || newedu.value.trim()===""){
    authstore.errornoti("Title is empty!")
  }
  else{
    pedStore.addeducation(newedu.value)
    authstore.notification('Added !')
    newedu.value=""
  }
  
}


const editpositonbtn = (positiondata) =>{
  positiondata.edittoggle=!positiondata.edittoggle
  pedStore.editpostion(positiondata) 
}
const editdepbtn = (depdata) =>{
  depdata.edittoggle=!depdata.edittoggle
  pedStore.editdep(depdata)
}
const editedubtn = (edudata) =>{
  edudata.edittoggle=!edudata.edittoggle
  pedStore.editeducation(edudata)
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
    cleardata();
  } else {
    authstore.errornoti("Please Check , some information are required !");
  }
};

const closecollapse = () => {
  if (staffstore.iscollapsed == false) {
    cleardata();
  }
};

const staffcreate = () => {
  const formData = new FormData();
  formData.append("id", staffstore.staffdata.id);
  formData.append("name", staffstore.staffdata.name);
  formData.append("nrc", staffstore.staffdata.nrc);
  formData.append("father_name", staffstore.staffdata.father_name);
  formData.append(
    "start_working_date",
    staffstore.staffdata.start_working_date
  );
  formData.append("dob", staffstore.staffdata.dob);
  formData.append("image", staffstore.staffdata.image);
  formData.append("depID", staffstore.staffdata.depID);
  formData.append("positionID", staffstore.staffdata.positionID);
  formData.append("educationID", staffstore.staffdata.educationID);
  formData.append("basic_salary", staffstore.staffdata.basic_salary);
  formData.append("address", staffstore.staffdata.address);

  console.log(staffstore.staffdata);
  axios
    .post("https://http://127.0.0.1:8000/api/staffs/create", formData, {
      headers: {
        Authorization: `Bearer ${authstore.loginData.token}`,
        Accept: "application/json",
      },
    })
    .then((res) => {
      if (res.data.message) {
        authstore.errornoti(res.data.message);
      } else {
        staffstore.loadstaffslist(res.data);
        cleardata();
      }
    });
};

const handleFileChange = (event) => {
  staffstore.staffdata.image = event.target.files[0];
};
</script>
