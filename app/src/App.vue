<template>
  <div>
    <HeaderIndex></HeaderIndex>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在home、search显示，login、register隐藏 -->
    <FooterIndex v-show="$route.meta.show == true"></FooterIndex>
  </div>
</template>

<script>
import HeaderIndex from "./components/Header/HeaderIndex.vue";
import FooterIndex from "./components/Footer/FooterIndex.vue";
export default {
  name: "APP",
  components: {
    HeaderIndex,
    FooterIndex,
  },
};
</script>

<style lang="less" scoped>
</style>