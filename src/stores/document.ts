import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'

export const useDocumentStore = defineStore('document', () => {
    const { setError } = useErrorStore()

    function getDocument({id, url, type}) { // type = 'offer' || 'payment'
        const documentUrl = url ?? ((type === 'offer' ? 'https://etk.a512.ru/ka/hs/CRM/getkpcart?GUID=' : 'https://etk.a512.ru/ka/hs/CRM/getschetcart?GUID=') + id)

        return axios({
            method: 'get',
            url: documentUrl,
            headers: {
                token: localStorage.getItem('token'),
            },
            responseType: 'arraybuffer',
        })
            .then(response => response.data)
            .catch(error => setError(error.response.data.reason))
    }

    return { getDocument }
})
