<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="process-all-check" @click="processAllCheck" />
              <label for="process-all-check" />
            </th>
            <th v-for="item in titleList" :key="item" v-text="item" />
            <th colspan="2" />
          </tr>
        </thead>
        <tbody>
          <processList v-for="(item, idx) in processList"
            :key="idx" :item="item" :idx="idx" :processList="processList"
            :modalInDarkDivOpen="modalInDarkDivOpen"
            @setSelectCount="setSelectCount"
            @setModalType="setModalType"
            @setSelectProcessSeq="setSelectProcessSeq"
            @setSelectProcessData="setSelectProcessData"
            @setAddProcessModalYN="setAddProcessModalYN"
            @setRequestModalYN="setRequestModalYN"
            @setRecruitmentModalYN="setRecruitmentModalYN"
          />
          <tr v-if="processList.length == 0">
            <td colspan="11">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>
    <footer class="finder-footer">
      <div class="left">
        <button @click="addProcessModalOpen">과정추가</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addProcessModal 
      v-if="addProcessModalYN" 
      :modalType="modalType"
      :selectProcessSeq="selectProcessSeq"
      @getList="getList"
      @addProcessModalClose="addProcessModalClose"
    />

    <requestModal 
      v-if="requestModalYN" 
      :modalType="modalType"
      :selectProcessData="selectProcessData"
      :requestNoModalYN="requestNoModalYN"
      @requestNoModalOpen="requestNoModalOpen"
      @requestModalClose="requestModalClose"
    />

    <recruitmentModal 
      v-if="recruitmentModalYN"
      :selectProcessData="selectProcessData"
      @recruitmentModalClose="recruitmentModalClose"
    />

    <RequestNoModal
      v-if="requestNoModalYN"
      :requestNoSeq="requestNoSeq"
      @requestNoModalClose="requestNoModalClose"
    />
  </section>
</template>

<script>
import { Store } from '../store';
import { useAlert, useForm, useRest } from '../hook';
import axios from 'axios';

export default {
  components: {
    addProcessModal: () => import('../pageSubComponents/University/addProcessModal'),
    requestModal: () => import('../pageSubComponents/University/requestModal'),
    recruitmentModal: () => import('../pageSubComponents/University/recruitmentModal'),
    RequestNoModal: () => import('../pageSubComponents/University/requestNoModal'),
    processList: () => import('../pageSubComponents/University/processList'),
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ['N o', '과정명', '과정 매니저', '수강인원', '모집 시작일', '모집 종료일', '과정 시작일', '과정 종료일'],
      modalType: 'C',
      selectProcessSeq: 0,
      selectProcessData: {},
      listCount: 0,
      selectCount: 0,
      processList: [],
      addProcessModalYN: false,
      requestModalYN: false,
      requestNoSeq: '',
      requestNoModalYN: false,
      recruitmentModalYN: false,
    }
  },
  created() {
    this.getList();
  },
  methods: {
    setSelectCount(val) {this.selectCount = val},
    setModalType(val) {this.modalType = val},
    setSelectProcessSeq(val) {this.selectProcessSeq = val},
    setSelectProcessData(val) {this.selectProcessData = val},
    setAddProcessModalYN(val) {this.addProcessModalYN = val},
    setRequestModalYN(val) {this.requestModalYN = val},
    setRecruitmentModalYN(val) {this.recruitmentModalYN = val},

    getList() {
      let data = {TASK: 'R_CRS_LIST'}
      axios.post(this.$store.state.dbUrl + '/MNGR_CRS', useForm(data)).then(({data}) => {
        if (!data.RESULT && data?.CAUSE == 'SESSIONFAIL') return this.$store.dispatch('sessionFail');
        if (!data.RESULT) return useAlert.error('과정 관리', '과정 리스트를 불러오지 못했습니다.');
        this.processList = data.CRS_LIST;
        this.listCount = data.CRS_LIST.length;
      });
    },
    processAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="processChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="processChk_"]:checked').length;
    },
    addProcessModalOpen(e) {
      this.modalType = 'C';
      this.selectProcessSeq = 0;
      this.addProcessModalYN = true;
    },
    addProcessModalClose(e) {
      this.addProcessModalYN = false;
      this.modalInDarkDivClose();
    },
    requestModalClose(e) {
      this.requestModalYN = false;
      this.modalInDarkDivClose();
      this.requestNoModalClose();
    },
    requestNoModalOpen(seq) {
      this.requestNoModalYN = true;
      this.requestNoSeq = seq;
    },
    requestNoModalClose(e) {
      this.requestNoModalYN = false;
      this.requestNoSeq = '';
    },
    recruitmentModalClose(e) {
      this.recruitmentModalYN = false;
      this.modalInDarkDivClose();
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=processChk_');
      let arr = [];
      els.forEach(el => {
        let seq = el.id.split('_')[1];
        if (el.checked) {
          arr.push(seq);
        }
      });
      Store.setAlertYN(true);
      Store.setAlertInfo({
        icon: 'success',
        title: '과정 관리',
        text: arr.join(', ') + '의 항목이 삭제되었습니다.'
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.main {
  padding: 20px;
  height: calc(100% - 60px);
  overflow: auto;
  table {
    border-collapse: collapse;
    width: 100%;
    border-color: #ccc;
    table-layout: fixed;
    thead {
      position: sticky;
      top: -22px;
      z-index: 2;
      th {
        height: 40px;
        background-color: #eee;
        font-weight: 500;
        position: relative;
        white-space: nowrap;
        &:nth-of-type(1) {width: 44px;}
        &:nth-of-type(2) {width: 60px;}
        &:nth-of-type(3) {width: auto;}
        &:nth-of-type(4) {width: 140px;}
        &:nth-of-type(5) {width: 100px;}
        &:nth-of-type(6) {width: 100px;}
        &:nth-of-type(7) {width: 100px;}
        &:nth-of-type(8) {width: 100px;}
        &:nth-of-type(9) {width: 100px;}
        &:nth-of-type(10) {width: 200px;}
        label {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.finder-footer {
  height: 60px;
  border-top: 1px solid #aaa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding: 0 20px;
  button {
    padding: 5px 14px;
    margin-right: 5px;
    border: none;
    background-color: #efefef;
  }
  label {
    padding: 0 2px;
    margin: 4px;
  }
  .total-count {
    margin-left: 20px;
  }
}
td {
  height: 34px;
  font-size: 14px;
  text-align: center;
  color: #999;
}
</style>