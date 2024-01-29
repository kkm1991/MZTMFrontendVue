import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import axios from 'axios';
import { useCounterStore } from './counter';
export const useSalaryStore = defineStore('salary', () => {
    const authstore=useCounterStore()
    const state=reactive({
        searchsalarylist:[],
        salaryReport:[]
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
     return {loadsalarylist,state,searchsalarylist,deletesalary,salaryReport}
})
