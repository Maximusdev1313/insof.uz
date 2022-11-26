<template >
    <div class="w-100pr row mb-50px ">
        <BasketProducts class="basket-products"/>
        <BasketInfo disable="1" class="basket-info"/>
    </div>
</template>
<script>
import BasketInfo from 'src/components/BasketComponets/BasketInfo.vue';
import BasketProducts from 'src/components/BasketComponets/BasketProducts.vue';

export default {
    components: { 
        BasketProducts, 
        BasketInfo 
    }
}
</script>
<style scoped>
    .basket-products{
        width: 60%;
    }
    .basket-info{
        width: 40%;
        margin-top: 120px;
    }
    @media screen  and ( min-width:500px) and ( max-width:900px){
        .basket-products{
            width: 100%;
        }
        .basket-info{
            width: 100%;   
        }
    }
    @media screen  and ( max-width:500px){
        .basket-products{
            width: 100%;
        }
        .basket-info{
            width: 100%;  
        }
    }
</style>