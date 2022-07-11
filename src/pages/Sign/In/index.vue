<template>
  <main>
    <h2>로그인 페이지</h2>
    <button @click="testLogin">임시 로그인</button>
  </main>
</template>

<script>
import { useAlert } from '@admin/src/hook';
export default {
  data: () => ({
    
  }),
  created() {
    if (this.loginYN) {
      useAlert.info('로그인', '이미 로그인이 되어있습니다.');
      this.$router.push('/');
      return;
    }
  },
  methods: {
    testLogin() {
      this.$store.dispatch('setLoginYN', true);
      useAlert.success('로그인', '로그인되었습니다.');
      this.$router.go(-1);
    },
  },
  computed: {
    loginYN() {
      return this.$store.state.loginYN;
    }
  },
}
</script>

<style lang="scss" scoped>

</style>