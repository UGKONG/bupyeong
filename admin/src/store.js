import Vue from 'vue';
import vuex from './vuex';
import { useAlert, useForm } from './hook';
import axios from 'axios';

// Instance Store
export const Store = new Vue({
  store: vuex,
  data: {
    globalURL: 'http://bodyscanner.iptime.org:8082/',
    defaultIconList: [
      {
        ICON_SN: '9001',
        PRNT_SN: 0, 
        ICON_TYPE:'1', 
        ICON_NM: '설정', 
        // ICON_PATH: 'assets/admin/images/', 
        ICON_FN: 'setting.png', 
        CMPNT: 'Setting'
      }, {
        ICON_SN: '9002',
        PRNT_SN: 0, 
        ICON_TYPE:'1', 
        ICON_NM: '대쉬보드', 
        // ICON_PATH: 'assets/admin/images/', 
        ICON_FN: 'dashboard.png', 
        CMPNT: 'Dashboard'
      },
    ],
    iconList: [],
    finderCount: [],
    finderSeq: 0,
    finderIn: false,
    iconList_bg: [],
    iconList_folder: [],
    iconList_inFolder: [],
    // alertYN: false,
    // alertInfo: {
    //   icon: 'info',
    //   title: 'Info Message',
    //   text: 'This is an info message.'
    // },
    // alertPercent: 0,
    // alertTimeout: undefined,
    confirmYN: false,
    confirmInfo: {
      icon: 'info',
      title: 'Info Message',
      text: 'This is an info message.',
      ok: () => {console.log('OK')},
      no: () => {console.log('NO')}
    },
  },
  created () {
    this.getMenu();
  },
  methods: {
    getMenu() {
      let data = {TASK: 'R_MENU_LIST'}
      axios.post(this.$store.state.dbUrl + '/MngrCommon', useForm(data)).then(({data}) => {
        if (!data.RESULT && data?.CAUSE == 'SESSIONFAIL') return this.$store.dispatch('sessionFail');
        if (!data.RESULT) return useAlert.error('공통', '메뉴 리스트를 불러오지 못했습니다.');
        this.iconList = data.MENU_LIST;
        // console.log(data);
  
        // 로그인 체크
        if (data.RESULT) {
          this.$store.commit('setLoginYN', true);
        } else {
          if (data?.CAUSE == 'SESSIONFAIL') {
            this.$store.commit('setLoginYN', false);
            return;
          }
        }
        
        this.iconList_bg = this.iconList.filter(x => x.PRNT_SN == 0);
        this.iconList_folder = this.iconList.filter(x => x.PRNT_SN < 10);
        this.iconList_inFolder = this.iconList.filter(x => x.PRNT_SN > 10);
      });
    },
    setConfirmYN(bool = false) {
      this.confirmPercent = 0;
      this.confirmYN = bool;
    },
    setConfirmInfo(obj) { this.confirmInfo = obj },



    // 차후 삭제 계획
    // setAlertYN(bool = false, timer = 3000) {
    //   this.alertPercent = 0;
    //   this.alertYN = bool;
    //   clearTimeout(this.alertTimeout);
    //   this.alertTimeout = undefined;
    //   if (bool) {
    //     this.alertPercent = 100;
    //     this.alertTimeout = setTimeout(() => {
    //       this.alertYN = false;
    //       this.alertPercent = 0;
    //     }, timer);
    //   } 
    // },
    // setAlertInfo(obj) { this.alertInfo = obj }
  }
});

