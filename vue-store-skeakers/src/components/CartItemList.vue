<script setup>
import { inject } from 'vue'
import CartItem from './CartItem.vue'
const { cart, removeToCart } = inject('cart')

</script>


<template>
	<div class='flex flex-col gap-4 flex-1 overflow-auto overflow-x-hidden'>
		<CartItem v-for='item in cart' :key='item.id' @onClickRemove='() => removeToCart(item)' :title='item.title'
			:image-url='item.imageUrl' :price='item.price' />
	</div>
</template>