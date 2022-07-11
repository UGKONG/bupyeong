<template>
  <section modal>
    <div wrap>
      <h2>
        주민공모사업 도움말
        <button @click="close">
          <i :class="xIcon" />
        </button>
      </h2>
      <div contents>
        {{ data }}
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import axios from 'axios';
export default {
  data: () => ({
    data: ''
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.data = '주민공모사업 메뉴에 대한 도움말입니다.';
    },
    close() {
      this.$emit('setQuestionModalYN', false);
    }
  },
  computed: {
    xIcon() {
      return this.$store.state.FontAwesome.stroke.x;
    },
  }
}
</script>

<style lang="scss" scoped>

</style>