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
        <span>공모일정</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 공모일정
        </p>
      </div>
    </h2>

    <section>
      <div btnWrap>
        <button
          v-for="(item, idx) in typeList"
          :key="idx"
          v-text="item.name"
          :class="{ active: activeType == item.code }"
          @click="typeClick(item.code)"
        />
      </div>
      <div class="option">
        <div>
          <SearchInput
            v-if="activeType != 'timeline'"
            :change="isChange"
            @setValue="setValue"
            @search="getList"
          />
          <div v-else />
        </div>
      </div>

      <!-- 게시글 -->
      <transition name="slide-y-reverse-transition" mode="out-in">
        <ImgContent v-if="activeType == 'img'" :list="list" />
        <TextContent v-else-if="activeType == 'text'" :list="list" />
        <!-- <TimelineContent v-else :list="list" /> -->
      </transition>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import ImgContent from "@/components/ContestSchedule/ImgContent";
import TextContent from "@/components/ContestSchedule/TextContent";
import TimelineContent from "@/components/ContestSchedule/TimelineContent";
import processBanner from "@images/2/2/processBanner.png";
export default {
  components: {
    SearchInput,
    ImgContent,
    TextContent,
    TimelineContent,
  },
  watch: {
    activeType(val) {
      this.isChange = !this.isChange;
      this.value = "";
      this.getList();
    },
  },
  data: () => ({
    typeList: [
      { code: "text", name: "리스브 뷰", img: {} },
      { code: "img", name: "갤러리 뷰", img: {} },
      // { code: "timeline", name: "타임라인 뷰", img: {} },
    ],
    activeType: "text",
    isChange: false,
    value: "",
    list: [],
    processBanner,
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_contestList?q=" + this.value)
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
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

main > section > [btnWrap] {
  @include flex(flex-end);
  margin-bottom: 10px;
  & > button {
    white-space: nowrap;
    margin-left: 5px;
    padding: 6px 16px !important;
    background-color: #eee;
    border: 1px solid #ddd;
    color: #777;
    &:hover {
      color: #777 !important;
      background-color: #ddd !important;
    }
    &.active {
      color: #fff !important;
      background-color: #574ae1 !important;
    }
  }
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
      @include flex();
      button {
        align-self: stretch;
        height: unset;
        margin-left: 5px;
      }
    }
  }
  ul {
    @include flex(flex-start);
    width: 100%;
    overflow: auto;
    margin-bottom: 5px;
  }
}
</style>