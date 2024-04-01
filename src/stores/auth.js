import { defineStore } from "pinia";
import { computed, ref } from 'vue';
import authService from "@/services/auth.service";

export const useAuth = defineStore('auth', () => {
    const user = ref(null);

    const errors = ref([]);
    const isLogin = computed(() => !!user);
    const accessToken = computed(() => user?.accessToken);

    const commit = (action, payload) => {
        switch (action) {
            case 'LOGIN_SUCCESS':
                user.value = payload;
                errors.value = [];
                break;
            case 'LOGIN_FAILURE':
                user.value = null;
                errors.value = payload;
                break;
            case 'LOGOUT':
                user.value = null;
                errors.value = [];
                break;
            case 'CLEAR_ERROR':
                errors.value = [];
                break;
        }
    }

    function clearError() {
        commit('CLEAR_ERROR')
    }

    async function login(credentials) {
        try {
            const data = await authService.login(credentials);
            commit('LOGIN_SUCCESS', data);
            return data;
        } catch (error) {
            commit('LOGIN_FAILURE', error?.response?.data)
        }
    }

    async function register(credentials) {
        try {
            const data = await authService.register(credentials);
            commit('LOGIN_SUCCESS', data);
            return data;
        } catch (error) {
            commit('LOGIN_FAILURE', error?.response?.data)
        }
    }

    return { user, errors, isLogin, accessToken, login, register, clearError }
}, {
    persist: {
        paths: ['user']
    }
});
