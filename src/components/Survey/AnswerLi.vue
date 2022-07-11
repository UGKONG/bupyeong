<template>
  <li sub>
    <input
      v-show="contextAnswer"
      :type="askType"
      :id="id"
      :ref="id"
      :name="name"
      :answer-type="answerType"
    />
    <label :for="id" :style="{ display: answerType == 3 ? 'block' : 'unset' }">
      <span v-if="contextAnswer" v-text="text" />
      <input text v-if="answerType == 2" :id="'_' + id" @focus="inputFocus" />
      <textarea
        v-if="answerType == 3"
        :id="'__' + id"
        :placeholder="placeholder"
        @focus="textareaFocus"
        @blur="textareaBlur"
      />
    </label>
  </li>
</template>

<script>
export default {
  props: {
    idx: Number,
    item: Object,
    singleMulti: Number,
  },
  data: () => ({
    placeholder: "선택입력",
  }),
  methods: {
    inputFocus(e) {
      this.$refs[this.id].checked = true;
    },
    textareaFocus(e) {
      this.$refs[this.id].checked = true;
    },
    textareaBlur(e) {
      this.$refs[this.id].checked = e.target.value == "" ? false : true;
    },
  },
  computed: {
    id() {
      return "answer_" + this.item.answerSeq;
    },
    name() {
      return "answer_" + this.item.askSeq;
    },
    text() {
      return this.item.exam_item;
    },
    askType() {
      return this.singleMulti == 1 ? "radio" : "checkbox";
    },
    answerType() {
      return this.item.type;
    },
    contextAnswer() {
      return this.answerType != 3;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
li[sub] {
  /* margin-left: 10px; */
  /* margin-bottom: 5px; */
  padding: 5px 0;

  input[type="checkbox"],
  input[type="radio"] {
    transform: translateY(1px);
    margin-right: 6px;
    & + label {
      input {
        margin-left: 10px;
        border: 1px solid #ddd;
        border-radius: 3px;
      }
    }
  }
  input[text] {
    width: 200px;
    height: 30px;
    margin-left: 2px;
    padding: 0 6px;
  }
  textarea {
    display: block;
    margin-top: 4px;
    width: calc(100% - 10px);
    height: 100px;
    resize: none;
    border: 1px solid $whiteGray;
    padding: 6px;
  }
}
</style>