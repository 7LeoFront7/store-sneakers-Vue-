<script setup>
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'

import CardList from './components/CardList.vue'
import Header from './components/Header.vue'

const items = ref([])

const filters = reactive({
	sortBy: 'title',
	searchQuery: ''
})

const onChangeSelect = (e) => {
	filters.sortBy = e.target.value
}

const onChangeInput = (e) => {
	filters.searchQuery = e.target.value
}

const fetchFavorites = async () => {
	try {
		const { data: favorites } = await axios.get('https://6775711df541414e.mokky.dev/favorites')
		items.value = items.value.map(item => {
			const favorite = favorites.find((favorite) => favorite.parentId === item.id)

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
			isAdded: false
		}))
	} catch (err) {
		console.log(err)
	}
}

const addToFavorite = async (item) => {

	try {
		item.isFavorite = !item.isFavorite

		if (item.isFavorite) {
			const obj = {
				parentId: item.id
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


onMounted(async () => {
	await fetchFilterItems()
	await fetchFavorites()
})
watch(filters, fetchFilterItems)

</script>

<template>
	<!-- <Drawer/> -->

	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
		<Header />

		<div class="p-10">
			<div class='flex justify-between items-center'>
				<h2 class='text-3xl font-bold mb-8'>Все кроссовки</h2>
				<div class="flex gap-4">
					<select @change="onChangeSelect" class='py-2 px-3 border rounded-md outline-none'>
						<option value="name">По названию</option>
						<option value="-price">По цене (Дорогие)</option>
						<option value="price">По цене (Дешевые)</option>
					</select>
					<div class="relative">
						<img class="absolute left-4 top-3" src="/search.svg">
						<input @input="onChangeInput" class='border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400'
							type="text" placeholder="Поиск...">
					</div>
				</div>

			</div>

			<div class="mt-5">
				<CardList :items='items' @addToFavorite='addToFavorite' />
			</div>


		</div>
	</div>
</template>

<style scoped></style>
