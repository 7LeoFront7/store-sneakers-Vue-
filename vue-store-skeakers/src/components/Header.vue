<script setup>


import { onMounted } from 'vue'
const emit = defineEmits(['openDrawer'])


onMounted(() => {
	document.cookie = 'local=RU'
})


defineProps({
	activeBtnLangRu: Function,
	activeBtnLangEn: Function,
	languageRuActive: Boolean,
	languageEnActive: Boolean,
	totalPrice: Number
})



</script>
<template>
	<header class="flex justify-between border-b border-slate-200 px-10 py-8">
		<router-link to="/index.html">
			<div class="flex items-center gap-4">
				<img class="w-10" src="/logo.png" alt="Logo">
				<div>
					<h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
					<p class="text-slate-400">{{ $t('subLogo') }}</p>
				</div>
			</div>
		</router-link>


		<ul class="flex items-center gap-10">
			<li @click='() => emit("openDrawer")' class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
				<img src="/cart.svg" alt="Cart">
				<b v-if="languageRuActive">{{ totalPrice }} ₽</b>
				<b v-if="languageEnActive">{{ Math.round(totalPrice / 90) }} $</b>
			</li>

			<router-link to="/favorites">
				<li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
					<img src="/heart.svg" alt="Cart">
					<span>{{ $t('favorites') }}</span>
				</li>
			</router-link>

			<li class="flex items-center gap-3 text-gray-500 cursor-pointer hover:text-black">
				<div>
					<button class="p-2 font-bold bg-slate-300" :class='{ active: languageRuActive }'
						@click='activeBtnLangRu(), $i18n.locale = `RU`'>RU</button>
					<button class="p-2 font-bold bg-slate-200" :class='{ active: languageEnActive }'
						@click='activeBtnLangEn(), $i18n.locale = `EN`'>EN</button>
				</div>

			</li>
		</ul>
	</header>
</template>