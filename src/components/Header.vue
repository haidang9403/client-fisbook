<script setup>
import { initDropdowns } from "flowbite";
import { onMounted } from "vue";
import SearchInput from "@/components/inputs/SearchInput.vue";
import Button from "@/components/Button.vue";
import { useRouter } from "vue-router";
import  { useAuth } from '@/stores/auth';
import { useLoading } from "@/stores/loading"
import { useAlert } from "@/stores/alert";
import { storeToRefs } from "pinia";
import AvatarDrowdown from '@/components/AvatarDropdown.vue';
import mainPath from "@/utils/mainPath";

const router = useRouter();

const { showLoading, dismissLoading } = useLoading();
const { showAlertMessage } = useAlert()
const auth = useAuth();
const { user, isLogin } = storeToRefs(auth);

const { logout } = auth 

const handleLogout = () => {
    showLoading();
    return new Promise((resolve, reject) => {
        logout()
        resolve(true)
    }).then(() => {
        showAlertMessage('success', "Đã đăng xuất")
        const path = mainPath(router.currentRoute.value.path)
        if( path === '/borrow' || path === '/profile'){
            router.push("/")
        }
        setTimeout(() => {
            dismissLoading()
        }, 500)
    })
}


const handleClick = (path) => {
    showLoading()
    router.push(path);
}

onMounted(() => {
    initDropdowns()
})
</script>

<template>
    <header class="w-full h-[90px] shadow fixed top-0 left-0 right-0 bg-white z-[35]">
        <div class="container mx-auto md:px-12 grid grid-cols-12 items-center py-6">
            <router-link to="/" class="col-span-2 ">
                <h2 class="text-3xl font-bold text-center flex gap-0 items-end">
                    Fisb
                    <i class="fa-solid fa-fish" style="color: #74C0FC;"></i>
                    k
                </h2>
            </router-link>
            <div class="col-span-10 flex items-center justify-center gap-2">
                <div class="flex-1">
                    <SearchInput />
                </div>
                <div v-if="isLogin" class="w-[300px] flex justify-end">
                    <AvatarDrowdown v-slot="slotProps" id="user" :user="user">
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <router-link to="/profile" @click="slotProps.onHiden" class="block cursor-pointer px-4 py-2 hover:bg-gray-100 ">
                                    Quản lý tài khoản
                                </router-link>
                            </li>
                            <li>
                                <router-link to="/profile/borrow" @click="slotProps.onHiden" class="block px-4 py-2 hover:bg-gray-100">
                                    Đơn mượn
                                </router-link>
                            </li>
                        </ul>
                        <div class="py-2">
                            <div @click="handleLogout"
                                class="block cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-100  ">
                                Đăng xuất
                            </div>
                        </div>
                    </AvatarDrowdown>
                </div>
                <div v-else class="flex gap-2 w-[300px]  justify-end">
                    <Button secondary :on-click="() => handleClick('/register')">
                        Đăng ký
                    </Button>
                    <Button shadow :on-click="() => handleClick('/login')">
                        <i class="fa-regular fa-user"></i>
                        Đăng nhập
                    </Button>
                </div>

            </div>
        </div>
    </header>
</template>