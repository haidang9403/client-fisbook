<script setup>
import Input from '../inputs/Input.vue';
import Textarea from '../inputs/Textarea.vue';
import Radio from '../inputs/Radio.vue';
import Button from '../Button.vue';
import { useAuth } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, reactive, ref, watch } from 'vue';
import userService from '@/services/user.service';
import { useAlert } from '@/stores/alert';
import { useRouter } from 'vue-router';
import { FwbModal, FwbButton } from 'flowbite-vue';
import { useLoading } from '@/stores/loading';
import { format } from 'date-fns';

const router = useRouter()
const auth = useAuth()
const isShowModal = ref(false)
const { user } = storeToRefs(auth)
const { showAlertMessage}  = useAlert()
const { showLoading } = useLoading()
const inforUser = ref({
    fullname: '',
    email: '',
    address: '',
    phone: '',
    image: '',
    gender: '',
    date: ''
})

const errors = ref({})

const showModal = () => {
    isShowModal.value = true
}

const closeModal = () => {
    isShowModal.value = false
}

const change = ref(0)

watch(inforUser, () => {
    change.value++;
},{ deep: true })

const gender = ref([
    {
        label: "Nam",
        value: 1
    },
    {
        label: "Nữ",
        value: 2
    },
    {
        label: "Khác",
        value: 3
    },
])

const fetchData = async () => {
    try{
        userService.getDetailUser(user.value?._id)
            .then((res) => {
                inforUser.value = {
                    fullname: res.fullname,
                    email: res.email,
                    address: res.address,
                    phone: res.phone,
                    image: res.image,
                    gender: res.gender,
                    date: format(res.date, 'yyyy-MM-dd')
                }

                change.value = 0
            });
    } catch(error){
        showAlertMessage('danger', "Có lỗi xảy ra!")
    }
}

const resetData = () => {
    if(change.value > 1){
        fetchData()
    }
}


router.beforeEach((from, to, next) => {
    if(change.value > 1){
        showModal()
    } else {
        next()
    }
})

const clearError = () => {
    errors.value = {}
}

const updateUser = async () => {
    try{
        showLoading()
        await userService.updateFull(user.value._id, inforUser.value)
        change.value = 1;
        showAlertMessage('success', "Lưu thành công!")
    } catch(error){
        errors.value = error?.response?.data
        change.value = 2;
        showAlertMessage('danger', "Lưu không thành công!")
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="px-12">
        <h2 class="font-bold text-2xl mb-6">Thông tin tài khoản</h2>
        <div class="grid grid-cols-2 gap-2">
            <div class="col-span-2">
                <Input 
                    type="text" 
                    label="Họ và tên" 
                    id="fullname" 
                    v-model="inforUser.fullname"
                    :errors="errors"
                    @in-focus="clearError"
                />
            </div>
            <div class="col-span-2">
                <Input 
                    type="text" 
                    label="Email" 
                    id="email" 
                    v-model="inforUser.email"
                    :errors="errors"
                    @in-focus="clearError"
                />
            </div>
            
            <div>
                <Input 
                    type="text" 
                    label="Số điện thoại" 
                    id="phone" 
                    v-model="inforUser.phone"
                    :errors="errors"
                    @in-focus="clearError"
                />
            </div>
            
            <div>
                <Input 
                    type="date" 
                    label="Ngày sinh" 
                    id="date" 
                    v-model="inforUser.date"
                    :errors="errors"
                    @in-focus="clearError"
                />
            </div>
            <div class="flex gap-12 col-span-2 items-center mb-6">
                <Radio 
                    label="Giới tính"
                    id="gender"
                    :data="gender"
                    v-model="inforUser.gender"
                    :errors="errors"
                    @in-focus="clearError"
                />
            </div>
            <div class="col-span-2">
                <Textarea 
                    rows="4"
                    type="text" 
                    label="Địa chỉ" 
                    id="address" 
                    v-model="inforUser.address"
                    :errors="errors"
                    @in-focus="clearError"
                />
            </div>
        </div>
        <div class="flex gap-4">
            <Button secondary shadow :on-click="resetData">
                Đặt lại
            </Button>
            <Button :on-click="updateUser">
                Lưu
            </Button>
        </div>
    </div>
    <fwb-modal v-if="isShowModal" size="md" @close="closeModal" @click:outside="showModal">
        <template #header>
            <div class="flex items-center text-lg">
                Lưu ý
            </div>
        </template>
        <template #body>
            <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Bạn chưa lưu những thay đổi
            </p>
        </template>
        <template #footer>
            <div class="flex justify-between">
                <fwb-button 
                    @click="() => {
                        resetData()
                        closeModal()
                    }" 
                    color="alternative"
                >
                    Hủy lưu
                </fwb-button>
                <fwb-button 
                    @click="() => {
                        updateUser()
                        closeModal()
                    }"
                    color="blue"
                >
                    Lưu
                </fwb-button>
            </div>
            </template>
    </fwb-modal>
</template>