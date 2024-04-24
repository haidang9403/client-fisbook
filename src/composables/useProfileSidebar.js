import router from "@/router"
import { computed } from "vue"
import mainPath from "@/utils/mainPath"

const useProfileSidebar = () => {

    const routes = computed(() => [
        {
            path: '/profile',
            icon: 'fa-solid fa-user-pen',
            label: "Thông tin tài khoản",
            active: '/profile' === router.currentRoute.value.path
        },
        {
            path: '/profile/change-password',
            icon: "fa-solid fa-user-lock",
            label: "Thay đổi mật khẩu",
            active: '/profile/change-password' === router.currentRoute.value.path
        },
        {
            path: '/profile/borrow',
            icon: "fa-solid fa-boxes-stacked",
            label: "Đơn mượn",
            active: '/profile/borrow' === router.currentRoute.value.path
        },
    ])

    return routes;
}

export default useProfileSidebar;