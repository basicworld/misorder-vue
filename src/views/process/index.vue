<template>
  <el-tabs v-model="activeTabName" @tab-click="handleTabClick">
    <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  data() {
    return {
      activeTabName: 'second'
    }
  },
  methods: {
    handleTabClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
