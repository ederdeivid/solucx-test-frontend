<template>
  <span class="font-weight-bold">
    {{ intergerValue?.interger || decimalValue?.interger }}
    <small class="small__values font-weight-normal">
      <span>{{ decimalValue?.float || '' }}</span>
      <span class="small__values__type">{{ type }}</span>
    </small>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { DecimalComponent } from '@/types/SmallDecimalComponent'

@Options({
  props: {
    value: { type: [String, Number], default: '' },
    type: { type: String, default: '' }
  }
})
export default class SmallDecimalNumbers extends Vue {
  value!: ''
  type!: ''

  get isInterger (): boolean {
    return (Number(this.value) % 1) === 0
  }

  get intergerValue (): DecimalComponent | undefined {
    if (this.isInterger) return { interger: this.value, float: '' }
  }

  get decimalValue (): DecimalComponent | undefined {
    if (this.isInterger) return
    const [interger, float] = this.value.toString().split('.')
    return { interger, float: `.${float}` }
  }
}
</script>

<style scoped>
small.small__values {
  margin-left: -3px;
}
span.small__values__type {
  margin-left: 3px;
}
</style>
