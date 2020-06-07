import Mock from 'mockjs'

const data = Mock.mock({
  'orderItems|10': [{
    'id|+1': 1,
    'type|1': ['type1', 'type2', 'type3'],
    'subtype|1': ['subtype1', 'subtype2', 'subtype3'],
    'state_key|1': ['state1', 'state2', 'state3'],
    'urgent|1': ['nomal', 'urgent', 'extra_urgent'],
    title: '@sentence(4, 8)',
    detail: '@sentence(10,20)',
    create_time: '@datetime("yyyy-MM-dd HH:mm")',
    finish_time: '@datetime("yyyy-MM-dd HH:mm")'
  }]

})
export default [
  // 工单列表
  {
    url: '/work-order/order/list',
    type: 'post',
    response: config => {
      const items = data.orderItems
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 新增工单
  {
    url: '/work-order/order/insert',
    type: 'post',
    response: config => {
      return {
        code: 20000

      }
    }
  },
  // 删除工单
  {
    url: '/work-order/order/delete',
    type: 'post',
    response: config => {
      return {
        code: 20000

      }
    }
  },
  // 更新工单
  {
    url: '/work-order/order/update',
    type: 'post',
    response: config => {
      return {
        code: 20000

      }
    }
  }

]
