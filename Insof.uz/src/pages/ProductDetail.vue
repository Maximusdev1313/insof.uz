<template>
  <div>
    <div>
      <q-dialog v-model="type_alert">
        <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">{{ product.nomi}}</div>
        </q-card-section>

        <q-card-section class="q-pt-none text-center">
          {{quantity}} kg qo'shildi
        </q-card-section>
      </q-card>
      </q-dialog>
    </div>
    <div class="container">
      <h1 class="title">{{ product.nomi}}</h1>
      <div class="content  row  justify-between items-start content-start">
        <div class="card">
          <div class="card__carusel">
            <comp-carusel :img_api="product.rasmlari" />
          </div>
        </div>
        <div class="picture">
          <div class="picture__card">
            <p v-if="product.eski_narx >=1 ?true :false" class="picture__number--active text-h5"> Narxi: <del>{{ product.eski_narx}} so'm</del> </p>
              <p class="picture__number--active text-h5"> Narxi:{{ product.narx}} so'm </p>
              <p class="text-weight-bold">Mahsulot haqida qisqacha</p>
              <p style="color: #333;">Kafolat muddati (oy): 12</p>
              <p style="color: #8a8a8a; font-size: 0.8rem ; text-align: left;">Ta'sirchan suratga olish sifati 108 megapikselli asosiy kamera 1/1,52 dyuymli Samsung HM2 sensori bilan jihozlangan va katta 2,1 mkm pikselni ta'minlovchi 9-in-1 pikselni birlashtirish texnologiyasini qo'llab-quvvatlaydi. Ikkilamchi mahalliy ISO bilan siz past yorug'lik sharoitida ham shovqinni kamaytiradigan aniq va teksturali tasvirlarni olishingiz mumkin. Shuningdek, u 108 megapikselli tasvirlarni to‘g‘ridan-to‘g‘ri chiqarish imkonini beradi, shu bilan birga ko‘proq tafsilotlarni saqlab qoladi, bu esa yaxshiroq kompozitsiya uchun masshtablash yoki kesish uchun qulaydir.</p>
          </div>
          <div class="button  row  justify-between items-start content-start q-mt-lg" style="box-sizing: border-box;">
            <div class="modal__sena--active  row  justify-between">
              <div><q-btn @click="decrement()" >-</q-btn></div>
              <div class=" row items-center"> <span>{{quantity}}</span> </div>
              <div><q-btn @click="increment()" >+</q-btn></div>
            </div>
            
            <button @click="addOrders()" class="button__active">Savatchaga qo'shish</button>
          </div>
          <div class="mt-20px">
            <span class="fs-18px"> Umumiy Narxi: {{ product.narx * quantity }} so'm </span>
          </div>
        </div>
  
          <div class="reklama">
              <!-- reklama uchun joy -->
          </div>
      </div>

    </div>
    <div class="title-pro mt-30px">
      O'xshash mahsulotlar
    </div>
    <Suspense>
      <Card :products=" products" @refresh="refresh" />
    </Suspense>
  </div>
</template>
<script setup>
  import Card from 'src/components/Card'
  import CompCarusel from '../components/СompCarusel'
  import { useRoute } from 'vue-router';
  import { useCounterStore } from "../stores/index";
  import { ref } from "vue"

  
  const store = useCounterStore();
  let id = useRoute().params.id
  const product = ref([])
  const type_alert = ref(false)

  // maxsulot miqdorini aniqlash
  function checkQuantity(){
    store.Orders.forEach(element => {
      if(element.id==product.value.id){
        quantity.value=element.quantity
      }
      console.log(" product detail  foreach 1 ");
    })
  } 
  //  maxsulotni topib olish uchun 

  let getfild  = setInterval(() => { 
    if(store.ProductsApi.length>0){
      product.value=store.ProductsApi[id-1]
      clearInterval(getfild)
      checkQuantity()
    }   
    console.log(" product detail  setInterval 1 ");
  }, 500);

  // o'xshash maxsulotlarni filter qilish 
  const products=ref([])
  function getProduct(){
    products.value=store.ProductsApi.filter(function(elem){
      return elem.mahsulot==product.value.mahsulot
    })
  }
  // bekentdan malumot kelgandan keyin getProduct funksiyasini ishlatish uchun
  let gettesting  = setInterval(() => { 
    if(store.ProductsApi.length>0){
      getProduct()
      clearInterval(gettesting)
    }   
  }, 500);
// malumotlarni yangilash uchun
  function refresh(id){
    let getfild  = setInterval(() => { 
      if(store.ProductsApi.length>0){
        product.value=store.ProductsApi[id-1]
        clearInterval(getfild)
      }   
      console.log(" product detail  setInterval 2 ");
    }, 100);
  }
// maxsulot sonini qo'shish
  let quantity=ref(1)
  
  function increment(){
    if(quantity.value<20){
      quantity.value++
    }
  }
// maxsulot sonini ayrish
  function decrement(){
    if(quantity.value>1){
      quantity.value--
    }
  }

  // store.orders ga ma'lumot qo'shish 
  function addOrders(){
    const order={
      id:product.value.id,
      quantity:quantity.value,
      nomi:product.value.nomi,
      narx:product.value.narx,
      chegirma_foizi:product.value.chegirma_foizi,
      eski_narx:product.value.eski_narx,
      rasmlari:product.value.rasmlari,
      kilogramm:product.value.kilogramm,
      litri:product.value.litri,
      soni:product.value.soni
    }

    let check
    check = store.Orders.some(function(elem){
      return elem.id==product.value.id
    })
    
    if(check){
      store.Orders.forEach(element => {
        if(element.id==product.value.id){
          element.quantity=quantity.value
        }
        console.log(" product detail  foreach 2 ");
      })
    }
    else{
      store.Orders.push(order)
      console.log(store.Orders);
    }
    store.ALL_PRINCE_CALCULATION()
    type_alert.value=true
    setTimeout(() => {
      type_alert.value=false
    }, 1500);
  }

</script>
<style scoped>

  .title-pro{
    font-size: 1.875rem;
    font-weight: 560;
  }
  .title {
    font-size: 1.875rem;
    font-weight: 560;
    line-height: 2.25rem;
    box-sizing: border-box;
  }

  .content {
    width: 100%;
    height: 100%;
    /* background: rgb(229, 223, 223); */
  }

  .card {
    width: 360px;
    height: 100%;
    /* background: red; */
  }

  .card__carusel {
    width: 100%;
    height: 40%;
  }
  .picture{
    width: 400px;
    height: 100%;
    /* background: blue; */
  }
  .reklama{
    width: 360px;
    /* background: yellow; */
    border: 2px solid black;
  }
  .button__active{
    font-size: 12px;
    border-radius: 18px;
    padding: 7px 8px;
    border: none;
    background: #EB1537;
    border:1px solid #EB1537;
    color: #fff;
    transition:  0.5s ease;
  }
  .button__active--2{
    font-size: 12px;
    border-radius: 18px;
    padding: 7px 8px;
    border: none;
    background: #12BF6C;
    color: #fff;
    border: 1px solid #12BF6C ;
    transition:  0.5s ease;
  }
  .button__active--3{
    font-size: 12px;
    border-radius: 18px;
    padding: 7px 8px;
    border: none;
    background: #333;
    color: #fff;
    border: 1px solid #333;
    transition:  0.5s ease;
  }
  .button__active:hover{
    background: #fff;
    color: #EB1537;
    border:1px solid #EB1537;
    cursor: pointer;
  }
  .button__active--2:hover{
    background: #fff;
    color: #12BF6C;
    border:1px solid #12BF6C;
    padding: 7px 8px;
    cursor: pointer;
  }
  .button__active--3:hover{
    background: #fff;
    color: #333;
    border:1px solid #333;
    padding: 7px 8px;
    cursor: pointer;
  }
  .product__quantity {
    width: 120px;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-radius: 50px;
    border: solid 1px grey;
    box-shadow: 0px 0px 8px 0px grey;
  }
  .quantity {
    font-size: 18px;
  }
  .modal__sena--active{
    width: 120px;
    height: 38px;
    border: 1px solid #111;
  }
  .q-btn:before{
    box-shadow: none;
  }

</style>
