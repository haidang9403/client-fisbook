import { defineStore } from "pinia";
import { ref } from 'vue';

export const useLoading = defineStore('loading', () => {
    const show = ref(false);

    function showLoading() {
        show.value = true
        hideAfterDelay();
    }

    function dismissLoading() {
        show.value = false;
    }

    const hideAfterDelay = () => {
        setTimeout(() => {
            dismissLoading();
        }, 500); // 0.5s
    };


    return {
        show,
        showLoading,
        dismissLoading,
    };
})