<template>
    <button class="filters__btn btn btn--icon" v-if="isFilters" @click="openModal">
        <SvgIcon :name="'filters'"/>
        <transition name="fade">
            <Counter v-if="counter" :count="counter" class="filters__btn-counter"/>
        </transition>
    </button>

    <Modal :isActive="isOpenModal" :transition="'translateToRight'" :name="'filters'" @close-modal="closeModal">
        <div class="filters container">
            <div class="filters__head">
                <Button @click-handler="reset" class="filters__reset" :icon="'trash'" :text="'Очистить'"/>
                <Button @click-handler="closeModal" class="filters__close" :mod="'icon'" :icon="'close'" />
            </div>
            <div class="filters__title">Фильтры</div>
            <div class="filters__main">
                <Filter v-for="filter in filters" :key="filter.name" :filter="filter"/>
                <FiltersSwitchers />
            </div>
            <div class="filters__bottom">
                <Button @click-handler="closeModal" class="filters__submit" :mod="'primary'" :text="'Показать'" />
            </div>
        </div>
    </Modal>
</template>

<script lang="ts">
import { useFiltersStore } from '../stores/filters'
import { storeToRefs } from 'pinia'

import Filter from './Filter.vue'
import FiltersSwitchers from './FiltersSwitchers.vue'

export default {
    setup() {
        const filtersStore = useFiltersStore()

        const { filters, filtersSwitchers } = storeToRefs(filtersStore)
        const { reset } = filtersStore
        return { filters, filtersSwitchers, reset }
    },
    props: {
        pageFilters: Object,
    },
    components: {
        Filter,
        FiltersSwitchers,
    },
    data() {
        return {
            isOpenModal: false,
        }
    },
    computed: {
        counter() {
            let counter = 0
            Object.keys(this.filters).forEach(key => counter += this.filters[key].counter)
            Object.keys(this.filtersSwitchers).forEach(key => counter += this.filtersSwitchers[key].counter)
            return counter
        },
        isFilters() {
            return !!(Object.keys(this.filters).length)
        },
    },
    methods: {
        openModal() {
            this.isOpenModal = true
        },
        closeModal() {
            this.isOpenModal = false
        },
    }
}
</script>
