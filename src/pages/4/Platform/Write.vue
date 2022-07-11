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
        <span>상점 소개문구 수정</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 상권활성화
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          푸드플랫폼
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          {{ data.commTitle }}
        </p>
      </div>
    </h2>

    <h2 sub>
      소개 문구 수정
      <span>
        <button @click="back">뒤로가기</button>
        <button @click="save">저장</button>
      </span>
    </h2>
    <section>
      <HtmlEditor
        ref="editor"
        name="상점 소개내용 수정"
        :value="data.shopDescription"
      />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import HtmlEditor from "@/components/Common/HtmlEditor";
import noticeBanner from "@images/2/1/noticeBanner.png";
export default {
  components: {
    HtmlEditor,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    noticeBanner,
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/admin_foodShopList?shopSeq=" + this.id)
        .then(({ data }) => {
          this.data = data[0];
        });
    },
    save() {
      let contents = $('[name="상점 소개내용 수정"]').summernote("code");
      console.log(contents);
    },
    back() {
      this.$router.push("/Food/Platform/" + this.id);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
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
</style>