<script setup>
import Button from "@/components/Button.vue";
import Input from "@/components/inputs/Input.vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useAuth } from "@/stores/auth";
import { storeToRefs } from "pinia";

const router = useRouter();


// Store
const auth = useAuth();

const { errors } = storeToRefs(auth);
const { register, clearError } = auth;

// Ref
const agree = ref(false)
const showMessage = ref(false)
const user = ref({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
})

const isLoading = ref(false);

// function
const handleCheck = () =>{
    showMessage.value = false;
}
const onSubmit = async () => {
    if(agree.value){
        isLoading.value = true;
        const data = await register(user.value);
        isLoading.value = false;
        if (data) {
            clearError();
            router.push("/")
        }
    } else {
        showMessage.value = true;
    }
}  
</script>

<template>
    <div class="bg-sky-700  w-full h-full py-12 px-8">
        <div class="grid grid-cols-3 w-full h-full py-8 pr-8 bg-white rounded-lg shadow-md gap-24 pl-16">
            <div class="col-span-2">
                <router-link to="/" class="font-bold"><i class="fa-solid fa-house  mr-2"></i> Fistore</router-link>
                <div class="flex justify-between py-12">
                    <router-link @click="clearError" to="/login" class=" bg-gray-100 py-1.5 px-2.5 font-semibold text-sm ">
                        Đăng nhập
                    </router-link>
                    <router-link @click="clearError" to="/register" class=" bg-blue-100 py-1.5 px-2.5 text-blue-500 font-semibold text-sm">
                        Đăng ký
                    </router-link>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="">
                        <h1 class="text-3xl font-bold uppercase text-blue-700 mb-6">Trải nghiệm tuyệt vời cùng với
                            fistore</h1>
                        <p class="text-sm">Đăng ký ngay để trở thành thành viên của Fistore</p>
                    </div>
                    <form @submit.prevent="onSubmit" class="w-full relative">
                        <Input type="text" label="Họ và tên" id="fullname" :disabled="isLoading" :errors="errors"
                            v-model="user.fullname" @in-focus="clearError" />
                        <Input type="text" label="Tài khoản" id="username" :disabled="isLoading" :errors="errors"
                            v-model="user.username" @in-focus="clearError" />
                        <Input type="password" label="Mật khẩu" id="password" :disabled="isLoading" :errors="errors"
                            v-model="user.password" @in-focus="clearError" />
                        <Input type="password" label="Nhập lại mật khẩu" id="confirmPassword" :disabled="isLoading"
                            :errors="errors" v-model="user.confirmPassword" @in-focus="clearError" />
                        <div class="flex items-start mb-6">
                            <div class="flex items-center h-5">
                                <input id="remember" type="checkbox" v-model="agree" @change="handleCheck"
                                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700" />
                            </div>
                            <label for="remember" class="ms-2 text-sm focus:outline-none font-medium text-gray-900">
                                Đồng ý với chính sách và điều khoản
                            </label>
                        </div>
                        <p v-if="showMessage" class="mt-2 text-[10px] text-red-600 absolute bottom-[45px]">Vui lòng đồng ý với điều khoản</p>
                        <button type="submit"
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center">
                            Đăng ký
                        </button>
                    </form>
                </div>
            </div>
            <img src="/images/login.jpg" class="rounded-lg object-cover h-full max-w-full"></img>
        </div>
    </div>
</template>