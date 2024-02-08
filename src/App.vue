<script setup>
import { computed, provide, ref, watch } from 'vue'
import Drawer from './components/Drawer.vue'
import Header from './components/Header.vue'


const languageRuActive = ref(true)
const languageEnActive = ref(false)



const activeBtnLangRu = () => {
	if (!languageRuActive.value) {
		languageEnActive.value = false
		languageRuActive.value = true
	}
}

const activeBtnLangEn = (e) => {
	if (!languageEnActive.value) {
		languageEnActive.value = true
		languageRuActive.value = false
	}
}


/*===========Корзина===(START)===========*/
const cart = ref([])
const drawerOpen = ref(false)

const vatPrice = computed(() => Math.round(totalPrice.value * 0.07))
const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))






const addToCart = (item) => {
	cart.value.push(item)
	item.isAdded = true
}

const removeToCart = (item) => {
	cart.value.splice(cart.value.indexOf(item), 1)
	item.isAdded = false
}

watch(cart, () => {
	localStorage.setItem('cart', JSON.stringify(cart.value))
},
	{ deep: true }
)

const closeDrawer = () => {
	drawerOpen.value = false
}

const openDrawer = () => {
	drawerOpen.value = true
}

const translateTitleSneakers = (str) => {
	const arrStr = str.split(' ')
	if (arrStr[0] === 'Мужские') {
		arrStr[0] = `Men's`
		arrStr[1] = 'Sneakers'
	}
	arrStr[0] = 'Sneakers'
	let EnStr = arrStr.join().replaceAll(',', ' ')
	return EnStr
}

provide('language', {
	languageRuActive,
	languageEnActive,
	activeBtnLangRu,
	activeBtnLangEn,
	translateTitleSneakers
})

provide('cart', {
	cart,
	closeDrawer,
	openDrawer,
	addToCart,
	removeToCart
})

/*===========Корзина===(END)===========*/


</script>

<template>
	<Drawer v-if='drawerOpen' :total-price='totalPrice' :vatPrice='vatPrice' />

	<div class="bg-white w-full sm:w-4/5 m-auto sm:rounded-xl shadow-xl sm:mt-14">
		<Header :languageRuActive='languageRuActive' :languageEnActive='languageEnActive' :activeBtnLangRu='activeBtnLangRu'
			:activeBtnLangEn='activeBtnLangEn' :total-price='totalPrice' @open-drawer='openDrawer' />

		<div class="p-10">
			<router-view></router-view>
		</div>
	</div>
</template>

