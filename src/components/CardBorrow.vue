<script setup>
import ImageBook from './ImageBook.vue';
import { format } from 'date-fns';
import { FwbBadge } from 'flowbite-vue'

const props = defineProps({
    data: Object
})

const state = (status) => {
    switch(status){
        case 'Chưa duyệt':
            return 'yellow'
        case 'Đang mượn':
            return 'default'
        case 'Đã trả':
            return 'green'
        case 'Từ chối':
            return 'red'
    }
}
</script>

<template>
    <div class="flex gap-8">
        <ImageBook size="sm" :src="data.book_id.img"/>
        <div class="flex flex-1 flex-col justify-between">
            <div class="">
                <h3 class="text-lg font-bold line-clamp-2">{{  data.book_id.title }}</h3>
                <p class="text-sm line-clamp-1">{{  data.book_id.author.fullname }}</p>
            </div>
            <div class="">
                <span class="text-xl font-semibold w-full">
                    Tổng tiền:
                    <i class="fa-solid fa-dong-sign text-sm"></i>{{ data.total_money.toLocaleString() }}
                </span>
            </div>
            <div>
                <span class="text-sm"><strong>Ngày mượn:</strong> {{ format(data.borrow_at, "dd/MM/yyyy") }}</span>
            </div>
        </div>
        <div class="flex items-center pr-8">
            <fwb-badge :type="state(data.status)" size="lg" class="font-semibold">{{  data.status }}</fwb-badge>
        </div>
    </div>
</template>