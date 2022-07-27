<template>
  <HappyScroll color="rgba(6,6,13,0.3)" size="10" resize>
    <div class="scroll">
      <div>
        <!-- 面包屑部分 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home/welcome' }"
            >首页</el-breadcrumb-item
          >
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 表格部分 -->
        <div class="container" v-show="$route.meta.showTag">
          <el-input
            placeholder="请输入内容"
            v-model="SearchUser"
            class="txt"
            clearable
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList"
            ></el-button>
          </el-input>
          <el-button type="primary" @click="addGoods">添加商品</el-button>
          <el-table
            :data="GoodsList"
            border
            style="width: 95%"
            :row-style="{ height: '60px' }"
            stripe
          >
            <el-table-column prop="" label="#" width="70" type="index">
            </el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="180">
            </el-table-column>
            <el-table-column prop="goods_price" label="商品价格" width="180">
            </el-table-column>
            <el-table-column prop="goods_weight" label="商品重量">
            </el-table-column>
            <el-table-column prop="add_time" label="创建时间">
              <template v-slot="scope">
                {{ scope.row.add_time | formatDate }}
              </template>
            </el-table-column>
            <!-- 操作栏 -->
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
        </div>
        <router-view></router-view>
      </div>
    </div>
  </HappyScroll>
</template>

<script>
import { getList } from '@/api/goods'
import moment from 'moment'
import { HappyScroll } from 'vue-happy-scroll'
// 引入css，推荐将css放入main入口中引入一次即可。
import 'vue-happy-scroll/docs/happy-scroll.css'
export default {
  created() {
    this.getGoodsList()
  },
  data() {
    return {
      valueSwitch: true,
      SearchUser: '',
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      GoodsList: [],
      total: '',
      addflag: true
    }
  },
  methods: {
    // 渲染页面数据
    async getGoodsList() {
      this.obj.query = this.SearchUser
      try {
        const res = await getList(this.obj)
        this.GoodsList = res.data.data.goods
        console.log(res)
        this.total = res.data.data.total
      } catch (error) {
        console.log(error)
      }
    },
    handleSizeChange(val) {
      this.obj.pagesize = val
      this.getGoodsList(this.obj)
    },
    handleCurrentChange(val) {
      this.obj.pagenum = val
      this.getGoodsList(this.obj)
    },
    addGoods() {
      this.$route.meta.showTag = false
      this.$router.push('/home/goodslist/add')
    }
  },

  computed: {},
  watch: {
    $route: function (newUrl, oldUrl) {
      // console.log(newUrl)
      if (newUrl.path === '/home/goodslist') {
        this.$route.meta.showTag = true
      }
    },
    // 监视如果输入框中为空时，则重新渲染数据
    SearchUser: function (newUrl, oldUrl) {
      if (this.SearchUser.length === 0) {
        this.getGoodsList()
      }
      console.log(newUrl)
      console.log(oldUrl)
    }
  },
  filters: {
    formatDate(time) {
      return moment(time * 1000).format('YYYY-MM-DD')
    }
  },
  components: { HappyScroll }
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  font-size: 16px;
  margin-top: 5px;
}
.container {
  position: absolute;
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
