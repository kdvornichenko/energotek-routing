<template>
    <Main>
        <template v-slot:crumbs>
            <a href="javascript:void(0);" @click="from ? router.back() : router.push('/contacts')">
                <SvgIcon :name="'arrow-down'" />
                <span>Назад</span>
            </a>
        </template>

        <Loader :isActive="!contactLoaded"/>

        <div class="main__card" v-if="contactLoaded && contact">
            <ContactCard :component="'div'" :contact="contact" class="main__card-el" />

            <div class="main__card-tabs">
                <div class="main__card-tabs-inner">
                    <button class="main__card-tab-btn" :class="{'is-active': activeContactTab === tab.name}" @click="changeContactTab(tab.name)" v-for="tab in tabs" :key="tab.name">
                        <span class="main__card-tab-btn-icon">
                            <SvgIcon :name="tab.icon" />
                        </span>
                        <span class="main__card-tab-btn-text"> {{ tab.text }} </span>
                    </button>
                </div>
            </div>

            <!-- <Button class="main__card-add-btn" :mod="'primary'" :icon="'add'" :text="'Добавить'" /> -->

            <div class="main__card-tabs-content">
                <div v-if="contact[activeTab.name].length">
                    <Block 
                        class="main__card-tabs-content-item"
                        v-for="item in contact[activeTab.name]"
                        :key="item[activeTab.key]"
                        :icon="activeTab.icon"
                        :id="item.GUID"
                        :router="activeTab.router"
                    >
                        <component :is="'Block' + activeTab.blockName" :item="item"></component>
                    </Block>
                </div>

                <!-- Исключение -->
                <div v-if="activeTab.name === 'Клиент'">
                    <Block 
                        class="main__card-tabs-content-item"
                        :icon="activeTab.icon"
                        :id="contact[activeTab.name].GUID"
                        :router="activeTab.router"
                    >
                        <component
                            :is="'Block' + activeTab.blockName"
                            :item="{
                                'Партнер': contact[activeTab.name].Наименование,
                                'GUID': contact[activeTab.name].GUID
                            }"
                        >
                        </component>
                    </Block>
                </div>
            </div>
        </div>
    </Main>
</template>

<script lang="ts">
import Main from '../layouts/main.vue'
import ContactCard from '../components/ContactCard.vue'
import Block from '../components/Block.vue'
import BlockProject from '../components/BlockProject.vue'
import { useContactStore } from '../stores/contact'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
    components: {
        Main,
        ContactCard,
        Block,
        BlockProject,
    },
    setup() {
        const router = useRouter()

        const contactStore = useContactStore()
        
        const { contact, contactLoaded, activeContactTab } = storeToRefs(contactStore)
        const { changeContactTab } = contactStore
        return { router, contact, contactLoaded, activeContactTab, changeContactTab }
    },
    beforeRouteEnter(to, from, next) {
        const contactStore = useContactStore()

        const { contact } = storeToRefs(contactStore)
        const { getContact } = contactStore
        if (to.params.id !== contact?.value.GUID) {
            getContact(to.params.id)
        }

        next(data => {
            data.from = from.name
        })
    },
    data() {
        return {
            from: '',
            tabs: [
                {
                    name: 'Проекты',
                    text: 'Проекты',
                    icon: 'projects',
                    key: 'GUID',
                    blockName: 'Project',
                    router: '/projects/',
                },
            ],
        }
    },
    computed: {
        activeTab() {
            return this.tabs.find(tab => tab.name === this.activeContactTab)
        },
    },
}
</script>
  