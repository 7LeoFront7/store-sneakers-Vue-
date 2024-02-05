<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

import CardList from './components/CardList.vue'
import Header from './components/Header.vue'

const items = ref([])

onMounted(async () => {
	// fetch('https://6775711df541414e.mokky.dev/items')
	// 	.then((res) => res.json())
	// 	.then((data) => {
	// 		console.log(data)
	// 	})
	try {
		const { data } = await axios.get('https://6775711df541414e.mokky.dev/items')

		items.value = data
	} catch (err) {
		console.log(err)
	}

})

</script>

<template>
	<!-- <Drawer/> -->

	<div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
		<Header />

		<div class="p-10">
			<div class='flex justify-between items-center'>
				<h2 class='text-3xl font-bold mb-8'>Все кроссовки</h2>
				<div class="flex gap-4">
					<select class='py-2 px-3 border rounded-md outline-none'>
						<option>По названию</option>
						<option>По цене (Дорогие)</option>
						<option>По цене (Дешевые)</option>
					</select>
					<div class="relative">
						<img class="absolute left-4 top-3" src="/search.svg">
						<input class='border rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400' type="text"
							placeholder="Поиск...">
					</div>
				</div>

			</div>

			<div class="mt-5">
				<CardList :items='items' />
			</div>


		</div>
	</div>
</template>

<style scoped></style>
