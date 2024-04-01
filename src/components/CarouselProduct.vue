<script setup>
import { initCarousels } from 'flowbite';
import { onMounted } from 'vue';
import Button from './Button.vue';
import CardItem from './CardItem.vue';

defineProps({
    title: String,
    products: Array,
    bgColor: String,
})

onMounted(() => {
    initCarousels();
})
</script>

<template>
    <div id="default-carousel" class="relative w-full h-full min-h-[380px] max-w-[330px]" data-carousel="slide">
        <!-- Carousel wrapper -->
        <div class="
            relative 
            overflow-hidden
            h-full
            w-full
            max-w-sm 
            bg-amber-400
            gap-4
            rounded-lg
            ">
            <h3 class="py-3 w-full text-center font-bold text-lg">{{ title }}</h3>
            <!-- Item -->
            <div v-for="(product,index) in products" :key="index" class="hidden duration-200" data-carousel-item>
                <div class="absolute flex justify-center -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <CardItem :image="product.image" :title="product.title">
                        <template #button>
                            <Button secondary class="w-32">
                                <span>
                                    <i class="fa-solid fa-dong-sign text-sm"></i>
                                    <span class="text-base font-semibold">{{ product.price.toLocaleString() }}</span>
                                </span>
                            </Button>
                        </template>
                    </CardItem>
                </div>
            </div>
        </div>
        <!-- Slider indicators -->
        <div class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
            <button v-for="(_,index) in products" :key="index" type="button" class="w-3 h-3 rounded-full"
                aria-current="true" aria-label="Slide 1" :data-carousel-slide-to="index"></button>
        </div>
        <!-- Slider controls -->
        <button type="button"
            class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev>
            <span
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5 1 1 5l4 4" />
                </svg>
                <span class="sr-only">Previous</span>
            </span>
        </button>
        <button type="button"
            class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next>
            <span
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="m1 9 4-4-4-4" />
                </svg>
                <span class="sr-only">Next</span>
            </span>
        </button>
    </div>
</template>