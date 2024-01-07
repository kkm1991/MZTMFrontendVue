<template>
  
  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <img
        alt="Vue logo"
        class="logo"
        src="@/assets/bsmlogo.png"
        width="200"
        height="200"
    />
    <div class="col-md-6 col-lg-4 m-3">
      <div class="form-floating mb-3">
        <input
          type="email"
          class="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          v-model="obj.email"
        />
        <label for="floatingInput">Email address</label>
      </div>
      <div class="form-floating">
        <input
          type="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="obj.password"
        />
        <label for="floatingPassword">Password</label>
      </div>

      <button class="btn btn-primary w-100 mt-4" @click="login()">Login</button>
    </div>
     
      
     
  </div>
</template>

<script setup>
import { ref,reactive } from 'vue';
import { useCounterStore } from '@/stores/counter';
import axios from 'axios'
import { useRouter } from 'vue-router';
 

const authstore=useCounterStore()
const router=useRouter()
 const obj = reactive({
   email:"",
   password:""
 })

const login= ()=>{
    axios.post('http://127.0.0.1:8000/api/login',obj).then((res)=>{
      if(res.data.token==null){
          
         authstore.errornoti(res.data.message)
         authstore.logout()
         authstore.loginstatus=false
      }
      else{
        authstore.setToken(res.data.token)
        authstore.setuserInfo(res.data.user)
        authstore.loginstatus=true
        router.push('/home')
      }
    }).catch((error)=>{
      authstore.errornoti(error)
       
        authstore.logout()
        authstore.loginstatus=false
    }) 
}

 

</script>

<style lang="scss" scoped>
  /* Add custom styles if needed */
</style>
