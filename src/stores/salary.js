import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios';
import { useCounterStore } from './counter';
export const useSalaryStore = defineStore('salary', () => {
    const authstore=useCounterStore()
    const state=reactive({
        searchsalarylist:[],
        salaryReport:[],
        salarySlip:[],
        hidetoggle:true//slip အတွက် salary.vue background ကိုဖျောက်ဖို.
    });
    
    const loadsalarylist=()=>{
        state.searchsalarylist.length=0
        axios.get('http://127.0.0.1:8000/api/salary/list',{
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            state.searchsalarylist.push(...res.data)
           
        })
    }
    const searchsalarylist=(date)=>{
        state.searchsalarylist.length=0
        axios.get('http://127.0.0.1:8000/api/salary/search',{
            params:{selectDate:date},
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            state.searchsalarylist.push(...res.data)
           
        })
    }

    const deletesalary=(deletesalarydata)=>{
        axios.get('http://127.0.0.1:8000/api/salary/delete',{
            params: deletesalarydata,
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            loadsalarylist()
           
        })
    }

    const salaryReport=(selectDate)=>{
        state.salaryReport.length=0
        axios.get("http://127.0.0.1:8000/api/salary/report",{
            params:{monthPicker:selectDate},
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            state.salaryReport.push(...res.data)
        })
    }

    const loadpayslip=(salaryid)=>{
        axios.get("http://127.0.0.1:8000/api/salary/slip",{
            params:{salaryId:salaryid},
            headers:{
                Authorization:`Bearer ${authstore.loginData.token}`,
                Accept:"application/json"
            }
        }).then((res)=>{
            state.salarySlip.length=0
            state.salarySlip.push(res.data)
            console.log(res.data)
        })
    }
     return {loadsalarylist,state,searchsalarylist,deletesalary,salaryReport,loadpayslip}
})
