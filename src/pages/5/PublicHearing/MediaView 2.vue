<template>
  <main no-banner>
    <h2>
      <div>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          스마트시티
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          주민공청회
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 영상
          상세정보
        </p>
        <span>
          {{ data.title || data.mediaTitle || "영상 상세정보" }}
        </span>
      </div>
    </h2>

    <section contents>
      <article>
        <div media>
          <video
            v-if="data.videoPath && data.type == 2"
            :src="data.videoPath"
            controls
            autoplay
          />
          <div
            img
            v-if="!data.videoPath && data.type == 2"
            :style="{
              backgroundImage: 'url(' + tempImg + ')',
              backgroundSize: 'cover',
            }"
          />
          <div
            img
            v-if="data.type == 3"
            :style="{
              backgroundImage: 'url(' + (data.imgPath || tempImg) + ')',
            }"
          />
        </div>
        <ul list>
          <SubMediaLi
            v-for="(item, idx) in list"
            :id="id"
            :post="post"
            :key="idx"
            :item="item"
          />
        </ul>
      </article>
      <article post-info>
        <p title v-text="data.title || data.mediaTitle" />
        <pre contents v-text="data.contents || data.mediaContent" />
      </article>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import SubMediaLi from "@/components/PublicHearing/SubMediaLi";
import tempImg from "@images/tempImg.png";
import processBanner from "@images/2/2/processBanner.png";

export default {
  components: {
    SubMediaLi,
  },
  props: {
    id: String,
    post: String,
  },
  data: () => ({
    tempImg,
    data: {},
    list: [],
    processBanner,
  }),
  watch: {
    post() {
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
        .get(this.$store.state.dbUrl + "/admin_phMediaList/" + this.post)
        .then(({ data }) => {
          this.data = data;
        });
      // .catch(() => this.$router.push("/404"));
    },
    getList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_phMediaList")
        .then(({ data }) => {
          this.list = data;
        });
      // .catch(() => this.$router.push("/404"));
    },
    back() {
      this.$router.push("/StartCity/PublicHearing/" + this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
$listW: 20%;

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
      transition: 0.2s;

      video,
      [img] {
        @include wrap(block);
        @include background-reset();
        background-color: #444444;
      }
    }
    [list] {
      width: 20%;
      align-self: stretch;
      overflow: auto;
      transition: 0.2s;
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
      word-break: break-all;
      white-space: pre-wrap;
    }
  }
}

@media screen and (max-width: 1200px) {
  [media] {
    width: 100% !important;
  }
  [list] {
    width: 0 !important;
  }
}
@media screen and (max-width: 900px) {
  [contents] > article {
    height: 450px;
  }
}
@media screen and (max-width: 700px) {
  [contents] > article {
    height: 350px;
  }
}
@media screen and (max-width: 500px) {
  [contents] > article {
    height: 250px;
  }
}
@media screen and (max-width: 400px) {
  [contents] > article {
    height: 200px;
  }
}
</style>