import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'
import { getQueryString, isEqualObjects } from '../assets/ts/helpers'

export const usePartnersStore = defineStore('partners', () => {
    const { setError } = useErrorStore()

    const partnersLoaded = ref(false)
    const partners = ref([])
    const pagination = ref({
        pagenum: 0,
        pagelen: 20,
        total: 1
    })

    const partnersFilters = ref({})

    const dataStore = ref({})
    const paginationStore = ref({})

    function getPartners(query: object) {
        const paginationQuery = {
            pagenum: query.pagenum || 0,
            pagelen: query.pagelen || 20,
        }

        delete query.pagenum
        delete query.pagelen
        let data = {}
        Object.keys(query).forEach(key => {
            if (key === 'search' || key === 'sort') {
                data[key] = query[key]
                return
            }

            const arr = key.split('-is-')
            if (arr.length > 1) {
                data[arr[0]] ? data[arr[0]].push(arr[1]) : data[arr[0]] = [arr[1]]
            } else {
                data[key] = true
            }
        })

        if (isEqualObjects(dataStore.value, data) && isEqualObjects(paginationStore.value, paginationQuery)) {
            return
        }

        partnersLoaded.value = false
        dataStore.value = data
        paginationStore.value = paginationQuery

        return axios({
            method: 'post',
            url: 'https://etk.a512.ru/ka/hs/CRM/partnerlist?' + getQueryString(paginationQuery),
            headers: {
                token: localStorage.getItem('token'),
            },
            data,
        })
            .then(response => response.data)
            .then(data => {
                partners.value = data.Результат
                setPagination({
                    pagenum: +paginationQuery.pagenum,
                    pagelen: +paginationQuery.pagelen,
                    total: data.КоличествоСтраниц
                })
                window.scrollTo(0, 0)
                partnersLoaded.value = true
            })
            .catch(error => setError(error.response.data.reason))
    }

    function setPagination(val) {
        pagination.value = val
    }

    function setPartnersFilters(val) {
        partnersFilters.value = val
    }

    return { partners, partnersLoaded, partnersFilters, pagination, getPartners, setPartnersFilters }
})
