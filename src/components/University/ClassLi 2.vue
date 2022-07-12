<template>
  <li wrap>
    <img :src="item.classImg" alt="강의 이미지" />
    <div contents>
      <h3>
        {{ item.title }}
        <p>
          <span>
            강사명 :
            <span
              teacher-name
              v-text="item.teacherName"
              @click="$emit('setTeacherView', true, item.teacherId)"
            />
          </span>
        </p>
      </h3>
      <div desc v-html="item.description" />
      <div sub>
        <div>
          <p>
            <span h>강의 장소 : </span>
            {{ address }}
          </p>
          <p file-list>
            교재 및 첨부파일 :
            <i
              v-for="(file, i) in item.fileList"
              :key="i"
              :class="$store.state.FontAwesome.fill.file"
            />
          </p>
        </div>
        <div>
          <p>
            <span h>강의 일시 : </span>
            {{ classDTTM }}
          </p>
          <p btns>
            <button v-if="!isStudent" modify @click="classModify">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"
                />
              </svg>
              <span>수정</span>
            </button>
            <button @click="classView">상세보기</button>
          </p>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    item: Object,
    id: String,
  },
  data: () => ({}),
  created() {},
  methods: {
    classModify() {
      this.$router.push({
        path: "/Newdeal/University/" + this.id + "/ClassEdit/" + this.item.id,
        query: { mode: "e" },
      });
    },
    classView() {
      this.$router.push(
        "/Newdeal/University/" + this.id + "/Class/" + this.item.id
      );
    },
  },
  computed: {
    isStudent() {
      return this.$store.state.loginInfo.isStudent;
    },
    address() {
      return this.item.address;
    },
    classDTTM() {
      return (
        this.item.classStartDT +
        " " +
        this.item.classStartTM +
        " ~ " +
        this.item.classEndDT +
        " " +
        this.item.classEndTM
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
$listSize: 200px;

li[wrap] {
  border: 1px solid $whiteGray;
  border-top: 2px solid $activeColor;
  padding: 20px;
  margin-bottom: 10px;
  @include flex(flex-start);

  & > img {
    width: $listSize;
    height: $listSize;
  }
  & > [contents] {
    width: calc(100% - $listSize);
    height: $listSize;
    padding-left: 20px;

    h3 {
      @include text-overflow();
      padding-right: 100px;
      height: 40px;
      margin: 0;
      position: relative;

      p {
        position: absolute;
        top: 0px;
        right: 0px;
        font-size: 14px;
      }

      [teacher-name] {
        text-decoration: underline;
        cursor: pointer;
      }
    }

    [desc] {
      width: 100%;
      height: calc(100% - 120px);
      border: 1px solid $whiteGray;
      padding: 5px;
      color: $gray;
    }

    [sub] {
      width: 100%;
      height: 70px;
      margin-top: 10px;

      & > div {
        width: 100%;
        height: 50%;
        @include flex(space-between);

        button {
          @include font(14px, 500, $activeColor);
          margin-left: 5px;
          background-color: transparent;
          border: 1px solid #574ae1;
          border-radius: 100px;
          &[modify] {
            color: #8c9197;
            transition: 0.1s;
            border: none;

            svg {
              @include size(14px, 14px);
              transform: translateY(1px);
              fill: #8c9197;
              transition: 0.1s;
              path {
                transition: 0.1s;
              }
            }
            &:hover {
              color: #222;
              svg {
                fill: #222;
              }
            }
          }
        }
      }

      [file-list] {
        & > * {
          margin-right: 5px;
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  $listSize: 120px;
  li[wrap] {
    & > img {
      width: $listSize;
      height: $listSize;
    }
    & > [contents] {
      width: calc(100% - $listSize);
      height: $listSize;
      h3 {
        height: 36px;
      }
      [desc] {
        display: none;
      }
      [sub] {
        height: 50px;
        margin-top: 0;
        & > div {
          flex-wrap: wrap;
          & > p {
            width: 100%;
            @include text-overflow();
            &[btns] {
              @include flex(flex-end);
              margin-top: 10px;
            }
            @media screen and (max-width: 600px) {
              [h] {
                display: none;
              }
            }
          }
        }
        [file-list] {
          display: none;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  span[h] {
    display: none !important;
  }
}

@media screen and (max-width: 499px) {
  $listSize: 30px;
  li[wrap] {
    position: relative;
    & > img {
      width: $listSize;
      height: $listSize;
      align-self: flex-start;
      position: absolute;
    }
    & > [contents] {
      width: calc(100%);
      padding-left: 0;
      h3 {
        text-indent: $listSize + 10px;
      }
    }
  }
}
</style>