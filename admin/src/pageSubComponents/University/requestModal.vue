<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>과정 신청자 리스트 관리</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('requestModalClose')">
          <span v-for="x in 2" :key="x" />
        </button>
      </article>
    </header>

    <article class="contents">
      <h2>
        과정 제목 : {{ selectProcessData.processTitle }}
      </h2>
      <table class="ui celled table">
        <thead>
          <tr>
            <th v-text="'No'" />
            <th v-text="tableTitle[0]" />
            <th v-text="tableTitle[1]" />
            <th v-text="tableTitle[2]" />
            <th v-text="tableTitle[3]" />
            <th colspan="2" v-text="tableTitle[4]" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(req, idx) in requestList" :key="req.requestSeq">
            <td v-text="idx + 1" />
            <td v-text="req.requestPersonName" />
            <td v-text="req.requestPhone" />
            <td v-text="req.requestDT_TM" />
            <td>
              <button :data-seq="req.requestSeq" @click="requestDocView">신청내역 보기</button>
            </td>
            <td :colspan="req.state != '0' ? 2 : 1" :style="[{
              padding: '7px',
              color: req.state == '1' ? 'darkgreen' : req.state == '2' ? 'orangered' : '#555'
            }]" v-text="requestStateView(req.state)" />
            <td v-if="req.state == '0'">
              <div>
                <button :data-seq="req.requestSeq" @click="requestYes">수락</button>
                <button :data-seq="req.requestSeq" @click="requestNo">거절</button>
              </div>
            </td>
          </tr>
          <tr v-if="requestList.length == 0">
            <td colspan="5" style="
              color: #777;
              padding: 7px 0;
            ">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </article>
    <requestDocViewModal
      v-if="requestDocViewModalYN"
      :processRequestData="processRequestData"
      @requestDocViewModalOpen="requestDocViewModalOpen"
      @requestDocViewModalClose="requestDocViewModalClose"
    />
  </section>
</template>

<script>
import { Store } from '../../store';
import { useRest } from '../../hook';
import editIcon from '../../img/icon/edit.png';

export default {
  components: {
    requestDocViewModal: () => import('./requestDocViewModal.vue')
  },
  props: {
    modalType: String,
    requestNoModalYN: Boolean,
    selectProcessData: Object,
  },
  data() {
    return {
      editIcon,
      tableTitle: ['신청자명', '연락처', '신청일시', '신청내역', '상태'],
      // 과정 데이터 불러오기
      requestList: [],
      processRequestData: {},
      requestDocViewModalYN: false,
    }
  },
  created () {
    useRest({
      url: Store.globalURL + 'admin_processRequestList',
      success: (data) => this.requestList = data
    });
  },
  methods: {
    requestYes(e) {
      let seq = e.target.getAttribute('data-seq');
      let seqObj = this.requestList?.find(x => x.requestSeq == seq);
      Store.setAlertYN(true);
      Store.setAlertInfo({
        icon: 'success',
        title: '과정 신청자',
        text: seqObj.requestPersonName + '님이 수락되었습니다.'
      });
    },
    requestNo(e) {
      let seq = e.target.getAttribute('data-seq');
      if (this.requestNoModalYN) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn',
          title: '거절사유 입력',
          text: '작성 중인 거절사유를 완료해주세요.'
        });
        return;
      }
      this.$emit('requestNoModalOpen', seq);
    },
    requestStateView(state) {
      return state == '1' ? '수락됨' : state == '2' ? '거절됨' : '신청중';
    },
    requestDocViewModalOpen() {
      this.requestDocViewModalYN = true;
    },
    requestDocViewModalClose() {
      this.processRequestData = '';
      this.requestDocViewModalYN = false;
    },
    requestDocView(e) {
      let seq = e.target.getAttribute('data-seq');
      this.processRequestData = this.requestList.find(x => x.requestSeq == seq);
      this.requestDocViewModalOpen();
    }
  },
}
</script>

<style lang="scss" scoped>
section.sModal {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #aaa;
  /* border-radius: 10px; */
  width: 500px;
  height: 600px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
}
article.contents {
  overflow: auto;
  padding: 8px;
  
  h2 {
    padding: 14px 10px 0;
    font-size: 17px;
    font-weight: 500;
  }

  table {
    table-layout: fixed;
    border-radius: 0;
    thead {
      position: sticky;
      top: -1px;
      z-index: 2;
    }

    th {
      background-color: #f9fafb;
      text-align: center;
      &:nth-of-type(1) {width: 80px;}
      /* &:nth-of-type(2) {width: 120px;}
      &:nth-of-type(3) {width: 110px;}
      &:nth-of-type(4) {width: auto;} */
    }

    td {
      text-align: center;
      position: relative;
      padding: 8px 0;
      
      button {
        padding: 2px;
        background-color: transparent;
        box-shadow: none;
      }

      &:nth-of-type(3) button:hover {
        text-decoration: underline;
      }
      &:last-of-type {
        padding: 0;
      }
      &:last-of-type > div {
        width: 100%;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
      }
      &:last-of-type button {
        width: 50%;
        height: 100%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-of-type(1):hover {
          color: darkgreen;
          font-weight: 700;
        }
        &:nth-of-type(2):hover {
          color: orangered;
          font-weight: 700;
        }
      }

    }
  }
}
</style>