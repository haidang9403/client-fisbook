<script setup>
import Input from '../inputs/Input.vue';
import Textarea from '../inputs/Textarea.vue';
import Button from '../Button.vue';
import { useAuth } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import authService from '@/services/auth.service';
import { useAlert } from '@/stores/alert';
import { useLoading } from '@/stores/loading';

const auth = useAuth()
const { showLoading } = useLoading()
const isLoading = ref(false)
const { user, errors } = storeToRefs(auth)
const { changePassword, clearError} = auth
const { showAlertMessage}  = useAlert()
const password = ref({
    current: "",
    change: "",
    confirm: "",
})

const handleChangePass = async () => {
    isLoading.value = true;
    const state = await changePassword({
        password: password.value.current,
        newPassword: password.value.change,
        confirmPassword: password.value.confirm
    })
    isLoading.value = false;

    if(state){
        showLoading();
        clearError();
        password.value = {
            current: "",
            change: "",
            confirm: "",
        }
        showAlertMessage('success', 'Thay đổi mật khẩu thành công');
    }
}




onUnmounted(() => {
    clearError()
})
</script>

<template>
    <div class="px-12">
        <h2 class="font-bold text-2xl mb-6">Đổi mật khẩu</h2>
        <div class="grid w-2/4 gap-2">
            <Input 
                type="password" 
                label="Mật khẩu hiện tại" 
                id="password" 
                v-model="password.current"
                :errors="errors"
                @in-focus="clearError"
                :disabled="isLoading"
            />
            <Input 
                type="password" 
                label="Mật khẩu mới" 
                id="newPassword" 
                v-model="password.change"
                @in-focus="clearError"
                :errors="errors"
                :disabled="isLoading"
            />
            <Input 
                type="password" 
                label="Xác nhận mật khẩu" 
                id="confirmPassword" 
                v-model="password.confirm"
                @in-focus="clearError"
                :errors="errors"
                :disabled="isLoading"
            />
        </div>
        <Button :on-click="handleChangePass">
            Đổi mật khẩu
        </Button>
    </div>
</template>