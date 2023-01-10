<template>
    <div>

        <div>
            <div
                v-if="category_product.length < 1 ? true : false"
                class="w-100pr h-90vh row justify-center items-center"
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
        </div>

        <div v-if="category_product.length > 1 ? true : false">
            <div class="row text-center justify-center w-100pr fs-20px mt-50px">
                <div class="text-blue w-5pr mr-15px"> ____ </div>
                <p>{{ category_id.categoriya_nomi }}</p>
                <div class="text-blue w-5pr ml-8px"> ____ </div>
            </div>

            <Card :products="category_product"/>
        </div>

    </div>
</template>
<script setup>
import {ref} from 'vue'
import axios from "axios"
import { useCounterStore } from "../stores/index"
import { useRoute } from 'vue-router'
import Card from 'src/components/Card.vue';
  const store = useCounterStore()
  let id = useRoute().params.id
  const category_id = ref([])
  const category_product = ref([])

  async function GetCategoryApi(){
    try {
        const fetch_category_id= await axios.get('http://insofuzlast.pythonanywhere.com/categoriya/'+id+'/');
        category_id.value = fetch_category_id.data
        category_product.value = category_id.value.mahsulot
        console.log(category_id.value);
    }
    catch (err) {
        console.log(err);
    }
  }
  GetCategoryApi()

</script>
<style lang="sass" scoped>

</style>
