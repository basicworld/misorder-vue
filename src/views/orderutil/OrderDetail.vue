<template>
  <div class="app-container">
    <table class="datalist">
      <tr>
        <td class="title">工单标题</td>
        <td class="content">{{ orderData.title }}</td>
        <td class="title">工单编号</td>
        <td class="content">{{ orderData.id }}</td>
      </tr>
      <tr>
        <td class="title">一级类型</td>
        <td class="content">{{ orderData.type }}</td>
        <td class="title">二级类型</td>
        <td class="content">{{ orderData.subtype }}</td>
      </tr>
      <tr>
        <td class="title">创建人</td>
        <td class="content">{{ orderData.create_user }}</td>
        <td class="title">创建时间</td>
        <td class="content">{{ orderData.create_time }}</td>
      </tr>
      <tr>
        <td class="title">紧急程度</td>
        <td class="content">{{ orderData.urgent }}</td>
        <td class="title">期望解决时间</td>
        <td class="content">{{ orderData.expect_time }}</td>
      </tr>
      <tr>
        <td class="title">当前处理人</td>
        <td class="content">{{ orderData.handler_user }}</td>
        <td class="title">当前处理状态</td>
        <td class="content">{{ orderData.status }}</td>
      </tr>
      <tr style="height: 100px;">
        <td class="title">详情描述</td>
        <td colspan="3" class="content">
          <div>
            {{ orderData.detail }}
          </div>
        </td>
      </tr>
      <tr style="height: 100px;">
        <td class="title">附件</td>
        <td colspan="3" class="content">
          <ol v-if="orderData.fileList.length>0">
            <li v-for="(item,index) in orderData.fileList" :key="index">
              <a :href="item.url">{{ item.name }}</a>
            </li>
          </ol>
          <div v-if="orderData.fileList.length===0">无附件</div>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
export default {
  props: {
    orderData: {
      type: Object,
      required: true,
      default() {
        return {
          id: 'default id', // id
          type: 'default type', // 一级工单类型
          subtype: 'default subtype', // 二级工单类型
          title: 'default title', // 标题
          detail: 'default detail', // 详情
          urgent: 'default urgent', // 紧急程度
          expect_time: '0000-00-00 00:00:00', // 期望完成时间
          create_user: 'default create_user', // 创建人
          create_time: '0000-00-00 00:00:00', // 创建时间
          handler_user: 'default handler_user', // 当前处理人
          status: 'default status', // 处理状态
          fileList: [] // 附件列表，id name url
        }
      }
    }
  },
  data() {
    return {

    }
  },
  watch: {
    orderData: {
      deep: true,
      handler(val) {
        console.log('orderData change')
        console.log(val)
        // this.order = val
      }
    }
  },
  created() {
  },
  methods: {}
}
</script>

<style scoped>
.line{
  text-align: center;
}
.datalist {
  border: 1px solid #429fff; /* 表格边框 */
  font-family: Arial;
  border-collapse: collapse; /* 边框重叠 */
  width: 100%;
}
.datalist tr:hover {
  background-color: #c4e4ff; /* 动态变色,IE6下无效！*/
}
.datalist caption {
  padding-top: 3px;
  padding-bottom: 2px;
  font: bold 1.1em;
  background-color: #f0f7ff;
  border: 1px solid #429fff; /* 表格标题边框 */
}
.datalist th {
  border: 1px solid #429fff; /* 行、列名称边框 */
  background-color: #d2e8ff;
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 10px;
  padding-right: 10px;
  text-align: center;
}
.datalist td {
  border: 1px solid #429fff; /* 单元格边框 */
  text-align: right;
  padding: 4px;
}
.datalist .title{
  text-align: center;
  font-weight: bold;
  width: 140px;
}
.datalist .content{
  text-align: left;;
}
</style>

