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
        <span>D-LAB</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 스마트시티
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          D-LAB
        </p>
      </div>
    </h2>

    <h2 sub>
      <!-- D-LAB -->
      <span />
      <span>
        <button @click="goBottom">예약</button>
        <button @click="$router.push('/StartCity/D-LAB/Chart')">
          운영통계
        </button>
      </span>
    </h2>

    <section contents>
      <DlabInfo />

      <article tab-wrap top-tab>
        <div tab-btns>
          <button
            v-for="(item, idx) in tabList"
            :key="idx"
            v-text="item.name"
            :class="{ active: item.id == tab }"
            @click="tabClick(item.id)"
          />
        </div>
        <div tab-contents>
          <div component>
            <TabMediaContent1 v-if="tab == 1" />
            <TabMediaContent2 v-if="tab == 2" />
            <TabReservContent v-if="tab == 3" />
            <TabReservedContent v-if="tab == 4" />
            <TabSurveyContent v-if="tab == 5" />
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import DlabInfo from "@/components/Dlab/DlabInfo";
import TabMediaContent1 from "@/components/Dlab/TabMediaContent1";
import TabMediaContent2 from "@/components/Dlab/TabMediaContent2";
import TabReservContent from "@/components/Dlab/TabReservContent";
import TabReservedContent from "@/components/Dlab/TabReservedContent";
import TabSurveyContent from "@/components/Dlab/TabSurveyContent";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    DlabInfo,
    TabMediaContent1,
    TabMediaContent2,
    TabReservContent,
    TabReservedContent,
    TabSurveyContent,
  },
  data: () => ({
    data: {},
    tabList: [
      { id: 1, name: "공식 미디어", auth: false },
      { id: 2, name: "일반 미디어", auth: false },
      { id: 3, name: "예약", auth: false },
      { id: 4, name: "예약 현황", auth: false },
      { id: 5, name: "설문조사", auth: false },
    ],
    noticeBanner,
  }),
  created() {
    this.tabChk();
  },
  methods: {
    tabClick(id) {
      if (id == this.tab) return;
      this.$router.push({ query: { tab: id } });
    },
    tabChk() {
      !this.tab && this.$router.push({ query: { tab: 1 } });
    },
    back() {
      this.$router.push("/Food/Platform");
    },
    goBottom() {
      this.tabClick(3);
      let top = document.querySelector("[tab-btns]").offsetTop ?? 0;
      setTimeout(() => window.scrollTo(0, top), 0);
    },
  },
  computed: {
    tab() {
      return this.$route.query.tab;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
h2[sub] {
  button {
    white-space: nowrap;
    margin-left: 5px;
    padding: 6px 16px !important;
    background-color: $activeColor;
    border: 1px solid #ddd;
    color: #fff;
    &:hover {
      color: #fff !important;
      background-color: $hoverColor !important;
    }
  }
}
[tab-wrap] {
  margin-bottom: 20px;

  [tab-btns] {
    @include flex(flex-start);
    overflow: auto;
    button {
      white-space: nowrap;
      margin-right: 5px;
      @include font(13px, 400, auto, 1px);
      background-color: #eee;
      color: #333 !important;
      &:hover {
        background-color: #ddd !important;
        color: #333 !important;
      }
      &.active {
        background-color: $activeColor !important;
        color: $white !important;
      }
    }
  }
  [tab-contents] {
    @include border();
    height: calc(100% - 28px);
    padding: 10px;

    & > div {
      @include wrap();
    }
  }
}
</style>