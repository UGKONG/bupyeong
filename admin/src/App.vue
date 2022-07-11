<template>
  <main :style="{ backgroundImage: 'url(' + bg + ')' }">
    <!-- Alert -->
    <!-- <Alert /> -->
    <transition name="fade-transition">
      <Confirm />
    </transition>

    <!-- Black Modal Background -->
    <transition name="fade-transition">
      <DarkDiv v-show="darkdivYN" />
    </transition>

  <template v-if="loginYN">

    <!-- Background Icon -->
    <article 
      v-for="item in iconList_bg"
      :key="item.MENU_SN" 
      :class="item.MENU_NM" 
      :data-title="item.MENU_NM"
      :data-type="item.TYPE"
      :data-component-name="item.CPNT_NM"
      data-who="bgIcon"
      @dblclick="bgIconDbClick"
    >
      <div :style="{ backgroundImage: 'url(' + folderIcon + ')' }" />
      <p>{{ item.MENU_NM }}</p>
    </article>

    <!-- Background Icon (Dashboard, Setting) -->
    <article 
      v-for="item in defaultIconList" 
      style="float: right"
      data-who="bgIcon"
      :key="'bg' + item.MENU_SN" 
      :class="item.MENU_NM" 
      :data-seq="item.MENU_SN"
      :data-title="item.MENU_NM"
      :data-type="item.TYPE"
      :data-component-name="item.CPNT_NM"
      @dblclick="bgIconDbClick"
    >
      <div :style="{ backgroundImage: 'url(' + (item.CPNT_NM == 'Dashboard' ? dashboardIcon : settingIcon) + ')' }" />
      <p>{{ item.MENU_NM }}</p>
    </article>

    <!-- Finder -->
    <transition name="slide-y-reverse-transition">
      <Finder 
        v-for="item in finderCount" 
        :class="item" 
        :titleName="item" 
        :key="item"
        :darkdivYN="darkdivYN"
        :modalYN="modalYN"
        :modalSeq="modalSeq"
        :setModalSeq="setModalSeq"
        :modalTitle="modalTitle"
        :modalSubTitle="modalSubTitle"
        :setSubTitle="setSubTitle"
        :modalOpen="modalOpen"
        :modalClose="modalClose"
        :componentName="componentName"
        :setComponentName="setComponentName"
      />
    </transition>

    <!-- Modal -->
    <transition name="slide-y-reverse-transition">
      <Modal 
        v-if="modalYN"
        :modalTitle="modalTitle"
        :componentName="componentName"
        :modalSeq="modalSeq"
        @modalClose="modalClose"
      />
    </transition>

    <!-- 접속정보 -->
    <p class="inInfo" :style="{
      position: 'absolute',
      bottom: '5px',
      left: '5px',
      color: '#fff'
    }">
      <span>접속일시 : {{ inTime }}</span><br />
      <span>접속정보 : {{ inInfo }}</span>
    </p>

    <button id="logoutBtn" @click="logout">
      로그아웃
    </button>
  </template>

    <!-- Login Page -->
    <transition name="fade-transition">
      <Login v-if="!loginYN" />
    </transition>

  </main>
</template>

<script>
import { Store } from './store';
import axios from 'axios';
import { useDateFormat, useTimeFormat, useForm, useAlert } from './hook';
import Bg from './img/bg.png';
import dashboardIcon from './img/icon/dashboard.png';
import settingIcon from './img/icon/setting.png';
import folderIcon from './img/icon/folder.png';

export default {
  components: {
    DarkDiv: () => import('./darkdiv'),
    Finder: () => import('./finder'),
    Modal: () => import('./modal'),
    Confirm: () => import('./v-confirm'),
    Login: () => import('./login')
  },
  data () {
    return {
      inTime: '',
      inInfo: '',
      bg: Bg,
      dashboardIcon: dashboardIcon,
      settingIcon: settingIcon,
      folderIcon: folderIcon,
      darkdivYN: false,
      modalYN: false,
      modalTitle: '',
      modalSubTitle: '',
      componentName: '',
      modalSeq: '',
    }
  },
  created() {
    this.inTime = useDateFormat() + ' ' + useTimeFormat();
    this.inInfo = window.navigator.appVersion + ' ' + window.navigator.appCodeName;
  },
  methods: {
    logout() {
      let data = {TASK: 'D_LOGOUT'}
      axios.post(this.$store.state.dbUrl + '/LOGOUT', useForm(data)).then(
        ({data}) => {
          console.log(data);
          if (data.RESULT) {
            useAlert.info('로그아웃', '로그아웃되었습니다.');
            this.$store.commit('setLoginYN', false);
          }
        }
      )
    },
    bgIconDbClick (e) {
      let className = e.currentTarget.className;
      let titleName = e.currentTarget.getAttribute('data-title');
      let typeName = e.currentTarget.getAttribute('data-type');
      if (typeName == 'folder') {  // 폴더O
        Store.finderCount = [];
        if (Store.finderCount.indexOf(className) == -1 && (Store.finderCount ?? []).length < 1){
          this.darkdivYN = false;
          this.modalYN = false;
          Store.finderCount.push(className);
          Store.finderSeq = this.iconList_bg.find(x => x.MENU_NM == className).MENU_SN;
          Store.finderIn = false;
          return;
        }
      } else {  // 폴더X
        this.darkdivYN = true;
        this.modalYN = true;
        this.modalTitle = titleName;
        this.componentName = e.currentTarget.getAttribute('data-component-name');
        this.modalSeq = e.currentTarget.getAttribute('data-seq');
      }
    },
    modalClose() {
      this.darkdivYN = false;
      this.modalYN = false;
    },
    modalOpen(titleName) {
      this.darkdivYN = true;
      this.modalYN = true;
      this.modalTitle = titleName;
    },
    setSubTitle(subTitle) {
      this.modalSubTitle = subTitle;
    },
    setComponentName(name) {
      this.componentName = name;
    },
    setModalSeq(seq) {
      this.modalSeq = seq;
    }
  },
  computed: {
    defaultIconList: () => Store.defaultIconList,
    finderCount: () => Store.finderCount,
    iconList_bg: () => Store.iconList_bg,
    iconList_folder: () => Store.iconList_folder,
    iconList_inFolder: () => Store.iconList_inFolder,
    loginYN: function() {
      return this.$store.state.loginYN;
    },
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');

html {
  overflow: hidden !important;
  overflow-x: hidden !important;
  overflow-y: hidden !important;
}
body ::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}
body ::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 10px;
}
input {
  background-color: #fff !important;
}
select {
  background-color: #fff !important;
  -webkit-appearance: auto !important;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  color: inherit;
  text-decoration: none;
  font-family: 'Noto Sans KR', sans-serif;
  user-select: none;
}
section, article, aside, div, span, h1, h2, h3, h4, h5, h6, main, header, footer {
  font-family: 'Noto Sans KR', sans-serif;
}
button {
  cursor: pointer;
  border: none;
  border-radius: 0;
  line-height: unset;
  background-color: rgb(239, 239, 239);
}
button:hover {
  box-shadow: 0 0px 2px #00000070;
}
main {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
article[data-who="bgIcon"] {
  width: 100px;
  height: 120px;
  margin: 4px;
  float: left;
  background-color: transparent;
  cursor: default;
  user-select: none;
  &:hover {
    background-color: #ffffff20;
  }
  div {
    width: 100%;
    height: calc(100% - 30px);
    display: flex;
    align-items: center;
    justify-content: center;
    background-repeat: no-repeat;
    background-size: 90%;
    background-position: center;
  }
  p {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 13px;
    color: #fff;
    text-shadow: 0 0 3px #000;
    text-align: center;
  }
}
label {
  font-size: 13.3333px;
  font-weight: 400;
  margin: 0;
}
h1, .h1, h2, .h2, h3, .h3 {
  margin: 0;
}
th {
  text-align: center;
}
p {
  margin: 0;
}
.required {
  position: relative;

  &::before {
    content: '*';
    position: absolute;
    left: -6px;
    top: 50%;
    line-height: 0;
    color: gray;
  }
}

#logoutBtn {
  position: fixed;
  right: 0;
  bottom: 0;
  color: #fff;
  padding: 4px;
  z-index: inherit;
  &:hover {
    text-decoration: underline;
    box-shadow: none;
  }
}

/* transition */
.scale-transition-enter-active, .scale-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.scale-transition-move {
  transition: transform 0.6s;
}
.scale-transition-enter, .scale-transition-leave, .scale-transition-leave-to {
  opacity: 0;
  transform: scale(0);
}

.scale-rotate-transition-enter-active, .scale-rotate-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.scale-rotate-transition-move {
  transition: transform 0.6s;
}
.scale-rotate-transition-enter, .scale-rotate-transition-leave, .scale-rotate-transition-leave-to {
  opacity: 0;
  transform: scale(0) rotate(-45deg);
}

.scale-rotate-reverse-transition-enter-active, .scale-rotate-reverse-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.scale-rotate-reverse-transition-move {
  transition: transform 0.6s;
}
.scale-rotate-reverse-transition-enter, .scale-rotate-reverse-transition-leave, .scale-rotate-reverse-transition-leave-to {
  opacity: 0;
  transform: scale(0) rotate(45deg);
}

.message-transition-enter-active, .message-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.message-transition-move {
  transition: transform 0.6s;
}
.message-transition-enter, .message-transition-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}
.message-transition-leave, .message-transition-leave-active {
  position: absolute;
}

.slide-y-transition-enter-active, .slide-y-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.slide-y-transition-move {
  transition: transform 0.6s;
}
.slide-y-transition-enter, .slide-y-transition-leave-to {
  opacity: 0;
  transform: translateY(-15px);
}

.slide-y-reverse-transition-enter-active, .slide-y-reverse-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.slide-y-reverse-transition-move {
  transition: transform 0.6s;
}
.slide-y-reverse-transition-enter, .slide-y-reverse-transition-leave-to {
  opacity: 0;
  transform: translateY(15px);
}

.scroll-y-transition-enter-active, .scroll-y-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.scroll-y-transition-move {
  transition: transform 0.6s;
}
.scroll-y-transition-enter, .scroll-y-transition-leave-to {
  opacity: 0;
}
.scroll-y-transition-enter {
  transform: translateY(-15px);
}
.scroll-y-transition-leave-to {
  transform: translateY(15px);
}

.scroll-y-reverse-transition-enter-active, .scroll-y-reverse-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.scroll-y-reverse-transition-move {
  transition: transform 0.6s;
}
.scroll-y-reverse-transition-enter, .scroll-y-reverse-transition-leave-to {
  opacity: 0;
}
.scroll-y-reverse-transition-enter {
  transform: translateY(15px);
}
.scroll-y-reverse-transition-leave-to {
  transform: translateY(-15px);
}

.scroll-x-transition-enter-active, .scroll-x-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.scroll-x-transition-move {
  transition: transform 0.6s;
}
.scroll-x-transition-enter, .scroll-x-transition-leave-to {
  opacity: 0;
}
.scroll-x-transition-enter {
  transform: translateX(-15px);
}
.scroll-x-transition-leave-to {
  transform: translateX(15px);
}

.scroll-x-reverse-transition-enter-active, .scroll-x-reverse-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.scroll-x-reverse-transition-move {
  transition: transform 0.6s;
}
.scroll-x-reverse-transition-enter, .scroll-x-reverse-transition-leave-to {
  opacity: 0;
}
.scroll-x-reverse-transition-enter {
  transform: translateX(15px);
}
.scroll-x-reverse-transition-leave-to {
  transform: translateX(-15px);
}

.slide-x-transition-enter-active, .slide-x-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.slide-x-transition-move {
  transition: transform 0.6s;
}
.slide-x-transition-enter, .slide-x-transition-leave-to {
  opacity: 0;
  transform: translateX(-15px);
}

.slide-x-reverse-transition-enter-active, .slide-x-reverse-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.slide-x-reverse-transition-move {
  transition: transform 0.6s;
}
.slide-x-reverse-transition-enter, .slide-x-reverse-transition-leave-to {
  opacity: 0;
  transform: translateX(15px);
}

.fade-transition-enter-active, .fade-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.fade-transition-move {
  transition: transform 0.6s;
}
.fade-transition-enter, .fade-transition-leave-to {
  opacity: 0 !important;
}

.fab-transition-enter-active, .fab-transition-leave-active {
  transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1) !important;
}
.fab-transition-move {
  transition: transform 0.6s;
}
.fab-transition-enter, .fab-transition-leave-to {
  transform: scale(0) rotate(-45deg);
}

</style>