import router from "@/router";
import { computed } from 'vue';

const useSort = (data) => {
    const sortFunctions = {
        newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        "price,down": (a, b) => b.price - a.price,
        "price,up": (a, b) => a.price - b.price,
        default: () => data
    };

    const sort = computed(() => router.currentRoute.value.query.sort || 'default');

    const dataSort = computed(() => data.sort(sortFunctions[sort.value]));

    return dataSort.value;
}

export default useSort;