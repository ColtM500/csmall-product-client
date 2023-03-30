<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px;">
    <el-breadcrumb-item :to="{ path: '/' }">
      <i class="el-icon-s-promotion"></i> 后台管理
    </el-breadcrumb-item>
    <el-breadcrumb-item>品牌列表</el-breadcrumb-item>
  </el-breadcrumb>

  <el-divider></el-divider>

  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
    <el-table-column prop="logo" label="LOGO" width="100" header-align="center" show-overflow-tooltip>
      <template slot-scope="scope">
        <el-avatar :size="30" :src="scope.row.logo" fit="contain"></el-avatar>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="名称" width="100px" header-align="center" show-overflow-tooltip></el-table-column>
    <el-table-column prop="pinyin" label="拼音" width="180" align="center"></el-table-column>
    <el-table-column prop="description" label="简介" width="180" align="center"></el-table-column>
    <el-table-column prop="keywords" label="关键词列表" width="180" align="center"></el-table-column>
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
    <el-table-column label="操作" header-align="center" show-overflow-tooltip align="center">
      <template slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" circle size="mini"
                   @click="showEditFormDialog(scope.row)"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle size="mini"
                   @click="openDeleteConfirm(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>

  <!-- 以下是修改相册的弹出表单Dialog -->
  <el-dialog title="修改品牌" :visible.sync="dialogFormVisible">
    <el-form :model="editForm">
      <el-form-item label="logo" :label-width="formLabelWidth">
        <el-input v-model="editForm.logo" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="名称" :label-width="formLabelWidth">
        <el-input v-model="editForm.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="拼音" :label-width="formLabelWidth">
        <el-input v-model="editForm.pinyin" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="简介" :label-width="formLabelWidth">
        <el-input v-model="editForm.description" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="关键词列表" :label-width="formLabelWidth">
        <el-input v-model="editForm.keywords" autocomplete="off"></el-input>
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
      dialogFormVisible: false,
      editForm: {
        id: '',
        logo: '',
        name: '',
        pinyin: '',
        description: '',
        keywords: '',
        sort: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    showEditFormDialog(brand) {
      // this.editForm = brand;
      // this.dialogFormVisible = true;

      let url = 'http://localhost:6080/brand/' + brand.id;
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.editForm = jsonResult.data;
          this.dialogFormVisible = true;
        } else if (jsonResult.state == 40400) {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.loadBrandList();
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
    submitEditForm() {
      let url = 'http://localhost:6080/brand/' + this.editForm.id + '/update';
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
          this.loadBrandList();
        } else if (jsonResult.state == 40400) {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogFormVisible = false;
              this.loadBrandList();
            }
          });
        } else if (jsonResult.state == 40900) {
          this.$message.error(jsonResult.message);
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
    openDeleteConfirm(brand) {
      let message = '此操作将永久删除【' + brand.name + '】品牌，是否继续？';
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(brand);
      }).catch(() => {
      });
    },
    handleDelete(brand) {
      let url = 'http://localhost:6080/brand/' + brand.id + '/delete';
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.$message({
            message: '删除【' + brand.name + '】相册成功！',
            type: 'success'
          });
          this.loadBrandList();
        } else if (jsonResult.state == 40400) {
          this.$alert(jsonResult.message, '操作失败', {
            confirmButtonText: '确定',
            callback: action => {
              this.loadBrandList();
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
    loadBrandList() {
      let url = 'http://localhost:6080/brand/';
      console.log('url = ' + url);

      this.axios.get(url).then((response) => {
        let jsonResult = response.data;
        if (jsonResult.state == 20000) {
          this.tableData = jsonResult.data;
        }
      });
    }
  },
  mounted() {
    this.loadBrandList();
  }
}
</script>

<style scoped>
</style>