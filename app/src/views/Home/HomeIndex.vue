<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <GoodsRank></GoodsRank>
    <GuessLike></GuessLike>
    <ItemFloor
      v-for="floor in floorList"
      :key="floor.id"
      :floorObj="floor"
    ></ItemFloor>
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
import { mapState } from "vuex";
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

  mounted() {
    this.$store.dispatch("home/floorList");
    // 获取用户信息
    this.$store.dispatch("user/getUserInfo");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },

  methods: {},
};
</script>

<style lang="less" scoped>
</style>