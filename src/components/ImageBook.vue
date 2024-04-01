<script setup>

defineProps({
    src: String,
    alt:  String,
})

</script>

<template>
    <img :src="src" :alt="alt" class="h-[200px] w-32 object-cover rounded-lg border hover:scale-105 transition">
</template>