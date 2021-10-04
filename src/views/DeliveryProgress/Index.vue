<template>
  <!-- <search /> -->
  <status />
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Search from './Search.vue'
import Status from './Status.vue'

@Options({
  props: {},
  components: {
    Search,
    Status
  }
})
export default class DeliveryProgress extends Vue {}
</script>
