<template>
  <li @click="click">
    <div img>
      <img
        :src="item.imgPath || item.phTitleImageURL || tempImg"
        alt="기록물 이미지"
      />
    </div>
    <div name>
      <span>{{ item.phTitle }}</span>
    </div>
    <div date>작성일: {{ item.writeDT }}</div>
  </li>
</template>

<script>
import tempImg from "@public/images/tempImg.png";
export default {
  props: {
    item: Object,
    idx: Number,
  },
  data: () => ({
    tempImg,
  }),
  methods: {
    click() {
      this.$router.push("/StartCity/PublicHearing/" + this.item.phSeq);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
@mixin img-wrap($w, $h) {
  width: $w;
  height: $h;
  overflow: hidden;
}
@mixin img-size() {
  width: 100%;
  height: 100%;
  transition: 0.3s;
}
@mixin date-style($position, $size) {
  position: absolute;
  right: $position;
  bottom: $position;
  font-size: $size;
  color: $gray;
}
@mixin name-font($size) {
  font-size: $size;
  font-weight: 500;
}
@mixin li-style($w, $h, $margin) {
  width: $w;
  height: $h;
  margin: $margin;
  position: relative;
  border: 1px solid $whiteGray;
}

li {
  @include li-style(calc(100% / 5 - 8px), 200px, 5px 10px 5px 0);
  transition: height 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
  &:nth-of-type(5n) {
    margin: 5px 0px;
  }
  &:hover > [img] > img {
    transform: scale(1.1);
  }

  [img] {
    @include img-wrap(100%, 140px);
    img {
      @include img-size();
    }
  }
  [name] {
    @include flex(center);
    @include name-font(16px);
    height: 40px;
    & > span {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0 6px;
      font-size: 15px;
    }
  }
  [date] {
    @include date-style(3px, 12px);
  }
}

@media screen and (max-width: 900px) {
  li {
    @include li-style(calc(100% / 4 - 8px), 200px, 5px 10px 5px 0);
    &:nth-of-type(4n) {
      margin: 5px 0px !important;
    }
    &:nth-of-type(5n) {
      margin: 5px 10px 5px 0;
    }
  }
}
@media screen and (max-width: 800px) {
  li {
    @include li-style(calc(100% / 4 - 8px), 170px, 5px 10px 5px 0);
    &:nth-of-type(4n) {
      margin: 5px 0px !important;
    }
    &:nth-of-type(5n) {
      margin: 5px 10px 5px 0;
    }
    [img] {
      @include img-wrap(100%, 110px);
    }
  }
}
@media screen and (max-width: 700px) {
  li {
    @include li-style(calc(100% / 3 - 8px), 170px, 5px 10px 5px 0);
    &:nth-of-type(3n) {
      margin: 5px 0px !important;
    }
    &:nth-of-type(4n) {
      margin: 5px 10px 5px 0 !important;
    }
  }
}
@media screen and (max-width: 500px) {
  li {
    @include li-style(calc(100% / 2 - 8px), 170px, 5px 10px 5px 0);

    &:nth-of-type(3n) {
      margin: 5px 10px 5px 0 !important;
    }
    &:nth-of-type(2n) {
      margin: 5px 0px !important;
    }
  }
}
@media screen and (max-width: 350px) {
  li {
    @include li-style(100%, 170px, 5px 0);

    &:nth-of-type(1n),
    &:nth-of-type(2n),
    &:nth-of-type(3n),
    &:nth-of-type(4n),
    &:nth-of-type(5n) {
      margin: 5px 0px !important;
    }
  }
}
</style>