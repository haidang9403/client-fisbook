<script setup>
import { initAccordions } from 'flowbite';
import { onMounted } from 'vue';

onMounted(() => {
    initAccordions();
})
</script>

<template>
    <div id="accordion-arrow-icon" data-accordion="open">
        <slot></slot>
    </div>
</template>