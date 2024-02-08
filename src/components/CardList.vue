<script setup>
import Card from './Card.vue'

defineProps({
	items: Array,
	isFavorite: Boolean
})

const emit = defineEmits(['addToFavorite', 'addToCart'])

</script>


<template>
	<div class='grid xl:grid-cols-4 gap-5 sm:grid-cols-2' v-auto-animate>
		<Card v-for="item in  items " :key='item.id' :isFavorite='item.isFavorite' :imageUrl="item.imageUrl"
			:title="item.title" :price='item.price' :isAdded='item.isAdded'
			:onClickAdd='isFavorite ? null : () => emit(`addToCart`, item)'
			:onClickFavorite='isFavorite ? null : () => emit("addToFavorite", item)' />
	</div>
</template>