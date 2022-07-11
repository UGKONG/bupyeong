<template>
  <section class="wrap">
    <article class="bg" :style="{backgroundImage: `url(${bg})`}" />
    <article class="contents">
      <h1>LOGIN</h1>
      <div>
        <label for="loginID">아이디 :</label>
        <input id="loginID" v-model="id" />
      </div>
      <div>
        <label for="loginPW">비밀번호 :</label>
        <input type="password" id="loginPW" v-model="pw" />
      </div>
      <button @click="login">로그인</button>
    </article>
  </section>  
</template>

<script>
import bg from './img/bg.png';

export default {
  data() {
    return {
      bg: bg,
      id: '',
      pw: '',
    }
  },
  created() {
    // console.log(this.loginYN);
  },
  methods: {
    login() {
      this.$store.dispatch('setLoginYN', {TASK: 'C_LOGIN', MNGR_ID: this.id, MNGR_PW: this.pw});
    },
  },
  computed: {
    // loginYN() {
    //   return this.$store.state.loginYN;
    // }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background-color: #ddd;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
.bg {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(7px) grayscale(.8);
  transition: .4s;
  z-index: 9999;
}
.contents {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  padding: 20px 20px 100px;
  & > h1 {
    padding: 10px;
  }
  & > div {
    padding: 10px 0;
  }
  label {
    display: inline-block;
    width: 60px;
    font-weight: 500;
  }
  input {
    height: 30px;
    border: 1px solid #aaaaaa80;
    padding: 0 5px;
  }
  button {
    padding: 4px 10px;
    background-color: #888;
    color: #fff;
    margin-top: 20px;
  }
}

</style>