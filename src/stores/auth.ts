import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

import { useErrorStore } from './error'

export const useAuthStore = defineStore('auth', () => {
    const { setError } = useErrorStore()
    const router = useRouter()

    function loginUser(data) {
        return axios({
            method: 'get',
            url: `https://etk.a512.ru/ka/hs/CRM/auth?login=${data.login}&password=${data.password}`,
        })
            .then(response => response.data)
            .then(data => {
                localStorage.setItem('token', data)
                router.push('/')
            })
            .catch(error => setError(error.response.data.reason))
    }

    return { loginUser }
})
