<template>


  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录验证</span>
        <el-button style="float: right; padding: 3px 0" type="text"></el-button>
      </div>
<!--      <div v-for="o in 4" :key="o" class="text item">-->
<!--        {{'列表内容 ' + o }}-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username" class="username" >
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item class="submit">
          <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data(){
    return{
      ruleForm: {
        username: '',
        password: ''
      },

      rules:{
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 4, max: 15, message: '用户名长度必须在 4 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 15, message: '密码长度必须在 4 到 15 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
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

<style scoped>
.box-card{
  margin:auto;
  width: 600px;
  height: 250px;
}
.submit{
  margin-left: -65px;
}

.username{
  margin-left: 65px;
  width: 400px;
}

.password {
  margin-left: 65px;
  width: 400px;
}
</style>