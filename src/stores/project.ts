import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

import { useErrorStore } from './error'

export const useProjectStore = defineStore('project', () => {
    const { setError } = useErrorStore()
    const projectLoaded = ref(false)
    const project = ref({})
    const activeProjectTab = ref('СобытияИКомментарии')

    function getProject(id: string) {
        projectLoaded.value = false

        return axios({
            method: 'get',
            url: 'https://etk.a512.ru/ka/hs/CRM/getprojectcart?GUID=' + id,
            headers: {
                token: localStorage.getItem('token'),
            }
        })
            .then(response => response.data)
            .then(data => {
                project.value = {
                    ...data,
                    GUID: id,
                }
                projectLoaded.value = true
                changeProjectTab('СобытияИКомментарии')
            })
            .catch(error => setError(error.response.data.reason))
    }

    function changeProjectTab(name: string) {
        activeProjectTab.value = name
    }

    return { project, projectLoaded, activeProjectTab, getProject, changeProjectTab }
})
