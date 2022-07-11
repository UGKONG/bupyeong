// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import Main from '@/pages/Main';
// import SignIn from '@/pages/Sign/In';
// import SignUp from '@/pages/Sign/Up';
// import Bupyeong from '@/pages/1/Bupyeong';

// import Notice from '@/pages/2/Notice';
// import NoticeList from '@/pages/2/Notice/List';
// import NoticeWrite from '@/pages/2/Notice/Write';
// import NoticeView from '@/pages/2/Notice/View';

// import University from '@/pages/2/University/index';
// import UniversityProcessList from '@/pages/2/University/ProcessList';
// import UniversityProcessView from '@/pages/2/University/ProcessView';
// import UniversityClassWrite from '@/pages/2/University/ClassWrite';
// import UniversityMediaView from '@/pages/2/University/MediaView';
// import UniversityTaskView from '@/pages/2/University/TaskView';
// import UniversityStudentView from '@/pages/2/University/StudentView';

// import ResidentBusiness from '@/pages/2/ResidentBusiness/index';
// import ResidentBusinessList from '@/pages/2/ResidentBusiness/List';
// import ResidentBusinessRequest from '@/pages/2/ResidentBusiness/Request';
// import ResidentBusinessView from '@/pages/2/ResidentBusiness/View';

// import Survey from '@/pages/2/Survey/index';
// import SurveyList from '@/pages/2/Survey/List';
// import SurveyWrite from '@/pages/2/Survey/Write';
// import SurveyResult from '@/pages/2/Survey/Result';
// import SurveyResultList from '@/pages/2/Survey/ResultList';

// import ResidentCommunity from '@/pages/2/ResidentCommunity/index';
// import ResidentCommunityList from '@/pages/2/ResidentCommunity/List';
// import ResidentCommunityCommunityPostList from '@/pages/2/ResidentCommunity/CommunityPostList';
// import ResidentCommunityWrite from '@/pages/2/ResidentCommunity/Write';
// import ResidentCommunityView from '@/pages/2/ResidentCommunity/View';

// import BusinessPromotion from '@/pages/2/BusinessPromotion/index';
// import BusinessPromotionList from '@/pages/2/BusinessPromotion/List';
// import BusinessPromotionView from '@/pages/2/BusinessPromotion/View';

// import BusinessRecord from '@/pages/2/BusinessRecord/index';
// import BusinessRecordList from '@/pages/2/BusinessRecord/List';
// import BusinessRecordRecordList from '@/pages/2/BusinessRecord/RecordList';
// import BusinessRecordView from '@/pages/2/BusinessRecord/View';

// import RecycleInfo from '@/pages/3/RecycleInfo/index';
// import ContestScheduleindex from '@/pages/3/ContestSchedule/index';
// import ContestScheduleList from '@/pages/3/ContestSchedule/List';
// import ContestScheduleView from '@/pages/3/ContestSchedule/View';

// import CityRecycleBusiness from '@/pages/3/CityRecycleBusiness/index';

// import Platform from '@/pages/4/Platform/index';
// import PlatformList from '@/pages/4/Platform/List';
// import PlatformWrite from '@/pages/4/Platform/Write';
// import PlatformMediaView from '@/pages/4/Platform/MediaView';
// import PlatformView from '@/pages/4/Platform/View';

// import Town from '@/pages/4/Town/index';

// import SmartCity from '@/pages/5/Info/index';

// import DLAB from '@/pages/5/D-LAB/index';
// import DLABView from '@/pages/5/D-LAB/View';
// import DLABChart from '@/pages/5/D-LAB/Chart';
// import DLABMediaView from '@/pages/5/D-LAB/MediaView';
// import DLABReservation from '@/pages/5/D-LAB/Reservation';
// import DLABWrite from '@/pages/5/D-LAB/Write';

// import PublicHearing from '@/pages/5/PublicHearing/index';
// import PublicHearingList from '@/pages/5/PublicHearing/List';
// import PublicHearingView from '@/pages/5/PublicHearing/View';
// import PublicHearingWrite from '@/pages/5/PublicHearing/Write';
// import PublicHearingResult from '@/pages/5/PublicHearing/Result';
// import PublicHearingMediaView from '@/pages/5/PublicHearing/MediaView';

// import FooterInfo1 from '@/pages/Footer/Info1';
// import FooterInfo2 from '@/pages/Footer/Info2';
// import FooterInfo3 from '@/pages/Footer/Info3';
// import FooterInfo4 from '@/pages/Footer/Info4';
// import FooterInfo5 from '@/pages/Footer/Info5';
// import FooterInfo6 from '@/pages/Footer/Info6';

// import Development from '@/pages/Development';
// import Page404 from '@/pages/404';

// Vue.use(VueRouter);

// export const routes = [
//   {
//     path: '/',
//     name: '',
//     component: Main,
//   },

//   // Header
//   {
//     path: '/SignIn',
//     name: '로그인',
//     component: SignIn,
//   },
//   {
//     path: '/SignUp',
//     name: '회원가입',
//     component: SignUp,
//   },

//   // 부평11번가
//   {
//     path: '/Bupyeong',
//     redirect: '/Bupyeong/1'
//   },
//   {
//     path: '/Bupyeong/:id',
//     name: '부평11번가',
//     props: true,
//     component: Bupyeong,
//     children: [
//       {
//         path: '1',
//         name: '굴포천 재생사업',
//       },
//       {
//         path: '2',
//         name: '혁신센터 및 푸드플랫폼 구축사업',
//       },
//       {
//         path: '3',
//         name: '굴포먹거리타운 사업',
//       },
//       {
//         path: '4',
//         name: '굴포하늘길 조성사업',
//       },
//       {
//         path: '5',
//         name: '도시숲 조성사업',
//       },
//       {
//         path: '6',
//         name: '부평문화의거리 연장사업',
//       },
//       {
//         path: '7',
//         name: '구청중심 공공문화 공간',
//       },
//     ]
//   },

//   // 뉴딜참여
//   {
//     path: '/Newdeal',
//     name: '뉴딜참여',
//     redirect: '/Newdeal/Notice',
//   },
//   {
//     path: '/Newdeal/Notice',
//     component: Notice,
//     children: [
//       {
//         path: '',
//         name: '공지사항 리스트',
//         component: NoticeList,
//       },
//       {
//         path: 'write',
//         name: '공지사항 작성',
//         component: NoticeWrite,
//       },
//       {
//         path: ':id',
//         name: '공지사항 상세정보',
//         props: true,
//         component: NoticeView,
//       },
//     ]
//   },
//   {
//     path: '/Newdeal/University',
//     component: University,
//     children: [
//       {
//         path: '',
//         name: '도시재생대학 과정 리스트',
//         component: UniversityProcessList,
//       },
//       {
//         path: ':id',
//         name: '도시재생대학 과정 상세',
//         props: true,
//         component: UniversityProcessView,
//       },
//       {
//         path: ':id/Class/Write',
//         name: '도시재생대학 강의 생성',
//         props: true,
//         component: UniversityClassWrite,
//       },
//       {
//         path: ':id/ClassEdit/:post',
//         name: '도시재생대학 강의 수정',
//         props: true,
//         component: UniversityClassWrite,
//       },
//       {
//         path: ':id/Class/:post',
//         name: '도시재생대학 강의 시청',
//         props: true,
//         component: UniversityMediaView,
//       },
//       {
//         path: ':id/Task/:post',
//         name: '도시재생대학 과제 상세정보',
//         props: true,
//         component: UniversityTaskView,
//       },
//       {
//         path: ':id/Student/:post',
//         name: '도시재생대학 수강생 상세정보',
//         props: true,
//         component: UniversityStudentView,
//       },
//     ]
//   },
//   {
//     path: '/Newdeal/ResidentBusiness',
//     component: ResidentBusiness,
//     children: [
//       {
//         path: '',
//         name: '주민공모사업 리스트',
//         component: ResidentBusinessList,
//       },
//       {
//         path: ':id/Request',
//         name: '주민공모사업 신청',
//         props: true,
//         component: ResidentBusinessRequest,
//       },
//       {
//         path: ':id',
//         name: '주민공모사업 상세정보',
//         props: true,
//         component: ResidentBusinessView,
//       }
//     ]
//   },
//   {
//     path: '/Newdeal/Survey',
//     component: Survey,
//     children: [
//       {
//         path: '',
//         name: '설문지 리스트',
//         component: SurveyList,
//       },
//       {
//         path: ':id',
//         name: '설문지 페이지',
//         props: true,
//         component: SurveyWrite,
//       },
//       {
//         path: ':id/Result',
//         name: '설문지 결과',
//         props: true,
//         component: SurveyResult,
//       },
//       {
//         path: ':id/Result/:post',
//         name: '설문지 텍스트 결과',
//         props: true,
//         component: SurveyResultList,
//       },
//     ]
//   },
//   {
//     path: '/Newdeal/ResidentCommunity',
//     component: ResidentCommunity,
//     children: [
//       {
//         path: '',
//         name: '공동체 리스트',
//         component: ResidentCommunityList,
//       },
//       {
//         path: ':id',
//         name: '공동체 게시글 리스트',
//         props: true,
//         component: ResidentCommunityCommunityPostList,
//       },
//       {
//         path: ':id/Write',
//         name: '공동체 게시글 작성',
//         props: true,
//         component: ResidentCommunityWrite,
//       },
//       {
//         path: ':id/:post',
//         name: '공동체 게시글 상세정보',
//         props: true,
//         component: ResidentCommunityView,
//       },
//     ]
//   },
//   {
//     path: '/Newdeal/BusinessPromotion',
//     component: BusinessPromotion,
//     children: [
//       {
//         path: '',
//         name: '사업홍보물 리스트',
//         component: BusinessPromotionList,
//       },
//       {
//         path: ':id',
//         name: '사업홍보물 상세정보',
//         props: true,
//         component: BusinessPromotionView,
//       },
//     ]
//   },
//   {
//     path: '/Newdeal/BusinessRecord',
//     component: BusinessRecord,
//     children: [
//       {
//         path: '',
//         name: '사업 리스트',
//         component: BusinessRecordList,
//       },
//       {
//         path: ':id',
//         name: '기록물 리스트',
//         props: true,
//         component: BusinessRecordRecordList,
//       },
//       {
//         path: ':id/:post',
//         name: '기록물 상세정보',
//         props: true,
//         component: BusinessRecordView,
//       }
//     ]
//   },
  
//   // 재생사업정보
//   {
//     path: '/Business',
//     name: '재생사업정보',
//     redirect: '/Business/RecycleInfo'
//   },
//   {
//     path: '/Business/RecycleInfo',
//     name: '재생사업정보 소개글',
//     component: RecycleInfo,
//   },
//   {
//     path: '/Business/ContestSchedule',
//     component: ContestScheduleindex,
//     children: [
//       {
//         path: '',
//         name: '공모사업 리스트',
//         component: ContestScheduleList,
//       },
//       {
//         path: ':id',
//         name: '공모사업 상세정보',
//         props: true,
//         component: ContestScheduleView,
//       },
//     ]
//   },
//   {
//     path: '/Business/List/:id',
//     name: '도시재생사업현황',
//     props: true,
//     component: CityRecycleBusiness,
//     children: [
//       {
//         path: '22',
//         name: '도시재생 인정 사업',
//       },
//       {
//         path: '23',
//         name: '도시재생 예비 사업',
//       },
//       {
//         path: '24',
//         name: '새뜰마을 사업',
//       },
//       {
//         path: '25',
//         name: '희망지 사업',
//       },
//       {
//         path: '26',
//         name: '더불어 마을 사업',
//       },
//       {
//         path: '27',
//         name: '도시재생 활성화 지역',
//       },
//     ]
//   },

//   // 상권활성화
//   {
//     path: '/Food',
//     name: '상권활성화',
//     redirect: '/Food/Platform'
//   },
//   {
//     path: '/Food/Platform',
//     component: Platform,
//     children: [
//       {
//         path: '',
//         name: '푸드플랫폼 상점 리스트',
//         component: PlatformList,
//       },
//       {
//         path: ':id/Write',
//         name: '푸드플랫폼 소개문구 수정',
//         props: true,
//         component: PlatformWrite,
//       },
//       {
//         path: ':id/:post',
//         name: '푸드플랫폼 영상시청',
//         props: true,
//         component: PlatformMediaView,
//       },
//       {
//         path: ':id',
//         name: '푸드플랫폼 상점 정보',
//         props: true,
//         component: PlatformView,
//       },
//     ]
//   },
//   {
//     path: '/Food/Town',
//     component: Town,
//     children: [
//       {
//         path: '',
//         name: '굴포먹거리타운 상점 리스트',
//         component: PlatformList,
//       },
//       {
//         path: ':id/Write',
//         name: '굴포먹거리타운 소개문구 수정',
//         props: true,
//         component: PlatformWrite,
//       },
//       {
//         path: ':id/:post',
//         name: '굴포먹거리타운 영상시청',
//         props: true,
//         component: PlatformMediaView,
//       },
//       {
//         path: ':id',
//         name: '굴포먹거리타운 상점 정보',
//         props: true,
//         component: PlatformView,
//       },
//     ]
//   },

//   // 스마트시티
//   {
//     path: '/StartCity',
//     name: '스마트시티',
//     redirect: '/StartCity/Info'
//   },
//   {
//     path: '/StartCity/Info',
//     name: '스마트시티 소개글',
//     component: SmartCity,
//   },
//   {
//     path: '/StartCity/D-LAB',
//     component: DLAB,
//     children: [
//       {
//         path: '',
//         name: 'D-LAB',
//         component: DLABView,
//       },
//       {
//         path: 'Chart',
//         name: 'D-LAB 운영통계',
//         component: DLABChart,
//       },
//       {
//         path: 'Media/:id',
//         name: 'D-LAB 영상시청',
//         props: true,
//         component: DLABMediaView,
//       },
//       {
//         path: 'Reservation',
//         name: 'D-LAB 예약 정보 입력',
//         component: DLABReservation,
//       },
//       {
//         path: 'Survey/:id',
//         name: 'D-LAB 설문지 작성',
//         props: true,
//         component: DLABWrite,
//       },
//     ]
//   },
//   {
//     path: '/StartCity/PublicHearing',
//     component: PublicHearing,
//     children: [
//       {
//         path: '',
//         name: '주민공청회 리스트',
//         component: PublicHearingList,
//       },
//       {
//         path: ':id',
//         name: '주민공청회 상세정보',
//         props: true,
//         component: PublicHearingView,
//       },
//       {
//         path: ':id/Survey/:post',
//         name: '주민공청회 설문지 작성',
//         props: true,
//         component: PublicHearingWrite,
//       },
//       {
//         path: ':id/Result/:post',
//         name: '주민공청회 설문지 결과',
//         props: true,
//         component: PublicHearingResult,
//       },
//       {
//         path: ':id/Media/:post',
//         name: '주민공청회 영상시청',
//         props: true,
//         component: PublicHearingMediaView,
//       },
//     ]
//   },
//   // Footer
//   {
//     path: '/Info1',
//     name: '개인정보처리방침',
//     component: FooterInfo1,
//   },
//   {
//     path: '/Info2',
//     name: '저작권정책',
//     component: FooterInfo2,
//   },
//   {
//     path: '/Info3',
//     name: '이메일무단수집거부',
//     component: FooterInfo3,
//   },
//   {
//     path: '/Info4',
//     name: '홈페이지 개선의견',
//     component: FooterInfo4,
//   },
//   {
//     path: '/Info5',
//     name: '전화번호 안내',
//     component: FooterInfo5,
//   },
//   {
//     path: '/Info6',
//     name: '찾아오시는 길',
//     component: FooterInfo6,
//   },

//   // Other
//   {
//     path: '/Development',
//     name: '개발자 페이지',
//     component: Development,
//   },
//   {
//     path: '/404',
//     name: '404',
//     component: Page404,
//   },
//   {
//     path: '*',
//     redirect: '/404'
//   }
// ];

// const router = new VueRouter({
//   // mode: 'history',
//   routes
// });

// export default router;





import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const routes = [
  {
    path: '/',
    name: '',
    component: () => import('@/pages/Main')
  },

  // Header
  {
    path: '/SignIn',
    name: '로그인',
    component: () => import('@/pages/Sign/In/index')
  },
  {
    path: '/SignUp',
    name: '회원가입',
    component: () => import('@/pages/Sign/Up/index')
  },

  // 부평11번가
  {
    path: '/Bupyeong',
    redirect: '/Bupyeong/1'
  },
  {
    path: '/Bupyeong/:id',
    name: '부평11번가',
    props: true,
    component: () => import('@/pages/1/Bupyeong'),
    children: [
      {
        path: '1',
        name: '굴포천 재생사업',
      },
      {
        path: '2',
        name: '혁신센터 및 푸드플랫폼 구축사업',
      },
      {
        path: '3',
        name: '굴포먹거리타운 사업',
      },
      {
        path: '4',
        name: '굴포하늘길 조성사업',
      },
      {
        path: '5',
        name: '도시숲 조성사업',
      },
      {
        path: '6',
        name: '부평문화의거리 연장사업',
      },
      {
        path: '7',
        name: '구청중심 공공문화 공간',
      },
    ]
  },

  // 뉴딜참여
  {
    path: '/Newdeal',
    name: '뉴딜참여',
    redirect: '/Newdeal/Notice',
  },
  {
    path: '/Newdeal/Notice',
    component: () => import('@/pages/2/Notice/index'),
    children: [
      {
        path: '',
        name: '공지사항 리스트',
        component: () => import('@/pages/2/Notice/List')
      },
      {
        path: 'write',
        name: '공지사항 작성',
        component: () => import('@/pages/2/Notice/Write')
      },
      {
        path: ':id',
        name: '공지사항 상세정보',
        props: true,
        component: () => import('@/pages/2/Notice/View')
      },
    ]
  },
  {
    path: '/Newdeal/University',
    component: () => import('@/pages/2/University/index'),
    children: [
      {
        path: '',
        name: '도시재생대학 과정 리스트',
        component: () => import('@/pages/2/University/ProcessList')
      },
      {
        path: ':id',
        name: '도시재생대학 과정 상세',
        props: true,
        component: () => import('@/pages/2/University/ProcessView')
      },
      {
        path: ':id/Class/Write',
        name: '도시재생대학 강의 생성',
        props: true,
        component: () => import('@/pages/2/University/ClassWrite')
      },
      {
        path: ':id/ClassEdit/:post',
        name: '도시재생대학 강의 수정',
        props: true,
        component: () => import('@/pages/2/University/ClassWrite')
      },
      {
        path: ':id/Class/:post',
        name: '도시재생대학 강의 시청',
        props: true,
        component: () => import('@/pages/2/University/MediaView')
      },
      {
        path: ':id/Task/:post',
        name: '도시재생대학 과제 상세정보',
        props: true,
        component: () => import('@/pages/2/University/TaskView')
      },
      {
        path: ':id/Student/:post',
        name: '도시재생대학 수강생 상세정보',
        props: true,
        component: () => import('@/pages/2/University/StudentView')
      },
    ]
  },
  {
    path: '/Newdeal/ResidentBusiness',
    component: () => import('@/pages/2/ResidentBusiness/index'),
    children: [
      {
        path: '',
        name: '주민공모사업 리스트',
        component: () => import('@/pages/2/ResidentBusiness/List')
      },
      {
        path: ':id/Request',
        name: '주민공모사업 신청',
        props: true,
        component: () => import('@/pages/2/ResidentBusiness/Request')
      },
      {
        path: ':id',
        name: '주민공모사업 상세정보',
        props: true,
        component: () => import('@/pages/2/ResidentBusiness/View')
      }
    ]
  },
  {
    path: '/Newdeal/Survey',
    component: () => import('@/pages/2/Survey/index'),
    children: [
      {
        path: '',
        name: '설문지 리스트',
        component: () => import('@/pages/2/Survey/List')
      },
      {
        path: ':id',
        name: '설문지 페이지',
        props: true,
        component: () => import('@/pages/2/Survey/Write')
      },
      {
        path: ':id/Result',
        name: '설문지 결과',
        props: true,
        component: () => import('@/pages/2/Survey/Result')
      },
      {
        path: ':id/Result/:post',
        name: '설문지 텍스트 결과',
        props: true,
        component: () => import('@/pages/2/Survey/ResultList')
      },
    ]
  },
  {
    path: '/Newdeal/ResidentCommunity',
    component: () => import('@/pages/2/ResidentCommunity/index'),
    children: [
      {
        path: '',
        name: '공동체 리스트',
        component: () => import('@/pages/2/ResidentCommunity/List')
      },
      {
        path: ':id',
        name: '공동체 게시글 리스트',
        props: true,
        component: () => import('@/pages/2/ResidentCommunity/CommunityPostList'),
      },
      {
        path: ':id/Write',
        name: '공동체 게시글 작성',
        props: true,
        component: () => import('@/pages/2/ResidentCommunity/Write')
      },
      {
        path: ':id/:post',
        name: '공동체 게시글 상세정보',
        props: true,
        component: () => import('@/pages/2/ResidentCommunity/View')
      },
    ]
  },
  {
    path: '/Newdeal/BusinessPromotion',
    component: () => import('@/pages/2/BusinessPromotion/index'),
    children: [
      {
        path: '',
        name: '사업홍보물 리스트',
        component: () => import('@/pages/2/BusinessPromotion/List')
      },
      {
        path: ':id',
        name: '사업홍보물 상세정보',
        props: true,
        component: () => import('@/pages/2/BusinessPromotion/View')
      },
    ]
  },
  {
    path: '/Newdeal/BusinessRecord',
    component: () => import('@/pages/2/BusinessRecord/index'),
    children: [
      {
        path: '',
        name: '사업 리스트',
        component: () => import('@/pages/2/BusinessRecord/List')
      },
      {
        path: ':id',
        name: '기록물 리스트',
        props: true,
        component: () => import('@/pages/2/BusinessRecord/RecordList')
      },
      {
        path: ':id/:post',
        name: '기록물 상세정보',
        props: true,
        component: () => import('@/pages/2/BusinessRecord/View')
      }
    ]
  },
  
  // 재생사업정보
  {
    path: '/Business',
    name: '재생사업정보',
    redirect: '/Business/RecycleInfo'
  },
  {
    path: '/Business/RecycleInfo',
    name: '재생사업정보 소개글',
    component: () => import('@/pages/3/RecycleInfo/index')
  },
  {
    path: '/Business/ContestSchedule',
    component: () => import('@/pages/3/ContestSchedule/index'),
    children: [
      {
        path: '',
        name: '공모사업 리스트',
        component: () => import('@/pages/3/ContestSchedule/List')
      },
      {
        path: ':id',
        name: '공모사업 상세정보',
        props: true,
        component: () => import('@/pages/3/ContestSchedule/View')
      },
    ]
  },
  {
    path: '/Business/List/:id',
    name: '도시재생사업현황',
    props: true,
    component: () => import('@/pages/3/CityRecycleBusiness/index'),
    children: [
      {
        path: '22',
        name: '도시재생 인정 사업',
      },
      {
        path: '23',
        name: '도시재생 예비 사업',
      },
      {
        path: '24',
        name: '새뜰마을 사업',
      },
      {
        path: '25',
        name: '희망지 사업',
      },
      {
        path: '26',
        name: '더불어 마을 사업',
      },
      {
        path: '27',
        name: '도시재생 활성화 지역',
      },
    ]
  },

  // 상권활성화
  {
    path: '/Food',
    name: '상권활성화',
    redirect: '/Food/Platform'
  },
  {
    path: '/Food/Platform',
    component: () => import('@/pages/4/Platform/index'),
    children: [
      {
        path: '',
        name: '푸드플랫폼 상점 리스트',
        component: () => import('@/pages/4/Platform/List')
      },
      {
        path: ':id/Write',
        name: '푸드플랫폼 소개문구 수정',
        props: true,
        component: () => import('@/pages/4/Platform/Write')
      },
      {
        path: ':id/:post',
        name: '푸드플랫폼 영상시청',
        props: true,
        component: () => import('@/pages/4/Platform/MediaView')
      },
      {
        path: ':id',
        name: '푸드플랫폼 상점 정보',
        props: true,
        component: () => import('@/pages/4/Platform/View')
      },
    ]
  },
  {
    path: '/Food/Town',
    component: () => import('@/pages/4/Town/index'),
    children: [
      {
        path: '',
        name: '굴포먹거리타운 상점 리스트',
        component: () => import('@/pages/4/Platform/List')
      },
      {
        path: ':id/Write',
        name: '굴포먹거리타운 소개문구 수정',
        props: true,
        component: () => import('@/pages/4/Platform/Write')
      },
      {
        path: ':id/:post',
        name: '굴포먹거리타운 영상시청',
        props: true,
        component: () => import('@/pages/4/Platform/MediaView')
      },
      {
        path: ':id',
        name: '굴포먹거리타운 상점 정보',
        props: true,
        component: () => import('@/pages/4/Platform/View')
      },
    ]
  },

  // 스마트시티
  {
    path: '/StartCity',
    name: '스마트시티',
    redirect: '/StartCity/D-LAB'
  },
  // {
  //   path: '/StartCity/Info',
  //   name: '스마트시티 소개글',
  //   component: () => import('@/pages/5/Info/index')
  // },
  // {
  //   path: '/StartCity/MediaGlass',
  //   name: '미디어글라스',
  //   component: () => import('@/pages/5/MediaGlass/index')
  // },
  {
    path: '/StartCity/D-LAB',
    component: () => import('@/pages/5/D-LAB/index'),
    children: [
      {
        path: '',
        name: 'D-LAB',
        component: () => import('@/pages/5/D-LAB/View')
      },
      {
        path: 'Chart',
        name: 'D-LAB 운영통계',
        component: () => import('@/pages/5/D-LAB/Chart')
      },
      {
        path: 'Media/:id',
        name: 'D-LAB 영상시청',
        props: true,
        component: () => import('@/pages/5/D-LAB/MediaView')
      },
      {
        path: 'Reservation',
        name: 'D-LAB 예약 정보 입력',
        component: () => import('@/pages/5/D-LAB/Reservation')
      },
      {
        path: 'Survey/:id',
        name: 'D-LAB 설문지 작성',
        props: true,
        component: () => import('@/pages/5/D-LAB/Write')
      },
    ]
  },
  {
    path: '/StartCity/PublicHearing',
    component: () => import('@/pages/5/PublicHearing/index'),
    children: [
      {
        path: '',
        name: '주민공청회 리스트',
        component: () => import('@/pages/5/PublicHearing/List')
      },
      {
        path: ':id',
        name: '주민공청회 상세정보',
        props: true,
        component: () => import('@/pages/5/PublicHearing/View')
      },
      {
        path: ':id/Survey/:post',
        name: '주민공청회 설문지 작성',
        props: true,
        component: () => import('@/pages/5/PublicHearing/Write')
      },
      {
        path: ':id/Result/:post',
        name: '주민공청회 설문지 결과',
        props: true,
        component: () => import('@/pages/5/PublicHearing/Result')
      },
      {
        path: ':id/Media/:post',
        name: '주민공청회 영상시청',
        props: true,
        component: () => import('@/pages/5/PublicHearing/MediaView')
      },
    ]
  },
  // Footer
  {
    path: '/Info1',
    name: '개인정보처리방침',
    component: () => import('@/pages/Footer/Info1'),
  },
  {
    path: '/Info2',
    name: '저작권정책',
    component: () => import('@/pages/Footer/Info2'),
  },
  {
    path: '/Info3',
    name: '이메일무단수집거부',
    component: () => import('@/pages/Footer/Info3'),
  },
  {
    path: '/Info4',
    name: '홈페이지 개선의견',
    component: () => import('@/pages/Footer/Info4'),
  },
  {
    path: '/Info5',
    name: '전화번호 안내',
    component: () => import('@/pages/Footer/Info5'),
  },
  {
    path: '/Info6',
    name: '찾아오시는 길',
    component: () => import('@/pages/Footer/Info6'),
  },

  // Other
  {
    path: '/Development',
    name: '개발자 페이지',
    component: () => import('@/pages/Development')
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/404'),
  },
  {
    path: '*',
    redirect: '/404'
  }
];

const router = new VueRouter({
  // mode: 'history',
  routes
});

export default router;