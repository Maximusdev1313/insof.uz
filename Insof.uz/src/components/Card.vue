<template>
  <div class="wrapper">
    <div>
      <q-dialog v-model="alert">
        <CompModal :product="alert_product"/>
      </q-dialog>
    </div>
    <div class="product shadow-3" v-for="product,i in props.products" :key="i">
      <div class="product__main">
        
        <div v-if="product.chegirma_foizi!=null ?true :false" class="discount">
          <div class="discount__mark">Chegirma</div>
          <div class="discount__persent">{{product.chegirma_foizi}}%</div>
        </div>
        
        <div v-if="product.chegirma_foizi==null ?true :false" class=" h-40px w-100pr"></div>
        
        <router-link :to="'/detail/'+ product.id" class="product__link" @click="refresh(i)" >
          <q-img class="img"
            :src="product.rasmlari[0].link"
             height="160px" 
             alt="title" 
          />
        
          <div class="product__spacer">
            <div class="product__title text-h6 mt-10px">{{product.nomi}}</div>
          </div>
          <div class="product__spacer">
            <div class="product__prices row justify-center">
              <div v-if="product.chegirma_foizi==null ?true :false" class=" h-20px w-100pr"></div>
              <div v-if="product.eski_narx!=null ?true :false"  class="product__price none-discount pl-10px "> <del>{{product.eski_narx}} so'm</del> </div>
              <div  class="product__price with-discount mt-20px pl-10px "> {{product.narx}} so'm </div>
            </div>
          </div>
          <div class="product__spacer">
            <div class="product__description">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </div>
          </div>
        </router-link>
        <div class="product__spacer">
          <div class="button row justify-center">
            <q-btn 
              rounded 
              class="btn shadow-7 mb-20px"
              padding="10px 50px 10px 50px"
              @click="getAlertApi(i)"> 
              <q-icon name="shopping_cart" />
            </q-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";  
import CompModal from "./CompModal.vue";
import { useCounterStore } from "../stores/index";
  const store = useCounterStore();

  const props = defineProps({products: Array})
  const emits = defineEmits(["refresh"])

 // dialog oynasi uchun
  const alert_product = ref([])
  const alert=ref(false)
  function getAlertApi(i){
    alert_product.value=[]
    alert_product.value.push(props.products[i])
    alert.value=true
  }
   
  
  const id = ref('')
  const product=[]
  function refresh(i){
    product.value=props.products
    id.value=product.value[i].id
    emits("refresh" , id.value )
  }
</script>
<style lang="sass" scoped>
.wrapper
    width: 100%
    margin: 0 auto
    display: flex
    justify-content: space-between
    align-items: center
    flex-wrap: wrap
.product
    width: 200px
    //height: 400px
    border: 1px solid #fff
    // box-shadow: 5px 5px 5px 5px rgba(0,0,0, .15)
    border-radius: 10px
    margin: 20px auto
    // margin: 20px 20px 20px 0
.product__main
    width: 90%
    margin: 0 auto
    display: flex
    flex-direction: column
    justify-content: center
    // align-items: center
    // letter-spacing: 1em
    // line-height: 1.75em


.discount
    width: 100%
    // height: 35px
    display: flex
    justify-content: space-between
    align-items: center
    // background: linear-gradient(89.97deg, #33042e 52.52%, #8f1182 110.06%)
    color: #fff
    margin: 10px 0
.discount__mark, .discount__persent
    background-color: red
    padding: 0 10px
    border-radius: 10px
    text-align: center
.product__link
    width: 100%
    text-decoration: none
    color: black
.product__price
    width: 90%
    font-size: 1.1em
    font-weight: bold
.product__description
    width: 100%
    height: 70px
    margin-top: 10px
.with-discount
    // background: linear-gradient(89.97deg, #33042e 52.52%, #8f1182 110.06%)
    background-color: red
    border-radius: 5px
    color: #fff
.btn
    background: linear-gradient(89.97deg, #33042e 52.52%, #8f1182 110.06%)
    color: #fff

</style>
