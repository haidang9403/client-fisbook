<script setup>
import CardItemBorder from './CardItemBorder.vue';

defineProps({
    title: String,
    data: Array
})

</script>

<template>
    <div class="w-full bg-white rounded-lg p-8">
        <h2 class="font-bold text-xl mb-8">{{ title }}</h2>
        <div class="grid-cols-5 grid gap-4">
            <CardItemBorder 
                v-for="(item, index) in data" 
                :key="index" 
                :id="item._id"
                :image="item?.img" 
                :title="item?.title" 
                :price="item?.price" 
                :subTitle="item?.author.fullname"
                :data="item"
            />
        </div>
    </div>
</template>