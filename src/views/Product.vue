<script setup>
import CardItem from "@/components/CardItem.vue";
import usePagination from '@/composables/usePagination';
import Pagination from '@/components/Pagination.vue';
import { ref, computed, onMounted } from 'vue';

import bookService from "@/services/book.service";

const products = ref([]);
const pagination = computed(() => usePagination(products.value, 4))

const fetchData = async () => {
    try{
        products.value = await bookService.getAll();
    } catch (error){
        console.log(error);
    }
}

onMounted(() => {
    fetchData();
})

</script>

<template>
    <div class="my-6">
        <div class="grid grid-cols-5 gap-4">
            <div class="">Bộ lọc</div>
            <div class="col-span-4 flex flex-col gap-4">
                <h2 class="text-2xl font-bold">Sách</h2>
                <div class="w-full border h-[50px] border-gray-200 rounded-lg">filter</div>
                <div class="grid grid-cols-4 gap-4">
                    <div v-for="(item, index) in pagination.paginatedData.value" :key="index"
                        class="border hover:shadow-lg cursor-pointer border-gray-200 rounded-lg grid place-content-center p-4">
                        <CardItem :image="item?.img" :title="item?.title" :price="item?.price" :subTitle="item?.author.fullname">

                        </CardItem>
                    </div>
                </div>
                <div class=" flex justify-center py-12">
                    <Pagination :visiblePage="5" :totalPage="pagination.totalPage"
                        :currentPage="pagination.page.value" @to-next="pagination.nextPage" @to-back="pagination.backPage"
                        @to-page="pagination.goToPage" />
                </div>
            </div>
        </div>
    </div>
</template>