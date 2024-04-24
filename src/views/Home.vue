<script setup>
import { onMounted, ref } from 'vue';
import { useTitle } from '@vueuse/core'

import Button from '@/components/Button.vue';
import IntroItem from '@/components/IntroItem.vue'
import CarouselProduct from '@/components/CarouselProduct.vue';
import GroupItem from '@/components/GroupItem.vue';
import LoadingItem from '@/components/loadings/LoadingItem.vue';
import bookService from '@/services/book.service';
import { useRouter } from 'vue-router';

const router = useRouter()
const title = useTitle()
title.value = "Trang chủ"

const product = ref([]);
const offers = ref([]);
const news = ref([]);

const fetchData = async () => {
    try{
        product.value = await bookService.getAll({
            sort: 'price des',
            limit:  '3'
        })
        offers.value = await bookService.getAll({ random: true, limit: 4})

        news.value = await bookService.getAll({ sort: 'createAt des', limit: 4})
    } catch(error) {
        console.log(error)
    }
}

onMounted(() => {
    fetchData()
})

</script>
<template>
    <div class="mt-4">
        <div class="grid grid-cols-12 grid-rows-1 gap-4">
            <div class="col-span-9">
                <div class="bg-blue-300 h-full border border-gray-200  rounded-lg p-8 md:p-12 mb-8">
                    <span
                        class="bg-orange-200 border text-xs font-medium inline-flex gap-2 items-center px-2.5 py-0.5 rounded-md mb-2">
                        <i class="fa-solid fa-eye"></i>
                        Fisbook
                    </span>
                    <h1 class=" text-3xl md:text-5xl font-extrabold mb-2">
                        Chào mừng bạn đến với Website mượn sách Fisbook!
                    </h1>
                    <p class="text-lg font-normal  dark:text-gray-400 mb-6">
                        Mượn sách dễ dàng và nhanh chóng tại <strong class="text-black">Fisbook</strong>. Hãy khám phá
                        ngay để trải nghiệm
                        tiện ích tuyệt vời và đắm chìm trong thế giới văn học đa dạng.
                    </p>
                    <Button shadow :on-click="() => router.push('/product')">
                        Xem ngay
                        <i class="fa-solid fa-arrow-right"></i>
                    </Button>
                </div>
            </div>
            <div class="col-span-3">
                <CarouselProduct v-if="product.length > 0" title="Sách hay" :products="product" />
                <LoadingItem v-else />
            </div>
            <div class="col-span-3">
                <IntroItem icon="fa-solid fa-truck-fast">
                    Vận chuyển
                    <template #subtitle>
                        Giao hàng nhanh, đúng hẹn, vận chuyển nhanh chóng
                    </template>
                </IntroItem>
            </div>
            <div class="col-span-3">
                <IntroItem icon="fa-solid fa-thumbs-up">
                    Chất lượng
                    <template #subtitle>
                        Nhiều thể loại sách, từ tiểu thuyết, kinh doanh đến khoa học
                    </template>
                </IntroItem>
            </div>
            <div class="col-span-3">
                <IntroItem icon="fa-solid fa-coins">
                    Giá rẻ
                    <template #subtitle>
                        Mượn sách giá rẻ giúp mọi người dễ dàng tiếp cận văn hóa đọc
                    </template>
                </IntroItem>
            </div>
            <div class="col-span-3">
                <IntroItem icon="fa-solid fa-shield">
                    Bảo mật
                    <template #subtitle>
                        Các thông tin được đảm bảo, thanh toán an toàn
                    </template>
                </IntroItem>
            </div>
            <div class="col-span-6 flex">
                <GroupItem  
                    title="Đề xuất dành cho bạn" 
                    subtitle="Có thể phù hợp với sở thích của bạn" 
                    class="bg-amber-200"
                    :data="offers"
                />
            </div>
            <div class="col-span-6 flex">
                <GroupItem 
                    class="bg-blue-200"
                    title="Sách cũ mà mới"
                    subtitle="Những quyển sách vừa được cập nhật"
                    :data="news"
                />
            </div>
        </div>

    </div>
</template>