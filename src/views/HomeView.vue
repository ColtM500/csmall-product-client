<template>
  <div>
    <!-- 外层容器 -->
    <el-container>
      <!-- 上半区域：顶栏 -->
      <el-header class="layout-header">
        <h1>手机回收运营管理平台</h1>
      </el-header>
      <!-- 下半区域 -->
      <el-container class="layout-body">
        <!-- 下半区域的左侧边栏 -->
        <el-aside class="layout-aside">
          <el-col>
            <el-menu
                router=""
                :default-active="$router.currentRoute.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="rgba(255, 255, 255, 0.5)"
                text-color="black"
                active-text-color="#ffd04b">
              <!--首页-->
              <el-menu-item index="/sys-admin/index">
                <i class="el-icon-s-home"></i>
                <span>首页</span>
              </el-menu-item>
              <!--临时分页-->
              <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-s-tools"></i>
                    <span>临时页面</span>
                  </template>
                  <el-menu-item index="2-1">
                    <i class="el-icon-circle-plus"></i>
                    <span>添加管理员</span>
                  </el-menu-item>
                  <el-menu-item index="2-2">
                    <i class="el-icon-s-operation"></i>
                    <span>管理员列表</span>
                  </el-menu-item>
                  <el-menu-item index="2-3">
                    <i class="el-icon-circle-plus"></i>
                    <span>添加品牌</span>
                  </el-menu-item>
                  <el-menu-item index="/sys-admin/temp/brand/list">
                    <i class="el-icon-s-operation"></i>
                    <span>品牌列表</span>
                  </el-menu-item>
                  <el-menu-item index="/sys-admin/temp/category/add-new">
                    <i class="el-icon-circle-plus"></i>
                    <span>添加类别</span>
                  </el-menu-item>
                  <el-menu-item index="/sys-admin/temp/category/list-by-parent">
                    <i class="el-icon-s-operation"></i>
                    <span>类别列表</span>
                  </el-menu-item>
                  <el-menu-item index="/sys-admin/temp/album/add-new">
                    <i class="el-icon-circle-plus"></i>
                    <span>添加相册</span>
                  </el-menu-item>
                  <el-menu-item index="/sys-admin/temp/album/list">
                    <i class="el-icon-s-operation"></i>
                    <span>相册列表</span>
                  </el-menu-item>
                  <el-menu-item index="2-9">
                    <i class="el-icon-circle-plus"></i>
                    <span>添加属性模板</span>
                  </el-menu-item>
                  <el-menu-item index="2-10">
                    <i class="el-icon-s-operation"></i>
                    <span>属性模板列表</span>
                  </el-menu-item>
                  <el-menu-item index="2-11">
                    <i class="el-icon-circle-plus"></i>
                    <span>添加属性</span>
                  </el-menu-item>
                  <el-menu-item index="2-12">
                    <i class="el-icon-s-operation"></i>
                    <span>属性列表</span>
                  </el-menu-item>
                </el-submenu>
              <!-- 商品管理 -->
              <el-submenu index="3" disabled>
                  <template slot="title">
                    <i class="el-icon-s-goods"></i>
                    <span>商品管理</span>
                  </template>
                  <el-menu-item index="3-1">
                    <i class="el-icon-s-grid"></i>
                    <span>SPU台账</span>
                  </el-menu-item>
                  <el-menu-item index="3-2">
                    <i class="el-icon-circle-plus"></i>
                    <span>新增SPU</span>
                  </el-menu-item>
                  <el-menu-item index="3-3">
                    <i class="el-icon-s-operation"></i>
                    <span>相册管理</span>
                  </el-menu-item>
                  <el-menu-item index="3-4">
                    <i class="el-icon-s-unfold"></i>
                    <span>商品类别</span>
                  </el-menu-item>
                  <el-menu-item index="3-5">
                    <i class="el-icon-s-flag"></i>
                    <span>属性模板</span>
                  </el-menu-item>
                  <el-menu-item index="3-6">
                    <i class="el-icon-s-data"></i>
                    <span>品牌管理</span>
                  </el-menu-item>
                </el-submenu>
              <!-- 订单管理 -->
              <el-submenu index="4" disabled>
                <template slot="title">
                  <i class="el-icon-s-order"></i>
                  <span>订单管理</span>
                </template>
              </el-submenu>
              <!-- 营销管理 -->
              <el-submenu index="5" disabled>
                <template slot="title">
                  <i class="el-icon-s-ticket"></i>
                  <span>营销管理</span>
                </template>
              </el-submenu>
              <!-- 商家管理 -->
              <el-submenu index="6" disabled>
                <template slot="title">
                  <i class="el-icon-s-shop"></i>
                  <span>商家管理</span>
                </template>
              </el-submenu>
              <!-- 权限管理 -->
              <el-submenu index="7" disabled>
                <template slot="title">
                  <i class="el-icon-s-check"></i>
                  <span>权限管理</span>
                </template>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-aside>
        <!-- 下半区域的右侧主体 -->
        <el-main class="layout-main">
          <!-- 根据路由，由其它视图组件来显示 -->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
body {
  background-image: url("../assets/login.png");
  background-size: cover; /*把背景图片设置为封面*/
  text-align: center;
}

.layout-header {
  background: #fafafa;
  opacity: 0.5
}

.layout-header h1 {
  color: #000000;
  line-height: 15px;
}

.layout-body {
  position: absolute;
  left: 8px;
  right: 0px;
  top: 60px;
  bottom: 0px;
}

.layout-aside {
  border: 1px solid #e8e8f1;
  margin-top: 8px;
}

.layout-aside i {
  color: #1a1515 !important;
}

.layout-main {
  border: 1px solid #e8e8f1;
  margin-top: 8px;
  margin-right: 9px;
  line-height: 0px;
}

.el-menu-item.is-active {
  background: #2c3e50 !important;
}
</style>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>
