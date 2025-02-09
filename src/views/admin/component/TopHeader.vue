<script setup>
import { useUserInfoStore } from '@/stores/userInfo';
const userInfoStore = useUserInfoStore()

</script>

<template>
    <div class="top_header">
        <div>管理员：<strong>{{ userInfoStore.info.nickname }}</strong></div>
        <!-- 下拉菜单 -->
        <!-- command: 条目被点击后会触发,在事件函数上可以声明一个参数,接收条目对应的指令 -->
        <el-dropdown class="el-dropdown" placement="bottom-end" @command="handleCommand">
            <span class="el-dropdown__box">
                <el-avatar :src="userInfoStore.info.userPic ? userInfoStore.info.userPic : avatar" />
                <el-icon>
                    <CaretBottom />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="info" :icon="User">基本资料</el-dropdown-item>
                    <el-dropdown-item command="avatar" :icon="Crop">更换头像</el-dropdown-item>
                    <el-dropdown-item command="resetPassword" :icon="EditPen">重置密码</el-dropdown-item>
                    <el-dropdown-item command="logout" :icon="SwitchButton">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>

</template>
<style scoped lang="scss">
.top_header {
    width: 100%;
    display: flex;
    align-items: center;

    .el-dropdown {
        display: flex;
        left: 90%;

        .el-dropdown__box {
            display: flex;
            align-items: center;
            width: 100%;

            .el-icon {
                color: #999;
                margin-left: 10px;
            }

            &:active,
            &:focus {
                outline: none;
            }
        }

    }

}
</style>