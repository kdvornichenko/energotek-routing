import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'
import { getQueryString, isEqualObjects } from '../assets/ts/helpers'

export const useDocumentsStore = defineStore('documents', () => {
    const { setError } = useErrorStore()

    const documentsLoaded = ref(false)
    const documents = ref([])
    const pagination = ref({
        pagenum: 0,
        pagelen: 20,
        total: 1
    })

    const documentsFilters = ref({})

    const dataStore = ref({})
    const paginationStore = ref({})

    function getDocuments(query: object) {
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

        documentsLoaded.value = false
        dataStore.value = data
        paginationStore.value = paginationQuery

        return axios({
            method: 'post',
            url: 'https://etk.a512.ru/ka/hs/CRM/kplist?' + getQueryString(paginationQuery),
            headers: {
                token: localStorage.getItem('token'),
            },
            data,
        })
            .then(response => response.data)
            .then(data => {
                documents.value = data.Результат
                setPagination({
                    pagenum: +paginationQuery.pagenum,
                    pagelen: +paginationQuery.pagelen,
                    total: data.КоличествоСтраниц
                })
                window.scrollTo(0, 0)
                documentsLoaded.value = true
            })
            .catch(error => setError(error.response.data.reason))
    }

    function setPagination(val) {
        pagination.value = val
    }

    function setDocumentsFilters(val) {
        documentsFilters.value = val
    }

    return { documents, documentsLoaded, documentsFilters, pagination, getDocuments, setDocumentsFilters }
})
