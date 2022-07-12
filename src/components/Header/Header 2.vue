<template>
  <!-- :style="{ height: $store.state.scrollTop > 10 ? '180px' : '200px' }" -->
  <header
    id="header"
    :style="{ backgroundColor: scrollTop > 168 ? '#eeeeeeee' : '#fff' }"
  >
    <!-- 스크롤 인디케이터 -->
    <div scroll-wrap>
      <div>
        <div :style="{ width: scrollPercent + '%' }" />
      </div>
    </div>

    <!-- 상단 서브 메뉴 -->
    <TopMenu />

    <!-- 메인 메뉴 -->
    <article main>
      <h1>
        <router-link to="/" :style="{ backgroundImage: 'url(' + Logo + ')' }" />
      </h1>

      <MainMenu />
    </article>
  </header>
</template>

<script>
import TopMenu from "./TopMenu";
import MainMenu from "./MainMenu";
import Logo from "@public/images/logo.png";

export default {
  components: {
    TopMenu,
    MainMenu,
  },
  props: {
    scrollTop: Number,
  },
  data: () => ({
    Logo,
    scrollPercent: 0,
  }),
  watch: {
    scrollTop() {
      this.scrollPercent = this.scrollCalc();
    },
  },
  created() {},
  methods: {
    drop() {
      console.log("drop");
    },
    scrollCalc() {
      let all = document.body.clientHeight - window.innerHeight;
      let calc = (this.scrollTop / all) * 100;
      return calc;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
#header {
  top: -139px;
  width: 100%;
  position: sticky;
  /* border-bottom: 1px solid $headerBorderColor; */
  background-color: $white;
  z-index: $index1;
  box-shadow: 0 4px 8px #00000020;
  transition: 0.3s;

  [scroll-wrap] {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: $white;
    height: $scrollHeight;
    z-index: $index2;
    position: relative;
    & > div {
      @include wrap(block);
      div {
        position: absolute;
        top: 0;
        left: 0;
        height: $scrollHeight;
        background-color: $activeColor;
      }
    }
  }

  [main] {
    height: calc(100% - 35px);
    @include flex(space-between);
    flex-flow: column;

    h1 {
      width: 450px;
      height: 42px;
      margin: 30px 0;
      color: $gray;
      font-size: 30px;
      padding: 0;
      /* border: 1px solid var(--gray); */
      @include flex(center);

      a {
        @include flex(center);
        @include wrap(flex);
        @include background-reset();
      }
    }
  }
}

@media screen and (max-width: 900px) {
  #header {
    position: sticky !important;
    top: -35px !important;
    background-color: #fff !important;
    h1 {
      height: 50px !important;
      margin: 10px 0 !important;
      padding: 7px 0 !important;
    }
  }
}
@media screen and (max-width: 499px) {
  #header {
    h1 {
      width: 260px !important;
      height: 40px !important;
      margin: 10px 0 !important;
      padding: 7px 0 !important;
    }
  }
}
</style>