# StockHub — 스마트한 투자의 시작

웹프로그래밍기초 **기말 과제** 프로젝트입니다. 중간고사에서 HTML5·CSS3로 만든 정적 주식 정보 페이지를, 기말에서 **JavaScript와 jQuery**를 추가해 시세가 실시간으로 변동하고 사용자가 검색·필터·관심종목·회원가입/로그인까지 할 수 있는 **동적 웹사이트**로 발전시켰습니다.

- **학과/학번/성명**: 인공지능소프트웨어학과 · 2601110293 · 유성원
- **대상 종목**: 국내 10종목 · 해외 5종목 (총 15종목) + 4대 지수(KOSPI·KOSDAQ·S&P500·NASDAQ)

## 사용 기술

- HTML5, CSS3 (반응형 레이아웃, 다크모드)
- JavaScript (ES5/ES6 기본 문법 — 객체·배열·반복문·함수)
- jQuery 3.7.1 (CDN)

## 주요 기능

- 종목 카드·상세 모달 동적 생성 (배열/객체 + 반복문)
- 뉴스 목록·모달 동적 생성
- 오늘의 추천 종목 슬라이더 (자동/수동 전환, 마우스 오버 시 정지)
- 실시간 시세 변동 (setInterval + Math.random, 상승 빨강 / 하락 파랑)
- 실시간 시계 · 인기 검색어 · 통계 카운트업
- 종목 검색 + 국내/해외/관심 필터
- 관심종목 ♥ 토글 및 개수 표시
- jQuery 모달 팝업 (오버레이·X·ESC로 닫기)
- 회원가입/로그인 유효성 검사 + 로그인 상태 표시 + Enter 포커스 이동
- 다크모드 전환
- 스크롤 등장 애니메이션 · 맨 위로 가기

## 폴더 구조

```
web/
├── index.html       메인 페이지
├── css/style.css    스타일 (반응형 + 다크모드)
├── js/script.js     JavaScript / jQuery 동작
└── images/          종목 로고 등 이미지
```

## 실행 방법

`web/index.html` 파일을 브라우저에서 열면 됩니다. (jQuery는 CDN으로 로드되므로 인터넷 연결 필요)

## 링크

- **GitHub**: https://github.com/yoosw0522/my-stock-site
- **Figma 디자인**: https://www.figma.com/design/vDWU4GhTzbbjywbGj5XSdA/2026_%EC%9B%B9%EA%B3%BC%EC%A0%9C_%EC%9C%A0%EC%84%B1%EC%9B%90

---
&copy; 2026 StockHub Project · 유성원
