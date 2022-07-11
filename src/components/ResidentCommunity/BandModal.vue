<template>
  <section modal>
    <div wrap>
      <h2>
        BAND 내보내기
        <button @click="close">
          <i :class="xIcon" />
        </button>
      </h2>
      <BandListContents
        v-if="modalProgress == 0"
        :access_token="access_token"
        @setBand_key="setBand_key"
        @setModalProgress="setModalProgress"
      />
      <BandPostListContents
        v-if="modalProgress == 1"
        :access_token="access_token"
        :band_key="band_key"
        :getPostList="getList"
        @close="close"
        @setModalProgress="setModalProgress"
      />
    </div>
    <div bg />
  </section>
</template>

<script>
import BandListContents from "@/components/ResidentCommunity/BandListContents";
import BandPostListContents from "@/components/ResidentCommunity/BandPostListContents";
export default {
  components: {
    BandListContents,
    BandPostListContents,
  },
  props: {
    getList: Function,
  },
  data: () => ({
    modalProgress: 0,
    access_token:
      "ZQAAASjG8c-vZ6emFErNcOqw8FpYs0Avj16Nsq31C7tln12EY2HsaBno2Zq9mKyv0XdorUBRK0q1L8o2re6Q_isdPkmbZGzgdxqeP72GhjLRUWAE",
    band_key: "",
  }),
  created() {
    this.modalProgress = 0;
  },
  methods: {
    setModalProgress(val) {
      this.modalProgress = val;
    },
    setBand_key(val) {
      this.band_key = val;
    },
    close() {
      this.$emit("setBandModalYN", false);
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
  width: auto !important;
  max-width: 600px;
  height: auto !important;
  max-height: 600px;
  left: 50% !important;
  transform: translateX(-50%);

  [contents] {
    max-height: 560px;
    overflow: auto;
  }
}
</style>