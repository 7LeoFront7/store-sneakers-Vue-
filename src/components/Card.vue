<script setup>

import { inject } from 'vue'
const props = defineProps({
	imageUrl: String,
	title: String,
	price: Number,
	isFavorite: Boolean,
	isAdded: Boolean,
	onClickFavorite: Function,
	onClickAdd: Function,
})



const { languageRuActive, languageEnActive, translateTitleSneakers } = inject(['language'])
</script>


<template>
	<div
		class="relative border bg-white border-slate-100 flex flex-col rounded-3xl p-8 transition cursor-pointer hover:-translate-y-2 hover:shadow-xl">
		<img v-if="onClickFavorite" @click="onClickFavorite" class="absolute top-8 left-8"
			:src='!isFavorite ? "/like-1.svg" : "/like-2.svg"' alt="Like 1">



		<img :src="imageUrl" alt="Sneaker">
		<p v-if="languageEnActive" class="mt-5">{{ translateTitleSneakers(title) }}</p>
		<p v-if="languageRuActive" class="mt-5">{{ title }}</p>
		<div class="flex justify-between mt-5">
			<div class='flex flex-col'>
				<span class="text-slate-400">Цена:</span>
				<b v-if="languageRuActive">{{ price }} ₽</b>
				<b v-if="languageEnActive">{{ Math.round(price / 90) }} $</b>
			</div>


			<img v-if="onClickAdd" @click='onClickAdd' :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="Plus">
		</div>
	</div>
</template>