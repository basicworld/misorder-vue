import request from '@/utils/request'

// 获取紧急情况列表
export function getUrgentListAPI(data) {
  return request({
    url: '/work-order/dict/urgent/list',
    method: 'post',
    data
  })
}

