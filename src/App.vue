<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/nav.vue';
 
</script>

<template >
  <div class="custom-background">
    <header class="mb-3"> 
      <Nav></Nav>
  </header>
  <body class="custom-background" >
    <RouterView  />
  </body>
  </div>
  
</template>
 
<!-- App.vue or main.js -->
<style>
/* Add styles to hide navbar during printing */
@media print {
  .navbar {
    visibility: hidden;
    position: absolute;
    top: -9999px; /* Move it off the screen */
  }
}
</style>
 