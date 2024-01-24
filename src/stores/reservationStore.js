import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
import { useCounterStore } from "@/stores/counter";

export const useReservationStore = defineStore('ReservationStore', () => {
  const authstore = useCounterStore();
  const reservationtoggle = ref(true) // monthly or default reservation ဟုတ်မဟုတ် ဒီtoggle နဲ့ထိန်း
  const Reservation = reactive({
    defaultreservationlist: [],
    monthlyreservationlist: [],
  });
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

   
  const loadMonthlyReservation=()=>{
    reservationtoggle.value=true;
    Reservation.monthlyreservationlist.length=0;
    axios.get("http://127.0.0.1:8000/api/reservation/list/monthly",{
      headers:{
        Authorization:`Bearer ${authstore.loginData.token}`,
        Accept:"application/json"
      }
    }).then((res)=>{

      Reservation.monthlyreservationlist.push(...res.data)

    })

  }

  const searchMonthlyReservation=(date)=>{
    console.log(date)
    reservationtoggle.value=true;
    Reservation.monthlyreservationlist.length=0;
    axios.get("http://127.0.0.1:8000/api/reservation/search/monthly",{
      params:{selectDate:date},
      headers:{
        Authorization:`Bearer ${authstore.loginData.token}`,
        Accept:"application/json"
      }
    }).then((res)=>{

      Reservation.monthlyreservationlist.push(...res.data)
      // console.log(res.data)
    })
  }

  const loadDefaultReservation = () => {
    reservationtoggle.value = false;
    Reservation.defaultreservationlist.length = 0
    axios.get("http://127.0.0.1:8000/api/reservation/load/default", {
      headers: {
        Authorization: `Bearer ${authstore.loginData.token}`,
        Accept: "application/json"
      }
    }).then((res) => {
      Reservation.defaultreservationlist.push(...res.data)
    })
  }
const updateMonthlyReservation=(updateReservationData)=>{
  axios.post("http://127.0.0.1:8000/api/reservation/update/monthly",updateReservationData,{
    headers:{
      Authorization:`Bearer ${authstore.loginData.token}`,
      Accept:"application/json"
    }
  })
  loadMonthlyReservation()
}

  const updateDefaultReservation=(updateReservationData)=>{
      axios.post("http://127.0.0.1:8000/api/reservation/update/default",updateReservationData,{
        headers:{
          Authorization:`Bearer ${authstore.loginData.token}`,
          Accept:"application/json"
        }
      })
      loadDefaultReservation()
  }

  const addReservation = () => {
    const monthlyApi = "http://127.0.0.1:8000/api/reservation/add/monthly";
    const defaultApi = "http://127.0.0.1:8000/api/reservation/add/default";
    var apistring = ""
    if (reservationtoggle.value) {
      apistring = monthlyApi;
    }
    else {
      apistring = defaultApi;
    }

    axios.post(apistring, reservationData, {
      headers: {
        Authorization: `Bearer ${authstore.loginData.token}`,
        Accept: "application/json"
      }
    }).then((res) => {
      if (res.message) {
        noti(res.message)
      }

    })

  }



  const noti = (message) => {
    authstore.notification(res.message)
  }

  //staffid ကို Payment.vue ကနေ  props နဲ့ addReservation.vue component ပေးလိုက်တာကို const staffid = defineProps(['staffid']); ဖမ်းပြီး ဒီ method မှာယူသုံး
  const callReservation = (staffid) => {

    axios.get("http://127.0.0.1:8000/api/reservation/load/monthly", {
      params: { staff_id: staffid },
      headers: {
        Authorization: `Bearer ${authstore.loginData.token}`,
        Accept: "application/json"
      }
    }).then((res) => {


      if (res.data) {
        Object.assign(reservationData, res.data)
        console.log(res.data)
      }
      else {

      }
      // Assign staff_id
      reservationData.staff_id = staffid

    })

  }

  return { reservationtoggle, reservationData,loadMonthlyReservation, clearData, addReservation, callReservation, noti, Reservation ,loadDefaultReservation ,updateDefaultReservation,updateMonthlyReservation,searchMonthlyReservation}
})
