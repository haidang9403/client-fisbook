<script setup>
import SearchInput from "@/components/inputs/SearchInput.vue";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleClick = (path) => {
    router.push(path);
}
</script>

<template>
    <header class="w-full h-[90px] border-b border-gray-200 fixed top-0 left-0 right-0 bg-gray-100 z-50">
        <div class="container mx-auto md:px-12 grid grid-cols-12 items-center py-6">
            <h2 class="text-lg font-bold col-span-2">LOGO HERE</h2>
            <div class="col-span-10 flex items-center justify-center gap-2">
                <div class="flex-1">
                    <SearchInput />
                </div>
                <Button secondary @on-click="() => handleClick('/register')">
                    Đăng ký
                </Button>
                <Button shadow @on-click="() => handleClick('/login')">
                    <i class="fa-regular fa-user"></i>
                    Đăng nhập
                </Button>
            </div>
        </div>
    </header>
</template>