<template>
  <div :class="$style.hello">
    <div :class="$style.divBox">23432423</div>
    <div :class="$style.box2">
      <div :class="$style.left">a</div>
      <div :class="$style.right">b</div>
    </div>
    <div :class="$style.box3"></div>
    <div :class="$style['msg-wrap']">
      <ul :class="$style['msg-box']" :style="isMove?msgBoxStyle:''">
        <li
          :class="['msg-item',$style['item']]"
          v-for="(item) in msgList"
          :key="item.id"
          v-html="item.value"
        ></li>
      </ul>
    </div>
    <div :class="$style.c1" id="c1">
      <img src="../assets/img/1.jpg" alt :class="$style.box" />
    </div>
    <div :class="$style.feng">
      <div :class="$style.ww">选项卡一</div>
      <div :class="$style.ww">选项卡二</div>
      <div :class="$style.ww">选项卡三</div>
      <div :class="$style.ww">选项卡四</div>
      <div :class="$style.ww">选项卡五</div>
      <div :class="$style.ww">选项卡六</div>
      <div :class="$style.ww">选项卡七</div>
      <div :class="$style.ww">选项卡八</div>
    </div>
  </div>
</template>

<script>
const sleep = delay => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, delay * 1000);
  });
};
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      msgList: [],
      isMove: false,
      moveHeight: 0
    };
  },
  created() {
    this.msgList = (function() {
      let arr = [];
      for (let i = 0; i < 10; i++) {
        arr.push({ id: i, value: i + 1 });
      }
      arr[2] = {
        id: 2,
        value: `sfsfsjdflsdjfsldfjslkdfjsdkfjsldfjsdlfkj<br/>sfjsldfjsdlfjsdlkfjkjjdk`
      };
      arr[3] = {
        id: 3,
        value: `sfsfsjdflsdjfsldfjslkdfjsdkfjsldfjsdlfkj<br/>sfjsldfjsdlfjsdlkfjkjjdk<br/>sfjslfjsldfjsdklfj`
      };
      return arr;
    })();
  },
  watch: {
    msgList: {
      deep: true,
      handler() {
        this.$nextTick(() => {
          const oFirst = document.querySelector(".msg-item");
          if (oFirst === null) return;
          this.moveHeight = oFirst.offsetHeight || 0;
        });
      }
    }
  },
  computed: {
    msgBoxStyle() {
      return `transform: translateY(-${this.moveHeight}px);transition: transform 1s;`;
    }
  },
  mounted() {
    sleep(3).then(() => {
      this.carouselFunc();
    });
    const oC1 = document.querySelector("#c1");
    const oBox = oC1.querySelector("img");
    console.log(oBox.offsetWidth);
    oC1.scrollLeft = 502;
    window.addEventListener(
      "scroll",
      () => {
        console.log(oC1.scrollLeft);
      },
      true
    );
  },
  methods: {
    carouselFunc() {
      if (!this.msgList.length) return;
      sleep(1).then(() => {
        const first = this.msgList[0];
        this.isMove = true;
        sleep(1.5).then(() => {
          this.msgList.push(first);
          this.isMove = false;
          this.msgList.shift();
          this.carouselFunc();
        });
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" module>
@import "../styles/element.scss";
.hello {
  overflow: hidden;
  // background: green;
  // font-size: 20px;
}
.divBox {
  width: 100px;
  height: 100px;
  // background: red;
  font-size: 14px;
  margin-left: 30px;;
  @include border_1px(default,yellow,solid);
  // @include font-dpr(14PX);
}
.box2{
  width: 100px;
  height: 100px;
  margin-left: 200px;
  @include border_1px(left);
  @include clearfix();
  &>.left{
    float: left;
  }
  &>.right{
    float:right;
  }
}
.box2{
  width: 100px;
  height: 100px;
  margin-left: 200px;
  border-left: 1px solid #000;
}
.msg-wrap {
  height: 300px;
  overflow: hidden;
  border: 1PX solid green;
  .msg-box {
    // padding: 5px 0;
    margin: 0;
    padding: 0;

    .item {
      display: block;
      padding: 10px 0;
      text-align: center;
      line-height: 1.4;
      transition: all 1s;
      &:not(:last-of-type) {
        border-bottom: 1PX solid #cecece;
      }
    }
  }
}
.c1 {
  margin: 200px auto 0;
  // width: 1200px;
  height: 400px;
  overflow-x: auto;
  overflow-y: hidden;
  font-size: 0;
  // display: flex;
  // flex-wrap: nowrap;
  // white-space: nowrap;
  width: 100%;
  .box {
    display: block;
    width: 860px;
    // max-width: 100%;
    color: #fff;
    height: 100%;
    // display: inline-block;
    background: green;
    flex-shrink: 0; /* 设置宽度 */
    border-left: 1px solid #eee;
    font-size: 34px;
  }
}
.feng {
  display: flex; /* 设置布局类型 */
  width: 100%; /* 设置宽度 */
  border: red 1px solid; /* 设置边框 */
  margin: 0 auto; /* 设置一下外边距 */
  padding: 10px; /* 设置内边距 */
  flex-wrap: nowrap; /* 不换行 */
  overflow-x: auto; /* 超出宽度滑动 */
}
.ww {
  width: 100px; /* 设置宽度 */
  margin: 0px 10px; /* 设置左右距离 */
  flex-shrink: 0; /* 设置宽度 */
}
</style>
