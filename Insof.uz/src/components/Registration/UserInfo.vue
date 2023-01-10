<template >
  <div class="mb-30px">
    <div class="register">
      <p class="register__title">Персональные данные</p>
      <q-input
        outlined
        v-model="fname"
        label="Ismingiz"
        counter
        maxlength="30"
        class="mt-10px"
      />
      <q-input
        outlined
        v-model="tel_number"
        label="Raqamingiz"
        counter
        maxlength="13"
        class="mt-10px"
      />
      <q-input
        outlined
        v-model="adress"
        label="Manzilingiz"
        counter
        maxlength="100"
        class="mt-10px"
      />
      <q-input
        outlined
        v-model="comment"
        label="Izohingiz"
        type="textarea"
        counter
        maxlength="150"
        class="mt-10px"
      />
    </div>
    <div class="register__end row justify-around">
      <q-btn
        class="text-white bg-blue-grey-10 mt-30px"
        icon="location_on"
        label=" Lakatsiya olish  "
        @click="getLocation()"
      />

      <q-btn
        class="text-white bg-blue-grey-10 mt-30px"
        icon="send"
        :disable="disable_btn_send"
        label=" Buyurtma berish "
        @click="send()"
        to="/orderinfo"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { useCounterStore } from "src/stores/index"
const store = useCounterStore()
const fname = ref("")
const tel_number = ref("+998")
const adress = ref("")
const comment = ref("")

// lakatsiyani olish uchun
const location = ref([])
const latitude = ref("")
const longitude = ref("")
const user_position = ref("")
const disable_btn_send = ref(true)

const d = new Date();
let time = d.getTime();
let time_string  = time.toString()
let id
function getLocation() {
  try {
    navigator.geolocation.getCurrentPosition((position) => {
      location.value = position
      latitude.value = location.value.coords.latitude
      longitude.value = location.value.coords.longitude
      user_position.value = latitude.value + "," + longitude.value
      console.log(user_position.value)

      disable_btn_send.value = false
    })
  } catch (error) {
    alert(error)
    disable_btn_send.value = false
  }
}
// foydalanuvchi malumotlarini jo'natish
function sendUserInfo() {
  let random = Math.floor(Math.random() * 90) + 10 ;
  id = time_string.slice(7) + random
  console.log(id);
  // fetch("http://insofuzlast.pythonanywhere.com/user/", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({
  //     id: id,
  //     userName: fname.value,
  //     phoneNumber: tel_number.value,
  //     address: adress.value,
  //     comment: comment.value,
  //     location: user_position.value,
  //   }),
  // })
}

// maxsulotlarni jo'natish
function sendOrders(){
  store.Orders.forEach(el => {
    if(el.kilogramm>0){
      fetch("http://insofuzlast.pythonanywhere.com/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: el.nomi,
          weight: el.quantity,
          price: el.narx,
          total_price: el.narx * el.quantity,
          orderForUser: user_id.value,
        }),
      })
      console.log("klagram");
    }
    else if(el.litri>0){
      fetch("http://insofuzlast.pythonanywhere.com/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: el.nomi,
          quantity: el.quantity,
          litr:el.litri,
          price: el.narx,
          total_price: el.narx * el.quantity,
          orderForUser: user_id.value,
        }),
      })
      console.log("ichimlik");
    }
    else{
      fetch("http://insofuzlast.pythonanywhere.com/orders/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product_name: el.nomi,
          quantity: el.quantity,
          price: el.narx,
          total_price: el.narx * el.quantity,
          orderForUser: user_id.value,
        }),
      })
      console.log("donaki");
    }
  });
}

async function send() {
  sendUserInfo()

  // setTimeout(() => {
  //   sendOrders()
  // }, 500);

}
</script>
<style scoped>
.register__title {
  font-size: 32px
}
</style>
