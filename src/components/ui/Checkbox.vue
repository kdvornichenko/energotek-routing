<template>
  <label class="checkbox">
    <input type="checkbox" :name="name" :checked="checked" @change="$emit('change-handler', $event)">
    <span class="checkbox__text">{{ name }}</span>
    <span class="checkbox__el">
      <span class="checkbox__check">
        <SvgIcon :name="'check'" />
      </span>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    checked: Boolean,
    name: String,
  },
  emits: ['change-handler'],
}
</script>
