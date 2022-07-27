<template>
  <div>
    <!-- 面包屑部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格部分 -->
    <div class="container">
      <el-button type="primary" class="add_user" @click="dialogUser = true"
        >添加角色</el-button
      >
      <el-dialog
        title="添加角色"
        :visible.sync="dialogUser"
        width="50%"
        @close="handleAddClose"
      >
        <el-form
          label-width="80px"
          ref="UserAddFormRef"
          :model="UserAddForm"
          :rules="rules"
        >
          <el-form-item label="角色名称" prop="roleName">
            <el-input v-model="UserAddForm.roleName"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="roleDesc">
            <el-input v-model="UserAddForm.roleDesc"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogUser = false">取 消</el-button>
          <el-button type="primary" @click="addRolesRight">确 定</el-button>
        </span>
      </el-dialog>
      <el-table
        :data="userlist"
        border
        style="width: 95%"
        :row-style="{ height: '60px' }"
        stripe
      >
        <el-table-column type="expand" label="#">
          <template v-slot="{ row }">
            <el-row
              v-for="(item, index) in row.children"
              :key="index"
              type="flex"
              align="middle"
              style="border-bottom: 1px solid #f4f2f2"
            >
              <!--一级-->
              <el-col :span="6">
                <el-button type="primary" plain size="medium">{{
                  item.authName
                }}</el-button>
                <template> <i class="el-icon-caret-right"></i> </template>
              </el-col>
              <el-col :span="18">
                <!--二级-->
                <el-row
                  v-for="(item1, index1) in item.children"
                  :key="index1"
                  class="rower"
                >
                  <el-col :span="5">
                    <el-row
                      ><div class="grid-content bg-purple-light">
                        <el-button type="success" plain size="medium">{{
                          item1.authName
                        }}</el-button>
                        <template>
                          <i class="el-icon-caret-right"></i>
                        </template>
                      </div>
                    </el-row>
                  </el-col>
                  <el-col :span="16">
                    <!--三级-->
                    <el-row type="flex" align="middle">
                      <el-tag
                        v-for="(item2, index2) in item1.children"
                        :key="index2"
                        closable
                        @close="delRoles(row, item2, item1)"
                      >
                        {{ item2.authName }}
                      </el-tag>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column prop="" label="#" width="70" type="index">
        </el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="220">
        </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="400">
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click="handleEdit(scope.row)"
              icon="el-icon-edit"
              size="small"
              class="edirBtn"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              size="small"
              >删除</el-button
            >
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="getPermissionList(scope.row)"
              size="small"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="分配权限" :visible.sync="dialogVisible" width="50%">
      <el-tree
        :data="permissionList"
        show-checkbox
        node-key="id"
        :props="defaultProps"
        default-expand-all
        :default-checked-keys="defaultList"
        ref="TreeRef"
        @check-change="handleClick"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogUser = false">取 消</el-button>
        <el-button type="primary" @click="getDate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, getPermission, RoleRight, AddRoles, DelectRole, deleteRole } from '@/api/userlist'
import Collapse from './components/Collapse'
export default {
  created() {
    this.getRole()
  },
  data() {
    return {
      userlist: [],
      type: '<',
      dialogVisible: false,
      data: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'authName'
      },
      permission: 'tree',
      permissionList: [],
      defaultList: [],
      SelectHandliClick: '',
      RowId: '',
      dialogUser: false,
      UserAddForm: {
        roleName: '',
        roleDesc: ''
      },
      rules: {
        roleName: [
          { required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        RoleDescription: [
          { required: true, message: '角色描述不能为空', trigger: 'blur' }

        ]
      },
      RolesData: [],
      dynamicTags: ['标签一', '标签二', '标签三']
    }
  },
  methods: {
    async getRole() {
      const res = await getRoleList()
      this.userlist = res.data.data
    },
    async getPermissionList(row) {
      console.log(111, row)
      this.RowId = row.id
      const list1 = []
      // 截取children里面的id属性，递归的方式
      function fnTree(list) {
        list.forEach(item => {
          if (item.children) {
            console.log(item.children)
            fnTree(item.children)
          } else {
            list1.push(item.id)
          }
        })
      }
      fnTree(row.children)
      this.defaultList = list1
      console.log('123', this.defaultList)
      this.dialogVisible = true
      const res = await getPermission(this.permission)
      console.log(res)
      this.permissionList = res.data.data
    },
    handleClick() {
      // 获取子节点的勾选元素
      this.SelectHandliClick = this.$refs.TreeRef.getCheckedKeys()
      this.SelectHandliClick = this.SelectHandliClick.join(',')
    },
    async getDate() {
      this.dialogVisible = false
      const res1 = await RoleRight(this.RowId, this.SelectHandliClick)
      console.log(res1)
      this.getRole()
      if (res1.data.meta.status === 200) {
        this.$message.success('更新成功')
      }
    },
    async addRolesRight() {
      console.log(this.UserAddForm)
      const res = await AddRoles(this.UserAddForm)
      console.log(res)
      if (res.data.meta.status === 201) {
        this.$message.success('创建成功')
        this.dialogUser = false
        this.getRole()
      }
    },
    handleAddClose() {
      this.$refs.UserAddFormRef.resetFields()
    },
    async handleDelete(row) {
      console.log(row)
      const res = await DelectRole(row.id)
      this.getRole()
      this.$message.success('删除成功')
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    async delRoles(row, item2, item1) {
      console.log('row', row)

      const res = await deleteRole(row.id, item2)
      item1.children = item1.children.filter(item => item.id !== item2.id)
      this.$message.success('删除成功')
    }

  },

  computed: {},
  watch: {

  },
  filters: {
  },
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
  min-height: 700px;
  background-color: #fff;
  border-radius: 4px;
  .txt {
    width: 360px;
    height: 40px;
    border-radius: 5px;
    margin: 20px 20px;
  }
  .el-table {
    margin-left: 20px;
    margin-bottom: 20px;
  }
}
::v-deep.el-table tr {
  width: 60px;
}
.el-pagination {
  margin: 20px 20px;
  padding-bottom: 10px;
  .el-input__inner {
    width: 30px;
  }
}
::v-deep.el-form-item {
  margin-right: 20px;
}
.edirBtn {
  margin-right: 0px;
}
.add_user {
  margin: 20px 20px;
}
.el-row {
  margin-bottom: 10px;
}
.el-tag {
  margin-right: 10px;
  font-size: 14px;
}
::v-deep .el-button {
  padding: 9px 17px;
}
.rower {
  display: flex;
  border-bottom: 1px solid #f4f2f2;
}
</style>
