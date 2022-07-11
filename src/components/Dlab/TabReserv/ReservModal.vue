<template>
  <section modal>
    <div wrap>
      <h2>
        예약 정보 입력
        <button @click="$emit('setReservModal', false)">
          <i :class="$store.state.FontAwesome.stroke.x" />
        </button>
      </h2>
      <div contents>
        <div class="top">※ 원하는 시간을 선택해주세요. (중복선택 가능)</div>
        <div class="bottom">
          <div class="left">
            <template v-for="(tm, i) in timeList">
              <input
                type="checkbox"
                :key="'input' + i"
                :seq="tm.seq"
                :id="'TM_' + i"
                :ref="'TM_' + i"
                :disabled="tm.state ? false : true"
                hidden
                @click="timeClick"
              />
              <label
                :key="'label' + i"
                :for="'TM_' + i"
                v-text="
                  tm.startTM +
                  ' ~ ' +
                  tm.endTM +
                  (!tm.state ? ' (선택불가)' : '')
                "
              />
            </template>
          </div>
          <div class="right">
            <div class="TITLE">
              <h4 style="margin-bottom: 0; width: 60px; font-size: 20px">
                제목 :
              </h4>
              <input
                v-model="sendData.mediaTitle"
                ref="mediaTitle"
                :readonly="readOnly"
              />
            </div>
            <div class="DTTM ROW">
              <h4>선택 날짜 : {{ sendData.promotionDT }}</h4>
              <div>
                <h4>선택 시간</h4>
                <ul>
                  <li
                    v-for="(time, i) in selectTimeOrder"
                    :key="i"
                    v-text="selectTimeView(time)"
                  />
                  <li v-if="selectTimeOrder.length == 0" class="none">
                    선택된 시간이 없습니다.
                  </li>
                </ul>
              </div>
            </div>
            <div class="OPTIONS ROW" style="padding: 20px 10px">
              <div>
                <h4>재생 방법 :</h4>
                <label>
                  <input
                    type="radio"
                    name="type"
                    id="repeat"
                    value="repeat"
                    v-model="sendData.playType"
                    @click="readOnlyCheck"
                  />
                  반복 재생
                </label>
                <label>
                  <input
                    type="radio"
                    name="type"
                    id="forward"
                    value="forward"
                    v-model="sendData.playType"
                    @click="readOnlyCheck"
                  />
                  한번만 재생
                </label>
                <p>
                  반복 재생 : 선택한 시간동안 계속 반복으로 영상을
                  재생합니다.<br />
                  한번 재생 : 선택한 시간동안 영상을 한 번만 재생합니다.
                </p>
              </div>
              <div>
                <h4>재생 속성 :</h4>
                <label>
                  <input
                    type="radio"
                    name="attr"
                    id="single"
                    value="single"
                    v-model="sendData.playAttr"
                    @click="readOnlyCheck"
                  />
                  단독 재생
                </label>
                <label>
                  <input
                    type="radio"
                    name="attr"
                    id="multi"
                    value="multi"
                    v-model="sendData.playAttr"
                    @click="readOnlyCheck"
                  />
                  동시 재생
                </label>
                <p>
                  단독 재생 : 선택한 시간동안 영상 하나만 재생합니다.<br />
                  동시 재생 : 선택한 시간동안 다른 영상들과 함께 재생합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div bg />
  </section>
</template>

<script>
import { useSendValidation } from "@hook";

export default {
  components: {},
  props: {
    selectDate: String,
  },
  data() {
    return {
      sendData: {},
      sendFileList: [],
      fileListInfoText: "미디어 파일만 등록 가능합니다.",
      timeList: [],
      readOnly: false,
    };
  },
  created() {
    this.timeList = [
      { seq: 1, startTM: "06:00", endTM: "07:00", state: 1 },
      { seq: 2, startTM: "07:00", endTM: "08:00", state: 1 },
      { seq: 3, startTM: "08:00", endTM: "09:00", state: 1 },
      { seq: 4, startTM: "09:00", endTM: "08:00", state: 1 },
      { seq: 5, startTM: "10:00", endTM: "11:00", state: 1 },
      { seq: 6, startTM: "11:00", endTM: "12:00", state: 1 },
      { seq: 7, startTM: "12:00", endTM: "13:00", state: 1 },
      { seq: 8, startTM: "13:00", endTM: "14:00", state: 1 },
      { seq: 9, startTM: "14:00", endTM: "15:00", state: 1 },
      { seq: 10, startTM: "15:00", endTM: "16:00", state: 1 },
      { seq: 11, startTM: "16:00", endTM: "17:00", state: 0 },
      { seq: 12, startTM: "17:00", endTM: "18:00", state: 0 },
      { seq: 13, startTM: "18:00", endTM: "19:00", state: 0 },
      { seq: 14, startTM: "19:00", endTM: "20:00", state: 0 },
      { seq: 15, startTM: "20:00", endTM: "21:00", state: 1 },
      { seq: 16, startTM: "21:00", endTM: "22:00", state: 1 },
      { seq: 17, startTM: "22:00", endTM: "23:00", state: 1 },
      { seq: 18, startTM: "23:00", endTM: "00:00", state: 1 },
      { seq: 19, startTM: "00:00", endTM: "01:00", state: 1 },
      { seq: 20, startTM: "01:00", endTM: "02:00", state: 1 },
      { seq: 21, startTM: "01:00", endTM: "02:00", state: 1 },
      { seq: 22, startTM: "02:00", endTM: "03:00", state: 1 },
      { seq: 23, startTM: "03:00", endTM: "04:00", state: 1 },
      { seq: 24, startTM: "04:00", endTM: "05:00", state: 1 },
      { seq: 25, startTM: "05:00", endTM: "06:00", state: 1 },
    ];

    //////////////////////////////////////////////////////////

    if (this.modalType == "C") {
      this.sendData = {
        scheduleSeq: 0,
        mediaTitle: "",
        promotionDT: this.selectDate,
        selectTime: [],
        state: 0,
        playType: "repeat",
        playAttr: "multi",
        description: "",
      };
      this.sendFileList = [];
      return;
    }
  },
  methods: {
    save() {},
    timeClick(e) {
      if (this.readOnly) {
        e.preventDefault();
        return false;
      }

      let seq = Number(e.target.getAttribute("seq"));
      let obj = this.timeList.find((x) => x.seq == seq);
      let checked = e.target.checked;

      if (checked) {
        this.sendData.selectTime = this.sendData.selectTime.concat([obj]);
      } else {
        this.sendData.selectTime = this.sendData.selectTime.filter(
          (x) => x != seq
        );
      }
    },
    readOnlyCheck(e) {
      if (this.readOnly) {
        e.preventDefault();
        return false;
      }
    },

    selectTimeView(timeObj) {
      let obj = this.timeList.find((x) => x.seq == timeObj.seq);
      return obj.startTM + "~" + obj.endTM;
    },
  },
  computed: {
    selectTimeOrder() {
      return this.sendData.selectTime ?? [].sort((x, y) => x.seq - y.seq);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

.top {
  height: 20px;
  position: relative;
  display: flex;
  align-items: flex-end;
  color: #777;
  font-weight: 500;
}

[contents] {
  & > .bottom {
    height: calc(100% - 20px);
    padding-top: 10px;

    & > div {
      height: 600px;
      float: left;
      margin-bottom: 5px;
    }

    .left {
      width: 40%;

      input:checked + label {
        background-color: #398201;
        /* border: 1px solid #165b00; */
        box-shadow: 1px 1px 0px 1px #00000030;
        color: #fff;
      }

      input:disabled + label {
        background-color: #ddd;
        cursor: default;
      }

      label {
        float: left;
        width: calc(50% - 5px);
        height: calc((100% / 13) - 5px);
        border: 1px solid #aaa;
        margin-right: 5px;
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 13px;
        letter-spacing: 1px;
        color: #555;
        cursor: pointer;
        background-color: #fff;
        border-radius: 5px;

        &:nth-of-type(even) {
          margin-right: 0;
        }
      }
    }

    .right {
      width: 60%;

      & > div {
        border: 1px solid #aaa;
        padding: 10px;
        border-radius: 5px;
        margin-bottom: 5px;
        position: relative;

        h4 {
          margin-bottom: 10px;
          font-weight: 500;
          font-size: 15px;
          display: inline-flex;
          align-items: center;
        }
      }

      .ROW {
        float: left;
        height: 280px;
        &.DTTM {
          width: 200px;
          margin-right: 5px;
        }
        &.OPTIONS {
          width: calc(100% - 205px);
        }
      }

      .TITLE {
        font-size: 20px;
        input {
          width: calc(100% - 70px);
          height: 40px;
          border: 1px solid #ddd;
          padding: 0 6px;
        }
      }
      .DTTM {
        font-size: 15px;
        overflow: auto;
        h4 {
          width: 100%;
          height: 30px;
          margin-bottom: 5px;
        }
        div {
          height: calc(100% - 30px);
        }
        h4 {
          height: 20px;
        }
        ul {
          height: calc(100% - 20px);
          margin-bottom: 0;
          overflow: auto;

          li {
            list-style: inside;
            text-indent: 4px;
            line-height: 26px;

            &.none {
              text-align: center;
              list-style: none;
              font-size: 13px;
              color: #666;
            }
          }
        }
      }
      .OPTIONS {
        & > div {
          margin-bottom: 30px;
          &:last-of-type {
            margin-bottom: 0;
          }

          input {
            transform: translateY(-1px);
            margin-left: 20px;
            margin-right: 6px;
          }
          label {
            font-size: 14px;
            display: inline-flex;
            align-items: center;
            justify-content: flex-start;
            transform: translateY(2px);
          }
          p {
            background-color: #eee;
            color: #555;
            padding: 10px;
            font-size: 13px;
            line-height: 20px;
          }
        }
      }
      .MEDIA {
        clear: both;
        p {
          position: absolute;
          top: 14px;
          right: 14px;
          color: #666;
          letter-spacing: 1px;
        }
      }
    }
  }
}
</style>