<script setup>
import { RouterView } from 'vue-router';

import AsideMenu from './component/AsideMenu.vue';
import TopHeader from './component/TopHeader.vue';

</script>
<template>
    <div class="common-layout">
        <el-container class="admin-container">
            <el-aside width="200px">
                <AsideMenu />
            </el-aside>
            <el-container>
                <el-header class="breadcrumb-container">
                    <TopHeader />
                </el-header>
                <el-main>
                    <RouterView />
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<style scoped lang="scss">
.admin-container {
    height: 100%;

    .el-container {
        display: flex;
        flex-direction: column;

        .el-main {
            flex: 1;
            padding: 0;
            /* 移除内边距 */
        }
    }

    .breadcrumb-container {
        width: 100%;
        display: flex;
        align-items: center;
        /* 垂直居中 */
    }
}
</style>