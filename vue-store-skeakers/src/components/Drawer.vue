<script setup>
import axios from 'axios'
import { computed, inject, ref } from 'vue'
import CartItemList from './CartItemList.vue'
import DrawerHeader from './DrawerHeader.vue'
import infoBlock from './infoBlock.vue'

const props = defineProps({
	totalPrice: Number,
	vatPrice: Number,

})

const { cart } = inject('cart')


const isCreatingOrder = ref(false)
const orderId = ref(null)
const createOrder = async () => {
	try {
		isCreatingOrder.value = true
		const { data } = await axios.post(`https://6775711df541414e.mokky.dev/orders`, {
			items: props.cart,
			totalPrice: props.totalPrice.value
		})

		cart.value = []

		orderId.value = data.id
		return data
	} catch (err) {
		console.log(err)
	} finally {
		isCreatingOrder.value = false
	}
}

const { languageRuActive, languageEnActive } = inject(['language'])


const cartEmpty = computed(() => cart.value.length === 0)
const cartButtonDisabled = computed(() => isCreatingOrder.value || cartEmpty.value)

</script>
<template>
	<div class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"></div>
	<div class="bg-white w-96 h-full flex flex-col fixed top-0 right-0 z-20 p-8">

		<DrawerHeader />


		<div v-if="!totalPrice || orderId" class="flex h-full items-center">
			<infoBlock v-if="!totalPrice && !orderId && languageRuActive" title='Корзина пустая'
				description='Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ' image-url='/package-icon.png' />
			<infoBlock v-if="!totalPrice && !orderId && languageEnActive" title='Shopping cart empty'
				description='Add at least one pair of sneakers to place an order' image-url='/package-icon.png' />

			<infoBlock v-if='orderId && languageRuActive' title='Заказ оформлен'
				:description='`Ваш заказ #${orderId} скоро будет передан курьерской доставке`'
				image-url='/order-success-icon.png' />
			<infoBlock v-if='orderId && languageEnActive' title='The order has been placed'
				:description='`Your order #${orderId} will be delivered by courier soon`' image-url='/order-success-icon.png' />
		</div>



		<div v-else>
			<CartItemList />

			<div class='flex flex-col gap-4 mb-6 mt-7'>
				<div class='flex gap-2'>
					<span>{{ $t('total') }}:</span>
					<div class="flex-1 border-b border-dashed"></div>
					<b v-if='languageRuActive'>{{ totalPrice }} ₽</b>
					<b v-if='languageEnActive'>{{ Math.round(totalPrice / 90) }} $</b>
				</div>

				<div class='flex gap-2'>
					<span>{{ $t('tax') }} 7%:</span>
					<div class="flex-1 border-b border-dashed"></div>
					<b v-if='languageRuActive'>{{ vatPrice }} ₽</b>
					<b v-if='languageEnActive'>{{ Math.round(vatPrice / 90) }} $</b>
				</div>

				<button :disabled='cartButtonDisabled' @click='createOrder' class='bg-rose-600 w-full mt-4 disabled:cursor-not-allowed rounded-xl
					 py-3 text-white hover:bg-rose-700 transition active:bg-rose-800 disabled:bg-slate-300'>
					{{ $t('placeAnOrder') }}
				</button>
			</div>
		</div>



	</div>
</template>