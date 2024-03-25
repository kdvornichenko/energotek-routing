<template>
  <slot></slot>
  <ModalError />
</template>

<script>
import { useThemeStore } from '../stores/theme'
import { onMounted } from 'vue'

import ModalError from '../components/ModalError.vue'

export default {
  setup() {
    const themeStore = useThemeStore()
    const { setTheme } = themeStore

    onMounted(() => {
      let str = localStorage.getItem('theme')
      if (!str) {
          str = 'light'
      }
      setTheme(str)
    })
  },
  components: {
    ModalError,
  }
}
</script>
  