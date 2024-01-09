<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-12">
        <form @submit.prevent="register">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              placeholder="text"
              required
              v-model="registerData.name"
            />
            <label for="floatingInput">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              v-model="registerData.email"
            />
            <label for="floatingInput">Email address</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              v-model="registerData.password"
            />
            <label for="floatingPassword">Password</label>
          </div>
          <div class="form-floating mb-3">
            <input
              type="password"
              class="form-control"
              id="floatingPassword"
              placeholder="ConfirmPassword"
              required
              v-model="registerData.confirm_password"
            />
            <label for="floatingPassword">Confirm Password</label>
          </div>
          <div class="form-floating">
            <select
              class="form-select"
              id="floatingSelect"
              aria-label="Floating label select example"
              v-model="registerData.dep"
            >
              <option selected></option>
              <option class="py-3" v-for="(dep , index) in pedStore.state.deps"
              :key="dep.id" :value="dep.id" >{{ dep.title }}</option>
               
            </select>
            <label for="floatingSelect">Department</label>
          </div>
          <div class="text-center">
            <button class="btn btn-secondary my-4 btn-lg w-100" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted ,reactive } from 'vue';
import { usepedStore } from '@/stores/pedStore';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios';
const pedStore=usepedStore()
const authstore=useCounterStore()
 

const registerData=reactive({
  email:"",
  name:"",
  password:"",
  confirm_password:"",
  dep:""
})

const register=()=>{
    axios.post("http://127.0.0.1:8000/api/staffs/register",registerData,{
      headers:{
        Authorization:`Bearer ${authstore.loginData.token}`,
        Accept:"application/json"
      }
    }).then((res)=>{
          authstore.notification("User "+res.data.user.name+" is registered")
    })
}

</script>

<style lang="scss" scoped></style>
