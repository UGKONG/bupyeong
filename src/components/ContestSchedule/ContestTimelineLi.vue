<template>
  <li>
    <div left true v-if="idx % 2 == 0">
      <img
        :src="item.imgPath || tempImg"
        alt="타임라인 이미지"
        @click="click"
      />
      <p>{{ item.title }}</p>
      <span>{{ item.businessDT }}</span>
    </div>
    <div left v-if="idx % 2 != 0"></div>
    <!-- <div line></div> -->
    <div right true v-if="idx % 2 != 0">
      <img
        :src="item.imgPath || tempImg"
        alt="타임라인 이미지"
        @click="click"
      />
      <p>{{ item.title }}</p>
      <span>{{ item.businessDT }}</span>
    </div>
    <div right v-if="idx % 2 == 0"></div>
  </li>
</template>

<script>
import tempImg from "@public/images/tempImg.png";
export default {
  data: () => ({
    tempImg,
  }),
  props: {
    item: Object,
    idx: Number,
  },
  created() {
    console.log(this.item.imgPath);
  },
  methods: {
    click() {
      this.$router.push("/Business/ContestSchedule/" + this.item.id);
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
    cursor: pointer;

    & > img {
      width: 200px;
      transition: 0.3s;
      &:hover {
        transform: scale(1.2);
        z-index: 5;
      }
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
    @include flex(flex-start);
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
</style>