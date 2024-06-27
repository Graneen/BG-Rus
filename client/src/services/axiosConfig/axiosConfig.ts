import axios from "axios";
import { getCookie } from "../Cookie/getCookie";
import { AuthResponce } from "../checkAuthService/checkAuth.service";
import logout from "../checkAuthService/logout.service";

// export const API_URL = "http://localhost:3000"
const $api = axios.create({
    withCredentials: true,
    // baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

$api.interceptors.response.use((config) => {
    return config;
}, ( async (error) => {
    if (error.response.status === 401) {
        try {
            const originalRequest = error.config;
    
            const token: string = getCookie();
            const response = await axios.post<AuthResponce>("http://localhost:3000/auth/refresh", {
                refreshToken: token,
            }, {withCredentials: true});
            console.log({response});
            
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
            }
            return $api.request(originalRequest);
        } catch (error) {
            console.log({checkAuth: "Не авторизован", error});
        }
    }
    logout();
    throw error;
}));

export default $api;