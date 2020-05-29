<template>
  <div class="app-container">
    <!-- 查询条件 操作按钮 -->

    <div>
      <el-form :inline="true" :model="queryFormData" class="demo-form-inline">
        <el-form-item label="状态名称">
          <el-input v-model="queryFormData.name" placeholder="状态名称" size="small" />
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
        <el-table-column prop="name" label="状态名称" />
        <el-table-column prop="key" label="状态关键字" />
        <el-table-column prop="detail" label="状态描述" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDetail(scope.row)">详情</el-button>
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 对话框 -->
    <el-dialog :title="dialogFormData.dialogName" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :model="dialogFormData" :rules="rules">
        <el-form-item label="状态名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="dialogFormData.name" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态类型" :label-width="formLabelWidth" prop="key">
          <el-input v-model="dialogFormData.key" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="状态描述" :label-width="formLabelWidth" prop="detail">
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
import { getOrderStateListAPI, deleteOrderStateAPI, addOrderStateAPI, updateOrderStateAPI } from '@/api/orderstate'
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
      // 表单对话框可见性
      dialogFormVisible: false,
      // 默认空表单数据
      defaultdialogFormData: {
        id: '',
        name: '',
        key: '',
        detail: '',
        dialogName: '',
        dialogType: undefined
      },
      // 新增、查询表单数据
      dialogFormData: {
        id: '',
        name: '',
        key: '',
        detail: '',
        dialogName: '',
        dialogType: undefined
      },
      // 对话框表单宽度
      formLabelWidth: '120px',
      // 表单验证
      rules: {
        name: [
          { required: true, message: '请输入工单状态名称，示例：草稿、处理中', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不超过 20 个字符', trigger: 'blur' }
        ],
        key: [
          { required: true, message: '请输入工单状态关键字，英文无空格，示例：stt_draft、stt_solving', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不超过 20 个字符', trigger: 'blur' }
        ]

      }
    }
  },
  created() {
    // 初始化数据
    this.doQuery()
  },
  methods: {
    // 查询列表
    doQuery() {
      console.log('doQuery!')
      var reqData = {} // 请求参数
      reqData.name = this.queryFormData.name
      getOrderStateListAPI(reqData).then(res => {
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

      // 设置对话框名字和状态
      this.dialogFormData.dialogName = '新增工单状态'
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
          if (this.dialogFormData.dialogType === 'edit') {
            // 更新
            reqData.id = this.dialogFormData.id
            updateOrderStateAPI(reqData).then(res => {
              if (res.code === 20000) {
                this.$message({ type: 'success', message: '更新成功!' })
                this.dialogFormVisible = false
                this.doQuery()
              }
            }).catch(() => { console.log('error') })
          } else if (this.dialogFormData.dialogType === 'add') {
            // 新增
            addOrderStateAPI(reqData).then(res => {
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
    // 查看单行数据
    handleDetail(row) {
      // 清空表单
      this.dialogFormData = Object.assign({}, row)
      // 设置对话框名字和状态
      this.dialogFormData.dialogName = '工单状态详情'
      this.dialogFormData.dialogType = 'edit'
      // 显示表单
      this.dialogFormVisible = true
      // 清除表单校验
      this.$nextTick(() => {
        this.$refs['dialogForm'].clearValidate()
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
        deleteOrderStateAPI(reqData).then(res => {
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

