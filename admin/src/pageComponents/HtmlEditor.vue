<template>
  <section>
    <div id="summernote" />
    <button @click="getHtmlCode">저장하기</button>
  </section>
</template>

<script>
export default {
  props: {
    sendData: Object,
  },
  mounted() {
    // https://summernote.org/
    $("#summernote").summernote(this.htmlEditorSet);
    $(".note-statusbar").hide();
    $("#summernote").siblings("div").css("height", "calc(100% - 80px)");
    $(".note-editing-area").css("height", "calc(100% - 41px");
  },
  data() {
    return {
      htmlEditorSet: {
        placeholder: "내용을 입력해주세요.",
        tabsize: 2,
        height: "100%",
      },
    };
  },
  methods: {
    getHtmlCode() {
      var markupStr = $("#summernote").summernote("code");
      console.log(markupStr);
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  padding: 6px 14px;
  background-color: #0662f9;
  color: #fff;
  border: none;
}
</style>