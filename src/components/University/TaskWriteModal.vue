<template>
  <section modal>
    <div wrap>
      <h2>
        {{ modalTitle }}
        <button @click="$emit('setTaskWriteView', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <div row>
          <span label>과제 제목</span>
          <input type="text" ref="title" v-model="data.title" />
        </div>
        <div row>
          <span label>마감 일시</span>
          <input type="date" ref="date" v-model="endDT" />
          <input type="time" ref="time" v-model="endTM" />
        </div>
        <div row>
          <span label>강의 연결</span>
          <select ref="classId" v-model="data.classId">
            <option
              v-for="(item, idx) in classList"
              :key="idx"
              :value="item.id"
              v-text="item.processName + ' - ' + item.title"
            />
          </select>
        </div>
        <div row>
          <span label>첨부 파일</span>
          <input type="file" ref="file" @change="fileChange" />
        </div>
        <div row description style="padding: 0">
          <span label>과제 설명</span>
          <textarea ref="contents" v-model="data.contents" />
        </div>
        <div btn>
          <button @click="save">등 록</button>
        </div>
      </div>
    </div>
    <div bg />
  </section>
</template>

<script>
import axios from "axios";
import { useAlert, useSendValidation } from "../../../admin/src/hook";
export default {
  props: {
    id: String,
    taskId: Number,
  },
  data: () => ({
    endDT: "",
    endTM: "",
    data: {},
    classList: [],
  }),
  created() {
    this.getClassList();
    if (this.taskId == 0) {
      // 신규 등록
      this.data = {
        processId: Number(this.id),
        classId: 0,
        title: "",
        contents: "",
        endDTTM: "",
        file: {},
      };
      return;
    }

    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/taskList/" + this.taskId)
        .then(({ data }) => {
          this.data = data;
          this.endDT = data.endDTTM.split(" ")[0];
          this.endTM = data.endDTTM.split(" ")[1];
        });
    },
    getClassList() {
      axios.get(this.$store.state.dbUrl + "/classList").then(({ data }) => {
        this.classList = data;
        this.data.classId = data[0].id;
      });
    },
    save() {
      let pass = useSendValidation(
        [
          this.$refs.title,
          this.$refs.date,
          this.$refs.time,
          this.$refs.classId,
          this.$refs.file,
          this.$refs.contents,
        ],
        () => {
          useAlert.warn(this.modalTitle, "과제 정보를 모두 입력해주세요.");
        }
      );
      if (!pass) return;
      this.data.endDTTM = this.endDT + " " + this.endTM;
      console.log(this.data);
      useAlert.success(
        this.modalTitle,
        "과제가 " + this.modalState + "되었습니다."
      );
      this.$emit("setTaskWriteView", false);
    },
    fileChange(e) {
      let file = e.target.files[0];
      if (!file) return;
      this.data.file = file;
    },
  },
  computed: {
    modalTitle() {
      return "과제 " + (this.taskId == 0 ? "신규 등록" : "수정");
    },
    modalState() {
      return this.taskId == 0 ? "등록" : "수정";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
main > section[modal] > [wrap] {
  height: 420px;
  transition: 0.2s;
}
[row] {
  @include flex(flex-start);
  border: 1px solid #ddd;
  border-top: 0;
  padding-right: 6px;

  &:first-of-type {
    border-top: 1px solid #ddd;
  }
  [label] {
    display: inline-flex;
    padding: 10px;
    background-color: #eee;
    width: 100px;
    justify-content: center;
    margin-right: 6px;
  }
  &[description] {
    flex-wrap: wrap;
  }
  input {
    flex: 1;
  }
  [type="date"] {
    margin-right: 10px;
    flex: 1;
  }
  select {
    /* width: 400px; */
    flex: 1;
  }
  textarea {
    border: 0;
    border-top: 1px solid #eee;
  }
}
[btn] {
  @include flex(center);
  padding: 20px 0 10px;
  button {
    background-color: $activeColor;
    color: #fff;
    padding: 6px 18px !important;
  }
}

@media screen and (max-width: 900px) {
  [wrap] {
    width: 400px !important;
    left: calc(50% - 210px) !important;

    [row] {
      flex-wrap: wrap;
      select {
        width: 200px;
      }
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

    [row] {
      flex-wrap: wrap;
      padding: 0;
      [label] {
        margin-right: 0;
        margin-bottom: 0;
      }
      input[type="text"] {
        width: 100%;
      }
      input[type="date"] {
        width: calc(100% - 130px - 10px);
      }
      input[type="time"] {
        width: 130px;
      }
      input[type="file"] {
        width: 100%;
        flex: unset;
      }
      textarea {
        height: 150px;
      }
      span {
        width: 100%;
        margin-bottom: 5px;
      }
      span[dot] {
        display: none !important;
      }
      input,
      select {
        margin: 4px;
      }
    }
  }
}
</style>
