import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', () => {
    const error = ref('')

    const setError = (val: string) => {
        if (val === 'Неверный токен') {
            localStorage.removeItem('token')
            window.location.href = '/login'
        } else {
            error.value = val
        }
    }

    const removeError = () => error.value = ''

    return { error, setError, removeError }
})
