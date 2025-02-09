<script setup>
import { ref } from 'vue';
import LayoutCategoryPlate from './LayoutCategoryPlate.vue';

// 触发获取导航列表的action
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => {
    console.log("获取分类菜单")
    categoryStore.getAsideCategoryMenu()
})

// 当前激活的菜单项索引
const activeIndex = ref('0');

// 菜单项点击事件处理函数
const handleSelect = (index) => {
    console.log('Selected item:', index);
};
;
</script>
<template>
    <div class="category-list">
        <el-menu :default-active="activeIndex" mode="vertical" @select="handleSelect">
            <el-menu-item v-for="category in categoryStore.CategoryMenu" :key="category.id"
                :index="category.id.toString()">
                <LayoutCategoryPlate :categoryPlate="category.children" />
            </el-menu-item>
        </el-menu>
    </div>
</template>
