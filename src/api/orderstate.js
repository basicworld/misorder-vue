import request from '@/utils/request'
// 获取列表
export function getOrderStateListAPI(data) {
  return request({
    url: '/work-order/orderstate/list',
    method: 'post',
    data
  })
}
// 删除
export function deleteOrderStateAPI(data) {
  return request({
    url: '/work-order/orderstate/delete',
    method: 'post',
    data
  })
}
// 新增
export function insertOrderStateAPI(data) {
  return request({
    url: '/work-order/orderstate/insert',
    method: 'post',
    data
  })
}
// 更新
export function updateOrderStateAPI(data) {
  return request({
    url: '/work-order/orderstate/update',
    method: 'post',
    data
  })
}
