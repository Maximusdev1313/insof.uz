<template >
  <q-card style="width: 700px; max-width: 80vw;">
    <q-card-section>
      <div class="text-h6">Bo'lib to'lash</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      <div class="  row  justify-between items-start content-between">
        <div class="modal__img">
          <q-img
            :src="props.product[0].rasmlari[0].link">
          </q-img>
        </div>
        <div class="modal__text">
          <p class="p-1">{{props.product[0].nomi}}</p>
          <p v-if="props.product[0].eski_narx > 0 ?true :false" style="color: #999999;"> Narxi: <del> {{props.product[0].eski_narx}} so'm</del></p>
          <p style="color: #999999;">Narxi: <span> {{props.product[0].narx}} so'm</span></p>          
        </div>
        <div class="modal__sena ">
          <div class="modal__sena--active  row  justify-between">
            <div><q-btn @click="decrement()" >-</q-btn></div>
            <div class=" row items-center"> <span>{{quantity}}</span> </div>
            <div><q-btn @click="increment()" >+</q-btn></div>
          </div>
          <div class="q-mt-md">
            <span>  {{props.product[0].narx * quantity}} so'm</span>
          </div>
        </div>
      </div>
    </q-card-section>

    <q-card-actions align="right" class="bg-white text-teal">
      <q-btn @click="addOrders()" flat label="OK" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<script setup >
import { ref } from 'vue'
import { useCounterStore } from "../stores/index"
  const store = useCounterStore()

  const props=defineProps({
    product: Array
  })

  const product=[]
  product.value=props.product
  
  

  // maxsulot miqdorini aniqlash
  let quantity=ref(1)

  store.Orders.forEach(element => {
    if(element.id==product.value[0].id){
      quantity.value=element.quantity
    }
    console.log(" comp modal  foreach 1 ");
  })
  
  // maxsulotni sonini qo'shish
  function increment(){
    if(quantity.value<20){
      quantity.value++
    }
  }
  // maxsulotni sonini ayrish
  function decrement(){
    if(quantity.value>1){
      quantity.value--
    }
  }
// store.orders ga ma'lumot qo'shish 
  function addOrders(){
    
    const order={
      id:product.value[0].id,
      quantity:quantity.value,
      nomi:product.value[0].nomi,
      narx:product.value[0].narx,
      chegirma_foizi:product.value[0].chegirma_foizi,
      eski_narx:product.value[0].eski_narx,
      rasmlari:product.value[0].rasmlari,
      kilogramm:product.value[0].kilogramm,
      litri:product.value[0].litri,
      soni:product.value[0].soni
    }
    // maxsulot oldin qo'shilgan yoki qo'shilganligini tekshirish
    let check
    check = store.Orders.some(function(elem){
      return elem.id == product.value[0].id
    })
    // maxsulot oldin qo'shilgan bo'lsa uni yangi qiymatini o'rnatish
    if(check){
      store.Orders.forEach(element => {
        if(element.id==product.value[0].id){
          element.quantity=quantity.value
        }
        console.log(" comp modal  foreach 2 ");
      })
    }
    else{
      store.Orders.push(order)
      console.log(store.Orders);
    }
    store.ALL_PRINCE_CALCULATION()
  }

</script>
<style scoped lang="sass">
.modal__img
  width: 120px
  height: 120px
.modal__text
  width: 300px
  height: auto
.modal__sena
  width: 200px
  height: auto
.button__active--2
    font-size: 12px
    border-radius: 18px
    padding: 7px 8px
    border: none
    background: #12BF6C
    color: #fff
    border: 1px solid #12BF6C
    transition:  0.5s ease
.button__active--2:hover
    background: #fff
    color: #12BF6C
    border:1px solid #12BF6C
    cursor: pointer
.p-1
  color: #111
  font-weight: 500
.modal__sena--active
  width: 120px
  height: 38px
  border: 1px solid #111
  .q-btn:before
    box-shadow: none
</style>