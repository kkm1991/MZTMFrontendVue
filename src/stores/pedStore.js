import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export const usepedStore = defineStore('pedstore', () => {
    const state=reactive({
        positions:[""],
        educations:[""],
        deps:[""]
    });
    
    const loadposition=(positions)=>{
        state.positions=positions
    }
    const loadpeducation=(educations)=>{
        state.educations=educations
    }
    const loadpdeps=(deps)=>{
        state.deps=deps
    }
     
     return {state,loadposition,loadpeducation,loadpdeps }
})
