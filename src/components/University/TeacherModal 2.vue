<template>
  <section modal>
    <div wrap>
      <h2>
        강사 정보
        <button @click="$emit('setTeacherView', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <div img :style="{ backgroundImage: 'url(' + data.imgPath + ')' }" />
        <div text>
          <p name>강사명 : {{ data.managerName }}</p>
          <p description>
            <span style="font-weight: 600; letter-spacing: 2px">소개문구</span>
            <span v-text="data.description" />
          </p>
        </div>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import axios from "axios";
export default {
  props: {
    teacherId: Number,
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
        .get(
          this.$store.state.dbUrl +
            "/admin_processManagerList?managerSeq=" +
            this.teacherId
        )
        .then(({ data }) => {
          this.data = data[0];
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
$modalW: 550px;
$h: 200px;

[modal] > div[wrap] {
  width: $modalW;
  height: 300px;
  left: calc(50% - ($modalW / 2));
  transition: 0.2s;
}
[contents] {
  @include flex(space-between);

  [img] {
    width: 140px;
    height: $h;
    border: 1px solid red;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  [text] {
    width: calc(100% - 140px);
    height: $h;
    padding-left: 20px;

    [name] {
      font-size: 20px;
      margin-bottom: 20px;
    }
    [description] {
      span {
        display: block;
        &:last-of-type {
          margin-top: 6px;
          height: 120px;
          overflow: auto;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  [wrap] {
    width: 450px !important;
    left: calc(50% - 225px) !important;
  }
  [contents] {
    flex-flow: column;
    justify-content: flex-start;
    [img] {
      width: 250px;
      min-height: 200px;
      margin-bottom: 20px;
    }
    [text] {
      padding: 0;
      text-align: center;
    }
  }
}

@media screen and (max-width: 499px) {
  [wrap] {
    width: 100% !important;
    left: 0 !important;
    height: 100% !important;
    top: 0 !important;
    border-radius: 0 !important;
    [contents] {
      [text] {
        width: calc(100% - 50px);
      }
    }
  }
}
</style>