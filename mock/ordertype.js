import Mock from 'mockjs'

const data = Mock.mock({
  'orderTypeItems|10': [{
    'id|+1': 1,
    skey: function() { return 'type' + this.id },
    sname: function() { return '类型' + this.id },
    detail: '@sentence(4, 8)',
    'type_order|+1': 1,
    parent_skey: function() { return this.skey },
    is_enable: 1
  }],
  'orderSubTypeItems|3': [{
    'id|+1': 1,
    skey: function() { return 'subtype' + this.id },
    sname: function() { return '二级类型' + this.id },
    detail: '@sentence(4, 8)',
    'type_order|+1': 1,
    parent_skey: function() { return this.skey },
    is_enable: 1
  }]

})

export default [
  // 获取工单类型列表
  {
    url: '/work-order/ordertype/list',
    type: 'post',
    response: config => {
      const items = data.orderTypeItems
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 工单类型delete
  {
    url: '/work-order/ordertype/delete',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 工单类型add
  {
    url: '/work-order/ordertype/add',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 工单类型update
  {
    url: '/work-order/ordertype/update',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 获取二级工单类型列表
  {
    url: '/work-order/ordersubtype/list',
    type: 'post',
    response: config => {
      const items = data.orderSubTypeItems
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  // 二级工单类型delete
  {
    url: '/work-order/ordersubtype/delete',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  // 二级工单类型add
  {
    url: '/work-order/ordersubtype/add',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  }

]
