<script setup>
import { useCounterStore } from '@/stores/counter';
import { ref ,onMounted} from 'vue';
const authstore=useCounterStore()

 onMounted(() => {
  authstore.notification('Welcome '+authstore.loginData.userInfo.name)
 })
</script>

<template>
  <main class="m-3 ">
    <table class="table table-striped">
       <thead>
        <tr>
          
        </tr>
       </thead>
    </table>
  </main>
</template>
