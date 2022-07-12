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
        <span>주민공모사업</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="rightIcon" /> 뉴딜참여
          <i :class="rightIcon" /> 주민공모사업 <i :class="rightIcon" /> 사업
          상세정보
        </p>
      </div>
    </h2>

    <h2 sub>
      <span>{{ data.title }}</span>
      <span>
        <button @click="() => $router.go(-1)">뒤로가기</button>
      </span>
    </h2>
    <section>
      <!-- <div row>
        <span label>제목</span>
        <span content>{{ data.title }}</span>
      </div> -->
      <div row>
        <span label>작성일</span>
        <span content>{{ data.writeDT }}</span>
      </div>
      <div row>
        <span label>작성자</span>
        <span content>{{ data.writerName }}</span>
      </div>
      <div row>
        <span label>위치</span>
        <span content>{{ data.position }}</span>
      </div>
      <div row style="flex-wrap: wrap">
        <span label style="width: 100%">내용</span>
        <div content style="padding: 10px" v-html="data.context" />
      </div>
      <FileList :fileList="fileList" :marginTop="30" />

      <div row style="border: 0; margin-top: 50px">
        <button @click="request">공모사업 신청</button>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import { useAlert } from "@admin/src/hook";
import noticeBanner from "@images/2/1/noticeBanner.png";
import FileList from "./../../../../admin/src/pageSubComponents/common/fileList.vue";

export default {
  components: {
    FileList,
  },
  props: {
    id: String,
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
        .get(this.$store.state.dbUrl + "/ResidentBusinessList/" + this.id)
        .then(({ data }) => {
          this.data = data;
          console.log(this.data);
        })
        .catch(() => this.$router.push("/404"));
    },
    request() {
      if (!this.$store.state.loginYN)
        return useAlert.warn("주민공모사업", "로그인이 필요합니다.");
      this.$router.push(this.id + "/request");
    },
    back() {
      this.$router.back(-1);
      this.$emit("getList");
    },
  },
  computed: {
    title() {
      return this.data.title;
    },
    rightIcon() {
      return this.$store.state.FontAwesome.stroke.angle.right;
    },
    fileList() {
      return this.data?.fileList ?? [];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[row] {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  border-top: 0;

  &:first-of-type {
    border-top: 1px solid #ddd;
  }
  [label] {
    padding: 10px;
    background-color: #eee;
    width: 100px;
    text-align: center;
    align-self: stretch;
  }
  [content] {
    flex: 1;
    padding: 10px;
    * {
      margin: unset;
    }
  }
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
</style>