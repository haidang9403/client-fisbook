import router from "@/router";
import convertObjectValues from "@/utils/convertObjectValues";
import { computed } from 'vue';
import Fuse from 'fuse.js';

const useFilter = (data) => {
    // Search 
    const key = computed(() => {
        const { key } = convertObjectValues(router.currentRoute.value.query)
        return (key || '').toString()
    })
    //Filter
    const filters = computed(() => {
        const { author, publisher, category } = convertObjectValues(router.currentRoute.value.query);
        return {
            author: author || [],
            publisher: publisher || [],
            category: category || []
        }
    });

    const fuseOptions = {
        // Mảng các thuộc tính bạn muốn tìm kiếm
        keys: ['title', 'category.title', 'author.fullname'],
        // Ngưỡng mờ (từ 0 đến 1, giá trị thấp hơn mang lại kết quả chính xác hơn)
        threshold: 0.3,
    };

    const fuse = new Fuse(data, fuseOptions);

    const searchData = computed(() => {
        // Nếu không có từ khóa, trả về dữ liệu ban đầu
        if (!key.value) {
            return data;
        }

        const searchResults = fuse.search(key.value);

        return searchResults.map(result => result.item);
    });

    const dataFilter = computed(() => {
        return searchData.value.filter((product) => {
            // Nếu đúng tất cả filter => true
            return Object.keys(filters.value).every((key) => {
                // Nếu không cần filter => true
                if (filters.value[key].length === 0) return true
                // Nếu có id tồn tại trong array => true
                return filters.value[key].some((id) => product[key]._id === id)
            })
        })
    });

    // Sort
    const sortFunctions = {
        newest: (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        oldest: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
        "price,down": (a, b) => b.price - a.price,
        "price,up": (a, b) => a.price - b.price,
        default: () => dataFilter.value
    };

    const sort = computed(() => router.currentRoute.value.query.sort || 'default');

    const dataSort = computed(() => dataFilter.value.sort(sortFunctions[sort.value]));


    return dataSort.value;
}

export default useFilter;