import { ref, onBeforeMount } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'

export const useUserStore = defineStore('user', () => {
    const { setError } = useErrorStore()
    const user = ref({
        name: '',
    })

    onBeforeMount(getUser)

    function getUser() {
        axios({
            method: 'get',
            url: 'https://etk.a512.ru/ka/hs/CRM/getusername',
            headers: {
                token: localStorage.getItem('token'),
            }
        })
            .then(response => response.data)
            .then(data => user.value.name = data.username)
            .catch(error => setError(error.response.data.reason))
    }

    return { user, getUser }
})
