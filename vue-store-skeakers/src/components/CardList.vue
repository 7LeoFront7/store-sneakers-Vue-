<script setup>
import Card from './Card.vue'

defineProps({
	items: Array
})


const onCLickFavorite = () => {
	console.log(2)
}

const onCLickAdded = () => {
	console.log(3)
}
</script>


<template>
	<div class='grid grid-cols-4 gap-5'>
		<Card v-for="item in items" :key='item.id' :isFavorite='false' :imageUrl="item.imageUrl" :title="item.title"
			:price='item.price' :isAdded='false' :onClickFavorite='onCLickFavorite' :onClickAdd='onCLickAdded' />


	</div>
</template>