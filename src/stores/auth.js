import { defineStore } from "pinia";
import { computed, ref, watch } from 'vue';
import { computedAsync } from '@vueuse/core'
import { useAlert } from "./alert";
import authService from "@/services/auth.service";

export const useAuth = defineStore('auth', () => {
    const user = ref(null);

    const errors = ref([]);

    const isLogin = computedAsync(
        async () => {
            return await authService.getRefeshToken(user.value) && !!user.value;
        },
        !!user.value
    );

    const getLogin = async () => {
        return await authService.getRefeshToken(user.value) && !!user.value
    }

    const accessToken = computed(() => user.value?.accessToken);

    const commit = (action, payload) => {
        switch (action) {
            case 'LOGIN_SUCCESS':
                user.value = payload;
                errors.value = [];
                break;
            case 'LOGIN_FAILURE':
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

    async function changePassword(credentials) {
        try {
            const data = await authService.changePassword(user.value._id, credentials)
            commit('LOGIN_SUCCESS', data);
            return true
        } catch (error) {
            commit('LOGIN_FAILURE', error?.response?.data)
            return false
        }
    }

    async function register(credentials) {
        try {
            const data = await authService.register(credentials);
            commit('LOGIN_SUCCESS', data);
            return data;
        } catch (error) {
            if (error?.response?.data.message) {
                const { showAlertMessage } = useAlert();
                showAlertMessage('danger', "Có lỗi xảy ra")
            }
            commit('LOGIN_FAILURE', error?.response?.data)
        }
    }

    async function logout() {
        try {
            await authService.logout();
            commit('LOGOUT');
            return true
        } catch (error) {
            console.log(error)
        }
    }

    return {
        user,
        errors,
        isLogin,
        accessToken,
        login,
        register,
        logout,
        clearError,
        commit,
        getLogin,
        changePassword
    }
}, {
    persist: {
        paths: ['user']
    }
});
