<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="good in GoodsInfo" :key="good.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="good.isChecked == 1"
              @change="ChangeChecked(good)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="good.imgUrl" />
            <div class="item-msg">
              {{ good.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ good.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCartNum('mins', -1, good)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="good.skuNum"
              minnum="1"
              class="itxt"
              @change="changeCartNum('cur', $event.target.value * 1, good)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCartNum('plus', 1, good)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ good.skuNum * good.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="javascript:void(0)"
              class="sindelet"
              @click="deleteGood(good)"
              >删除</a
            >
            <br />
            <a href="javascript:void(0)">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllChecked && GoodsInfo.length > 0"
          :disabled="GoodsInfo.length < 1"
          @change="ChangeAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="javascript:void(0)" @click="deleteSelected">删除选中的商品</a>
        <a href="javascript:void(0)">移到我的关注</a>
        <a href="javascript:void(0)">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ TotalPrice.checkedNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ TotalPrice.price }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopList();
  },
  methods: {
    // 发送请求获取数据
    getShopList() {
      this.$store.dispatch("shopcart/getShopList");
    },

    // 修改购物车数量 并添加节流
    changeCartNum: throttle(async function (type, num, good) {
      switch (type) {
        case "mins":
          if (good.skuNum > 1) {
            num = -1;
          } else {
            num = 0;
          }
          break;

        case "plus":
          num = 1;
          break;

        case "cur":
          // 带有汉字、负数的情况
          if (isNaN(num) || num < 1) {
            num = 0;
          } else {
            num = parseInt(num) - good.skuNum;
          }
          break;
      }
      try {
        // skuNum 接收正负数，表示当前商品的增减值
        await this.$store.dispatch("shopcart/getAddCart", {
          skuId: good.skuId,
          skuNum: num,
        });
        this.getShopList();
      } catch (err) {
        console.log(err);
      }
    }, 1000),

    // 删除单个商品
    async deleteGood(good) {
      try {
        await this.$store.dispatch("shopcart/deleteGood", good.skuId);
        this.getShopList();
      } catch (e) {
        alert(e);
      }
    },

    // 批量删除选中的商品
    async deleteSelected() {
      try {
        await this.$store.dispatch("shopcart/deleteSelected");
        this.getShopList();
      } catch (e) {
        alert(e);
      }
    },

    // 更改商品的选中状态
    async ChangeChecked(good) {
      try {
        let isChecked = good.isChecked == 1 ? 0 : 1;
        await this.$store.dispatch("shopcart/ChangeChecked", {
          skuId: good.skuId,
          isChecked,
        });
        this.getShopList();
      } catch (e) {
        alert(e);
      }
    },

    // 点击全选框
    async ChangeAllChecked(event) {
      // 判断点完之后是0 还是 1
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("shopcart/ChangeAllChecked", isChecked);
        this.getShopList();
      } catch (e) {
        alert(e);
      }
    },
  },
  computed: {
    ...mapGetters("shopcart", ["cartInfoList"]),
    // 购物车列表
    GoodsInfo() {
      return this.cartInfoList.cartInfoList || [];
    },
    // 总价
    TotalPrice() {
      let price = 0;
      let checked = this.GoodsInfo.filter((item) => {
        return item.isChecked == 1;
      });
      checked.forEach((item) => {
        return (price += item.skuNum * item.skuPrice);
      });
      let checkedNum = checked.length;
      return { checkedNum, price };
    },
    // 全选框
    // every遍历数组，返回布尔值
    isAllChecked() {
      return this.GoodsInfo.every((item) => item.isChecked == 1);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>