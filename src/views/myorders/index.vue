<template>
  <div class="app-container">
    <!-- 查询条件 操作按钮 -->

    <div>
      <el-form :inline="true" :model="queryFormData" class="demo-form-inline">
        <el-row>

          <el-form-item label="工单编号">
            <el-input v-model="queryFormData.name" placeholder="请输入" size="small" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="工单标题">
            <el-input v-model="queryFormData.name" placeholder="请输入" size="small" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="queryFormData.dateRange"
              size="small"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="紧急程度">
            <el-select v-model="queryFormData.urgent" size="small" placeholder="请选择">
              <el-option
                v-for="item in urgentList"
                :key="item.skey"
                :label="item.svalue"
                :value="item.skey"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="处理状态">
            <el-select v-model="queryFormData.state_key" size="small" placeholder="请选择">
              <el-option
                v-for="item in orderStateList"
                :key="item.key"
                :label="item.name"
                :value="item.key"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="doQuery">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="doReset">重置</el-button>
          </el-form-item>
        </el-row>

      </el-form>
    </div>
    <!-- 表格数据 -->

    <div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="type" label="工单类型" />
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="urgent" label="紧急程度" :formatter="urgentFormatter" />
        <el-table-column prop="create_time" label="创建时间" />
        <el-table-column prop="state_key" label="处理状态" :formatter="orderStateFormatter" />
        <el-table-column prop="finish_time" label="处理完成时间" />
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
import { getOrderListAPI } from '@/api/order' // updateOrderAPI
import { getUrgentListAPI } from '@/api/diction'
import { getOrderTypeListAPI, getOrderSubTypeListAPI } from '@/api/ordertype'

export default {
  data() {
    return {
      // 时间选择配置
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },

      // loading
      loading: true,
      // 查询条件
      queryFormData: {
        name: '',
        dateRange: '',
        urgent: '',
        state_key: ''
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
      // 一级工单类型
      orderTypeList: [],
      // 二级工单类型, 随一级类型而变化
      orderSubTypeList: [],
      // 紧急情况
      urgentList: [],
      // 工单处理状态
      orderStateList: [],
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
    // 初始化字典值
    this.doQueryOrderState()
    this.doQueryUrgent()
    this.doQueryOrderType()
    // 初始化数据
    this.doQuery()
  },
  methods: {
    // 查询列表
    doQuery() {
      console.log('doQuery!')
      var reqData = {} // 请求参数
      reqData.name = this.queryFormData.name
      getOrderListAPI(reqData).then(res => {
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
    },
    // 查询紧急情况列表
    doQueryUrgent() {
      console.log('doQueryUrgent')
      var reqData = {}
      getUrgentListAPI(reqData).then(res => {
        if (res.code === 20000) {
          this.urgentList = res.data.items
        }
      }).catch(() => { console.log('error') })
    },
    // 查询工单状态列表
    doQueryOrderState() {
      console.log('doQueryOrderState')
      var reqData = {}
      getOrderStateListAPI(reqData).then(res => {
        if (res.code === 20000) {
          this.orderStateList = res.data.items
          console.log(this.orderStateList)
        }
      }).catch(() => { console.log('error') })
    },
    // 查询一级工单类型
    doQueryOrderType() {
      console.log('doQueryOrderType')
      var reqData = {}
      getOrderTypeListAPI(reqData).then(res => {
        if (res.code === 20000) {
          this.orderTypeList = res.data.items
        }
      }).catch(() => { console.log('error') })
    },
    // 查询二级工单类型
    doQueryOrderSubType() {
      console.log('doQueryOrderSubType')
      var reqData = {}
      reqData.parent_key = this.form.type // parent_key一级工单类型的key
      getOrderSubTypeListAPI(reqData).then(res => {
        if (res.code === 20000) {
          this.orderSubTypeList = res.data.items
        }
      }).catch(() => { console.log('error') })
    },
    // urgentFormatter
    urgentFormatter(row, column) {
      for (var i = 0; i < this.urgentList.length; i++) {
        if (row.urgent === this.urgentList[i].skey) {
          return this.urgentList[i].svalue
        }
      }
      return row.urgent
    },
    // urgentFormatter
    orderStateFormatter(row, column) {
      for (var i = 0; i < this.orderStateList.length; i++) {
        console.log(row.state_key, this.orderStateList[i].key)
        if (row.state_key === this.orderStateList[i].key) {
          return this.orderStateList[i].name
        }
      }
      return row.state_key
    }

  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

