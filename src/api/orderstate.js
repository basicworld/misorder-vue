import request from '@/utils/request'
// 获取工单状态类型列表
export function getOrderStateListAPI(data) {
  return request({
    url: '/work-order/orderstate/list',
    method: 'post',
    data
  })
}
// 删除工单状态
export function deleteOrderStateAPI(data) {
  return request({
    url: '/work-order/orderstate/delete',
    method: 'post',
    data
  })
}
// 新增工单状态
export function addOrderStateAPI(data) {
  return request({
    url: '/work-order/orderstate/insert',
    method: 'post',
    data
  })
}
// 更新工单状态
export function updateOrderStateAPI(data) {
  return request({
    url: '/work-order/orderstate/update',
    method: 'post',
    data
  })
}
// 获取工单状态转移列表
export function getOrderStateTansferListAPI(data) {
  return request({
    url: '/work-order/orderstate-transfer/list',
    method: 'post',
    data
  })
}
// 新增工单状态转移item
export function addOrderStateTansferAPI(data) {
  return request({
    url: '/work-order/orderstate-transfer/add',
    method: 'post',
    data
  })
}
// 删除工单状态转移item
export function deleteOrderStateTansferAPI(data) {
  return request({
    url: '/work-order/orderstate-transfer/delete',
    method: 'post',
    data
  })
}
