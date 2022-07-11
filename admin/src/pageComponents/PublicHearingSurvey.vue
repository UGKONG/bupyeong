<template>
  <section>
    <section class="main">
      <table border="1">
        <thead>
          <tr>
            <th>
              <input type="checkbox" id="survey-all-check" @click="surveyAllCheck" />
              <label for="survey-all-check" />
            </th>
            <th v-for="item in titleList" :key="item" v-text="item" />
          </tr>
        </thead>
        <tbody>
          <v-survey-list v-for="(item, idx) in surveyList"
            :key="idx" :item="item" :idx="idx" :surveyList="surveyList"
            @setSelectCount="setSelectCount"
            @setModalType="setModalType"
            @setSelectSurveySeq="setSelectSurveySeq"
            @setAddSurveyModalYN="setAddSurveyModalYN"
          />
          <tr v-if="surveyList.length == 0">
            <td colspan="9">리스트가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <footer class="finder-footer">
      <div class="left">
        <button @click="addSurveyModalOpen">설문추가</button>
        <button v-if="selectCount != 0" @click="selectedDel">선택삭제</button>
        <span>선택 수 : {{ selectCount }}</span>
      </div>
      <div class="right">
        <span class="total-count">
          총 리스트 수 : {{ listCount }}
        </span>
      </div>
    </footer>

    <addSurveyModal 
      v-if="addSurveyModalYN" 
      :modalType="modalType"
      :selectSurveySeq="selectSurveySeq"
      @add-survey-modal-close="addSurveyModalClose"
    />

  </section>
</template>

<script>
import { useRest } from '../hook';
import { Store } from '../store';
import addSurveyModal from '../pageSubComponents/PublicHearingSurvey/addSurveyModal';
import surveyList from '../pageSubComponents/PublicHearingSurvey/surveyList';
export default {
  components: {
    addSurveyModal,
    'v-survey-list': surveyList,
  },
  props: {
    sendData: Object,
    modalInDarkDivOpen: Function,
    modalInDarkDivClose: Function,
  },
  data() {
    return {
      titleList: ['N o', '설문 제목', '응 답 수', '설문기간', '작 성 자', '작 성 일', '결과보기', '위 치'],
      modalType: 'C',
      selectSurveySeq: '',
      listCount: 0,
      selectCount: 0,
      surveyList: [],
      addSurveyModalYN: false,
    }
  },
  created() {

    useRest({
      url: Store.globalURL + 'admin_surveyList',
      success: (data) => {
        this.surveyList = data
        this.listCount = this.surveyList.length;
      }
    });

  },
  methods: {
    setSelectCount(val) {this.selectCount = val},
    setModalType(val) {this.modalType = val},
    setSelectSurveySeq(val) {this.selectSurveySeq = val},
    setAddSurveyModalYN(val) {this.addSurveyModalYN = val},
    surveyAllCheck(e) {
      let bool = e.target.checked;
      document.querySelectorAll('[id^="surveyChk_"]').forEach(el => el.checked = (bool ? true : false));
      this.selectCount = document.querySelectorAll('[id^="surveyChk_"]:checked').length;
    },
    surveyCheck(e) {
      let bool = e.target.checked;
      let allCount = this.surveyList.length;
      let els = document.querySelectorAll('[id^="surveyChk_"]:checked');
      this.selectCount = els.length;
      document.querySelector('#survey-all-check').checked = allCount == els.length ? true : false;
    },
    editSurvey(e) {
      if (e.target.className == 'btn') {
        window.open('', '', 'width=700, height=800');
        return;
      }
      let seq = e.target.parentNode.getAttribute('data-seq');
      this.modalType = 'U';
      this.selectSurveySeq = seq;
      this.addSurveyModalYN = true;
    },
    addSurveyModalOpen(e) {
      this.modalType = 'C';
      this.selectSurveySeq = '';
      this.addSurveyModalYN = true;
    },
    addSurveyModalClose(e) {
      this.addSurveyModalYN = false;
    },
    selectedDel(e) {
      let els = document.querySelectorAll('[id^=surveyChk_');
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
        title: '설문조사',
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
    thead {
      position: sticky;
      top: -22px;
      z-index: 2;
      th {
        height: 40px;
        background-color: #eee;
        font-weight: 500;
        position: relative;
        text-align: center;
        &:nth-of-type(1) {width: 50px;}
        &:nth-of-type(2) {width: 70px;}
        &:nth-of-type(3) {width: auto;}
        &:nth-of-type(4) {width: 90px;}
        &:nth-of-type(5) {width: 200px;}
        &:nth-of-type(6) {width: 10%;}
        &:nth-of-type(7) {width: 120px;}
        &:nth-of-type(8) {width: 100px;}
        &:nth-of-type(9) {width: 100px;}
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
td {height: 34px;font-size: 14px;text-align: center;color: #999;}
</style>