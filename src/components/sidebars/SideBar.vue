<script setup>
import useMainSidebar from "@/composables/useMainSidebar";
import SidebarItem from "@/components/sidebars/SidebarItem.vue";

const routes = useMainSidebar();


</script>

<template>
    <div class="border-b border-gray-200">
        <div class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500">
            <SidebarItem 
                v-for="route in routes" 
                :key="routes.path"
                :label="route.label"
                :icon="route.icon"
                :active="route.active"
                :path="route.path"
            />
        </div>
    </div>
</template>