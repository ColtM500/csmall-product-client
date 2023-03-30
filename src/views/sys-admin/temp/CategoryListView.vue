<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
      <el-breadcrumb-item :to="{ path: '/' }">
        <i class="el-icon-s-promotion"></i> 后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-divider></el-divider>

    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
      <el-table-column prop="name" label="名称" width="200" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="description" label="简介" header-align="center" show-overflow-tooltip></el-table-column>
      <el-table-column prop="sort" label="排序序号" width="100" align="center"></el-table-column>
      <el-table-column label="是否启用" width="120" align="center">
        <template slot-scope="scope">
          <el-switch
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
                     @click="openDeleteConfirm(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 以下是修改相册的弹出表单Dialog -->
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
    showSubCategoryList(category){
      this.currentParentId = category.id; //就将这个类别的id传入当前的parentId中实现 查看的时候点击这个类别 这个类别的id传入全局变量
      this.loadCategoryList();//然后加载列表
    },
    showEditFormDialog(category) {
      let url = 'http://localhost:6080/categories/' + category.id;
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.dialogFormVisible = true;
          this.editForm = album;
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
      let url = 'http://localhost:6080/albums/' + this.editForm.id + '/update';
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
    openDeleteConfirm(album) {
      let message = '此操作将永久删除【' + album.name + '】相册，是否继续？';
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(album);
      }).catch(() => {
      });
    },
    handleDelete(album) {
      let url = 'http://localhost:6080/albums/' + album.id + '/delete';
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '删除【' + album.name + '】相册成功！',
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