  <template>
    <div>
      <Card :products="props.search_product" />
    </div>
  </template>
<script setup>
import Card from "src/components/Card.vue";
import { useCounterStore } from "../stores/index";
  const store = useCounterStore();

  const props = defineProps({
    search_product:Array
  })
   
</script>
<style lang="sass" scoped>
   
</style>
  
 