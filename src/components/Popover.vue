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
    container: String,
    classes: String,
    color: String,
    placement: [String, Function],
    title: [String, Element, Function],
    trigger: String,
    content: [String, Number, Element, Function]
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

  mounted () {
    this.startPopover()
  }

  startPopover () {
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
