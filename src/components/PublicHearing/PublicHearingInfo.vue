<template>
  <div wrap>
    <img :src="data.phTitleImageURL" alt="공청회 대표 이미지" />
    <div info>
      <p><b>공청회 제목</b> : {{ data.phTitle }}</p>
      <p><b>공청회 위치</b> : {{ data.phPosition }}</p>
      <p><b>공청회 시간</b> : 2022년 05월 05일 10시00분</p>
      <p><b>공청회 설명</b></p>
      <span>{{ data.phContents }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: [Object, String],
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[wrap] {
  @include flex(flex-start);
  @include font(14px, auto, $gray, 1px);
  @include border();
  overflow: auto;
  min-height: 200px;
  max-height: 200px;
  margin-bottom: 20px;
  overflow: hidden;

  & > img {
    height: 200px;
  }
  & > div[info] {
    width: 100%;
    height: 200px;
    padding: 20px;
    overflow: auto;
    p {
      line-height: 30px;
      b {
        color: $black;
      }
    }
  }

  @media screen and (max-width: 900px) {
    min-height: 140px;
    max-height: 140px;
    & > img {
      height: 140px;
    }
    & > div[info] {
      height: 140px;
    }
  }
  @media screen and (max-width: 700px) {
    min-height: 110px;
    max-height: 110px;
    & > img {
      height: 110px;
    }
    & > div[info] {
      height: 110px;
    }
  }
  @media screen and (max-width: 500px) {
    flex-flow: column;
    min-height: unset;
    max-height: unset;
    & > img {
      width: 100%;
      height: auto;
    }
    & > div[info] {
      height: auto;
    }
  }
}
</style>