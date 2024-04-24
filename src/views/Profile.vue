<script setup>
import useProfileSidebar from '@/composables/useProfileSidebar';
import SideBar from '@/components/sidebars/SideBar.vue';
import Avatar from '@/components/Avatar.vue';
import Input from '@/components/inputs/Input.vue';
import userService from '@/services/user.service';
import { useAuth } from '@/stores/auth';
import { useAlert } from '@/stores/alert';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import Skeleton from '@/components/Skeleton.vue';

const routes = useProfileSidebar();
const auth = useAuth();
const { user } = storeToRefs(auth);
const errors = ref({})
const { clearError } = auth;
const image = ref(user.value.image);
const { showAlertMessage } = useAlert()

const uploadImage = async (file) => {

    userService.updateImage(user.value._id,{
        photo: file
    }).then((res) => {
        user.value.image = res.image
        errors.value = []
        showAlertMessage("success", "Thay đổi ảnh thành công!")
    }).catch((error) => {
        errors.value.photo = error.response?.data?.message
    })

}

const handleImage = (e) => {
    image.value = e.url
}

</script>

<template>
    <div v-if="!user" class="w-full h-[550px]">
        <Skeleton />
    </div>
    <div v-else class="grid grid-cols-12 gap-4">
        <div class="col-span-3 ">
            <div class="p-4 grid gap-10 bg-white rounded-lg overflow-hidden border border-gray-200">
                <div class="flex flex-col gap-2 items-center justify-center w-full">
                    <Avatar size="lg" :image="image" />
                    <Input type="file" label="Tải ảnh" :errors="errors" id="photo" @input-file="uploadImage" @get-image="handleImage"/>
                </div>
                <SideBar :routes="routes" layout="y"/>
            </div>
        </div>
        <div class="col-span-9 bg-white rounded-lg border border-gray-200 py-6">
            <router-view></router-view>
        </div>
    </div>
</template>