import axios from "axios";
import { API_BASE, PUBLIC_API_BASE } from "@/app/constants";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/authOptions";

const fetcher = axios.create({
    baseURL: PUBLIC_API_BASE
});

export async function authFetcher() {
    const session = await getServerSession(authOptions);
    return axios.create({
        baseURL: API_BASE,
        headers: {
            Authorization: `Bearer ${session?.user.token}`
        }
    });
}

export default fetcher;