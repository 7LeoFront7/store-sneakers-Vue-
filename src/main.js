import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './assets/index.css'
import EN from './local/en.json'
import RU from './local/ru.json'
import Home from './pages/Home.vue'
import Favorites from './pages/favorites.vue'

const app = createApp(App)

const i18n = createI18n({
	locale: 'RU',
	messages: {
		RU: RU,
		EN: EN
	}
})

const routes = [
	{ path: '/', name: 'Home', component: Home },
	{ path: '/favorites', name: 'Favorites', component: Favorites },
]

const router = createRouter({
	history: createWebHistory(),
	routes
})


app.use(i18n)
app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
