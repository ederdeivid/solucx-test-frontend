import Pagination from '@/components/Pagination.vue'
import { shallowMount } from '@vue/test-utils'

const pages = {
  limit: 10,
  totalRows: 100,
  currentPage: 1
}

describe('Pagination component', () => {
  describe('Check props', () => {
    it('check if all props are ok', () => {
      const wrapper = shallowMount(Pagination)
      expect(wrapper.props()).toEqual({
        pages: {}
      })
    })
  })

  describe('Total of pages in pagination component', () => {
    it('get calculated value of pages', async () => {
      const wrapper = shallowMount(Pagination)
      await wrapper.setProps({ pages })
      const vm = wrapper.vm
      expect(vm.totalPages).toBe(10)
    })
  })

  describe('Emiting event when click next/previous page', () => {
    it('should emit an event with the next page number', () => {
      const wrapper = shallowMount(Pagination)
      const vm = wrapper.vm
      vm.paginate(pages.currentPage + 1)
      expect(wrapper.emitted('on-paginate')).toEqual([[2]])
    })
  })
})