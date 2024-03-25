import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'

export const usePartnerStore = defineStore('partner', () => {
    const { setError } = useErrorStore()
    const partnerLoaded = ref(false)
    const partner = ref({})
    const activePartnerTab = ref('Проекты')

    function getPartner(id: string) {
        partnerLoaded.value = false

        return axios({
            method: 'get',
            url: 'https://etk.a512.ru/ka/hs/CRM/getpartnercart?GUID=' + id,
            headers: {
                token: localStorage.getItem('token'),
            }
        })
            .then(response => response.data)
            .then(data => {
                partner.value = {
                    ...data,
                    GUID: id,
                }
                partnerLoaded.value = true
                changePartnerTab('Проекты')
            })
            .catch(error => setError(error.response.data.reason))
    }

    function changePartnerTab(name: string) {
        activePartnerTab.value = name
    }

    return { partner, partnerLoaded, activePartnerTab, getPartner, changePartnerTab }
})
