import axiosErrorFormatter from "@/lib/axiosErrorFormattor";
import fetcher from "@/lib/fetcher";

type FormReturn = {
    error: boolean;
    message: string;
}
export async function createUser(payload: any): Promise<FormReturn> {

    try {
        const { data } = await fetcher.post("/users", {...payload, role: "USER"});
        return {
            error: false,
            message: data.message
        }
    } catch (error) {
        const e = axiosErrorFormatter(error);
        return {
            error: false,
            message: e
        }
    }
}


export async function createSeller(payload: any): Promise<FormReturn> {

    try {
        const { data } = await fetcher.post("/users", {...payload, role: "SELLER"});
        return {
            error: false,
            message: data.message
        }
    } catch (error) {
        const e = axiosErrorFormatter(error);
        return {
            error: false,
            message: e
        }
    }
}

export async function sendEmailOtp(payload: any): Promise<FormReturn> {

    try {
        const { data } = await fetcher.post("/auth/otp", {...payload});
        return {
            error: false,
            message: data.message
        }
    } catch (error) {
        const e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e
        }
    }
}

export async function verifyEmailOtp(payload: any): Promise<FormReturn> {

    try {
        const { data } = await fetcher.post("/auth/verify", {...payload});
        return {
            error: false,
            message: data.message
        }
    } catch (error) {
        const e = axiosErrorFormatter(error);
        return {
            error: true,
            message: e
        }
    }
}