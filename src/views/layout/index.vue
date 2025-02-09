<script setup>
import LayoutNav from './component/LayoutNav.vue';
import LayoutCarousel from './component/LayoutCarousel.vue';
import LayoutAsideCategory from './component/LayoutAsideCategory.vue';


</script>

<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <LayoutNav />
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <LayoutAsideCategory />
                </el-aside>
                <el-container>
                    <el-main>
                        <LayoutCarousel />
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
<style scoped lang="scss"></style>