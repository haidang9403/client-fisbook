<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/inputs/Input.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuth } from "@/stores/auth";
import { useAlert } from '@/stores/alert';
import { useLoading } from "@/stores/loading"
import { storeToRefs } from "pinia";
import { useTitle } from "@vueuse/core";

const title = useTitle()
title.value = "Đăng nhập"

const router = useRouter();

// Store
const auth = useAuth();
const alert = useAlert();
const { showLoading } = useLoading();

const { errors } = storeToRefs(auth);
const { login, clearError } = auth;

const { showAlertMessage } = alert;

// Ref
const user = ref({
    username: "",
    password: ""
})

const isLoading = ref(false);

// function
const onSubmit = async () => {
    isLoading.value = true;
    const data = await login(user.value);
    isLoading.value = false;
    if(data){
        showLoading();
        clearError();
        showAlertMessage('success', 'Đăng nhập thành công');
        setTimeout(() => {
            router.back();
        }, 200)

    }
}   
</script>

<template>
    <div class="bg-sky-700  w-full h-full py-12 px-8">
        <div class="grid grid-cols-3 w-full h-full py-8 pr-8 bg-white rounded-lg shadow-md gap-24 pl-16">
            <div class="col-span-2 flex flex-col gap-12">
                <router-link to="/" class="font-bold w-[200px]"><i class="fa-solid fa-house  mr-2"></i> Fistore</router-link>
                <div class="flex justify-between">
                    <router-link @click="clearError" to="/login" class=" bg-blue-100 py-1.5 px-2.5 text-blue-500 font-semibold text-sm">
                        Đăng nhập
                    </router-link>
                    <router-link @click="clearError" to="/register" class=" bg-gray-100 py-1.5 px-2.5 font-semibold text-sm">
                        Đăng ký
                    </router-link>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="">
                        <h1 class="text-3xl font-bold uppercase text-blue-700 mb-6">Trải nghiệm tuyệt vời cùng với
                            fistore</h1>
                        <p class="text-sm">Hãy đăng nhập để mở khóa nhiều tính năng hơn!</p>
                    </div>
                    <form @submit.prevent="onSubmit" class="w-full flex flex-col justify-between">
                        <div>
                            <Input 
                                type="text" 
                                label="Tài khoản" 
                                id="username" 
                                :disabled="isLoading"
                                :errors="errors"
                                v-model="user.username"
                                @in-focus="clearError"
                            />
                            <Input 
                                type="password" 
                                label="Mật khẩu" 
                                id="password"
                                :disabled="isLoading"
                                :errors="errors"
                                v-model="user.password"
                                @in-focus="clearError"
                            />
                            <div class="flex items-start mb-6">
                                <div class="flex items-center h-5">
                                    <input id="remember" type="checkbox" value=""
                                        class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700" />
                                </div>
                                <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Ghi
                                    nhớ tài khoản
                                </label>
                            </div>
                        </div>
                        <button type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">Đăng
                            nhập
                        </button>
                    </form>
                </div>
            </div>
            <img src="/images/login.jpg" class="rounded-lg object-cover h-full max-w-full"></img>
        </div>
    </div>
</template>