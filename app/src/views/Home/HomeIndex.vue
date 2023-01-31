<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <GoodsRank></GoodsRank>
    <GuessLike></GuessLike>
    <ItemFloor></ItemFloor>
    <ItemFloor></ItemFloor>
    <BrandShow></BrandShow>
    <!-- <button @click="add">点我加1</button>
    <span>仓库的数据{{ count }}</span>
    <button @click="">点我减1</button> -->
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer.vue";
import TodayRecommend from "./TodayRecommend/TodayRecommend.vue";
import GoodsRank from "./GoodsRank/GoodsRank.vue";
import GuessLike from "./GuessLike/GuessLike.vue";
import ItemFloor from "./ItemFloor/ItemFloor.vue";
import BrandShow from "./BrandShow/BrandShow.vue";
// import { mapState } from "vuex";
export default {
  name: "HomeIndex",
  components: {
    ListContainer,
    TodayRecommend,
    GoodsRank,
    GuessLike,
    ItemFloor,
    BrandShow,
  },
  // computed: {
  //   ...mapState("home", ["count"]),
  // },
  data() {
    return {};
  },

  mounted() {},

  // methods: {
  //   add() {
  //     // 派发action
  //     this.$store.dispatch("home/add");
  //   },
  // },
};
</script>

<style lang="less" scoped>
</style>