<template>
  <main>
    <p history>
      상권활성화
      <i :class="$store.state.FontAwesome.stroke.angle.right" /> 푸드플랫폼
      <i :class="$store.state.FontAwesome.stroke.angle.right" /> 상점 상세정보
    </p>
    <h2>
      {{ data.shopName || '상점 상세정보'}}
      <div>
        <button @click="back">뒤로가기</button>
        <button v-if="isMaster" @click="descriptionEdit">소개내용 수정</button>
        <button @click="positionView">위 치</button>
        현재 : {{ isMaster ? '상점주' : '사용자' }}
        <button @click="setIsMaster(!isMaster)">
          {{ isMaster ? '사용자 모드 (임시)' : '상점주 모드 (임시)' }}
        </button>
      </div>
    </h2>
    <!-- <qrcode :text="qrCode" /> -->

    <section contents>
      <ShopInfo />
      
      <article tab-wrap top-tab>
        <div tab-btns>
          <button v-for="(item,idx) in tabList.top" :key="idx" v-text="item.name"
            :class="{active: item.id == topTab}"
            @click="topTabClick(item.id)"
          />
        </div>
        <div tab-contents>
          <div component>
            <TabItemContent v-if="topTab == 1" :id="id" :isMaster="isMaster" />
            <TabMediaContent v-if="topTab == 2" :id="id" :isMaster="isMaster" />
            <TabCouponContent v-if="topTab == 3" :id="id" :isMaster="isMaster" />
            <TabReservContent v-if="topTab == 4" :id="id" :isMaster="isMaster" />
          </div>
        </div>
      </article>

      <article tab-wrap bottom-tab>
        <div tab-btns>
          <button v-for="(item,idx) in tabList.bottom" :key="idx" v-text="item.name"
            :class="{active: item.id == bottomTab}"
            @click="bottomTabClick(item.id)"
          />
        </div>
        <div tab-contents>
          <div component>
            <TabHaveCouponContent v-if="bottomTab == 1" :id="id" :isMaster="isMaster" />
            <TabReservedContent v-if="bottomTab == 2" :id="id" :isMaster="isMaster" />
            <TabWaitListContent v-if="bottomTab == 3" :id="id" :isMaster="isMaster" />
          </div>
        </div>
      </article>

    </section>
  </main>
</template>

<script>
// import VueQRCodeComponent from 'vue-qrcode-component';
import axios from 'axios';
import ShopInfo from '@/components/Platform/ShopInfo';
import TabItemContent from '@/components/Platform/TabItemContent';
import TabMediaContent from '@/components/Platform/TabMediaContent';
import TabCouponContent from '@/components/Platform/TabCouponContent';
import TabReservContent from '@/components/Platform/TabReservContent';
import TabReservedContent from '@/components/Platform/TabReservedContent';
import TabHaveCouponContent from '@/components/Platform/TabHaveCouponContent';
import TabWaitListContent from '@/components/Platform/TabWaitListContent';

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
    isMaster: true,  // true: 상점주, false: 시민 (임시)
    data: {},
    tabList: {
      top: [
        {id: 1, name: '상품', auth: false},
        {id: 2, name: '영상', auth: false},
        {id: 3, name: '쿠폰 현황', auth: false},
        {id: 4, name: '예약', auth: false},
      ],
      bottom: [
        {id: 1, name: '보유쿠폰', auth: false},
        {id: 2, name: '예약이력', auth: false},
        {id: 3, name: '대기자 리스트', auth: false},
      ]
    },
  }),
  created() {
    this.tabChk();
    this.getData();
  },
  methods: {
    topTabClick(id) {
      if (id == this.topTab) return;
      this.$router.push({query: {topTab: id, bottomTab: this.bottomTab}});
    },
    bottomTabClick(id) {
      if (id == this.bottomTab) return;
      this.$router.push({query: {topTab: this.topTab, bottomTab: id}});
    },
    tabChk() {
      let topTab = this.$route.query.topTab;
      let bottomTab = this.$route.query.bottomTab;

      !topTab && this.$router.push({query: {topTab: 1, bottomTab: this.bottomTab}});
      !bottomTab && this.$router.push({query: {topTab: this.topTab, bottomTab: 1}});
    },
    getData() {
      axios
        .get(this.$store.state.dbUrl + '/admin_foodShopList?shopSeq=' + this.id)
        .then(({data}) => {
          if (!data[0]) return this.$router.push('/404');
          this.data = data[0];
        })
        .catch(() => this.$router.push('/404'))
    },
    descriptionEdit() {
      this.$router.push('/Food/Platform/' + this.id + '/Write');
    },
    positionView() {
      let po = this.data.shopPosition;
      console.log(po);
    },
    back() {
      this.$router.push('/Food/Platform');
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@index.scss';

[tab-wrap] {
  max-height: 800px;
  margin-bottom: 20px;

  [tab-btns] {
    button {
      margin-right: 5px;
      @include font(13px, 400, auto, 1px);
      &.active {
        background-color: $gray;
        color: $white;
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
</style>