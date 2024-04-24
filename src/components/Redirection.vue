<script setup>
defineProps({
    left: Boolean,
    right: Boolean,
    onClick: Function,
    label: String,
})
</script>

<template>
    <div class="flex cursor-pointer items-center gap-2 hover:text-blue-600 truncate" 
        @click="onClick"
    >
        <div v-if="left" class=" size-10 rounded-full grid place-content-center cursor-pointer text-lg">
            <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div class=" font-semibold">{{  label }}</div>
        <div v-if="right" class=" size-10 rounded-full grid place-content-center cursor-pointer text-lg">
            <i class="fa-solid fa-chevron-right"></i>
        </div>
    </div>
</template>