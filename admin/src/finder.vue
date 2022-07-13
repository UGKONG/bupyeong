<template>
  <section id="finder" ref="finder" :data-seq="finderSeq">
    <!-- Finder Header -->
    <header>
      <article>
        <h1>
          <div
            class="icon"
            :style="{ backgroundImage: 'url(' + folderIcon + ')' }"
          />
          <button
            v-if="folderInYN"
            class="finderBackBtn"
            @click="finderBackBtnClick"
          >
            <i class="fas fa-chevron-left" /> 뒤로가기
          </button>
          <span>
            {{ titleName }}
            <!-- 탐색기 제목 -->
            <span v-if="folderInYN">
              <i class="fas fa-angle-right" />
              {{ modalSubTitle }}
            </span>
          </span>
        </h1>
      </article>
      <button data-type="x" :class="titleName" @click="finderClose">
        <span v-for="x in 2" :key="x" />
      </button>
    </header>

    <!-- Finder Contents -->
    <article class="contents">
      <!-- Finder Side Menu -->
      <aside>
        <h2>폴더</h2>
        <ul>
          <li
            v-for="item in bgIcon"
            :key="item.menuSeq"
            :class="item.ICON_NM"
            @click="sideMenuClick"
          >
            <button :class="{ active: activeMenu == item.ICON_NM }">
              <div
                class="icon"
                :style="{ backgroundImage: 'url(' + folderIcon + ')' }"
              />
              <span>{{ item.ICON_NM }}</span>
            </button>
          </li>
        </ul>
      </aside>

      <!-- Finder Icon List -->
      <div class="folderList">
        <!-- Finder 1th Icon -->
        <article
          v-for="item in filterIconList"
          v-show="!folderInYN"
          hint="1단 아이콘"
          :key="'menu' + item.ICON_SN"
          :data-type="item.ICON_TYPE"
          :data-title="item.ICON_NM"
          :data-seq="item.ICON_SN"
          :data-parentSeq="item.PRNT_SN"
          :data-component-name="item.CMPNT"
          @dblclick="finderIconDbClick"
        >
          <div
            :style="{
              backgroundImage:
                'url(' + (item.ICON_TYPE == '0' ? folderIcon : modalIcon) + ')',
            }"
          />
          <p>{{ item.ICON_NM }}</p>
        </article>
        <!-- Finder 2th Icon -->
        <article
          v-for="item in filterSubIconList_menu"
          v-show="folderInYN"
          hint="2단 아이콘"
          :key="'subMenu' + item.ICON_SN"
          :data-seq="item.ICON_SN"
          :data-type="item.ICON_TYPE"
          :data-parent-po="item.parentPo"
          :data-parentSeq="item.PRNT_SN"
          :data-title="item.ICON_NM"
          :data-component-name="item.CMPNT"
          @dblclick="finderSetIconDbClick"
        >
          <div
            :style="{
              backgroundImage:
                'url(' + (item.ICON_TYPE == '0' ? folderIcon : modalIcon) + ')',
            }"
          />
          <p>{{ item.ICON_NM }}</p>
        </article>
      </div>
    </article>
  </section>
</template>

<script>
import { Store } from "./store.js";
import folderIcon from "./img/icon/folder.png";
import modalIcon from "./img/icon/document.png";
export default {
  props: {
    titleName: String,
    darkdivYN: Boolean,
    modalYN: Boolean,
    modalSeq: String,
    setModalSeq: Function,
    modalTitle: String,
    modalSubTitle: String,
    modalOpen: Function,
    modalClose: Function,
    setSubTitle: Function,
    componentName: String,
    setComponentName: Function,
  },
  data() {
    return {
      bgIcon: Store.iconList_bg.filter((x) => x.ICON_TYPE == "0"),
      folderIcon: folderIcon,
      modalIcon: modalIcon,
      finderStartPosition: [200, 100],
      mouseDownYN: false,
      mouseStartPosition: [0, 0],
      mouseNowPosition: [0, 0],
      mousePositionCalc: [0, 0],
      finderSeq: Store.finderSeq,
      finderInSeq: 0,
    };
  },
  methods: {
    finderClose(e) {
      let className = e.currentTarget.className;
      Store.finderCount = Store.finderCount.filter((x) => x !== className);
      Store.finderIn = false;
    },
    sideMenuClick(e) {
      let className = e.currentTarget.className;
      Store.finderCount = [];
      Store.finderCount[0] = className;
      Store.finderSeq = this.bgIcon.find((x) => x.ICON_NM == className).ICON_SN;
      Store.finderIn = false;
    },
    finderIconDbClick(e) {
      let seq = e.currentTarget.getAttribute("data-seq");
      let type = e.currentTarget.getAttribute("data-type");
      let titleName = e.currentTarget.getAttribute("data-title");
      let componentName = e.currentTarget.getAttribute("data-component-name");
      if (type == "1") {
        this.modalOpen(titleName);
        this.setModalSeq(seq);
        this.setComponentName(componentName);
      } else {
        this.setSubTitle(titleName);
        Store.finderIn = true;
        this.finderInSeq = seq;
      }
    },
    finderBackBtnClick(e) {
      Store.finderIn = false;
    },
    finderSetIconDbClick(e) {
      let seq = e.currentTarget.getAttribute("data-seq");
      let titleName = e.currentTarget.getAttribute("data-title");
      let componentName = e.currentTarget.getAttribute("data-component-name");
      this.setModalSeq(seq);
      this.modalOpen(titleName);
      this.setComponentName(componentName);
    },
  },
  computed: {
    activeMenu() {
      return Store.finderCount[0];
    },
    filterIconList() {
      return this.iconList_folder.filter((x) => x.PRNT_SN == this.finderSeq);
    },
    filterSubIconList_menu() {
      return this.iconList_inFolder.filter(
        (x) => x.PRNT_SN == this.finderInSeq
      );
    },
    folderInYN: () => Store.finderIn,
    iconList_bg: () => Store.iconList_bg,
    iconList_folder: () => Store.iconList_folder,
    iconList_inFolder: () => Store.iconList_inFolder,
  },
};
</script>

<style lang="scss" scoped>
section#finder {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;
  min-width: 800px;
  max-width: 1300px;
  height: 60%;
  min-height: 500px;
  max-height: 800px;
  background-color: #fff;
  position: absolute;
  border: 1px solid #aaa;
  border-radius: 10px;
  z-index: 5;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px;
    height: 60px;
    background-color: #fdf4f5;
    button[data-type="x"] {
      float: right;
      display: block;
      background-color: #ff6a6a;
      width: 26px;
      height: 26px;
      color: #fff;
      position: relative;
      border-radius: 50%;
      cursor: pointer;
      border: none;
      span {
        position: absolute;
        width: 50%;
        height: 2px;
        background-color: #fff;
        border-radius: 10px;
        top: 50%;
        left: 50%;
      }
      span:first-of-type {
        transform: translate(-50%, -50%) rotate(45deg);
      }
      span:last-of-type {
        transform: translate(-50%, -50%) rotate(-45deg);
      }
    }
    h1 {
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      .icon {
        width: 30px;
        height: 30px;
        display: inline-block;
        margin-right: 10px;
        background-position: center;
        background-size: 94%;
        background-repeat: no-repeat;
      }
      .finderBackBtn {
        border: none;
        background-color: transparent;
        margin-right: 14px;
        color: #aaa;
        cursor: pointer;
        &:hover {
          color: #777;
        }
      }
      .finderBackBtn + span {
        i {
          font-size: 12px;
          transform: translateY(-2px);
          color: #666;
        }
      }
    }
  }
  .contents {
    height: calc(100% - 60px);
    display: flex;
    align-items: center;
    justify-content: center;
    & > aside {
      width: 140px;
      height: 100%;
      background-color: #eae1e2;
      padding: 10px 0;
      h2 {
        font-size: 15px;
        font-weight: 500;
        color: #bbb;
        padding: 10px;
      }
      li {
        padding: 4px 0;
        button {
          width: 100%;
          padding: 4px 10px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          background-color: transparent;
          cursor: pointer;
          &:hover,
          &.active {
            font-weight: 700;
          }
          div {
            width: 20px;
            height: 20px;
            margin-right: 5px;
            background-position: center;
            background-size: 94%;
            background-repeat: no-repeat;
            & + span {
              font-size: 12px;
            }
          }
        }
      }
    }
    & > div.folderList {
      width: calc(100% - 140px);
      height: 100%;
      padding: 10px;
      article {
        width: 100px;
        height: 120px;
        margin: 4px 4px 10px;
        float: left;
        background-color: transparent;
        cursor: default;
        user-select: none;
        background-repeat: no-repeat;
        background-size: 90%;
        background-position: center;
        &:hover {
          background-color: #ffffff20;
        }
        div {
          width: 100%;
          height: calc(100% - 50px);
          display: flex;
          align-items: center;
          justify-content: center;
          background-repeat: no-repeat;
          background-size: contain;
          background-position: center;
        }
        p {
          width: 100%;
          height: 50px;
          line-height: 14px;
          font-size: 12px;
          padding: 0 5px;
          color: #000;
          text-align: center;
          word-break: keep-all;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      article:hover {
        background-color: #00000010;
        p {
          overflow: unset;
        }
      }
    }
  }
}
</style>