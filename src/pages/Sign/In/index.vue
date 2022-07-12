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
        <span>로그인</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 로그인
        </p>
      </div>
    </h2>
    <section>
      <form @submit.prevent="submit">
        <input type="text" v-model="id" placeholder="아이디" required />
        <input type="password" v-model="pw" placeholder="비밀번호" required />
        <button id="submit">로그인</button>
        <div sns>
          <button
            type="button"
            :style="{ backgroundImage: 'url(' + naverIcon + ')' }"
            @click="kakaoLogin"
          ></button>
          <button
            type="button"
            :style="{ backgroundImage: 'url(' + kakaoIcon + ')' }"
            @click="kakaoLogin"
          ></button>
          <button
            type="button"
            :style="{ backgroundImage: 'url(' + facebookIcon + ')' }"
            @click="kakaoLogin"
          ></button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { useAlert, useAxios } from "@admin/src/hook";
import noticeBanner from "@images/2/1/noticeBanner.png";
import naverIcon from "@images/sns/naver.png";
import kakaoIcon from "@images/sns/kakao.png";
import facebookIcon from "@images/sns/facebook.png";

export default {
  data: () => ({
    noticeBanner,
    naverIcon,
    kakaoIcon,
    facebookIcon,
    id: "",
    pw: "",
  }),
  created() {
    if (this.loginYN) {
      useAlert.info("로그인", "이미 로그인이 되어있습니다.");
      this.$router.push("/");
      return;
    }
  },
  methods: {
    kakaoLogin() {
      Kakao.Auth.login({
        success: () => {
          Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
              let authId = res?.id ?? null;
              let email = res?.kakao_account?.email ?? null;
              let name = res?.kakao_account?.profile?.nickname ?? null;
              let img =
                res?.kakao_account?.profile?.thumbnail_image_url ?? null;
              let platform = "kakao";

              // snsLoginSubmit({ authId, email, name, platform, img });
              this.snsSubmiy(authId, platform);
            },
          });
        },
      });
    },
    snsSubmiy(authId, platform) {
      let form = new FormData();
      form.append("SNS_ID", authId);
      form.append("SNS_TYPE", platform);
      useAxios.post("/snslogin", form).then(({ data }) => {
        if (!data?.RESULT) return useAlert.warn("알림", data?.RESULT_DESC);
        this.submitSuccess(data);
      });
    },
    submit() {
      let form = new FormData();
      form.append("ID", this.id);
      form.append("PWD", this.pw);
      useAxios.post("/login", form).then(({ data }) => {
        if (!data?.RESULT) return useAlert.warn("알림", data?.RESULT_DESC);
        this.submitSuccess(data);
      });
    },
    submitSuccess(data) {
      window.sessionStorage.setItem("loginInfo", JSON.stringify(data));
      this.$store.dispatch("setLoginYN", true);
      this.$store.dispatch("setLoginInfo", data);
      useAlert.info("로그인", data?.MBR_NM + "님 환영합니다.");
      this.$router.push("/");
    },
    // testLogin() {
    //   this.$store.dispatch("setLoginYN", true);
    //   useAlert.success("로그인", "로그인되었습니다.");
    //   this.$router.go(-1);
    // },
  },
  computed: {
    loginYN() {
      return this.$store.state.loginYN;
    },
  },
};
</script>

<style lang="scss" scoped>
h2 {
  margin-top: 0;
}
form {
  display: block;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  flex-direction: column;
  padding-bottom: 100px;

  input {
    width: 200px;
    height: 34px;
    border: 1px solid #ddd;
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 0 10px;
    font-size: 13px;
  }
}
#submit {
  margin-top: 30px;
}
[sns] {
  margin-top: 30px;
  padding-top: 30px;
  display: flex;
  border-top: 1px solid #ddd;

  button {
    width: 40px;
    height: 40px;
    margin: 0 5px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: 103% 103%;
    background-position: center;
    border: none;
    &:hover {
      border: 1px solid #ffffff;
    }
  }
}
</style>