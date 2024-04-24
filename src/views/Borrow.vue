<script setup>
import StepperCheckout from '@/components/StepperCheckout.vue';
import FormCheckout from '@/components/FormCheckout.vue';
import useGuards from '@/composables/useGuards'; 
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import bookService from '@/services/book.service';
import borrowService from '@/services/borrow.service';
import { userSchema, errorValidateAll } from '@/utils/validate';
import userService from '@/services/user.service';
import Skeleton from '@/components/Skeleton.vue';
import { useAuth } from '@/stores/auth';
import { useAlert } from '@/stores/alert';
import { storeToRefs } from 'pinia';
import { useTitle } from "@vueuse/core";

const title = useTitle()
title.value = "Mượn sách"

const { user } = storeToRefs(useAuth());
const { showAlertMessage } = useAlert();

const route = useRoute();
const router = useRouter();
const step = ref(1);
const book = ref({});
const errors = ref({});
const id = computed(() => route.query.book);
const isLoading = ref(false);
const isLoadingForm = ref(false);
const isSuccess = ref(false)

const infoUser = ref({
    fullname: user.value?.fullname,
    email: user.value?.email,
    phone: user.value?.phone,
    address: user.value?.address
})

const nextStep = async () => {
    try{
        switch (step.value) {
            case 1:
                userSchema.validate.validate(infoUser.value,  { abortEarly: false })
                    .then(() => {
                        errors.value = {}
                        step.value++
                    })
                    .catch((error) => errors.value = errorValidateAll(error))
                break;
            case 2:
                isLoadingForm.value = true
                userService.update(user.value?._id, infoUser.value)
                    .then(() => borrowService.borrow({
                                    user_id: user.value?._id,
                                    book_id: id.value
                                })
                        )
                    .then(() => {
                        setTimeout(() => {
                            isLoadingForm.value = false
                            isSuccess.value = true
                            showAlertMessage('success', "Mượn thành công")
                            step.value++
                        }, 300)
                    })
            default:
                break;
        }
    } catch(error){
        showAlertMessage('danger', "Có lỗi xảy ra, thử lại sau ít phút!")
    }
}

const preStep = () => {
    if(step.value > 1){
        step.value --
    }
}

const fetchData = async () => {
    isLoading.value = true;
    if(id.value){
        userService.getDetailUser(user.value._id)
            .then((res) => {
                infoUser.value.fullname = res.fullname;
                infoUser.value.phone = res.phone;
                infoUser.value.email = res.email;
                infoUser.value.address = res.address;
                
            })
        bookService.getOne(id.value).then((data) => {
            book.value = data;
        })
        .finally(() => {
            setTimeout(() => {
                isLoading.value = false
            }, 300)
        })
    } else {
        
    }
}

onMounted(() => {
    useGuards();
    fetchData()
})

</script>

<template>
    <div v-if="isLoading" class="h-[550px] py-4">
        <Skeleton />
    </div>
    <div v-else-if="book.amount < 1" class="bg-white w-full rounded-lg h-[510px]">
        <div class="text-3xl flex gap-4 items-center text-yellow-400 w-full h-full justify-center">
            <i class="fa-regular fa-circle-xmark"></i>
            <p >Tạm hết sách!</p>
        </div>
    </div>
    <div v-else class="w-full">
        <div class="w-full mb-9 px-64">
            <StepperCheckout :step="step" />
        </div>
        <div class="bg-white rounded-lg p-6">
            <FormCheckout :errors="errors" :is-loading="isLoadingForm" :is-success="isSuccess"  v-model="infoUser" :step="step" :data="book" :next-step="nextStep" :pre-step="preStep"/>
        </div>
    </div>
</template>