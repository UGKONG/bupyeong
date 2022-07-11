<template>
  <ul class="askList" ask>
    <li v-for="(ask, idx1) in orderAsk" :key="idx1" :data-seq="ask.tempAskSeq" :data-order="ask.order">
      <h3 v-text="`${ask.order}. ${ask.title}`" />
      <h4 v-text="ask.subTitle" />
      <div class="option" :data-seq="ask.tempAskSeq">
        <div class="edit-btn"><button v-text="'수 정'" @click="askEditBtnClick" /></div>
        <div class="del-btn"><button v-text="'삭 제'" @click="askDelBtnClick" /></div>
        <div class="up-down-btn" :data-order="ask.order">
          <button @click="listUp"><i class="fas fa-caret-up" /></button>
          <button @click="listDown"><i class="fas fa-caret-down" /></button>
        </div>
      </div>

      <ul answer>
        <li v-for="(answer, idx2) in filtedAnswerList(ask.tempAskSeq)" :key="idx2">
          <input v-if="answer.type == 1 || answer.type == 2" :type="inputType(ask.type)" data-type="1" 
            :data-txt-yn="answer.type == 2 ? '1' : '0'" :id="'answer' + answer.tempAnswerSeq" :name="'answer' + ask.tempAskSeq" 
            :data-ask-seq="ask.tempAskSeq" :data-seq-input="answer.tempAnswerSeq" />
          <label :for="'answer' + answer.tempAnswerSeq" :class="ask.type == 3 ? 'textAsk' : 'listAsk'">
            <span v-if="answer.type == 1 || answer.type == 2" v-text="listNumber[idx2]" />
            <span v-if="answer.type != 3" v-text="answer.exam_item" />
            <input v-if="answer.type == 2"
              :data-seq-input="answer.tempAnswerSeq" placeholder="선택입력" data-num-txt />
            <textarea v-if="answer.type == 3"
              data-type="2" :data-seq-input="answer.tempAnswerSeq" placeholder="선택입력" />
          </label>
        </li>
      </ul>

      <div class="edittingView" v-if="edittingFn(ask.tempAskSeq)" :data-seq="ask.tempAskSeq">{{ idx1 + 1 }}번 문항 수정중..</div>
    </li>

    <li v-if="askList.length == 0" class="noList">설문 내용이 없습니다.</li>
  </ul>
</template>

<script>
export default {
  props: {
    askList: Array,
    answerList: Array,
    addAskBtnType: String, // C / U
    selectedAskData: Object,  // U 일 경우 수정 선택한 문제 Object
    selectedAnswerData: Array,  // U 일 경우 수정 선택한 문제 보기 Array
    tempAskNumber: Number,
    tempAnswerNumber: Number,
  },
  data() {
    return {
      listNumber: ['①','②','③','④','⑤','⑥','⑦','⑧','⑨','⑩'],
    }
  },
  methods: {
    filtedAnswerList(seq) {
      let temp = this.answerList.filter(x => x.tempAskSeq == seq);
      return temp?.sort((a, b) => Number(a.order) - Number(b.order));
    },
    inputType(type) {
      return type == 1 ? 'radio' : 'checkbox';
    },
    askEditBtnClick(e) {
      let seq = e.target.parentNode.parentNode.getAttribute('data-seq');
      let selectAsk = this.askList.find(x => x.tempAskSeq == seq);
      let selectAnsewr = this.answerList.filter(x => x.tempAskSeq == seq);
      
      this.$emit('set-add-ask-btn-type', 'U');
      this.$emit('set-selected-ask-data', selectAsk);
      this.$emit('set-selected-answer-data', selectAnsewr);

      document.querySelector('[s-scroll]').scrollTop = 0;
    },
    askDelBtnClick(e) {
      let seq = e.target.parentNode.parentNode.getAttribute('data-seq');
      let askArr = this.askList.filter(x => x.tempAskSeq != seq);
      let answerArr = this.answerList.filter(x => x.tempAskSeq != seq);

      askArr.forEach((d, i) => d.order = String(i + 1));
      
      this.$emit('set-ask-list', askArr);
      this.$emit('set-answer-list', answerArr);
    },
    listUpDownFn(e, dir) {
      let tempList = [];
      let order = e.currentTarget.parentNode.getAttribute('data-order');
      let otherObj = this.askList.filter(x => x.order != order);
      let thisObj = this.askList.find(x => x.order == order);

      if (order == (dir == 'up' ? '1' : this.askList.length)) return;
      let tempObj = this.askList.find(x => x.order == Number(thisObj.order) + (dir == 'up' ? -1 : 1));

      thisObj.order = String(Number(thisObj.order) + (dir == 'up' ? -1 : 1));
      tempObj.order = String(Number(tempObj.order) + (dir == 'up' ? 1 : -1));
      otherObj.forEach(obj => tempList.push(obj));
      tempList.push(thisObj);
      this.$emit('set-ask-list', tempList);
    },
    listUp(e) {
      this.listUpDownFn(e, 'up');
    },
    listDown(e) {
      this.listUpDownFn(e, 'down');
    },
    edittingFn (elSeq) {
      if (this.addAskBtnType == 'C') return;
      let editSeq = this.selectedAskData.tempAskSeq;

      return editSeq == elSeq ? true : false;
    }
  },
  computed: {
    orderAsk() {
      let temp = this.askList?.sort((a, b) => a.order - b.order);
      temp.forEach((obj, i) => obj.order = i + 1);
      this.$emit('set-ask-list', temp);
      return temp;
    }
  }
}
</script>

<style lang="scss" scoped>
.askList {
  margin-top: 10px;
  padding: 20px;
}
.askList > li {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  position: relative;
  li {
    padding: 5px 0;
    display: flex;
    align-items: center;
    input[type="radio"], input[type="checkbox"] {
      margin: 0 4px;
      transform: translateY(-2px);
    }
  }

  & > .edittingView {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #eee;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 26px;
    letter-spacing: 2px;
  }
}
.askList > li > h3 {
  font-weight: 500;
  font-size: 17px;
}
.askList > li > h4 {
  font-weight: 400;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 10px;
  color: #888;
}
.askList > li > div.option {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: flex-start;
  button {
    padding: 6px;
    margin: 2px;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div.up-down-btn {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      width: 31px;
      height: 31px;
      font-size: 20px;
      color: #666;
      background-color: rgb(239, 239, 239);
      &:hover {
        color: #000;
      }
    }
  }
  div.edit-btn {
    button {
      padding: 6px 20px;
      background-color: darkgray;
      color: #fff;
    }
  }
  div.del-btn {
    button {
      padding: 6px 20px;
      background-color: #ff6a6a;
      color: #fff;
    }
  }
}
.askList > li.noList {
  border: none;
  text-align: center;
  color: #aaa;
  li {
    padding: 5px 0;
    margin-bottom: 2px;
    font-size: 14px;
    input {
      padding: 2px 5px;
    }
    label {
      display: block;
    }
  }
}
.askList > li li input:not([type="radio"], [type="checkbox"]) {
  padding: 0 4px;
  height: 28px;
  border: 1px solid #aaa;
  border-radius: 2px;
}
.askList > li:last-of-type {
  margin-bottom: 0;
}
.askList textarea {
  width: 100%;
  height: 50px;
  resize: none;
  padding: 6px;
  margin-top: 4px;
  display: block;
  border: 1px solid #aaa;
  border-radius: 2px;
}
.askList > li li label {
  font-weight: 400;
  display: inline-block;
  width: 100%;
}

</style>