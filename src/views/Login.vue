<template>
    <main class="login container main">
        <div class="login__window">
            <h1 class="login__title">Авторизация</h1>
            <form action="" class="form login__form" @submit.prevent="sendForm">
                <div class="form__field">
                    <label for="login" class="form__label">Логин</label>
                    <input id="login" type="text" name="login" class="form__input" v-model.trim="login">
                </div>
                <div class="form__field">
                    <label for="password" class="form__label">Пароль</label>
                    <div class="form__input-wrap">
                        <input id="password" :type="passwordFieldType" name="password" class="form__input" v-model.trim="password">
                        <Button type="button" class="login__pass-btn" :mod="'icon'" :icon="'pass'" @click-handler="changePasswordFieldType"/>
                    </div>
                </div>
                <Button type="submit" class="form__submit" :mod="'primary'" :text="'Войти'" />
            </form>
        </div>
    </main>
</template>

<script lang="ts">
import { useAuthStore } from '../stores/auth'

export default {
    setup() {
        const authStore = useAuthStore()

        const { loginUser } = authStore
        return { loginUser }
    },
    data:() => ({
        login: '',
        password: '',
        passwordFieldType: 'password',
    }),
    methods: {
        sendForm() {
            this.loginUser({
                login: this.login,
                password: this.password,
            })
        },
        changePasswordFieldType() {
            this.passwordFieldType === 'password' ? this.passwordFieldType = 'text' : this.passwordFieldType = 'password'
        }
    },
}
</script>