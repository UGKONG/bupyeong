<template>
  <section>
    <div option v-if="isMaster">
      <span>총 신청 수 : {{ list.length }}건</span>
      <span>
        <span new>신규 : {{ newReservCount }}건</span>
        <span ok>수락 : {{ okReservCount }}건</span>
        <span no>거절 : {{ noReservCount }}건</span>
        <span cancel>취소 : {{ cancelReservCount }}건</span>
      </span>
    </div>
    <table contents>
      <thead>
        <tr>
          <th
            v-for="(item, i) in theadList"
            :key="i"
            v-text="item"
            :style="theadStyle(i)"
          />
        </tr>
      </thead>
      <tbody>
        <ReservedLi
          v-for="(item, i) in list"
          :i="i"
          :key="i"
          :item="item"
          :isMaster="isMaster"
          @getList="getList"
        />
      </tbody>
    </table>
  </section>
</template>

<script>
import axios from "axios";
import { EventBus } from "@plugins/store";
import ReservedLi from "@/components/Platform/TabReserved/ReservedLi";

export default {
  components: {
    ReservedLi,
  },
  props: {
    id: String,
    isMaster: Boolean,
  },
  data: () => ({
    theadList: [
      "No",
      "예약자",
      "연락처",
      "예약일시",
      "인원(성인/아동)",
      "신청일시",
      "상태",
      "",
    ],
    list: [],
  }),
  created() {
    this.getList();
    EventBus.$on("getShopReservList", this.getList);
  },
  methods: {
    getList() {
      axios
        .get(
          this.$store.state.dbUrl2 + "/shopReservationList?shopId=" + this.id
        )
        .then(({ data }) => {
          this.list = data.reverse();
        });
    },
    theadStyle(i) {
      if (this.theadList.length - 1 != i) return {};
      if (this.isMaster) return { width: "140px" };
      // 140 105
      return { width: "105px" };
    },
  },
  computed: {
    newReservCount() {
      return this.list.filter((x) => x.state == 0).length;
    },
    okReservCount() {
      return this.list.filter((x) => x.state == 1).length;
    },
    noReservCount() {
      return this.list.filter((x) => x.state == 2).length;
    },
    cancelReservCount() {
      return this.list.filter((x) => x.state == 3).length;
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
      (60px, 120px, 140px, 150px, 130px, 160px, 120px, 140px)
    );
  }
}
</style>