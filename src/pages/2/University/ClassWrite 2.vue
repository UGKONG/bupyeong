<template>
  <main no-banner>
    <h2>
      <div>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 뉴딜참여
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          도시재생대학
          <i :class="$store.state.FontAwesome.stroke.angle.right" /> 과정
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          {{ pageTitle }}
        </p>
        <span v-text="pageTitle" />
      </div>
    </h2>
    <section>
      <div class="top">
        <ul type-btn>
          <li v-for="(item, idx) in classTypeList" :key="idx">
            <input
              type="radio"
              name="classType"
              v-model="data.type"
              :id="'chk' + item.id"
              :value="item.id"
            />
            <label :for="'chk' + item.id" v-text="item.name" />
          </li>
        </ul>
        <p>
          <label>
            <span label>강의 대표 이미지</span>
            <input type="file" ref="classImg" />
          </label>
        </p>
      </div>
      <div class="body">
        <div row>
          <label>
            <span label>강의 제목</span>
            <input type="text" ref="title" v-model="data.title" />
          </label>
        </div>
        <div row>
          <label>
            <span label>강의 장소</span>
            <input type="text" ref="address" v-model="data.address" />
          </label>
        </div>
        <div row>
          <label>
            <span label>강의 일시</span>
            <input type="date" ref="startDT" v-model="data.classStartDT" />
            <input type="time" ref="startTM" v-model="data.classStartTM" />
            에서
            <input type="date" ref="endDT" v-model="data.classEndDT" />
            <input type="time" ref="endTM" v-model="data.classEndTM" />
            까지
          </label>
        </div>
        <div v-if="data.type == 1 || data.type == 4" row>
          <label>
            <span label>생방송 링크</span>
            <input
              type="text"
              ref="liveLink"
              placeholder="생방송 URL을 적어주세요."
            />
          </label>
        </div>
        <div row>
          <label>
            <span label>강사 선택</span>
            <select ref="teacher" v-model="data.teacherId">
              <option value="0">선택</option>
              <option
                v-for="(item, idx) in teacherList"
                :key="idx"
                :value="item.managerSeq"
                v-text="
                  item.managerName +
                  ' / ' +
                  item.description.slice(0, 10) +
                  '...'
                "
              />
            </select>
          </label>
        </div>
        <div row>
          <input type="file" id="classFile" ref="classFile" />
          <label for="classFile" upload-class-file>
            <span>파일 선택</span>
            <span>강의 업로드</span>
          </label>
        </div>
        <div row>
          <label style="width: 100%">
            <span label style="display: block; width: 100%; text-align: center"
              >강의 설명</span
            >
          </label>
          <HtmlEditor name="classWriteContents" />
        </div>
        <div btn>
          <button @click="save">등 록</button>
          <button @click="() => $router.go(-1)">취 소</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import axios from "axios";
import HtmlEditor from "@/components/Common/HtmlEditor";
import { useAlert, useSendValidation } from "../../../../admin/src/hook";
export default {
  components: {
    HtmlEditor,
  },
  props: {
    id: String, // 과정 일련번호
    post: String, // 강의 일련번호
  },
  data: () => ({
    mode: "create",
    data: {},
    classTypeList: [
      { id: 1, name: "실시간" },
      { id: 2, name: "동영상" },
      { id: 3, name: "오프라인" },
      { id: 4, name: "실시간 + 오프라인" },
    ],
    teacherList: [],
  }),
  created() {
    let mode = this.$route.query?.mode == "e" ? "edit" : "create";
    this.mode = mode;
    if (mode == "create") {
      this.data = {
        type: 1,
        processId: this.id,
        classImg: "",
        title: "",
        address: "",
        classStartDT: "",
        classStartTM: "",
        classEndDT: "",
        classEndTM: "",
        classFile: {},
        fileList: [],
        description: "",
        teacherId: 0,
      };
      this.getTeacherList();
      return;
    }
    this.getData();

    console.log("과정 : " + this.id);
    console.log("강의 : " + this.post);
  },
  mounted() {
    document.querySelector(
      ".note-editor.note-frame.panel.panel-default"
    ).style.margin = 0;
  },
  methods: {
    save() {
      let title = this.$refs.title;
      let contents = $('[name="classWriteContents"]').summernote("code");

      let pass = useSendValidation([title], () => {
        useAlert.warn(
          "강의 " + (this.mode == "edit" ? "수정" : "신규 등록"),
          "필수 입력 항목을 작성해주세요."
        );
      });
      if (!pass) return;

      pass = contents.length == 11 ? false : true;
      if (!pass) {
        return useAlert.warn(
          "강의 " + (this.mode == "edit" ? "수정" : "신규 등록"),
          "강의 설명을 작성해주세요."
        );
      }

      // Validation Complete
      console.log("Validation Complete!!");
    },
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/classList/" + this.post)
        .then(({ data }) => {
          this.data = data;
          this.getTeacherList();
        });
    },
    getTeacherList() {
      axios
        .get(this.$store.state.dbUrl + "/admin_processManagerList")
        .then(({ data }) => {
          this.teacherList = data;
        });
    },
    back() {
      this.$router.push("/Newdeal/University/" + this.id);
    },
  },
  computed: {
    pageTitle() {
      return this.mode == "edit" ? "강의 수정" : "강의 신규 등록";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

h2 {
  margin-bottom: 20px !important;
}
.top {
  @include flex(space-between);
  margin-bottom: 20px;

  [type-btn] {
    @include flex(flex-start);

    input {
      display: none;
      &:checked + label {
        background-color: $activeColor;
        color: $white;
      }
    }
    label {
      padding: 8px 16px;
      border: 1px solid $whiteGray;
      margin-right: 5px;
      cursor: pointer;
      &:hover {
        background-color: $whiteGray;
      }
    }
  }

  label {
    display: inline-flex;
    white-space: nowrap;
    input {
      margin-left: 10px;
    }
  }
}
.body {
  [row] {
    /* padding: 0 10px; */
    border: 1px solid #ddd;
    border-top: 0;
    &:first-of-type {
      border-top: 1px solid #ddd;
    }

    input[type="text"] {
      width: 400px;
    }
    input[type="file"] {
      display: none;
    }
    [label] {
      padding: 14px 10px;
      display: inline-flex;
      width: 100px;
      background-color: #efefef;
      justify-content: center;
      & + input,
      & + select {
        margin-left: 7px;
      }
    }
    [upload-class-file] {
      @include flex(center);
      flex-flow: column;
      height: 300px;
      cursor: pointer;
      transition: 0.1s;
      &:hover {
        font-weight: 500;
      }

      span {
        &:first-of-type {
          font-size: 30px;
        }
      }
    }
  }

  [btn] {
    @include flex(center);
    margin-top: 20px;
    button {
      color: #fff;
      background-color: $activeColor;
      padding: 8px 18px !important;
      &:hover {
        color: #fff;
        background-color: $hoverColor;
      }
    }
  }
}

@media screen and (max-width: 900px) {
  [dot] {
    display: none;
  }
  .top {
    flex-flow: column;
    align-items: flex-start;
    & > ul {
      width: 100%;
      overflow: auto;
      padding-bottom: 2px;
    }
    & > p {
      margin-top: 20px;

      label {
        flex-wrap: wrap;
        [type="file"] {
          margin: 0;
          display: block;
          width: 100%;
          margin-top: 6px;
        }
      }
    }
  }
  [row] {
    flex-wrap: wrap;
    border: 0 !important;
    padding: 10px 0;

    label {
      width: 100%;
      input,
      select {
        display: block;
        width: 100% !important;
        margin-top: 5px;
        margin-left: 0 !important;
      }
      [label] {
        padding: 0 !important;
        display: inline !important;
        background-color: transparent !important;
      }
    }
    [upload-class-file] {
      border: 1px solid #eee;
    }
  }
}
</style>