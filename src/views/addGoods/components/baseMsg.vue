<template>
  <div>
    <el-form
      label-position="top"
      label-width="80%"
      :model="formGoods"
      style="width: 90%"
      :rules="rules"
    >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="formGoods.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input-number
          v-model="formGoods.price"
          oninput="value=value.replace(/[^\d]/g,'')"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品重量" prop="weight">
        <el-input-number
          v-model="formGoods.weight"
          oninput="value=value.replace(/[^\d]/g,'')"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品数量" prop="number">
        <el-input-number
          v-model="formGoods.number"
          oninput="value=value.replace(/[^\d]/g,'')"
          controls-position="right"
          :min="1"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品分类" prop="sort">
        <div class="block">
          <el-cascader
            v-model="value"
            :options="MsgList"
            :props="{
              expandTrigger: 'hover',
              label: 'cat_name',
              value: 'cat_id',
            }"
            @change="handleChange"
          ></el-cascader>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  props: {
    MsgList: {
      type: Array,
      required: true
    }
  },
  created() {
  },
  data() {
    return {
      formGoods: {
        name: '',
        price: '',
        weight: '',
        number: '',
        sort: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        sort: [
          { required: true, message: '请输入商品分类', trigger: 'blur' }
        ]
      },
      value: ''
    }
  },
  methods: {
    handleChange(value) {
      console.log(value[value.length - 1])
      this.$store.commit('add/setGoodsParams', value[value.length - 1])
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-form-item {
  margin-bottom: 10px;
}
.el-form {
  margin-bottom: 40px;
}
.el-input-number {
  width: 100%;
}
</style>
