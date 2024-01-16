import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { toast } from "vue3-toastify";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";
import "vue3-toastify/dist/index.css";
export const useReservationStore = defineStore('ReservationStore', () => {
    const authstore=useCounterStore();
    const reservationtoggle = ref(true)
    
    const reservationData = reactive({
        rareCost: "",
        bonus: "",
        attendedBonus: "",
        busFee: "",
        mealDeduct: "",
        absence: "",
        ssbFee: "",
        fine: "",
        redeem: "",
        advance_salary: "",
        otherDeductLable: "",
        otherDeduct: "",
        staff_id: null,
        id: null,
        //reservation id
    });
    const clearData = () => {
        for (const key in reservationData) {
            reservationData[key] = ""
        }

         
    }

    const monthlyApi = "http://127.0.0.1:8000/api/reservation/add/monthly";
    const defaultApi = "http://127.0.0.1:8000/api/reservation/add/default";
    var apistring = ""

    
const addReservation=()=>{
    if(reservationtoggle.value){
      apistring=monthlyApi;
    }
    else{
      apistring=defaultApi;
    }
    
    axios.post(apistring,reservationData,{
      headers:{
        Authorization:`Bearer ${authstore.loginData.token}`,
        Accept:"application/json"
      }
    }).then((res)=>{
       if(res.message){
       noti(res.message)
       }
      
    })
     
  }
  const noti=(message)=>{
    authstore.notification(res.message)
  }

  const callReservation=(staffid)=>{
    
    axios.get("http://127.0.0.1:8000/api/reservation/load/monthly",{
      params:{staff_id:staffid},
      headers:{
        Authorization:`Bearer ${authstore.loginData.token}`,
        Accept:"application/json"
      }
    }).then((res)=>{
        // Assign staff_id
       
        if(res.data){
            Object.assign(reservationData,res.data)
        }
        console.log(res.data)
        reservationData.staff_id=staffid
       
    })
    
  }

    return { reservationtoggle, reservationData, clearData,addReservation , callReservation ,noti }
})
