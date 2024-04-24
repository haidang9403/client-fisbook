<script setup>

defineProps({
    src: String,
    alt:  String,
    size: {
        type: String,
        default: 'base'
    }
})

</script>

<template>
    <img 
        :src="src" 
        :alt="alt" 
        class="h-[200px] w-32 object-cover rounded-lg border hover:scale-105 transition"
        :class="{
            'h-[175px] w-28': size == 'sm',
            'h-[200px] w-32': size === 'base',
            'w-64 h-[400px]': size === 'lg',
            'w-48 h-[300px]': size === 'md'
        }"
    >
</template>