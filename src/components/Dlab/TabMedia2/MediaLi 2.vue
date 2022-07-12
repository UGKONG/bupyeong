<template>
  <li>
    <div @click="click" img><div :style="bgStyle" /></div>
    <div @click="click" info>
      <p title>{{ item.mediaTitle }}</p>
      <p v-if="item.type == 1" sub>Live</p>
      <p v-else sub>{{ item.date || item.writeDT }}</p>
    </div>

    <!-- 삭제모드 -->
    <transition name="fade-transition">
      <div remove v-if="isRemoveMode">
        <button v-if="myPost" @click="remove">삭제</button>
        <span v-if="!myPost" style="color: #bbb">삭제불가</span>
      </div>
    </transition>
  </li>
</template>

<script>
import axios from "axios";
import tempImg from "@images/tempImg.png";
import { useAlert } from "@hook";

export default {
  props: {
    idx: Number,
    item: Object,
    isRemoveMode: Boolean,
  },
  data: () => ({
    tempImg,
  }),
  methods: {
    remove() {
      useAlert.success("상품", "상품이 삭제되었습니다.");
      this.$emit("getList");
    },
    click() {
      this.$router.push("/StartCity/D-LAB/Media/" + this.item.id);
    },
  },
  computed: {
    bgStyle() {
      return {
        backgroundImage: "url(" + (this.item.imgPath || this.tempImg) + ")",
      };
    },
    myPost() {
      return this.$store.state.loginInfo.id == this.item.writerSeq;
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
  width: $size;
  height: $size;
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
  @media screen and (max-width: 450px) {
    width: 100%;
  }
  [img] {
    height: calc(100% - $infoH);
    overflow: hidden;
    &:hover > div {
      transform: scale(1.1);
    }
    & > div {
      transition: 0.3s;
      @include wrap(block);
      @include background-reset(cover);
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

  [remove] {
    @include wrap(flex);
    @include flex(center, column);
    @include center();
    background-color: $editBg;
    cursor: default;
  }
}
</style>