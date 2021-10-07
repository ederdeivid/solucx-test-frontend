<template>
  <div class="row col-12 m-0 d-flex justify-content-center mt-5">
    <div class="col-12 col-md-6 col-lg-3 mt-5 bg-dark text-white d-flex flex-column align-items-center position-relative rounded card__custom">
      <div class="mx-auto avatar position-relative">
        <img :src="newImageSize(detailsFromRoute.image || detailsFromStorage.image)"
             class="rounded-circle bg-white no__image__loaded">
      </div>
      <div class="card__name">
        <span>{{ detailsFromRoute.name || detailsFromStorage.name }}</span>
      </div>

      <div class="card__content">
        <p>
          <small>ID:</small>
          <span class="font-weight-bold">{{ detailsFromRoute.id || detailsFromStorage.id }}</span>
        </p>

        <p>
          <small>Endereço:</small>
          <span class="font-weight-bold">{{ detailsFromRoute.address || detailsFromStorage.address }}</span>
        </p>

        <p>
          <small>Velocidade Máxima:</small>
          <span class="font-weight-bold">{{ detailsFromRoute.max_speed || detailsFromStorage.max_speed }}</span>
        </p>

        <p>
          <small>Velocidade Média:</small>
          <span class="font-weight-bold">{{ detailsFromRoute.average_speed || detailsFromStorage.average_speed }}</span>
        </p>

        <p>
          <small>Bateria:</small>
          <span class="font-weight-bold">{{ detailsFromRoute.battery || detailsFromStorage.battery }}</span>
        </p>

        <p>
          <small>Progresso de vôo:</small>
          <span class="font-weight-bold">{{ detailsFromRoute.fly || detailsFromStorage.fly }}</span>
        </p>

        <p>
          <small>status:</small>
          <span class="font-weight-bold">{{ detailsFromRoute.status || detailsFromStorage.status }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { ParsedDroneValues } from '@/types/DroneDetails'
import { RouteParams } from 'vue-router'

@Options({
  props: {}
})
export default class DroneDetails extends Vue {
  get detailsFromRoute (): RouteParams {
    return this.$router.currentRoute.value.params
  }

  get detailsFromStorage (): ParsedDroneValues {
    return JSON.parse(window.localStorage.getItem('drone-detail') || '{}')
  }

  newImageSize (url: string): string {
    const urlWithoutQueryParams = url.split('?')[0]
    const newURL = new URL(url)
    const searchParams: URLSearchParams = new URLSearchParams(newURL.search)
    searchParams.set('size', '150x150')

    const urlImageResized = `${urlWithoutQueryParams}?${searchParams.toString()}`
    return urlImageResized
  }
}
</script>

<style scoped>
.avatar {
  transform: translateY(-50%);
}

.no__image__loaded {
  width: 150px;
  height: 150px;
  background: #fff;
}

.card__name {
  margin-top: -45px;
  margin-bottom: 10px;
}

.card__name span {
  font-weight: 900;
  font-size: 30px;
  letter-spacing: -1px;
  line-height: 0;
}

.avatar img {
  box-shadow: 0px 0px 13px 1px rgb(2 2 2 / 50%);
}

.card__custom {
  min-height: 300px;
  box-shadow: 0px 0px 3px 1px rgb(2 2 2 / 50%);
}

.card__content p > small {
  margin-right: 5px;
}
</style>
