<script setup>
import { initDropdowns } from 'flowbite';
import { onMounted, ref } from 'vue';

defineProps({
    id: String,
    user: Object,
})

const dropdownButton = ref(null)

const onHiden = () => {
    dropdownButton.value.click()
}

onMounted(() => {
    initDropdowns();
})
</script>

<template>
    <button
        ref="dropdownButton"
        :id="id" :data-dropdown-toggle="id + 'Avatar'"
        class="flex items-center text-sm pe-1 font-medium rounded-full hover:text-blue-600 md:me-0 focus:ring-transparent"
        type="button"
    >
        <img class="w-8 h-8 me-2 rounded-full" :src="user?.image || '/images/placeholder.jpg'" :alt="user?.fullname">
        {{ user?.fullname }}
        <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 10 6">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 4 4 4-4" />
        </svg>
    </button>

    <!-- Dropdown menu -->
    <div 
        :id="id + 'Avatar'"
        class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
    >
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div class="font-medium ">Tài khoản</div>
            <div class="truncate">{{  user?.username }}</div>
        </div>
        <slot :onHiden="onHiden">

        </slot>
        
    </div>
</template>