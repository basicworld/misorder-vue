import Mock from 'mockjs'

const data = Mock.mock({
  'orderStateItems|10': [{
    'id|+1': 1,
    name: function() { return '状态' + this.id },
    key: function() { return 'state' + this.id },
    detail: '@sentence(4, 8)'
  }],
  'orderStateTransferItems|10': [{
    'id|+1': 1,
    state_name: function() { return '状态' + this.id },
    state_key: function() { return 'state' + this.id },
    next_state_name: function() { return '状态' + (this.id + 1) },
    next_state_key: function() { return 'state' + (this.id + 1) },
    detail: '@sentence(4, 8)'
  }]

})

export default [
  // 工单状态list
  {
    url: '/work-order/orderstate/list',
    type: 'post',
    response: config => {
      const items = data.orderStateItems
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 工单状态delete
  {
    url: '/work-order/orderstate/delete',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 工单状态add
  {
    url: '/work-order/orderstate/add',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 工单状态update
  {
    url: '/work-order/orderstate/update',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 工单状态转移list
  {
    url: '/work-order/orderstate-transfer/list',
    type: 'post',
    response: config => {
      const items = data.orderStateTransferItems
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
