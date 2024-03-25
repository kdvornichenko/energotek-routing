<template>
    <Main>
        <template v-slot:title>Проекты</template>

        <Search class="main__search" />

        <Select class="main__sort" :select="select" :value="sort" @select:change="changeSort" />

        <Loader :isActive="!projectsLoaded"/>

        <template v-if="projectsLoaded && projects.length">
            <div v-if="projects.length" class="main__list">
                <ProjectCard :component="'router-link'" :project="project" class="main__list-item" v-for="project in projects" :key="project.GUID" />
            </div>

            <Pagination v-if="pagination.total > 1" :pagination="pagination" :name="'projects'" />
        </template>

        <Filters />
    </Main>
</template>

<script lang="ts">
import Main from '../layouts/main.vue'
import Search from '../components/ui/Search.vue'
import Filters from '../components/Filters.vue'
import Pagination from '../components/ui/Pagination.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { useProjectsStore } from '../stores/projects'
import { useFiltersStore } from '../stores/filters'
import { useSortStore } from '../stores/sort'
import { storeToRefs } from 'pinia'

export default {
    components: {
        Main,
        Search,
        Filters,
        Pagination,
        ProjectCard,
    },
    setup() {
        const projectsStore = useProjectsStore()
        const filtersStore = useFiltersStore()
        const sortStore = useSortStore()

        const { projects, projectsLoaded, projectsFilters, pagination } = storeToRefs(projectsStore)
        const { setProjectsFilters } = projectsStore
        const { sort } = storeToRefs(sortStore)
        const { setSortToQuery } = sortStore
        const { getFilters, setFilters, setFiltersSwitchersData } = filtersStore

        if (Object.keys(projectsFilters.value).length) {
            setFilters(projectsFilters.value)
        } else {
            getFilters('project')
                .then(data => setProjectsFilters(data))
        }
        
        setFiltersSwitchersData({
            'managed_projs': {
                text: 'Мои проекты',
            },
            'somanaged_projs': {
                text: 'Участвую в проекте',
            },
        })

        return { projects, projectsLoaded, pagination, sort, setSortToQuery }
    },
    beforeRouteEnter(to) {
        const projectsStore = useProjectsStore()
        const { getProjects } = projectsStore
        getProjects({...to.query})
    },
    beforeRouteUpdate(to) {
        const projectsStore = useProjectsStore()
        const { getProjects } = projectsStore
        getProjects({...to.query})
    },
    data() {
        return {
            select: {
                name: 'Сортировка',
                placeholder: 'Сортировка',
                type: 'common',
                icon: 'sort',
                options: [
                    {
                        value: 'Дата+',
                        text: 'По дате создания',
                        icon: 'arrow-up-lg',
                    },
                    {
                        value: 'Дата-',
                        text: 'По дате создания',
                        icon: 'arrow-down-lg',
                    },
                    {
                        value: 'ДатаИзменения+',
                        text: 'По дате редактирования',
                        icon: 'arrow-up-lg',
                    },
                    {
                        value: 'ДатаИзменения-',
                        text: 'По дате редактирования',
                        icon: 'arrow-down-lg',
                    },
                    {
                        value: 'Сумма+',
                        text: 'По стоимости',
                        icon: 'arrow-up-lg',
                    },
                    {
                        value: 'Сумма-',
                        text: 'По стоимости',
                        icon: 'arrow-down-lg',
                    },
                ]
            },
        }
    },
    methods: {
        changeSort(value: string) {
            this.setSortToQuery(value)
        }
    },
}
</script>
  