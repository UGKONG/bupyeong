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
        <span>사업기록 리스트</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          사업기록 리스트
        </p>
      </div>
    </h2>
    <h2 sub>
      <span>{{ data.title }}</span>
      <span>
        <button @click="back">뒤로가기</button>
      </span>
    </h2>
    <section>
      <div class="description">
        {{ data.contents }}
      </div>
      <div class="option">
        <span>
          <span />
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
        <div v-if="activeType != 'timeline'">
          <SearchInput
            :change="isChange"
            @setValue="setValue"
            @search="getList"
          />
        </div>
      </div>

      <!-- 게시글 -->
      <transition name="slide-y-reverse-transition" mode="out-in">
        <ImgContent v-if="activeType == 'img'" :list="list" :id="id" />
        <TextContent v-else-if="activeType == 'text'" :list="list" :id="id" />
        <TimelineContent v-else :list="list" :id="id" />
      </transition>
    </section>
  </main>
</template>

<script>
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import ImgContent from "@/components/BusinessRecord/ImgContent";
import TextContent from "@/components/BusinessRecord/TextContent";
import TimelineContent from "@/components/BusinessRecord/TimelineContent";
import axios from "axios";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    SearchInput,
    ImgContent,
    TextContent,
    TimelineContent,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    typeList: [
      { code: "text", name: "리스브 뷰", img: {} },
      { code: "img", name: "갤러리 뷰", img: {} },
      { code: "timeline", name: "타임라인 뷰", img: {} },
    ],
    activeType: "text",
    isChange: false,
    value: "",
    list: [],
    noticeBanner,
  }),
  watch: {
    category() {
      this.isChange = !this.isChange;
      this.getList("");
    },
  },
  created() {
    this.getList();
  },
  methods: {
    getList(value = this.value) {
      axios
        .get(
          this.$store.state.dbUrl + "/admin_businessList?businessSeq=" + this.id
        )
        .then(({ data }) => {
          this.data = data[0];
        });
      axios
        .get(
          this.$store.state.dbUrl +
            "/admin_recordList?q=" +
            value +
            "&business=" +
            this.id
        )
        .then(({ data }) => {
          this.list = data;
        });
    },
    typeClick(type) {
      this.activeType = type;
    },
    setValue(val) {
      this.value = val;
    },
    back() {
      this.$router.push("/Newdeal/BusinessRecord");
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
.description {
  padding: 10px;
  border: 1px solid #ddd;
  background-color: #eee;
  margin-bottom: 20px;
}
.option {
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
    }
  }
  ul {
    @include flex(flex-start);
    width: 100%;
    overflow: auto;
    margin-bottom: 5px;
  }
  & > span {
    width: 100%;
    @include flex(space-between);
    margin-bottom: 10px;
    button {
      margin-left: 5px;
      color: #333 !important;
      background-color: #eee !important;
      &:hover {
        color: #333 !important;
        background-color: #ddd !important;
      }
      &.active {
        color: #fff !important;
        background-color: $hoverColor !important;
      }
    }
    select {
      width: 30%;
      min-width: 150px;
    }
    @media screen and (max-width: 800px) {
      flex-direction: column;
      align-items: flex-start;
      & > span {
        width: 100%;
        margin-top: 10px;
        @include flex(flex-end);
        & > button {
          word-break: keep-all;
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  .option > span button:last-of-type {
    display: none;
  }
}
@media screen and (max-width: 500px) {
  select {
    width: 100% !important;
  }
}
</style>