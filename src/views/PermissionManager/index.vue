<template>
  <div>
    <!-- 面包屑部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="container">
      <el-table ref="filterTable" :data="list" style="width: 95%" border stripe>
        <el-table-column label="#" width="80" type="index"> </el-table-column>
        <el-table-column prop="authName" label="权限名称" width="400">
        </el-table-column>
        <el-table-column prop="path" label="路径" width="500">
        </el-table-column>
        <el-table-column prop="level" label="标签" width="205">
          <template slot-scope="scope">
            <el-tag :type="Change(scope.row.level)" disable-transitions
              ><span v-if="scope.row.level == 0">等级一</span>
              <span v-if="scope.row.level == 1">等级二</span>
              <span v-if="scope.row.level == 2">等级三</span>
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { getPermissionData } from '@/api/permissionmanager'
export default {
  created() {
    this.getPermissionData()
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    async getPermissionData() {
      try {
        const res = await getPermissionData()
        this.list = res.data.data
        console.log(this.list)
      } catch (error) {
        console.log(error)
      }
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
.el-table {
  margin-left: 27px;
  position: relative;
  top: 40px;
}
</style>
