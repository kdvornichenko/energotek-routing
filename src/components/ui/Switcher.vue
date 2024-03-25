<template>
  <label class="switcher">
    <span class="switcher__label" v-if="label"> {{ label }} </span>
    <input type="checkbox" :checked="checked" :name="name" @change="$emit('change-handler', $event)">
    <span class="switcher__el"></span>
  </label>
</template>

<script>
export default {
  props: {
    checked: Boolean,
    // value: {
    //   type: String,
    //   name: '',
    // },
    name: String,
    label: String,
  },
  emits: ['change-handler'],
}
</script>
