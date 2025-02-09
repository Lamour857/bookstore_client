<script setup>
import { ref } from 'vue'
// import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { User, Lock, Check, Cellphone, ArrowLeft, ArrowLeftBold } from '@element-plus/icons-vue'
import { getRegisterCode, registerByPhoneAPI } from '@/apis/user'

const router = useRouter()
const phonePattern = /^1[3-9]\d{9}$/;
// 倒计时
const countDown = ref(60)
const isCounting = ref(false)
const getVerificationCode = async () => {
    await formRef.value.validateField('phone').then(() => {
        if (isCounting.value) return;
        getRegisterCode(form.value.phone)
        console.log('获取验证码')
        isCounting.value = true
        let timer = setInterval(() => {
            if (countDown.value > 0) {
                countDown.value--;
            } else {
                clearInterval(timer)
                isCounting.value = false;
                countDown.value = 60;
            }
        }, 1000)
    }).catch((error) => {
        ElMessage({
            type: 'warning',
            message: '手机号错误',
        })
    })
}

// 表单对象
const form = ref({
    phone: '',
    username: '',
    password: '',
    verifyCode: ''
})
// 规则对象
const rules = ref({
    phone: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { pattern: phonePattern, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    username: [
        { required: true, message: '用户名不能为空', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    verifyCode: [
        { required: true, message: '验证码不能为空', trigger: 'blur' },
        { min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur' }
    ]
})
// 表单实例
const formRef = ref(null)
const doRegisterByPhone = async () => {
    const { phone, username, verifyCode, password } = form.value
    formRef.value.validate(async (valid) => {
        if (valid) {
            // 登陆成功
            const res = await registerByPhoneAPI({ phone, username, password, verifyCode })
            ElMessage({ type: 'success', message: '注册成功' })
            router.replace({ path: '/login' })
        }
    })
}
</script>
<template>
    <div class="form">
        <el-form ref="formRef" size="large" :model="form" autocomplete="off" :rules="rules">
            <el-form-item>
                <div class="flex">
                    <h1>注册</h1>
                </div>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input :prefix-icon="Cellphone" placeholder="请输入手机号" v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item prop="username">
                <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item prop="verifyCode">
                <el-row type="flex">
                    <el-input name="verifyCode" :prefix-icon="Check" placeholder="请输入验证码" v-model="form.verifyCode"
                        width="40%"></el-input>
                </el-row>
                <el-row type="flex" justify="end">
                    <el-button type="primary" @click="getVerificationCode" :disabled="isCounting">
                        {{ isCounting ? countDown + '秒后重试' : '获取验证码' }}</el-button>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button class="button" type="primary" auto-insert-space @click="doRegisterByPhone">注册</el-button>
            </el-form-item>
            <el-form-item class="flex">
                <el-link type="info" :underline="false" @click="router.push('/login')">
                    <el-icon>
                        <ArrowLeftBold />
                    </el-icon>登录
                </el-link>
            </el-form-item>
        </el-form>
    </div>


</template>
<style scoped lang="scss">
.common-layout {
    width: 100vw;
    top: 0;
    left: 0;
}

.form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
        margin: 0 auto;
    }

    .button {
        width: 100%;
    }

    .flex {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }
}
</style>