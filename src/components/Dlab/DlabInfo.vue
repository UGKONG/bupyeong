<template>
  <div wrap>
    <img :src="DlabImg" />
    <div v-html="text" />
  </div>
</template>

<script>
import DlabImg from "@images/d-lab.PNG";
export default {
  props: {
    data: [Object, String],
  },
  data: () => ({
    DlabImg,
    text: `
    <style>
      #detail_con {
    position: relative;
    margin: 35px 0 60px;
    min-height: 420px;
    color: #454545;
    font-size: 14px;
}.facility {
    overflow: hidden;
    margin-top: 60px;
}.facility:first-child {
    margin-top: 0;
}.facility .photo {
    position: relative;
    float: left;
    text-align: center;
    width: 49%;
    padding: 15px;
    margin-bottom: 4px;
    border: 1px solid #d7d3cf;
    background: url(https://www.bpcf.or.kr/ccity/images/contents/land_facility_bg.gif) repeat;
    box-sizing: border-box;
}.facility .con {
    float: right;
    width: 47%;
}
.facility img {
    max-width: 100% !important;
}.facility .photo:after {
    display: block;
    content: "";
    position: absolute;
    left: -1px;
    bottom: -4px;
    width: 100%;
    height: 2px;
    border-left: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    background: #f1f1f1;
}#detail_con h4 {
    padding-left: 23px;
    margin-top: 45px;
    font-size: 18px;
    font-weight: 600;
    color: #3364a5;
    
    background: url(https://www.bpcf.or.kr/ccity/images/contents/blet.gif) no-repeat left 5px;
}
h4::before {
  content: '● ';

}
.facility .con ul {
    padding-top: 25px;
    background: url(https://www.bpcf.or.kr/ccity/images/contents/slash.gif) repeat-x;
}#detail_con .ssblet {
    margin-top: 4px;
    padding-left: 10px;
    font-size: 14px;
    background: url(https://www.bpcf.or.kr/ccity/images/contents/ssblet.gif) no-repeat left 8px;
}.facility .con li {
    position: relative;
    padding-top: 5px;
    padding-bottom: 5px;
    border-top: 1px dotted #b5b5b5;
    background-position: left 13px !important;
}
.wfont {
    font-weight: bold;
}.facility .con ul {
    padding-top: 25px;
    background: url(https://www.bpcf.or.kr/ccity/images/contents/slash.gif) repeat-x;
}

    </style>
    <h4 style="margin-bottom: 0px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 18px; letter-spacing: -0.5px; line-height: 27px; color: rgb(51, 100, 165); background-image: url(&quot;https://www.bpcf.or.kr/ccity/images/contents/blet.gif&quot;); background-position: left 5px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">디지털뮤직랩(D-Lab) 소개</h4><div class="para03" style="margin-top: 10px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 13px; letter-spacing: -0.5px; line-height: 19.5px; color: rgb(69, 69, 69);"><p class="ssblet" style="text-indent: 5px; margin-top: 4px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 14px; line-height: 21px; background-image: url(&quot;https://www.bpcf.or.kr/ccity/images/contents/ssblet.gif&quot;); background-position: left 8px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial;">▷ 청소년, 청년, 예술인들의 음악 작업과 네트워크를 지원하며 새로운 문화 활동을 실험하는 공간입니다. 다양한 프로젝트를 바탕으로 지역의 문화가 상생하는 관계 속에서 인적·물적 자원이 동반 성장하는 생태계 구축을 목표로 하고 있습니다.</p></div><h4 style="margin-top: 45px; margin-bottom: 0px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 18px; letter-spacing: -0.5px; line-height: 27px; color: rgb(51, 100, 165); background-image: url(&quot;https://www.bpcf.or.kr/ccity/images/contents/blet.gif&quot;); background-position: left 5px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">이용시간</h4><div class="para03" style="margin-top: 10px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 13px; letter-spacing: -0.5px; line-height: 19.5px; color: rgb(69, 69, 69);"><ul class="margin_t15" style="margin-bottom: 0px; font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; line-height: 19.5px; margin-top: 15px !important;"><li class="ssblet" style="text-indent: 5px;margin-top: 4px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 14px; line-height: 21px; background-image: url(&quot;https://www.bpcf.or.kr/ccity/images/contents/ssblet.gif&quot;); background-position: left 8px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial;">▷ 월-토 10:00~21:00</li><li class="ssblet" style="text-indent: 5px;margin-top: 4px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 14px; line-height: 21px; background-image: url(&quot;https://www.bpcf.or.kr/ccity/images/contents/ssblet.gif&quot;); background-position: left 8px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial;">▷ 매주 일요일, 공휴일 휴관</li></ul></div><h4 style="margin-top: 45px; margin-bottom: 0px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 18px; letter-spacing: -0.5px; line-height: 27px; color: rgb(51, 100, 165); background-image: url(&quot;https://www.bpcf.or.kr/ccity/images/contents/blet.gif&quot;); background-position: left 5px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">주소</h4><div class="para03" style="margin-top: 10px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 13px; letter-spacing: -0.5px; line-height: 19.5px; color: rgb(69, 69, 69);"><ul class="margin_t15" style="margin-bottom: 0px; font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; line-height: 19.5px; margin-top: 15px !important;"><li class="ssblet" style="text-indent: 5px;margin-top: 4px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 14px; line-height: 21px; background-image: url(&quot;https://www.bpcf.or.kr/ccity/images/contents/ssblet.gif&quot;); background-position: left 8px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial;">▷ 인천광역시 부평구 아트센터로 168, 3층</li></ul></div><h4 style="margin-top: 45px; margin-bottom: 0px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 18px; letter-spacing: -0.5px; line-height: 27px; color: rgb(51, 100, 165); background-image: url(&quot;https://www.bpcf.or.kr/ccity/images/contents/blet.gif&quot;); background-position: left 5px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial;">문의</h4><div class="para03" style="margin-top: 10px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 13px; letter-spacing: -0.5px; line-height: 19.5px; color: rgb(69, 69, 69);"><ul class="margin_t15" style="margin-bottom: 0px; font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; line-height: 19.5px; margin-top: 15px !important;"><li class="ssblet" style="text-indent: 5px;margin-top: 4px;  font-family: &quot;Nanum Gothic&quot;, 나눔고딕, Arial, sans-serif; font-size: 14px; line-height: 21px; background-image: url(&quot;https://www.bpcf.or.kr/ccity/images/contents/ssblet.gif&quot;); background-position: left 8px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: initial;">▷ 부평구문화재단 문화도시센터&nbsp;<a href="tel:032-500-2045" class="telNum" style="color: rgb(72, 72, 72); cursor: default;">032-500-2045</a></li></ul></div>
    <div id="detail_con">
					<div class="facility">
						<div class="photo">
							<img class="view" alt=" LAB 1사진" src="https://www.bpcf.or.kr/ccity/images/sub/academy_borrow01.jpg">
						</div>
						<div class="con">
							<h4> LAB 1</h4>
							<ul>
								<li class="ssblet">미디 음원 제작 및 디제잉 등 전자음악에 대해 이해하고 탐구하는 공간</li>
								<li class="ssblet"><span class="wfont">장비 :</span> DJ Player(CDJ, XDJ-RX), DJ Mixer, Turn Table, Headphone, Studio Monitor Speaker, iMAC(Ableton Live 10, FL STUDIO), Master Keyboard, Ableton Live PUSH 2</li>
							</ul>
						</div>
					</div>
					<div class="facility">
						<div class="photo">
							<img class="view" alt="LAB 2사진" src="https://www.bpcf.or.kr/ccity/images/sub/academy_borrow03.jpg">
						</div>
						<div class="con">
							<h4>LAB 2</h4>
							<ul>
								<li class="ssblet">다양한 창작 활동 및 개인 방송 작업이 가능한 프로젝트 공간</li>
								<li class="ssblet"><span class="wfont">장비 :</span> PA speaker</li>
							</ul>
						</div>
					</div>
					<div class="facility">
						<div class="photo">
							<img class="view" alt="SOUND STUDIO사진" src="https://www.bpcf.or.kr/ccity/images/sub/academy_borrow04.jpg">
						</div>
						<div class="con">
							<h4>SOUND STUDIO</h4>
							<ul>
								<li class="ssblet">워크숍, 녹음, 합주 등을 위한 스튜디오</li>
								<li class="ssblet"><span class="wfont">장비 :</span> Drum, Keyboard, Mic, PA Speaker, Cubase Pro 9(windows), Turn Table</li>
							</ul>
						</div>
					</div>
					<div class="facility">
						<div class="photo">
							<img class="view" alt="COWORKING SPACE사진" src="https://www.bpcf.or.kr/ccity/images/sub/academy_borrow05.jpg">
						</div>
						<div class="con">
							<h4>COWORKING SPACE</h4>
							<ul>
								<li class="ssblet">서로의 생각을 공유하고 의견을 나누는 커뮤니티 공간</li>
								<li class="ssblet"><span class="wfont">장비 : </span>Turn Table, Studio Monitor Speaker</li>
							</ul>
						</div>
					</div>
					<div class="facility">
						<div class="photo">
							<img class="view" alt="MUSIC CUBE 1, 2사진" src="https://www.bpcf.or.kr/ccity/images/sub/academy_borrow06.jpg">
						</div>
						<div class="con">
							<h4>MUSIC CUBE 1, 2</h4>
							<ul>
								<li class="ssblet">개인 음악 작업에 집중할 수 있는 1인 공간</li>
							</ul>
						</div>
					</div>

				</div>
    `,
  }),
  methods: {
    getText() {
      // axios.get(this.$store.state.dbUrl + '/')
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@index.scss";

[wrap] {
  @include flex(center);
  @include font(14px, auto, $gray, 1px);
  display: block;
  overflow: auto;
  img {
    max-width: 732px;
    width: 100%;
    margin-bottom: 30px;
  }
}
</style>