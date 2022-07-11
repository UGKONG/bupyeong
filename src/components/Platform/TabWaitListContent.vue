<template>
  <section>
    <div option>
      <span>총 대기자 수 : {{ list.length }}건</span>
      <span>
        <button v-if="!isMaster" @click="setAddModal(true)">대기 등록</button>
        <button v-if="isMaster" @click="setQRModal(true)">대기자 등록</button>
      </span>
    </div>
    <table contents>
      <thead>
        <tr>
          <th v-for="(item, i) in theadList" :key="i" v-text="item" />
        </tr>
      </thead>
      <tbody>
        <WaitLi
          v-for="(item, i) in list"
          :i="i"
          :key="i"
          :item="item"
          :isMaster="isMaster"
          @getList="getList"
        />
      </tbody>
    </table>

    <transition name="fade-transition">
      <QRModal
        v-if="modal.qr"
        :id="id"
        @setQRModal="setQRModal"
        @getList="getList"
      />
      <AddWaitModal v-if="modal.add" :id="id" @setAddModal="setAddModal" />
    </transition>
  </section>
</template>

<script>
import axios from "axios";
import { EventBus } from "@plugins/store";
import WaitLi from "@/components/Platform/TabWait/WaitLi";
import QRModal from "@/components/Platform/TabWait/QRModal";
import AddWaitModal from "@/components/Platform/TabWait/AddWaitModal";
import { useAlert, useDelay } from "@hook";

export default {
  components: {
    WaitLi,
    QRModal,
    AddWaitModal,
  },
  props: {
    id: String,
    isMaster: Boolean,
  },
  data: () => ({
    theadList: ["순번", "대기자", "인원(성인/아동)", "등록일시", "상태", ""],
    list: [],
    modal: {
      add: false,
      qr: false,
    },
    intervalTime: 5, // s단위
  }),
  created() {
    // EventBus.$on("getWaitList", this.getList);
    this.getList();
  },
  methods: {
    getList() {
      axios
        .get(
          this.$store.state.dbUrl2 +
            "/shopWaitList?state=0&state=1&shopId=" +
            this.id
        )
        .then(({ data }) => {
          this.list = data.reverse();
          useDelay(this.intervalTime * 1000).then(() => this.reGetList(data));
          // this.reGetList(data);
        });
    },
    reGetList(data) {
      let myId = this.$store.state.loginInfo.id;
      let myArr = data.filter((x) => x.userId == myId);

      if (myArr.length > 0) this.getList();

      if (myArr.filter((x) => x.state == 1).length > 0) {
        this.callAlert();
      }
    },
    callAlert() {
      let find = document.querySelector("section[alert]");
      if (!find) useAlert.info("호출", "입장 차례가 되었습니다. 입장해주세요.");
    },
    setAddModal(val) {
      this.modal.add = val;
    },
    setQRModal(val) {
      this.modal.qr = val;
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
    white-space: nowrap;
    margin-left: 5px;
    padding: 6px 16px !important;
    background-color: $activeColor;
    border: 1px solid #ddd;
    color: #fff;
    &:hover {
      color: #fff !important;
      background-color: $hoverColor !important;
    }
  }
}

th {
  @include column-size((70px, 140px, 180px, 200px, 150px, 250px));
}
</style>