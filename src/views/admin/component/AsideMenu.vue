<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>
<template>
    <div class="aside-menu">
        <el-menu text-color="#fff" default-active="/admin/home" active-text-color="#ffd04b" background-color="#232323"
            @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="/admin">首页</el-menu-item>
            <el-sub-menu>
                <template #title>
                    <span>商品管理</span>
                </template>
                <el-menu-item index="/admin/book/add">添加书籍</el-menu-item>
                <el-menu-item index="/admin/book">管理未售书籍</el-menu-item>
                <el-menu-item index="/admin/book/recommend">管理推荐书籍</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/admin/category">
                <template #title>
                    <span>分类管理</span>
                </template>
            </el-menu-item>
            <el-sub-menu index="/admin/order">
                <template #title>
                    <span>订单管理</span>
                </template>
                <el-menu-item index="/admin/order">订单管理</el-menu-item>
                <el-menu-item index="/admin/order/statistic">数据统计</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/admin/user">
                <template #title>
                    <span>用户管理</span>
                </template>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<style scoped lang="scss">
.aside-menu {
    height: 100%;

    .el-menu {
        height: 100%;
    }
}
</style>