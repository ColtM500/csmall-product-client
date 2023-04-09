<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion">后台管理</i>
      </el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
    </el-breadcrumb>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="ruleForm.nickname"></el-input>
      </el-form-item>
      <el-form-item label="头像" prop="avatar">
        <el-input v-model="ruleForm.avatar"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input v-model="ruleForm.description"></el-input>
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
      <el-form-item label="角色">
        <el-select v-model="ruleForm.roleIds" multiple placeholder="请选择">
          <el-option
              v-for="item in roleListOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
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
  data(){
    return{
      roleListOptions:[],
      ruleForm:{
        username:"",
        password:"",
        nickname:"",
        avatar:"",
        phone:"",
        email:"",
        description:"",
        enable:1,
        roleIds:[]
      },
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 15, message: '用户名名称长度必须在 2 到 15 个字符', trigger: 'blur' }
        ],
        password:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 15, message: '密码名称长度必须在 2 到 15 个字符', trigger: 'blur'  }
        ],
        nickname:[
          { required: true, message: '请输入昵称', trigger: 'blur' },
          { min: 2, max: 15, message: '昵称长度必须在 2 到 15 个字符', trigger: 'blur' }
        ],
        avatar:[
          { required: true, message: '请输入头像路径', trigger: 'blur' },
          { min: 2, max: 30, message: '头像路径长度必须在 2 到 15 个字符', trigger: 'blur' }
        ],
        phone:[
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 2, max: 15, message: '手机号码长度必须在 2 到 15 个字符', trigger: 'blur' }
        ],
        email:[
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { min: 2, max: 15, message: '邮箱\'长度必须在 2 到 15 个字符', trigger: 'blur'  }
        ],
        description:[
          { required: true, message: '请输入描述', trigger: 'blur' },
          { min: 2, max: 15, message: '描述长度必须在 2 到 15 个字符', trigger: 'blur'  }
        ]
      },
    }
  },
}
</script>

<style scoped>

</style>