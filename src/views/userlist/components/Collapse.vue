<template>
  <div>

    <!-- <el-row>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-tag size="big">标签一</el-tag
          ><i class="el-icon-caret-right"></i></div
      ></el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple-light">
          <el-tag type="success" size="big">标签二</el-tag
          ><i class="el-icon-caret-right"></i></div
      ></el-col>
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-tag size="big">标签一</el-tag
          ><i class="el-icon-caret-right"></i></div
      ></el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple-light">
          <el-tag type="success" size="big">标签二</el-tag
          ><i class="el-icon-caret-right"></i></div
      ></el-col>
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
        </div></el-col
      >
    </el-row>
    <el-row>
      <el-col :span="6"
        ><div class="grid-content bg-purple">
          <el-tag size="big">标签一</el-tag
          ><i class="el-icon-caret-right"></i></div
      ></el-col>
      <el-col :span="4"
        ><div class="grid-content bg-purple-light">
          <el-tag type="success" size="big">标签二</el-tag
          ><i class="el-icon-caret-right"></i></div
      ></el-col>
      <el-col :span="12"
        ><div class="grid-content bg-purple">
          <el-tag
            :key="tag"
            v-for="tag in dynamicTags"
            closable
            :disable-transitions="false"
            @close="handleClose(tag)"
          >
            {{ tag }}
          </el-tag>
        </div></el-col
      >
    </el-row> -->
  </div>
</template>

<script>
export default {
  props: {
    userlist: {
      type: Array,
      required: true
    }
  },
  created() {
    this.list()
  },
  data() {
    return {
      dynamicTags: ['标签一', '标签二', '标签三'],
      levelFather: []
    }
  },
  methods: {
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
    },
    list() {
      console.log(this.userlist)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-row {
  border-top: 1px solid #ebeef5;
  margin-left: 60px;
}
.el-tag {
  width: 80px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  margin-left: 10px;
}
.el-col {
  margin: 10px 0px;
}
</style>
