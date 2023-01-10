<template>
  <q-page class="">
    <Carusel />
    <div class="heading text-h4">Kartegoriyalar</div>
    <CategoryCards class="mt-20px" />
    <div class="w-100pr">
      <div class="heading text-h4 q-mt-xl">Chegirmalar</div>
      <div
        v-if="store.ProductsApi.length < 1 ? true : false"
        class="w-100pr h-300px row justify-center items-center"
      >
        <q-circular-progress
          indeterminate
          size="75px"
          :thickness="0.22"
          rounded
          color="blue"
          track-color="grey-3"
          class="q-ma-md"
        />
      </div>
      <Suspense>
        <Card :products="discount_products" />
      </Suspense>
    </div>
    <div class="w-100pr">
      <div class="heading text-h4 q-mt-xl">Mega chegirmalar Chegirmalar</div>
      <div
        v-if="store.ProductsApi.length < 1 ? true : false"
        class="w-100pr h-300px row justify-center items-center"
      >
        <q-circular-progress
          indeterminate
          size="75px"
          :thickness="0.22"
          rounded
          color="blue"
          track-color="grey-3"
          class="q-ma-md"
        />
      </div>
      <Suspense>
        <Card :products="mega_discount_products" />
      </Suspense>
    </div>
    <div class="w-100pr">
      <div class="heading text-h4 q-mt-xl">Siz uchun kerakli maxsulotlar</div>
      <div
        v-if="store.ProductsApi.length < 1 ? true : false"
        class="w-100pr h-300px row justify-center items-center"
      >
        <q-circular-progress
          indeterminate
          size="75px"
          :thickness="0.22"
          rounded
          color="blue"
          track-color="grey-3"
          class="q-ma-md"
        />
      </div>
      <Suspense>
        <Card :products="necessary_products" />
      </Suspense>
    </div>
  </q-page>
</template>

<script setup>
import Carusel from "../components/Carusel";
import CategoryCards from "src/components/Category-cards";
import Card from "src/components/Card";
import { ref } from "vue";
import { useCounterStore } from "../stores/index";
const store = useCounterStore();

// maxsulotlarni saralash uchun
const discount_products = ref([]);
const mega_discount_products = ref([]);
const necessary_products = ref([]);

function GetFilterProducts() {
  discount_products.value = products_api.value.filter(function (elem) {
    return elem.chegirma_foizi > 0 && elem.chegirma_foizi < 10;
  });

  mega_discount_products.value = products_api.value.filter(function (elem) {
    return elem.chegirma_foizi >= 10;
  });

  necessary_products.value = products_api.value.filter(function (elem) {
    return elem.kerakli==true
  });
}
// bekentdan malumotlar keilganini tekshiradi va filtrlaydi
const products_api = ref([]);
let gettesting = setInterval(() => {
  if (store.ProductsApi.length > 0) {
    products_api.value = store.ProductsApi;
    GetFilterProducts();
    clearInterval(gettesting);
  }
  console.log("index page set interval");
}, 505);

// localStorage.setItem( "comps" , JSON.stringify( comps_info) )
</script>
<style lang="sass"  scoped>
.heading
  color: #8f1182
</style>