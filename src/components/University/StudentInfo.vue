<template>
  <div wrap>
    <p>일련번호 : {{ data.id }}</p>
    <p>이 름 : {{ data.name }}</p>
    <p>과정 이수율 : {{ processPercent }}</p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    id: String,
    post: String,
    all: {
      type: Number,
      default: 0,
    },
    now: {
      type: Number,
      default: 0,
    },
  },
  data: () => ({
    data: {},
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/studentList/" + this.post)
        .then(({ data }) => {
          this.data = data;
        });
    },
  },
  computed: {
    processPercent() {
      let now = this.now;
      let all = this.all;
      let calc = now == 0 && all == 0 ? 0 : (now / all) * 100;
      calc = calc == 0 ? 0 : calc.toFixed(2);
      return calc + "% (완료: " + now + " / 전체: " + all + ")";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[wrap] {
  width: 100%;
  height: auto;
  border: 1px solid $gray;
  padding: 20px;

  p {
    margin-bottom: 10px;
    font-size: 15px;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}
</style>