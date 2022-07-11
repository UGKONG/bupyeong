<template>
  <main>
    <h2
      banner
      :style="{
        backgroundImage: 'url(' + noticeBanner + ')',
        backgroundColor: '#badc86',
        height: '200px',
      }"
    >
      <div>
        <span>{{ data.title || "도시재생사업현황" }}</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          재생사업정보
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          {{ data.title || "도시재생사업현황" }}
        </p>
      </div>
    </h2>

    <section v-html="data.context" />
  </main>
</template>

<script>
import axios from "axios";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  props: {
    id: String,
  },
  watch: {
    id() {
      this.getData();
    },
  },
  data: () => ({
    data: {},
    noticeBanner,
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/bupyeongInfoText/" + this.id)
        .then(({ data }) => {
          this.data = data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

section {
  width: 100%;
  min-height: 800px;
  padding: 10px;
}

#AD164092448270.ad-template {
  float: right;
  position: relative;
  display: block;
  clear: both;
  z-index: 1;
  padding: 10px 0 0 15px;
}
#AD164092448270.ad-template .col {
  text-align: center;
}
#AD164092448270.ad-template .col .ad-view {
  position: relative;
}
</style>