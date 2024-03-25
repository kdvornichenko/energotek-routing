<template>
    <Main>
        <template v-slot:title>Контакты</template>

        <Search class="main__search" />

        <Loader :isActive="!contactsLoaded"/>

        <template v-if="contactsLoaded && contacts.length">
            <div v-if="contacts.length" class="main__list">
                <ContactCard :component="'router-link'" :contact="contact" class="main__list-item" v-for="contact in contacts" :key="contact.GUID" />
            </div>

            <Pagination v-if="pagination.total > 1" :pagination="pagination" :name="'contacts'" />
        </template>

        <Filters />
    </Main>
</template>

<script lang="ts">
import Main from '../layouts/main.vue'
import Search from '../components/ui/Search.vue'
import Filters from '../components/Filters.vue'
import Pagination from '../components/ui/Pagination.vue'
import ContactCard from '../components/ContactCard.vue'
import { useContactsStore } from '../stores/contacts'
import { useFiltersStore } from '../stores/filters'
import { storeToRefs } from 'pinia'

export default {
    components: {
        Main,
        Search,
        Filters,
        Pagination,
        ContactCard,
    },
    setup() {
        const contactsStore = useContactsStore()
        const filtersStore = useFiltersStore()

        const { contacts, contactsLoaded, contactsFilters, pagination } = storeToRefs(contactsStore)
        const { setContactsFilters } = contactsStore
        const { getFilters, setFilters, setFiltersSwitchersData } = filtersStore

        if (Object.keys(contactsFilters.value).length) {
            setFilters(contactsFilters.value)
        } else {
            getFilters('contact')
                .then(data => setContactsFilters(data))
        }
        setFiltersSwitchersData({})

        return { contacts, contactsLoaded, pagination }
    },
    beforeRouteEnter(to) {
        const contactsStore = useContactsStore()
        const { getContacts } = contactsStore
        getContacts({...to.query})
    },
    beforeRouteUpdate(to) {
        const contactsStore = useContactsStore()
        const { getContacts } = contactsStore
        getContacts({...to.query})
    },
}
</script>
