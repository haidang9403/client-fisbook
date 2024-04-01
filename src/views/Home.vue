<script setup>
import Button from '@/components/Button.vue';
import IntroItem from '@/components/IntroItem.vue'
import CarouselProduct from '@/components/CarouselProduct.vue';
import GroupItem from '@/components/GroupItem.vue'

const product = [
    {
        title: "Tuổi Trẻ Đáng Bao Nhiêu Tiền?",
        price: 1000,
        image: '/images/64b2eaa5b859d8ba1412f1b350c3e128.jpg.webp'
    },
    {
        title: "Tuổi Trẻ Đáng Bao Nhiêu Tiền?",
        price: 2000,
        image: '/images/64b2eaa5b859d8ba1412f1b350c3e128.jpg.webp'
    },
    {
        title: "Tuổi Trẻ Đáng Bao Nhiêu Tiền?",
        price: 3000,
        image: '/images/64b2eaa5b859d8ba1412f1b350c3e128.jpg.webp'
    },
];

</script>
<template>
    <div class="mt-4">
        <div class="grid grid-cols-12 grid-rows-1 gap-4">
            <div class="col-span-9">
                <div class="bg-blue-100 h-full border border-gray-200  rounded-lg p-8 md:p-12 mb-8">
                    <span
                        class="bg-orange-200 border text-xs font-medium inline-flex gap-2 items-center px-2.5 py-0.5 rounded-md mb-2">
                        <i class="fa-solid fa-eye"></i>
                        Fistore
                    </span>
                    <h1 class=" text-3xl md:text-5xl font-extrabold mb-2">
                        Chào mừng bạn đến với Website mượn sách Fistore!
                    </h1>
                    <p class="text-lg font-normal  dark:text-gray-400 mb-6">
                        Mượn sách dễ dàng và nhanh chóng tại <strong class="text-black">Fistore</strong>. Hãy khám phá
                        ngay để trải nghiệm
                        tiện ích tuyệt vời và đắm chìm trong thế giới văn học đa dạng.
                    </p>
                    <Button shadow>
                        Xem ngay
                        <i class="fa-solid fa-arrow-right"></i>
                    </Button>
                </div>
            </div>
            <div class="col-span-3">
                <CarouselProduct title="Sách hay" :products="product" />
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
                <GroupItem class="bg-amber-200" />
            </div>
            <div class="col-span-6 flex">
                <GroupItem class="bg-blue-200" />
            </div>
        </div>

    </div>
</template>