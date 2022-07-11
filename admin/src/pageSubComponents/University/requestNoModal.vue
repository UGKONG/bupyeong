<template>
  <aside>
    <header>
      거절 사유를 입력해주세요.      
      <article>
        <button @click="$emit('requestNoModalClose')">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="send">
          <i class="far fa-save" />전 송
        </button>
      </article>
    </header>
    <textarea ref="requestNoTextEl" v-model="sendData.requestNoText" />
  </aside>
</template>

<script>
export default {
  props: {
    requestNoSeq: String,
  },
  data() {
    return {
      sendData: {}
    }
  },
  created() {
    this.sendData = {
      requestNoSeq: this.requestNoSeq,
      requestNoText: '',
    }
  },
  mounted() {
    this.$refs.requestNoTextEl.focus();
  },
  methods: {
    send() {
      console.log(this.sendData);
    },
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
aside {
  position: fixed;
  bottom: 5px;
  right: 5px;
  width: 500px;
  height: 200px;
  background-color: #fff;
  box-shadow: -2px -2px 10px #00000040;
  /* border-radius: 4px; */
  overflow: hidden;
  z-index: 1900;

  header {
    font-size: 17px;
    font-weight: 500;
    height: 40px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 10px;
    background-color: #FDF4F5;
    article .saveBtn {
      padding: 1px 0 0;
      font-size: 14px;
    }
  }
  textarea {
    width: calc(100% - 4px);
    height: calc(100% - 64px);
    border: 1px solid #ddd;
    resize: none;
    padding: 8px;
    font-size: 15px;
    margin: 2px;
    border-radius: 3px;
  }
}
</style>