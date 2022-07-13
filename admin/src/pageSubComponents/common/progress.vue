<template>
  <article container v-if="percent > 0">
    <div bg />
    <section progress-wrap>
      <p>진행현황: {{ percent ?? 0 }}%</p>
      <div percent-wrap>
        <div :style="{ width: percent + '%' }" />
      </div>
    </section>
  </article>
</template>

<script>
export default {
  props: {
    // percent: Number,
  },
  data: () => ({}),
  watch: {
    percent(val) {
      if (val < 100) return;
      this.$store.dispatch("setIsProgress", false);
    },
  },
  methods: {},
  computed: {
    percent() {
      return this.$store.state.isProgressPercent;
    },
  },
};
</script>

<style scoped lang="scss">
[container] {
  position: relative;
  z-index: 9999999999999999999999999999999999999999999999999999999999999999999999999999;
}
[progress-wrap] {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #5f9fdfaa;
  width: 200px;
  box-shadow: 0 2px 4px #00000020;
  border-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;

  [percent-wrap] {
    width: 100%;
    border: 2px solid #fff;
    background-color: #fff;
    border-radius: 100px;
    overflow: hidden;
    div {
      background-color: #5f9fdf;
      width: 0;
      height: 6px;
    }
  }
  p {
    color: #fff;
    font-weight: 700;
    letter-spacing: 2px;
    margin-bottom: 10px;
  }
}
[bg] {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #00000020;
}
</style>