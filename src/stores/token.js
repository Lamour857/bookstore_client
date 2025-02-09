import { defineStore } from "pinia";
import { ref } from 'vue'
import { loginByPwdAPI, loginByVerifyCodeAPI } from "@/apis/user";

export const useTokenStore = defineStore('token', () => {
    const token = ref('')

    const clearToken = () => {
        token.value = ''
    }
    const userLoginByPwd = async (phone, password) => {
        const res = await loginByPwdAPI(phone, password);
        // 返回结果
        token.value = res.data.result

    }
    const userLoginByVerifyCode = async (phone, verifyCode) => {
        const res = await loginByVerifyCodeAPI(phone, verifyCode);
        // 返回结果
        token.value = res.data.result
    }
    return {
        token,
        userLoginByPwd,
        clearToken,
        userLoginByVerifyCode,
    }

},
    {
        persist: true,
    })
