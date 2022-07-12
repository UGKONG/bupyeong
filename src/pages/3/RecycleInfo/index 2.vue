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
        <span>{{ data.title || "도시재생사업현황" }}</span>
        <p history>
          <i :class="$store.state.FontAwesome.fill.home" />
          <i :class="$store.state.FontAwesome.stroke.angle.right" />
          재생사업정보 소개글
        </p>
      </div>
    </h2>

    <!-- <section v-html="data.context" /> -->
    <section v-html="tempData" />
  </main>
</template>

<script>
import axios from "axios";
import processBanner from "@images/2/2/processBanner.png";
export default {
  data: () => ({
    data: {},
    processBanner,
    tempData: `
    <div class="h5-content">
	        <h6 class="h6">기본정보</h6>
	        <div class="h6-content">
	            <div class="scroll-tbl-wrap"><div class="tbl tbl-style1">
	                <table>
	                    <caption>
	                        <strong>인천을 선도하는 지속가능 부평 11번가</strong>
	                        <p></p>
	                    </caption>
	                    <colgroup>
	                        <col style="width:15%">
	                        <col style="width:85%">
	                    </colgroup>
	                    <tbody>
	                        <tr>
	                            <th scope="col">사업구분</th>
	                            <td class="al">
									<div class="form-inline">도시재생사업(뉴딜)</div>
										</td>
	                        </tr>
	                        <tr>
	                            <th scope="col">지역</th>
	                            <td class="al">
									<div class="form-inline">부평구</div>
										</td>
	                        </tr>

	                        <tr>
	                            <th scope="col">위치</th>
	                            <td class="al">부평구 부펑동 65-17 일원</td>
	                        </tr>
	                        <tr>
	                            <th scope="col">총면적</th>
	                            <td class="al">226,795 ㎡</td>
	                        </tr>
	                        <tr>
								<th scope="col">총사업비</th>
								<td class="al">1,643억원 (마중물 360, 부처협력 697, 지자체 185, 공기업 400)</td>
							</tr>
							<tr>
								<th scope="col">사업기간</th>
								<td class="al">2018년 ~ 2022년</td>
							</tr>
							</tbody>
	                </table>
	            </div></div>
	        </div>

	        <h6 class="h6">위치도</h6>
	        <div class="h6-content">
	            <figure class="figure wfull">
	                <div class="img-wrap">
						</div>
	                <figcaption class="hidden"></figcaption>
	            </figure>
	        </div>
	        <h6 class="h6">구상도</h6>
	        <div class="h6-content">
	            <figure class="figure wfull">
	                <div class="img-wrap">
	                    <div class="item">
						</div>
	                <figcaption class="hidden"></figcaption>
	            </figure>
	        </div>
	        <h6 class="h6">재생방향</h6>
	        <div class="h6-content">
	            <ul class="list-circle">
					<li> 혁신 경제생태계 조성으로 일자리창출<br>
</li>
                    <li> 굴포천 프로그램과 연계한 지역상권 활성화<br>
</li>
                    <li> 신‧구 상권을 연결하는 지역상권 확산 프로그램<br>
</li>
                    <li> 직‧주‧관광 복지구현을 위한 보행환경 개선</li>
                    </ul>
	        </div>
	        <h6 class="h6">사업내용</h6>
	        <div class="h6-content">
	            <ul class="list-circle">
	            	<li> 혁신센터 조성사업, 굴포먹거리타운 활성화사업, 굴포하늘길 조성 사업 등</li>
                    </ul>
	        </div>
	        <h6 class="h6">주요추진결과</h6>
	        <div class="h6-content">
	            <ul class="list-circle">
	            	<li> 2017.12.: 도시재생 뉴딜사업 선도지역 68곳 선정(인천 5곳)<br>
</li>
                    <li> 2018. 5.: 선도지역 지정·고시(국토부고시 제2018-258호)(3곳)<br>
</li>
                    <li> 2018. 8.: 도시재생 활성화계획 국가지원사항 확정 통보(국토부)<br>
</li>
                    <li> 2018. 9.: 도시재생 활성화계획 승인 고시(부평구)<br>
</li>
                    <li> 2019. 6.: 혁신센터 부지 국유재산 관리‧처분 협약(부평구↔국방부)</li>
                    </ul>
	        </div>
	        <h6 class="h6">관련사진</h6>
	        <div class="h6-content">
	            <div class="figure-cols cols2">
	             	<figure class="figure col">
		                    <div class="img-wrap" style="height: 370px;"><img src="/comm/getImage?srvcId=CTYBSNSRELATEDPHOTO&amp;upperNo=69&amp;fileTy=IMG&amp;fileNo=2" alt=""></div>
		                    <figcaption class="figcaption" style="height: 20px;"></figcaption>
		                </figure>
					<figure class="figure col">
		                    <div class="img-wrap" style="height: 370px;"><img src="/comm/getImage?srvcId=CTYBSNSRELATEDPHOTO&amp;upperNo=69&amp;fileTy=IMG&amp;fileNo=1" alt=""></div>
		                    <figcaption class="figcaption" style="height: 20px;"></figcaption>
		                </figure>
					</div>
	        </div>
	        </div>
    `
  }),
  created() {
    console.log(this.id);
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get(this.$store.state.dbUrl + "/bupyeongInfoText/" + 20)
        .then(({ data }) => {
          this.data = data;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

section {
  width: 100%;
  min-height: 800px;
  padding: 10px;
}
</style>