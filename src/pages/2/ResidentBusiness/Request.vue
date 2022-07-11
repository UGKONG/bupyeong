<template>
  <main>
    <h2
      banner
      :style="{
        backgroundImage: 'url(' + noticeBanner + ')',
        backgroundColor: '#badc86',
        height: '200px',
      }"
    >
      <div>
        <span>주민공모사업 신청</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          주민공모사업
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          신청
        </p>
      </div>
    </h2>

    <h2 sub>
      {{ data.title || "주민공모사업 신청" }}
      <span>
        <button @click="request">신청하기</button>
      </span>
    </h2>
    <section>
      <div row>
        <span label>신청내용</span>
        <textarea ref="context" v-model="sendData.context" />
      </div>

      <UploadFiles :fileList="sendData.fileList" @setFileList="setFileList" />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import UploadFiles from "@admin/src/pageSubComponents/common/uploadFiles.vue";
import { useAlert, useSendValidation } from "@hook";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    UploadFiles,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    sendData: {},
    noticeBanner,
  }),
  created() {
    this.getData();

    this.sendData = {
      // id: 0,
      businessId: this.id,
      fileList: [],
      context: "",
      requestPerson: this.$store.state.loginInfo.id,
      state: 0,
      description: "",
    };
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/ResidentBusinessList/" + this.id)
        .then(({ data }) => (this.data = data))
        .catch(() => this.$router.push("/404"));
    },
    request() {
      let pass = useSendValidation([this.$refs.context]);
      if (!pass)
        return useAlert.warn("주민공모사업", "신청내용을 작성해주세요.");
      pass = this.sendData.fileList.length > 0;
      if (!pass)
        return useAlert.warn("주민공모사업", "첨부파일을 추가해주세요.");

      axios
        .post(
          this.$store.state.dbUrl + "/ResidentBusinessRequestList",
          this.sendData
        )
        .then(({ data }) => {
          useAlert.success("주민공모사업", "신청 되었습니다.");
          this.back();
        })
        .catch(() => useAlert.error("주민공모사업", "신청 실패하였습니다."));
    },
    setFileList(val) {
      this.sendData.fileList = val;
    },
    back() {
      this.$router.go(-1);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

h2[sub] {
  button {
    background-color: $activeColor !important;
    color: #fff;
    padding: 10px 22px !important;
    &:hover {
      background-color: $hoverColor !important;
      color: #fff !important;
    }
  }
}
[row] {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 30px;
  [label] {
    width: 100%;
    background-color: #eee;
    border: 1px solid #ddd;
    border-bottom: 0;
    text-align: center;
    padding: 10px;
    letter-spacing: 1px;
  }
}
textarea {
  width: 100%;
  height: 400px;
  resize: none;
  border: 1px solid var(--whiteGray);
  padding: 6px;
}
</style>