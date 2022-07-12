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
        <span>주민공청회</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 스마트시티
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          주민공청회
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          주민공청회 상세정보
        </p>
      </div>
    </h2>

    <h2 sub>
      {{ data.phTitle || "주민공청회 상세정보" }}
      <span>
        <button @click="positionClick">위치</button>
      </span>
    </h2>
    <section contents>
      <PublicHearingInfo :data="data" />

      <h3>공청회 자료</h3>
      <ul files>
        <li v-for="(item, idx) in list.file" :key="idx">
          <i :class="$store.state.FontAwesome.fill.file" />
          {{ item.name }}
        </li>
      </ul>

      <h3>공청회 영상</h3>
      <ul media>
        <MainMediaLi
          v-for="(item, idx) in list.media"
          :key="idx"
          :item="item"
          :idx="idx"
          :id="id"
        />
      </ul>

      <h3>이용 만족도</h3>
      <ul>
        <SurveyLi
          v-for="(item, idx) in [list.survey[3]]"
          :key="idx"
          :item="item"
          :idx="idx"
        />
      </ul>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import MainMediaLi from "@/components/PublicHearing/MainMediaLi";
import SurveyLi from "@/components/PublicHearing/SurveyLi";
import PublicHearingInfo from "@/components/PublicHearing/PublicHearingInfo";
import processBanner from "@images/2/2/processBanner.png";

export default {
  components: {
    MainMediaLi,
    SurveyLi,
    PublicHearingInfo,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    list: {
      media: [],
      file: [],
      survey: [],
    },
    processBanner,
  }),
  created() {
    this.get();
  },
  methods: {
    get() {
      this.getData();
      this.getMediaList();
      this.getFileList();
      this.getSurveyList();
    },
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/admin_phList?phSeq=" + this.id)
        .then(({ data }) => {
          this.data = data[0];
        });
    },
    getMediaList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_phMediaList")
        .then(({ data }) => {
          this.list.media = data;
        });
    },
    getFileList() {
      this.list.file = [
        { id: 1, name: "공청회 자료 첨부파일 1.pdf", size: 252023 },
        { id: 2, name: "공청회 자료 첨부파일 2.pdf", size: 326346 },
        { id: 3, name: "공청회 자료 첨부파일 3.pdf", size: 632335 },
      ];
    },
    getSurveyList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_surveyList")
        .then(({ data }) => {
          this.list.survey = data;
        });
    },
    positionClick() {
      console.log(this.data.phPosition);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
main h2[sub] {
  align-items: flex-start;
}
h3 {
  margin-bottom: 10px !important;
  margin-top: 30px;
}
ul {
  @include border();
  padding: 10px 10px 0;
  max-height: 800px;
  overflow: auto;

  &[media] {
    @include flex(flex-start, row, wrap);
    align-items: flex-start;
    align-content: flex-start;
    max-height: 396px;
  }
  &[files] {
    @include font(15px, 400, $gray);
    li {
      margin-bottom: 10px;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>