import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/stores/auth";
import { storeToRefs } from "pinia";

import authService from './auth.service';

export default (baseURL, header) => {


    const axiosJWT = axios.create({
        baseURL,
        headers: {
            ...header
        }
    });

    axiosJWT.interceptors.request.use(async (config) => {
        const auth = useAuth();
        const { user, accessToken } = storeToRefs(auth);
        const { commit } = auth;
        config.headers['authorization'] = 'Bearer ' + accessToken.value;

        let date = new Date();
        const decodedToken = jwtDecode(accessToken.value);

        if (decodedToken.exp < (date.getTime() / 1000)) {
            const data = await authService.refreshToken();

            const refreshUser = {
                ...user.value,
                accessToken: data.accessToken
            };

            commit('LOGIN_SUCCESS', refreshUser);
            config.headers['authorization'] = "Bearer " + data.accessToken;
        }

        return config;
    })

    return axiosJWT;
};

