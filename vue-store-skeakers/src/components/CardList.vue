<script setup>
import Card from './Card.vue'

defineProps({
	items: Array
})

const emit = defineEmits(['addToFavorite'])

</script>


<template>
	<div class='grid grid-cols-4 gap-5'>
		<Card v-for="item in items" :key='item.id' :isFavorite='item.isFavorite' :imageUrl="item.imageUrl" :title="item.title"
			:price='item.price' :isAdded='false' :onClickFavorite='() => emit("addToFavorite", item)' />


	</div>
</template>