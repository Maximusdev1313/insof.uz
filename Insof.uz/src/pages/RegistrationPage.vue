<template>
    <div class="row mt-30px register">
        <UserInfo class="user-info" />
        <BasketInfo disable="0" class="basket-info" />
    </div>
</template>
<script>
import BasketInfo from 'src/components/BasketComponets/BasketInfo.vue';
import UserInfo from 'src/components/Registration/UserInfo.vue';

export default {
    components: { UserInfo, BasketInfo },
    data() {
        return {
        
        }
    },
}
</script>
<style  scoped>
    .user-info{
        width: 60%;
    }
    .basket-info{
        width: 40%;
    }
    @media screen and (max-width:900px) {
        .user-info{
        width: 100%;
        }
        .basket-info{
            width: 100%;
            margin: 50px 0px 50px 0px;
        }
    }
    
</style>