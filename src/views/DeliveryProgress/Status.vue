<template>
  <div class="row col-12 m-0 d-flex">
    <table class="table table-striped table-hover table__status">
      <thead>
        <tr>
          <th v-for="(th, idx) in tableHeader"
              :key="idx"
              :class="th.class"
              class="table-header-class"
              @click.prevent="onSort(th.value, idx)">
            {{ th.header }} <i class="mdi"
               :class="classSortedMenu(idx)" />
          </th>
        </tr>
      </thead>
      <tbody id="table-drones-list">
        <tr v-for="(drone, idx) in drones"
            class="clickable__table"
            @click.prevent="showDetails(drone)"
            :key="idx">
          <td>{{ drone.id }}</td>
          <td>{{ drone.name }}</td>
          <td class="d-none d-md-table-cell">
            <popover :content="`${drone.battery}%`"
                     trigger="hover"
                     classes="text-white"
                     placement="top">
              <div class="progress d-sm-none d-lg-flex">
                <div class="progress-bar"
                     :class="batteryLevel(drone.battery)"
                     role="progressbar"
                     :style="`width: ${drone.battery}%`"
                     :aria-valuenow="drone.battery"
                     aria-valuemin="0"
                     aria-valuemax="100"></div>
              </div>

              <div class="d-inline-block d-lg-none">
                {{ drone.battery }}%
              </div>
            </popover>
          </td>
          <td class="d-none d-md-table-cell">
            <small-decimal-numbers :value="drone.max_speed"
                                   type="m/h" />
          </td>
          <td class="d-none d-md-table-cell">
            <small-decimal-numbers :value="drone.average_speed"
                                   type="m/h" />
          </td>
          <td @click.stop>
            <arrow-slider :value="drone.fly"
                          :status="drone.status"
                          :unabledStatus="unabledStatus" />
          </td>
          <td>
            <a class="btn btn-sm"
               :class="vooStatus(drone.status).class">{{ vooStatus(drone.status).text }}</a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="col-12 d-flex justify-content-center">
      <pagination :pages="pagination"
                  @on-paginate="onPaginate" />
    </div>
  </div>
</template>

<script lang="ts">
import {
  ClassesBatteryPercent,
  KeyofClassesBattery,
  DroneDetails,
  DroneRequestResponse,
  RequestParams,
  AllVooStatus,
  TableHeaders,
  SortOrder,
  GenericSort,
  VooStatusProperties
} from '@/types/DeliveryProgress'
import Popover from '@/components/Popover.vue'
import { PaginationParams } from '@/types/Pagination'
import { Options, Vue } from 'vue-class-component'
import Pagination from '@/components/Pagination.vue'
import SmallDecimalNumbers from '@/components/SmallDecimalNumbers.vue'
import ArrowSlider from '@/components/ArrowSlider.vue'

@Options({
  props: {
    requestData: {
      type: Object,
      default: {}
    }
  },
  components: {
    SmallDecimalNumbers,
    ArrowSlider,
    Pagination,
    Popover
  },
  emits: ['on-paginate', 'on-sort'],
  watch: {
    requestData (request: DroneRequestResponse) {
      this.formatDroneData(request)
    }
  }
})

export default class DeliveryProgressStatus extends Vue {
  page = 1
  indexSorted = 0
  sortedField = ''
  currentClick = 0
  drones: DroneDetails[] | string = ''
  pagination: PaginationParams = {
    limit: 10,
    totalRows: 1,
    currentPage: 1
  }

  classesByBatteryPercent: ClassesBatteryPercent = {
    10: 'bg-danger',
    25: 'bg-warning',
    50: 'bg-success'
  }

  sortOrder: SortOrder = {
    0: '',
    1: 'asc',
    2: 'desc'
  }

  tableHeader: TableHeaders[] = [
    { header: 'Drone', value: 'id', sort: true },
    { header: 'Cliente', value: 'name', sort: true },
    { header: 'Bateria', value: 'battery', sort: true, class: 'd-none d-md-table-cell' },
    { header: 'Veloc. Máxima', value: 'max_speed', sort: true, class: 'd-none d-md-table-cell' },
    { header: 'Veloc. Média', value: 'average_speed', sort: true, class: 'd-none d-md-table-cell' },
    { header: 'Vôo Atual', value: 'fly', sort: true },
    { header: 'Status', value: 'status', sort: true }
  ]

  unabledStatus: string[] = ['charging', 'offline']

  status: AllVooStatus = {
    repair: { class: 'btn-warning', text: 'Reparo' },
    success: { class: 'btn-success', text: 'Sucesso' },
    charging: { class: 'btn-info disabled', text: 'Carregando' },
    offline: { class: 'btn-info disabled', text: 'Offline' },
    failed: { class: 'btn-danger', text: 'Falhou' },
    flying: { class: 'btn-info', text: 'Voando' }
  }

  queryString: RequestParams = {}

  formatDroneData (requestData: DroneRequestResponse): void {
    const { data, headers } = requestData
    this.drones = data
    this.pagination.totalRows = Number(headers['x-total-count'])
  }

  classSortedMenu (index: number): string | void {
    const classes: GenericSort = { 0: '', 1: 'mdi-menu-down', 2: 'mdi-menu-up' }
    if (index !== this.indexSorted) return
    return classes[this.currentClick]
  }

  onPaginate (page: number): void {
    this.$emit('on-paginate', page)
  }

  vooStatus (status: keyof AllVooStatus): VooStatusProperties {
    return this.status[status]
  }

  onSort (sortedField: string, index: number): void {
    if (!this.drones.length) return

    if (this.sortedField !== sortedField) (this.currentClick = 0)

    this.currentClick += 1
    this.indexSorted = index
    const _order = this.sortOrder[this.currentClick]
    this.sortedField = sortedField

    if (this.currentClick % 3 === 0) {
      this.currentClick = 0
      return this.$emit('on-sort', { _sort: '', _order: '' })
    }

    this.$emit('on-sort', { _sort: sortedField, _order })
  }

  batteryLevel (batteryStatus: number): string {
    const keys = Object.keys(this.classesByBatteryPercent)
      .map(key => Number(key))
      .filter(key => key < Number(batteryStatus))

    const batteryAprox = Math.max(...keys) as KeyofClassesBattery
    return this.classesByBatteryPercent[batteryAprox]
  }

  showDetails (droneDetail: DroneDetails): void {
    this.$router.push({
      name: 'Details',
      params: droneDetail
    })
    window.localStorage.setItem('drone-detail', JSON.stringify(droneDetail))
  }
}
</script>

<style scoped>
.clickable__table,
.table-header-class {
  cursor: pointer;
}

.table-header-class:hover {
  background-color: #ccc;
}
</style>
