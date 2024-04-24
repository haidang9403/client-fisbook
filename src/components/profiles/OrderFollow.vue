<script setup>
import { useAuth } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { onMounted, ref, computed } from 'vue';
import userService from '@/services/user.service';
import { useAlert } from '@/stores/alert';
import { useRouter } from 'vue-router';
import SideBar from '../sidebars/SideBar.vue';
import Pagination from '../Pagination.vue';
import useOrderSidebar from '@/composables/useOrderSidebar';
import usePagination from '@/composables/usePagination';
import CardBorrow from '../CardBorrow.vue';

const router = useRouter()
const routes = useOrderSidebar()
const auth = useAuth()
const { user } = storeToRefs(auth)
const { showAlertMessage}  = useAlert()
const borrowings = ref([])
const borrowingsFilter = computed(() => {
    const state = router.currentRoute.value.query.state || 'all'
    let status
    switch(state){
        case 'all':
            status = ''
            break
        case 'wait':
            status = 'Chưa duyệt'
            break
        case 'progress':
            status = 'Đang mượn'
            break
        case 'finish':
            status = 'Đã trả'
            break
        case 'refuse':
            status = 'Từ chối'
            break
    }

    if(!!status){
       return borrowings.value.filter(item => item.status === status)
    } else 
        return borrowings.value
})

const pagination = computed(() => usePagination(borrowingsFilter.value, 6));

const fetchData = async () => {
    try{
        userService.getDetailUser(user.value?._id)
            .then((res) => {
                borrowings.value = res.borrowings
                borrowings.value.sort((a,b) => {
                    return new Date(b.borrow_at) - new Date(a.borrow_at);
                })
            })
    } catch(error){
        showAlertMessage('danger', "Có lỗi xảy ra!")
    }
}

onMounted(() => {
    fetchData()
})
</script>

<template>
    <div class="px-12">
        <h2 class="font-bold text-2xl mb-4"> Đơn mượn </h2>
        <SideBar :routes="routes"/>
        <div class="flex flex-col gap-6 mt-4">
            <div v-for="(item,index) in pagination.paginatedData.value"  class="p-2 shadow border border-gray-200 rounded-lg overflow-hidden">
                <CardBorrow :data="item"/>
            </div>
        </div>
        <div v-if="pagination.totalPage > 1" class=" flex justify-center py-12">
            <Pagination :visiblePage="5" :totalPage="pagination.totalPage" :currentPage="pagination.page.value"
                @to-next="pagination.nextPage" @to-back="pagination.backPage" @to-page="pagination.goToPage" />
        </div>
    </div>
</template>