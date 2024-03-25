<template>
    <header class="header container">
        <div class="header__pagename"><slot name="title"></slot></div>
        <div class="header__crumbs"><slot name="crumbs"></slot></div>
        <Button class="header__burger-btn" :mod="'icon'" :icon="'menu'" @click-handler="openModal" />
    </header>

    <Modal :isActive="isOpenModal" :name="'burger'" @close-modal="closeModal">
        <div class="header__burger container">
            <Button @click-handler="closeModal" class="header__burger-close" :mod="'icon'" :icon="'close'" />
            <div v-if="user.name" class="header__user">
                <SvgIcon :name="'user'" />
                <span> {{ user.name }} </span>
            </div>
            <div class="header__theme-btn">
                <SvgIcon :name="'sun'" />
                <Switcher :checked="theme === 'dark'" :label="'Темная тема'" @change-handler="changeTheme"/>
            </div>
            <Button @click-handler="logout" class="header__logout" :icon="'logout'" :text="'Выйти'" />
        </div>
    </Modal>
</template>

<script lang="ts">
import { useUserStore } from '../stores/user'
import { useThemeStore } from '../stores/theme'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const router = useRouter()

        const userStore = useUserStore()
        const themeStore = useThemeStore()

        const { user } = storeToRefs(userStore)
        const { theme } = storeToRefs(themeStore)
        const { setTheme } = themeStore
        return { router, user, theme, setTheme }
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
        logout() {
            localStorage.removeItem('token')
            this.router.push('/login')
        },
        changeTheme(e) {
            this.setTheme(e.target.checked ? 'dark' : 'light')
        }
    }
}
</script>
