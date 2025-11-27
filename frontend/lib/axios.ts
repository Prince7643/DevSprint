import axios from 'axios'
import { getSession } from 'next-auth/react'
export const axiosIntance=axios.create({
    baseURL:process.env.NEXT_PUBLIC_BACKEND_URL+"/api/v1",
    withCredentials:true
})

// Add request interceptor to include authentication
axiosIntance.interceptors.request.use(
    async (config) => {
        const session = await getSession()
        console.log('Session in axios interceptor:', session)
        if (session?.user?.id) {
            config.headers['user_id'] = session.user.id
            console.log('Setting X-User-ID header:', session.user.id)
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)