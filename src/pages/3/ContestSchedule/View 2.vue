<template>
  <main>
    <h2
      banner
      :style="{
        backgroundImage: 'url(' + processBanner + ')',
        backgroundColor: '#a5bdf3',
        height: '275px',
      }"
    >
      <div>
        <span>공모일정 상세정보</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          재생사업정보
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          공모일정
        </p>
      </div>
    </h2>

    <h2 sub>
      <span>{{ data.title || "공모일정 상세정보" }}</span>
      <span>
        <button @click="back">목록</button>
      </span>
    </h2>
    <section contents>
      <span :style="{ width: !data.imgPath ? '100%' : null }">
        <div row>
          <span label>공모 시작일</span>
          <span content>{{ data.startDT }}</span>
        </div>
        <div row>
          <span label>공모 마감일</span>
          <span content>{{ data.endDT }}</span>
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
          <span label style="width: 100%">내 용</span>
          <span content style="padding: 15px 12px" v-html="data.contents" />
        </div>
      </span>
      <img v-if="data.imgPath" :src="data.imgPath" alt="공모일정 이미지" />
      <fileList
        v-if="fileList.length > 0"
        :fileList="data.fileList"
        :marginTop="10"
      />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import fileList from "@admin/src/pageSubComponents/common/fileList";
import processBanner from "@images/2/2/processBanner.png";
export default {
  components: {
    fileList,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    processBanner,
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/admin_contestList/" + this.id)
        .then(({ data }) => {
          this.data = data;
        })
        .catch(() => this.$router.push("/404"));
    },
    back() {
      this.$router.push("/Business/ContestSchedule");
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