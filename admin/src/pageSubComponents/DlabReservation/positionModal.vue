<template>
  <section class="sModal">
    <header>
      <article>
        <h1>
          <div class="icon" :style="{ backgroundImage: 'url(' + editIcon + ')' }" />
          <span>장소 관리</span>
        </h1>
      </article>
      <article>
        <button @click="$emit('positionModalClose')">
          <span v-for="x in 2" :key="x" />
        </button>
        <button class="saveBtn" @click="save">
          <i class="far fa-save" />저 장
        </button>
      </article>
    </header>
    <article class="contents">
      <ul>
        <li v-for="item in orderCategoryList" :key="item.poSeq" :data-seq="item.poSeq" :data-order="item.order">
          <div class="orderBtn">
            <button @click="listUp"><i class="fas fa-caret-up" /></button>
            <button @click="listDown"><i class="fas fa-caret-down" /></button>
          </div>
          <div class="content">
            <input v-model="item.poName" />
          </div>
          <div class="delBtn">
            <button title="장소 삭제" @click="listDel"><i class="fas fa-minus" /></button>
          </div>
        </li>
        <li class="addCategory">
          <button title="장소 추가" @click="listAdd"><i class="fas fa-plus" />장소 추가</button>
        </li>
      </ul>
    </article>
  </section>
</template>

<script>
import { Store } from '../../store';
import { useRest } from '../../hook';
import editIcon from '../../img/icon/edit.png';
export default {
  data() {
    return {
      editIcon,
      poList: [],
      editData: []
    }
  },
  created() {

    useRest({
      url: Store.globalURL + 'admin_dlabPositionList',
      success: (data) => {
        this.poList = data;
        this.editData = [...data];
      }
    });

  },
  methods: {
    save(e) {
      let resultYN = true;
      this.editData.forEach(obj => {
        if (obj.poName == '') {
          resultYN = false;
          return;
        }
      });
      if (!resultYN) {
        Store.setAlertYN(true);
        Store.setAlertInfo({icon: 'warn', title: '카테고리 관리', text: '빈칸이 존재합니다.'});
        return;
      }

      // 저장
      console.log(this.editData);
      Store.setAlertYN(true);
      Store.setAlertInfo({icon: 'info', title: '카테고리 관리', text: this.editData.length + '개의 카테고리가 저장되었습니다.'});
      this.$emit('positionModalClose');
    },
    listUpDownFn(e, dir) {
      let tempList = [];
      let parentNode = e.currentTarget.parentNode.parentNode;
      let order = parentNode.getAttribute('data-order');
      let otherObj = this.editData.filter(x => x.order != order);
      let thisObj = this.editData.find(x => x.order == order);

      if (order == (dir == 'up' ? '1' : this.editData.length)) return;
      let tempObj = this.editData.find(x => x.order == Number(thisObj.order) + (dir == 'up' ? -1 : 1));

      thisObj.order = Number(thisObj.order) + (dir == 'up' ? -1 : 1);
      tempObj.order = Number(tempObj.order) + (dir == 'up' ? 1 : -1);
      otherObj.forEach(obj => tempList.push(obj));
      tempList.push(thisObj);
      this.editData = tempList;
    },
    listUp(e) {
      this.listUpDownFn(e, 'up');
    },
    listDown(e) {
      this.listUpDownFn(e, 'down');
    },
    listDel(e) {
      let order = e.currentTarget.parentNode.parentNode.getAttribute('data-order');
      let tempArr = [];

      Store.setConfirmYN(true);
      Store.setConfirmInfo({
        icon: 'info',
        title: '장소관리',
        text: '장소를 삭제하시면 해당 예약 건이 모두 취소됩니다.',
        ok: () => {
          let tempOrderArrUp = this.editData.filter(x => x.order < order);
          let tempOrderArrDown = this.editData.filter(x => x.order > order);

          tempOrderArrUp.forEach(obj => tempArr.push(obj));
          tempOrderArrDown.forEach(obj => {
            obj.order -= 1;
            tempArr.push(obj);
          });
          
          this.editData = tempArr;
        },
        no () {
          return false;
        }
      });

      
    },
    listAdd(e) {
      let tempArr = [...this.editData];
      let newCategoryObj = {
        order: Number(tempArr.length) + 1,
        poName: '',
        seq: 0
      }
      tempArr.push(newCategoryObj);
      this.editData = tempArr;
    },
  },
  computed: {
    orderCategoryList() {
      return this.editData.sort((a, b) => a.order - b.order);
    }
  }
}
</script>

<style lang="scss" scoped>
section.sModal {
  position: fixed;
  top: 100px !important;
  left: 50%;
  transform: translateX(-50%) !important;
  border: 1px solid #aaa;
  border-radius: 10px;
  width: 400px !important;
  height: 500px !important;
  background-color: #fff;
  z-index: 1800;
  overflow: hidden;
  user-select: none;
  box-shadow: 1px 2px 4px #00000050;
}
article.contents {
  overflow: auto;
}
ul {
  padding: 10px;
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 0;
    margin-bottom: 4px;
    border-radius: 4px;
    &.addCategory {
      justify-content: center;
      font-size: 14px;
      background-color: #ddd;
      padding: 0;
      & > button {
        width: 100%;
        height: 100%;
        background-color: transparent;
        border: none;
        padding: 7px 0;
        border-radius: 4px;
      }
      i {
        margin-right: 10px;
      }
    }
    .orderBtn {
      width: 80px;
    }
    .content {
      width: 100%;
      input {
        width: calc(100% - 10px);
        border: 1px solid #ddd;
        height: 30px;
        padding: 0 6px;
        color: #222;
      }
    }
    .delBtn {
      width: 26px;
    }
    .orderBtn > button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      background-color: cornflowerblue;
      color: #fff;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .delBtn > button {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: none;
      background-color: #fd5846;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>