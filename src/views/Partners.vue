<template>
    <Main>
        <template v-slot:title>Клиенты</template>

        <Search class="main__search" />

        <Loader :isActive="!partnersLoaded"/>

        <template v-if="partnersLoaded && partners.length">
            <div v-if="partners.length" class="main__list">
                <PartnerCard :component="'router-link'" :partner="partner" class="main__list-item" v-for="partner in partners" :key="partner.GUID" />
            </div>

            <Pagination v-if="pagination.total > 1" :pagination="pagination" :name="'partners'" />
        </template>

        <Filters />
    </Main>
</template>

<script lang="ts">
import Main from '../layouts/main.vue'
import Search from '../components/ui/Search.vue'
import Filters from '../components/Filters.vue'
import Pagination from '../components/ui/Pagination.vue'
import PartnerCard from '../components/PartnerCard.vue'
import { usePartnersStore } from '../stores/partners'
import { useFiltersStore } from '../stores/filters'
import { storeToRefs } from 'pinia'

export default {
    components: {
        Main,
        Search,
        Filters,
        Pagination,
        PartnerCard,
    },
    setup() {
        const partnersStore = usePartnersStore()
        const filtersStore = useFiltersStore()

        const { partners, partnersLoaded, partnersFilters, pagination } = storeToRefs(partnersStore)
        const { setPartnersFilters } = partnersStore
        const { getFilters, setFilters, setFiltersSwitchersData } = filtersStore


        if (Object.keys(partnersFilters.value).length) {
            setFilters(partnersFilters.value)
        } else {
            getFilters('partner')
                .then(data => setPartnersFilters(data))
        }

        setFiltersSwitchersData({
            'managed_partners': {
                text: 'Мои компании',
            },
        })

        return { partners, partnersLoaded, pagination }
    },
    beforeRouteEnter(to) {
        const partnersStore = usePartnersStore()
        const { getPartners } = partnersStore
        getPartners({...to.query})
    },
    beforeRouteUpdate(to) {
        const partnersStore = usePartnersStore()
        const { getPartners } = partnersStore
        getPartners({...to.query})
    },
}
</script>
  