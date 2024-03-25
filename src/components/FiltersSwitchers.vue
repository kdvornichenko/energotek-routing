<template>
    <div class="filters-switchers">
        <Switcher 
            class="filters-switchers__item"
            v-for="(filter, key) in filtersSwitchers"
            :checked="filter.checked"
            :name="key"
            :label="filter.text"
            :key="key"
            @change-handler="change"
        />
    </div>
</template>

<script lang="ts">
import { useFiltersStore } from '../stores/filters'
import { storeToRefs } from 'pinia'

export default {
    setup() {
        const filtersStore = useFiltersStore()

        const { filtersSwitchers } = storeToRefs(filtersStore)
        const { setFiltersSwitchersToQuery } = filtersStore
        return { filtersSwitchers, setFiltersSwitchersToQuery }
    },
    methods: {
        change(e) {
            this.setFiltersSwitchersToQuery(e.target.name)
        },
    },
}
</script>
