import { shallowMount } from '@vue/test-utils'
import Small from '@/components/SmallDecimalNumbers.vue'

describe('Search.vue', () => {
  describe('Check props', () => {
    it('check if all props are ok', () => {
      const wrapper = shallowMount(Small)
      expect(wrapper.props()).toEqual({
        value: '',
        type: ''
      })
    })
  })

  describe('decimal and interger splited', () => {
    it('get interger splited from dicimal numbers', async () => {
      const wrapper = shallowMount(Small)
      const vm = wrapper.vm
      await wrapper.setProps({
        value: 37.5,
        type: 'km/h'
      })

      const decimal = vm.decimalValue
      expect(decimal).toEqual({ interger: '37', float: `.5` })
    })

    it('get interger value', async () => {
      const wrapper = shallowMount(Small)
      const vm = wrapper.vm
      await wrapper.setProps({
        value: 37,
        type: 'km/h'
      })
      const interger = vm.intergerValue

      expect(interger).toEqual({ interger: 37, float: '' })
    })
  })

  describe('Check interger', () => {
    it('get true from interger verification', async () => {
      const wrapper = shallowMount(Small)
      const vm = wrapper.vm
      await wrapper.setProps({
        value: 37,
        type: 'km/h'
      })

      const isInterger = vm.isInterger
      expect(isInterger).toBeTruthy()
    })

    it('get false from interger verification', async () => {
      const wrapper = shallowMount(Small)
      const vm = wrapper.vm
      await wrapper.setProps({
        value: 37.5,
        type: 'km/h'
      })

      const isInterger = vm.isInterger
      expect(isInterger).not.toBeTruthy()
    })
  })
})