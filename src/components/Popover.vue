<template>
  <div>
    <span class="popover__container">
      <a :data-container="container"
         href="#"
         @click.prevent
         :class="classes"
         :color="color"
         :data-trigger="trigger"
         :data-content="content"
         :data-title="title"
         data-toggle="popover"
         :data-placement="placement">
        <slot />

      </a>
    </span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import $ from 'jquery'

@Options({
  props: {
    content: [String, Number, Element, Function],
    title: [String, Element, Function],
    placement: [String, Function],
    container: String,
    trigger: String,
    classes: String,
    color: String
  }
})
export default class Popover extends Vue {
  classes!: ''
  container!: 'body'
  color!: ''
  placement!: ''
  title!: ''
  trigger!: ''
  content!: ''

  mounted (): void {
    this.startPopover()
  }

  startPopover (): void {
    /* @ts-expect-error: Popover isn't a method of jquery */
    $('[data-toggle="popover"]').popover({})
  }
}
</script>

<style scoped>
.popover__container a {
  text-decoration: none !important;
}
</style>
