<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加类别</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="父级类别" prop="parentId">
        <el-input v-model="ruleForm.parentId" placeholder="请输入父级类别的ID"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="关键词列表" prop="keywords">
        <el-input v-model="ruleForm.keywords"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="ruleForm.icon"></el-input>
      </el-form-item>
      <el-form-item label="排序序号" prop="sort">
        <el-input v-model="ruleForm.sort"></el-input>
      </el-form-item>
      <el-form-item label="是否启用" prop="enable">
        <el-switch
            v-model="ruleForm.enable"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ccc">
        </el-switch>
      </el-form-item>
      <el-form-item label="显示在导航栏" prop="isDisplay">
        <el-switch
            v-model="ruleForm.isDisplay"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ccc">
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        parentId: '0',
        name: '测试类别001',
        keywords: '关键词x,关键词y,关键词z',
        icon: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
        sort: '99',
        enable: 1,
        isDisplay: 1
      },
      rules: {
        parentId: [
          { required: true, message: '请输入父级类别的ID', trigger: 'blur' },
          { pattern: /^\d+$/, message: '父级类别的ID必须是数字', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入类别名称', trigger: 'blur' },
          { min: 2, max: 15, message: '类别名称长度必须在 2 到 15 个字符', trigger: 'blur' }
        ],
        keywords: [
          { required: true, message: '请输入关键词列表', trigger: 'blur' },
          { min: 2, max: 50, message: '关键词列表长度必须在 2 到 50 个字符', trigger: 'blur' }
        ],
        icon: [
          { required: true, message: '请输入图标图片的URL', trigger: 'blur' },
          { min: 20, max: 200, message: '图标图片的URL长度必须在 20 到 200 个字符', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入排序序号', trigger: 'blur' },
          { pattern: /^([0-9]{1}|[1-9]{1}[0-9]{1})$/, message: '排序序号必须是 0~99 之间的数字', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let url = 'http://localhost:6080/categories/add-new';
          console.log('url = ' + url);

          let formData = this.qs.stringify(this.ruleForm);
          console.log('formData = ' + formData);

          this.axios.post(url, formData).then((response) => {
            let jsonResult = response.data;
            if (jsonResult.state == 20000) {
              this.$message({
                message: '添加类别成功！',
                type: 'success'
              });
              this.resetForm(formName);
            } else {
              this.$alert(jsonResult.message, '操作失败', {
                confirmButtonText: '确定',
                callback: action => {}
              });
            }
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>