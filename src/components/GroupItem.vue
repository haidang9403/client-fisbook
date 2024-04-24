<script setup>
import ImageBook from './ImageBook.vue';

defineProps({
    data: Array,
    title: String,
    subtitle: String,
})

</script>

<template>
    <div class="w-full w-max-[660px rounded-lg px-12 py-8">
        <h2 class="text-2xl font-bold my-4">{{ title }}</h2>
        <p class="text-sm mb-8 w-full">{{ subtitle }}</p>
        <div v-if="data?.length >  0  " class="grid grid-cols-4">
            <router-link v-for="(item, index) in data" :key="index" :to="'/product/' + item._id" class="w-full">
                <ImageBook :src="item.img" />
            </router-link>
        </div>
    </div>
</template>