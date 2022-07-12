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
        <span>사업홍보물</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="rightIcon" /> 뉴딜참여 <i :class="rightIcon" />
          사업홍보물
        </p>
      </div>
    </h2>

    <section>
      <div class="option">
        <span
          style="display: flex; width: 100%; justify-content: space-between"
        >
          <ul tab-list>
            <TabLi v-for="(item, idx) in tabList" :key="idx" :item="item" />
          </ul>
          <select v-model="category" @change="getList">
            <CategoryLi
              v-for="(item, idx) in categoryList"
              :key="idx"
              :item="item"
              :idx="idx"
            />
          </select>
        </span>
        <div>
          <SearchInput @setValue="setValue" @search="getList" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="(item, idx) in theadList" :key="idx" v-text="item" />
          </tr>
        </thead>
        <tbody>
          <PromotionLi
            v-for="(item, idx) in list"
            :key="idx"
            :item="item"
            :idx="idx"
          />
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import TabLi from "@/components/BusinessPromotion/TabLi";
import CategoryLi from "@/components/BusinessPromotion/CategoryLi";
import PromotionLi from "@/components/BusinessPromotion/PromotionLi";
import processBanner from "@images/2/2/processBanner.png";

export default {
  components: {
    SearchInput,
    TabLi,
    CategoryLi,
    PromotionLi,
  },
  data: () => ({
    tabList: [
      { id: 1, name: "모집중" },
      { id: 2, name: "진행중" },
      { id: 3, name: "완료" },
    ],
    theadList: ["No", "카테고리", "제목", "시작일", "마감일", "작성자"],
    categoryList: [],
    list: [],
    value: "",
    category: "",
    processBanner,
  }),
  created() {
    this.categoryChk();
  },
  methods: {
    categoryChk() {
      let yn = this.tabList.filter((x) => x.id == this.getCategory).length;
      console.log(yn);
      if (!this.getCategory || yn == 0) {
        this.$router.push("?category=1");
      }
      this.getCategoryList();
    },
    getCategoryList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_businessPromotionCategoryList")
        .then(({ data }) => {
          this.categoryList = data;
          this.category = data[0].categorySeq;
          this.getList();
        });
    },
    getList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/admin_businessPromotionList?q=" +
            this.value +
            "&proCategorySeq=" +
            this.category
        )
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

.option {
  @include flex(space-between, column);
  padding-bottom: 4px;
  margin-bottom: 10px;
  & > span {
    @include flex(space-between);
    padding-bottom: 10px;
    select {
      height: 40px;
    }
  }
  & > div {
    padding: 12px 16px;
    background-color: #eee;
    width: 100%;
    @include flex(space-between);
    select,
    button {
      align-self: stretch;
      height: unset;
    }
  }
  ul {
    @include flex(flex-start);
    width: 100%;
    overflow: auto;
  }
}

[tab-list] {
  padding-right: 15%;
}

th {
  &:nth-of-type(1) {
    width: 70px;
  }
  &:nth-of-type(2) {
    width: 30%;
  }
  &:nth-of-type(3) {
    width: 70%;
  }
  &:nth-of-type(4) {
    width: 150px;
  }
  &:nth-of-type(5) {
    width: 150px;
  }
  &:nth-of-type(6) {
    width: 100px;
  }
}

@media screen and (max-width: 900px) {
  th {
    &:nth-of-type(1) {
      width: 60px;
    }
    &:nth-of-type(2) {
      width: 35%;
    }
    &:nth-of-type(3) {
      width: 65%;
    }
    &:nth-of-type(4) {
      width: 100px;
    }
    &:nth-of-type(5) {
      width: 100px;
    }
    &:nth-of-type(6) {
      width: 0;
      padding: 0;
      border: 0;
    }
  }
}

@media screen and (max-width: 700px) {
  th {
    &:nth-of-type(2) {
      width: 0;
      padding: 0;
      border: 0;
    }
  }
}
@media screen and (max-width: 500px) {
  .option {
    & > span {
      flex-direction: column;
      select {
        width: 100%;
        margin: 10px 0 0;
      }
    }
  }

  [tab-list] {
    padding-right: 0;
  }
  th {
    &:nth-of-type(1),
    &:nth-of-type(2) {
      border-right: 0;
    }
    &:nth-of-type(4),
    &:nth-of-type(5) {
      width: 0;
      padding: 0;
      border: 0;
    }
  }
}
</style>