<template>
  <nav aria-label="Page navigation">
    <div class="actions d-flex align-items-center mb-3">
      <div class="icons-previous-page d-flex">
        <i class="mdi mdi-arrow-collapse-left mdi-24px"
           @click.prevent="paginate(1)"
           :class="{ 'disabled__button': pages.currentPage === 1 }" />

        <i class="mdi mdi-minus mdi-24px"
           @click.prevent="paginate(pages.currentPage - 1)"
           :class="{ 'disabled__button': pages.currentPage === 1 }" />
      </div>

      <small class="mx-3"> {{ currentPage }} de {{ totalPages }} </small>

      <div class="icons-next-page d-flex">
        <i class="mdi mdi-plus mdi-24px"
           @click.prevent="paginate(pages.currentPage + 1)"
           :class="{ 'disabled__button': pages.currentPage === totalPages }" />

        <i class="mdi mdi-arrow-collapse-right mdi-24px"
           @click.prevent="paginate(totalPages)"
           :class="{ 'disabled__button': pages.currentPage === totalPages }" />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { PaginationParams } from '@/types/Pagination'
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    pages: {
      type: Object,
      default: {}
    }
  }
})

export default class Pagination extends Vue {
  pages: PaginationParams = {
    limit: 10,
    totalRows: 1,
    currentPage: 1
  }

  get totalPages (): number {
    return Math.ceil(Number(this.pages.totalRows) / Number(this.pages.limit))
  }

  get currentPage (): number {
    const currentPage: number = this.pages.limit >= this.pages.totalRows ? this.pages.currentPage = 1 : this.pages.currentPage
    return currentPage
  }

  paginate (page: number): void {
    if (isNaN(page)) return
    this.pages.currentPage = page
    this.$emit('on-paginate', page)
  }
}
</script>

<style scoped>
.actions {
  padding: 5px;
  border: 1px solid #000;
  border-radius: 10px;
}

.icons-previous-page i,
.icons-next-page i {
  margin: 0 2px;
  width: 36px;
  height: 36px;
  cursor: pointer;
  border-radius: 100%;
}

.icons-previous-page i:hover,
.icons-next-page i:hover {
  background-color: rgb(211 211 211);
}

i.disabled__button {
  color: rgba(0, 0, 0, 0.26);
  pointer-events: none;
}
</style>
