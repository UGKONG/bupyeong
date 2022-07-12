<template>
  <main no-banner>
    <h2>
      <div>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          도시재생대학
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 과정
          상세정보
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 수강생
          상세정보
        </p>
      </div>
    </h2>

    <h2 sub>
      <span>수강생 상세정보</span>
      <span>
        <button @click="() => $router.go(-1)">뒤로가기</button>
      </span>
    </h2>
    <section contents>
      <StudentInfo
        :id="id"
        :post="post"
        :all="classAllCount"
        :now="classWatchCount"
      />
      <div class="option">
        <ul tab-list>
          <StudentTabLi
            v-for="(item, idx) in tabList"
            :key="idx"
            :item="item"
          />
        </ul>
      </div>
      <StudentClassList
        v-if="getCategory == 1"
        :id="id"
        :post="post"
        @setClassCount="setClassCount"
      />
      <StudentTaskList v-if="getCategory == 2" :id="id" :post="post" />
    </section>
  </main>
</template>

<script>
import StudentInfo from "@/components/University/StudentInfo";
import StudentTabLi from "@/components/University/StudentTabLi";
import StudentClassList from "@/components/University/StudentClassList";
import StudentTaskList from "@/components/University/StudentTaskList";

export default {
  components: {
    StudentInfo,
    StudentTabLi,
    StudentClassList,
    StudentTaskList,
  },
  props: {
    id: String,
    post: String,
  },
  data: () => ({
    tabList: [
      { id: 1, name: "강의 진행 현황" },
      { id: 2, name: "제출 과제 리스트" },
    ],
    classAllCount: 0,
    classWatchCount: 0,
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
    },
    setClassCount(all, watch) {
      this.classAllCount = all;
      this.classWatchCount = watch;
    },
  },
  computed: {
    getCategory() {
      return this.$route.query.category;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

.option {
  @include flex(space-between);
  flex-flow: column;
  margin-bottom: 20px;

  ul[tab-list] {
    width: 100%;
    @include flex(space-between);
    font-size: 13px;
    color: var(--gray);
    margin: 10px 0;
    border: 1px solid $whiteGray;
  }
}
</style>