<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '../components/CardList.vue'
const favorites = ref([])

onMounted(async () => {
	try {
		const { data } = await axios.get(`https://6775711df541414e.mokky.dev/favorites?_relations=items`)
		favorites.value = data.map((obj) => obj.item)

	} catch (err) {

	}
})
</script>

<template>
	<h2 class='text-3xl font-bold mb-8'>Мои избранные</h2>

	<CardList :items='favorites' is-favorite />
</template>