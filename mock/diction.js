import Mock from 'mockjs'

const data = Mock.mock({
  urgentItems: [
    { skey: 'nomal', svalue: '常规' },
    { skey: 'urgent', svalue: '紧急' },
    { skey: 'extra_urgent', svalue: '特急' }
  ]

})
export default [
  // 紧急情况列表
  {
    url: '/work-order/dict/urgent/list',
    type: 'post',
    response: config => {
      const items = data.urgentItems
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
