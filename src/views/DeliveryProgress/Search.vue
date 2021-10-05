<template>
  <div class="d-flex flex-column flex-md-row col-12 row m-0 p-0">
    <div class="text-left col-12 col-md-6 col-lg-2">
      <label class="m-0 font-weight-bold"
             for="delivery__progress__droneId">Drone ID: </label>
      <input v-model="search.id"
             type="text"
             placeholder="ID do drone"
             id="delivery__progress__droneId"
             class="form-control mb-3 mb-lg-0">
    </div>

    <div class="text-left col-12 col-md-6 col-lg-3">
      <label class="m-0 font-weight-bold"
             for="delivery__progress__name">Nome: </label>
      <input v-model="search.name"
             type="text"
             placeholder="Nome do cliente"
             id="delivery__progress__name"
             class="form-control mb-3 mb-lg-0">

    </div>

    <div class="text-left col-12 col-md-6 col-lg-3">
      <label class="m-0 font-weight-bold"
             for="delivery__progress__fly">Caminho: </label>
      <select v-model="wayValue"
              @change="onChangeWay"
              class="form-control"
              name=""
              id="delivery__progress__fly">
        <option v-for="(way, idx) in selectWay"
                :value="way.value"
                :key="idx">
          {{ way.text }}
        </option>
      </select>
    </div>

    <div class="text-left col-12 col-md-6 col-lg-3">
      <label class="m-0 font-weight-bold"
             for="delivery__progress__status">Status: </label>
      <select v-model="search.status"
              class="form-control"
              name=""
              id="delivery__progress__status">
        <option :value="status.value"
                v-for="(status, idx) in selectStatus"
                :key="idx">
          {{ status.text }}
        </option>
      </select>
    </div>

    <div class="actions col-12 col-lg-1 mt-lg-4">
      <button @click.prevent="resetAndRequest"
              :disabled="loading"
              class="btn btn-block btn-info">
        <i class="d-none d-lg-block mdi mdi-magnify" />
        <span class="d-lg-none">Pesquisar</span>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { DroneRequestResponse, FlyingWay, inputSelect, searchParams, SortedParams } from '@/types/DeliveryProgress'
import DroneService from '@/services/Drone.service'

@Options({
  props: {
    page: Number,
    sorted: Object
  },
  emits: ['on-request'],
  watch: {
    page (page: number) {
      this.onPaginate(page)
    },

    sorted (sorted: SortedParams) {
      this.onSort(sorted)
    }
  }
})
export default class SearchDeliveryProgress extends Vue {
  selectStatus: inputSelect[] = [
    { text: 'Selecione', value: '' },
    { text: 'Voando', value: 'flying' },
    { text: 'Carregando', value: 'charging' },
    { text: 'Sucesso', value: 'success' },
    { text: 'Reparo', value: 'repair' },
    { text: 'Offline', value: 'offline' },
    { text: 'Falhou', value: 'failed' }
  ]

  selectWay: inputSelect[] = [
    { text: 'Selecione', value: '' },
    { text: 'Indo', value: 'going' },
    { text: 'Voltando', value: 'coming' }
  ]

  loading = false

  arrayOfWays = (): number[] => Array.from(Array(101).keys())

  wayValue = ''

  search: searchParams = {
    id: '',
    fly: '',
    name: '',
    status: '',
    _sort: '',
    _order: '',
    _page: 1,
    _limit: 10
  }

  onChangeWay (): void {
    const ways: FlyingWay = {
      '': () => '',
      going: () => this.arrayOfWays().slice(0, 51),
      coming: () => this.arrayOfWays().slice(51, 101)
    }

    const flying = ways[this.wayValue]()
    this.search.fly = flying
  }

  onPaginate (page: number): void {
    this.search._page = page
    this.request()
  }

  resetAndRequest (): void {
    this.search._page = 1
    this.request()
  }

  onSort ({ _sort, _order }: SortedParams): void {
    this.search._sort = _sort
    this.search._order = _order
    this.request()
  }

  /**
   * Every single time when called by "search button" _page must be 1
   */
  async request (): Promise<void> {
    this.loading = true
    try {
      const data: DroneRequestResponse = await DroneService.getFilteredDrone(this.search)
      this.$emit('on-request', data)
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style scoped>
</style>
