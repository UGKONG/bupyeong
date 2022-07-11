<template>
  <section modal>
    <div wrap>
      <h2>
        과정 신청
        <button @click="$emit('setProcessRequestView', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <h3>해당 과정을 신청하시겠습니까?</h3>
        <span>신청서 양식을 첨부해주세요.</span>
        <div>
          <input type="file" @change="fileChange" />
          <p file-info v-html="fileInfo" />
        </div>

        <button @click="submit">과정신청</button>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import { useFileSize, useAlert } from "@hook";
export default {
  props: {
    id: String,
  },
  data: () => ({
    file: {},
  }),
  methods: {
    submit() {
      if (!this.file.name) {
        return useAlert.warn("과정 신청", "신청서 양식을 첨부해주세요.");
      }
      useAlert.success("과정신청", "과정이 신청되었습니다.");
      this.$emit("setProcessRequestView", false);
    },
    fileChange(e) {
      let file = e.target.files[0];
      if (!file) return (this.file = {});
      this.file = file;
    },
  },
  computed: {
    fileInfo() {
      if (!this.file.name) return "파일을 선택해주세요.";
      return `
        <span>파일명: ${this.file?.name}</span><br />
        <span>용량 : ${useFileSize(this.file?.size)}</span>
      `;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
[modal] > div[wrap] {
  width: 400px;
  height: 250px;
  left: calc(50% - 200px);
}
[contents] {
  h3 {
    margin: 0;
  }

  & > div {
    margin: 20px 0 0;
    [file-info] {
      height: 56px;
      padding: 2px 3px;
      color: $gray;
      font-size: 13px;
    }
  }

  & > button {
    display: block;
    margin: 0 auto;
  }
}
</style>