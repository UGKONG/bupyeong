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
        <span>{{ title }}</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="rightIcon" /> 뉴딜참여 <i :class="rightIcon" />
          설문조사
        </p>
      </div>
    </h2>

    <!-- <button gps @click="positionView">위 치</button> -->
    <h2 sub>
      <span></span>
      <span>
        <button @click="() => $router.go(-1)">뒤로가기</button>
      </span>
    </h2>
    <section>
      <ul>
        <ResultAskLi
          v-for="(ask, askIdx) in askList"
          :id="id"
          :key="askIdx"
          :idx="askIdx"
          :item="ask"
          :answerList="answerFilterList(ask.askSeq)"
        />
      </ul>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import ResultAskLi from "@/components/Survey/ResultAskLi";
import { useAlert } from "@admin/src/hook";
import processBanner from "@images/2/2/processBanner.png";

export default {
  components: {
    ResultAskLi,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    askList: [],
    answerList: [],
    numAskCount: 0,
    processBanner,
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/admin_surveyList?surveySeq=" + this.id)
        .then(({ data }) => {
          this.getAskList();
          this.data = data[0];
        });
    },
    getAskList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_surveyDataAskList")
        .then(({ data }) => {
          this.getAnswerList();
          this.askList = data;
          this.numAskCount = data.filter(
            (x) => x.type == 1 || x.type == 2
          ).length;
        });
    },
    getAnswerList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_surveyDataAnswerList")
        .then(({ data }) => {
          this.answerList = data;
        });
    },
    answerFilterList(id) {
      return this.answerList.filter((x) => x.askSeq == id);
    },
    positionView() {
      console.log(this.data.gps);
    },
    back() {
      this.$router.push("/Newdeal/Survey");
    },
  },
  computed: {
    title() {
      return "[설문참여] " + (this.data.surveyTitle || "설문지 작성");
    },
    subTitle() {
      return "다음 설문 문항에 해당되는 답변을 체크 하시면 됩니다.";
    },
    rightIcon() {
      return this.$store.state.FontAwesome.stroke.angle.right;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
h3 {
  font-size: 15px !important;
  font-weight: 400 !important;
  color: $gray !important;
  margin-left: 3px;
}
button[submit] {
  display: block;
  margin: 40px auto 20px;
}
</style>