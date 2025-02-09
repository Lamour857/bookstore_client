import request from '@/utils/request';


export const getCategoryListAPI = () => {
    return request({
        url: 'admin/category/list',
        method: 'POST'
    })
}
export const addCategoryAPI = (iParentId, iName) => {
    return request({
        url: 'admin/category/add',
        method: 'POST',
        params: {
            parentId: iParentId,
            name: iName
        }
    })
}
export const deleteCategoryAPI = (iId) => {
    return request({
        url: 'admin/category/delete',
        method: 'POST',
        params: {
            id: iId
        }
    })
}
