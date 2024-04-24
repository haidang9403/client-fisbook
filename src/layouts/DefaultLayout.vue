<script setup>
import Header from "@/components/Header.vue"
import Footer from "@/components/Footer.vue"
import Sidebar from "@/components/sidebars/SideBar.vue"
import Redirection from "@/components/Redirection.vue";
import useMainSidebar from "@/composables/useMainSidebar";
import { useRouter } from "vue-router";
import { computed } from "vue";
import mainPath from "@/utils/mainPath";

const router = useRouter();
const routes = useMainSidebar();
const isShowSidebar = computed( () => {
    const path = mainPath(router.currentRoute.value.path)
    return !(path === '/borrow' || path === '/profile') 
});

const returnRoute = () => {
    const path = mainPath(router.currentRoute.value.path)
    if(path == '/profile'){
        router.push("/")
    } else
        router.back()
}

</script>

<template>
    <div class="bg-slate-50">
        <Header />
        <div class="w-full mt-[90px] min-h-[630px]">
            <div class="container mx-auto md:px-12">
                <div class="flex">
                    <Sidebar v-if="isShowSidebar" :routes="routes" />
                    <div v-else class="my-4">
                        <Redirection  left label="Trở về" :on-click="returnRoute"/>
                    </div>
                </div>
                <slot></slot>
            </div>
        </div>
        <Footer />
    </div>
</template>