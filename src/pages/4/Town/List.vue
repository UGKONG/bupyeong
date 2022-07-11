<template>
  <main>
    <p history>
      상권활성화
      <i :class="$store.state.FontAwesome.stroke.angle.right" /> 푸드플랫폼
    </p>
    <h2>상점 리스트</h2>
    <section>
      <div class="option">
        <SearchInput
          :change="isChange"
          @setValue="setValue"
          @search="getList"
        />
        <div>
          <button
            v-for="(item, idx) in typeList"
            :key="idx"
            v-text="item.name"
            :class="{ active: activeType == item.code }"
            @click="typeClick(item.code)"
          />
        </div>
      </div>

      <!-- 게시글 -->
      <transition name="slide-y-reverse-transition" mode="out-in">
        <ImgContent v-if="activeType == 'img'" :list="list" />
        <TextContent v-if="activeType == 'text'" :list="list" />
      </transition>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import ImgContent from "@/components/Platform/ImgContent";
import TextContent from "@/components/Platform/TextContent";

export default {
  components: {
    SearchInput,
    ImgContent,
    TextContent,
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
      { code: "img", name: "갤러리 뷰", img: {} },
      { code: "text", name: "리스브 뷰", img: {} },
    ],
    activeType: "img",
    isChange: false,
    value: "",
    list: [],
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_foodShopList?q=" + this.value)
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

.option {
  @include flex(space-between);
  padding-bottom: 4px;
  margin-bottom: 10px;

  & > div {
    @include flex(flex-start);
    button {
      margin-left: 5px;
      &.active {
        background-color: var(--gray);
        color: var(--white);
      }
    }
  }
}
</style>