import router from "@/router"
import { computed } from "vue"
import mainPath from "@/utils/mainPath"

const useMainSidebar = () => {

    const routes = computed(() => [
        {
            path: '/',
            icon: 'fa-solid fa-house',
            label: "Trang chủ",
            active: '/' === mainPath(router.currentRoute.value.path)
        },
        {
            path: '/product',
            icon: "fa-solid fa-book",
            label: "Sách",
            active: '/product' === mainPath(router.currentRoute.value.path)
        }
    ])

    return routes;
}

export default useMainSidebar;