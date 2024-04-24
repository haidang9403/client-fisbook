<script setup>
import CardItemBorder from "@/components/CardItemBorder.vue";
import usePagination from '@/composables/usePagination';
import Pagination from '@/components/Pagination.vue';
import Filter from '@/components/Filter.vue';
import Skeleton from '@/components/Skeleton.vue';
import { useRoute, useRouter } from 'vue-router';
import { useAlert } from '@/stores/alert';
import useFilter from '@/composables/useFilter';
import { ref, computed, onMounted, watch } from 'vue';

import bookService from "@/services/book.service";
import LayoutSetting from "@/components/LayoutSetting.vue";

import { useTitle } from "@vueuse/core";

const title = useTitle()
title.value = "Sách"

// hook
const { showAlertMessage } = useAlert();

const route = useRoute();
const router = useRouter();
// Define layout
const layout = computed(() => route.query.layout || 'y');

const isLoading = ref(false);
const productFetch = ref([]);
const products = computed(() => useFilter(productFetch.value));

const pagination = computed(() => usePagination(products.value, 12));
const filterItems = ref({})
const keySearch = computed(() => route.query.key)

const handleRouteQueryChange = () => {
    return new Promise((resolve, reject) => {
        isLoading.value = true;
        setTimeout(() => {
            isLoading.value = false;
            resolve();
        }, 200)
    })
}

watch(() => route.query, async (newQuery) => {
    await handleRouteQueryChange()
    fetchLabelFilter(newQuery)
})


const fetchData = async () => {
    try {
        productFetch.value = await bookService.getAll();
    } catch (error) {
        showAlertMessage('danger', "Xảy ra lỗi!")
    }
}

const handleRemove = (id, key) => {
    let ids = route.query[key]?.split(",")
    const indexId = ids.indexOf(id)
    if(indexId !== -1){
        ids.splice(indexId, 1)
    }

    const newQuery = ids.join(",")
    if(newQuery?.length > 0){
        router.push({
            query: {
                ...route.query,
                [key]: newQuery
            }
        })
    } else {
        const query = { ...route.query };
        delete query[key];
        router.push({ query });
    }
}

const handleRemoveAll = (keys) => {
    const query = { ...route.query}
    keys.forEach(key => {
        if (query.hasOwnProperty(key)) {
            delete query[key];
        }
    });
    router.push({ query });
}

const fetchLabelFilter = async (query) => {
    try{
        const { author, category, publisher, key } = query
        if(author){
            bookService.getAuthor({author})
                .then((res) => {
                    filterItems.value.author = res.map(item => {
                       return {
                            _id: item._id,
                            label: item.fullname,
                       } 
                    })
                })
        } else filterItems.value.author = []

        if(publisher){
            bookService.getPublisher({publisher})
                .then((res) => {
                    filterItems.value.publisher = res.map(item => {
                       return {
                            _id: item._id,
                            label: item.name,
                       } 
                    })
                })
        } else filterItems.value.publisher = []
        

        if(category){
            bookService.getCategory({category})
                .then((res) => {
                    filterItems.value.category = res.map(item => {
                       return {
                            _id: item._id,
                            label: item.title,
                       } 
                    })
                })
        } else filterItems.value.category = []
        

    }catch(error){
        showAlertMessage('danger', "Xảy ra lỗi!")
    }
}

onMounted(() => {
    fetchData();
    fetchLabelFilter(route.query);
})

</script>

<template>
    <Skeleton v-if="isLoading" class="h-[500px] my-12"></Skeleton>
    <div class="my-6 mb-20" :class="{
        'hidden': isLoading
    }
        ">
        <div class="grid grid-cols-5 gap-4">
            <div class="col-span-1">
                <h2 class="text-2xl font-bold h-full flex items-center">Bộ lọc</h2>
            </div>
            <div class="col-span-4 flex gap-4">
                <h2 v-if="!keySearch" class="text-2xl font-bold h-full flex items-center">Sách</h2>
                <h2 v-if="keySearch" class="text-2xl font-bold  h-full flex items-center">Tìm kiếm: </h2>
                <div v-if="keySearch" class="bg-blue-200 border border-1 gap-2 border-blue-500 rounded-full flex items-center py-2 px-4">
                    <span class="">" <strong>{{ keySearch }}</strong> "</span>
                    <i @click="() => handleRemove(keySearch, 'key')" class="size-4 fa-solid fa-circle-xmark text-blue-500 hover:text-blue-400 cursor-pointer"></i>
                </div>
            </div>
            <Filter></Filter>
            <div class="col-span-4 flex flex-col gap-4">
                <LayoutSetting :label-headers="filterItems" @on-remove="handleRemove" @on-remove-all="handleRemoveAll"/>
                <div v-if="products.length != 0" class="grid gap-4" :class="{
                    'grid-cols-2': layout === 'x',
                    'grid-cols-4': layout === 'y'
                }">
                    <CardItemBorder v-for="(item, index) in pagination.paginatedData.value" 
                        :key="index"
                        :id="item._id"
                        :image="item?.img" :title="item?.title" :price="item?.price" :subTitle="item?.author.fullname"
                        :data="item" :layout="layout"
                    >
                    </CardItemBorder>
                </div>
                <div v-if="pagination.totalPage > 1" class=" flex justify-center py-12">
                    <Pagination :visiblePage="5" :totalPage="pagination.totalPage" :currentPage="pagination.page.value"
                        @to-next="pagination.nextPage" @to-back="pagination.backPage" @to-page="pagination.goToPage" />
                </div>
                <div v-if="products.length == 0" class="flex flex-1 bg-white border border-gray-200 rounded-lg items-center justify-center">
                    <div class="text-3xl flex gap-4 items-center text-yellow-400">
                        <i class="fa-regular fa-circle-xmark"></i>
                        <p class="">Không tìm thấy sản phẩm!</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>