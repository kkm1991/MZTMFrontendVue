<template>
    <div class="text-center">
        <div class="row">
            <div class="col"><button class="btn btn-outline-light text-dark" @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"><i class="fa-solid fa-angles-left fs-3  "></i></button></div>
            <div class="col fs-4"><span>{{ currentPage }}</span></div>
            <div class="col"><button class="btn btn-outline-light text-dark" @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"><i class="fa-solid fa-angles-right fs-3"></i></button> </div>
        </div>
        
    
     
    </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const { currentPage, totalPages, goToPage } = defineProps(['currentPage', 'totalPages', 'goToPage']);
</script>

<style lang="scss" scoped>

</style>