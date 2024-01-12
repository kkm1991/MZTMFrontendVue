import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios';
import { useCounterStore } from './counter';
export const usePaymentStore = defineStore('payment', () => {
    const authstore=useCounterStore()
    const state=reactive({
        staffpaymentlist:[]
    })

    

    const loadpaymentlist=()=>{
        axios.get("http://127.0.0.1:8000/api/staffs/payment",{
            params:{key:1},
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        } 
        ).then((res)=>{
            console.log(res.data)
            state.staffpaymentlist=res.data
        })
    }
     return {state,loadpaymentlist}
})
