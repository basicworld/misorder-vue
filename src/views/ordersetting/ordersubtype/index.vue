<template>
  <div class="app-container">
    <!-- 查询条件 操作按钮 -->

    <div>
      <el-form :inline="true" :model="queryFormData" class="demo-form-inline">
        <el-form-item label="一级工单类型">
          <el-select v-model="queryFormData.parent_skey" size="small" placeholder="请选择">
            <el-option
              v-for="state in orderTypeList"
              :key="state.skey"
              :label="state.sname"
              :value="state.skey"
            />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="small" @click="doQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="small" @click="doReset">重置</el-button>
        </el-form-item>
        <el-form-item v-if="queryFormData.parent_skey!==undefined">
          <el-button size="small" @click="handleAddClick">新增二级工单类型</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格数据 -->

    <div>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column prop="id" label="序号" />
        <el-table-column prop="sname" label="二级类型名称" />
        <el-table-column prop="skey" label="二级类型关键字" />
        <el-table-column prop="type_order" label="排序" />
        <el-table-column prop="detail" label="描述" />
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 二级工单类型新增/详情对话框 -->
    <el-dialog :title="dialogFormData.dialogName" :visible.sync="dialogFormVisible">
      <el-form ref="dialogForm" :model="dialogFormData" :rules="rules">
        <el-form-item label="一级工单类型名称" :label-width="formLabelWidth" prop="sname">
          <el-input v-model="dialogFormData.parent_skey" size="small" autocomplete="off" disabled />
        </el-form-item>
        <el-form-item label="类型名称" :label-width="formLabelWidth" prop="sname">
          <el-input v-model="dialogFormData.sname" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型关键字" :label-width="formLabelWidth" prop="skey">
          <el-input v-model="dialogFormData.skey" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="展示排序" :label-width="formLabelWidth" prop="type_order">
          <el-input v-model="dialogFormData.type_order" size="small" autocomplete="off" />
        </el-form-item>
        <el-form-item label="类型描述" :label-width="formLabelWidth" prop="detail">
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
import { getOrderTypeListAPI, deleteOrderSubTypeAPI, addOrderSubTypeAPI, getOrderSubTypeListAPI } from '@/api/ordertype'
export default {
  data() {
    return {
      // loading
      loading: true,
      // 查询条件
      queryFormData: {
        parent_skey: ''
      },
      // orderTypeList 一级工单状态列表
      orderTypeList: [
        { skey: 'a', sname: 'aa' }
      ],
      // 查询结果
      tableData: [],
      // 表单对话框可见性
      dialogFormVisible: false,
      // 默认空表单数据
      defaultdialogFormData: {
        id: '',
        sname: '',
        skey: '',
        parent_skey: '',
        detail: '',
        type_order: '',
        dialogName: '',
        dialogType: undefined
      },
      // 新增、查询表单数据
      dialogFormData: {
        id: '',
        sname: '',
        skey: '',
        parent_skey: '',
        detail: '',
        type_order: '',
        dialogName: '',
        dialogType: undefined
      },
      // 对话框表单宽度
      formLabelWidth: '120px',
      // 表单验证
      rules: {
        sname: [
          { required: true, message: '请输入二级工单类型名称，示例：草稿、处理中', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不超过 20 个字符', trigger: 'blur' }
        ],
        skey: [
          { required: true, message: '请输入二级工单类型关键字，英文无空格，示例：stt_draft、stt_solving', trigger: 'blur' },
          { min: 1, max: 20, message: '长度不超过 20 个字符', trigger: 'blur' }
        ],
        type_order: [
          { required: true, message: '请输入1-999的正整数，示例：1、2、3', trigger: 'blur' },
          {
            validator(rule, value, callback) {
              if (Number.isInteger(Number(value)) && Number(value) > 0 && Number(value) < 999) {
                callback()
              } else { callback(new Error('请输入1-999的正整数')) }
            }, trigger: 'blur'
          }
        ]

      }
    }
  },
  created() {
    // 初始化数据
    this.initFirstLevelOrderType()
    this.initOrderSubType()
    this.doQuery()
  },
  methods: {
    // 查询二级工单类型列表
    doQuery() {
      console.log('doQuery!')
      var reqData = {} // 请求参数
      reqData.parent_skey = this.queryFormData.parent_skey
      getOrderSubTypeListAPI(reqData).then(res => {
        if (res.code === 20000) {
          this.tableData = res.data.items
          this.loading = false
        }
      }).catch(() => {
        console.log('error')
      })
    },
    // 查询一级工单类型列表
    initFirstLevelOrderType() {
      console.log('initFirstLevelOrderType!')
      var reqData = {} // 请求参数为空，此处查询所有一级items
      getOrderTypeListAPI(reqData).then(res => {
        if (res.code === 20000) {
          this.orderTypeList = res.data.items
        }
      }).catch(() => {
        console.log('error')
      })
    },
    // 初始化一级工单类型的默认选项
    initOrderSubType() {
      if (this.orderTypeList.length > 0) {
        if (this.$route.params.skey !== undefined && this.$route.params.skey !== ':skey') {
          this.queryFormData.parent_skey = this.$route.params.skey
        } else {
          this.queryFormData.parent_skey = undefined
        }
        this.loading = false
      } else {
        this.queryFormData.parent_skey = undefined
        this.loading = false
      }
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
      this.dialogFormData.dialogName = '新增二级工单类型'
      this.dialogFormData.dialogType = 'add'
      // 设置一级工单类型
      this.dialogFormData.parent_skey = this.queryFormData.parent_skey
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
          reqData.sname = this.dialogFormData.sname
          reqData.skey = this.dialogFormData.skey
          reqData.detail = this.dialogFormData.detail
          // 请求
          if (this.dialogFormData.dialogType === 'add') {
            // 新增
            addOrderSubTypeAPI(reqData).then(res => {
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
        deleteOrderSubTypeAPI(reqData).then(res => {
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

