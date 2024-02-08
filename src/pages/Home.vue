<script setup>
import axios from 'axios'
import debounce from 'lodash.debounce'
import { inject, onMounted, reactive, ref, watch } from 'vue'
import CardList from '../components/CardList.vue'

const { cart, addToCart, removeToCart } = inject('cart')

const items = ref([])

const fetchFavorites = async () => {
	try {
		const { data: favorites } = await axios.get('https://6775711df541414e.mokky.dev/favorites')
		items.value = items.value.map(item => {
			const favorite = favorites.find((favorite) => favorite.item_id === item.id)

			if (!favorite) {
				return item
			}

			return {
				...item,
				isFavorite: true,
				favoriteId: favorite.id
			}

		})
	} catch (err) {
		console.log(err)
	}
}

const fetchFilterItems = async () => {
	try {
		const params = {
			sortBy: filters.sortBy
		}

		if (filters.searchQuery) {
			params.title = `*${filters.searchQuery}*`
		}
		const { data } = await axios.get('https://6775711df541414e.mokky.dev/items', {
			params
		})
		items.value = data.map((obj) => ({
			...obj,
			isFavorite: false,
			favoriteId: null,
			isAdded: false
		}))

		fetchFavorites()
	} catch (err) {
		console.log(err)
	}
}

const onClickOnCart = (item) => {

	if (!item.isAdded) {
		addToCart(item)
	} else {
		removeToCart(item)
	}
}

const addToFavorite = async (item) => {

	try {
		item.isFavorite = !item.isFavorite

		if (item.isFavorite) {
			const obj = {
				item_id: item.id
			}


			const { data } = await axios.post(`https://6775711df541414e.mokky.dev/favorites`, obj)

			item.favoriteId = data.id

		} else {
			await axios.delete(`https://6775711df541414e.mokky.dev/favorites/${item.favoriteId}`)
			item.favoriteId = null
		}
	} catch (err) {
		console.log(err)
	}
}

const filters = reactive({
	sortBy: 'title',
	searchQuery: ''
})

const onChangeSelect = (e) => {
	filters.sortBy = e.target.value
}

const onChangeInput = debounce((e) => {
	filters.searchQuery = e.target.value
}, 400)

onMounted(async () => {
	const localCart = localStorage.getItem('cart')
	cart.value = localCart ? JSON.parse(localCart) : []

	await fetchFilterItems()
	await fetchFavorites()

	items.value = items.value.map((item) => ({
		...item,
		isAdded: cart.value.some((cartItem) => cartItem.id === item.id)
	}))
})

watch(filters, fetchFilterItems)

watch(cart, () => {
	items.value = items.value.map((item) => ({
		...item,
		isAdded: false
	}))
})
</script>

<template>
	<div class='flex-col xl:flex-row flex justify-between xl:items-center'>
		<h2 class='text-3xl font-bold mb-8'>{{ $t('homeTitle') }}</h2>
		<div class="flex w-full xl:w-3/4 xl:justify-end flex-col md:flex-row gap-4">
			<select @change="onChangeSelect" class=' py-2 h-10 px-3 border rounded-md outline-none'>
				<option value="name">{{ $t('ByName') }}</option>
				<option value="-price">{{ $t('ForThePrice') }}</option>
				<option value="price">{{ $t('ByPrice') }}</option>
			</select>
			<div class="relative">
				<img class="absolute left-4 top-3" src="/search.svg">
				<input @input="onChangeInput"
					class='border w-full rounded-md py-2 h-10 pl-11 pr-4 outline-none focus:border-gray-400 ' type="text"
					placeholder="Nike Air M ...">
			</div>
		</div>

	</div>

	<div class="mt-5">
		<CardList :items='items' @add-to-favorite='addToFavorite' @add-to-cart='onClickOnCart' />
	</div>
</template>