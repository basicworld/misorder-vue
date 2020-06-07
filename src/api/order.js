import request from '@/utils/request'

// 删除工单
export function deleteOrderAPI(data) {
  return request({
    url: '/work-order/order/delete',
    method: 'post',
    data
  })
}
// 新增工单
export function addOrderAPI(data) {
  return request({
    url: '/work-order/order/insert',
    method: 'post',
    data
  })
}
// 更新工单
export function updateOrderAPI(data) {
  return request({
    url: '/work-order/order/update',
    method: 'post',
    data
  })
}
// 获取工单列表
export function getOrderListAPI(data) {
  return request({
    url: '/work-order/order/list',
    method: 'post',
    data
  })
}

