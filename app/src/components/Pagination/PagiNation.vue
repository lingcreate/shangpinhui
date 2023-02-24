<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="$emit('sentPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-show="startNumAndendNum.start > 1"
      @click="$emit('sentPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-show="startNumAndendNum.start > 2">...</button>
    <button
      v-for="(page, index) in continuesArray"
      :key="index"
      @click="$emit('sentPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <button v-show="startNumAndendNum.end < totalPage - 1">...</button>
    <button
      v-show="startNumAndendNum.end < totalPage"
      @click="$emit('sentPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == startNumAndendNum.end"
      @click="$emit('sentPageNo', pageNo + 1)"
    >
      下一页
    </button>
    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "pagiNation",

  data() {
    return {};
  },
  props: ["pageNo", "pageSize", "total", "continues"],
  mounted() {},
  computed: {
    // 当前数据总页数
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续页码的起始和结束数字
    startNumAndendNum() {
      let { totalPage, pageNo, continues } = this;
      let start = 0,
        end = 0;
      // 1、数据页少于展示页
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        // 数据页多于展示页时(正常情况)
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
    // continues展示的区间
    continuesArray() {
      let start = this.startNumAndendNum.start;
      let end = this.startNumAndendNum.end;
      let array = [];
      for (let i = start; i <= end; i++) {
        array.push(i);
      }
      return array;
    },
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
