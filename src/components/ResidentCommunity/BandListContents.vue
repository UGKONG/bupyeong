<template>
  <div contents>
    <p>게시글을 불러올 밴드를 선택해주세요.</p>
    <ul>
      <BandLi
        v-for="(item, idx) in list"
        :key="idx"
        :item="item"
        :idx="idx"
        @setChoiceBand="setChoiceBand"
      />
    </ul>
    <button v-if="choiceBand != ''" @click="next">다음</button>
  </div>
</template>

<script>
import axios from "axios";
import BandLi from "@/components/ResidentCommunity/BandLi";
export default {
  components: {
    BandLi,
  },
  props: {
    access_token: String,
  },
  data: () => ({
    list: [],
    choiceBand: "",
  }),
  created() {
    this.getList();
  },
  methods: {
    getList() {
      // axios.get("https://openapi.band.us/v2.1/bands?access_token=" + this.access_token).then((res) => {});
      let data = {
        result_code: 1,
        result_data: {
          bands: [
            {
              name: "강원도립대학교 통통통",
              cover:
                "https://coresos-phinf.pstatic.net/a/31de45/d_bgfUd018svcom4040gh0hl5_vokjqz.jpg",
              member_count: 725,
              band_key: "AAAYUDyWsJhlDxuLPiRlYZ4Y",
            },
            {
              name: "테스트 밴드",
              cover:
                "https://coresos-phinf.pstatic.net/a/2ih02b/c_i6hUd018adm1kebdj3jxmaw6_oscd2w.jpg",
              member_count: 1,
              band_key: "AABX5pVGu0njQSz-Iusyi03u",
            },
          ],
        },
      };
      this.list = data.result_data.bands;
    },
    setChoiceBand(val) {
      this.choiceBand = val;
    },
    next() {
      this.$emit("setBand_key", this.choiceBand);
      this.$emit("setModalProgress", 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
ul {
  @include flex(center);
}
button {
  display: block;
  margin: 14px auto;
}
</style>