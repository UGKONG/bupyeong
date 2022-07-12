<template>
  <main no-banner>
    <h2>
      <div>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          도시재생대학
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 과정
          상세정보
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 강의
          상세정보
        </p>
      </div>
    </h2>
    <h2 sub>
      <span>
        {{ data.title || "강의 상세정보" }}
      </span>
      <span>
        <button @click="() => $router.go(-1)">뒤로가기</button>
      </span>
    </h2>
    <section>
      <video :src="data.classFile" controls />
      <!-- <div video>강의영상</div> -->
      <div v-text="description" />
      <div v-text="address" />
      <div v-text="dateTime" />
      <div v-text="teacher" />

      <fileList :fileList="data.fileList" />
    </section>
  </main>
</template>

<script>
import axios from "axios";
import fileList from "@admin/src/pageSubComponents/common/fileList";
export default {
  components: {
    fileList,
  },
  props: {
    id: String,
    post: String,
  },
  data: () => ({
    data: {},
  }),
  created() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/classList/" + this.post)
        .then(({ data }) => {
          this.data = data;
        });
    },
  },
  computed: {
    description() {
      return this.data.description;
    },
    address() {
      return "강의 장소 : " + this.data.address;
    },
    dateTime() {
      return (
        "강의 일시 : " +
        this.data.classStartDT +
        " " +
        this.data.classStartTM +
        " ~ " +
        this.data.classEndDT +
        " " +
        this.data.classEndTM
      );
    },
    teacher() {
      return "강사명 : " + this.data.teacherName;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

main {
  video,
  [video] {
    width: 100%;
    min-height: 500px;
    margin-bottom: 20px;
    border: 1px solid red;
    font-size: 40px;
    @include flex(center);
    color: $gray;
  }

  section {
    & > div {
      padding: 6px 0;
    }
  }
}

@media screen and (max-width: 900px) {
  video {
    min-height: unset !important;
  }
}
</style>