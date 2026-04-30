# Week5 React 인증/게시판 실습

Week5는 Vite + React 기반으로 인증 화면(회원가입/로그인)과 게시판 기능을 확장한 실습 프로젝트입니다.
기존 구조를 유지하면서 폼 유효성 검사, storage 연동, 게시글 수정/삭제 UX를 고도화했습니다.

## 1. 실행 방법

```bash
npm install
npm run dev
```

- 기본 개발 서버: `http://localhost:5173`
- 포트 충돌 시 Vite가 자동으로 다음 포트로 실행됩니다.

## 2. 빌드 방법

```bash
npm run build
npm run preview
```

## 3. 라우팅

- `/` : 홈
- `/board` : 게시판
- `/signup` : 회원가입
- `/login` : 로그인

## 4. 주요 기능

### 4.1 회원가입(Signup)
- `react-hook-form`으로 `username`, `email`, `password`, `confirmPassword`를 제어
- 실시간 유효성 검사
  - 이메일 `@` 포함 여부
  - 비밀번호 8자 이상
  - 비밀번호/비밀번호 확인 일치 여부
- 조건부 에러 메시지 렌더링
- 제출 성공 시 회원정보를 `sessionStorage`에 저장 후 `/login` 이동

### 4.2 로그인(Login)
- `useState`로 `email`, `password`를 제어
- 실시간 유효성 검사 및 조건부 에러 메시지
- `sessionStorage`에 저장된 회원정보와 입력값을 비교해 로그인 검증
- 회원정보 일치 시 `/` 이동

### 4.3 게시판(Board)
- 게시글 작성: 제목/내용 필수 검증
- 게시글 삭제: 확인 토스트 후 삭제, 성공 토스트 표시
- 게시글 수정:
  - 수정 버튼 클릭 시 확인 토스트
  - 인라인 편집 모드 전환 후 제목/내용 수정
  - 수정 완료 시 성공 토스트 표시
- `localStorage` 연동
  - 초기 목록을 `localStorage(posts)`에서 로드
  - 작성/수정/삭제 시 `localStorage` 동기화
- 토스트 혼잡 제어:
  - 우선순위 및 중복 표시 제어
  - 버튼 근처 로컬 경고 메시지 처리

## 5. 기술 스택

- React
- React Router DOM
- React Toastify
- Sass (SCSS)
- Vite
- Iconify (`@iconify/react`)

## 6. 스타일링 구조

- 전역 스타일: `src/index.scss`
- 페이지 스타일: `src/styles/pages/*.scss`
- 공통 컴포넌트 스타일: `src/styles/components/*.scss`
- 네이밍: BEM 스타일(`block__element--modifier`) 중심

## 7. 폴더 구조

```text
Week5/
  index.html
  package.json
  vite.config.js
  src/
    main.jsx
    App.jsx
    index.scss
    components/
      Header.jsx
    pages/
      Home.jsx
      Board.jsx
      Signup.jsx
      Login.jsx
      components/
        BoardForm.jsx
        BoardList.jsx
        BoardItem.jsx
    styles/
      components/
        Header.scss
      pages/
        Home.scss
        Board.scss
        Signup.scss
        Login.scss
```

## 8. Week5 작업 포인트

- 기존 Week4 구조를 기반으로 storage 연동과 검증 로직을 강화
- 게시판에 `localStorage`를 연동해 데이터 영속성을 추가
- 회원가입/로그인에 `sessionStorage` 기반 인증 흐름을 추가
- `react-hook-form` 기반 실시간 유효성 검사와 조건부 에러 메시지 적용

## 9. 다음 개선 아이디어

- 인증 상태(로그인 여부) 전역 관리
- 게시글 데이터 영속화(localStorage 또는 API 연동)
- 에러 메시지/토스트 문구 정책 통일
- 폼 유효성 검사 로직을 커스텀 훅으로 분리
