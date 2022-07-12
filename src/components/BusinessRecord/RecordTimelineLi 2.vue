<template>
  <li>
    <div left true v-if="idx % 2 == 0">
      <img :src="item.imgPath" alt="타임라인 이미지" @click="click" />
      <p>{{ item.title }}</p>
      <span>{{ item.businessDT }}</span>
    </div>
    <div left v-if="idx % 2 != 0"></div>
    <!-- <div line></div> -->
    <div right true v-if="idx % 2 != 0">
      <img :src="item.imgPath" alt="타임라인 이미지" @click="click" />
      <p>{{ item.title }}</p>
      <span>{{ item.businessDT }}</span>
    </div>
    <div right v-if="idx % 2 == 0"></div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
    id: String,
  },
  methods: {
    click() {
      this.$router.push(
        "/Newdeal/BusinessRecord/" + this.id + "/" + this.item.recordSeq
      );
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

$lineW: 4px;
$lineH: 100px;
$lineSideW: 100px;
$barW: 80px;
$barColor: #000;

@mixin bar() {
  content: "";
  background-color: $barColor;
  width: $barW;
  height: $lineW;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

li {
  @include flex(space-between);

  & > div {
    width: 50%;
    min-height: $lineH;
    position: relative;
    flex-wrap: wrap;
    align-self: stretch;
    &:hover > img {
      transform: scale(1.2);
      z-index: 5;
    }

    & > img {
      width: 200px;
      transition: 0.3s;
    }
    & > p {
      width: 100%;
    }
    & > span {
      position: absolute;
      top: 50%;
      transform: translateY(calc(-100% - 4px));
      font-weight: 500;
    }
  }
  [left] {
    text-align: right;
    padding-right: $lineSideW;
    padding-left: 20px;
    @include flex(flex-end);
    border-right: 2px solid $barColor;
    &[true]::before {
      @include bar();
      right: 0;
    }
    & > span {
      right: 4px;
    }
  }
  [right] {
    text-align: left;
    padding-left: $lineSideW;
    padding-right: 20px;
    @include flex(flex-start);
    flex-direction: row-reverse;
    border-left: 2px solid $barColor;
    &[true]::before {
      @include bar();
      left: 0;
    }
    & > span {
      left: 4px;
    }
  }
  [line] {
    width: $lineW;
    height: 100%;
    background-color: $barColor;
  }
}
li[true] {
  cursor: pointer;
}
</style>