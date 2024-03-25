import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'

export const useFiltersStore = defineStore('filters', () => {
    const { setError } = useErrorStore()
    const router = useRouter()

    const filtersData = ref({})
    const filtersSwitchersData = ref({})

    const filters = computed(() => {
        const query = router.currentRoute.value.query
        const obj = {}

        Object.keys(filtersData.value).forEach(key => {
            let filter = {...filtersData.value[key]}

            filter.id = key
            filter.counter = 0
            filter.list = filter.list.map((value: string) => {
                let checked = !!query[key + '-is-' + value];

                filter.counter += checked

                return ({
                    name: value,
                    checked
                })
            })
            obj[key] = filter
        })
        
        return obj
    })

    const filtersSwitchers = computed(() => {
        const query = router.currentRoute.value.query
        const obj = {}

        Object.keys(filtersSwitchersData.value).forEach(key => {
            let filter = {...filtersSwitchersData.value[key]}

            filter.id = key
            filter.name = key
            filter.checked = !!query[key]
            filter.counter = query[key] ? 1 : 0

            obj[key] = filter
        })
        
        return obj
    })

    function getFilters(type) {
        return axios({
            method: 'get',
            url: 'https://etk.a512.ru/ka/hs/CRM/getfilters?razdel=' + type,
            headers: {
                token: localStorage.getItem('token'),
            }
        })
            .then(response => response.data)
            .then(data => {
                setFilters(data)
                return data
            })
            .catch(error => setError(error.response.data.reason))
    }

    function setFilters(data) {
        filtersData.value = data
    }

    function setFiltersToQuery(id: string, value: string) {
        const query = {...router.currentRoute.value.query}
        delete query.pagenum
        delete query.pagelen
        const key = id + '-is-' + value

        if (!query[key]) {
            query[key] = 'true'
        } else {
            delete query[key]
        }
        router.push({query})
    }

    function setFiltersSwitchersToQuery(name: string) {
        const query = {...router.currentRoute.value.query}
        delete query.pagenum
        delete query.pagelen

        if (!query[name]) {
            query[name] = 'true'

            // Исключение
            if (name === 'somanaged_projs') {
                delete query['managed_projs']
            }
            if (name === 'managed_projs') {
                delete query['somanaged_projs']
            }
        } else {
            delete query[name]
        }
        router.push({query})
    }

    function reset() {
        router.push({query: ''})
    }

    function setFiltersSwitchersData(val:object) {
        filtersSwitchersData.value = val
    }

    return { filters, filtersSwitchers, getFilters, setFilters, setFiltersSwitchersData, reset, setFiltersToQuery, setFiltersSwitchersToQuery }
})
