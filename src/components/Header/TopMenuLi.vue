<template>
  <li>
    <router-link
      :to="item.url"
      v-if="selfTarget"
      v-text="item.name"
      @click.native="menuClick"
    />
    <a
      :href="item.url"
      v-else
      v-text="item.name"
      target="new"
      title="연결"
      :class="{ admin: item.url == '/admin' }"
    />
  </li>
</template>

<script>
import { useAlert } from "@admin/src/hook";
export default {
  props: {
    item: Object,
  },
  methods: {
    menuClick() {
      let name = this.item.name;
      if (name == "로그아웃") {
        this.$store.dispatch("setLoginYN", false);
        this.$store.dispatch("setLoginInfo", null);
        this.$store.dispatch("logout");
        useAlert.info("로그아웃", "로그아웃되었습니다.");
        this.$router.push("/");
      }
    },
  },
  computed: {
    selfTarget() {
      return this.item.target == "self";
    },
    newTarget() {
      return this.item.target == "new";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li {
  display: inline-block;
  margin: 0 2px;
  height: 100%;

  a {
    @include flex(center);
    @include wrap(flex);
    padding: 0px 10px 2px;
    font-size: 13px;
    /* border: 1px solid var(--gray); */
  }
  a.admin {
    background-color: $adminBtnColor;
    color: $white;
  }
}
</style>