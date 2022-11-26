import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import axios from "axios"
export const useCounterStore = defineStore('store', {
  state: () => ({
    ProductsApi:[],
    Orders:[],
    AllPrinceProducts:0,
    AllPrinceProduct:0,
    Rebate:0,
    Prince:0,
    AllRebate:0

  }),

  // productlarni becentdan qabul qilyabdi
  actions:{
     async GET_PRODUCTS_API  () {
      try {
        const Fetch_Product = await axios.get('https://insofuz.herokuapp.com/productlar/');
        this.ProductsApi = Fetch_Product.data;
        console.log(this.ProductsApi);
      }
      catch (err) {
        console.log(err);
      }
    },

    INCREMENT(id) {
      for(let i=0 ; i < this.Orders.length ; i++ ){
        if(this.Orders[i].id==id && this.Orders[i].quantity<20 ){
          this.Orders[i].quantity++
        }
      }
    },

    DECREMENT(id) {
      for(let i=0 ; i < this.Orders.length ; i++ ){
        if(this.Orders[i].id==id && this.Orders[i].quantity>1 ){
          this.Orders[i].quantity--
        }
      }
    },

    DELETE(id){
      this.Orders.splice(id,1)
    },

    ALL_PRINCE_CALCULATION(){
      this.AllPrinceProducts=0
      this.AllRebate=0
      this.Orders.forEach(elem => {
        this.AllPrinceProduct=0
        this.Rebate=0
        this.Prince=0
        if(elem.chegirma_narx > 0){
          this.AllPrinceProduct=elem.chegirma_narx*elem.quantity
          this.Prince=elem.narx*elem.quantity
          this.Rebate=this.Prince-this.AllPrinceProduct
        }
        else{
          this.AllPrinceProduct=elem.narx*elem.quantity
        }
        this.AllPrinceProducts+=this.AllPrinceProduct
        this.AllRebate+=this.Rebate
      });
    }

  },
  
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()


  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia
})
