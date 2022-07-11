<template>
  <section>
    <aside @mouseleave="adminLeave">
      <h3 @mouseover="inputFocus">
        관리자 리스트
        <button :data-type="sortType" @click="sortTypeClick">
          <span :class="{'active' : sortType != 0}">
            {{ sortType == 1 ? '오름차순' : sortType == 2 ? '내림차순' : '정렬안함' }}
          </span>
          <i v-if="sortType == 0" class="fas fa-sort-alpha-down" />
          <i v-if="sortType == 1" class="fas fa-sort-alpha-down active" />
          <i v-if="sortType == 2" class="fas fa-sort-alpha-up active" />
        </button>
      </h3>
      <input v-model="searchInputValue" @mouseover="inputFocus" placeholder="관리자명을 검색하세요." />

      <!-- 관리자 리스트 -->
      <ul class="admin-list">
        <li v-for="(admin, idx) in filterList" :key="idx" :data-seq="admin.adminSeq" @mouseover="adminOver">
          <input type="checkbox" 
            :id="'adminAuthority_' + admin.adminSeq" 
            @click="adminClick" 
          />
          <label :for="'adminAuthority_' + admin.adminSeq">
            {{ admin.name }} / {{ admin.department }}
          </label>
        </li>
      </ul>
      <div class="info" v-if="hoverInfoBoxYN" :style="{
        top: (hoverInfoBoxPosition - 102) + 'px'
      }" @mouseover="hoverBoxOver" @mouseleave="hoverBoxLeave">
        <div class="wrap">
          <p>이름 : {{ returnName }}</p>
          <p>성별 : {{ returnGender }}</p>
          <p>부서 : {{ returnDepartment }}</p>
          <p>연락처 : {{ returnPhone }}</p>
          <i class="fas fa-caret-left" />
        </div>
      </div>
    </aside>
    <article class="con" v-if="true">
      <h3>
        권한 리스트
        <button class="xBtn" @click="selectReset"><span></span><span></span></button>
        <button class="saveBtn" @click="adminAuthoritySave"><i class="far fa-save" />저 장</button>
        <div class="selectList">
          <span>선택한 관리자 : </span>
          <ul>
            <li v-for="selectAdmin in selectAdminList" 
              v-text="selectAdmin.name"
              :key="selectAdmin.adminSeq" 
              :data-seq="selectAdmin.adminSeq" 
              @click="unSelectAdmin"
            />
          </ul>
        </div>
      </h3>
      <ul>
        <li v-for="(title, idx) in authorityTitleList" :key="idx">
          <h4 v-text="(idx + 1) + '. ' + title.titleName" />
          <ul>
            <template v-for="(authority, i) in authorityList">
              <li :key="i" v-if="title.titleSeq == authority.titleSeq">
                <p><i class="fas fa-caret-right" />{{ authority.contents }}</p>
                <div class="checkboxList">
                  <template v-for="(checkBox, ii) in clientAuthorityList">
                    <div :key="ii" v-if="authority.authoritySeq == checkBox.authoritySeq">
                      <span v-text="checkBox.contents"/>
                      <Checkbox 
                        :idName="'authority_chk_' + checkBox.subSeq"
                        :refName="'authority_chk_' + checkBox.subSeq"
                        :unset="checkBox.state == '0' || checkBox.state == '1' || checkBox.state == null ? false : true"
                        :checked="checkBox.state == '1' ? true : false"
                        :change="authorityCheck"
                        :disabled="selectAdminList.length == 0"
                      />
                    </div>
                  </template>
                </div>
              </li>
            </template>
          </ul>
        </li>
      </ul>
    </article>
    <article class="con" v-if="false">
      <div class="selectNone">관리자를 선택해주세요</div>
    </article>
  </section>
</template>

<script>
import { Store } from '../../store';
import { useOrderArr, useOffsetY, useRest } from '../../hook';

export default {
  components: {
    Checkbox: () => import('../../htmlTemplate/Checkbox.vue')
  },
  data() {
    return {
      sortType: 0,
      adminList: [],
      hoverInfoBoxYN: false,
      hoverInfoBoxPosition: 0,
      hoverAdminInfo: {},

      authorityTitleList: [],
      authorityList: [],
      authoritySubList: [],

      selectAdminList: [],
      selectAdminAuthorityList: [],
      clientAuthorityList: [],
      
      searchInputValue: '',
      sendData: [],
      setYN: false,

      diffSeqList: [],
    }
  },
  watch: {
    selectAdminAuthorityList(newVal, oldVal) {
      let tempArr = [];
      this.authoritySubList.forEach((obj, idx) => {
        let tempStr = '';
        let filterSubList = newVal.filter(x => x.subSeq == obj.subSeq);
        
        for (let i in filterSubList) {
          if (tempStr != '') {
            if (tempStr != JSON.stringify(filterSubList[i].state)) {
              this.diffSeqList.push(filterSubList[i].subSeq);
              break;
            }
          }
          tempStr = JSON.stringify(filterSubList[i].state);
        }
        tempStr = '';
      });

      this.authoritySubList.forEach(obj => {
        let filterSubList = newVal.filter(x => x.subSeq == obj.subSeq);
        tempArr.push({
          subSeq: obj.subSeq, authoritySeq: obj.authoritySeq, contents: obj.contents,
          state: (
            this.diffSeqList.indexOf(obj.subSeq) > -1
          ) || (
            filterSubList.length != this.selectAdminList.length
          ) ? "2" : (
            newVal.find(x => x.subSeq == obj.subSeq)?.state || "0"
          )
        });
      });
      
      this.clientAuthorityList = tempArr;
    }
  },
  created() {
    // 관리자 리스트
    useRest({
      url: Store.globalURL + 'admin_adminList',
      success: (data) => this.adminList = data
    });
    // 권한 타이틀 리스트
    useRest({
      url: Store.globalURL + 'admin_authorityTitleList',
      success: (data) => this.authorityTitleList = data
    });
    // 권한 리스트
    useRest({
      url: Store.globalURL + 'admin_authorityList',
      success: (data) => this.authorityList = data
    });
    // 권한 서브 리스트
    useRest({
      url: Store.globalURL + 'admin_authoritySubList',
      success: (data) => {
        this.authoritySubList = data;
        data.forEach(sub => {
          this.clientAuthorityList.push({
            subSeq: sub.subSeq,
            authoritySeq: sub.authoritySeq,
            state: '0',
            contents: sub.contents
          });
        });
      }
    });
  },
  methods: {
    adminAuthoritySave() {
      if (this.selectAdminList.length == 0) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'info',
          title: '관리자 권한',
          text: '관리자를 선택해주세요.'
        });
        return;
      }
      console.log('선택 관리자 : ', this.selectAdminList);
      console.log('전송 데이터 : ', this.sendData);
      if (this.sendData.length == 0) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'info',
          title: '관리자 권한',
          text: '변경사항이 없습니다.'
        });
        return;
      }

      Store.setAlertYN(true);
      Store.setAlertInfo({
        icon: 'success',
        title: '관리자 권한',
        text: '저장이 완료되었습니다.'
      });

      this.sendData = [];
      this.diffSeqList = [];
    },
    adminClick(e) {
      if (this.sendData.length != 0 && this.selectAdminList.length != 0) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn',
          title: '관리자 권한',
          text: '변경사항이 있습니다. 먼저 저장을 완료해주세요.'
        });
        e.target.checked = !e.target.checked;
        return;
      }
      let selectAdminString = '';
      let checked = e.target.checked;
      let seq = e.target.parentNode.getAttribute('data-seq');

      if (checked) {
        this.selectAdminList = this.selectAdminList.concat(this.adminList.filter(x => x.adminSeq == seq));
      } else {
        this.selectAdminList = this.selectAdminList.filter(x => x.adminSeq != seq);
      }
      if (this.selectAdminList.length == 0) {
        this.selectAdminAuthorityList = [];
        this.sendData = [];
        return;
      }


      // 서버에서 전달 받은 값 //

      this.selectAdminList.forEach(({adminSeq}) => selectAdminString += 'adminSeq=' + adminSeq + '&');
      useRest({
        url: Store.globalURL + 'admin_selectAdminAuthorityList?' + selectAdminString,
        success: (data) => {
          this.selectAdminAuthorityList = data;
        }
      });

      this.diffSeqList = [];
      this.clientAuthorityList = [];
    },
    authorityCheck(data) {
      if (!data) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'info',
          title: '관리자 권한',
          text: '관리자를 선택해주세요.'
        });
        return;
      }
      this.setYN = true;
      let [subSeq, state, ref] = [data.idName.split('_')[2], data.checked, data.ref];
      let temp = [{subSeq: subSeq, state: state ? '1' : '0'}];
      let findIndex = this.sendData.findIndex(x => x.subSeq == subSeq);
      
      if (findIndex > -1) {
        this.sendData[findIndex].state = state ? '1' : '0';
      } else {
        this.sendData = this.sendData.concat(temp);
      }
    },
    inputFocus() {
      this.hoverInfoBoxYN = false;
      this.hoverAdminInfo = {}
    },
    adminOver(e) {
      let seq = e.currentTarget.getAttribute('data-seq');
      this.hoverAdminInfo = this.adminList.find(x => x.adminSeq == seq);
      this.hoverInfoBoxYN = true;
      this.hoverInfoBoxPosition = useOffsetY(e.currentTarget);
    },
    adminLeave(e) {
      this.hoverInfoBoxYN = false;
      this.hoverAdminInfo = {}
    },
    hoverBoxOver() {
      this.hoverInfoBoxYN = true;
    },
    hoverBoxLeave() {
      this.hoverInfoBoxYN = false;
    },
    sortTypeClick(e) {
      this.inputFocus();
      let type = e.currentTarget.getAttribute('data-type');
      this.sortType = type == 0 ? 1 : type == 1 ? 2 : 0;
    },
    selectReset() {
      this.selectAdminList.forEach(obj => {
        document.querySelector('#adminAuthority_' + obj.adminSeq).checked = false;
      });
      this.selectAdminList = [];
      this.sendData = [];
    },
    unSelectAdmin(e) {
      if (this.sendData.length != 0 && this.selectAdminList.length != 0) {
        Store.setAlertYN(true);
        Store.setAlertInfo({
          icon: 'warn',
          title: '관리자 권한',
          text: '변경사항이 있습니다. 먼저 저장을 완료해주세요.'
        });
        return;
      }
      let selectAdminString = '';
      let seq = e.target.getAttribute('data-seq');
      this.selectAdminList = this.selectAdminList.filter(x => x.adminSeq != seq);
      document.querySelector('#adminAuthority_' + seq).checked = false;

      
      // 서버에서 전달 받은 값 //
      this.selectAdminList.forEach(({adminSeq}) => selectAdminString += 'adminSeq=' + adminSeq + '&');
      
      useRest({
        url: Store.globalURL + 'admin_selectAdminAuthorityList?' + selectAdminString,
        success: (data) => {
          this.selectAdminAuthorityList = data;
        }
      });

      this.diffSeqList = [];
      this.clientAuthorityList = [];
    },
  },
  computed: {
    filterList() {
      let arr = this.adminList.filter(x => (
        x.name.indexOf(this.searchInputValue) > -1 || 
        x.phone.replaceAll('-','').replaceAll(' ', '').indexOf(this.searchInputValue.replaceAll('-','').replaceAll(' ', '')) > -1
      ));
      arr = this.sortType == 1 ? (
        useOrderArr(arr, 'name', 'up', 'string')
       ) : (
         this.sortType == 2 ? useOrderArr(arr, 'name', 'down', 'string') : arr
       );
      return arr;
    },
    selectYN() {
      return this.selectAdminList.length == 0 ? false : true;
    },
    returnName() {
      return this.hoverAdminInfo?.name ?? '';
    },
    returnGender() {
      if (!this.hoverAdminInfo?.gender) return '';
      return this.hoverAdminInfo?.gender == 'M' ? '남자' : '여자';
    },
    returnDepartment() {
      return this.hoverAdminInfo?.department ?? '';
    },
    returnPhone() {
      return this.hoverAdminInfo?.phone ?? '';
    },
  }
}
</script>

<style lang="scss" scoped>
  section > aside {
    width: 250px;
    height: 100%;
    float: left;
    padding: 10px;
    border-right: 1px solid #eee;
    h3 {
      font-weight: 500;
      font-size: 17px;
      height: 40px;
      position: relative;
      button {
        position: absolute;
        right: 0;
        top: 1px;
        display: flex;
        padding: 2px;
        background-color: transparent;
        font-size: 20px;
        color: #999;
        span {
          font-size: 12px;
          display: inline-block;
          margin-right: 5px;
          line-height: 16px;
          font-weight: 400;
        }
        span.active {
          color: #000;
        }
        i.active {
          color: #000;
        }
      }
    }
    input {
      width: 100%;
      height: 30px;
      border: 1px solid #00000030;
      border-radius: 2px;
      padding: 0 5px;
      font-size: 13px;
    }
    & > ul {
      margin-top: 10px;
      margin-bottom: 0;
      overflow: auto;
      width: 100%;
      height: calc(100% - 80px);
      position: relative;
      &::before {
        content: '리스트가 없습니다.';
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        color: #999;
        display: block;
        height: 31px;
        line-height: 31px;
      }
      li {
        margin-bottom: 5px;
        &.active {
          border-bottom: 2px solid green;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        & > input {
          display: none;
        }
        & > label {
          display: block;
          padding: 6px 0;
          width: 100%;
          height: 100%;
          font-size: 13px;
          letter-spacing: 1px;
          border-radius: 2px;
          position: relative;
          overflow: hidden;
          text-align: center;
          background-color: #efefef;
          cursor: pointer;
          &:hover {
            background-color: #ddd;
          }
        }
        & > input:checked + label {
          font-weight: 700;
        }
        & > input:checked + label::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          background-color: green;
        }
      }
    }

    & > .info {
      position: fixed;
      height: 111px;
      background-color: #bbb;
      box-shadow: 1px 2px 4px #00000040;
      left: 230px;
      border-radius: 4px;
      z-index: 2;
      opacity: .95;

      & > .wrap {
        width: 100%;
        height: 100%;
        position: relative;
        padding: 10px 20px 10px 16px;
        color: #444;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-flow: column;
        & > p {
          margin-bottom: 5px;
          white-space: nowrap;
          user-select: text;
          &:last-of-type {
            margin-bottom: 0;
          }
        }
        & > i {
          position: absolute;
          right: calc(100% - 1px);
          bottom: 10px;
          color: #bbb;
        }
      }
    }
  }
  section > article.con {
    float: left;
    width: calc(100% - 250px);
    height: 100%;
    padding: 10px;
    .selectNone {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      color: #aaa;
    }
    h3 {
      font-weight: 500;
      font-size: 17px;
      height: 60px;
      position: relative;

      div.selectList {
        width: 100%;
        height: 30px;
        margin-top: 5px;
        font-size: 12px;

        & > span {
          display: block;
          width: 80px;
          float: left;
          height: 100%;
        }
        & > ul {
          width: calc(100% - 80px);
          height: 100%;
          padding-right: 10px;
          float: left;
          margin-bottom: 0;
          overflow: auto;
          & > li {
            float: left;
            margin-right: 6px;
            background-color: #efefef;
            font-weight: 400;
            padding: 0 8px;
            border-radius: 100px;
            font-size: 12px;
            height: 24px;
            margin-bottom: 6px;
            cursor: pointer;
            &:last-of-type {
              margin-right: 0;
            }
            &:hover {
              background-color: #ddd;
            }
            &:active {
              background-color: #ccc;
            }
          }
        }
      }

      button.saveBtn {
        margin-right: 10px;    
        background-color: #0662f9;
        display: flex;
        align-items: center;
        justify-content: center;
        float: right;
        font-size: 14px;
        padding: 2px 10px;
        color: #fff;
        border-radius: 200px;
        &:hover {
          box-shadow: 0 0px 2px #00000070;
        }
        i {
          margin-right: 5px;
        }
      }
      button.xBtn {
        float: right;
        width: 24px;
        height: 24px;
        position: relative;
        background-color: transparent;
        box-shadow: none;
        &:hover > span {
          background-color: #aaa;
        }
        span {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 90%;
          height: 3px;
        border-radius: 10px;
          background-color: #ddd;
          &:first-of-type {
            transform: translate(-50%, -50%) rotate(-45deg);
          }
          &:last-of-type {
            transform: translate(-50%, -50%) rotate(45deg);
          }
        }
      }
    }
    & > ul {
      height: calc(100% - 60px);
      margin-bottom: 0;
      overflow: auto;

  & > li {
    &:first-of-type > h4 {
      margin-top: 0;
    }
    padding-top: 10px;
    & > h4 {
      text-align: left;
      margin-top: 30px;
      color: #333;
      font-weight: 500;
      padding-bottom: 4px;
      display: inline-block;
      padding-right: 4px;
      border-bottom: 2px solid green;
    }
    & > ul {

      & > li {
        padding: 8px 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 5px;
        border-radius: 3px;
        &:nth-of-type(odd) {
          background-color: #efefef;
        }

        & > p {
          width: calc(100% - 300px);
          min-width: calc(100% - 300px);
          max-width: calc(100% - 300px);
          white-space: nowrap;
          i {
            margin-right: 6px;
            color: #555;
          }
        }
        & > div {
          width: 300px;
          display: flex;
          align-items: center;
          justify-content: flex-end;

          & > div {
            display: flex;
            align-items: center;
            margin-left: 10px;
          }
        }
      }
    }
  }

      
    }
  }
</style>