<script setup>
import Button from "@/components/Button.vue"
import ImageBook from "@/components/ImageBook.vue"
import { FwbRating } from 'flowbite-vue'

defineProps({
    id: String,
    title: String,
    subTitle: String,
    titleClass: String,
    subTitleClass: String,
    image: String,
    priceClass: String,
    price: String,
    onBuy: Function,
})



</script>

<template>
    <div class="w-[200px] flex flex-col items-center gap-2">
        <ImageBook :src="image" :alt="title" />
        <div class="w-full">
            <h3 v-if="title" class="text-xs font-semibold line-clamp-2" :class="{
                    [titleClass]: !!titleClass,
                }">
                {{ title }}
            </h3>
            <p v-if="subTitle" class="text-xs font-normal" :class="{
                    [subTitleClass]: !!subTitleClass,
                }">
                {{ subTitle }}
            </p>
        </div>
        <div v-if="price" class="flex w-full justify-between items-center">
            <span class="text-lg font-semibold w-full">
                <i class="fa-solid fa-dong-sign text-sm"></i>{{ price.toLocaleString() }}
            </span>
            <fwb-rating size="sm" :rating="4" />
        </div>
        <slot name="button">
            <Button class="w-32" v-on:on-click="onBuy">
                <i class="fa-solid fa-cart-shopping"></i>
                Mượn
            </Button>
        </slot>
    </div>

</template>