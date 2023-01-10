import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import { defineStore } from 'pinia'
import axios from "axios"
export const useCounterStore = defineStore('store', {
  state: () => ({
    ProductsApi:[],
    CategoriyasApi:[],
    Orders:[],
    AllPrinceProducts:0,
    AllPrinceProduct:0,
    Rebate:0,
    Prince:0,
    AllRebate:0,
    UsersApi:[]

  }),

  // productlar va kartigoriyalarni  bekentdan qabul qilyabdi
  actions:{
    async GET_PRODUCTS_API  () {
      try {
        const Fetch_Product = await axios.get('http://insofuzlast.pythonanywhere.com/productlar/')
        this.ProductsApi = Fetch_Product.data
        const Fetch_Cartigoriya = await axios.get('http://insofuzlast.pythonanywhere.com/categoriya/')
        this.CategoriyasApi = Fetch_Cartigoriya.data
        console.log(this.ProductsApi)
      }
      catch (err) {
        console.log(err)
      }
    },

    // maxsuloti qiymatini oshirish

    INCREMENT(id) {
      this.Orders.forEach(el => {
        if(el.id==id && el.quantity<20 ){
          el.quantity++
        }
      })

    },
    // maxsuloti qiymatini kamaytirish
    DECREMENT(id) {
      this.Orders.forEach(el => {
        if(el.id==id && el.quantity>1 ){
          el.quantity--
        }
      })
    },
    // maxsulotni o'chirish
    DELETE(id){
      this.Orders.splice(id,1)
    },
    // umumiy narxni va umumiy chegirma narxni xisoblash
    ALL_PRINCE_CALCULATION(){
      this.AllPrinceProducts=0
      this.AllRebate=0
      this.Orders.forEach(elem => {
        this.AllPrinceProduct=0
        this.Rebate=0
        this.Prince=0
        this.AllPrinceProduct=elem.narx*elem.quantity
        this.AllPrinceProducts+=this.AllPrinceProduct

        if(elem.eski_narx > 0){
          this.Prince=elem.eski_narx*elem.quantity
          this.Rebate=this.Prince-this.AllPrinceProduct
        }

        this.AllRebate+=this.Rebate
      })
    }

  },

})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 *
 * The function below can be async too either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()


  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)

  return pinia
})
