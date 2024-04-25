# fe-newsstand-react

### 이번주 목표 ✨✨

- [x] 컴포넌트 이해
- [ ] react 라이프 사이클 이해
- [ ] useState, useEffect만 사용하고 이해하기

### 제공 기능 🏓

1. 기본 화면

   - [x] 뉴스스탠드 아이콘
   - [x] 뉴스스탠드 제목
   - [x] 시스템 날짜 (YYYY. MM. DD. DAY)
   - [ ] 최신 뉴스 자동 롤링 영역
   - [x] 탭 : 전체언론사(디폴트), 내가 구독한 언론사
   - [ ] 탭: 그리드 보기(디폴트), 리스트 보기
   - [x] 그리드보기 : 6 x 4 형태로 언론사 이미지 로고를 보여줌
   - [ ] 리스트보기
     - [ ] 각 분야 카테고리 탭(종합/경제, 방송/통신, IT, 과학, 영자지, 스포츠/연예, 매거진/전문지, 지역)
     - [ ] 언론사 이미지 로고
     - [ ] 편집 날짜 (YYYY. MM. DD. hh:mm 편집)
     - [ ] 구독하기 버튼
     - [ ] 대표 뉴스 이미지 & 헤드라인
     - [ ] 언론사 기사 목록
     - [ ] ${언론사이름} 언론사에서 직접 편집한 뉴스입니다.
   - [ ] 스와이퍼 버튼

2. 제공 기능

   - [x] 뉴스스탠드 아이콘 클릭 시, 새로고침
   - [x] 시스템 날짜 노출
   - [ ] 최신 뉴스 롤링 기능
   - [x] 탭 전환 기능 (전체언론사, 내가 구독한 언론사), (그리드 보기, 리스트 보기)
   - [x] 그리드 뷰
     - [x] 구독하기 기능(클릭하면 구독한 언론사로 이동, 해지하기로 상태 변경)

### 프로젝트 구조

---

```
├── README.md
├── index.html
├── note.md
├── package.json
├── public
├── server
│   ├── datas
│   │   ├── images.json
│   │   ├── news.json
│   │   └── subscription.json
│   └── server.js
├── src
│   ├── App.jsx
│   ├── apis
│   │   └── newsApiHandler.js
│   ├── assets
│   ├── main.jsx
│   ├── styles
│   │   └── globalStyle.js
│   ├── ui
│   │   ├── ButtonSubscribe.jsx
│   │   ├── Header.jsx
│   │   ├── Icon.jsx
│   │   ├── ModalUnsubscribe.jsx
│   │   ├── PressItem.jsx
│   │   ├── PressListContainer.jsx
│   │   ├── TableLine.jsx
│   │   └── TodayDate.jsx
│   └── utility
│       └── utils.js
└── vite.config.js

```
