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
        <span>사업기록</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          사업기록
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          기록물
        </p>
      </div>
    </h2>

    <h2 sub>
      <span>{{ data.businessName || "사업기록 상세정보" }}</span>
      <span>
        <button @click="back(1)">뒤로가기</button>
      </span>
    </h2>

    <section contents>
      <span :style="{ width: !data.imgPath ? '100%' : null }">
        <div row>
          <span label>제목</span>
          <span content>{{ data.title }}</span>
        </div>
        <div row>
          <span label>사업 날짜</span>
          <span content>{{ data.businessDT }}</span>
        </div>
        <div row>
          <span label>작성자</span>
          <span content>{{ data.writerName }}</span>
        </div>
        <div row>
          <span label>작성일</span>
          <span content>{{ data.writeDT }}</span>
        </div>
        <div row style="flex-direction: column">
          <span label style="width: 100%">내용</span>
          <span content style="padding: 15px 12px" v-html="data.contents" />
        </div>
      </span>
      <img v-if="data.imgPath" :src="data.imgPath" alt="기록물 이미지" />
      <fileList
        v-if="fileList.length > 0"
        :fileList="fileList"
        :marginTop="10"
      />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import noticeBanner from "@images/2/1/noticeBanner.png";
import fileList from "@admin/src/pageSubComponents/common/fileList";

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
        .get(
          this.$store.state.dbUrl + "/admin_recordList?recordSeq=" + this.post
        )
        .then(({ data }) => {
          this.data = data[0];
        });
    },
    back(depth) {
      if (depth == 1) this.$router.push("/Newdeal/BusinessRecord/" + this.id);
      if (depth == 2) this.$router.push("/Newdeal/BusinessRecord");
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

h3 {
  width: 100%;
}

[contents] {
  @include flex(space-between);
  align-items: flex-start;
  flex-flow: wrap;
  & > span {
    display: block;
    width: calc(100% - 420px);
  }
  [row] {
    @include flex(flex-start);
    border: 1px solid #ddd;
    border-top: 0;
    &:first-of-type {
      border-top: 1px solid #ddd;
    }
  }
  [label] {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100px;
    min-width: 100px;
    background-color: #eee;
    padding: 10px;
    align-self: stretch;
  }
  [content] {
    display: block;
    width: 100%;
    padding: 10px;
  }
}
img {
  width: 400px;
  transition: 0.2s;
}

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

@media screen and (max-width: 900px) {
  h2[sub] {
    flex-direction: column;
    & > span {
      width: 100%;
      justify-content: flex-start !important;
      &:last-of-type {
        justify-content: flex-end !important;
        margin-top: 20px;
      }
    }
  }
  [contents] {
    @include flex(space-between);
    align-items: flex-start;
    flex-flow: wrap;
    & > span {
      width: 100%;
      margin-bottom: 10px;
    }
  }
}

@media screen and (max-width: 500px) {
  img {
    width: 100%;
  }
}
</style>