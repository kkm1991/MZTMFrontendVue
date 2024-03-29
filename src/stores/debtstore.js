import { ref, reactive,computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios';
import { useCounterStore } from './counter';
import { useStaffStore } from './staffstore';

export const useDebtStore = defineStore('debt', () => {
    const authstore=useCounterStore()
    const staffstore=useStaffStore()
    const state=reactive({
        debtrecords:[],
        staffid:null,
       
    });
    const data=reactive({
        loandata:{
            staff_id:null,
            type:null,
            amount:null,
            description:null
        }
    })
     

    const loadrecord=(staff_id)=>{
        state.debtrecords.length=0
         state.staffid=staff_id
        axios.get('http://127.0.0.1:8000/api/debt/records',{
            params:{staff_id:staff_id},
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
         if(res.data.message){
            console.log(res.data)
         }
         else{
            state.debtrecords.push(...res.data)
         }
         
        })
    }

    const addLoan=()=>{
        
        axios.post("http://127.0.0.1:8000/api/debt/add/loan",data.loandata,{
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
           
       
          loadrecord(state.staffid)
          staffstore.loadstaffslist()

          data.loandata.staff_id=null
          data.loandata.type=null
          data.loandata.amount=null
          data.loandata.description=null
         
        }).catch((error)=>{
            authstore.errornoti(error)
        })
    }

    const deleteloan=(loanid)=>{
        axios.delete("http://127.0.0.1:8000/api/debt/delete/loan",{
            params:{id:loanid},
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
             
            loadrecord(state.staffid)
            staffstore.loadstaffslist()
        })
    }

    const updateloan=(record)=>{
        const updatedata={
            id:record.id,
            type:record.type,
            staff_id:record.staff_id,
            created_at:record.created_at,
            amount:record.amount,
            description:record.description
        }
        console.log(updatedata)
        axios.patch("http://127.0.0.1:8000/api/debt/update/loan",updatedata,{
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadrecord(state.staffid)
            staffstore.loadstaffslist()
        })
    }

    const name = computed(() => {
      const  staff=staffstore.state.stafflist.filter(list=>list.id===state.staffid)
      //array အခန်:နဲ့ခေါ်လို.အဆင်မပြေလို.
      return staff && staff.length > 0 ? staff[0].name : ''; 
    })
    
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
     return {loadrecord ,state,loanlist,paymentlist,paymenttotal,loantotal,name,addLoan,data,deleteloan,updateloan}
})
