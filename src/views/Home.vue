<template>
  <div class="home">
    <delivery-progress />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import DeliveryProgress from '@/views/DeliveryProgress/Index.vue'

@Options({
  components: {
    DeliveryProgress
  }
})
export default class Home extends Vue {}
</script>
