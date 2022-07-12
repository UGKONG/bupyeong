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
        <span>설문조사</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          설문조사
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          {{ title }}
        </p>
      </div>
    </h2>

    <h2 sub>
      {{ title }}
      <span>
        <button gps @click="positionView">위 치</button>
        <button @click="back">닫 기</button>
      </span>
    </h2>
    <section>
      <h3 v-text="subTitle" />
      <ul>
        <AskLi
          v-for="(ask, askIdx) in askList"
          :key="askIdx"
          :idx="askIdx"
          :item="ask"
          :answerList="answerFilterList(ask.askSeq)"
        />
      </ul>
      <button submit @click="submit">제 출</button>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import AskLi from "@/components/Survey/AskLi";
import { useAlert } from "@admin/src/hook";
import processBanner from "@images/2/2/processBanner.png";

export default {
  components: {
    AskLi,
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
    submit() {
      let els = document.querySelectorAll("[id^=answer_]");
      let sendData = [];

      els.forEach((el) => {
        let type = Number(el.getAttribute("answer-type")); // 1-객관식 2-객관식(기타) 3-서술형
        let ITEM_SN = el.id.split("_")[1];

        // Validation
        if (!el.checked) return;
        if (type == 1) {
          let label = document.querySelector('[for="' + el.id + '"]');
          sendData.push({
            ITEM_SN: ITEM_SN,
            value: label.innerText,
            type: type,
          });
        }
        if (type == 2) {
          let input = document.querySelector("#_" + el.id);
          if (input.value == "") {
            useAlert.warn("설문지 작성", "기타 항목을 입력해주세요.");
            input.focus();
            return;
          }
          sendData.push({ ITEM_SN: ITEM_SN, value: input.value, type: type });
        }
        if (type == 3) {
          let input = document.querySelector("#__" + el.id);
          sendData.push({ ITEM_SN: ITEM_SN, value: input.value, type: type });
        }
      });

      let sendDataNumAskCount = sendData.filter(
        (x) => x.type == 1 || x.type == 2
      ).length;
      if (sendDataNumAskCount < this.numAskCount)
        return useAlert.warn("설문지 작성", "답변이 않된 항목이 존재합니다.");

      let form = {
        TASK: "C_SURV_WRITE",
        SURV_SN: this.id,
        SURV_NM: this.data.surveyTitle,
        SN: this.$store.state.loginInfo.id,
        SURV_WRITE_LIST: sendData,
      };
      axios
        .post(this.$store.state.dbUrl + "/surveyResultList", form)
        .then(({ data }) => {
          console.log(data);
          // 설문지 작성 완료
          this.$router.push("/Newdeal/Survey");
          useAlert.success("설문지 작성", "설문이 완료되었습니다.");
          console.log("TASK : " + "C_SURV_WRITE");
          console.log("설문 일련번호 : " + this.id);
          console.log("회원 일련번호 : " + "980127");
          console.log("설문 작성 리스트 : ", sendData);
        });
    },
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
      axios.get(this.dbUrl + "/admin_surveyDataAnswerList").then(({ data }) => {
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
      this.$router.go(-1);
    },
  },
  computed: {
    title() {
      return "[설문참여] " + (this.data.surveyTitle || "설문지 작성");
    },
    subTitle() {
      return "다음 설문 문항에 해당되는 답변을 체크 하시면 됩니다.";
    },
    dbUrl() {
      return this.$store.state.dbUrl;
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

button {
  padding: 6px 22px !important;
  color: #fff;
  background-color: $activeColor;
  &:hover {
    color: #fff !important;
    background-color: $hoverColor !important;
  }
}

button[submit] {
  display: block;
  margin: 40px auto 20px;
  padding: 10px 26px !important;
}
</style>