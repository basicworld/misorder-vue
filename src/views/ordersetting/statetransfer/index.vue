<template>
  <div class="app-container">
    <!-- 查询条件 操作按钮 -->

    <div>
      <el-form :inline="true" :model="queryFormData" class="demo-form-inline">
        <el-form-item label="当前状态名称">
          <el-input v-model="queryFormData.name" placeholder="当前状态名称" size="small" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="doQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="doReset">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="handleAddClick">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格数据 -->

    <div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="state_name" label="当前状态" />
        <el-table-column prop="next_state_name" label="下个状态" />
        <el-table-column prop="detail" label="场景描述" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 对话框 -->
    <el-dialog :title="dialogFormData.dialogName" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :model="dialogFormData" :rules="rules">
        <el-form-item label="当前状态" :label-width="formLabelWidth" prop="state_key">
          <el-select v-model="dialogFormData.state_name" size="small" placeholder="请选择状态">
            <el-option
              v-for="state in stateListData"
              :key="state.key"
              :label="state.name + '(' + state.key + ')'"
              :value="state.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="下个状态" :label-width="formLabelWidth" prop="next_state_key">
          <el-select v-model="dialogFormData.next_state_name" size="small" placeholder="请选择状态">
            <el-option
              v-for="state in stateListData"
              :key="state.key"
              :label="state.name + '(' + state.key + ')'"
              :value="state.key"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="场景描述" :label-width="formLabelWidth" prop="detail">
          <el-input v-model="dialogFormData.detail" size="small" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="doSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderStateListAPI, deleteOrderStateTansferAPI, addOrderStateTansferAPI, getOrderStateTansferListAPI } from '@/api/orderstate'
export default {
  data() {
    return {
      // loading
      loading: true,
      // 查询条件
      queryFormData: {
        name: ''
      },
      // 查询结果
      tableData: [],
      // 工单状态列表
      stateListData: [],
      // 表单对话框可见性
      dialogFormVisible: false,
      // 默认空表单数据
      defaultdialogFormData: {
        id: '',
        state_name: '',
        state_key: '',
        next_state_name: '',
        next_state_key: '',
        detail: '',
        dialogName: '',
        dialogType: undefined
      },
      // 新增、查询表单数据
      dialogFormData: {
        id: '',
        state_name: '',
        state_key: '',
        next_state_name: '',
        next_state_key: '',
        detail: '',
        dialogName: '',
        dialogType: undefined
      },
      // 对话框表单宽度
      formLabelWidth: '120px',
      // 表单验证
      rules: {
        state_key: [
          { required: true, message: '必选项', trigger: 'blur' }
        ],
        next_state_key: [
          { required: true, message: '必选项', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    // 初始化数据
    this.doQuery()
    // 查询工单状态列表
    this.doStateListQuery()
  },
  methods: {
    // 查询工单状态列表
    doStateListQuery() {
      console.log('doStateListQuery!')
      var reqData = {} // 请求参数
      getOrderStateListAPI(reqData).then(res => {
        if (res.code === 20000) {
          this.stateListData = res.data.items
        }
      }).catch(() => {
        console.log('error')
      })
    },
    // 查询列表
    doQuery() {
      console.log('doQuery!')
      var reqData = {} // 请求参数
      reqData.name = this.queryFormData.name
      getOrderStateTansferListAPI(reqData).then(res => {
        if (res.code === 20000) {
          this.tableData = res.data.items
          this.loading = false
        }
      }).catch(() => {
        console.log('error')
      })
    },
    // 重置查询条件
    doReset() {
      console.log('doReset!')
      this.queryFormData = {
        name: ''
      }
      this.doQuery()
    },
    // 打开新增对话框
    handleAddClick() {
      // 清空表单
      this.dialogFormData = Object.assign({}, this.defaultdialogFormData)

      // 设置对话框名字和类型
      this.dialogFormData.dialogName = '新增状态转移场景'
      this.dialogFormData.dialogType = 'add'
      // 显示表单
      this.dialogFormVisible = true
      // 清除表单校验
      this.$nextTick(() => {
        this.$refs['dialogForm'].clearValidate()
      })
    },
    // 保存item
    doSave() {
      console.log('doSave!')
      this.$refs['dialogForm'].validate((valid) => {
        if (valid) {
          // 表单验证成功
          console.log('表单验证成功')

          // 组装数据
          var reqData = {} // 请求参数
          reqData.name = this.dialogFormData.name
          reqData.key = this.dialogFormData.key
          reqData.detail = this.dialogFormData.detail
          // 请求
          if (this.dialogFormData.dialogType === 'add') {
            // 新增
            addOrderStateTansferAPI(reqData).then(res => {
              if (res.code === 20000) {
                this.$message({ type: 'success', message: '新增成功!' })
                this.dialogFormVisible = false
                this.doQuery()
              }
            }).catch(() => { console.log('error') })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    // 删除单行数据
    handleDelete(row) {
      this.$confirm('删除不可恢复, 是否继续?', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var reqData = {} // 请求参数
        reqData.id = row.id
        deleteOrderStateTansferAPI(reqData).then(res => {
          if (res.code === 20000) {
            this.$message({ type: 'success', message: '删除成功!' })
          }
        }).catch(() => { console.log('error') })
      }).catch(() => {
        this.$message({ type: 'info', message: '已取消删除' })
      })
    }

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

