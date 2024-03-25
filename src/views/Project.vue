<template>
    <Main>
        <template v-slot:crumbs>
            <a href="javascript:void(0);" @click="from ? router.back() : router.push('/')">
                <SvgIcon :name="'arrow-down'" />
                <span>Назад</span>
            </a>
        </template>

        <Loader :isActive="!projectLoaded"/>

        <div class="main__card" v-if="projectLoaded && project">
            <ProjectCard :component="'div'" :project="project" class="main__card-el" />

            <div class="main__card-tabs">
                <div class="main__card-tabs-inner">
                    <button class="main__card-tab-btn" :class="{'is-active': activeProjectTab === tab.name}" @click="changeProjectTab(tab.name)" v-for="tab in tabs" :key="tab.name">
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
                    v-for="item in project[activeTab.name]"
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
import ProjectCard from '../components/ProjectCard.vue'
import Block from '../components/Block.vue'
import BlockMessage from '../components/BlockMessage.vue'
import BlockTerm from '../components/BlockTerm.vue'
import BlockProduct from '../components/BlockProduct.vue'
import BlockPartner from '../components/BlockPartner.vue'
import BlockManager from '../components/BlockManager.vue'
import { useProjectStore } from '../stores/project'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
    components: {
        Main,
        ProjectCard,
        Block,
        BlockMessage,
        BlockTerm,
        BlockProduct,
        BlockPartner,
        BlockManager,
    },
    setup() {
        const router = useRouter()

        const projectStore = useProjectStore()

        const { project, projectLoaded, activeProjectTab } = storeToRefs(projectStore)
        const { changeProjectTab } = projectStore
        return { router, project, projectLoaded, activeProjectTab, changeProjectTab }
    },
    beforeRouteEnter(to, from, next) {
        const projectStore = useProjectStore()

        const { project } = storeToRefs(projectStore)
        const { getProject } = projectStore
        if (to.params.id !== project?.value.GUID) {
            getProject(to.params.id)
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
                    name: 'СобытияИКомментарии',
                    text: 'События, комментарии',
                    icon: 'message',
                    key: 'Дата',
                    blockName: 'Message',
                    router: '',
                },
                {
                    name: 'Сроки',
                    text: 'Сроки',
                    icon: 'dates',
                    key: 'СрокДата',
                    blockName: 'Term',
                    router: '',
                },
                {
                    name: 'Товары',
                    text: 'Товары',
                    icon: 'goods',
                    key: 'Номенклатура',
                    blockName: 'Product',
                    router: '',
                },
                {
                    name: 'Партнеры',
                    text: 'Партнеры',
                    icon: 'partners',
                    key: 'Партнер',
                    blockName: 'Partner',
                    router: '/partners/',
                },
                {
                    name: 'ОтветственныеМенеджеры',
                    text: 'Ответственные менеджеры',
                    icon: 'partners',
                    key: 'Наименование',
                    blockName: 'Manager',
                    router: '',
                },

            ],
        }
    },
    computed: {
        activeTab() {
            return this.tabs.find(tab => tab.name === this.activeProjectTab)
        },
    },
}
</script>
  