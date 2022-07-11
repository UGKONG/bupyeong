<template>
  <li @click="click">
    <div img><div :style="imgStyle" /></div>
    <div info>
      <p title v-text="item.title || item.mediaTitle" />
      <p date v-text="item.date || item.writeDT" />
    </div>
  </li>
</template>

<script>
import tempImg from "@images/tempImg.png";

export default {
  props: {
    id: String,
    item: Object,
  },
  data: () => ({
    tempImg,
  }),
  methods: {
    click() {
      if (this.id == this.item.id) return;
      this.$router.push("/StartCity/D-LAB/Media/" + this.item.id);
    },
  },
  computed: {
    imgStyle() {
      return {
        backgroundImage: "url(" + (this.item.imgPath || this.tempImg) + ")",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
$size: 70px;

li {
  @include flex(center);
  margin-bottom: 14px;
  height: $size;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    div[img] > div {
      transform: scale(1.1);
    }
    div[info] {
      color: $black;
    }
  }
  div[img] {
    width: $size;
    height: $size;
    overflow: hidden;

    & > div {
      @include wrap(block);
      @include background-reset(cover);
      transition: 0.3s;
    }
  }
  div[info] {
    @include font(13px, 400, $gray);
    width: calc(100% - $size);
    align-self: stretch;
    padding: 3px 6px;

    & > p {
      height: calc(100% - 16px);
      padding-bottom: 4px;
    }
    [date] {
      font-size: 12px;
      height: 16px;
      padding-bottom: 0;
      padding-left: 2px;
    }
  }
}
</style>