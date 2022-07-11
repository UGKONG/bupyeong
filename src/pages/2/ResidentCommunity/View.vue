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
        <span>주민공동체</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 주민공동체
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          주민공동체 게시글
        </p>
      </div>
    </h2>

    <h2 sub>
      <span>주민공동체 게시글</span>
      <span>
        <button @click="postExport">내보내기</button>
        <button @click="$router.go(-1)">뒤로가기</button>
      </span>
    </h2>
    <section>
      <div row>
        <span label>제목</span>
        <span content> {{ data.title }} </span>
      </div>
      <div row>
        <span label>작성자</span>
        <span content> {{ data.writerName }} </span>
      </div>
      <div row>
        <span label>작성일</span>
        <span content> {{ data.writeDT }} </span>
      </div>
      <div row style="flex-direction: column">
        <span label style="width: 100%"> 게시글 내용</span>
        <span content style="padding: 14px">
          <div
            ref="contents"
            style="white-space: pre-wrap !important"
            v-html="data.contents"
        /></span>
      </div>
      <fileList
        v-if="fileList.length > 0"
        :fileList="data.fileList"
        :marginTop="30"
      />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import fileList from "@admin/src/pageSubComponents/common/fileList";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    fileList,
  },
  props: {
    id: String,
    post: String,
  },
  data: () => ({
    data: {},
    noticeBanner,
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/communityPostList/" + this.post)
        .then(({ data }) => {
          this.data = data;
        });
    },
    postExport() {
      let br = "%0A";
      let title = encodeURI(this.data.title) + br + br;
      let contents = encodeURI(this.$refs.contents.innerText) + br;
      let writer = br + "작성자 : " + this.data.writerName + br;
      let writeDT = "작성일 : " + this.data.writeDT + br;
      let exportText = br + "[스마트 커뮤니티 플랫폼에서 공유됨]" + br;
      let result = title + contents + writer + writeDT + exportText;

      window.open(
        "https://band.us/plugin/share?body=" + result,
        "BAND로 내보내기",
        "width=500"
      );
    },
    back() {
      this.$router.push("/Newdeal/ResidentCommunity/" + this.id);
    },
  },
  computed: {
    fileList() {
      return this.data.fileList ?? [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

button {
  padding: 6px 16px !important;
  color: #fff;
  background-color: $activeColor;
  margin-left: 5px !important;
  &:hover {
    color: #fff !important;
    background-color: $hoverColor !important;
  }
}

[row] {
  border: 1px solid #ddd;
  border-top: 0;
  &:first-of-type {
    border-top: 1px solid #ddd;
  }
  [label] {
    padding: 10px;
    background-color: #eee;
    display: inline-flex;
    width: 100px;
    align-items: center;
    justify-content: center;
    align-self: stretch;
  }
  [content] {
    flex: 1;
    display: inline-flex;
    padding: 10px;
  }
}

@media screen and (max-width: 499px) {
  h2[sub] {
    flex-direction: column;
    align-items: flex-start;

    & > span {
      width: 100%;
      justify-content: flex-start !important;
      &:last-of-type {
        margin-top: 20px;
        justify-content: flex-end !important;
      }
    }
  }
}
</style>