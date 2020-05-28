import Mock from 'mockjs'

const data = Mock.mock({
  'items|10': [{
    'id|+1': 1,
    name: '@ctitle',
    key: '@sentence(1,1)',
    detail: '@sentence(4, 8)'
  }]
})

export default [
  {
    url: '/work-order/orderstate/list',
    type: 'post',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/work-order/orderstate/delete',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  {
    url: '/work-order/orderstate/insert',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  },
  {
    url: '/work-order/orderstate/update',
    type: 'post',
    response: config => {
      return {
        code: 20000
      }
    }
  }
]
