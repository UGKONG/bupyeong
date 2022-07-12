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
        <span>회원가입</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 회원가입
        </p>
      </div>
    </h2>
    <section>
      
    </section>
  </main>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>