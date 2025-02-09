import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getCategoryListAPI, addCategoryAPI, deleteCategoryAPI } from '@/apis/category'

export const useCategoryStore = defineStore('category', () => {

    const categoryList = ref([])
    const getCategoryList = async () => {
        const res = await getCategoryListAPI()
        categoryList.value = res.data.result
    }
    const addCategory = async (parentId, name) => {
        const res = await addCategoryAPI(parentId, name)
        categoryList.value = res.data.result
    }
    const deleteCategory = async (id) => {
        const res = await deleteCategoryAPI(id)
        categoryList.value = res.data.result
    }

    return {
        categoryList,
        getCategoryList,
        addCategory,
        deleteCategory
    }
},
    {
        persist: true,
    })