<script setup>

defineProps({
    user: Object,
    size: {
        type: String,
        default: 'base'
    },
    image: String
})
</script>

<template>
    <img 
        class=" rounded-full object-cover object-center" 
        :src="image || user?.image || '/images/placeholder.jpg'" 
        alt=""
        :class="{
            'size-36': size === 'lg',
            'size-10': size === 'base',
            'size-6': size === 'sm',
        }"
    >
</template>