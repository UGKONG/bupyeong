<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span v-text="`설문지 ${returnModalType}`" />
        </h1>
      </article>
      <article>
        <button @click="$emit('add-survey-modal-close')">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="surveySave">
          <i class="far fa-save" />저 장
        </button>
      </article>
    </header>
    <article class="contents" style="overflow: auto" s-scroll>
      <div class="default-div">
        <label for="editSurveyTitle" v-text="'설문제목 : '" />
        <input id="editSurveyTitle" ref="editSurveyTitle" v-model="addSurveyData.surveyTitle" placeholder="제목을 입력해주세요." />
        <p>
          <input type="checkbox" id="editSurveyAnswerView" :checked="returnTrue(addSurveyData.answerViewYN)" @click="answerViewClick">
          <label for="editSurveyAnswerView" v-text="'결과확인가능'"/>
          <label for="editSurveyAnswerView" switch><span /></label>
        </p>
      </div>
      <div class="default-div">
        <label for="editSurveyDate1" v-text="'응답기간 : '" />
        <input type="date" id="editSurveyDate1" v-model="addSurveyData.startDT" ref="startDTRef" @change="setEndDT" />
        <label for="editSurveyDate2" v-text="' ~ '" />
        <input type="date" id="editSurveyDate2" v-model="addSurveyData.endDT" ref="endDTRef" @change="setEndDT" />
      </div>

      <surveyMake 
        :surveyData="addSurveyData" @set-survey-data="setAddSurveyData"
        :askList="addSurveyDataAsk" @set-ask-list="setAddSurveyDataAsk"
        :answerList="addSurveyDataAnswer" @set-answer-list="setAddSurveyDataAnswer"
        :addAskBtnType="addAskBtnType" @set-add-ask-btn-type="setAddAskBtnType"
        :selectedAskData="selectedAskData" @set-selected-ask-data="setSelectedAskData"
        :selectedAnswerData="selectedAnswerData" @set-selected-answer-data="setSelectedAnswerData"
        :tempAskNumber="tempAskNumber" :tempAnswerNumber="tempAnswerNumber"
        :setTempAskNumber="setTempAskNumber" :setTempAnswerNumber="setTempAnswerNumber"
        
      />

      <surveyMakeList 
        :surveyData="addSurveyData" @set-survey-data="setAddSurveyData"
        :askList="addSurveyDataAsk" @set-ask-list="setAddSurveyDataAsk"
        :answerList="addSurveyDataAnswer" @set-answer-list="setAddSurveyDataAnswer"
        :addAskBtnType="addAskBtnType" @set-add-ask-btn-type="setAddAskBtnType"
        :selectedAskData="selectedAskData" @set-selected-ask-data="setSelectedAskData"
        :selectedAnswerData="selectedAnswerData" @set-selected-answer-data="setSelectedAnswerData"
        :tempAskNumber="tempAskNumber" :tempAnswerNumber="tempAnswerNumber"
        :setTempAskNumber="setTempAskNumber" :setTempAnswerNumber="setTempAnswerNumber"
      />

    </article>
  </section>
</template>

<script>
import editIcon from '../../img/icon/edit.png';
import { Store } from '../../store';
import { useRest, useToday, useMaxArr } from '../../hook';

export default {
  props: {
    modalType: String,
    selectSurveySeq: String,
  },
  components: {
    surveyMakeList: () => import('../PublicHearingSurvey/surveyMakeList.vue'),
    surveyMake: () => import('../PublicHearingSurvey/surveyMake.vue'),
  },
  data() {
    return {
      editIcon,
      addSurveyData: {},
      addSurveyDataAsk: [], // main
      addSurveyDataAnswer: [], // main
      addAskBtnType: 'C',
      selectedAskData: {},
      selectedAnswerData: [],
      tempAskNumber: 0,
      tempAnswerNumber: 0,
    }
  },
  created() {
    if (this.modalType == 'C') {
      this.addSurveyData = {
        surveyTitle: '',
        startDT: useToday(),
        endDT: this.returnTomorrow,
        answerViewYN: '1',
      };
      this.addSurveyDataAsk = [];
      this.addSurveyDataAnswer = [];

      
      this.setTempAskNumber(0);
      this.setTempAnswerNumber(0);
      return;
    }

    useRest({
      url: Store.globalURL + 'admin_surveyData',
      success: (data) => {
        this.addSurveyData = data;

        useRest({
          url: Store.globalURL + 'admin_surveyDataAskList',
          success: (data) => {
            this.addSurveyDataAsk = data;
            this.addSurveyDataAsk.forEach(obj => obj.tempAskSeq = obj.askSeq);
            this.setTempAskNumber(Number(useMaxArr(this.addSurveyDataAsk, 'tempAskSeq').tempAskSeq));
            useRest({
              url: Store.globalURL + 'admin_surveyDataAnswerList',
              success: (data) => {
                this.addSurveyDataAnswer = data;
                this.addSurveyDataAnswer.forEach(obj => {
                  obj.tempAskSeq = obj.askSeq;
                  obj.tempAnswerSeq = obj.answerSeq;
                });
                this.setTempAnswerNumber(Number(useMaxArr(this.addSurveyDataAnswer, 'tempAnswerSeq').tempAnswerSeq));
              }
            });
          }
        });
      }
    });
    
    
  },
  methods: {
    setTempAskNumber(num) {
      this.tempAskNumber = num;
    },
    setTempAnswerNumber(num) {
      this.tempAnswerNumber = num;
    },
    surveySave() {    // 설문지 저장
      
      let pass = true;
      let text = '';

      if (this.$refs.editSurveyTitle.value == '') {
        pass = false;
        text = '설문 제목을 입력해주세요.';
        this.$refs.editSurveyTitle.focus();
      }  else if (this.$refs.startDTRef.value == '') {
        pass = false;
        text = '응답 시작일자를 선택해주세요.';
        this.$refs.startDTRef.focus();
      } else if (this.$refs.endDTRef.value == '') {
        pass = false;
        text = '응답 종료일자를 선택해주세요.';
        this.$refs.endDTRef.focus();
      } else if (this.addSurveyDataAnswer.length == 0) {
        pass = false;
        text = '설문 내용이 비었습니다.';
      }

      if (!pass) { 
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn',
          title: '설문지 설정',
          text: text
        });
        return;
      }

      
      let type = this.modalType;

      console.log(type == 'C' ? '신규생성' : '수정');
      console.log('설문지 정보', this.addSurveyData);
      console.log('질문 정보', this.addSurveyDataAsk);
      console.log('답안항목 정보', this.addSurveyDataAnswer);

      if (type == 'C') {  // 신규 등록
          Store.setAlertYN(true);
          Store.setAlertInfo({
            icon: 'success',
            title: '설문지 추가',
            text: '설문지가 추가되었습니다.'
          });
      } else {    // 수정
          Store.setAlertYN(true);
          Store.setAlertInfo({
            icon: 'success',
            title: '설문지 수정',
            text: '설문지가 수정되었습니다.'
          });
      }
    },
    setAddSurveyDataAsk(askArr) { 
      this.addSurveyDataAsk = askArr;
    },
    setAddSurveyDataAnswer(answerArr) { 
      this.addSurveyDataAnswer = answerArr;
    },
    setAddSurveyData(surveyData) { 
      this.addSurveyData = surveyData;
    },
    returnTrue(val = '0') {
      let result = val == '0' ? false : true;
      return result;
    },
    answerViewClick(e) {
      this.addSurveyData.answerViewYN = e.target.checked ? '1' : '0';
    },
    setAddAskBtnType(type = 'C') {
      this.addAskBtnType = type;
    },
    setSelectedAskData(obj = {}) {
      this.selectedAskData = obj;
    },
    setSelectedAnswerData(arr = []) {
      this.selectedAnswerData = arr;
    },
    setEndDT() {
      let _startDT = this.$refs.startDTRef.value;
      let _endDT = this.$refs.endDTRef.value;

      let startDT = new Date(_startDT);
      let endDT = new Date(_endDT);

      startDT.setHours(0);
      endDT.setHours(0);
      startDT.setMinutes(0);
      endDT.setMinutes(0);
      startDT.setSeconds(0);
      endDT.setSeconds(0);
      startDT.setMilliseconds(0);
      endDT.setMilliseconds(0);

      let calc = endDT - startDT;


      if (calc < 86300000) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn',
          title: '설문지 설정',
          text: '응답시작 일자 이후로 선택해주세요.'
        });
        this.$refs.endDTRef.value = '';
        return;
      }
    },
  },
  computed: {
    returnModalType() {
      let result = 
        this.modalType == 'C' ? '추가' : 
        this.modalType == 'U' ? '수정' : '';
      return result;
    },
    returnTomorrow() {
      let date = new Date(useToday());
      date.setMonth(date.getMonth() + 1);
      date = useToday(date);
      return date;
    }
  }
}
</script>

<style lang="scss" scoped>
section.sModal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #aaa;
  /* border-radius: 10px; */
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
  label {
    font-size: 14px;
    margin-right: 4px;
    color: #232323;
  }
  .c-top {
    width: 100%;
    height: 66px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .top-left {
      display: flex;
      align-items: center;
    }
    p {
      margin-right: 20px;
      &.s {
        font-size: 14px;
      }
      input:not([type="checkbox"]) {
        padding: 0 5px;
        width: 150px;
        height: 30px;
        border-radius: 0;
        border: 1px solid #ccc;
      }
    }
  }
  .c-bottom {
    width: 100%;
    height: calc(100% - 66px);
    padding: 0 20px 20px;
    overflow: auto;
    p {
      &.title {
        padding: 10px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > span:nth-of-type(1) {width: 70%;}
        & > span:nth-of-type(2) {width: auto;}
        input {
          padding: 0 5px;
          width: calc(100% - 80px);
          min-width: 50%;
          height: 30px;
          border-radius: 0;
          border: 1px solid #ccc;
          margin-right: 20px;
        }
        select {
          padding: 0 5px;
          width: 140px;
          height: 30px;
          border-radius: 0;
          border: 1px solid #ccc;
        }
      }
    }
    .contents {
      display: block;
      height: unset;
      margin-bottom: 6px;
    }
    #surveyeContents {
      width: 100%;
      height: calc(100% - 112px);
      resize: none;
      border: 1px solid #ccc;
      padding: 6px;
    }
    .info {
      height: 30px;
      display: flex;
      align-items: flex-end;
      font-size: 14px;
      span {
        margin-right: 20px;
      }
    }
  }
}
.default-div {
  padding: 10px;
  position: relative;
  p {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    input {
      display: none;
      &:checked {
        & + label {
          color: #000;
        }
        & ~ label[switch] {
          background-color: #4bc64b;
          &  > span {
            left: 20px;
          }
        }
      }
    }
    label {
      font-size: 16px;
      color: #aaa;
      
      &[switch] {
        width: 50px;
        height: 28px;
        margin-left: 10px;
        display: inline-block;
        border: 1px solid #eee;
        background-color: #ddd;;
        padding: 2px;
        border-radius: 100px;
        transform: translateY(2px);
        overflow: hidden;
        cursor: pointer;
        transition: .3s;
        position: relative;
        span {
          position: absolute;
          top: 2px;
          left: 2px;
          width: 26px;
          height: calc(100% - 4px);
          background-color: #fff;
          display: block;
          border-radius: 100px;
          transition: .3s;
        }
      }
    }
  }
  label {
    margin-right: 20px;
    &[for="editSurveyTitle"] {
      font-size: 36px;
    }
  }
  input:not([type="checkbox"], [type="radio"]) {
    padding: 0 4px;
    height: 30px;
    border: 1px solid #aaa;
    &#editSurveyTitle {
      font-size: 40px;
      height: 66px;
      padding: 0 10px;
      border: 1px solid transparent;
      transition: .3s;
      color: #666;
      &:hover {
        border: 1px solid #aaa;
      }
    }
  }
}
</style>