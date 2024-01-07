import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export const useCounterStore = defineStore('counter', () => {
   //auth
    const loginstatus=ref(false)

    const loginData=reactive({
      token:localStorage.getItem('token')||null,
      userInfo:localStorage.getItem('userInfo')||null
    })

    const setToken=(token)=>{
      loginData.token=token
      localStorage.setItem('token',token)
    }
    const setuserInfo=(userinf)=>{
      loginData.userInfo=userinf
      localStorage.setItem('userInfo',JSON.stringify(userinf))
    }
    const logout=()=>{
      loginData.token=null
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      loginstatus.value=false
      router.push({
        name:"Login"
      })
    }
    const notification=(message)=>{
      toast.info(message,{
        position:"top-right",
        autoClose:3000,
        closeOnClick:true
      })
    }
    const errornoti=(message)=>{
      toast.error(message,{
        position:"top-right",
        autoClose:3000,
        closeOnClick:true
      })
    }
    
     
     return {loginstatus ,loginData ,setToken,setuserInfo ,logout, notification ,errornoti}
})
