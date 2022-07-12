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
        <span>게시글 작성</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          주민공동체
        </p>
      </div>
    </h2>

    <section>
      <div row>
        <label label for="title">게시글 제목</label>
        <span content>
          <input id="title" ref="title" />
        </span>
      </div>
      <div row>
        <label label for="writer">작성자</label>
        <span content style="color: #777">
          {{ $store.state.loginInfo.name }}
        </span>
      </div>
      <div row>
        <label label for="writeDT">작성일</label>
        <span content style="color: #777">{{ now }}</span>
      </div>
      <div row style="flex-direction: column">
        <label label for="contents" style="width: 100%">게시글 내용</label>
        <span content style="width: 100%; padding: 0">
          <HtmlEditor
            ref="editor"
            name="주민공동체 게시글 작성"
            :value="contents"
          />
        </span>
      </div>
      <uploadFiles
        :fileList="fileList"
        @setFileList="setFileList"
        style="margin-top: 30px"
      />
      <button submit @click="save">저 장</button>
      <div ref="result" />
    </section>
  </main>
</template>

<script>
import HtmlEditor from "@/components/Common/HtmlEditor";
import uploadFiles from "@admin/src/pageSubComponents/common/uploadFiles";
import { useAlert, useSendValidation, useToday } from "@hook";
import axios from "axios";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    HtmlEditor,
    uploadFiles,
  },
  props: {
    id: String,
  },
  data: () => ({
    contents: "",
    now: {},
    fileList: [],
    noticeBanner,
  }),
  created() {
    this.now = useToday();
  },
  methods: {
    save() {
      let title = this.$refs.title;
      let contents = $('[name="주민공동체 게시글 작성"]').summernote("code");

      let pass = useSendValidation([title, contents], () => {
        useAlert.warn("게시글 작성", "게시글 제목 또는 내용을 작성해주세요.");
      });

      if (!pass) return;

      let data = {
        title: title.value,
        writer: this.$store.state.loginInfo.id,
        writerName: this.$store.state.loginInfo.name,
        writeDT: this.now,
        fileList: this.fileList,
        contents: contents,
      };
      axios
        .post(this.$store.state.dbUrl + "/communityPostList", data)
        .then(({ data }) => {
          console.log(data);
        });
    },
    setFileList(val) {
      this.fileList = val;
    },
    back() {
      this.$router.push("/Newdeal/ResidentCommunity/" + this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

section {
  [row] {
    @include flex(center);
    font-size: 16px;
    border: 1px solid #ddd;
    border-top: 0;
    &:first-of-type {
      border-top: 1px solid #ddd;
    }
    [label] {
      display: inline-flex;
      width: 100px;
      padding: 10px;
      background-color: #eee;
      align-self: stretch;
    }
    [content] {
      flex: 1;
      padding: 10px;
    }
    input {
      width: 100%;
      height: 30px;
      padding: 0 5px;
      border: 1px solid #ddd;
    }
  }

  button {
    display: block;
    margin: 30px auto 20px;
    padding: 6px 16px !important;
    color: #fff;
    background-color: $activeColor;
    &:hover {
      color: #fff !important;
      background-color: $hoverColor !important;
    }
  }
}
</style>