import { computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useSortStore = defineStore('sort', () => {
    const router = useRouter()
    const sort = computed(() => router.currentRoute.value.query.sort || 'ДатаИзменения-')
    
    function setSortToQuery(value: string) {
        const query = {...router.currentRoute.value.query}
        query.sort = value
        router.push({query})
    }

    return { sort, setSortToQuery }
})
