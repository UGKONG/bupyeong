<template>
  <main>
    <h2
      banner
      :style="{
        backgroundImage: 'url(' + processBanner + ')',
        backgroundColor: '#a5bdf3',
        height: '275px',
      }"
    >
      <div>
        <span>{{ data.title }}</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="rightIcon" /> 부평11번가 <i :class="rightIcon" />
          {{ data.title }}
        </p>
      </div>
    </h2>

    <section v-html="data.context" />
  </main>
</template>

<script>
import axios from "axios";
import processBanner from "@images/2/2/processBanner.png";
export default {
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    processBanner,
  }),
  watch: {
    id() {
      this.getData();
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.data = {};
      axios
        .get(this.$store.state.dbUrl + "/bupyeongInfoText/" + this.id)
        .then(({ data }) => {
          this.data = data;
        })
        .catch(() => {
          this.$router.push("/404");
        });
    },
  },
  computed: {
    rightIcon() {
      return this.$store.state.FontAwesome.stroke.angle.right;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

section {
  min-height: 800px !important;
}
</style>