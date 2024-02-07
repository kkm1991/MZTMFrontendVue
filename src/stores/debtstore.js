import { ref, reactive,computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios';
import { useCounterStore } from './counter';
export const useDebtStore = defineStore('debt', () => {
    const authstore=useCounterStore()
    const state=reactive({
        debtrecords:[],
        
    });
    
    const loadrecord=(staff_id)=>{
        state.debtrecords.length=0
        axios.get('http://127.0.0.1:8000/api/debt/records',{
            params:{staff_id:staff_id},
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            state.debtrecords.push(...res.data)
           
        })
    }

    const loanlist = computed(() => {
        return state.debtrecords.filter(list=>list.type=="loan")
    })
    const paymentlist = computed(() => {
        return state.debtrecords.filter(list=>list.type=="payment")
    })
    
    const paymenttotal=computed(()=>{
        return paymentlist.value.reduce((total,list)=>total+(list['amount'] || 0),0)
    })
    const loantotal = computed(() => {
        return loanlist.value.reduce((total,list)=>total+(list['amount'] || 0),0)
    })
     return {loadrecord ,state,loanlist,paymentlist,paymenttotal,loantotal}
})
