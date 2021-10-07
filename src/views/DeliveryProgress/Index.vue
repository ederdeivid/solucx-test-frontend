<template>
  <div class="mb-5">
    <search @on-request="data => requestData = data"
            @on-reset-pagination="(data) => $refs.status.pagination.currentPage = data"
            :sorted="sorted"
            :page="page" />
  </div>

  <div>
    <status ref="status"
            :requestData="requestData"
            @on-paginate="data => page = data"
            @on-sort="data => sorted = data" />
  </div>
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
export default class DeliveryProgress extends Vue {
  requestData = {}
  sorted = {}
  page = 1
}
</script>
