<template>
  <div class="container">
    <el-alert
      title="添加商品信息"
      type="info"
      show-icon
      center
      :closable="false"
      style="width: 95%"
    >
    </el-alert>
    <el-steps
      :active="active"
      finish-status="success"
      style="width: 94%"
      align-center
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"> </el-step>
      <el-step
        title="商品属性"
        @click="getGoodsProp(this.$store.state.add.addGoodsParams)"
      ></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
      <el-step title="完成"></el-step>
    </el-steps>
    <el-tabs
      :tab-position="tabPosition"
      v-model="activeName"
      @tab-click="handclick"
      style="max-width: 1250px"
    >
      <el-tab-pane label="基本信息" name="0">
        <baseMsg :MsgList="MsgList"></baseMsg>
      </el-tab-pane>
      <el-tab-pane name="1">
        <div
          slot="label"
          @click.once="getParams($store.state.add.addGoodsParams)"
        >
          商品属性
        </div>
        <div v-for="(item, index) in list" :key="index">
          <el-checkbox-group v-model="checked1" size="small">
            <el-checkbox v-for="(item1, index1) in item" :key="index1" border>{{
              item1
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品属性" name="2">
        <div v-for="(item, index) in InputDate" :key="index" class="inp">
          <p>{{ item.attr_name }}</p>
          <el-input v-model="input" style="width: 95%"></el-input>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品图片" name="3"><imgGoods></imgGoods></el-tab-pane>
      <el-tab-pane label="商品内容" name="4"
        ><textGoods></textGoods
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import baseMsg from './components/baseMsg.vue'
import imgGoods from './components/imgGoods'
import textGoods from './components/textGoods.vue'
import { getAddList, getParams } from '@/api/addgoods'
export default {
  created() {
    this.getMsgList()
    this.getParams(this.$store.state.add.addGoodsParams)
  },
  data() {
    return {
      active: 0,
      tabPosition: 'left',
      activeName: 0,
      type: 3,
      MsgList: [],
      sel: 'many',
      ParamsId: '',
      ParamsDate: [],
      checkBoxList: [],
      PropGoods: '',
      InputDate: [],
      checked1: [],
      list: [],
      idParams: null
    }
  },
  methods: {
    handclick() {
      this.active = this.activeName
      this.active = this.active - 0
    },
    async getMsgList() {
      try {
        const res = await getAddList(this.type)
        this.MsgList = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    async getParams(id) {
      this.ParamsId = id
      if (this.list.length === 0) {
        const res = await getParams(this.ParamsId, this.sel)
        console.log('res', res)
        this.ParamsDate = res.data.data
        // 将数据中的字符串转换成数组
        this.ParamsDate.forEach(item => {
          this.list[this.list.length] = item.attr_vals.split(' ')
        })
      }
      console.log('111', this.list)
    },
    async getGoodsProp(id) {
      this.PropGoods = id
      this.sel = 'only'
      const res = await getParams(this.PropGoods, this.sel)
      this.InputDate = res.data.data
      console.log('123213123', res)
    }
  },
  computed: {
  },
  watch: {
    $route: function () {
      this.$route.meta.showTag = true
      window.history.go(-1)
    }
  },
  filters: {

  },
  components: { baseMsg, imgGoods, textGoods }
}
</script>

<style scoped lang="less">
.container {
  margin: 20px;
  width: 1250px;
  min-height: 500px;
  background-color: #fff;
  border-radius: 4px;
  .el-alert {
    margin: 20px 28px;
    height: 40px;
    ::v-deep .el-alert__title {
      font-size: 16px;
    }
  }
  .el-steps {
    margin-left: 40px;
  }
  .el-tabs {
    margin-top: 20px;
    margin-left: 25px;
  }
  ::v-deep .el-tabs__item {
    font-size: 16px;
    padding-top: 10px;
  }
}
</style>
