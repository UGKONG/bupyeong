<template>
  <li :class="type" @click="click">
    <div img>
      <img :src="item.imgPath" alt="사업기록 이미지" />
    </div>
    <div name>
      <span>{{ item.title }}</span>
    </div>
    <div date v-text="item.writeDT" />
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    idx: Number,
    type: {
      type: String,
      default: "img",
    },
  },
  methods: {
    click() {
      this.$router.push("/Newdeal/BusinessRecord/" + this.item.businessSeq);
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

li {
  transition: height 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
}
li.img {
  @include li-style(calc(100% / 5 - 8px), 200px, 5px 10px 5px 0);
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
  }
  [date] {
    @include date-style(3px, 12px);
  }
}
li.text {
  @include li-style(100%, 100px, 5px 0);
  @include flex(flex-start);
  [img] {
    @include img-wrap(150px, 100%);
    min-width: 150px;
    img {
      @include img-size();
    }
  }
  [name] {
    @include name-font(20px);
    padding: 0 40px;
    flex: 1;
    justify-content: flex-start;
    overflow: hidden;
  }
  [date] {
    @include date-style(10px, 14px);
  }
}

@media screen and (max-width: 900px) {
  li.img {
    @include li-style(calc(100% / 4 - 8px), 200px, 5px 10px 5px 0);
    &:nth-of-type(4n) {
      margin: 5px 0px !important;
    }
    &:nth-of-type(5n) {
      margin: 5px 10px 5px 0;
    }
  }
  li.text {
    [name] {
      padding: 0 20px;
    }
  }
}
@media screen and (max-width: 800px) {
  li.img {
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
  li.img {
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
  li.img {
    @include li-style(calc(100% / 2 - 8px), 170px, 5px 10px 5px 0);

    &:nth-of-type(3n) {
      margin: 5px 10px 5px 0 !important;
    }
    &:nth-of-type(2n) {
      margin: 5px 0px !important;
    }
  }
  li.text {
    height: 70px;
    [img] {
      @include img-wrap(100px, 100%);
      min-width: 100px;
    }
    [name] {
      padding: 0 10px 20px;
    }
  }
}
@media screen and (max-width: 350px) {
  li.img {
    @include li-style(100%, 170px, 5px 0);

    &:nth-of-type(1n),
    &:nth-of-type(2n),
    &:nth-of-type(3n),
    &:nth-of-type(4n),
    &:nth-of-type(5n) {
      margin: 5px 0px !important;
    }
  }
  li.text {
    height: 50px;
    [img] {
      @include img-wrap(70px, 100%);
      min-width: 70px;
    }
    [name] {
      padding: 0 5px 16px;
    }
    [date] {
      @include date-style(4px, 6px);
    }
  }
}
</style>