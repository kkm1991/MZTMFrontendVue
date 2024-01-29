<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/nav.vue';
 
</script>

<template >
  <main  >
    <header class="mb-3"> 
      <Nav></Nav>
  </header>
  <body  >
    <RouterView  />
  </body>
  <footer></footer>
  </main>
  
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
 