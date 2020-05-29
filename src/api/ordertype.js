import request from '@/utils/request'
// 获取工单类型列表
export function getOrderTypeListAPI(data) {
  return request({
    url: '/work-order/ordertype/list',
    method: 'post',
    data
  })
}
// 删除工单类型
export function deleteOrderTypeAPI(data) {
  return request({
    url: '/work-order/ordertype/delete',
    method: 'post',
    data
  })
}
// 新增工单类型
export function addOrderTypeAPI(data) {
  return request({
    url: '/work-order/ordertype/insert',
    method: 'post',
    data
  })
}
// 更新工单类型
export function updateOrderTypeAPI(data) {
  return request({
    url: '/work-order/ordertype/update',
    method: 'post',
    data
  })
}
