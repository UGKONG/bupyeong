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
        <span>설문조사</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          설문조사
        </p>
      </div>
    </h2>

    <section>
      <div class="option">
        <div>
          <SearchInput
            style="display: inline-block"
            @setValue="setSearchValue"
            @search="getList"
          />
        </div>
      </div>
      <ul>
        <SurveyLi
          v-for="(item, idx) in list"
          :key="idx"
          :item="item"
          :idx="idx"
        />
      </ul>
    </section>
  </main>
</template>

<script>
import SurveyLi from "@/components/Survey/SurveyLi";
import SearchInput from "@admin/src/htmlTemplate/SearchInput.vue";
import axios from "axios";
import processBanner from "@images/2/2/processBanner.png";

export default {
  components: {
    SurveyLi,
    SearchInput,
  },
  data: () => ({
    searchValue: "",
    list: [],
    processBanner,
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          this.$store.state.dbUrl + "/admin_surveyList?q=" + this.searchValue
        )
        .then(({ data }) => {
          this.list = data;
        });
    },
    setSearchValue(val) {
      this.searchValue = val;
    },
  },
  computed: {
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
    @include flex(space-between);
    button {
      align-self: stretch;
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