import { defineStore } from "pinia";
import { ref } from 'vue'

export const useUserInfoStore = defineStore('user', () => {
    const info = ref({})

    const clearUserInfo = () => {
        userInfo.value = {}
    }
    const getUserInfo = async (token) => {

    }
    return {
        info,
        getUserInfo,
        clearUserInfo
    }

},
    {
        persist: true,
    })
