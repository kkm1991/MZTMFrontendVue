import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router'
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export const useStaffStore = defineStore('staff', () => {
    // ဝန်ထမ်းအသစ်ထဲ့ရန်အဖွင့်အပိတ်
    const iscollapsed = ref(true);

    const state=reactive({
        stafflist:[]
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
      
    const loadstaffslist=(list)=>{
        state.stafflist=list
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
