import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'virtual:svg-icons-register'

import App from './App.vue'
import router from './router'

import Button from './components/ui/Button.vue'
import Loader from './components/ui/Loader.vue'
import SvgIcon from './components/ui/SvgIcon.vue'
import Modal from './components/ui/Modal.vue'
import Switcher from './components/ui/Switcher.vue'
import Acc from './components/ui/Acc.vue'
import Counter from './components/ui/Counter.vue'
import Checkbox from './components/ui/Checkbox.vue'
import Select from './components/ui/Select.vue'

import './assets/sass/main.sass'
import './assets/ts/main'

const app = createApp(App)

app.component('Button', Button)
app.component('Loader', Loader)
app.component('SvgIcon', SvgIcon)
app.component('Modal', Modal)
app.component('Switcher', Switcher)
app.component('Acc', Acc)
app.component('Counter', Counter)
app.component('Checkbox', Checkbox)
app.component('Select', Select)

app.use(createPinia())
app.use(router)

app.mount('#app')
