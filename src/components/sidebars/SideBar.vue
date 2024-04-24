<script setup>
import SidebarItem from "@/components/sidebars/SidebarItem.vue";

defineProps({
    layout: {
        type: String,
        default: 'x'
    },
    routes: Array,
})


</script>

<template>
    <div v-if="layout === 'x'" class="border-b border-gray-200">
        <div class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
            <SidebarItem 
                v-for="route in routes" 
                :key="routes.path"
                :label="route.label"
                :icon="route.icon"
                :active="route.active"
                :path="route.path"
                :layout="layout"
            />
        </div>
    </div>
    <div v-if="layout === 'y'" class="flex flex-col items-center gap-2">
            <SidebarItem 
                v-for="route in routes" 
                :key="routes.path"
                :label="route.label"
                :icon="route.icon"
                :active="route.active"
                :path="route.path"
                :layout="layout"
            />
    </div>
</template>