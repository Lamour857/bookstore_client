<script setup>
import { ref } from 'vue'

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">登录/注册</el-menu-item>
        <el-sub-menu index="2">
            <template #title>个人信息</template>
            <el-menu-item index="2-1">item one</el-menu-item>
            <el-menu-item index="2-2">item two</el-menu-item>
            <el-menu-item index="2-3">item three</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">我的订单</el-menu-item>
        <el-menu-item index="4">购物车</el-menu-item>
        <el-menu-item index="5">我的收藏</el-menu-item>
    </el-menu>
</template>

<style scoped lang="scss"></style>