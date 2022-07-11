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
        <span>스마트시티</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 스마트시티
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          소개글
        </p>
      </div>
    </h2>

    <section>Contents</section>
  </main>
</template>

<script>
import processBanner from "@images/2/2/processBanner.png";

export default {
  data: () => ({
    processBanner,
  }),
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
</style>