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
          뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          도시재생대학
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 과정
          상세정보
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 과제
          상세정보
        </p>
      </div>
    </h2>
    <h2 sub>
      <span> 과제 제출 </span>
      <span>
        <button @click="() => $router.go(-1)">뒤로가기</button>
      </span>
    </h2>
    <section contents>
      <article task-info>
        <div wrap>
          <h3>
            {{ data.title }}
            <span>과제 마감일 : {{ endDTTM }} 까지</span>
          </h3>
          <div description>
            {{ data.contents }}
          </div>
          <div sub>
            <span>연결강의 : {{ data.className }}</span>
          </div>
          <fileList :fileList="fileList" :marginTop="20" />
        </div>
      </article>
      <ul member v-if="$store.state.loginInfo.isStudent">
        <TaskStudent :task="data" :id="id" :post="post" />
      </ul>
      <div option v-if="!$store.state.loginInfo.isStudent">
        <SearchInput @setValue="setValue" />
      </div>
      <TaskTeacherList
        :id="id"
        :post="post"
        teacher
        v-if="!$store.state.loginInfo.isStudent"
      />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import fileList from "@admin/src/pageSubComponents/common/fileList";
import TaskStudent from "@/components/University/TaskStudent";
import TaskTeacherList from "@/components/University/TaskTeacherList";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import processBanner from "@images/2/2/processBanner.png";

export default {
  components: {
    fileList,
    TaskStudent,
    TaskTeacherList,
    SearchInput,
  },
  props: {
    id: String,
    post: String,
  },
  data: () => ({
    processBanner,
    data: {},
    fileList: [],
    value: "",
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/taskList/" + this.post)
        .then(({ data }) => {
          this.data = data;
          this.fileList = [data.file];
        });
    },
    setValue(val) {
      this.value = val;
    },
  },
  computed: {
    endDTTM() {
      return this.data.endDTTM;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

section[contents] {
  [task-info] {
    border: 1px solid $whiteGray;
    border-top: 2px solid $activeColor;
    border-bottom: 2px solid $activeColor;
    padding: 20px;
    margin-bottom: 20px;

    & > [wrap] {
      @include wrap();

      & > h3 {
        @include flex(space-between);
        height: 30px;
        margin-bottom: 10px;

        span {
          font-size: 15px;
        }
      }

      & > [description] {
        width: 100%;
        height: calc(100% - 30px - 10px - 50px);
        @include text-overflow();
        white-space: unset;
      }

      & > [sub] {
        @include flex(space-between);
        height: 50px;
        padding-top: 20px;
      }
    }
  }

  [option] {
    @include search-input-wrap();
  }
}
</style>