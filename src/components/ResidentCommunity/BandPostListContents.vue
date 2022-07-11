<template>
  <div contents>
    <p>불러올 게시글을 선택해주세요.</p>
    <ul>
      <BandPostLi
        v-for="(item, idx) in list"
        :key="idx"
        :item="item"
        :idx="idx"
        @setChoicePost="setChoicePost"
      />
    </ul>
    <button v-if="choicePost != ''" @click="importPost">불러오기</button>
  </div>
</template>

<script>
import axios from "axios";
import { useToday, useAlert } from "@hook";
import BandPostLi from "@/components/ResidentCommunity/BandPostLi";
export default {
  components: {
    BandPostLi,
  },
  props: {
    access_token: String,
    band_key: String,
    getPostList: Function,
  },
  data: () => ({
    list: [],
    now: {},
    choicePost: "",
  }),
  created() {
    this.now = useToday();
    this.getList();
  },
  methods: {
    getList() {
      // axios
      //   .get("https://openapi.band.us/v2/band/posts", {
      //     params: {
      //       access_token: this.access_token,
      //       band_key: this.band_key,
      //       locale: "ko_KR",
      //     },
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   });
      axios.get(this.$store.state.dbUrl + "/bandPost").then(({ data }) => {
        this.list = data.result_data.items;
      });
    },
    importPost() {
      let obj = this.list.find((x) => x.post_key == this.choicePost);

      let data = {
        title: obj.content.slice(0, 20) + "...",
        writer: this.$store.state.loginInfo.id,
        writerName: this.$store.state.loginInfo.name,
        writeDT: this.now,
        fileList: [],
        contents: obj.content + "<br /><br />[BAND에서 공유됨]",
      };
      axios
        .post(this.$store.state.dbUrl + "/communityPostList", data)
        .then(() => {
          useAlert.success("BAND 불러오기", "게시글을 불러왔습니다.");
          this.getPostList();
          this.$emit("close");
        });
    },
    setChoicePost(val) {
      this.choicePost = val;
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
ul {
  margin-top: 20px;
}
button {
  display: block;
  margin: 14px auto;
}
</style>