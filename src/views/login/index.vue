<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form">
            <RouterView />
        </el-col>
    </el-row>

</template>
<style lang="scss" scoped>
/* 样式 */
.login-page {
    position: absolute;
    height: 100vh;
    background-color: #fff;
    width: 100vw;
    top: 0;
    left: 0;

    .bg {
        background: url('@/assets/login/logo.png') no-repeat 80% center / 240px auto,
            url('@/assets/login/login_bg.jpg') no-repeat center / cover;
        border-radius: 0 20px 20px 0;
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
}
</style>