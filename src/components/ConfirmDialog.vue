<template>
    <div>
        <div v-if="visible" class="confirm-dialog card">
    <div class="dialog-content">
      <p class="text-white fs-5">{{ message }}</p>
      <button class="btn btn-success  me-3" @click="confirm">Confirm</button>
      <button class="btn btn-danger   " @click="cancel">Cancel</button>
    </div>
  </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const {message,onConfirm,onCancle}=defineProps(['message','onConfirm','onCancle'])
const visible=ref(true);

const confirm=()=>{
     onConfirm();
    visible.value=false;
}
const cancel=()=>{
    onCancle();
    visible.value=false
}
</script>

<style lang="scss" scoped>
/* Add your custom styles for the dialog */
.confirm-dialog {
    position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(42, 41, 41, 0.3)!important;;
  padding: 40px; /* Increased padding */
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 400px; /* Fixed width */
  max-width: 90%; /* Add a max-width for responsiveness */
  text-align: center;
}

.dialog-content {
  text-align: center;
}
</style>