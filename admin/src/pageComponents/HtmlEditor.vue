<template>
  <section>
    <div id="summernote" />
    <button @click="postData">저장하기</button>
  </section>
</template>

<script>
import { useAlert, useAxios, useForm } from "../hook";

export default {
  props: {
    sendData: Object,
    modalClose: Function,
  },
  created() {
    this.getData();
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
    getData() {
      useAxios
        .get("/admin/proj_infm/" + this.sendData?.ICON_SN)
        .then(({ data }) => {
          if (data?.PROJ_CN) $("#summernote").summernote("code", data?.PROJ_CN);
        });
    },
    postData() {
      let text = this.getHtmlCode();
      let data = { ICON_SN: this.sendData?.ICON_SN, POI_SN: 0, PROJ_CN: text };
      useAxios.post("/admin/proj_infm", useForm(data)).then(({ data }) => {
        if (!data?.RESULT)
          return useAlert.error("소개말 수정", "저장에 실패하였습니다.");
        useAlert.success("소개말 수정", "저장되었습니다.");
        this.$emit("modalClose");
      });
    },
    getHtmlCode() {
      var markupStr = $("#summernote").summernote("code");
      return markupStr;
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