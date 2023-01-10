<template>
  <div class="category">
    <div class="card" v-for=" (categoriya , i ) in store.CategoriyasApi" :key="i">
      <router-link :to="('/categoriya/'+categoriya.id)" class="card__link">
        <div class="card__main">
          <q-img
            :src="categoriya.rasmlar[0].link"
            class="img card__img"
            
          >
            <div class="absolute-full fs-18px flex flex-center">
              {{ categoriya.categoriya_nomi }}
            </div>
          </q-img>
        </div>
      </router-link>
    </div>
  </div>
</template>
<script setup >
import { useCounterStore } from "../stores/index"
  const store = useCounterStore()

</script>
<style lang="sass" scoped>
.category
    display: flex
    justify-content: space-between
    justify-items: center
    flex-wrap: wrap
    align-items: flex-start
.card
    width: 350px
    margin: 10px
    flex-grow: 1

.q-img
    border-radius: 10px

.q-img__content >
    background: rgba(0,0,0, 0.30)
.card__img
  height: 270px

@media screen and (min-width:500px) and (max-width:900px)
  .card__img
    height: 200px
@media screen and (max-width:500px) 
  .card__img
    height: 120px

</style>

