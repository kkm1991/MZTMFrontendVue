<template>
  <div>
    <button
      type="button"
      class="btn btn-light"
      data-bs-toggle="modal"
      data-bs-target="#exampleModal"
    >
      <i class="fa-regular fa-rectangle-list fs-2"></i>
    </button>
    <!-- iscollapsed အပေါ်မူတည်ပြီးအဖွင့်အပိတ်လုပ်ထားတယ် -->

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Reservation</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">

            <div class="form-floating">
              <input
                type="number"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
              />
              <label for="floatingPassword">Password</label>
            </div>

          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePaymentStore } from "@/stores/paymentstore";

const paymentStore = usePaymentStore();
</script>

<style lang="scss" scoped></style>
