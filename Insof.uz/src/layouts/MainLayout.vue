<template>
  <q-layout view="hhh lpR lff">
    <q-header reveal class="bg-color text-white">
      <q-bar>
        <q-space />
        <div>+99895-024-70-72</div>
      </q-bar>
      <q-separator></q-separator>

      <div class="wrapper row no-wrap justify-between items-center">
        <div class="gold--text">
          <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

          <router-link to="/" class="gold--text">
            <q-avatar class="q-ma-sm" size="40px">
              <img src="../assets/logo3.png" width="100" />
            </q-avatar>
            Insof.uz
          </router-link>
        </div>
        <router-link to="/search" class="w-50pr">
          <q-input
            rounded
            outlined
            v-model="search_text"
            dark
            class="w-100pr p-5px"
            label="Maxsulotlarni Qidirish "
            color="white"
          />
        </router-link>
        <q-btn to="/basket"> <q-icon class="mr-10px" name="shopping_cart" /> {{ store.AllPrinceProducts }} so'm </q-btn>
      </div>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view :search_product="search_product" />
    </q-page-container>

    <!-- <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>



<script setup>
  import { ref, watch } from "vue";
  import { useCounterStore } from "../stores/index";
  const store = useCounterStore();
  const search_text = ref('')
  const product_name = ref('')
  const search_product = ref([])
  const search = ref()

// draver ochilib yopilishi uchun
  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }
  const leftDrawerOpen = ref(false);

// api ni olish  piniadan kelayotgan funksiya orqali
  store.GET_PRODUCTS_API();

  // search_product qiymatini umumiy maxsulotlarga tenglashtiradi
  let gettesting = setInterval(() => {
    if (store.ProductsApi.length > 0) {
      search_product.value=store.ProductsApi
      clearInterval(gettesting);
    }
    console.log(" main leaut  setInterval ");
  }, 505);
  // maxsulotlarni qidirish 
  watch(search_text, ()=>{
    search_product.value=[]
    for (let i = 0; i < store.ProductsApi.length; i++) {
    // maxsulot nomi va qidirilayotgan so'z harflarini kichik harflarga o'tkazadi
      product_name.value=store.ProductsApi[i].nomi.toLowerCase()
      search_text.value=search_text.value.toLowerCase()

    // qidirilayotgan so'z maxsulot nomida bo'lsa true qiymat qaytaradi va if ishlaydi
      search.value=product_name.value.includes(search_text.value)
      if(search.value){
        search_product.value.push(store.ProductsApi[i])
      }
    }
    
  })  
  
 
</script>


<style scoped>
a{
  text-decoration: none;
}
.bg-color {
  background: linear-gradient(89.97deg, #33042e 52.52%, #8f1182 110.06%);
}
.gold--text {
  color: rgb(248, 204, 61);
  font-size: 18px;
}
.q-page-container {
  width: 95%;
  margin: 0 auto;
}
.wrapper {
  width: 97%;
  margin: 0 auto;
}
.search-input {
  width: 300px;
  height: 30px;
  border-radius: 10px;
  border: none;
}
::placeholder {
  padding-left: 10px;
  font-style: 19px;
}
.search-input:focus {
  outline: none;
}
/* .q-layout{
  background: linear-gradient(89.97deg, rgba(254, 6, 229, 0.45) 14.19%, rgba(51, 4, 46, 0.61) 110.06%);
} */
</style>