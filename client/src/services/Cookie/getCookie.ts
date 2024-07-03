export function getCookie(): string {
    let refreshToken: string = '';
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = cookie.substring(0, eqPos);
        
        if (name === "refresh_token") {
            refreshToken = cookie.substring(eqPos + 1, cookie.length);
        }
    });
    return refreshToken;
}