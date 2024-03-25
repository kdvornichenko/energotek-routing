import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'
import { getQueryString, isEqualObjects } from '../assets/ts/helpers'

export const useContactsStore = defineStore('contacts', () => {
    const { setError } = useErrorStore()

    const contactsLoaded = ref(false)
    const contacts = ref([])
    const pagination = ref({
        pagenum: 0,
        pagelen: 20,
        total: 1
    })

    const contactsFilters = ref({})

    const dataStore = ref({})
    const paginationStore = ref({})

    function getContacts(query: object) {
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

        contactsLoaded.value = false
        dataStore.value = data
        paginationStore.value = paginationQuery

        return axios({
            method: 'post',
            url: 'https://etk.a512.ru/ka/hs/CRM/contactlist?' + getQueryString(paginationQuery),
            headers: {
                token: localStorage.getItem('token'),
            },
            data,
        })
            .then(response => response.data)
            .then(data => {
                contacts.value = data.Результат
                setPagination({
                    pagenum: +paginationQuery.pagenum,
                    pagelen: +paginationQuery.pagelen,
                    total: data.КоличествоСтраниц
                })
                window.scrollTo(0, 0)
                contactsLoaded.value = true
            })
            .catch(error => setError(error.response.data.reason))
    }

    function setPagination(val) {
        pagination.value = val
    }

    function setContactsFilters(val) {
        contactsFilters.value = val
    }

    return { contacts, contactsLoaded, contactsFilters, pagination, getContacts, setContactsFilters }
})
