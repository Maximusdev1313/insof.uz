<template>
  <div class="products">
    <div class="products__body">
      <div class="products__title">Savatda {{store.Orders.length}} ta mahsulot bor </div>
        <div class="products__line q-mt-md">
            <q-separator />
        </div>
      <div class="products-product" v-for="product , i  in store.Orders" :key="i">
        <div class="product">
            <div class="product__img">
                <q-img
                  :src="product.rasmlari[0].link"
                  alt=""
                />
            </div>
            <div class="product__info">
              <p class="product__name">{{product.nomi}}</p>
              <div v-if="product.eski_narx > 0 ?true :false" class="product__price">Narxi: <del class="mr-10px">{{product.eski_narx}} </del>  {{product.chegirma_narx}} so'm </div>
              <div class="product__price">Narxi: {{product.narx}} so'm </div>
            </div>
            <div class="product__quantity">
              <q-icon @click="decrement(i)" name="remove_circle" size="22px" />
              <span class="quantity"> {{product.quantity}} </span>
              <q-icon @click="increment(i)" name="add_circle" size="22px" color="red" />
            </div>
            <div class="product__overall-price">{{product.narx * product.quantity}} so'm</div>
           
            <div class="product__delete">
              <q-icon @click="delet(i)" name="close" size="25px" color="grey" />
            </div>
        </div>
        <div class="product__line mt-10px">
          <q-separator />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { useCounterStore } from "src/stores/index"
  const store = useCounterStore()

  function increment(i){
    store.INCREMENT(store.Orders[i].id)
    store.ALL_PRINCE_CALCULATION()
  }
  function decrement(i){
    store.DECREMENT(store.Orders[i].id)
    store.ALL_PRINCE_CALCULATION()
  }
  function delet(i){
    store.DELETE(i)
    store.ALL_PRINCE_CALCULATION()
  }

</script>
<style scoped>
.products {
  width: 100%;
  display: flex;
  justify-content: center;
}

.products__body {
  width: 95%;
  margin-top: 50px;
}

.products__title {
  width: 100%;
  font-size: 40px;
}

.product {
  width: 100%;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.product__img {
  width: 70px;
}

.product__info {
  width: 30%;
  font-size: 15px;
  color: rgb(83, 80, 80);
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
@media screen and (max-width:500px) {
    .product{
        flex-wrap: wrap;
    }
    .product :nth-child(1) { order: 1; }
    .product :nth-child(2) { order: 2; }
    .product :nth-child(3) { order: 5; }
    .product :nth-child(4) { order: 3; }
    .product :nth-child(5) { order: 4; }
    .product__quantity{
        width: 50%;
    }
}
</style>