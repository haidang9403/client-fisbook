<script setup>
import Input from '@/components/inputs/Input.vue';
import Textarea from '@/components/inputs/Textarea.vue';
import ImageBook from '@/components/ImageBook.vue';
import Redirection from './Redirection.vue';
import Button from './Button.vue';
import Spinner from './Spinner.vue';
import { watch, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useLoading } from '@/stores/loading';

const props = defineProps({
    step: {
        type: Number,
        default: 1
    },
    data: Object,
    nextStep: Function,
    preStep: Function,
    errors: Object,
    isLoading: Boolean,
    isSuccess: Boolean
})

const router = useRouter()
const time = ref(3);
const { showLoading } = useLoading()

const label = {
    1: 'Thanh toán',
    2: 'Trở lại'
}

const title = {
    1: "Thông tin mượn sách",
    2: "Thanh toán",
    3: "Hoàn tất"
}

const infoUser = defineModel()

let intervalId = null;

function startCountdown() {
    intervalId = setInterval(() => {
        if (time.value <= 0) {
            clearInterval(intervalId);
            showLoading()
            router.push('/');
        } else {
            time.value--;
        }
    }, 1000);
}

watch(() => props.isSuccess, (value) => {
    if (value) {
        if (!intervalId) {
            startCountdown();
        }
    }
});

if (props.isSuccess) {
    startCountdown();
}

</script>

<template>
    <div>
        <div class="flex justify-between items-start mb-12">
            <h3 class="text-2xl font-bold flex items-center">{{ title[step] }}</h3>
            <div class="flex gap-4">
                <Redirection v-if="step == 1" right :label="label[step]" @click="nextStep" />
                <Redirection v-if="step == 2" left :label="label[step]" @click="preStep" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-20">
            <div class="flex gap-4 ">
                <ImageBook size="md" :src="data?.img" :alt="data?.title" />
                <div class="flex flex-col gap-12">
                    <h3 class="text-xl font-semibold line-clamp-2">
                        {{  data?.title }}
                    </h3>
    
                    <p class="text-2xl font-semibold">
                        <i class="fa-solid fa-dong-sign text-base"></i>{{ data?.price?.toLocaleString() }}
                    </p>

                    <div class="text-sm">
                        <div class="text-xs font-light">
                            Tác giả
                        </div>
                        <div class="font-semibold">
                            {{ data?.author?.fullname }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="step === 1">
                <Input v-model="infoUser.fullname" type="text" label="Họ và tên" id="fullname" />
                <div class="grid grid-cols-2 gap-4">
                    <Input v-model="infoUser.email" type="email" label="Email" id="email" :errors="errors" />
                    <Input v-model="infoUser.phone" type="text" label="Số điện thoại" id="phone" :errors="errors" />
                </div>
                <Textarea rows="4" v-model="infoUser.address" type="text" label="Địa chỉ" id="address" :errors="errors" />
            </div>
            <div v-if="step === 2">
                <div  v-if="isLoading" class="flex items-center justify-center h-full">
                    <Spinner/>
                </div>
                <div v-else class="flex flex-col gap-8">
                    <div class="grid gap-4">
                        <div>
                            <i class="fa-regular fa-envelope mr-2"></i>
                            Email: <strong>{{ infoUser.email }}</strong>
                        </div>
                        <div>
                            <i class="fa-solid fa-phone-volume mr-2"></i>
                            Số điện thoại: <strong>{{ infoUser.phone || 'Chưa cập nhật'}}</strong>
                        </div>
                        <div>
                            <i class="fa-solid fa-location-dot mr-2"></i>
                            Địa chỉ: <strong>{{ infoUser.address || 'Chưa cập nhật' }}</strong>
                        </div>
                    </div>
                    <div class="flex flex-col items-end">
                        <h4 class="font-bold text-xl mb-2">Tổng thanh toán</h4>
                        <p class="text-xl font-semibold">
                            <i class="fa-solid fa-dong-sign text-base"></i>{{ data?.price?.toLocaleString() }}
                        </p>
                    </div>
                    <Button
                        isFull
                        :on-click="nextStep"
                    >
                        Mượn sách
                    </Button>
                </div>
            </div>
            <div v-if="step === 3" class="grid justify-center items-start">
                <div class="text-green-500 text-3xl flex flex-col items-center justify-center">
                    <i class="fa-regular fa-circle-check"></i>
                    <h3 class="mb-4">Hoàn tất <i class="fa-solid fa-exclamation ml-2"></i></h3>
                </div>
                <div class="flex justify-center text-xl">
                    Trở về trang chủ sau {{ time }} s
                </div>
            </div>
        </div>
    </div>
    
</template>