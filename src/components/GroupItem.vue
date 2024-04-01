<script setup>
import ImageBook from './ImageBook.vue';

</script>

<template>
    <div class="w-full w-max-[660px rounded-lg px-12 py-8">
        <h2 class="text-2xl font-bold my-4">Đề xuất cho bạn</h2>
        <p class="text-sm mb-8 w-full">Những quyển sách có thể phù hợp với sở thích của bạn</p>
        <div class="grid grid-cols-4">
            <ImageBook src="/images/64b2eaa5b859d8ba1412f1b350c3e128.jpg.webp" />
            <ImageBook src="/images/64b2eaa5b859d8ba1412f1b350c3e128.jpg.webp" />
            <ImageBook src="/images/64b2eaa5b859d8ba1412f1b350c3e128.jpg.webp" />
            <ImageBook src="/images/64b2eaa5b859d8ba1412f1b350c3e128.jpg.webp" />
        </div>
    </div>
</template>