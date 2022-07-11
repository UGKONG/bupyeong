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
        <span>공지사항</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="rightIcon" /> 뉴딜참여 <i :class="rightIcon" /> 공지사항
        </p>
      </div>
    </h2>
    <section>
      <div class="option">
        <ul>
          <CategoryLi
            v-for="item in categoryList"
            :key="item.id"
            :item="item"
          />
        </ul>
        <div>
          <SearchInput @setValue="setSearchValue" @search="searchBtnClick" />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="(item, idx) in head" :key="idx" v-text="item" />
          </tr>
        </thead>
        <tbody>
          <NoticeLi
            v-for="(item, idx) in fixedList"
            :key="item.id"
            :item="item"
            :idx="idx"
            :fixedListCount="0"
            @getList="getList"
          />
          <NoticeLi
            v-for="(item, idx) in list"
            :key="item.id"
            :item="item"
            :idx="idx"
            :fixedListCount="fixedList.length"
            @getList="getList"
          />
          <tr class="listNone" v-if="!loading && listNone">
            <td :colspan="headCount">리스트가 없습니다.</td>
          </tr>
          <TableLoading :row="3" :col="5" :state="loading" />
        </tbody>
      </table>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import NoticeLi from "@components/Notice/NoticeLi";
import CategoryLi from "@components/Notice/CategoryLi";
import TableLoading from "@components/Skeleton/Table";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    NoticeLi,
    CategoryLi,
    TableLoading,
    SearchInput,
  },
  data: () => ({
    head: ["No", "카테고리", "제목", "작성일", "작성자"],
    fixedList: [],
    list: [],
    categoryList: [],
    loading: false,
    searchValue: "",
    noticeBanner,
  }),
  watch: {
    getCategory() {
      this.categoryChk();
    },
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    categoryChk() {
      let yn = this.categoryList.filter((x) => x.id == this.getCategory).length;
      if (!this.getCategory || yn == 0) {
        this.$router.push("?category=0");
      }
      this.getList();
    },
    getCategoryList() {
      axios
        .get(this.$store.state.dbUrl + "/noticeCategoryList")
        .then(({ data }) => {
          this.categoryList = [{ id: 0, name: "전체" }].concat(data);
          this.categoryChk();
        });
    },
    getList() {
      this.loading = true;
      this.fixedList = [];
      this.list = [];

      setTimeout(() => {
        let query =
          this.getCategory != 0
            ? "categoryId=" + this.getCategory + "&q=" + this.searchValue
            : "q=" + this.searchValue;
        axios
          .get(this.$store.state.dbUrl + "/noticeList?" + query)
          .then(({ data }) => {
            this.loading = false;
            this.list = data.filter((x) => x.topFixedYN != 1);
            this.fixedList = data.filter((x) => x.topFixedYN == 1);
          });
      }, 500);
    },
    setSearchValue(val) {
      this.searchValue = val;
    },
    searchBtnClick() {
      this.getList();
    },
  },
  computed: {
    getCategory() {
      return this.$route.query.category;
    },
    listNone() {
      return this.list.length == 0 && this.fixedList.length == 0;
    },
    headCount() {
      return this.head.length;
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
  & > div {
    padding: 12px 16px;
    background-color: #eee;
    width: 100%;
    @include flex(flex-start);
  }
  ul {
    @include flex(flex-start);
    width: 100%;
    overflow: auto;
    margin-bottom: 5px;
  }
}

th {
  &:nth-of-type(1) {
    width: 80px;
  }
  &:nth-of-type(2) {
    width: 200px;
  }
  &:nth-of-type(3) {
    width: auto;
  }
  &:nth-of-type(4) {
    width: 160px;
  }
  &:nth-of-type(5) {
    width: 120px;
  }
}
.listNone {
  td {
    text-align: center;
  }
}

@media screen and (max-width: 900px) {
  th:nth-of-type(2) {
    width: 120px;
  }
  th:nth-last-of-type(1) {
    width: 0;
    padding: 0;
    border-left: none;
    border-right: none;
  }
}
@media screen and (max-width: 800px) {
  th:nth-last-of-type(2) {
    width: 100px;
  }
}
@media screen and (max-width: 600px) {
  th:nth-of-type(1) {
    border-right: none;
  }
  th:nth-of-type(2) {
    width: 0;
    padding: 0;
    border-left: none;
    border-right: none;
  }
}
@media screen and (max-width: 499px) {
  th:nth-of-type(1),
  th:nth-last-of-type(2) {
    width: 0;
    padding: 0;
    border-left: none;
    border-right: none;
  }
}
</style>