<template>
  <li>
    <div @click="click" img><div :style="img" /></div>
    <div @click="click" info>
      <p title v-text="item.mediaTitle" />
      <p v-if="item.type == 1" sub>Live</p>
      <p v-else sub>{{ item.date || item.writeDT }}</p>
    </div>
  </li>
</template>

<script>
import tempImg from "@images/tempImg.png";

export default {
  props: {
    id: String,
    item: Object,
    idx: Number,
  },
  data: () => ({
    tempImg,
  }),
  methods: {
    click() {
      this.$router.push(
        "/StartCity/PublicHearing/" + this.id + "/Media/" + this.item.id
      );
    },
  },
  computed: {
    img() {
      return {
        backgroundImage: "url(" + (this.item.imgPath || this.tempImg) + ")",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
$size: 182px;
$margin: 10px;
$infoH: 50px;
li {
  @include border();
  @include size($size, $size);
  margin-right: $margin;
  margin-bottom: $margin;
  overflow: hidden;
  position: relative;
  cursor: pointer;

  &:first-of-type > [img]::after {
    content: "● LIVE";
    color: #f00;
    text-shadow: 0 0 3px #fff;
    font-weight: 700;
    position: absolute;
    bottom: 4px;
    right: 4px;
    display: block;
  }
  [img] {
    height: calc(100% - $infoH);
    overflow: hidden;
    &:hover > div {
      transform: scale(1.1);
    }
    & > div {
      @include wrap(block);
      @include background-reset(cover);
      transition: 0.3s;
    }
  }
  [info] {
    height: $infoH;

    p {
      height: 50%;
      @include text-overflow();
      padding: 2px 4px;

      &:last-of-type {
        @include font(13px, 400, $gray, 1px);
      }
    }
  }
}
</style>