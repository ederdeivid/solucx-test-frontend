import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { routes as Delivery } from '../views/DeliveryProgress/routes'
import { routes as Details } from '../views/DroneDetails/routes'

const routes: Array<RouteRecordRaw> = [
  Delivery,
  Details
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
