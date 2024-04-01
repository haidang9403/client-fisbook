<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    title: String,
    list: Array,
})
</script>

<template>
    <div>
        <h2 class="mb-6 text-sm font-semibold uppercase text-white">
            {{  title }}
        </h2>
        <ul class="text-gray-400 text-sm font-medium">
            <li v-for="(item, index) in list" :key="index" class="mb-4">
                <router-link :to="item.path" class="hover:underline">{{  item.label }}</router-link>
            </li>
        </ul>
    </div>
</template>