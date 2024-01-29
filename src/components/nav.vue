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
        <li class="nav-item  mx-3  ">
          <RouterLink to="/home" class="nav-link" exact>Home</RouterLink>
        </li>
     
        <li class="nav-item dropdown   mx-3   ">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Salary
          </a>
          <ul class="dropdown-menu ">
            <li><router-link  to="/about" > <button class="custom-btn btn-12"><span>Click!</span><span>Payment</span></button> </router-link></li>
            <li><router-link  to="/salary" > <button class="custom-btn btn-12"><span>Click!</span><span>List</span></button></router-link></li>
            <li><router-link  to="/report" ><button class="custom-btn btn-12"> <span>Click!</span><span>Report</span></button></router-link></li>
          </ul>
        </li>
        <li class="nav-item dropdown   mx-3   ">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
           Reservation
          </a>
          <ul class="dropdown-menu ">
            <li><router-link  to="/monthlyReservation" ><button class="custom-btn btn-12"><span>Click!</span> <span>Monthly</span></button></router-link></li>
            <li><router-link  to="/defaultReservation" ><button class="custom-btn btn-12"><span>Click!</span><span>Default</span></button></router-link></li>
            
          </ul>
        </li>
        <li class="nav-item dropdown  mx-3   ">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            {{authstore.loginData.userInfo.name}}
          </a>
          <ul class="dropdown-menu">
            <li><button class="custom-btn btn-12 "  > <span>Click!</span><span>Profile</span></button></li>
             
            <li><hr class="dropdown-divider"></li>
            <li><button class="custom-btn btn-12" v-if="authstore.loginData.userInfo.role=='admin'" @click="router.push('/register')"><span>Click!</span> <span>Register</span></button></li>
            <li><button class="custom-btn btn-12 " @click="authstore.logout"><span>Click!</span> <span>Logout</span></button></li>
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
.nav-item.active a.nav-link,
.nav-item:hover a.nav-link {
  background-color: #82ddc0; /* Change this to your desired hover background color */
  color: #000000; /* Change this to your desired hover text color */
  border-radius: 5px;
}
</style>
