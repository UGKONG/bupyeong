<template>
  <ul wrap>
    <li><div start></div></li>
    <RecordTimelineLi
      v-for="(item, idx) in list"
      :key="idx"
      :item="item"
      :idx="idx"
      :id="id"
    />
    <li>
      <div end>
        <i :class="downArrow"></i>
        <br />
        <button v-if="list.length >= 5">더보기</button>
      </div>
    </li>
  </ul>
</template>

<script>
import RecordTimelineLi from "@/components/BusinessRecord/RecordTimelineLi";
export default {
  components: {
    RecordTimelineLi,
  },
  props: {
    list: Array,
    id: String,
  },
  data: () => ({}),
  methods: {},
  computed: {
    downArrow() {
      return this.$store.state.FontAwesome.stroke.arrow.bottom;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

$barColor: #000;

[wrap] {
  margin: 20px auto;
  /* width: 800px; */
}
[start] {
  margin: 30px auto 0;
  width: 12px;
  height: 12px;
  border-radius: 100px;
  background-color: $barColor;
}
[end] {
  font-size: 22px;
  color: $barColor;
  text-align: center;
  @include flex(center);
  flex-flow: column;
  i,
  svg {
    transform: translateY(-4px);
  }
}
</style>