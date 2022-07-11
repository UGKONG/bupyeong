<template>
  <section>
    <ul contents>
      <SurveyLi v-for="(item, i) in list" :key="i" :item="item" :idx="i" />
    </ul>
  </section>
</template>

<script>
import axios from "axios";
import SurveyLi from "@/components/Dlab/TabSurvey/SurveyLi";

export default {
  components: {
    SurveyLi,
  },
  data: () => ({
    list: [],
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_surveyList")
        .then(({ data }) => {
          this.list = data.reverse();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[option] {
  @include shop-tab-option(space-between);
  border-bottom: none;
  button {
    margin-left: 5px;
  }
  span {
    margin-left: 5px;
    font-weight: 500;
    margin-right: 10px;
  }
  [new] {
    color: $blue;
  }
  [ok] {
    color: $greenActive;
  }
  [no] {
    color: $redActive;
  }
  [cancel] {
    color: $gray;
    margin-right: 0;
  }
}
[contents] {
  width: 100%;
  height: calc(100% - $shop-tab-optionHeight);
  padding-top: 10px;
  overflow: auto;
  align-items: flex-start;
  align-content: flex-start;

  th {
    @include column-size(
      (60px, auto, 130px, 140px, 200px, 200px, 100px, 104px)
    );
  }
}
</style>