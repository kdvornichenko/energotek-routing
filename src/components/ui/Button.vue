<template>
  <button :class="className" @click="$emit('click-handler')">
    <SvgIcon v-if="icon" :name="icon" />
    <span class="btn__text" v-if="text"> {{ text }} </span>
  </button>
</template>

<script>
export default {
  props: {
    mod: String,
    icon: String,
    text: String,
  },
  computed: {
    className() {
      let className = 'btn';
      this.mod && (className += ' btn--' + this.mod);
      return className
    }
  },
  emits: ['click-handler'],
}
</script>
