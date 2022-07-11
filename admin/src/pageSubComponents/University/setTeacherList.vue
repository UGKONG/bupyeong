<template>
  <li>
    <div class="wrap" :class="{'set': setMode}">
      <div class="top">
        <div v-if="!setMode" class="img" :style="{backgroundImage: 'url(' + manager.managerImg + ')'}">
          <span v-if="manager.managerImg == ''" v-text="'이미지 없음'" />
        </div>
        <div v-if="setMode" class="img set" :style="{backgroundImage: 'url(' + manager.managerImg + ')'}" ref="tempImageView">
          <label>
            <i class="fas fa-upload" />
            <span>upload</span>
            <input type="file" style="display:none" @change="setImageChange" />
          </label>
        </div>

        <div class="name">
          <p v-if="!setMode">성명 : <b v-text="manager.managerName" /></p>
          <p v-if="setMode">성명 : <input :value="manager.managerName" ref="setName" /></p>
          <p>
            <button :class="['edit', {'set': setMode}]" 
              v-show="!listSetMode || setMode"
              :data-seq="manager.managerSeq"
              @click="edit" 
              v-text="setModeBtnName" 
            />
            <button class="editCancel"
              v-if="setMode"
              :data-seq="manager.managerSeq" 
              @click="editCancel"
            >취소</button>
            <button class="del"
              v-if="!setMode"
              v-show="!listSetMode"
              :data-seq="manager.managerSeq" 
              @click="del"
            >삭제</button>
            <span>{{ stateView }}</span>
          </p>
        </div>
      </div>
      <div v-if="!setMode" class="bottom" v-text="manager.description" />
      <div v-if="setMode" class="bottom">
        <textarea :value="manager.description" ref="setDescription" />
      </div>
    </div>
  </li>
</template>

<script>
import { Store } from '../../store';
import { useImgFileView } from '../../hook';

export default {
  props: {
    manager: Object,
    listSetMode: Boolean,
  },
  data() {
    return {
      setMode: false,
      tempData: {managerSeq: '0', managerImg: '', managerName: '', description: ''},
      tempFile: null,
    }
  },
  methods: {
    edit(e) {
      if (this.listSetMode && !this.setMode) {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '강사관리', text: '수정중인 작업을 먼저 완료해주세요.'});
        return;
      }
      if (!this.setMode) { // 수정모드 활성화
        this.setMode = true; 
        this.$emit('setListSetMode', true);
        return;
      }

      let seq = e.target.getAttribute('data-seq');
      let name = this.$refs.setName.value;
      let desc = this.$refs.setDescription.value;
      if (name == '' || desc == '') {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '강사정보 수정', text: '빈칸을 입력해주세요.'});
        (name == '' ? this.$refs.setName : this.$refs.setDescription).focus();
        return;
      }

      // 저장하기
      this.tempData = { managerSeq: seq, managerImg: '', managerName: name, description: desc };
      console.log('DATA : ', this.tempData);
      console.log('FILE : ', this.tempFile);
      this.setMode = false;
      this.$emit('setListSetMode', false);

    },
    editCancel(e) {
      this.setMode = false;
      this.$emit('setListSetMode', false);
    },
    del(e) {
      if (this.listSetMode) {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '강사관리', text: '수정중인 작업을 먼저 완료해주세요.'});
        return;
      }

      let seq = e.target.getAttribute('data-seq');
      console.log(seq);
    },
    setImageChange(e) {
      let input = e.target;
      let output = this.$refs.tempImageView;
      let len = input.files.length;
      if (len) {
        this.tempFile = input.files[0];
      } else {
        this.tempFile = null;
      }
      useImgFileView(input, output);
    }
  },
  computed: {
    setModeBtnName () {
      return this.setMode ? '저장' : '수정';
    },
    stateView() {
      return this.setMode ? '수정중' : '';
    },
  },
}
</script>

<style lang="scss" scoped>
li {
  width: 20%;
  min-width: 333px;
  max-width: 450px;
  height: 200px;
  padding: 5px;
  float: left;

  & > .wrap {
    width: 100%;
    height: 100%;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 1px 2px #00000030;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow: column;
    &:hover {background-color: #fff9f2;}
    &.set {background-color: #f0faff;}

    .top {
      width: 100%;
      height: 65%;
      padding: 10px;

      .img {
        width: 85px;
        height: 100%;
        float: left;
        border: 1px solid #ccc;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        color: #888;
        background-color: #fff;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        position: relative;

        & > span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          white-space: nowrap;
        }

        label {
          font-size: 20px;
          cursor: pointer;
          padding: 10px;
          text-align: center;
          color: #00000000;
          background-color: #00000000;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-flow: column;
          transition: .2s;
          position: relative;
          z-index: 2;

          &:hover {
            background-color: #00000050;
            color: #fff;
          }

          span {
            font-size: 14px;
          }
          
        }
      }
      .name {
        width: calc(100% - 85px);
        padding-left: 10px;
        height: 100%;
        float: left;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-flow: column;

        p:first-of-type {
          width: 100%;
          height: 40%;
          padding: 10px 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        p:last-of-type {
          width: 100%;
          height: 60%;
          padding: 10px 5px 1px;
          display: flex;
          align-items: flex-end;
          position: relative;

          @keyframes flash {
            0%   {opacity: 1;}
            50%  {opacity: 0;}
            100% {opacity: 1;}
          }

          span {
            position: absolute;
            bottom: 0;
            right: 2px;
            color: #f00;
            animation: flash infinite 1.5s;
          }
        }

        b {
          font-weight: 500;
          letter-spacing: 1px;
        }

        button {
          padding: 3px 10px;
          margin-right: 6px;
          font-size: 13px;
          letter-spacing: 1px;

          &.edit {
            background-color: #93b8fd;
            color: #fff;

            &.set {
              background-color: #00ac00;
              &:hover {
                background-color: green;
              }
            }

            &:hover {
              background-color: #679bfc;
              
            }
          }
          &.del {
            background-color: #fe9898;
            color: #fff;

            &:hover {
              background-color: #fd6666;
              
            }
          }
        }

        input {
          width: 140px;
          height: 28px;
          padding: 0 5px;
          color: #666;
          border: 1px solid #ccc;

          &:focus {
            color: #000;
          }
        }
      }
    }

    .bottom {
      width: 100%;
      height: 35%;
      padding: 10px;
      border-top: 1px solid #ccc;
      overflow: auto;

      textarea {
        width: 100%;
        height: calc(100% - 4px);
        border: 1px solid #ccc;
        resize: none;
        padding: 4px;
        font-size: 13px;
      }
    }
  }
}
</style>