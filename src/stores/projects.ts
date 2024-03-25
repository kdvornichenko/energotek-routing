import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'
import { getQueryString, isEqualObjects } from '../assets/ts/helpers'

export const useProjectsStore = defineStore('projects', () => {
    const { setError } = useErrorStore()

    const projectsLoaded = ref(false)
    const projects = ref([])
    const pagination = ref({
        pagenum: 0,
        pagelen: 20,
        total: 1
    })

    const projectsFilters = ref({})

    const dataStore = ref({})
    const paginationStore = ref({})

    function getProjects(query: object) {
        const paginationQuery = {
            pagenum: query.pagenum || 0,
            pagelen: query.pagelen || 20,
        }

        delete query.pagenum
        delete query.pagelen

        if (!query.sort) {
            query.sort = 'ДатаИзменения-'
        }

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

        projectsLoaded.value = false
        dataStore.value = data
        paginationStore.value = paginationQuery

        return axios({
            method: 'post',
            url: 'https://etk.a512.ru/ka/hs/CRM/projectlistfiltered?' + getQueryString(paginationQuery),
            headers: {
                token: localStorage.getItem('token'),
            },
            data,
        })
            .then(response => response.data)
            .then(data => {
                projects.value = data.Результат
                setPagination({
                    pagenum: +paginationQuery.pagenum,
                    pagelen: +paginationQuery.pagelen,
                    total: data.КоличествоСтраниц
                })
                window.scrollTo(0, 0)
                projectsLoaded.value = true
            })
            .catch(error => setError(error.response.data.reason))
    }

    function setPagination(val) {
        pagination.value = val
    }

    function setProjectsFilters(val) {
        projectsFilters.value = val
    }

    return { projects, projectsLoaded, projectsFilters, pagination, getProjects, setProjectsFilters }
})
