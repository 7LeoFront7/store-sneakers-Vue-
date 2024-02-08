<script setup>
import { inject } from 'vue'
const emit = defineEmits(['onClickRemove'])

const { languageRuActive, languageEnActive, translateTitleSneakers } = inject(['language'])

defineProps({
	id: Number,
	imageUrl: String,
	title: String,
	price: Number
})



</script>


<template>
	<div class="flex items-center border border-slate-100 p-4 rounded-xl gap-4">
		<img class="w-16 h-16" :src="imageUrl" :alt="title">
		<div class="flex flex-col flex-1">
			<p v-if="languageEnActive">{{ translateTitleSneakers(title) }}</p>
			<p v-if="languageRuActive">{{ title }}</p>
			<div class="flex justify-between mt-2">
				<b v-if="languageRuActive" class="flex-1">{{ price }} ₽</b>
				<b v-if="languageEnActive" class="flex-1">{{ Math.round(price / 90) }} $</b>
				<img @click='emit(`onClickRemove`)' class="opacity-40 transition cursor-pointer hover:opacity-100"
					src="/close.svg" alt="close">
			</div>
		</div>
	</div>
</template>