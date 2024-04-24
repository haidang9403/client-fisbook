<script setup>
import { useTitle } from "@vueuse/core";
import { useRoute, useRouter } from 'vue-router';
import bookService from "@/services/book.service";
import { onMounted, ref, watch} from "vue";
import ImageBook from "../ImageBook.vue";
import { FwbRating } from "flowbite-vue";
import Button from "../Button.vue";
import GroupCardItem from "../GroupCardItem.vue";
import Redirection from "../Redirection.vue";

const title = useTitle()
title.value = "Sách"

const route = useRoute();
const router = useRouter();
const book = ref(null);
const bookOffer = ref(null);
const isLoading = ref(false)

const returnRoute = () => {
    router.back()
}

const handleClick  = (id)  => {
    router.push({
        path: "/borrow",
        query: {
            book: id
        }
    })
}

const fetchData = async () => {
    isLoading.value = true
    setTimeout(async () => {
        book.value = await bookService.getOne(route.params.id);
        bookOffer.value = await bookService.getAll({ 
            limit: 5, 
            _neId: book.value._id,
            random: true
        })
        title.value = book.value.title;
        isLoading.value = false;
    }, 200)
}

watch(() => route.params.id, () => {
    fetchData()
})


onMounted(() => {
   fetchData()
})


</script>

<template>
    <div class="my-4">
        <div v-if="isLoading" role="status"
            class="space-y-8  mb-[500px] mt-12 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div class="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path
                        d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
            <div class="w-full">
                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
                <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            </div>
            <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
            <div class="my-4">
                <Redirection left label="Trở về" :on-click="returnRoute"/>
            </div>
            <div class="p-8 bg-white border border-gray-100 rounded-lg">
                <div class="grid grid-cols-12 gap-8">
                    <div class="col-span-4 flex justify-center border border-gray-10 py-4 rounded-lg">
                        <ImageBook :src="book?.img" :alt="book?.title" size="lg" />
                    </div>
                    <div class="col-span-8 flex flex-col gap-6">
                        <div class="">
                            <h2 class="text-xl font-bold"> {{ book?.title }}</h2>
                            <div class="my-2 flex">
                                <div class="flex gap-4 items-center font-semibold">
                                    <fwb-rating rating="4" size="sm" /> 4.0
                                </div>
                                <div class="ml-8 flex gap-2">
                                    <span
                                        class="bg-blue-100 uppercase font-bold text-blue-800 text-xs inline-flex items-center px-2.5 py-0.5 rounded-xl me-2">
                                        <i class="fa-solid fa-thumbs-up me-1.5"></i>
                                        Fistore Best
                                    </span>
                                    <span
                                        class="bg-rose-100 uppercase font-bold text-rose-800 text-xs inline-flex items-center px-2.5 py-0.5 rounded-xl me-2">
                                        <i class="fa-solid fa-fire-flame-curved me-1.5"></i>
                                        Hot
                                    </span>
                                    <span
                                        class="bg-amber-100 uppercase font-bold text-amber-600 text-xs inline-flex items-center px-2.5 py-0.5 rounded-xl me-2">
                                        <i class="fa-solid fa-truck-fast me-1.5"></i>
                                        Express delivery
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="flex flex-col justify-around gap-4 basis-2/4">
                            <div>
                                <div class="text-xs">Danh mục</div>
                                <div class="font-bold">{{ book?.category.title }}</div>
                            </div>
                            <div>
                                <div class="text-sm">Tác giả</div>
                                <div class="font-bold">{{ book?.author.fullname }}</div>
                            </div>
                            <div class="flex justify-between">
                                <div>
                                    <div class="text-sm">Nhà xuất bản</div>
                                    <div class="font-bold">{{ book?.publisher.name }}</div>
                                </div>
                                <div class="flex gap-4">
                                    <div
                                        class="bg-violet-100 text-sm uppercase text-violet-600 py-1.5 px-3.5 rounded-xl font-bold flex gap-4 items-center">
                                        <i class="fa-solid fa-bolt"></i>
                                        Free Shipping
                                    </div>
                                    <div
                                        class="bg-green-100 text-sm uppercase text-green-600 py-1.5 px-3.5 rounded-xl font-bold flex gap-4 items-center">
                                        <i class="fa-solid fa-shield-halved"></i>
                                        In Sotcks
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="h-px bg-gray-200 border-0">
                        <div class="flex flex-1 items-center justify-between">
                            <div class="text-3xl font-bold">
                                <i class="fa-solid fa-dong-sign text-xl"></i>{{ book?.price.toLocaleString() }}
                            </div>
                            <div class="flex items-center gap-12">
                                <div class="flex">
                                    <h4 class="mr-1">SL:</h4>
                                    <div class="font-semibold "> {{  book?.amount }}</div>
                                </div>
                                
                                <Button v-if="book?.amount > 0" shadow :on-click="() => handleClick(book?._id)">
                                    <i class="fa-solid fa-cart-arrow-down"></i>
                                    Mượn ngay
                                </Button>
                                <Button v-else else secondary disabled>
                                    Tạm hết
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="my-8">
                <GroupCardItem title="Đề xuất sách liên quan" :data="bookOffer" />
            </div>
        </div>
    </div>
</template>