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
        <span>D-LAB 운영통계</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 스마트시티
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          D-LAB
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          운영통계
        </p>
      </div>
    </h2>

    <section contents>
      <Calendar />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import Calendar from "@/components/Dlab/Calendar";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    Calendar,
  },
  props: {},
  data: () => ({
    noticeBanner,
  }),
  created() {},
  methods: {},
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
</style>