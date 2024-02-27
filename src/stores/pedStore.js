import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { toast } from "vue3-toastify";
import { useCounterStore } from './counter';
import "vue3-toastify/dist/index.css";
import axios from 'axios';
export const usepedStore = defineStore('pedstore', () => {
    const state=reactive({
        positions:[],
        educations:[],
        deps:[]
    });
    const authStore=useCounterStore()
    const loadposition=(positionList)=>{
       
        state.positions=positionList
    }
    const loadpeducation=(educations)=>{
        
        state.educations=educations
    }
    const loadpdeps=(deps)=>{
        
        state.deps=deps
    }

    const editpostion=(postiondata)=>{
        
        axios.patch("http://127.0.0.1:8000/api/list/edit/position",postiondata,{
            headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadposition(res.data)
        })
    }
    const editeducation=(edudata)=>{
     
        axios.patch("http://127.0.0.1:8000/api/list/edit/education",edudata,{
            headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadpeducation(res.data)
        })
    }
    const editdep=(depdata)=>{
       
        axios.patch("http://127.0.0.1:8000api/list/edit/deps",depdata,{
            headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadpdeps(res.data)
        })
    }
     
    //add new
    const addpostion=(postiondata)=>{
        console.log(postiondata)
        axios.post("http://127.0.0.1:8000/api/list/add/position",{title:postiondata},{
            headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadposition(res.data)
        })
    }
    const addeducation=(edudata)=>{
         
        axios.post("http://127.0.0.1:8000/api/list/add/education",{title:edudata},{
            headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadpeducation(res.data)
        })
    }
    const adddeps=(depdata)=>{
        console.log(depdata)
        axios.post("http://127.0.0.1:8000/api/list/add/deps",{title:depdata},{
            headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadpdeps(res.data)
        })
    }

    //add end

    //delete start
    const deletepostion=(postiondata)=>{
        console.log(postiondata)
        axios.delete("http://127.0.0.1:8000/api/list/delete/position",{
            params:{id:postiondata},
            headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadposition(res.data)
        })
    }
    const deleteeducation=(edudata)=>{
         
        axios.delete("http://127.0.0.1:8000/api/list/delete/education",{
            params:{id:edudata},
            headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadpeducation(res.data)
        })
    }
    const deletedeps=(depdata)=>{
        console.log(depdata)
        axios.delete("http://127.0.0.1:8000/api/list/delete/deps",{
            params:{id:depdata},
            headers:{
                Authorization:`Bearer ${authStore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadpdeps(res.data)
        })
    }

     return {state,loadposition,loadpeducation,loadpdeps,editpostion,editdep,editeducation,adddeps,addeducation,addpostion,deletepostion,deleteeducation,deletedeps }
})
