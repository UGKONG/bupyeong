<template>
  <main>
    <div class="wrap">
      <div img :style="{ backgroundImage: `url(${img404})` }" />
      <div text>
        <h1>404</h1>
        <p>Page Not Found</p>
      </div>
      <button btn @click="back">메인 페이지</button>
    </div>
  </main>
</template>

<script>
import img404 from "../../public/images/404.png";
export default {
  data: () => ({
    img404,
    backSize: "",
  }),
  created() {},
  methods: {
    back() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
main {
  @include flex(center);
  flex-flow: column;
  min-height: calc(100vh - 150px);

  .wrap {
    position: relative;
    height: 300px;
    user-select: none;

    [img] {
      width: 800px;
      height: 200px;
      background-color: transparent;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: top;
      opacity: 0.7;
    }

    [text] {
      position: absolute;
      text-align: center;
      left: 50%;
      bottom: 30px;
      transform: translate(-50%);
      letter-spacing: 3px;
      line-height: 50px;
      opacity: 0.8;

      h1 {
        font-size: 70px;
        font-weight: 700;
        color: var(--gray);
      }
      p {
        font-size: 16px;
        color: var(--gray);
        font-weight: 700;
      }
    }

    [btn] {
      position: absolute;
      left: 50%;
      bottom: -20px;
      transform: translate(-50%);
      color: #fff;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>