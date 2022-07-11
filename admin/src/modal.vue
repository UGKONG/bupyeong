<template>
  <section class="v-modal">
    <div class="modal-in-dark-div" v-show="darkDivYN" />
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>{{ modalTitle }}</span>
        </h1>
      </article>
      <button @click="$emit('modalClose')">
        <span v-for="x in 2" :key="x" />
      </button>
    </header>
    <article class="contents">
      <component :is="componentName"
        :sendData="sendData"
        :modalInDarkDivOpen="modalInDarkDivOpen"
        :modalInDarkDivClose="modalInDarkDivClose"
      />
    </article>
  </section>
</template>

<script>
import { Store } from './store';
import editIcon from './img/icon/edit.png';

export default {
  props: {
    componentName: String,
    modalSeq: String,
    modalTitle: String,
  },
  components: { // 사용할 컴포넌트 리스트
    Dashboard: () => import('./pageComponents/Dashboard'), // Dashboard, // 대쉬보드 페이지
    Setting: () => import('./pageComponents/Setting'), // Setting,  // 설정 페이지
    HtmlEditor: () => import('./pageComponents/HtmlEditor'), // HtmlEditor, // 소개 페이지 수정
    Notice: () => import('./pageComponents/Notice'), // Notice, // 공지사항
    University: () => import('./pageComponents/University'), // Survey, // 설문조사
    TeacherManagement: () => import('./pageComponents/TeacherManagement'), // University, // 도시재생대학 - 과정관리
    ResidentBusiness: () => import('./pageComponents/ResidentBusiness'), // TeacherManagement, // 도시재생대학 - 강사관리
    Survey: () => import('./pageComponents/Survey'), // ResidentBusiness, // 주민공모사업 - 공모사업 관리
    ResidentCommunity: () => import('./pageComponents/ResidentCommunity'), // ResidentCommunity, // 주민공동체 - 공동체 관리
    BusinessRecord: () => import('./pageComponents/BusinessRecord'), // BusinessPromotion, // 사업홍보물
    BusinessPromotion: () => import('./pageComponents/BusinessPromotion'), // BusinessRecord, // 사업기록
    ContestSchedule: () => import('./pageComponents/ContestSchedule'), // ContestSchedule, // 도시재생정보 - 공모일정 관리
    FoodShop: () => import('./pageComponents/FoodShop'), // FoodShop, // 푸드플랫폼 - 상점 관리
    FoodTownShop: () => import('./pageComponents/FoodTownShop'), // FoodTownShop, // 먹거리타운 - 상점 관리
    MediaSchedule: () => import('./pageComponents/MediaSchedule'), // MediaSchedule, // 미디어글라스 - 미디어 스케줄 관리
    DlabMedia: () => import('./pageComponents/DlabMedia'), // DlabMedia, // D-LAB - 공식 미디어 관리
    DlabReservation: () => import('./pageComponents/DlabReservation'), // DlabReservation, // D-LAB - 예약 관리
    DlabSurvey: () => import('./pageComponents/DlabSurvey'), // DlabSurvey, // D-LAB - 설문 관리
    PublicHearing: () => import('./pageComponents/PublicHearing'), // PublicHearing, // 주민공청회 - 공청회 관리
    PublicHearingSurvey: () => import('./pageComponents/PublicHearingSurvey'), // PublicHearingSurvey, // 주민공청회 - 설문 관리
  },
  data() {
    return {
      editIcon,
      sendData: {},
      darkDivYN: false,
    }
  },
  created() {
    if (this.modalSeq == '9001' || this.modalSeq == '9002') {
      this.sendData = (Store.defaultIconList ?? []).find(x => x.MENU_SN == this.modalSeq);  
    } else {
      this.sendData = (Store.iconList ?? []).find(x => x.MENU_SN == this.modalSeq);
    }
    console.log('해당모달 정보 : ', this.sendData);
  },
  methods: {
    modalInDarkDivOpen() { this.darkDivYN = true },
    modalInDarkDivClose() { this.darkDivYN = false },
  },
}
</script>

<style lang="scss">
div.modal-in-dark-div {
  background-color: #00000050;
  position: fixed;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  width: 100%;
  height: 100%;
  z-index: 1800;
}
section.v-modal {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  background-color: #fff;
  position: fixed;
  border: 1px solid #aaa;
  border-radius: 10px;
  z-index: 2000;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 60px;
    background-color: #FDF4F5;
    button {
      float: right;
      display: block;
      background-color: #ff6a6a;
      width: 26px;
      height: 26px;
      color: #fff;
      position: relative;
      border-radius: 200px;
      cursor: pointer;
      border: none;
      &.saveBtn {
        width: 70px;
        margin-right: 10px;
        background-color: #0662f9;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          box-shadow: 0 0px 2px #00000070;
        }
        i {
          margin-right: 5px;
        }
      }
      &.stopBtn {
        width: 130px;
        margin-right: 10px;
        background-color: #e67a04;
        display: flex;
        align-items: center;
        justify-content: center;
        &:hover {
          box-shadow: 0 0px 2px #00000070;
        }
        i {
          margin-right: 5px;
        }
      }
      span {
        position: absolute;
        width: 50%;
        height: 2px;
        background-color: #fff;
        border-radius: 10px;
        top: 50%;
        left: 50%;
      }
      span:first-of-type {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      span:last-of-type {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
    h1 {
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      .icon {
        width: 24px;
        height: 24px;
        display: inline-block;
        margin-right: 10px;
        background-position: center;
        background-size: 94%;
        background-repeat: no-repeat;
      }
    }
  }
  .contents {
    height: calc(100% - 60px);
    & > section {
      height: 100%;
      position: relative;
    }
  }
}
</style>