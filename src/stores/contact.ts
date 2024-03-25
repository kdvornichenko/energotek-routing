import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'

export const useContactStore = defineStore('contact', () => {
    const { setError } = useErrorStore()
    const contactLoaded = ref(false)
    const contact = ref({})
    const activeContactTab = ref('Проекты')

    function getContact(id: string) {
        contactLoaded.value = false

        return axios({
            method: 'get',
            url: 'https://etk.a512.ru/ka/hs/CRM/getcontactcart?GUID=' + id,
            headers: {
                token: localStorage.getItem('token'),
            }
        })
            .then(response => response.data)
            .then(data => {
                contact.value = {
                    ...data,
                    GUID: id,
                }
                contactLoaded.value = true
                changeContactTab('Проекты')
            })
            .catch(error => setError(error.response.data.reason))
    }

    function changeContactTab(name: string) {
        activeContactTab.value = name
    }

    return { contact, contactLoaded, activeContactTab, getContact, changeContactTab }
})
