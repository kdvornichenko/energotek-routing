<template>
  <div class="modal" :class="'modal--' + name">
    <transition :name="'fade'">
      <button @click="$emit('close-modal')" class="modal__overlay" v-if="isActive"></button>
    </transition>
    <transition :name="transition">
      <slot v-if="isActive"></slot>
    </transition>
  </div>
</template>

<script>
import scroll from '../../assets/ts/stop-scroll'

export default {
  props: {
    isActive: Boolean,
    duration: Number,
    transition: {
      type: String,
      default: 'translateToBottom',
    },
    name: String,
  },
  emits: ['close-modal'],
  watch: {
    isActive(val) {
      if (val) {
        scroll.disable()

        if (this.duration) {
          setTimeout(() => {
            this.$emit('close-modal')
          }, this.duration);
        }
      } else {
        scroll.enable()
      }
    }
  }
}
</script>