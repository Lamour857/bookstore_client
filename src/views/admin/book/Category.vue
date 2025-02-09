<script setup>
import { ref } from 'vue'
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'
const categoryStore = useCategoryStore()
const categorylist = ref([])
// 添加分类对话框是否可见
const addCategoryDialogFormVisible = ref(false)
// 删除分类对话框是否可见
const deleteCategoryDialogVisible = ref(false)
// 目录详情对话框是否可见
const categoryDetailDrawerVisable = ref(false)
const addCategoryForm = ref({
    parentId: '',
    name: ''
})
const deleteCategoryInfo = ref({
    id: '',
    name: ''
})
const categoryInfo = ref(
    {
        name: '',
        createTime: '',
        updateTime: ''
    }
)
const addCategoryFormRef = ref(null)
const defaultProps = {
    children: 'children',
    name: 'name'
}
const rules = ref({
    name: [
        { required: true, message: '目录名称不能为空', trigger: 'blur' },
    ]
})
const showAddCategoryDialog = (data) => {
    addCategoryForm.value.parentId = data.id
    // 展示对话框以便输入添加的目录名称
    addCategoryDialogFormVisible.value = true
}
const showDeleteCategoryDialog = (data) => {
    deleteCategoryInfo.value.name = data.name
    deleteCategoryInfo.value.id = data.id
    // 展示对话框以便输入添加的目录名称
    deleteCategoryDialogVisible.value = true
}
const showCategoryInfoDrawer = (data) => {
    categoryInfo.value.name = data.name
    categoryInfo.value.createTime = data.createTime
    categoryInfo.value.updateTime = data.updateTime
    categoryDetailDrawerVisable.value = true
}
const hideAddCategoryDialog = () => {
    // 重置数据
    addCategoryForm.value.parentId = ''
    // 隐藏对话框
    addCategoryDialogFormVisible.value = false
}
const hideDeleteCategoryDialog = () => {
    // 重置数据
    deleteCategoryInfo.value.name = ''
    deleteCategoryInfo.value.id = ''
    // 隐藏对话框
    deleteCategoryDialogVisible.value = false
}
const hideCategoryInfoDrawer = () => {
    categoryInfo.value.name = ''
    categoryInfo.value.createTime = ''
    categoryInfo.value.updateTime = ''
    categoryDetailDrawerVisable.value = false
}
const addCategory = () => {
    if (!addCategoryFormRef.value) return
    addCategoryFormRef.value.validate(async (valid) => {
        if (valid) {
            // 表单验证通过后的逻辑
            await categoryStore.addCategory(addCategoryForm.value.parentId, addCategoryForm.value.name)
            console.log('增添分类')
            // 更新目录列表
            categorylist.value = categoryStore.categoryList
            hideAddCategoryDialog()
        } else {
            ElMessage({
                type: 'warning',
                message: '请输入目录名称',
            })
        }
    })
}
const deleteCategory = async () => {
    if (!deleteCategoryInfo.value) return
    console.log(deleteCategoryInfo.value)
    await categoryStore.deleteCategory(deleteCategoryInfo.value.id)
    console.log('删除分类: 分类名' + deleteCategoryInfo.value.name)
    // 更新目录列表
    categorylist.value = categoryStore.categoryList
    hideDeleteCategoryDialog()

}

onMounted(async () => {
    console.log("获取分类列表")
    await categoryStore.getCategoryList()
    categorylist.value = categoryStore.categoryList
    console.log(categorylist.value)
})
</script>
<template>
    <div>
        <div>
            <el-tree :data="categorylist" :props="defaultProps" node-key="id" :expand-on-click-node="false">
                <template #default="{ node, data }">
                    <span class="custom-tree-node">
                        <span>{{ data.name }}</span>
                        <span>
                            <el-button @click="showAddCategoryDialog(data)" type="primary" size="small" plain> 添加
                            </el-button>
                            <el-button style="margin-left: 5%;" @click="showCategoryInfoDrawer(data)" size="small"
                                type="info" plain>
                                详情</el-button>
                            <el-button style="margin-left: 5%;" @click="showDeleteCategoryDialog(data)" size="small"
                                type="warning" plain>
                                删除</el-button>
                        </span>
                    </span>
                </template>
            </el-tree>
        </div>

    </div>
    <!-- 分类详情抽屉 -->
    <el-drawer v-model="categoryDetailDrawerVisable" title="当前分类详细信息" direction="rtl" size="30%" border>
        <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item label="分类名称">{{ categoryInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{ categoryInfo.createTime }}</el-descriptions-item>
            <el-descriptions-item label="更新时间">{{ categoryInfo.updateTime }}</el-descriptions-item>
        </el-descriptions>
    </el-drawer>
    <!-- 添加分类对话框 -->
    <el-dialog v-model="addCategoryDialogFormVisible" title="添加分类" width="500">
        <el-form :model="addCategoryForm" ref="addCategoryFormRef" :rules="rules">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="addCategoryForm.name" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="hideAddCategoryDialog()">取消</el-button>
                <el-button type="primary" @click="addCategory()">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
    <!-- 删除分类对话框 -->
    <el-dialog v-model="deleteCategoryDialogVisible" title="删除分类" width="500">
        <el-text>是否删除当前选择的分类</el-text>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="hideDeleteCategoryDialog()">取消</el-button>
                <el-button type="danger" @click="deleteCategory()">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    height: fit-content;
    align-items: center;
    justify-content: space-between;
    padding-right: 10%;
}
</style>