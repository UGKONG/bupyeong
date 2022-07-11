<template>
  <footer id="footer">
    <!-- 상단 서브 메뉴 -->
    <TopMenu />

    <!-- 푸터 메뉴 -->
    <section main>
      <h2>
        <router-link
          to="/"
          :style="{ backgroundImage: 'url(' + footer_logo + ')' }"
        />
      </h2>
      <CopyRight />
    </section>
  </footer>
</template>

<script>
import TopMenu from "./TopMenu";
import CopyRight from "./CopyRight";
import footer_logo from "@images/footer_logo.png";
export default {
  components: {
    TopMenu,
    CopyRight,
  },
  props: {
    menuList: Array,
  },
  data: () => ({
    footer_logo,
  }),
  methods: {
    logoClick() {
      location.href = "/";
    },
    topBtnClick() {
      document.body.scrollTop = 0;
    },
  },
  computed: {
    orderMenu() {
      return this.menuList?.sort((a, b) => a.order - b.order);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
#footer {
  /* height: 150px; */
  border-top: 1px solid $footerBorderColor;
  background-color: $footerBgColor;

  [main] {
    @include flex(center);
    width: 100%;
    max-width: 1200px;
    /* height: calc(100% - 35px); */
    margin: 0 auto;
    padding: 20px;

    h2 {
      @include flex(center);
      width: 150px;
      height: 60px;
      color: $gray;

      a {
        @include wrap(flex);
        @include background-reset();
        filter: grayscale(0.9);
      }
    }
  }
}

@media screen and (max-width: 900px) {
  #footer {
    /* height: 250px; */
    [main] {
      flex-flow: column;
      height: calc(100% - 85px);

      h2 {
        height: 50px;
        margin-bottom: 20px;
        a {
        }
      }
    }
  }
}
</style>