<template>
  <section>
    <table contents>
      <thead>
        <tr>
          <th v-for="(item, i) in theadList" :key="i" v-text="item" />
        </tr>
      </thead>
      <tbody>
        <ReservedLi
          v-for="(item, i) in list"
          :i="i"
          :key="i"
          :item="item"
          @getList="getList"
        />
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from "axios";
import { EventBus } from "@plugins/store";
import ReservedLi from "@/components/Dlab/TabReserved/ReservedLi";

export default {
  components: {
    ReservedLi,
  },
  data: () => ({
    theadList: [
      "No",
      "예약자",
      "연락처",
      "장소",
      "시작일시",
      "종료일시",
      "상태",
      "",
    ],
    list: [],
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(this.$store.state.dbUrl2 + "/DlabReservationList")
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
section {
  overflow-x: auto;
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