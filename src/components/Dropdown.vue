<script setup>
import { initDropdowns } from 'flowbite';
import { onMounted } from 'vue';

defineProps({
    id: String,
    transparent: Boolean,
    defaultLabel: {
        type: String,
        default: "Chọn giá trị"
    },
    label: String,
    icon: String,
})

onMounted(() => {
    initDropdowns()
})

</script>

<template>
        <button 
            :id="id" 
            :data-dropdown-toggle="'dropdown' + id" 
            data-dropdown-placement="bottom"
            class=" text-gray-900 text-sm rounded-lg w-full p-2.5 items-center justify-between flex gap-2"
            :class="{
                'bg-gray-50 border border-gray-300 focus:ring-blue-500 focus:border-blue-500': !transparent
            }"
            type="button"
        >
            <i :class="icon" class="mr-2"></i>
            <p class="w-24 truncate">
                {{ label ? label : defaultLabel }}
            </p>
            <svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 10 6">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m1 1 4 4 4-4" />
            </svg>
        </button>

        <!-- Dropdown menu -->
        <div :id="'dropdown' + id" class="z-10 hidden bg-white rounded-lg overflow-hidden shadow-lg w-60">
            <slot></slot>
        </div>
</template>