<template>
  <div>
    <el-container class="container">
      <el-header>
        <h2>erp后台管理系统</h2>

        <el-button type="primary" class="quit" @click.native="logout"
          >退出</el-button
        >
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '65px' : '250px'" v-model="isCollapse">
          <el-button @click="isCollapse = !isCollapse" class="collapse"
            >| | |</el-button
          >
          <el-menu
            background-color="#199edf"
            text-color="#fff"
            unique-opened
            :collapse="isCollapse"
            :collapse-transition="false"
            @select="menuClick"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-user"></i>
                <span slot="title">用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/users"
                  ><i class="el-icon-menu fff"></i>用户列表</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-order fff"></i>
                <span slot="title">权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/userlist"
                  ><i class="el-icon-menu fff"></i>角色列表</el-menu-item
                >
                <el-menu-item index="/home/permissionmanager"
                  ><i class="el-icon-menu fff"></i>权限列表</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-goods fff"></i>
                <span slot="title">商品管理</span>
              </template>
              <el-menu-item index="/home/goodslist"
                ><i class="el-icon-menu fff"></i>商品列表</el-menu-item
              >
              <el-menu-item index="/home/categoriesparams"
                ><i class="el-icon-menu fff"></i>分类参数</el-menu-item
              >
              <el-menu-item index="/home/categoriesgoods"
                ><i class="el-icon-menu fff"></i>商品分类</el-menu-item
              >
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-s-order fff"></i>
                <span slot="title">订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/home/orders"
                  ><i class="el-icon-menu fff"></i>订单列表</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="">
              <template slot="title">
                <i class="el-icon-s-marketing fff"></i>
                <span slot="title">数据统计</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1"
                  ><i class="el-icon-menu fff"></i>订单列表</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main><router-view>
          </router-view></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  created() { },
  data() {
    return {
      isCollapse: false
    }
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push('/login')
    },
    menuClick(index) {
      this.$router.push(index)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  height: 100vh;
  .el-header {
    background-color: #fff;
    h2 {
      line-height: 60px;
    }
  }
  .fff {
    color: #fff;
  }
  .el-aside {
    border-top: 1px solid #fbfffd;
    background-color: #199edf;
  }
  .el-main {
    background-color: #eaedf1;
  }
  /deep/ .el-submenu__title i {
    color: #fff;
    font-size: 16px;
  }
  /deep/ .el-submenu__title {
    font-size: 17px;
    i {
      font-size: 17px;
    }
  }
  .el-menu {
    padding-top: 20px;
    .el-submenu {
      padding-top: 15px;
      .el-menu-item {
        font-size: 17px;
      }
    }
  }
  .quit {
    background-color: #199edf;
    position: absolute;
    right: 30px;
    top: 10px;
  }
  /deep/.collapse {
    width: 250px;
    background-color: #fbfffd;
    font-size: 20px;
    font-weight: 400;
  }
}
.el-aside::-webkit-scrollbar {
  display: none;
}
.el-menu-item.is-active {
  color: #fff;
  background-color: #147eb2;
}
.el-button {
  border-radius: 0px;
}
</style>
