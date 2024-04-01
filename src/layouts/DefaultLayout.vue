<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Sidebar from "@/components/sidebars/SideBar.vue"
</script>

<template>
    <Header />
    <div class="w-full bg-white mt-[90px]">
        <div class="container mx-auto md:px-12">
            <div class="flex">
                <Sidebar/>
            </div>
            <slot></slot>
        </div>
    </div>
    <Footer/>
</template>