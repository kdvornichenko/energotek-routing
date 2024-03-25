<template>
    <Acc class="filter">
        <template v-slot:btn>
            <span> {{ filter.name }} </span>
            <transition name="fade">
                <Counter v-if="filter.counter" :count="filter.counter" class="filter__counter"/>
            </transition>
        </template>

        <div class="filter__checkboxes">
            <Checkbox class="filter__checkbox" v-for="item in filter.list" :key="item.name" :name="item.name" :checked="item.checked" @change-handler="change"/>
        </div>
    </Acc>
</template>

<script lang="ts">
import { useFiltersStore } from '../stores/filters'
import { storeToRefs } from 'pinia'

export default {
    setup() {
        const filtersStore = useFiltersStore()

        const { filters } = storeToRefs(filtersStore)
        const { setFiltersToQuery } = filtersStore
        return { filters, setFiltersToQuery }
    },
    props: {
        filter: Object,
    },
    data() {
        return {
            isOpenModal: false,
        }
    },
    methods: {
        openModal() {
            this.isOpenModal = true
        },
        closeModal() {
            this.isOpenModal = false
        },
        change(e) {
            this.setFiltersToQuery(this.filter.id, e.target.name)
        },
    }
}
</script>
