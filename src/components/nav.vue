<template>
  <nav class="navbar navbar-expand-lg shadow-sm mx-2 p-3   logoutpos" v-if="authstore.loginstatus">
    <a class="navbar-brand" href="#"
      ><img
        alt="Vue logo"
        class="logo"
        src="@/assets/bsmlogo.png"
        width="75"
        height="75"
    /></a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ml-auto">
        <li class="nav-item active mx-3  ">
          <RouterLink to="/home" class="nav-link">Home</RouterLink>
        </li>
        <li class="nav-item mx-3 ">
          <RouterLink to="/about" class="nav-link">Salary Payment</RouterLink>
        </li>
        <li class="nav-item dropdown mx-3   ">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Reservation
          </a>
          <ul class="dropdown-menu mx-3 ">
            <li><a class="dropdown-item my-3 " href="#">Monthly Reservation</a></li>
            <router-link class="dropdown-item my-3" to="/defaultReservation">Default Reservation</router-link>
            
          </ul>
        </li>
        <li class="nav-item dropdown  mx-3   ">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{authstore.loginData.userInfo.name}}
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Profile Edit</a></li>
             
            <li><hr class="dropdown-divider"></li>
            <li><button class="btn col-11 btn-light text-dark m-1 " v-if="authstore.loginData.userInfo.role=='admin'" @click="router.push('/register')">Register</button></li>
            <li><button class="btn col-11 btn-outline-danger m-1 " @click="authstore.logout">Logout</button></li>
          </ul>
        </li>
         
      </ul>
    </div>
   
  </nav>
  
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "@/stores/counter";
import { useRouter } from "vue-router";
const router=useRouter()
const authstore=useCounterStore()
</script>

<style lang="scss" scoped>
.logoutpos {
  margin-left:auto;
}
</style>
