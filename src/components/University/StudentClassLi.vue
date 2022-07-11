<template>
  <li wrap>
    <h4>
      {{ item.className }}
      <span v-if="width >= 90">수강완료</span>
    </h4>
    <div time>
      <span>강의 시청 시작 : <span time-data v-text="item.startDTTM" /></span>
      <span>강의 시청 종료 : <span time-data v-text="item.endDTTM" /></span>
    </div>
    <div progress>
      <span>이수율</span>
      <div bar><div :style="{ width: width + '%' }" /></div>
      <span v-text="width + '%'" />
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
  },
  computed: {
    width() {
      let now = this.item.nowLength;
      let all = this.item.allLength;
      let calc = now == 0 && all == 0 ? 0 : (now / all) * 100;
      return Math.round(calc);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li[wrap] {
  padding: 14px;
  border: 1px solid $whiteGray;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0;
  }
  h4 {
    position: relative;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 10px;

    span {
      position: absolute;
      top: 0;
      right: 0;
      color: $activeColor;
      font-size: 14px;
    }
  }
  [time],
  [progress] {
    @include flex(space-between);
    margin-bottom: 10px;
  }
  [progress] {
    margin-bottom: 0;
    [bar] {
      width: 100%;
      border: 1px solid $whiteGray;
      height: 16px;
      div {
        height: 100%;
        background-color: $activeColor;
      }
    }
    span {
      &:first-of-type {
        width: 60px;
        min-width: 60px;
      }
      &:last-of-type {
        width: 50px;
        min-width: 50px;
        text-align: right;
      }
    }
  }
}

@media screen and (max-width: 499px) {
  [time] {
    flex-flow: column !important;
    & > span {
      width: 100%;
      margin-bottom: 4px;
      [time-data] {
        width: 100% !important;
      }
    }
  }
}
</style>