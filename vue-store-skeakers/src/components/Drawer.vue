<script setup>
import CartItemList from './CartItemList.vue'
import DrawerHeader from './DrawerHeader.vue'

defineProps({
	totalPrice: Number,
	vatPrice: Number
})

</script>
<template>
	<div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
	<div class="bg-white w-96 h-full flex flex-col fixed top-0 right-0 z-20 p-8">

		<DrawerHeader />
		<CartItemList />

		<div class='flex flex-col gap-4 mb-6 mt-7'>
			<div class='flex gap-2'>
				<span>Итого:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<b>{{ totalPrice }} ₽</b>
			</div>

			<div class='flex gap-2'>
				<span>Налог 7%:</span>
				<div class="flex-1 border-b border-dashed"></div>
				<b>{{ vatPrice }} ₽</b>
			</div>

			<button disabled
				class='bg-lime-500 w-full mt-4 disabled:cursor-not-allowed rounded-xl py-3 text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300'>Оформить
				заказ
			</button>
		</div>


	</div>
</template>