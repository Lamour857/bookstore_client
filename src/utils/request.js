import axios from 'axios'
import { useTokenStore } from '@/stores/token'
const httpInstance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

httpInstance.interceptors.request.use(config => {
    // 添加token
    const tokenStore = useTokenStore()
    if (tokenStore.token) {
        config.headers.Authorization = tokenStore.token
    }
    return config
}, e => Promise.reject(e))

httpInstance.interceptors.response.use(
    res => {
        // 统一错误提示
        if (res.status !== 200) {  // 程序报错
            ElMessage({ type: 'error', message: res.data.msg });
        } else {
            if (res.data.status.code !== 0) {  // 逻辑性错误
                ElMessage({ type: 'warning', message: res.data.status.msg });
                return Promise.reject(res)
            } else {
                return res
            }
        }
    },
    err => {
        //判断响应状态码,如果为401,则证明未登录,提示请登录,并跳转到登录页面
        const tokenStore = useTokenStore()
        if (err.response.status === 401) {
            ElMessage.error('请先登录')
            tokenStore.removeToken()
            router.push('/login')
        } else {
            ElMessage.error('服务异常')
        }

        return Promise.reject(err);//异步的状态转化成失败的状态
    })

export default httpInstance;