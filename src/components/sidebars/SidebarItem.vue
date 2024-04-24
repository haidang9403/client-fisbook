<script setup>
defineProps({
    icon: String,
    label: String,
    path: String,
    active: Boolean,
    layout: {
        type: String,
        default: 'x'
    }
})

</script>

<template>
    <router-link v-if="layout === 'x'" :to="path" class="me-2">
        <div 
            class="inline-flex gap-2 items-center justify-center p-4 border-b-2 rounded-t-lg group"
            :class="{
                'text-blue-600 border-blue-600': active,
                'border-transparent hover:text-gray-600 hover:border-gray-300': !active
            }"
        >
            <i :class="icon"></i>
            {{  label }}
        </div>
    </router-link>
    <router-link v-if="layout === 'y'" :to="path" class="w-full">
        <div 
            class="flex items-center h-12 w-full font-bold  rounded-lg pl-4 py-8 gap-4"
            :class="{
                'hover:border-gray-300 hover:bg-gray-200' : !active,
                'text-white bg-blue-600': active
            }"
        >
            <i :class="icon"></i>
            {{  label }}
        </div>
    </router-link>
</template>