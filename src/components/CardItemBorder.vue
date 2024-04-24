<script setup>
import CardItem from "@/components/CardItem.vue"

defineProps({
    id: String,
    title: String,
    subTitle: String,
    titleClass: String,
    subTitleClass: String,
    image: String,
    priceClass: String,
    price: Number,
    onBuy: Function,
    layout: {
        type: String,
        default: 'y'
    },
    data: Object,
})

</script>


<template>
    <router-link :to="'/product/' + id"
        class="border hover:shadow-lg cursor-pointer bg-white border-gray-200 rounded-lg flex flex-col items-center justify-center p-4">
        <CardItem :id="id" :image="image" :title="title" :price="price" :subTitle="subTitle" :data="data" :layout="layout">

        </CardItem>
    </router-link>
</template>