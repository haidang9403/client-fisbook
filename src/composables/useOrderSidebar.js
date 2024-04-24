import router from "@/router"
import { computed } from "vue"

const useOrderSidebar = () => {
    const query = computed(() => router.currentRoute.value.query.state || 'all')

    const routes = computed(() => [
        {
            path: '/profile/borrow',
            icon: 'fa-solid fa-user-pen',
            label: "Tất cả",
            active: 'all' === query.value
        },
        {
            path: '/profile/borrow?state=wait',
            icon: "fa-solid fa-user-lock",
            label: "Chờ duyệt",
            active: 'wait' === query.value
        },
        {
            path: '/profile/borrow?state=progress',
            icon: "fa-solid fa-boxes-stacked",
            label: "Đang mượn",
            active: 'progress' === query.value
        },
        {
            path: '/profile/borrow?state=finish',
            icon: "fa-solid fa-boxes-stacked",
            label: "Đã trả",
            active: 'finish' === query.value
        },
        {
            path: '/profile/borrow?state=refuse',
            icon: "fa-solid fa-boxes-stacked",
            label: "Từ chối",
            active: 'refuse' === query.value
        }
    ])

    return routes;
}

export default useOrderSidebar;