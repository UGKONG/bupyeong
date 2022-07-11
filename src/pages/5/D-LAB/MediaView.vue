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
        <span>D-LAB</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 스마트시티
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          D-LAB
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          영상 상세정보
        </p>
      </div>
    </h2>

    <h2 sub>
      {{ data.title || data.mediaTitle || "영상 상세정보" }}
      <span>
        <button @click="back">뒤로가기</button>
      </span>
    </h2>

    <section contents>
      <article>
        <div media>
          <video
            v-if="data.type == 2"
            :src="data.videoPath"
            controls
            autoplay
          />
          <div
            img
            v-if="data.type == 3"
            :style="{ backgroundImage: 'url(' + data.imgPath + ')' }"
          />
        </div>
        <ul list>
          <SubMediaLi
            v-for="(item, idx) in list"
            :id="id"
            :key="idx"
            :item="item"
          />
        </ul>
      </article>
      <article post-info>
        <p title v-text="data.title || data.mediaTitle" />
        <pre contents v-text="data.contents || data.mediaContents" />
      </article>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import SubMediaLi from "@/components/Dlab/SubMediaLi";
import noticeBanner from "@images/2/1/noticeBanner.png";

export default {
  components: {
    SubMediaLi,
  },
  props: {
    id: String,
  },
  data: () => ({
    data: {},
    list: [],
    noticeBanner,
  }),
  watch: {
    id() {
      this.getData();
      this.getList();
    },
  },
  created() {
    this.getData();
    this.getList();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/admin_dlabMediaList/" + this.id)
        .then(({ data }) => {
          this.data = data;
        })
        .catch(() => this.$router.push("/404"));
    },
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_dlabMediaList")
        .then(({ data }) => {
          this.list = data;
        })
        .catch(() => this.$router.push("/404"));
    },
    back() {
      this.$router.push("/StartCity/D-LAB?tab=1");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
$listW: 25%;

[contents] {
  & > article {
    @include flex(space-between);
    height: 526px;
    overflow: hidden;
    margin-bottom: 20px;

    [media] {
      width: 100% - $listW;
      padding-right: 10px;
      align-self: stretch;

      video,
      [img] {
        @include wrap(block);
        @include background-reset();
        background-color: #444444;
      }
    }
    [list] {
      width: $listW;
      align-self: stretch;
      overflow: auto;
    }
  }

  [post-info] {
    height: auto;
    flex-wrap: wrap;

    [title] {
      width: 100%;
      font-size: 24px;
      margin-bottom: 10px;
    }
    pre[contents] {
      width: 100%;
      background-color: transparent;
      border: none;
      border-radius: 0;
    }
  }
}
</style>