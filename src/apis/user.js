import request from '@/utils/request'

export const loginByPwdAPI = (iphone, ipassword) => {
    return request({
        url: '/auth/password',
        method: 'POST',
        params: {
            phone: iphone,
            password: ipassword
        }
    })
}
export const loginByVerifyCodeAPI = (iphone, iverifyCode) => {
    return request({
        url: '/auth/verifyCode',
        method: 'POST',
        params: {
            phone: iphone,
            verifyCode: iverifyCode
        }
    })
}
export const getLoginCode = (iphone) => {
    return request({
        url: '/public/verifyCode/login',
        method: 'POST',
        params: {
            phone: iphone
        }
    })
}
export const getRegisterCode = (iphone) => {
    return request({
        url: '/public/verifyCode/register',
        method: 'POST',
        params: {
            phone: iphone
        }
    })
}

export const registerByPhoneAPI = ({ phone, verifyCode, username, password }) => {
    return request({
        url: '/public/register/phone',
        method: 'POST',
        data: {
            phone,
            verifyCode,
            username,
            password
        }
    })
}