<template>
    <Main>
        <template v-slot:crumbs>
            <a href="javascript:void(0);" @click="from ? router.back() : router.push('/partners')">
                <SvgIcon :name="'arrow-down'" />
                <span>Назад</span>
            </a>
        </template>

        <Loader :isActive="!partnerLoaded"/>

        <div class="main__card" v-if="partnerLoaded && partner">
            <PartnerCard :component="'div'" :partner="partner" class="main__card-el" />

            <div class="main__card-tabs">
                <div class="main__card-tabs-inner">
                    <button class="main__card-tab-btn" :class="{'is-active': activePartnerTab === tab.name}" @click="changePartnerTab(tab.name)" v-for="tab in tabs" :key="tab.name">
                        <span class="main__card-tab-btn-icon">
                            <SvgIcon :name="tab.icon" />
                        </span>
                        <span class="main__card-tab-btn-text"> {{ tab.text }} </span>
                    </button>
                </div>
            </div>

            <!-- <Button class="main__card-add-btn" :mod="'primary'" :icon="'add'" :text="'Добавить'" /> -->

            <div class="main__card-tabs-content">
                <Block 
                    class="main__card-tabs-content-item"
                    v-for="item in partner[activeTab.name]"
                    :key="item[activeTab.key]"
                    :icon="activeTab.icon"
                    :id="item.GUID"
                    :router="activeTab.router"
                >
                    <component :is="'Block' + activeTab.blockName" :item="item"></component>
                </Block>
            </div>
        </div>
    </Main>
</template>

<script lang="ts">
import Main from '../layouts/main.vue'
import PartnerCard from '../components/PartnerCard.vue'
import Block from '../components/Block.vue'
import BlockProject from '../components/BlockProject.vue'
import BlockContact from '../components/BlockContact.vue'
import { usePartnerStore } from '../stores/partner'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
    components: {
        Main,
        PartnerCard,
        Block,
        BlockProject,
        BlockContact,
    },
    setup() {
        const router = useRouter()

        const partnerStore = usePartnerStore()
        
        const { partner, partnerLoaded, activePartnerTab } = storeToRefs(partnerStore)
        const { changePartnerTab } = partnerStore
        return { router, partner, partnerLoaded, activePartnerTab, changePartnerTab }
    },
    beforeRouteEnter(to, from, next) {
        const partnerStore = usePartnerStore()

        const { partner } = storeToRefs(partnerStore)
        const { getPartner } = partnerStore
        if (to.params.id !== partner?.value.GUID) {
            getPartner(to.params.id)
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
                {
                    name: 'Контакты',
                    text: 'Контакты',
                    icon: 'partners',
                    key: 'GUID',
                    blockName: 'Contact',
                    router: '/contacts/',
                },

            ],
        }
    },
    computed: {
        activeTab() {
            return this.tabs.find(tab => tab.name === this.activePartnerTab)
        },
    },
}
</script>
  