<script setup>
import { Search } from '@element-plus/icons-vue'

</script>
<template>
    <div class="block text-center">
        <el-input v-model="input1" style="width: 240px" size="large" placeholder="Please Input" :prefix-icon="Search" />
        <el-button size="large" type="primary">搜索</el-button>
        <td class="line"></td>
        <el-carousel height="150px">
            <el-carousel-item v-for="item in 4" :key="item">
                <h3 class="small justify-center" text="2xl">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<style scoped>
.demonstration {
    color: var(--el-text-color-secondary);
}

.line {
    width: 70%;
}

.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>