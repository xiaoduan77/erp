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
    <div class="container">
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <div class="block">
        <span class="demonstration">选择商品分类：</span>
        <el-cascader
          v-model="value"
          :options="options"
          :props="{
            expandTrigger: 'hover',
            label: 'cat_name',
            value: 'cat_id',
          }"
          @change="handleChange"
        ></el-cascader>
      </div>
      <el-tabs v-model="activeName" @tab-click="ParamStaticList">
        <el-tab-pane label="动态参数" name="first">
          <el-button type="primary" @click="dialogVisible = true"
            >添加参数</el-button
          >
          <el-dialog
            title="添加动态参数"
            :visible.sync="dialogVisible"
            width="40%"
          >
            <el-form :model="AddParams" :rules="rules" label-width="80px">
              <el-form-item prop="Params" label="动态参数">
                <el-input v-model="AddParams.Params"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="add">确 定</el-button>
            </span>
          </el-dialog>
          <el-table :data="actionList" border style="width: 100%">
            <el-table-column prop="" label="" width="50" type="expand">
              <template>
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button
                  v-else
                  class="button-new-tag"
                  size="small"
                  @click="showInput"
                  >+ New Tag</el-button
                >
              </template>
            </el-table-column>
            <el-table-column prop="" label="#" type="index" width="50">
            </el-table-column>
            <el-table-column prop="attr_name" label="分类名称" width="600">
            </el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  size="small"
                  @click="ParamsEdir(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="small"
                  @click="categoriesDeleteParams(scope.row)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="second"
          ><el-button type="primary" @click="ParamsStatic = true"
            >添加属性</el-button
          >
          <el-dialog title="静态属性" :visible.sync="ParamsStatic" width="40%">
            <el-form :model="AddStatic" :rules="rules" label-width="80px">
              <el-form-item prop="Params" label="静态参数">
                <el-input v-model="AddStatic.Params"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="ParamsStatic = false">取 消</el-button>
              <el-button type="primary" @click="AddStaticList">确 定</el-button>
            </span>
          </el-dialog>
          <el-table :data="ParamsStaticData" border style="width: 100%">
            <el-table-column prop="" label="" width="50" type="expand">
            </el-table-column>
            <el-table-column prop="" label="#" type="index" width="50">
            </el-table-column>
            <el-table-column prop="attr_name" label="分类名称" width="600">
            </el-table-column>
            <el-table-column prop="cat_deleted" label="操作">
              <template>
                <el-button type="primary" icon="el-icon-edit" size="small"
                  >编辑</el-button
                >
                <el-button type="danger" icon="el-icon-delete" size="small"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table></el-tab-pane
        >
      </el-tabs>
      <el-dialog
        title="修改动态参数"
        :visible.sync="dialogEdir"
        width="30%"
        :before-close="handleClose"
      >
        <el-form :model="AddParams" :rules="rules" label-width="100px">
          <el-form-item prop="Params" label="动态参数">
            <el-input v-model="AddParams.Params"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogEdir = false">取 消</el-button>
          <el-button type="primary" @click="AddRightEdir">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getcategoriesParams, categoriesDelete, addCategoriesAction, EdirParams } from '@/api/categoriesParams'
import { getParams } from '@/api/addgoods'
export default {
  created() {
    this.getcategoriesParamsList()
    // this.ParamStatic()
  },
  data() {
    return {
      options: [],
      activeName: 'first',
      dialogVisible: false,
      AddParams: {
        Params: ''
      },
      AddStatic: {
        Params: ''
      },
      rules: {
        Params: { required: true, message: '不能为空', trigger: 'blur' }
      },
      ParamsId: '',
      sel: 'many',
      actionList: [],
      value: '',
      dynamicTags: ['标签一', '标签二', '标签三'],
      inputVisible: false,
      inputValue: '',
      ParamsStatic: false,
      ParamsStaticData: [],
      dialogEdir: false,
      EdirId: ''
    }
  },
  methods: {
    async getcategoriesParamsList() {
      const res = await getcategoriesParams()
      this.options = res.data.data
      console.log(this.options)
    },
    async handleChange(value) {
      console.log('value', value)
      console.log(value[value.length - 1])
      this.ParamsId = value[value.length - 1]
      const res = await getParams(this.ParamsId, this.sel)
      console.log(res)
      this.actionList = res.data.data
    },
    async ParamStaticList() {
      this.sel = 'only'
      const res = await getParams(this.ParamsId, this.sel)
      console.log(res)
      this.ParamsStaticData = res.data.data
      console.log(this.ParamsStaticData)
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.dynamicTags.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    async categoriesDeleteParams(row) {
      console.log('row', row)
      const id = row.cat_id
      const attrid = row.attr_id
      this.ParamsId = id
      this.sel = 'many'
      const res = await categoriesDelete(id, attrid)
      console.log(res)
      if (res.data.meta.status === 200) {
        const res1 = await getParams(id, this.sel)
        console.log(res1)
        this.actionList = res1.data.data
        console.log(this.actionList)
        this.$message.success('删除成功')
      }
    },
    async add() {
      const obj = {
        id: this.ParamsId,
        attr_name: this.AddParams.Params,
        attr_sel: 'many'
      }
      const res = await addCategoriesAction(obj)
      this.ParamsId = this.ParamsId - 0

      const res1 = await getParams(this.ParamsId, this.sel)
      console.log(res1)
      this.actionList = res1.data.data
      console.log(this.actionList)
      this.$message.success('添加成功')
      this.dialogVisible = false
    },
    async AddStaticList() {
      const obj = {
        id: this.ParamsId,
        attr_name: this.AddStatic.Params,
        attr_sel: 'only'
      }
      const res = await addCategoriesAction(obj)
      this.ParamsId = this.ParamsId - 0

      const res1 = await getParams(this.ParamsId, this.sel)
      console.log(res1)
      this.ParamsStaticData = res1.data.data
      console.log(this.actionList)
      this.$message.success('添加成功')
      this.ParamsStatic = false
    },
    ParamsEdir(row) {
      console.log(row)
      this.EdirId = row.attr_id
      this.AddParams.Params = row.attr_name
      console.log(this.AddParams.Params)
      this.dialogEdir = true
    },
    async AddRightEdir(row) {
      this.sel = 'many'
      // eslint-disable-next-line camelcase
      const attr_sel = this.sel
      // eslint-disable-next-line camelcase
      const attr_name = this.AddParams.Params

      this.dialogEdir = false
      const sel = 'many'
      const res = await EdirParams(this.ParamsId, this.EdirId, { attr_sel, attr_name })
      console.log(res)
      const res1 = await getParams(this.ParamsId, this.sel)
      console.log(res1)
      this.actionList = res1.data.data
      this.$message.success('更新成功')
    }

  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  font-size: 16px;
  margin-top: 5px;
}
.container {
  margin: 20px;
  width: 1250px;
  min-height: 500px;
  background-color: #fff;
  border-radius: 4px;
}
.el-alert {
  width: 90%;
  margin-left: 40px;
  transform: translateY(20px);
}
.block {
  margin: 0px 40px;
  margin-top: 35px;
  font-size: 20px;
}
.el-tabs {
  margin-left: 40px;
  margin-right: 60px;
  margin-top: 15px;
}
::v-deep.el-tabs__item {
  font-size: 16px;
}
.el-table {
  margin-top: 20px;
}
.el-tag {
  margin-left: 10px;
  margin-right: 5px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
