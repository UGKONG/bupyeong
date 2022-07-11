<template>
  <div class="makeAskFrm">
    <h2 v-if="addAskBtnType == 'U'">{{ tempAsk.order }}. 설문 항목</h2>
    <div class="v-row">
      <label for="makeSurveyTitle" v-text="'항목 제목'" />
      <input id="makeSurveyTitle" v-model="tempAsk.title" ref="titleInput" placeholder="제목을 입력해주세요.">
    </div>
    <div class="v-row">
      <label for="makeSurveySubTitle" v-text="'항목 설명'" />
      <input id="makeSurveySubTitle" v-model="tempAsk.subTitle" ref="subTitleInput" placeholder="설명을 입력해주세요. (선택입력)">
    </div>
    <div class="v-row">
      <label for="makeSurveyType" v-text="'항목 유형'"/>
      <select id="makeSurveyType" v-model="tempAsk.type" @change="askTypeChange">
        <option v-for="type in typeList" :key="'option' + type.typeSeq" :value="type.typeSeq" v-text="type.text" />
      </select>
    </div>

    <ul class="option-list" v-if="tempAsk.type != '3'">
      <li v-for="answer in orderTempArr" :key="'answer_' + answer.order" :data-order="answer.order" :data-type="answer.type">
        <button @click="listUp" :disabled="delNone"><i class="fas fa-caret-up" /></button>
        <button @click="listDown" :disabled="delNone"><i class="fas fa-caret-down" /></button>
        <input :type="inputType(tempAsk.type)" name="makeAnswer" />
        <label v-if="answer.type == '2'" :for="'answer' + answer.order" v-text="'기타'" />
        <input type="text" v-model="answer.exam_item" ref="answerInput" :id="'answer' + answer.order" :placeholder="'옵션' + answer.order" />
        <button @click="delTempAnswer"><i class="fas fa-minus" /></button>
      </li>
      <button v-if="tempAnswerCount < 10" @click="addTempAnswerNum" :data-CU="addAskBtnType" v-text="'보기추가'" />
      <button v-if="!answerTxt" @click="addTempAnswerTxt" :data-CU="addAskBtnType" v-text="'기타추가'" />
    </ul>

    <div class="add-survey-btn" :data-type="tempAsk.type" :data-CU="addAskBtnType">
      <button @click="saveAsk" v-text="'확인'" />
      <button @click="resetAsk" v-text="'초기화 후 새로만들기'" />
    </div>
  </div>
</template>

<script>
import { Store } from '../../store';
export default {
  props: {
    askList: Array,
    answerList: Array,
    addAskBtnType: String, // C / U
    selectedAskData: Object,  // U 일 경우 수정 선택한 문제 Object
    selectedAnswerData: Array,  // U 일 경우 수정 선택한 문제 보기 Array
    tempAskNumber: Number,
    tempAnswerNumber: Number,
    setTempAskNumber: Function,
    setTempAnswerNumber: Function,
  },
  data() {
    return {
      answerTxt: false,
      typeList: [{typeSeq: 1, text: '단일선택형'}, {typeSeq: 2, text: '복수선택형'}, {typeSeq: 3, text: '주관식 서술형'}],
      tempAsk: { 
        askSeq: '0',
        tempAskSeq: '0',
        order: '0',
        type: '1',
        title: '',
        subTitle: '',
        allCount: '0'
      },
      tempAnswer: [{
        answerSeq: '0', 
        tempAnswerSeq: '0',
        tempAskSeq: '0',
        order: '1', 
        type: '1', 
        exam_item: '', 
        value: '', 
        answerCount: '0'
      }],
    }
  },
  created() {
    this.tempAsk.order = String(this.askList.length + 1);
    this.resetAsk();
  },
  watch: {
    selectedAskData() {
      if (this.addAskBtnType == 'C') return;
      this.tempAsk = this.selectedAskData;
      this.tempAnswer = this.selectedAnswerData;
      this.tempAnswer.forEach(answer => {
        if (answer.type == '2') {
          this.answerTxt = true;
        }
      })
    },
  },
  methods: {
    maxValue(arr, prop) {
      let tempArr = [...arr];
      if (tempArr.length == 0) {
        return 1;
      }
      tempArr.sort((a, b) => a[prop] - b[prop]);
      let result = Number(tempArr[tempArr.length - 1][prop]) + 1;
      return String(result);
    },
    saveAsk(e) {
      let type = e.target.parentNode.getAttribute('data-type');
      let CU = e.target.parentNode.getAttribute('data-CU');
      let state = true;
      let nullText = '';
      console.log(type);
      // validation
      if (this.$refs.titleInput.value == '') {
        state = false;
        nullText = '항목 제목';
        this.$refs.titleInput.focus();
      }
      this.$refs.answerInput.forEach(obj => {
        if (obj.value == '') {
          state = false;
          nullText = '보기 항목';
          obj.focus();
          return;
        }
      });
      if (!state) {
        Store.setAlertYN(true, 2000);
        Store.setAlertInfo({
          icon: 'warn',
          title: '설문지 항목 작성',
          text: nullText + '을 입력해주세요.'
        });
        return;
      }
      
      // 서술형 답변
      if (type == '3') {
        this.tempAnswer[0].exam_item = '서술형 답변';
        this.tempAnswer[0].type = '3';
      }

      let tempAskArr = [...this.askList];
      let tempAnswerArr = [...this.answerList];

      if ( CU == 'C' ) {
        this.setTempAskNumber(this.tempAskNumber + 1);
        this.setTempAnswerNumber(this.tempAnswerNumber + 1);
        this.tempAsk.tempAskSeq = this.tempAskNumber;
        tempAskArr.push(this.tempAsk);
        this.tempAnswer.forEach(obj => tempAnswerArr.push(obj));
        this.$emit('set-ask-list', tempAskArr);
        this.$emit('set-answer-list', tempAnswerArr);

      } else if ( CU == 'U' ) {
        let thatAskArr = this.askList.filter(x => x.tempAskSeq != this.tempAsk.tempAskSeq);
        thatAskArr.push(this.tempAsk);
        this.$emit('set-ask-list', thatAskArr);

        let thatAnswerArr = this.answerList.filter(x => x.tempAskSeq != this.tempAsk.tempAskSeq);
        let answerResult = thatAnswerArr.concat(this.tempAnswer);
        this.$emit('set-answer-list', answerResult);
      }

      Store.setAlertYN(true);
      Store.setAlertInfo({icon: 'success', title: '항목 설정', text: '항목이 ' + (CU == 'C' ? '추가' : '수정') + '되었습니다.'});
      

      this.resetAsk();
      
    },
    inputType(type) {
      return type == 1 ? 'radio' : 'checkbox';
    },
    listUpDownFn(e, dir) {
      let tempList = [];
      let order = e.currentTarget.parentNode.getAttribute('data-order');
      let otherObj = this.tempAnswer.filter(x => x.order != order);
      let thisObj = this.tempAnswer.find(x => x.order == order);

      if (order == (dir == 'up' ? '1' : this.tempAnswer.length)) return;
      let tempObj = this.tempAnswer.find(x => x.order == Number(thisObj.order) + (dir == 'up' ? -1 : 1));

      thisObj.order = String(Number(thisObj.order) + (dir == 'up' ? -1 : 1));
      tempObj.order = String(Number(tempObj.order) + (dir == 'up' ? 1 : -1));
      otherObj.forEach(obj => tempList.push(obj));
      tempList.push(thisObj);
      this.tempAnswer = tempList;
    },
    listUp(e) {
      this.listUpDownFn(e, 'up');
    },
    listDown(e) {
      this.listUpDownFn(e, 'down');
    },
    addTempAnswerNum(e) {
      let CU = e.target.getAttribute('data-CU');

      let tempArr = [...this.tempAnswer];
      let newAnswerObj = {
        answerSeq: '0',
        tempAnswerSeq: this.tempAnswerNumber + 1,
        tempAskSeq: CU == 'C' ? this.tempAskNumber : this.selectedAskData.tempAskSeq,
        order: String(tempArr.length + 1),
        type: '1',
        exam_item: '',
        value: '',
        answerCount: '0'
      }
      tempArr.push(newAnswerObj);
      this.tempAnswer = tempArr;
      this.setTempAnswerNumber(this.tempAnswerNumber + 1);
    },
    addTempAnswerTxt(e) {
      let CU = e.target.getAttribute('data-CU');

      let tempArr = [...this.tempAnswer];
      let newAnswerObj = {
        answerSeq: '0',
        tempAnswerSeq: this.tempAnswerNumber + 1,
        tempAskSeq: CU == 'C' ? this.tempAskNumber : this.selectedAskData.tempAskSeq,
        order: String(tempArr.length + 1),
        type: '2',
        exam_item: '',
        value: '',
        answerCount: '',
      }
      tempArr.push(newAnswerObj);
      this.tempAnswer = tempArr;

      this.answerTxt = true;
      this.setTempAnswerNumber(this.tempAnswerNumber + 1);

    },
    delTempAnswer(e) {
      if (this.tempAnswer.length <= 1) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn',
          title: '보기 항목',
          text: '마지막 보기 항목 입니다.'
        });
        return;
      }
      let order = e.currentTarget.parentNode.getAttribute('data-order');
      let type = e.currentTarget.parentNode.getAttribute('data-type');
      let tempOrderArrUp = this.tempAnswer.filter(x => x.order < order);
      let tempOrderArrDown = this.tempAnswer.filter(x => x.order > order);
      let tempArr = [];

      tempOrderArrUp.forEach(obj => tempArr.push(obj));
      tempOrderArrDown.forEach(obj => {
        obj.order -= 1;
        tempArr.push(obj);
      });
      
      this.tempAnswer = tempArr;

      if (type == '2') this.answerTxt = false;
    },
    askTypeChange(e) {
      

      if (this.addAskBtnType == 'C') {
        this.tempAnswer = [{answerSeq: '0', tempAnswerSeq: this.tempAnswerNumber, tempAskSeq: this.tempAskNumber, order: '1', type: '1', exam_item: '', value: '', answerCount: '0'}]
      } else {
        this.tempAnswer = [{answerSeq: '0', tempAnswerSeq: this.tempAnswerNumber, tempAskSeq: this.selectedAskData.askSeq, order: '1', type: '1', exam_item: '', value: '', answerCount: '0'}]
      }
    },
    resetAsk(e) {
      this.tempAsk = { askSeq: '0', tempAskSeq: this.tempAskNumber + 1, order: String(this.askList.length + 1), type: '1', title: '', subTitle: '', allCount: '0'}
      this.tempAnswer = [{answerSeq: '0', tempAnswerSeq: this.tempAnswerNumber + 1, tempAskSeq: this.tempAskNumber + 1, order: '1', type: '1', exam_item: '', value: '', answerCount: '0'}]
      
      this.$emit('set-add-ask-btn-type', 'C');
      this.$emit('set-selected-ask-data', null);
      this.$emit('set-selected-answer-data', []);
      this.answerTxt = false;
      
      this.setTempAskNumber(this.tempAskNumber + 1);
      this.setTempAnswerNumber(this.tempAnswerNumber + 1);
    },
  },
  computed: {
    tempAnswerCount() {
      return this.tempAnswer.length;
    },
    orderTempArr () {
      return this.tempAnswer.sort((a, b) => a.order - b.order);
    },
    delNone() {
      return this.tempAnswer.length < 2;
    },
  }
}
</script>

<style lang="scss" scoped>

.makeAskFrm {
  padding: 20px;
  background-color: cornsilk;
  margin-top: 20px;
  & > h2 {
    margin-bottom: 12px;
  }
  div.v-row {
    display: flex;
    align-items: center;
    padding: 4px 0;
    label {
      font-size: 15px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      & + * {
        height: 30px;
        border: 1px solid #aaa;
        border-radius: 2px;
      }
    }
    input {
      width: 60%;
      padding: 0 8px;
    }
    select {
      width: 140px;
    }
  }

  & > ul {
    margin: 14px 0;
    padding: 1px 4px;

    li {
      padding: 3px 0;
      button {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: none;
        background-color: cornflowerblue;
        color: #fff;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        &:last-of-type {
          background-color: #ff6262;
        }
      }
      & > label {
        font-size: 14px;
        display: inline-block;
        transform: translateY(-1px);
      }
    }
    input[type="radio"], input[type="checkbox"] {
      margin-left: 14px;
    }
    input:not([type="radio"], [type="checkbox"]) {
      height: 30px;
      border: 1px solid #aaa;
      border-radius: 2px;
      margin-left: 3px;
      margin-right: 10px;
      padding: 0 6px;
    }
    li + button {
      margin-left: 90px;
    }
    li ~ button {
      padding: 4px 10px;
      font-size: 12px;
      background-color: #888;
      color: #fff;
      margin-top: 10px;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
  }

  .add-survey-btn {
  
    button {
      padding: 6px 14px;
      font-size: 12px;
      background-color: #5187e1;
      color: #fff;
      margin-top: 10px;
      border: none;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      &:last-of-type {
        background-color: #ff6262;
      }
    }
  }

}
</style>