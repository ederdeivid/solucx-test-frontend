import { shallowMount } from '@vue/test-utils'
import ListDrones from '@/views/DeliveryProgress/Status.vue'

const droneData = {
  id: 3,
  image: 'https://robohash.org/fugaaperiamofficiis.jpg?size=50x50&set=set1',
  name: 'Gabbie',
  address: '559 Moose Street',
  battery: 15,
  max_speed: 37.7,
  average_speed: 18.7,
  status: 'flying',
  fly: 76
}

const responseDroneRequest = {
  headers: {
    'x-total-count': 1
  },
  data: [droneData]
}

describe('Search.vue', () => {
  describe('Check props', () => {
    it('check if all props are ok', () => {
      const wrapper = shallowMount(ListDrones)
      expect(wrapper.props()).toEqual({
        requestData: {}
      })
    })
  })

  describe('showDetails - Click on table data and show Drone info', () => {
    it('Push to Detail route passing Drone as params', () => {
      const mockRoute = { params: { id: 1 } }
      const mockRouter = { push: jest.fn() }
      const wrapper = shallowMount(ListDrones, {
        global: {
          mocks: {
            $route: mockRoute,
            $router: mockRouter
          }
        }
      })

      const vm = wrapper.vm
      vm.showDetails(droneData)

      expect(mockRouter.push).toHaveBeenCalledTimes(1)
      expect(mockRouter.push).toHaveBeenCalledWith({ name: 'Details', params: droneData })
    })
  })

  describe('sort - Sorting drone infos by drone name', () => {
    it('Should emit an event if clicked when drones contains value', () => {
      const wrapper = shallowMount(ListDrones)
      const vm = wrapper.vm
      vm.formatDroneData(responseDroneRequest)
      vm.onSort('name', 1)

      expect(wrapper.emitted('on-sort')).toBeTruthy()
    })
  })

  describe('Sort - return undefined', () => {
    it('Shouldnt emit event when drones are empty', () => {
      const wrapper = shallowMount(ListDrones)
      const vm = wrapper.vm
      vm.onSort('name', 1)

      expect(wrapper.emitted('on-sort')).not.toBeTruthy()
    })
  })
})