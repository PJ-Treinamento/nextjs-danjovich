import axios from "axios";
import { parseCookies } from "nookies";

export const getApiClient = (ctx?: any) => {
    const { 'piupiuwer.token': token } = parseCookies(ctx);

    const api = axios.create({
        baseURL: 'https://piupiuwer.polijrinternal.com',
    });

    if (token) {
        api.defaults.headers.authorization = `Bearer ${token}`;
    }

    return api;
}