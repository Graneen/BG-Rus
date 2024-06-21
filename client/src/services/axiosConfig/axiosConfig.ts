import axios, { AxiosRequestConfig, AxiosResponse } from "axios"
import { getCookie } from "../Cookie/getCookie";
import { AuthResponce } from "../checkAuthService/checkAuth.service";
import { logout } from "../checkAuthService/logout.service";

type checkErrorType = {
    firstLine: boolean
}

const checkError: checkErrorType = {
    firstLine: true
};

// export const API_URL = "http://localhost:3000"
const $api = axios.create({
    withCredentials: true,
    // baseURL: API_URL,
});

//? типизация config: AxiosRequestConfig
$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

//? типизация config: AxiosResponse
$api.interceptors.response.use((config) => {
    return config;
}, ( async (error) => {
    if (error.response.status === 401 && checkError.firstLine) {
        try {
            checkError.firstLine = false;

            const originalRequest = error.config;
    
            const token: string = getCookie();
            const response = await axios.post<AuthResponce>("http://localhost:3000/auth/refresh", {
                refreshToken: token,
            }, {withCredentials: true});
    
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
            }
            return $api.request(originalRequest);
        } catch (error) {
            console.log({checkAuth: "Не авторизован", error});
            checkError.firstLine = false;
        }
    } else if (checkError.firstLine === false) {
        checkError.firstLine = true;
        logout(); //! из контекста setUser(null) не отрабатывает
        return window.location.replace("/login");
    }
    throw error;
}));

export default $api;