<template>
    <div v-for="(categoryItem, index) in props.categoryPlate">
        <template v-if="props.categoryPlate == null"></template>
        <template v-else-if="props.categoryPlate.length === 1">
            <el-link href="https://element-plus.org" target="_blank">
                {{ categoryItem.name }}
            </el-link>
        </template>
        <template v-else-if="index === 0 && props.categoryPlate.length !== 1">
            <el-link href="https://element-plus.org" target="_blank">
                {{ categoryItem.name }} |
            </el-link>
        </template>
        <template v-else-if="index === props.categoryPlate.length - 1">
            <el-link href="https://element-plus.org" target="_blank">
                | {{ categoryItem.name }}
            </el-link>
        </template>
        <template v-else>
            <el-link href="https://element-plus.org" target="_blank">
                | {{ categoryItem.name }} |
            </el-link>
        </template>


    </div>

</template>
<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    categoryPlate: Array
})
</script>