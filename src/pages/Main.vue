<template>
  <main>
    <div banner-wrap :style="{ height: bannerHeight + 'px' }">
      <ul
        banners
        :style="{
          width: banners.length * 100 + '%',
          left: -100 * active + '%',
        }"
      >
        <li
          v-for="(item, idx) in banners"
          :key="idx"
          :style="{
            width: 100 / banners.length + '%',
            backgroundImage: 'url(' + item.bg + ')',
            backgroundSize:
              screenWidth >= 2020 || bannerHeight <= 600
                ? '100% auto'
                : 'auto 100%',
          }"
        />
      </ul>
      <div controller @mousedown="bannerMouseDown" @mouseup="bannerMouseUp">
        <div
          banner-txt-wrap
          :style="{
            backgroundImage: 'url(' + banners[active].txt + ')',
          }"
        />
        <ul indicator-wrap>
          <li
            v-for="(item, idx) in banners"
            :key="idx"
            :class="{ active: idx === active }"
            @click="targetGo(idx)"
          />
        </ul>
        <button @click="prev">
          <i :class="$store.state.FontAwesome.stroke.angle.left" />
        </button>
        <button @click="next">
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import banner1 from "@images/mainPageBanner/banner1.jpg";
import banner2 from "@images/mainPageBanner/banner2.jpg";
import banner3 from "@images/mainPageBanner/banner3.jpg";
import banner4 from "@images/mainPageBanner/banner4.jpg";
import banner1Text from "@images/mainPageBanner/banner1Text.png";
import banner2Text from "@images/mainPageBanner/banner2Text.png";
import banner3Text from "@images/mainPageBanner/banner3Text.png";
import banner4Text from "@images/mainPageBanner/banner4Text.png";

export default {
  data: () => ({
    banners: [
      { bg: banner1, txt: banner1Text },
      { bg: banner2, txt: banner2Text },
      { bg: banner3, txt: banner3Text },
      { bg: banner4, txt: banner4Text },
    ],
    active: 0,
    bannerHeight: 0,
    screenWidth: 0,
    autoNextTimer: 5000,
    mouseMoveRange: 100,
    mousePointX: 0,
    interval: null,
  }),
  mounted() {
    this.winResize();
    this.autoNext();
    window.removeEventListener("resize", this.winResize);
    window.addEventListener("resize", this.winResize);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    prev() {
      if (this.active == 0) return (this.active = this.banners.length - 1);
      this.active -= 1;
    },
    next() {
      if (this.active == this.banners.length - 1) return (this.active = 0);
      this.active += 1;
    },
    autoNext() {
      this.interval = setInterval(() => {
        this.next();
      }, this.autoNextTimer);
    },
    targetGo(idx) {
      this.active = idx;
    },
    winResize() {
      let w = window.innerWidth;
      let h = window.innerHeight;
      let calc = h - document.querySelector("#header")?.clientHeight;
      this.screenWidth = w;
      this.bannerHeight = calc;
    },
    bannerMouseDown(e) {
      this.mousePointX = e.pageX;
    },
    bannerMouseUp(e) {
      let x = e.pageX;
      let calc = x - this.mousePointX;
      if (calc >= this.mouseMoveRange) this.prev();
      if (calc <= -1 * this.mouseMoveRange) this.next();
    },
  },
  computed: {
    bannerStyle() {},
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

main {
  @include font(40px, 500, $gray);
  padding: 0;

  [banner-wrap] {
    width: 100%;
    position: relative;
    overflow: hidden;

    [banners] {
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      transition: 0.3s;

      & > li {
        @include background-reset();
        float: left;
        height: 100%;
        position: relative;
        background-color: #000000aa;
      }
    }

    [controller] {
      @include wrap(flex);
      @include flex(space-between);
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      /* max-width: 1200px; */
      width: 100%;
      margin: 0 auto;

      button {
        @include size(40px, 80px);
        @include flex(center);
        font-size: 30px;
        border: none;
        background-color: #00000040;
        color: #fff;
        position: relative;
        z-index: 9;
        &:hover {
          background-color: #00000060;
        }
      }
    }

    [banner-txt-wrap] {
      @include size(100%, 200px);
      @include background-reset(auto 100%);
      height: calc(10vw + 80px);
      transform: translateY(-50%);
      position: absolute;
      top: 50%;
      left: 0;
      max-height: 250px;
    }

    [indicator-wrap] {
      @include flex(center);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 30px;
      & > li {
        $s: 13px;
        @include size($s, $s);
        min-width: $s;
        max-width: $s;
        min-height: $s;
        max-height: $s;
        margin: 0 5px;
        border: 2px solid $black;
        border-radius: $s;
        background-color: #bbb;
        cursor: pointer;
        &.active {
          background-color: #f8e32f;
        }
      }
    }
  }
}
</style>