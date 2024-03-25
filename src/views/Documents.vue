<template>
    <Main>
        <template v-slot:title>Документы</template>

        <Search class="main__search" />

        <div class="main__tabs">
            <Button
                v-for="typeTab in documentsTypeTabs"
                :key="typeTab.value"
                @click-handler="documentsType = typeTab.value"
                class="main__tab"
                :class="{'is-active': typeTab.value === documentsType}"
                :text="typeTab.name"
            />
        </div>

        <Loader :isActive="!documentsLoaded"/>

        <template v-if="documentsLoaded && documents.length">
            <div v-if="documents.length" class="main__list">
                <DocumentCard :type="documentsType" :document="document" class="main__list-item" v-for="document in documents" :key="document.GUID" />
            </div>

            <Pagination v-if="pagination.total > 1" :pagination="pagination" :name="'documents'" />
        </template>

        <Filters />
    </Main>
</template>

<script lang="ts">
import Main from '../layouts/main.vue'
import Search from '../components/ui/Search.vue'
import Filters from '../components/Filters.vue'
import Pagination from '../components/ui/Pagination.vue'
import DocumentCard from '../components/DocumentCard.vue'
import { useDocumentsStore } from '../stores/documents'
import { useFiltersStore } from '../stores/filters'
import { storeToRefs } from 'pinia'

export default {
    components: {
        Main,
        Search,
        Filters,
        Pagination,
        DocumentCard,
    },
    setup() {
        const documentsStore = useDocumentsStore()
        const filtersStore = useFiltersStore()

        const { documents, documentsLoaded, documentsFilters, pagination } = storeToRefs(documentsStore)
        const { setDocumentsFilters } = documentsStore
        const { getFilters, setFilters, setFiltersSwitchersData } = filtersStore

        if (Object.keys(documentsFilters.value).length) {
            setFilters(documentsFilters.value)
        } else {
            getFilters('document')
                .then(data => setDocumentsFilters(data))
        }
        setFiltersSwitchersData({})

        return { documents, documentsLoaded, pagination }
    },
    beforeRouteEnter(to) {
        const documentsStore = useDocumentsStore()
        const { getDocuments } = documentsStore
        getDocuments({...to.query})
    },
    beforeRouteUpdate(to) {
        const documentsStore = useDocumentsStore()
        const { getDocuments } = documentsStore
        getDocuments({...to.query})
    },
    data() {
        return {
            documentsTypeTabs: [
                {
                    name: 'КП',
                    value: 'offer',
                },
                {
                    name: 'Счета',
                    value: 'payment',
                },
            ],
            documentsType: 'offer', // or 'payment'
        }
    },
}
</script>
