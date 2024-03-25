import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
    const router = useRouter()
    const search = computed(() => router.currentRoute.value.query.search)

    function setSearchToQuery(value: string) {
        const query = {...router.currentRoute.value.query}
        delete query.pagenum
        delete query.pagelen
        value.length ? query.search = value : delete query.search
        router.push({query})
    }

    return { search, setSearchToQuery }
})
