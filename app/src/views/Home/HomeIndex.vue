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
  </div>
</template>

<script>
import ListContainer from "./ListContainer/ListContainer.vue";
import TodayRecommend from "./TodayRecommend/TodayRecommend.vue";
import GoodsRank from "./GoodsRank/GoodsRank.vue";
import GuessLike from "./GuessLike/GuessLike.vue";
import ItemFloor from "./ItemFloor/ItemFloor.vue";
import BrandShow from "./BrandShow/BrandShow.vue";

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
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
</style>