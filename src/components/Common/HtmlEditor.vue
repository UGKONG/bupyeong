<template>
  <div id="summernote" :name="name" />
</template>

<script>
export default {
  props: {
    name: String,
    value: {
      type: String,
      default: "",
    },
  },
  mounted() {
    $("#summernote") && $("#summernote")?.summernote(this.htmlEditorSet);
    $(".note-fontname")?.hide();
    document.querySelector(
      ".note-editor.note-frame.panel.panel-default"
    ).style.margin = 0;
  },
  data: () => ({
    htmlEditorSet: {
      placeholder: "내용을 입력해주세요.",
      height: 500,
      minHeight: 300,
      maxHeight: 800,
    },
  }),
};
</script>

<style>
</style>