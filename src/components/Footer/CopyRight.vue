<template>
  <article copyright>
    <p>
      <span>[21354]</span>
      <span>인청광역시 부평구 부평대로 168</span>
      <span>TEL.(032)504-2114</span>
    </p>
    <p>
      <span>COPYRIGHT (C) 2021 INCHEON BUPYEONG.</span>
      <span>ALL RIGHTS RESERVED.</span>
    </p>
  </article>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[copyright] {
  margin-left: 40px;
  font-size: 13px;
  letter-spacing: 1px;
  color: $footerCopyrightColor;
  @media screen and (max-width: 900px) {
    margin-left: 30px;
  }
  p {
    margin-bottom: 4px;
    &:last-of-type {
      margin-bottom: 0;
    }
    @media screen and (max-width: 900px) {
      @include flex(flex-start, row, wrap);
    }
  }
}
</style>