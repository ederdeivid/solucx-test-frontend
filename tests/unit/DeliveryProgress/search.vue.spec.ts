import { shallowMount } from '@vue/test-utils'
import DronesSearch from '@/views/DeliveryProgress/Search.vue'

describe('Search.vue', () => {
  describe('aaa', () => {
    const wrapper = shallowMount(DronesSearch)
    expect(wrapper.props()).toEqual({
      page: 1,
      sorted: {}
    })
  })

  describe('Reset pagination', () => {
    it('emit an event that contains reseted page', () => {
      const wrapper = shallowMount(DronesSearch)
      const vm = wrapper.vm
      vm.resetAndRequest()
      expect(wrapper.emitted('on-reset-pagination')).toBeTruthy()
    })
  })

  describe('Search drones status', () => {
    it('emit an event that contains a response of drone request', async () => {
      const wrapper = shallowMount(DronesSearch)
      const vm = wrapper.vm
      const request = jest.spyOn(vm, 'request')
      await vm.request()

      expect(request).toBeCalled()
      expect(wrapper.emitted('on-request')).toBeTruthy()
      request.mockRestore()
    })
  })
})