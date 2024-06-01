import { AxiosError, isAxiosError } from 'axios';

export default function axiosErrorFormatter(e: any): string {
    if (isAxiosError(e)) {
        if (e.response?.data) {
            let rd = e.response.data as { error: string };
            return rd.error;
        } else {
            return e.message;
        }
    } else {
        return 'An unexpected error occurred';
    }
}