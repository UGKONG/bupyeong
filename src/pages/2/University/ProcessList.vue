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
        <span>도시재생대학</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="rightIcon" /> 뉴딜참여
          <i :class="rightIcon" /> 도시재생대학
        </p>
      </div>
    </h2>
    <section>
      <h3>전체 학습과정</h3>
      <div class="option">
        <ul tab-list>
          <TabLi v-for="(item, idx) in tabList" :key="idx" :item="item" />
        </ul>
        <div>
          <SearchInput @setValue="setValue" @search="getList" />
        </div>
      </div>
      <ul process-list>
        <ProcessLi v-for="(item, idx) in list" :key="idx" :item="item" />
      </ul>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import ProcessLi from "@components/University/ProcessLi";
import TabLi from "@components/University/TabLi";
import processBanner from "@images/2/2/processBanner.png";

export default {
  components: {
    ProcessLi,
    SearchInput,
    TabLi,
  },
  data: () => ({
    processBanner,
    list: [],
    value: "",
    tabList: [
      { id: 1, name: "모집중" },
      { id: 2, name: "진행중" },
      { id: 3, name: "완료" },
    ],
  }),
  watch: {
    getCategory() {
      this.categoryChk();
    },
  },
  created() {
    this.categoryChk();
  },
  methods: {
    categoryChk() {
      let yn = this.tabList.filter((x) => x.id == this.getCategory).length;
      if (!this.getCategory || yn == 0) {
        this.$router.push("?category=1");
      }
      this.getList();
    },
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/processList?q=" + this.value)
        .then(({ data }) => {
          this.list = data;
        });
    },
    setValue(val) {
      this.value = val;
    },
  },
  computed: {
    getCategory() {
      return this.$route.query.category;
    },
    rightIcon() {
      return this.$store.state.FontAwesome.stroke.angle.right;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

main {
  .option {
    @include flex(space-between);
    flex-flow: column;
    margin-bottom: 20px;

    ul[tab-list] {
      width: 100%;
      @include flex(space-between);
      font-size: 13px;
      color: var(--gray);
      margin-bottom: 10px;
      border: 1px solid $whiteGray;
    }

    & > div {
      padding: 12px 16px;
      background-color: #eee;
      width: 100%;
      @include flex(flex-start);
    }
  }

  ul[process-list] {
    overflow: auto;
  }
}
</style>