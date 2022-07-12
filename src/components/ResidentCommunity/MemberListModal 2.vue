<template>
  <section modal>
    <div wrap>
      <h2>
        공동체 구성원
        <button @click="close">
          <i :class="xIcon" />
        </button>
      </h2>
      <div contents>
        <div tab>
          <button :class="{ active: activeTab == 1 }" @click="setActiveTab(1)">
            구성원 리스트
          </button>
          <button :class="{ active: activeTab == 2 }" @click="setActiveTab(2)">
            신청자 리스트
          </button>
        </div>

        <!-- 구성원 리스트 -->
        <table v-if="activeTab == 1">
          <thead>
            <tr>
              <th v-for="(item, idx) in theadList1" :key="idx" v-text="item" />
            </tr>
          </thead>
          <tbody>
            <CommunityMemberLi
              v-for="(item, idx) in list1"
              :key="idx"
              :item="item"
              :idx="idx"
              @getList1="getList1"
            />
          </tbody>
        </table>

        <!-- 신청자 리스트 -->
        <table v-if="activeTab == 2">
          <thead>
            <tr>
              <th
                v-for="item in theadList2"
                :key="item"
                class="request"
                v-text="item"
              />
            </tr>
          </thead>
          <tbody>
            <CommunityRequestLi
              v-for="(item, idx) in list2"
              :key="idx"
              :item="item"
              :idx="idx"
              @getList2="getList2"
            />
          </tbody>
        </table>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import CommunityMemberLi from "@/components/ResidentCommunity/CommunityMemberLi";
import CommunityRequestLi from "@/components/ResidentCommunity/CommunityRequestLi";
import axios from "axios";
export default {
  components: {
    CommunityMemberLi,
    CommunityRequestLi,
  },
  data: () => ({
    theadList1: ["No", "이름", "연락처", "가입일시"],
    theadList2: ["No", "이름", "연락처", "신청일시", ""],
    list1: [],
    list2: [],
    activeTab: 1,
  }),
  watch: {
    activeTab(val) {
      if (val == 1) this.getList1();
      if (val == 2) this.getList2();
    },
  },
  created() {
    this.getList1();
  },
  methods: {
    getList1() {
      axios
        .get(this.$store.state.dbUrl + "/communityMemberList?state=1")
        .then(({ data }) => {
          this.list1 = data;
        });
    },
    getList2() {
      axios
        .get(this.$store.state.dbUrl + "/communityMemberList")
        .then(({ data }) => {
          this.list2 = data.sort((x, y) => x.state - y.state);
        });
    },
    setActiveTab(val) {
      this.activeTab = val;
    },
    close() {
      this.$emit("setMemberListModalYN", false);
    },
  },
  computed: {
    xIcon() {
      return this.$store.state.FontAwesome.stroke.x;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
[wrap] {
  width: 700px !important;
  height: 500px !important;
  left: calc(50% - 350px) !important;
}
[tab] {
  /* background-color: $white; */
  position: sticky;
  top: 0;
  z-index: $index1;

  button {
    padding: 6px 16px !important;
    background-color: $whiteGray;
    margin-right: 5px;
    &:last-of-type {
      margin-right: 0;
    }
    &:hover {
      background-color: #ccc !important;
    }
  }
}
[tab] button.active {
  color: #fff;
  background-color: $activeColor;
  &:hover {
    color: #fff;
    background-color: $activeColor !important;
  }
}
table {
  margin-top: 10px;

  th {
    &:nth-of-type(1) {
      width: 70px;
    }
    &:nth-of-type(4) {
      width: 150px;
    }
    &:nth-of-type(5) {
      width: 138px;
    }
  }
}

@media screen and (max-width: 800px) {
  [wrap] {
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    border-radius: 0 !important;
  }
}
@media screen and (max-width: 600px) {
  table {
    th {
      &:nth-of-type(3) {
        width: 120px;
      }

      &.request {
        &:nth-of-type(4) {
          width: 0;
          padding: 0;
          border: 0;
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  table {
    th {
      &:nth-of-type(1) {
        width: 60px;
      }
      &:nth-of-type(4) {
        width: 0;
        padding: 0;
        border: 0;
      }
      &.request {
        &:nth-of-type(1) {
          width: 0;
          padding: 0;
        }
        &:nth-of-type(3) {
          width: 110px;
        }
      }
    }
  }
}
</style>