<template>
  <main>
    <h2
      banner
      :style="{
        backgroundImage: 'url(' + processBanner + ')',
        backgroundColor: '#a5bdf3',
        height: '275px',
      }"
    >
      <div>
        <span>도시재생대학</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="rightIcon" /> 뉴딜참여
          <i :class="rightIcon" /> 도시재생대학 <i :class="rightIcon" /> 과정
          상세정보
        </p>
      </div>
    </h2>
    <h2 sub>
      <span>{{ data.title || "도시재생대학 과정 상세정보" }}</span>
      <span btns>
        현재 : {{ isStudent ? "수강생" : "강사" }}
        <button @click="() => $store.dispatch('setIsStudent', !isStudent)">
          {{ isStudent ? "강사" : "수강생" }} 모드 (임시)
        </button>
        <button
          v-if="isStudent"
          @click="setProcessRequestView(true)"
          v-text="'과정신청'"
        />
        <button @click="() => $router.go(-1)">뒤로가기</button>
      </span>
    </h2>
    <section>
      <ProcessInfo :data="data" />
      <ProcessProgress
        :isStudent="isStudent"
        :startDT="data.startDT"
        :endDT="data.endDT"
      />
      <div class="option">
        <ul tab-list>
          <ProcessTabLi
            v-for="(item, idx) in tabList"
            :key="idx"
            :item="item"
            :id="id"
          />
        </ul>
        <div input>
          <SearchInput
            :change="tabChange"
            @search="getList"
            @setValue="setSearchValue"
          />
        </div>
        <div btns>
          <button
            v-if="addClassBtnView"
            @click="addClass"
            v-text="'강의 등록'"
          />
          <button
            v-if="addTaskBtnView"
            @click="setTaskWriteView(true)"
            v-text="'과제 등록'"
          />
        </div>
      </div>

      <ul class-list v-if="getTab == 1">
        <ClassLi
          v-for="(item, idx) in list.class"
          :key="idx"
          :item="item"
          :idx="idx"
          :id="id"
          @setTeacherView="setTeacherView"
        />
      </ul>

      <ul task-list v-if="getTab == 2">
        <TaskLi
          v-for="(item, idx) in list.task"
          :key="idx"
          :item="item"
          :idx="idx"
          :id="id"
          @setTaskWriteView="setTaskWriteView"
        />
      </ul>

      <table student-list v-if="getTab == 3 && !isStudent">
        <thead>
          <tr>
            <th
              v-for="(item, idx) in studentTheadList"
              v-text="item"
              :key="idx"
            />
          </tr>
        </thead>
        <tbody>
          <StudentLi
            v-for="(item, idx) in list.student"
            :key="idx"
            :item="item"
            :idx="idx"
            :id="id"
          />
        </tbody>
      </table>
    </section>

    <!-- Modal -->
    <transition name="fade-transition" mode="out-in">
      <TeacherModal
        v-if="isTeacherView"
        :teacherId="teacherId"
        @setTeacherView="setTeacherView"
      />
    </transition>
    <transition name="fade-transition" mode="out-in">
      <ProcessRequestModal
        v-if="isProcessRequestView && isStudent"
        :id="id"
        @setProcessRequestView="setProcessRequestView"
      />
    </transition>
    <transition name="fade-transition" mode="out-in">
      <TaskWriteModal
        v-if="isTaskWriteView && !isStudent"
        :id="id"
        :taskId="taskId"
        @setTaskWriteView="setTaskWriteView"
      />
    </transition>
  </main>
</template>

<script>
import processBanner from "@images/2/2/processBanner.png";
import axios from "axios";
import { useAlert } from "@hook";
import ProcessInfo from "@components/University/ProcessInfo";
import ProcessProgress from "@components/University/ProcessProgress";
import SearchInput from "@admin/src/htmlTemplate/SearchInput";
import ProcessTabLi from "@components/University/ProcessTabLi";
import ClassLi from "@components/University/ClassLi";
import TeacherModal from "@/components/University/TeacherModal";
import ProcessRequestModal from "@/components/University/ProcessRequestModal";
import TaskLi from "@/components/University/TaskLi";
import StudentLi from "@/components/University/StudentLi";
import TaskWriteModal from "@/components/University/TaskWriteModal";

export default {
  components: {
    ProcessInfo,
    ProcessProgress,
    SearchInput,
    ProcessTabLi,
    ClassLi,
    TeacherModal,
    ProcessRequestModal,
    TaskLi,
    StudentLi,
    TaskWriteModal,
  },
  props: {
    id: String,
  },
  data: () => ({
    processBanner,
    tabList: [],
    studentTheadList: ["No", "이름", "연락처", "이수율", "수료처리"],
    searchValue: "",
    data: {},
    list: {
      class: [],
      task: [],
      student: [],
    },
    isProcessRequestView: false,
    isTeacherView: false,
    teacherId: 0,
    isClassView: false,
    classId: 0,
    isTaskWriteView: false,
    taskId: 0,

    tabChange: false,
  }),
  watch: {
    getTab(val) {
      this.searchValue = "";
      this.tabChange = !this.tabChange;
      this.getData();
      this.tabChk();
    },
    isStudent() {
      this.isStudentChk();
    },
  },
  created() {
    this.isStudentChk();
    this.getData();
    this.tabChk();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/processList/" + this.id)
        .then(({ data }) => {
          this.data = data;
        });
    },
    tabChk() {
      let yn = this.tabList.filter((x) => x.id == this.getTab).length;
      if (!this.getTab || yn == 0) {
        this.$router.push("/Newdeal/University/" + this.id + "?tab=1");
      }
      this.getList();
    },
    getList() {
      if (this.getTab == 1) return this.getClassList();
      if (this.getTab == 2) return this.getTaskList();
      if (this.getTab == 3) return this.getStudentList();
    },
    getClassList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/classList?q=" +
            this.searchValue +
            "&processId=" +
            this.id
        )
        .then(({ data }) => {
          this.list.class = data;
        });
    },
    getTaskList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/taskList?q=" +
            this.searchValue +
            "&processId=" +
            this.id
        )
        .then(({ data }) => {
          this.list.task = data;
        });
    },
    getStudentList() {
      axios
        .get(
          this.$store.state.dbUrl +
            "/studentList?q=" +
            this.searchValue +
            "&processId=" +
            this.id
        )
        .then(({ data }) => {
          this.list.student = data;
        });
    },
    processRequest() {
      useAlert.success("과정신청", "신청되었습니다.");
    },
    addClass() {
      this.$router.push("/Newdeal/University/" + this.id + "/Class/Write");
    },
    addTask() {
      this.setTaskWriteView(true);
    },
    setSearchValue(val) {
      this.searchValue = val;
    },
    setTeacherView(val, teacherId = 0) {
      this.isTeacherView = val;
      this.teacherId = teacherId;
    },
    setProcessRequestView(val) {
      if (!this.dateChk)
        return useAlert.info("과정신청", "모집기간이 만료된 과정입니다.");
      this.isProcessRequestView = val;
    },
    setTaskWriteView(val, taskId = 0) {
      this.isTaskWriteView = val;
      this.taskId = taskId;
    },
    isStudentChk() {
      if (!this.isStudent) {
        this.tabList = [
          { id: 1, name: "강의" },
          { id: 2, name: "과제" },
          { id: 3, name: "수강생" },
        ];
      } else {
        this.tabList = [
          { id: 1, name: "강의" },
          { id: 2, name: "과제" },
        ];
      }
    },
  },
  computed: {
    addClassBtnView() {
      return this.getTab == 1 && !this.isStudent;
    },
    addTaskBtnView() {
      return this.getTab == 2 && !this.isStudent;
    },
    getTab() {
      return this.$route.query.tab;
    },
    rightIcon() {
      return this.$store.state.FontAwesome.stroke.angle.right;
    },
    isStudent() {
      return this.$store.state.loginInfo.isStudent;
    },
    dateChk() {
      let now = new Date();
      let end = new Date(this.data.recEndDT);
      let calc = end - now >= 0;
      return calc;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";
main {
  .option {
    @include flex(space-between);
    flex-flow: column;
    margin-bottom: 10px;

    ul[tab-list] {
      width: 100%;
      @include flex(space-between);
      font-size: 13px;
      color: $gray;
      margin-bottom: 10px;
      border: 1px solid $whiteGray;
    }

    & > [input] {
      @include search-input-wrap();
    }

    & > [btns] {
      @include flex(flex-end);
      width: 100%;
      button {
        margin-left: 10px;
        background-color: $activeColor;
        color: $white;
        padding: 10px 22px !important;
      }
    }
  }

  [student-list] {
    th {
      &:nth-of-type(1) {
        width: 70px;
      }
      &:nth-of-type(2) {
      }
      &:nth-of-type(3) {
        width: 200px;
      }
      &:nth-of-type(4) {
        width: 100px;
      }
      &:nth-of-type(5) {
        width: 120px;
      }
    }
    @media screen and (max-width: 900px) {
      th {
        &:nth-of-type(1) {
          width: 50px;
        }
        &:nth-of-type(3) {
          width: 120px;
        }
        &:nth-of-type(4) {
          width: 66px;
        }
        &:nth-of-type(5) {
          width: 102px;
        }
      }
    }
    @media screen and (max-width: 499px) {
      th {
        &:nth-of-type(1) {
          width: 44px;
        }
        &:nth-of-type(3) {
          display: none;
        }
      }
    }
  }
}
</style>