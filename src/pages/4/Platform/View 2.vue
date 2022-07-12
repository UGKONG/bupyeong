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
        <span>푸드플랫폼</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 상권활성화
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          푸드플랫폼
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          {{ data.shopName || "상점 상세정보" }}
        </p>
      </div>
    </h2>

    <h2 sub>
      <span>{{ data.shopName || "상점 상세정보" }}</span>
      <span btnWrap style="flex-wrap: wrap">
        <span class="temp">현재 : {{ isMaster ? "상점주" : "사용자" }}</span>
        <button @click="setIsMaster(!isMaster)">
          {{ isMaster ? "사용자 모드 (임시)" : "상점주 모드 (임시)" }}
        </button>
        <button v-if="isMaster" @click="descriptionEdit">소개내용 수정</button>
        <button @click="positionView">위 치</button>
      </span>
    </h2>
    <!-- <qrcode :text="qrCode" /> -->

    <section contents>
      <ShopInfo :description="data.shopDescription" />

      <article tab-wrap top-tab>
        <div tab-btns>
          <button
            v-for="(item, idx) in tabList.top"
            :key="idx"
            v-text="item.name"
            :class="{ active: item.id == topTab }"
            @click="topTabClick(item.id)"
          />
        </div>
        <div tab-contents>
          <div component>
            <TabItemContent v-if="topTab == 1" :id="id" :isMaster="isMaster" />
            <TabMediaContent v-if="topTab == 2" :id="id" :isMaster="isMaster" />
            <TabCouponContent
              v-if="topTab == 3"
              :id="id"
              :isMaster="isMaster"
            />
            <TabReservContent
              v-if="topTab == 4"
              :id="id"
              :isMaster="isMaster"
            />
          </div>
        </div>
      </article>

      <article tab-wrap bottom-tab>
        <div tab-btns>
          <button
            v-for="(item, idx) in tabList.bottom"
            :key="idx"
            v-text="item.name"
            :class="{ active: item.id == bottomTab }"
            @click="bottomTabClick(item.id)"
          />
        </div>
        <div tab-contents>
          <div component>
            <TabHaveCouponContent
              v-if="bottomTab == 1"
              :id="id"
              :isMaster="isMaster"
            />
            <TabReservedContent
              v-if="bottomTab == 2"
              :id="id"
              :isMaster="isMaster"
            />
            <TabWaitListContent
              v-if="bottomTab == 3"
              :id="id"
              :isMaster="isMaster"
            />
          </div>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
// import VueQRCodeComponent from 'vue-qrcode-component';
import axios from "axios";
import ShopInfo from "@/components/Platform/ShopInfo";
import TabItemContent from "@/components/Platform/TabItemContent";
import TabMediaContent from "@/components/Platform/TabMediaContent";
import TabCouponContent from "@/components/Platform/TabCouponContent";
import TabReservContent from "@/components/Platform/TabReservContent";
import TabReservedContent from "@/components/Platform/TabReservedContent";
import TabHaveCouponContent from "@/components/Platform/TabHaveCouponContent";
import TabWaitListContent from "@/components/Platform/TabWaitListContent";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    ShopInfo,
    TabItemContent,
    TabMediaContent,
    TabCouponContent,
    TabReservContent,
    TabReservedContent,
    TabHaveCouponContent,
    TabWaitListContent,
    // 'qrcode': VueQRCodeComponent,
  },
  props: {
    id: String,
  },
  data: () => ({
    isMaster: true, // true: 상점주, false: 시민 (임시)
    data: {},
    tabList: {
      top: [
        { id: 1, name: "상품", auth: false },
        { id: 2, name: "영상", auth: false },
        { id: 3, name: "쿠폰 현황", auth: false },
        { id: 4, name: "예약", auth: false },
      ],
      bottom: [
        { id: 1, name: "보유쿠폰", auth: false },
        { id: 2, name: "예약이력", auth: false },
        { id: 3, name: "대기자 리스트", auth: false },
      ],
    },
    noticeBanner,
  }),
  created() {
    this.tabChk();
    this.getData();
  },
  methods: {
    topTabClick(id) {
      if (id == this.topTab) return;
      this.$router.push({ query: { topTab: id, bottomTab: this.bottomTab } });
    },
    bottomTabClick(id) {
      if (id == this.bottomTab) return;
      this.$router.push({ query: { topTab: this.topTab, bottomTab: id } });
    },
    tabChk() {
      let topTab = this.$route.query.topTab;
      let bottomTab = this.$route.query.bottomTab;

      !topTab &&
        this.$router.push({ query: { topTab: 1, bottomTab: this.bottomTab } });
      !bottomTab &&
        this.$router.push({ query: { topTab: this.topTab, bottomTab: 1 } });
    },
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/admin_foodShopList?shopSeq=" + this.id)
        .then(({ data }) => {
          if (!data[0]) return this.$router.push("/404");
          this.data = data[0];
        })
        .catch(() => this.$router.push("/404"));
    },
    descriptionEdit() {
      this.$router.push("/Food/Platform/" + this.id + "/Write");
    },
    positionView() {
      let po = this.data.shopPosition;
      console.log(po);
    },
    back() {
      this.$router.push("/Food/Platform");
    },
    setIsMaster(val) {
      this.isMaster = val;
    },
  },
  computed: {
    topTab() {
      return this.$route.query.topTab;
    },
    bottomTab() {
      return this.$route.query.bottomTab;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
span[btnWrap] {
  white-space: nowrap;
}
h2[sub] > span[btnWrap] > button {
  white-space: nowrap;
  margin-left: 5px;
  padding: 6px 16px !important;
  background-color: $activeColor;
  border: 1px solid #ddd;
  color: #fff;
  &:hover {
    background-color: $hoverColor !important;
  }
}
[tab-wrap] {
  /* max-height: 800px; */
  margin-bottom: 20px;

  [tab-btns] {
    button {
      margin-right: 5px;
      @include font(13px, 400, auto, 1px);
      color: #333 !important;
      background-color: #eee !important;
      &:hover {
        color: #333 !important;
        background-color: #ddd !important;
      }
      &.active {
        background-color: $activeColor !important;
        color: $white !important;
      }
    }
  }
  [tab-contents] {
    @include border();
    height: calc(100% - 28px);
    padding: 10px;

    & > div {
      @include wrap();
    }
  }
}
[component] > section {
  overflow-x: auto;
}

@media screen and (max-width: 900px) {
  h2[sub] {
    flex-flow: column;
    & > span {
      width: 100%;
      justify-content: flex-start !important;
      &[btnWrap] {
        justify-content: flex-end !important;
        margin-top: 10px;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  h2[sub] > span[btnWrap] > span.temp {
    display: none !important;
  }
}
</style>