import axios from 'axios';
import { useAuthStore } from '@/store/authStore';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Send HttpOnly cookies with every request
});

// We no longer need a request interceptor for tokens because HttpOnly cookies are sent automatically.


// Response interceptor for API calls
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh token
                // The /auth/refresh endpoint will set the new HttpOnly accessToken cookie.
                await api.post('/auth/refresh', {}, {
                    _retry: true // Mark as retry to prevent infinite loop just in case
                } as any);

                // Retry original request
                // The browser will automatically include the new accessToken cookie
                return api(originalRequest);

            } catch (refreshError) {
                // Refresh failed (token expired or invalid)
                useAuthStore.getState().logout();

                // Redirect to login if on client side
                if (typeof window !== 'undefined') {
                    // Avoid redirect loop if already on login
                    if (!window.location.pathname.startsWith('/portal/login')) {
                        window.location.href = '/portal/login';
                    }
                }
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
