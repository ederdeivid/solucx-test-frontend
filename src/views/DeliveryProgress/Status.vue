<template>
  <div class="row col-12 m-0 d-flex">
    <table class="table table-striped table-dark table-hover table__status">
      <thead>
        <tr>
          <th>DRONE</th>
          <th>CLIENTE</th>
          <th class="d-none d-md-table-cell">BATERIA</th>
          <th class="d-none d-md-table-cell">VELOCIDADE MÁXIMA</th>
          <th class="d-none d-md-table-cell">VELOCIDADE MÉDIA</th>
          <th>VÔO ATUAL</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
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
            <arrow-slider :value="drone.fly" :type="drone.status" />
          </td>
          <td>
            <a class="btn btn-sm text-uppercase"
               :class="vooStatus(drone.status)">{{ drone.status }}</a>
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
import axios from 'axios'
import {
  ClassesBatteryPercent,
  KeyofClassesBattery,
  DroneDetails,
  DroneRequestResponse,
  RequestParams,
  ResponseHeader,
  AllVooStatus
} from '@/types/DeliveryProgress'
import Popover from '@/components/Popover.vue'
import { PaginationParams } from '@/types/Pagination'
import { Options, Vue } from 'vue-class-component'
import Pagination from '@/components/Pagination.vue'
import SmallDecimalNumbers from '@/components/SmallDecimalNumbers.vue'
import ArrowSlider from '@/components/ArrowSlider.vue'

@Options({
  props: {},
  components: {
    SmallDecimalNumbers,
    ArrowSlider,
    Pagination,
    Popover
  }
})
export default class DeliveryProgressStatus extends Vue {
  drones: DroneDetails[] | string = ''
  pagination: PaginationParams = {
    limit: 12,
    totalRows: 1,
    currentPage: 1
  }

  queryString: RequestParams = {}

  mounted (): void {
    this.request()
  }

  async request (): Promise<void> {
    try {
      const { data, headers }: DroneRequestResponse = await axios.get('http://services.solucx.com.br/mock/drones?_page=1&_limit=12')

      this.setPaginationValues(headers)
      this.drones = data
    } catch (e) {
      console.error(e)
    }
  }

  get unabledStatus (): { charging: string, offline: string } {
    return {
      charging: 'dashed',
      offline: 'dashed'
    }
  }

  onPaginate (page: number): void {
    console.log(page)
  }

  setPaginationValues (headers: ResponseHeader): void {
    this.pagination.totalRows = Number(headers['x-total-count'])
  }

  vooStatus (status: keyof AllVooStatus): string {
    const a: AllVooStatus = {
      repair: 'btn-warning',
      success: 'btn-success',
      charging: 'btn-info disabled',
      offline: 'btn-info disabled',
      failed: 'btn-danger',
      flying: 'btn-info'
    }

    return a[status] || 'btn-info'
  }

  batteryLevel (batteryStatus: number): string {
    const classesByBatteryPercent: ClassesBatteryPercent = {
      10: 'bg-danger',
      25: 'bg-warning',
      50: 'bg-success'
    }

    const keys = Object.keys(classesByBatteryPercent)
      .map(x => Number(x))
      .filter(x => x < Number(batteryStatus))

    const batteryAprox = Math.max(...keys) as unknown as KeyofClassesBattery
    return classesByBatteryPercent[batteryAprox]
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
.clickable__table {
  cursor: pointer;
}
</style>
