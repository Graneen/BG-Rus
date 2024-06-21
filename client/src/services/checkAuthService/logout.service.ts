import { getCookie } from '../Cookie/getCookie.ts';
import { deleteAllCookies } from '../Cookie/deleteCookie.ts';

export async function logout(): Promise<void> {
    try {
        const token: string = getCookie();
        const response = await fetch('http://localhost:3000/auth/logout', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ token }),
        })
        console.log(response.status)
        if (response.ok) {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            // setUser(null);

            deleteAllCookies();
        } else {
            console.log("error");
        }
    } catch (error) {
        console.log({ ERRRRROR: error });
    }
}