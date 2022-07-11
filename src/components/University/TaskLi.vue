<template>
  <li>
    <div wrap>
      <h3>
        {{ item.title }}
        <span>과제 마감일 : {{ endDTTM }}</span>
      </h3>
      <div description>
        {{ item.contents }}
      </div>
      <div sub>
        <div bind-class>
          <span title>연결강의</span>
          <span value v-text="item.className" />
        </div>
        <div btns>
          <button v-if="!isStudent" modify @click="edit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                d="M490.3 40.4C512.2 62.27 512.2 97.73 490.3 119.6L460.3 149.7L362.3 51.72L392.4 21.66C414.3-.2135 449.7-.2135 471.6 21.66L490.3 40.4zM172.4 241.7L339.7 74.34L437.7 172.3L270.3 339.6C264.2 345.8 256.7 350.4 248.4 353.2L159.6 382.8C150.1 385.6 141.5 383.4 135 376.1C128.6 370.5 126.4 361 129.2 352.4L158.8 263.6C161.6 255.3 166.2 247.8 172.4 241.7V241.7zM192 63.1C209.7 63.1 224 78.33 224 95.1C224 113.7 209.7 127.1 192 127.1H96C78.33 127.1 64 142.3 64 159.1V416C64 433.7 78.33 448 96 448H352C369.7 448 384 433.7 384 416V319.1C384 302.3 398.3 287.1 416 287.1C433.7 287.1 448 302.3 448 319.1V416C448 469 405 512 352 512H96C42.98 512 0 469 0 416V159.1C0 106.1 42.98 63.1 96 63.1H192z"
              />
            </svg>
            <span>수정</span>
          </button>
          <button v-if="!isStudent" modify @click="remove">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
              <path
                d="M135.2 17.69C140.6 6.848 151.7 0 163.8 0H284.2C296.3 0 307.4 6.848 312.8 17.69L320 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H128L135.2 17.69zM31.1 128H416V448C416 483.3 387.3 512 352 512H95.1C60.65 512 31.1 483.3 31.1 448V128zM111.1 208V432C111.1 440.8 119.2 448 127.1 448C136.8 448 143.1 440.8 143.1 432V208C143.1 199.2 136.8 192 127.1 192C119.2 192 111.1 199.2 111.1 208zM207.1 208V432C207.1 440.8 215.2 448 223.1 448C232.8 448 240 440.8 240 432V208C240 199.2 232.8 192 223.1 192C215.2 192 207.1 199.2 207.1 208zM304 208V432C304 440.8 311.2 448 320 448C328.8 448 336 440.8 336 432V208C336 199.2 328.8 192 320 192C311.2 192 304 199.2 304 208z"
              />
            </svg>
            <span>삭제</span>
          </button>
          <button detail @click="detail">
            상세보기
            <i :class="$store.state.FontAwesome.stroke.angle.right" />
          </button>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import editIcon from "@images/icons/edit.png";
import delIcon from "@images/icons/del.png";
import { useAlert } from "@hook";
export default {
  props: {
    item: Object,
    idx: Number,
    id: String,
  },
  methods: {
    edit() {
      console.log(this.item.id);
      this.$emit("setTaskWriteView", true, this.item.id);
    },
    remove() {
      useAlert.success("과제", "과제가 삭제되었습니다.");
    },
    detail() {
      this.$router.push(
        "/Newdeal/University/" + this.id + "/Task/" + this.item.id
      );
    },
  },
  computed: {
    isStudent() {
      return this.$store.state.loginInfo.isStudent;
    },
    editIcon() {
      return editIcon;
    },
    delIcon() {
      return delIcon;
    },
    endDTTM() {
      let date = this.item.endDTTM;
      if (date) {
        date = date.replaceAll("-", ".");
        date = date.slice(0, -3);
      }
      return date;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
$listSize: 150px;

li {
  border: 1px solid $whiteGray;
  border-top: 2px solid $activeColor;
  padding: 20px;
  margin-bottom: 6px;

  & > [wrap] {
    @include wrap();
    height: $listSize;

    & > h3 {
      @include flex(space-between);
      height: 30px;
      margin-bottom: 10px;

      span {
        font-size: 15px;
        color: #b85353;
      }
    }

    & > [description] {
      width: 100%;
      height: calc(100% - 30px - 10px - 50px);
      max-height: 60px;
      overflow: auto;
    }

    & > [sub] {
      @include flex(space-between);
      height: 50px;
      padding-top: 20px;
      [bind-class] {
        @include flex(flex-start);
        [title] {
          background-color: #8c9197;
          color: #fff;
          padding: 4px 12px;
          border-radius: 40px;
        }
        [value] {
          @include text-overflow();
          display: inline-block;
          width: 200px;
          margin-left: 14px;
        }
      }
      [btns] {
        button {
          @include font(14px, 500);
          background-color: transparent;
          &[modify] {
            color: #8c9197;
            transition: 0.1s;

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
          &[detail] {
            color: $activeColor;
            border: 1px solid $activeColor;
            border-radius: 100px;
            svg,
            i {
              margin-left: 6px;
            }
            &:hover {
              background-color: $activeColor;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 900px) {
  li > [wrap] {
    height: unset !important;
  }
  [sub] {
    flex-wrap: wrap !important;
    height: unset !important;
  }
  [bind-class] {
    width: 100%;
    [value] {
      width: 150px !important;
      margin-left: 6px !important;
    }
  }
  [btns] {
    @include flex(flex-end !important);
    width: 100%;
    margin-top: 10px;
  }
}
@media screen and (max-width: 499px) {
  h3 {
    flex-wrap: wrap !important;
    height: unset !important;
    span {
      @include flex(flex-start);
      width: 100%;
    }
  }
  [btns] {
    [modify] {
      padding: 4px 10px !important;
      span {
        display: none !important;
      }
    }
    [detail] {
      margin-left: 10px;
    }
  }
}
</style>