<template>
  <span>
    <span :title="title"
          v-if="!dashedClass" class="d-none d-md-table-cell">
      <input type="range"
             v-if="zeroUntilFifty"
             class="input-arrow-slider position-relative"
             :class="customClass"
             min="0"
             :value="50 - value"
             max="50">

      <input type="range"
             v-if="biggerThanFifty"
             class="input-arrow-slider position-relative"
             :class="customClass"
             min="51"
             :value="value"
             max="100">
    </span>

    <span class="d-md-none"
          :class="{ 'd-none': dashedClass }">{{ value }}%</span>

    <span :class="{ 'd-none': !dashedClass }">
      <hr class="dashed-hr">
    </span>
  </span>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    value: [String, Number],
    type: String
  }
})
export default class ArrowProgressBar extends Vue {
  value!: 0
  type!: ''

  get biggerThanFifty (): boolean {
    return this.value > 50
  }

  get unallowedStatus (): string[] {
    return ['offline', 'charging']
  }

  get dashedClass (): boolean {
    return this.unallowedStatus.includes(this.type)
  }

  get customClass (): string {
    return this.biggerThanFifty ? 'arrow-coming' : 'arrow-going'
  }

  get title (): string {
    return `${this.value}% - ${this.biggerThanFifty ? 'Voltando' : 'Indo'}`
  }

  get zeroUntilFifty (): boolean {
    return this.value <= 50
  }
}
</script>

<style scoped>
input.arrow-coming::after {
  content: "►";
  color: #1a237e;
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  margin-right: -12px;
}

input.arrow-going::before {
  content: "◄";
  color: #1a237e;
  display: flex;
  align-items: center;
  margin-bottom: 1px;
  margin-left: -12px;
}

input.input-arrow-slider {
  height: 4px;
  -webkit-appearance: none;
  background-color: #1a237e;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

input.input-arrow-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border-radius: 100%;
  border: 2px solid #000051;
}

.dashed-hr {
  border: 3px dashed #1a237e;
  max-width: 125px;
}
</style>
