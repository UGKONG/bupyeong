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
        <span>공지사항</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          공지사항
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 공지
          상세정보
        </p>
      </div>
    </h2>
    <h2 sub>
      <span>{{ data.title }}</span>
      <span><button @click="() => $router.go(-1)">뒤로가기</button></span>
    </h2>
    <section>
      <!-- <div row>
        <span label>제목</span>
        <span content>{{ data.title }}</span>
      </div> -->
      <div row>
        <span label>카테고리</span>
        <span content>{{ data.categoryName }}</span>
      </div>
      <div row style="flex-wrap: wrap">
        <span label style="width: 100%">내용</span>
        <span content style="padding: 10px" v-html="data.context" />
      </div>
      <FileList
        v-if="data.fileList && data.fileList.length > 0"
        :fileList="data.fileList"
        :marginTop="30"
      />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import FileList from "@admin/src/pageSubComponents/common/fileList";
import noticeBanner from "@images/2/1/noticeBanner.png";
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
        .get(this.$store.state.dbUrl + "/noticeList/" + this.id)
        .then(({ data }) => {
          this.data = data;
        })
        .catch(() => this.$router.push("/404"));
    },
  },
  computed: {
    title() {
      return this.data.title;
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
h2[sub] {
  justify-content: space-between;
}
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

@media screen and (max-width: 900px) {
  h2[sub] {
    flex-flow: column;
    & > span {
      width: 100%;
      @include flex(flex-start);
      &:last-of-type {
        justify-content: flex-end;
        margin-top: 10px;
      }
    }
  }
}
</style>