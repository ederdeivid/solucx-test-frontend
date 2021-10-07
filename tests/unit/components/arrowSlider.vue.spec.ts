import ArrowSlider from '@/components/ArrowSlider.vue'
import { shallowMount } from '@vue/test-utils'

describe('Arrow Slider component', () => {
  describe('Check props', () => {
    it('check if all props are ok', () => {
      const wrapper = shallowMount(ArrowSlider)
      expect(wrapper.props()).toEqual({
        value: 0,
        unabledStatus: [],
        status: ''
      })
    })
  })

  describe('Check way of fly (going)', () => {
    it('checks if drone is coming or going', async () => {
      const wrapper = shallowMount(ArrowSlider)
      const vm = wrapper.vm
      await wrapper.setProps({
        value: '40'
      })

      expect(vm.title).toBe('40% - Indo')
    })
  })

  describe('Check way of fly (coming)', () => {
    it('checks if drone is coming or going', async () => {
      const wrapper = shallowMount(ArrowSlider)
      const vm = wrapper.vm
      await wrapper.setProps({
        value: '60'
      })

      expect(vm.title).toBe('60% - Voltando')
    })
  })
})