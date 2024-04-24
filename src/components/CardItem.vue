<script setup>
import Button from "@/components/Button.vue"
import ImageBook from "@/components/ImageBook.vue"
import { useRouter } from "vue-router";

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

const router = useRouter();

const handleClick = (id) => {
    router.push({
        path:  "/borrow",
        query: {
            book: id
        }
    })
}



</script>

<template>
    <div v-if="layout === 'y'" class="w-[200px] flex flex-col items-center gap-2">
        <ImageBook :src="image" :alt="title" />
        <div class="w-full h-[48px]">
            <h3 v-if="title" 
                :class="{
                    [titleClass]: !!titleClass,
                }"
                class="text-xs font-semibold line-clamp-2" 
            >
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
            <p class="text-sm">
                <div class="flex">
                    <h4 class="mr-1">SL:</h4>
                    <div class="font-semibold "> {{  data?.amount }}</div>
                </div>
            </p>
        </div>
        <slot name="button">
            <Button v-if="data?.amount > 0" class="w-32" @click.stop.prevent="() => handleClick(id)">
                <i class="fa-solid fa-cart-shopping"></i>
                Mượn
            </Button>
            <Button v-else  class="w-32" disabled secondary>
                Tạm hết
            </Button>
        </slot>
    </div>
    <div v-if="layout === 'x'" class="w-full flex gap-4">
        <ImageBook :src="image" :alt="title" />
        <div class="flex-1 flex flex-col justify-between">
            <div class="h-1/4">
                <h3 v-if="title" 
                    :class="{
                        [titleClass]: !!titleClass,
                    }"
                    class="text-sm font-semibold line-clamp-2 w-3/4 mb-1" 
                >
                    {{ title }}
                </h3>
                <p v-if="data?.category?.title" class="text-xs font-normal">
                    {{ data.category.title }}
                </p>
            </div>

            <div class="flex justify-between items-center">
                <p class="text-2xl font-semibold">
                    <i class="fa-solid fa-dong-sign text-base"></i>{{ price.toLocaleString() }}
                </p>
                <p class="text-sm">
                    <div class="flex">
                        <h4 class="mr-1">SL:</h4>
                        <div class="font-semibold "> {{  data?.amount }}</div>
                    </div>
                </p>
            </div>
            
            <div class="flex justify-between">
                <div class="text-sm">
                    <div class="text-xs font-light">
                        Tác giả
                    </div>
                    <div class="font-semibold">
                        {{ data?.author?.fullname }}
                    </div>
                </div>
                <slot name="button">
                    <Button v-if="data?.amount > 0" class="w-32" @click.stop.prevent="() => handleClick(id)">
                        <i class="fa-solid fa-cart-shopping"></i>
                        Mượn
                    </Button>
                    <Button v-else  class="w-32" disabled secondary>
                        Tạm hết
                    </Button>
                </slot>
            </div>
        </div>
    </div>

</template>