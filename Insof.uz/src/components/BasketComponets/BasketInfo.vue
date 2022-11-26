<template >
  <div class="w-100pr info">
    <div class="info__body h-350px">
      <div class="info__data">
        <span class="data__body">
          <span>Chegirmasiz narx:</span>
          <span> {{ store.AllPrinceProducts + store.AllRebate }} so'm</span>
        </span>
        <span class="data__body">
          <span>Chegirma narxi:</span>
          <span>{{ store.AllRebate }} so'm</span>
        </span>
        <span class="data__body">
          <span> Chegirmali narx: </span>
          <span> {{ store.AllPrinceProducts }} so'm</span>
        </span>
        <span class="data__body">
          <span> Dastafka narxi: </span>
          <span>0 so'm</span>
        </span>
      </div>
      <q-separator class="q-mt-md" />
      <div class="info__placing-order row justify-center">
        <span class="placing-order__price">
          <span>To'lash summasi:</span>
          <span> {{ store.AllPrinceProducts }} so'm</span>
        </span>
        <q-btn 
            color="white" 
            class="bg-red mt-20px" 
            rounded 
            to="/registration"
            v-if="props.disable==1 ?true :false "
            :disable=" store.Orders.length < 1 ?true :false " >
          Buyurtma berish
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCounterStore } from "src/stores/index";
const store = useCounterStore();

const props = defineProps({
    disable:String
})
</script>
<style scoped>
.info {
  width: 100%;
  display: flex;
  justify-content: center;
}
.info__body {
  width: 90%;
  padding: 40px;
  border: solid 1px grey;
  border-radius: 30px;
}
.info__data {
  width: 100%;
}
.data__body {
  width: 100%;
  margin-top: 10px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}
.placing-order__price {
  width: 100%;
  margin-top: 20px;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
}
@media screen and (max-width: 500px) {
  .info__body {
    height: 340px;
    padding: 20px;
  }
  .data__body {
    font-size: 16px;
  }
  .placing-order__price {
    font-size: 18px;
  }
}
</style> >
    
