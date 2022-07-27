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
    <!-- 表格部分 -->
    <div class="container">
      <el-input
        placeholder="请输入内容"
        v-model="SearchUser"
        class="txt"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchTxt"
        ></el-button>
      </el-input>
      <el-button type="primary" @click="dialogVisible = true"
        >添加用户</el-button
      >
      <el-dialog
        title="添加用户对话框"
        :visible.sync="dialogVisible"
        width="50%"
        @close="handleAddClose"
      >
        <el-form :model="UserForm" :rules="rules" ref="UserFormRef">
          <el-form-item
            label="用户名"
            :label-width="formLabelWidth"
            prop="username"
          >
            <el-input v-model="UserForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            :label-width="formLabelWidth"
            prop="password"
          >
            <el-input v-model="UserForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="UserForm.email" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="手机号"
            :label-width="formLabelWidth"
            prop="mobile"
          >
            <el-input v-model="UserForm.mobile" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser(UserForm)">确 定</el-button>
        </div>
      </el-dialog>
      <el-table
        :data="userMsg"
        border
        style="width: 95%"
        :row-style="{ height: '60px' }"
        stripe
      >
        <el-table-column prop="" label="#" width="70" type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <!-- 操作栏 -->
        <el-table-column prop="date" label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              @click.stop="handleEdit(scope.row)"
              icon="el-icon-edit"
              size="small"
              class="edirBtn"
            ></el-button>
            <el-dialog
              title="编辑用户"
              :visible.sync="IsDialogVisible"
              width="30%"
              @close="handleEdirClose"
            >
              <el-form :model="EdirForm" :rules="rules" ref="EdirFormRef">
                <el-form-item
                  label="用户名"
                  :label-width="formLabelWidth"
                  prop="username"
                >
                  <el-input
                    v-model="EdirForm.username"
                    autocomplete="off"
                    :disabled="true"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="邮箱"
                  :label-width="formLabelWidth"
                  prop="email"
                >
                  <el-input
                    v-model="EdirForm.email"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  label="手机号"
                  :label-width="formLabelWidth"
                  prop="mobile"
                >
                  <el-input
                    v-model="EdirForm.mobile"
                    autocomplete="off"
                  ></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="IsDialogVisible = false">取 消</el-button>
                <el-button
                  type="primary"
                  @click="ringBtn(scope.$index, scope.row)"
                  >确 定</el-button
                >
              </span>
            </el-dialog>
            <el-button
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row)"
              size="small"
            ></el-button>
            <el-button
              type="warning"
              icon="el-icon-setting"
              @click="handleSet(scope.row)"
              size="small"
            ></el-button>
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
    </div>
    <el-dialog title="分配角色" :visible.sync="SelectRoles" width="30%">
      <span>当前用户：{{ CurrentUser }}</span
      ><br />
      <span>当前的角色：{{ CurrentRole }}</span
      ><br />
      <span>分配新角色：</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.roleName"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="SelectRoles = false">取 消</el-button>
        <el-button type="primary" @click="fnRight">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { userList, addUser, EdirState, EdirUser, DeleteUser, GetRole } from '@/api/user'
import { Isemail, validMobile } from '@/utils/validate'
export default {
  created() {
    this.getUserList()
  },
  data() {
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号格式不符合'))
    }
    const validateEmail = (rule, value, callback) => {
      Isemail(value) ? callback() : callback(new Error('邮箱格式不正确'))
    }
    return {
      valueSwitch: true,
      SearchUser: '',
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      userMsg: [],
      id: 1,
      total: '',
      dialogVisible: false,
      IsDialogVisible: false,
      dialogFormVisible: false,
      EdirId: '',
      UserForm: {
        username: '123',
        password: '123',
        email: '5236715236@qq.com',
        mobile: '15811111111'
      },
      EdirForm: {
        username: '',
        mobile: '',
        email: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3-8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在3到8之间', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入用户邮箱', trigger: 'blur' }, { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' }, { validator: validateMobile, trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      SelectRoles: false,
      value: '',
      CurrentUser: '',
      CurrentRole: '',
      options: []
    }
  },
  methods: {
    // 渲染页面数据
    async getUserList() {
      try {
        const res = await userList(this.obj)
        this.userMsg = res.data.data.users
        console.log(res)
        this.total = res.data.data.total
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange(val) {
      this.obj.pagesize = val
      this.getUserList(this.obj)
    },
    async handleCurrentChange(val) {
      this.obj.pagenum = val
      this.getUserList(this.obj)
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => { })
    },
    // 添加用户
    async addUser() {
      this.$refs.UserFormRef.validate(async bool => {
        if (bool) {
          const res = await addUser(this.UserForm)
          this.getUserList()
          this.dialogVisible = false
        } else {
          return this.$message.error('内容不符合')
        }
      })
      // try {
      //   const res = await addUser(this.UserForm)
      //   this.getUserList()
      //   this.dialogVisible = false
      // } catch (error) {
      //   console.log(error)
      // }
    },
    handleAddClose() {
      this.$refs.UserFormRef.resetFields()
    },
    searchTxt() {
      // 输入一个数字时，判断是否数据中是否有这个数据，并且渲染
      this.userMsg = this.userMsg.filter((item) => {
        return item.username.includes(this.SearchUser) ? item : ''
      })
    },
    async changeSwitch(item) {
      const uId = item.id
      const type = item.mg_state
      try {
        const res = await EdirState({ uId, type })
        this.$message.success('修改用户状态成功')
      } catch (error) {
        this.$message.error('修改失败，请重试')
      }
    },
    // 编辑按钮的功能
    handleEdit(item) {
      this.EdirId = item.id
      this.EdirForm.username = item.username
      this.IsDialogVisible = true
    },
    // 把修改后返回的数据再重新渲染到那一行数据
    ringBtn(index, item) {
      const id = this.EdirId
      const email = this.EdirForm.email
      const mobile = this.EdirForm.mobile
      this.$refs.EdirFormRef.validate(async bool => {
        if (bool) {
          const res = await EdirUser({ id, email, mobile })
          this.EdirForm.username = res.data.data.username
          this.getUserList()
          this.IsDialogVisible = false
        } else {
          return this.$message.error('内容不符合')
        }
      })
    },
    handleEdirClose() {
      this.$refs.EdirFormRef.resetFields()
    },
    // 删除按钮功能
    async handleDelete(item) {
      console.log(222, item.id)
      try {
        await this.$confirm('确定删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log(item)
        const id = item.id
        console.log(id)
        const res = await DeleteUser({ id })
        console.log(111, res)
        if (res.data.meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
        this.getUserList()
      } catch (error) {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    async handleSet(row) {
      console.log(row)
      this.CurrentUser = row.username
      this.CurrentRole = row.role_name
      this.SelectRoles = true
      const res = await GetRole()
      this.options = res.data.data
      console.log(res)
    },
    fnRight() {
      this.$message.error('分配失败！')
    }
  },

  computed: {},
  watch: {
    // 监视如果输入框中为空时，则重新渲染数据
    SearchUser() {
      if (this.SearchUser.length === 0) {
        this.getUserList()
      }
    }
  },
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
  .txt {
    width: 360px;
    height: 40px;
    border-radius: 5px;
    margin: 20px 20px;
  }
  .el-table {
    margin-left: 20px;
  }
}
::v-deep.el-table tr {
  width: 60px;
}
.el-pagination {
  margin: 10px 20px;
  .el-input__inner {
    width: 30px;
  }
}
::v-deep.el-form-item {
  margin-right: 20px;
}
.edirBtn {
  margin-right: 9px;
}
</style>
