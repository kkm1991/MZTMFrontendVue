<template>
  <div>
    <button
      type="button"
      class="btn btn-light"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
      @click="reservationStore.callReservation(staffid.staffid)"
    >
      <i class="fa-regular fa-rectangle-list text-primary fs-2"></i>
    </button>
    <!-- iscollapsed အပေါ်မူတည်ပြီးအဖွင့်အပိတ်လုပ်ထားတယ် -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      ref="myModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">ကြိုတင်ငွေစာရင်း Staff-id {{reservationStore.reservationData.staff_id}}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="reservationStore.clearData"
             
            ></button>
          </div>

          <div class="modal-body">
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.rareCost"
              />
              <label for="floatingPassword" class="text-success"
                >ရှားပါးစရိတ်</label
              >
            </div>
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.bonus"
              />
              <label for="floatingPassword" class="text-success"
                >ချီးမြင့်ငွေ</label
              >
            </div>
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.attendedBonus"
              />
              <label for="floatingPassword" class="text-success"
                >ရက်မှန်ကြေး</label
              >
            </div>
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.busFee"
              />
              <label for="floatingPassword" class="text-success">ကားခ</label>
            </div>
            <hr />
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.mealDeduct"
              />
              <label for="floatingPassword " class="text-danger"
                >ထမင်းဖိုးဖြတ်</label
              >
            </div>
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.absence"
              />
              <label for="floatingPassword " class="text-danger"
                >အလုပ်ပျက်ရက်နူတ်</label
              >
            </div>
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.ssbFee"
              />
              <label for="floatingPassword " class="text-danger"
                >လူမှု့ဖူလုံရေး</label
              >
            </div>
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.fine"
              />
              <label for="floatingPassword " class="text-danger">ဒဏ်ကြေး</label>
            </div>
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.redeem"
              />
              <label for="floatingPassword " class="text-danger"
                >ချေးငွေဆပ်</label
              >
            </div>
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.advance_salary"
              />
              <label for="floatingPassword " class="text-danger"
                >လစာကြိုထုတ်</label
              >
            </div>
            <div class="form-floating mb-2">
              <input
                type="text"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.otherDeductLable"
              />
              <label for="floatingPassword " class="text-danger"
                >အခြားခေါင်းစဉ်</label
              >
            </div>
            <div class="form-floating mb-2">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                v-model="reservationStore.reservationData.otherDeduct"
              />
              <label for="floatingPassword " class="text-danger"
                >အခြားနှုတ်ငွေ</label
              >
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
                  aria-label="Close"
                  @click="reservationStore.clearData"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="reservationStore.addReservation">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePaymentStore } from "@/stores/paymentstore"; 
import {useReservationStore} from "@/stores/reservationStore"
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

//stores
const paymentStore = usePaymentStore();

const reservationStore=useReservationStore();
//true ဆိုရင် monthly reservation ၊ false ဆိုရင် default reservation ကိုစာရင်းသွင်းမယ်
 
//props ပြန်ဖမ်းတာ
const staffid = defineProps(['staffid']);
 
 
</script>

<style lang="scss" scoped></style>
