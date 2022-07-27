<template>
  <div>
    <!-- 面包屑部分 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home/welcome' }"
        >首页</el-breadcrumb-item
      >
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 表格部分 -->
    <div class="container">
      <el-input
        placeholder="请输入内容"
        v-model="SearchOrder"
        class="txt"
        clearable
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="searchTxt"
        ></el-button>
      </el-input>
      <el-table
        :data="goods"
        border
        style="width: 95%"
        :row-style="{ height: '60px' }"
        stripe
      >
        <el-table-column prop="" label="#" width="70" type="index">
        </el-table-column>
        <el-table-column prop="order_number" label="订单编号" width="220">
        </el-table-column>
        <el-table-column prop="order_price" label="订单价格" width="160">
        </el-table-column>
        <el-table-column prop="order_pay" label="是否付款">
          <template slot-scope="scope">
            <el-button
              type="danger"
              size="small"
              v-if="scope.row.order_pay == 0"
              >未支付</el-button
            >
            <el-button type="success" size="small" v-else>已支付</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货"> </el-table-column>
        <el-table-column prop="update_time" label="下单时间">
          <template v-slot="scope">
            {{ scope.row.update_time | formatDate }}
          </template>
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
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改收货地址" :visible.sync="dialogVisible" width="50%">
        <span
          ><el-cascader
            v-model="value"
            :options="options"
            @change="handleChange"
          ></el-cascader
        ></span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </span>
      </el-dialog>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getOrders } from '@/api/orders'
import moment from 'moment'
export default {
  created() {
    this.getOrdersList()
  },
  data() {
    return {
      SearchOrder: '',
      obj: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      goods: [],
      dialogVisible: false,
      options: [{
        value: 'zhinan',
        label: '北京',
        children: [{
          value: 'shejiyuanze',
          label: '朝阳区',
          children: [{
            value: 'yizhi',
            label: '朝阳大剧场'
          }]
        }]
      }],
      total: '',
      value: ''

    }
  },
  methods: {
    async getOrdersList() {
      this.obj.query = this.SearchOrder
      const res = await getOrders(this.obj)
      console.log(res)
      this.goods = res.data.data.goods
      this.total = res.data.data.total
    },
    handleEdit(row) {
      this.dialogVisible = true
    },
    handleChange(value) {
      console.log(value)
    },
    handleSizeChange(val) {
      this.obj.pagesize = val
      this.getOrdersList(this.obj)
    },
    handleCurrentChange(val) {
      this.obj.pagenum = val
      this.getOrdersList(this.obj)
    },
    searchTxt() {
      this.obj.query = this.SearchOrder
      this.getOrdersList()
    }
  },

  computed: {},
  watch: {

  },
  filters: {
    formatDate(time) {
      return moment(time * 1000).format('YYYY-MM-DD')
    },
    SearchOrder: function (newUrl, oldUrl) {
      if (this.SearchOrder.length === 0) {
        this.getOrdersList()
      }
      console.log(newUrl)
      console.log(oldUrl)
    }
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
  margin-right: 9px;
}
</style>
