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
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          설문조사
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          응답 결과
        </p>
      </div>
    </h2>

    <h2 sub>{{ returnAsk }}</h2>
    <section>
      <table>
        <thead>
          <tr>
            <th v-for="item in headList" :key="item" v-text="item" />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in list" :key="idx">
            <td>{{ idx + 1 }}</td>
            <td>{{ item.value }}</td>
          </tr>
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import processBanner from "@images/2/2/processBanner.png";
export default {
  props: {
    id: String,
    post: String,
  },
  data: () => ({
    list: [],
    title: "",
    ask: "",
    headList: ["No", "응 답"],
    processBanner,
  }),
  created() {
    console.log(this.$route);
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.dbUrl + "/admin_surveyDataAskList?askSeq=" + this.id)
        .then(({ data }) => {
          this.ask = data[0].title;
          this.getList();
        });
    },
    getList() {
      this.list = [];
      axios
        .get(this.dbUrl + "/surveyResultList?SURV_SN=" + 3) //this.id)
        .then(({ data }) => {
          data.forEach((d) => {
            console.log(d);
            this.title = d.SURV_NM;
            let filter = d.SURV_WRITE_LIST; //.filter(
            //   (x) => x.ITEM_SN == this.post
            // );

            this.list = this.list.concat(filter);
          });
        });
    },
    back() {
      this.$router.push("/Newdeal/Survey/" + this.id + "/Result");
    },
  },
  computed: {
    dbUrl() {
      return this.$store.state.dbUrl;
    },
    returnAsk() {
      return this.ask != "" ? "문항내용 : " + this.ask : "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

th:first-of-type {
  width: 70px;
}
tbody > tr:hover {
  background-color: unset;
}
</style>