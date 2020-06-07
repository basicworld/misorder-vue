<template>
  <div class="app-container">
    <el-form ref="form" :model="form" label-width="120px" :rules="rules">

      <el-form-item label="一级工单类型" prop="type">
        <el-select v-model="form.type" size="small" placeholder="请选择" @change="doQueryOrderSubType">
          <el-option
            v-for="item in orderTypeList"
            :key="item.skey"
            :label="item.sname"
            :value="item.skey"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级工单类型" prop="subtype">
        <el-select v-model="form.subtype" size="small" placeholder="请选择">
          <el-option
            v-for="item in orderSubTypeList"
            :key="item.skey"
            :label="item.sname"
            :value="item.skey"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" size="small" />
      </el-form-item>
      <el-form-item label="详情描述" prop="detail">
        <el-input v-model="form.detail" size="small" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-upload
          class="upload-demo"
          action="https://jsonplaceholder.typicode.com/posts/"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList"
        >
          <el-button size="small">添加附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="紧急程度" prop="urgent">
        <el-radio-group v-model="form.urgent" size="small">
          <el-radio :label="3">备选项1</el-radio>
          <el-radio :label="6">备选项2</el-radio>
          <el-radio :label="9">备选项3</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="期望完成时间" prop="expect_time">
        <el-date-picker
          v-model="form.expect_time"
          size="small"
          type="date"
          placeholder="请选择"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
        />
      </el-form-item>

      <el-form-item>
        <el-button size="small" type="primary" @click="onSubmit">保存并提交</el-button>
        <el-button size="small" @click="onCancel">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOrderAPI } from '@/api/order'
import { getOrderTypeListAPI, getOrderSubTypeListAPI } from '@/api/ordertype'
export default {
  data() {
    return {
      // 表单验证
      rules: {
        type: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        subtype: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        detail: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        urgent: [
          { required: true, message: '必填项', trigger: 'blur' }
        ],
        expect_time: [
          { required: true, message: '必填项', trigger: 'blur' }
        ]

      },
      // 工单表单数据
      form: {
        type: '', // 一级工单类型
        subtype: '', // 二级工单类型
        title: '',
        detail: '',
        urgent: '', // 紧急程度
        expect_time: '' // 期望完成时间

      },
      // 一级工单类型
      orderTypeList: [],
      // 二级工单类型, 随一级类型而变化
      orderSubTypeList: [],
      // 上传文件列表
      fileList: [{ id: '1', name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3' }, { id: '2', name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63' }]

    }
  },
  created() {
    // 初始化数据
    this.doQueryOrderType()
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 表单验证成功
          console.log('表单验证成功')

          // 组装数据
          var reqData = {} // 请求参数
          reqData.type = this.form.type // 工单类型
          reqData.subtype = this.form.subtype // 工单子类型
          reqData.title = this.form.title
          reqData.detail = this.form.detail
          reqData.urgent = this.form.urgent // 紧急程度
          reqData.expect_time = this.form.expect_time // 期望完成时间

          var fileIds = []
          for (var i = 0; i < this.fileList.length; i++) {
            fileIds.push(this.fileList[i].id)
          }
          reqData.fileIds = fileIds.join(',')

          console.log(reqData)

          // 新增
          addOrderAPI(reqData).then(res => {
            if (res.code === 20000) {
              this.$message({ type: 'success', message: '新增成功!' })
            }
          }).catch(() => { console.log('error') })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    // 文件上传相关--删除一个上传的文件
    handleRemove(file, fileList) {
      console.log('handleRemove')
      for (var i = 0; i < this.fileList.length; i++) {
        if (file.id === this.fileList[i].id) {
          this.fileList.splice(i, 1)
        }
      }
      console.log(this.fileList)
    },
    // 文件上传相关--下载文件
    handlePreview(file) {
      console.log('handlePreview')
    },
    // 文件上传相关--文件超出个数的提示
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 文件上传相关--文件删除前的提示
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
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
    }
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

