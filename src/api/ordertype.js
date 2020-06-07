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
// 获取二级工单类型列表
export function getOrderSubTypeListAPI(data) {
  return request({
    url: '/work-order/ordersubtype/list',
    method: 'post',
    data
  })
}
// 删除二级工单类型
export function deleteOrderSubTypeAPI(data) {
  return request({
    url: '/work-order/ordersubtype/delete',
    method: 'post',
    data
  })
}
// 新增二级工单类型
export function addOrderSubTypeAPI(data) {
  return request({
    url: '/work-order/ordersubtype/insert',
    method: 'post',
    data
  })
}
