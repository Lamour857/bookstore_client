import httpInstance from '@/utils/request';

export function getAsideCategoryMenuAPI() {
    return httpInstance({
        url: 'public/category/asideCategory'
    })
}