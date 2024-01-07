import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export const useStaffStore = defineStore('staff', () => {
    const state=reactive({
        stafflist:[]
    });
    
    const loadstaffslist=(list)=>{
        state.stafflist=list
    }
     
     return {state,loadstaffslist }
})
