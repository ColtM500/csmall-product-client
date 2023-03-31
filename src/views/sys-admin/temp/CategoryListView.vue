<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in history" :key="item.id"><span v-text="item.name"></span></el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="200" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="keywords" label="关键词列表" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="100" align="center"></el-table-column>
      <el-table-column label="是否启用" width="120" align="center">
        <template slot-scope="scope">
          <el-switch
              @change="changeEnable(scope.row)"
              v-model="scope.row.enable"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="显示在导航栏" width="120" align="center">
        <template slot-scope="scope">
          <el-switch
              v-model="scope.row.isDisplay"
              :active-value="1"
              :inactive-value="0"
              active-color="#13ce66"
              inactive-color="#ccc">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="子级类别" width="120" align="center">
        <template slot-scope="scope">
          <el-button size="mini" :disabled="scope.row.isParent == 0"
                     @click="showSubCategoryList(scope.row)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" circle size="mini"
                     @click="showEditFormDialog(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="mini"
                     :disabled="scope.row.isParent==1"
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <div v-if="currentParentId!=0" style="margin-top: 10px; text-align: right;">
      <el-button size="small" @click="goBack()">返回</el-button>
    </div>

    <!-- 以下是修改类别的弹出表单Dialog -->
    <el-dialog title="修改类别" :visible.sync="dialogFormVisible">
      <el-form :model="editForm">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="简介" :label-width="formLabelWidth">
          <el-input v-model="editForm.description" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="排序序号" :label-width="formLabelWidth">
          <el-input v-model="editForm.sort" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      currentParentId:0,  //当前默认看的一级类别
      history:[], //用一个数组记录点击过的按钮 点击的该类别的depth
      dialogFormVisible: false,
      editForm: {
        id: '',
        name: '',
        description: '',
        sort: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    goBack(){
      //从历史数组中的长度-1 拿出一个parentCategory
      // 每一层点下去的history数组长度是增加的 所以通过这种方式记录历史的父级类别
      let parentCategory = this.history[this.history.length - 1];
      this.history.pop();//为了实现返回 将历史数组中的最后一个元素挤出 去除已返回的元素id 不然点了一次返回之后就点不动了 因为已经返回了始终为该id
      this.currentParentId = parentCategory.parentId; //当前级别id为 父级分类的分级id; 拿一个父级id给现在的全局参数的类别id
      this.loadCategoryList(); //加载列表
    },
    showSubCategoryList(category){
      this.history[category.depth - 1] = category; //将被点击的类别的category深度 传入 history数组中 下标要在深度基础上-1
      this.currentParentId = category.id; //就将这个类别的id传入当前的parentId中实现 查看的时候点击这个类别 这个类别的id传入全局变量
      this.loadCategoryList();//然后加载列表
    },
    changeEnable(category){
      let enableText = ['禁用','启用'];
      let url = 'http://localhost:6080/categories/' + category.id;
      let enable = category.enable;
      if (enable==1){
        url += '/enable';
      } else {
        url += '/disable';
      }
      console.log('url= ' + url);

      this.axios.post(url).then((response)=>{
        let jsonResult = response.data;
        if (jsonResult.state==20000){
          this.$message({
            message: enableText[enable] + '[' + category.name + ']类别成功!',
            type: 'success'
          });
          this.loadCategoryList();
        } else if (jsonResult.state==40400){
          this.$alert(jsonResult.message, '操作失败',{
            confirmButtonText: '确定',
            callback: action => {
              this.loadCategoryList();
            }
          });
        } else {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }
      });
    },
    showEditFormDialog(category) {
      let url = 'http://localhost:6080/categories/' + category.id;
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.dialogFormVisible = true;
          this.editForm = category;
        } else if (jsonResult.state == 40400) {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.loadCategoryList();
            }
          });
        } else {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }
      });
    },
    submitEditForm(){
      let url = 'http://localhost:6080/categorys/' + this.editForm.id + '/update';
      console.log('url = ' + url);

      let formData = this.qs.stringify(this.editForm);

      this.axios.post(url, formData).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '修改相册成功！',
            type: 'success'
          });
          this.dialogFormVisible = false;
          this.loadCategoryList();
        } else if (jsonResult.state == 40400) {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible = false;
              this.loadCategoryList();
            }
          });
        } else {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible = false;
            }
          });
        }
      });
    },
    openDeleteConfirm(category) {
      let message = '此操作将永久删除【' + category.name + '】相册，是否继续？';
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(category);
      }).catch(() => {
      });
    },
    handleDelete(category) {
      let url = 'http://localhost:6080/categories/' + category.id + '/delete';
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '删除【' + category.name + '】相册成功！',
            type: 'success'
          });
          this.loadCategoryList();
        } else if (jsonResult.state == 40400) {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.loadCategoryList();
            }
          });
        } else {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {}
          });
        }
      });
    },
    loadCategoryList() {
      let url = 'http://localhost:6080/categories/list-by-parent?parentId=' + this.currentParentId;
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.tableData = jsonResult.data;
        }
      });
    }
  },
  created() {
    //打开浏览器就有这东西
  },
  mounted() {
    //这个也是打开浏览器就有这东西 但是在created之后执行
    this.loadCategoryList();
  }
}
</script>

<style scoped>

</style>