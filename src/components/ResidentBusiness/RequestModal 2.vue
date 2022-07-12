<template>
  <section modal>
    <div wrap>
      <h2>
        나의 신청 현황
        <button @click="close">
          <i :class="xIcon" />
        </button>
      </h2>
      <div contents>
        <ul>
          <RequestLi v-for="(item, idx) in list" :key="idx" :item="item" />
          <li class="listNone" v-if="listNone">신청한 사업이 없습니다.</li>
        </ul>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import axios from "axios";
import RequestLi from "./RequestLi";
export default {
  components: {
    RequestLi,
  },
  data: () => ({
    list: [],
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/ResidentBusinessRequestList?requestPerson=" +
            this.loginInfo.id
        )
        .then(({ data }) => {
          this.list = data;
        });
    },
    close() {
      this.$emit("setRequestModalYN", false);
    },
  },
  computed: {
    loginInfo() {
      return this.$store.state.loginInfo;
    },
    xIcon() {
      return this.$store.state.FontAwesome.stroke.x;
    },
    listNone() {
      return this.list.length == 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

@media screen and (max-width: 650px) {
  [wrap] {
    width: 100% !important;
    left: 0 !important;
    height: 100% !important;
    top: 0 !important;
    border-radius: 0 !important;
    transition: 0.3s !important;
  }
}
</style>