import { RouteRecordRaw } from 'vue-router'
import Details from './Index.vue'

export const routes: RouteRecordRaw = {
  component: Details,
  path: '/details',
  name: 'Details',
  props: true
}
