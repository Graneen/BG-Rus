import axios from "axios";
import { getCookie } from "../Cookie/getCookie";

export type AuthResponce = {
    userId: number,
    token: string
}

export async function checkAuth() {
    try {
        const token: string = getCookie();
        if (!token) throw Error(`ошибка рефреш токена token = "${token}"`)
        const response = await axios.post<AuthResponce>(`${import.meta.env.VITE_REACT_APP_API_URL}/auth/refresh`, {
            refreshToken: token,
        }, {withCredentials: true});

        if (response.status === 200) {
            localStorage.setItem('token', response.data.token);
        }
    } catch (error) {
        console.log({numberError: "21:02", fail: "with checkAuth.service.ts", error});
    }
}
