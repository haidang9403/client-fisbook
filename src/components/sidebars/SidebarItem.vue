<script setup>
defineProps({
    icon: String,
    label: String,
    path: String,
    active: Boolean
})

</script>

<template>
    <router-link :to="path" class="me-2">
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
</template>