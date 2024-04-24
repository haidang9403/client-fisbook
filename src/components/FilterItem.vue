<script setup>
import { useRouter } from 'vue-router';
import { watch, ref, onMounted } from 'vue';

const props = defineProps({
    id: String,
    label: String,
    body: Array,
    expand: Boolean,
    first: Boolean,
    end: Boolean,
})

const router = useRouter();

const checkedIds = ref([])

watch(() => router.currentRoute.value.query, (newValue) => {
    checkedIds.value = newValue[props.id] ? newValue[props.id].split(',') : []
})

const handleChange = (itemId, checked) => {
    const currentRoute = router.currentRoute.value
    let queryParams = { ...currentRoute.query }

    if (checked) {
        // Nếu checkbox được kiểm tra, thêm ID vào query params
        if (!queryParams[props.id]) {
            queryParams[props.id] = itemId
        } else {
            queryParams[props.id] += ',' + itemId
        }
    } else {
        // Nếu checkbox không được kiểm tra, loại bỏ ID khỏi query params
        if (queryParams[props.id]) {
            const idList = queryParams[props.id].split(',')
            const index = idList.indexOf(itemId)
            if (index !== -1) {
                idList.splice(index, 1)
                if (idList.length === 0) {
                    delete queryParams[props.id]  // Xóa ID khỏi query params nếu không có ID nào khác
                } else {
                    queryParams[props.id] = idList.join(',')
                }
            }
        }
    }

    router.push({ name: currentRoute.name, query: queryParams })
}

onMounted(() => {
    checkedIds.value = router.currentRoute.value.query[props.id] ? router.currentRoute.value.query[props.id].split(',') : []
})

</script>

<template>
    <h2 :id="'accordion-arrow-icon-heading-' + id">
        <button type="button"
            class="flex items-center bg-white justify-between w-full p-4 text-sm font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-100 gap-3"
            :class="{
                'rounded-t-lg': first,
                'border-b-0': !end,
            }" :data-accordion-target="'#accordion-arrow-icon-body-' + id" :aria-expanded="expand ? true : false"
            :aria-controls="'accordion-arrow-icon-body-' + id">
            <span>{{ label }}</span>
            <svg data-accordion-icon class="w-3 h-3 rotate-180 shrink-0" aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 5 5 1 1 5" />
            </svg>
        </button>
    </h2>
    <div :id="'accordion-arrow-icon-body-' + id" class="hidden" :aria-labelledby="'accordion-arrow-icon-heading-' + id">
        <div class="p-2 border bg-white border-gray-200 h-[300px] overflow-auto" :class="{
                'border-b-0': !end,
                'border-t-0': end
            }">
            <div v-for="(item,index) in body" :key="index" class="flex items-center ps-4">
                <input :id="'checkbox-' + item._id" type="checkbox"
                    :checked="checkedIds.includes(item._id)"
                    class="w-4 h-4 bg-gray-100 cursor-pointer border-gray-300 rounded focus:ring-offset-0 focus:ring-transparent"
                    @change="(e) => { handleChange(item._id, e.target.checked)}"
                >
                <label :for="'checkbox-' + item._id"
                    class="w-full py-4 ms-2 text-xs font-medium select-none text-gray-900 cursor-pointer">{{ item.label
                    }}</label>
            </div>
        </div>
    </div>
</template>