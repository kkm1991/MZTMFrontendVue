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
 