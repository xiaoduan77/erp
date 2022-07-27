<template>
  <div>
    <!-- 面包屑部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never">
      <el-button type="primary" @click="addGoodscategories">添加分类</el-button>
      <el-table
        :data="AddGoodsList"
        style="width: 100%; margin-bottom: 20px"
        row-key="cat_id"
        border
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="" label="#" width="60" type="index">
        </el-table-column>
        <el-table-column prop="cat_name" label="分类名称" width="300">
        </el-table-column>
        <el-table-column prop="" label="是否有效" width="300">
          <i class="el-icon-success"></i>
        </el-table-column>
        <el-table-column prop="cat_level" label="排序" width="300">
          <template slot-scope="scope">
            <el-tag :type="Change(scope.row.cat_level)" disable-transitions
              ><span v-if="scope.row.cat_level == 0">一级</span>
              <span v-if="scope.row.cat_level == 1">二级</span>
              <span v-if="scope.row.cat_level == 2">三级</span>
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" size="small"
              >编辑</el-button
            >
            <el-button type="danger" icon="el-icon-delete" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="添加商品分类" :visible.sync="dialogVisible" width="50%">
      <el-form :model="addGoods" :rules="rules" label-width="80px">
        <el-form-item prop="name" label="分类名称">
          <el-input v-model="addGoods.name"></el-input>
        </el-form-item>
      </el-form>
      <div class="block">
        <span class="demonstration">父级分类：</span>
        <el-cascader
          v-model="Fathervalue"
          :options="addGoodsData"
          :props="{ checkStrictly: true, label: 'cat_name', value: 'cat_id' }"
          clearable
          @change="handleChange"
        ></el-cascader>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getcategoriesParams, Addcategories } from '@/api/categoriesAddGoods'
export default {
  created() {
    this.getAddGoodsData()
  },
  data() {
    return {
      dialogVisible: false,
      addGoods: {
        name: ''
      },
      rules: {
        name: { required: true, message: '分类名称不能为空', trigger: 'blur' }
      },
      obj: {
        type: '',
        pagenum: 1,
        pagesize: 5
      },
      AddGoodsList: [],
      total: null,
      addGoodsData: [],
      Fathervalue: '',
      levelId: '',
      cat_pid: null

    }
  },
  methods: {
    async getAddGoodsData() {
      const res = await getcategoriesParams(this.obj)
      console.log(res)
      this.AddGoodsList = res.data.data.result
      this.total = res.data.data.total
      console.log(this.AddGoodsList)
    },
    handleSizeChange(val) {
      this.obj.pagesize = val
      this.getAddGoodsData(this.obj)
    },
    async handleCurrentChange(val) {
      this.obj.pagenum = val
      this.getAddGoodsData(this.obj)
    },
    Change(value) {
      console.log(value)
      // eslint-disable-next-line eqeqeq
      if (value == 0) {
        return 'primary'
        // eslint-disable-next-line eqeqeq
      } else if (value == 1) {
        return 'success'
        // eslint-disable-next-line eqeqeq
      } else if (value == 2) {
        return 'warning'
      }
    },
    async addGoodscategories() {
      this.dialogVisible = true
      this.obj.type = 2
      const res = await getcategoriesParams(this.obj)
      console.log(res)
      this.addGoodsData = res.data.data.result
    },
    handleChange(val) {
      this.levelId = val[val.length - 1]
    },
    async add() {
      console.log(1111, this.levelId)
      const addList = {
        cat_level: 2,
        cat_name: this.addGoods.name,
        cat_pid: this.levelId
      }
      this.dialogVisible = false
      const res = await Addcategories(addList)
      console.log(res)
      this.obj.type = ''
      this.getAddGoodsData()
    }
  }
}
</script>

<style lang="less">
.el-breadcrumb {
  font-size: 16px;
  margin-top: 5px;
}
.el-card {
  min-height: 600px;
  margin: 20px 20px;
}
.el-icon-success {
  color: rgb(78, 187, 78);
}
.el-table {
  margin-top: 20px;
}
.el-input {
  width: 600px;
}
.block {
  margin-left: 10px;
}
</style>
