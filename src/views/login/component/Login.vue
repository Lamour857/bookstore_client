<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage, ElLink } from 'element-plus'
import { useRouter } from 'vue-router'
import { Lock, Check, Cellphone, ArrowRightBold } from '@element-plus/icons-vue'
import { useTokenStore } from '@/stores/token'
import { getLoginCode } from '@/apis/user'

// pinia存储
const router = useRouter()
const tokenStore = useTokenStore()
// 登录角色
const loginRole = ref()

// 登录类型
const loginType = ref('password')
const loginTypeInfo = ref('手机验证码登录')
const phonePattern = /^1[3-9]\d{9}$/;
// 倒计时
const isCounting = ref(false)
const countDown = ref(60)

// 表单对象
const form = ref({
    phone: '',
    password: '',
    verifyCode: ''
})
// 规则对象
const rules = ref({
    phone: [
        { required: true, message: '手机号不能为空', trigger: 'blur' },
        { pattern: phonePattern, message: '请输入正确的手机号', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
    ],
    verifyCode: [
        { required: false, message: '验证码不能为空', trigger: 'blur' },
        { min: 6, max: 6, message: '请输入6位验证码', trigger: 'blur' }
    ]
})
// 表单实例
const formRef = ref(null)

const getVerificationCode = async () => {
    console.log(formRef.value.validateField('phone'))
    await formRef.value.validateField('phone').then(() => {
        if (isCounting.value) return;
        getLoginCode(form.value.phone)
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

const changeLoginType = () => {

    if (loginType.value === 'password') {
        // 切换为验证码登录
        loginType.value = 'verifyCode'
        loginTypeInfo.value = '手机密码登录'
        // 更改验证规则
        rules.value.password[0].required = false
        rules.value.verifyCode[0].required = true
    } else if (loginType.value === 'verifyCode') {
        // 切换为密码登录
        loginType.value = 'password'
        loginTypeInfo.value = '手机验证码登录'
        // 更改验证规则
        rules.value.password[0].required = true
        rules.value.verifyCode[0].required = false
    }
    console.log('改变登录方式为' + loginType.value)
    console.log(rules.value)

}
onMounted(() => {
    let fullPath = router.currentRoute.value.fullPath
    let parts = fullPath.split('/');
    loginRole.value = parts[parts.length - 1];
    //console.log(loginRole.value)
})

const doLogin = async () => {
    const { phone, password, verifyCode } = form.value
    formRef.value.validate(async (valid) => {
        if (valid) {
            // 用户登录
            // 获取token
            if (loginType.value === 'password') {
                await tokenStore.userLoginByPwd(phone, password)
            } else if (loginType.value === 'verifyCode') {
                await tokenStore.userLoginByVerifyCode(phone, verifyCode)
            }
            console.log(tokenStore.token)
            if (tokenStore.token) {
                if (loginRole.value === 'admin') {
                    router.replace({ path: "/admin" })
                } else {
                    router.replace({ path: "/" })
                }

            }

        }
    })
}
</script>
<template>
    <div class="form">
        <el-form ref="formRef" size="large" :model="form" autocomplete="off" :rules="rules">
            <el-form-item>
                <div class="flex">
                    <!-- 普通用户登录 -->
                    <h1 v-if="loginRole === 'login'">登录</h1>
                    <!-- 管理员登录 -->
                    <h1 v-if="loginRole === 'admin'">管理员登录</h1>
                    <el-link type="info" :underline="false" @click='changeLoginType'>
                        {{ loginTypeInfo }}
                    </el-link>
                </div>
            </el-form-item>
            <el-form-item prop="phone">
                <el-input :prefix-icon="Cellphone" placeholder="请输入手机号" v-model="form.phone"></el-input>
            </el-form-item>
            <!-- 密码登录 -->
            <el-form-item v-if="loginType === 'password'" prop="password">
                <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                    v-model="form.password"></el-input>
            </el-form-item>
            <!-- 验证码登录 -->
            <el-form-item v-if="loginType === 'verifyCode'" prop="verifyCode">
                <el-row type="flex">
                    <el-input name="verifyCode" :prefix-icon="Check" placeholder="请输入验证码" v-model="form.verifyCode"
                        width="40%"></el-input>
                </el-row>
                <el-row type="flex" justify="end">
                    <el-button type="primary" @click="getVerificationCode" :disabled="isCounting">
                        {{ isCounting ? countDown + '秒后重试' : '获取验证码' }}</el-button>
                </el-row>
            </el-form-item>
            <!-- <el-form-item class="flex">
                <div class="flex">
                    <el-checkbox>记住我</el-checkbox>
                    <el-link type="primary" :underline="false">忘记密码？</el-link>
                </div>
            </el-form-item> -->
            <!-- 登录按钮 -->
            <el-form-item>
                <el-button class="button" type="primary" auto-insert-space @click="doLogin">登录</el-button>
            </el-form-item>
            <el-form-item class="flex" v-if="loginRole === 'login'">

                <div>
                    <el-link class="link" type="info" :underline="false" @click="router.push('/login/register')">
                        注册
                        <el-icon>
                            <ArrowRightBold />
                        </el-icon>
                    </el-link>
                </div>

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