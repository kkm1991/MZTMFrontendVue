<template>
  <nav class="navbar navbar-expand-lg shadow-sm mx-2 p-3 navbar-custom" v-if="authstore.loginstatus">
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
        <li class="nav-item active">
          <RouterLink to="/home" class="nav-link">Home</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about" class="nav-link">About</RouterLink>
        </li>
      </ul>
      <ul class="navbar-nav ml-auto">
        <li class="nav-item">
          <button class="btn btn-outline-danger" @click="authstore.logout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useCounterStore } from "@/stores/counter";

const authstore=useCounterStore()
</script>

<style lang="scss" scoped>
.navbar-nav {
  margin-left: auto;
}
</style>
