import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useCounterStore } from './counter';
import axios from 'axios';
export const useStaffStore = defineStore('staff', () => {

    const authstore=useCounterStore()
    // ဝန်ထမ်းအသစ်ထဲ့ရန်အဖွင့်အပိတ်
    const iscollapsed = ref(true);

    const state=reactive({
        stafflist:[],
        
    });
    
    const staffdata = reactive({
        id:null,
        name: "",
        father_name: "",
        start_working_date: "",
        nrc:"",
        dob: "",
        image: null,
        depID: "",
        positionID: "",
        educationID: "",
        basic_salary: "",
        address: "",
      });
      



      

    const loadstaffslist=()=>{
        const loadlistdata = {
            key: authstore.loginData.userInfo.dep,
          };
          //အကယ်ရဲ့ login ဝင်ထားတဲ့သူက admin ဆိုရင်အကုန်လုံးပြမယ် user ဆိုရင် သူနဲ့ဆိုင်တဲ့ dep ရဲ့ဝန်ထမ်းလစာပေးစာရင်းပဲပြမယ်
          if (authstore.loginData.userInfo.role == "admin") {
            loadlistdata.key = null;
          }
        
          axios
            .get("http://127.0.0.1:8000/api/staffs/list", {
              params: loadlistdata,
              headers: {
                Authorization: `Bearer ${authstore.loginData.token}`,
                Accept: "application/json",
              },
            })
            .then((res) => {
                state.stafflist=res.data
            });
        
       
    }
     
    const toeditstaff=(staffinfo)=>{
        staffdata.id=staffinfo.id
        staffdata.name = staffinfo.name,
        staffdata.father_name = staffinfo.father_name,
        staffdata.depID = staffinfo.depID,
        staffdata.nrc =staffinfo.nrc,
        staffdata.positionID = staffinfo.positionID,
        staffdata.educationID = staffinfo.educationID,
        staffdata.basic_salary = staffinfo.basic_salary,
        staffdata.address = staffinfo.address,
        staffdata.dob = staffinfo.dob,
        staffdata.start_working_date = staffinfo.start_working_date
    
        iscollapsed.value=false
    }
    
    
     
     return {state,loadstaffslist,staffdata,iscollapsed,toeditstaff}
})
