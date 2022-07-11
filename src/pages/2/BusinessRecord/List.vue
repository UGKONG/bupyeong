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
          <i :class="rightIcon" /> 뉴딜참여 <i :class="rightIcon" /> 사업기록
        </p>
      </div>
    </h2>

    <section>
      <div class="option">
        <span>
          <ul tab-list>
            <TabLi v-for="(item, idx) in tabList" :key="idx" :item="item" />
          </ul>
          <span>
            <button
              v-for="(item, idx) in typeList"
              :key="idx"
              v-text="item.name"
              :class="{ active: activeType == item.code }"
              @click="typeClick(item.code)"
            />
          </span>
        </span>
        <div>
          <SearchInput @setValue="setValue" @search="getList" />
        </div>
      </div>
      <ul business-list>
        <BusinessLi
          v-for="(item, idx) in list"
          :key="idx"
          :item="item"
          :idx="idx"
          :type="activeType"
        />
      </ul>
    </section>
  </main>
</template>

<script>
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import TabLi from "@/components/BusinessRecord/TabLi";
import BusinessLi from "@/components/BusinessRecord/BusinessLi";
import axios from "axios";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    SearchInput,
    TabLi,
    BusinessLi,
  },
  data: () => ({
    start: 2020,
    tabList: [],
    activeType: "img",
    typeList: [
      { code: "img", name: "갤러리 뷰", img: {} },
      { code: "text", name: "리스브 뷰", img: {} },
    ],
    value: "",
    list: [],
    noticeBanner,
  }),
  created() {
    this.makeTabList();
  },
  methods: {
    categoryChk(defaultCategory) {
      let yn = this.tabList.filter((x) => x.id == this.getCategory).length;
      if (!this.getCategory || yn == 0) {
        this.$router.push("?category=" + defaultCategory);
      }
      this.getList();
    },
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_businessList?q=" + this.value)
        .then(({ data }) => {
          this.list = data;
        });
    },
    makeTabList() {
      this.tabList = [];
      let now = new Date();
      let nowYear = now.getFullYear();
      let yearCalc = nowYear - this.start;
      for (let i = this.start; i <= this.start + yearCalc; i++) {
        this.tabList.push({ id: i, name: i + "년" });
      }
      this.categoryChk(nowYear);
    },
    typeClick(type) {
      this.activeType = type;
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

.option {
  @include flex(space-between);
  padding-bottom: 4px;

  & > span {
    width: 100%;
    @include flex(space-between);
    margin-bottom: 10px;
    & > span {
      @include flex();
      & > button {
        white-space: nowrap;
        margin-left: 5px;
        padding: 6px 16px !important;
        background-color: #eee;
        border: 1px solid #ddd;
        color: $gray;
        &:hover {
          color: $gray !important;
          background-color: $whiteGray !important;
        }
        &.active {
          color: #fff !important;
          background-color: $activeColor !important;
        }
      }
    }
  }

  ul[tab-list] {
    @include flex(flex-start);
    font-size: 13px;
    color: $gray;
    width: 70%;
    min-width: 320px;
    align-self: stretch;
    overflow-y: hidden;
    overflow-x: auto;
    padding-bottom: 2px;
  }

  @include flex(space-between, column);
  padding-bottom: 4px;
  margin-bottom: 10px;
  & > div {
    padding: 12px 16px;
    background-color: #eee;
    width: 100%;
    @include flex(space-between);
    span {
      align-self: stretch;
      @include flex();
      button {
        align-self: stretch;
        margin-left: 5px;
      }
    }
  }
}

ul[business-list] {
  @include flex(flex-start);
  flex-wrap: wrap;
}

@media screen and (max-width: 900px) {
  .option {
    margin-bottom: 0;
    & > span {
      flex-direction: column;
      margin-bottom: 10px;
      & > ul {
        width: 100% !important;
      }
      & > span {
        width: 100%;
        justify-content: flex-end;
        margin-top: 20px;
      }
    }
  }
}
</style>