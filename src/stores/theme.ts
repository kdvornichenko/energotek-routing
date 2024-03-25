import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    const theme = ref('')

    function setTheme(val:string) {
        localStorage.setItem('theme', val)
        theme.value = val
        document.body.classList.remove('light')
        document.body.classList.remove('dark')
        document.body.classList.add(val)
    }

    return { theme, setTheme }
})
