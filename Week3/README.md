# Week3 React 게시판 실습

Vite + React 기반의 3주차 실습 프로젝트입니다.
라우팅, 게시판 CRUD(현재는 추가/삭제), 그리고 토스트 기반 UX를 포함합니다.

## 1. 실행 방법

```bash
npm install
npm run dev
```

- 기본 개발 서버: `http://localhost:5173`
- 포트 충돌 시 Vite가 자동으로 다음 포트를 사용합니다.

## 2. 빌드 방법

```bash
npm run build
npm run preview
```

## 3. 주요 기능

- 라우팅
  - `/` : 홈
  - `/board` : 게시판
  - `/signup` : 회원가입
- 게시글 작성
  - 제목/내용 필수 검증
  - 검증 실패 시 `toast.warning` 표시
- 게시글 삭제
  - 삭제 버튼 클릭 시 확인 토스트 표시
  - 확인 토스트가 열린 동안 다른 게시물 삭제 클릭 시, 클릭한 버튼 위에 로컬 경고 표시
  - 삭제 완료 시 짧은 성공 토스트 표시

## 4. 기술 스택

- React
- React Router DOM
- React Toastify
- Sass (scss)
- Vite
- Iconify (@iconify/react)

## 5. 폴더 구조

```text
Week3/
  index.html
  package.json
  vite.config.js
  src/
    App.jsx
    main.jsx
    index.scss
    components/
      Header.jsx
    pages/
      Home.jsx
      Board.jsx
      Signup.jsx
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
```

## 6. 작업 메모

- 전역 `alert` 기반 UX를 토스트 중심으로 전환
- 삭제 UX는 "한 번에 하나의 확인 흐름"을 유지하도록 정리
- 스타일은 페이지/컴포넌트 단위 SCSS로 분리

## 7. 작업 타임라인 (실제 커밋 순서)

이번 주차 작업은 "기본 구조 -> 페이지 스타일 -> 게시판 기능 -> 헤더 고도화 -> 토스트 UX 보완" 순서로 진행되었습니다.

1. `62c4539` - `chore(week3): 기본 상태 구조 생성`
  - Week3 기본 소스 트리 생성
  - `App.jsx`, `Header.jsx`, `Home.jsx`, `Board.jsx`, `Signup.jsx` 초기 라우팅 골격 준비

2. `0577a61` - `feat(board): BoardForm 작성 폼 반영`
  - 게시판 입력 폼 컴포넌트 1차 반영
  - 글 작성 흐름의 시작점 구성

3. `04a05b5` - `chore(week3): Vite 환경 및 엔트리 구조 정리`
  - Vite 실행 환경 정리 (`package.json`, `vite.config.js`, `index.html`)
  - 엔트리 스타일을 `index.css`에서 `index.scss`로 전환
  - 개발/빌드 실행 기반 안정화

4. `bcb57c2` - `feat: 홈/회원가입 화면 스타일 적용`
  - `Home`, `Signup` 페이지를 inline style에서 SCSS 분리 구조로 전환
  - 페이지 단위 스타일 파일 (`Home.scss`, `Signup.scss`) 도입

5. `eca2abe` - `feat(board): 게시판 작성/목록/삭제 기본 기능 구현`
  - `BoardForm`, `BoardList`, `BoardItem` 연결
  - 게시글 상태 관리와 추가/삭제 흐름 구현
  - 게시판 UI SCSS (`Board.scss`) 반영

6. `84a718b` - `style: 헤더 아이콘 네비게이션 스타일 개선`
  - 헤더를 단순 링크에서 아이콘 기반 네비게이션으로 고도화
  - `@iconify/react` 도입 및 `Header.scss` 분리

7. `d96c767` - `fix(board): 삭제 확인 토스트 동작 복구`
  - 삭제 확인 인터랙션을 토스트 기반 UX로 복구
  - `react-toastify` 의존성 및 `ToastContainer` 동작 정리

8. `bd01096` - `feat(board): 삭제 알림 UX를 단일 확인 흐름 + 버튼 근처 안내로 개선`
  - 삭제 알림 우선순위/표시 정책 정리
  - 삭제 중복 클릭 시 안내 피드백 개선
  - 경고/확인/성공 알림의 역할을 분리해 연속 작업 UX 개선

## 8. 다음 개선 후보

- 게시글 수정(편집) 기능 추가
- 게시글 데이터 로컬 스토리지 저장
- 토스트 메시지 타입/문구 정책 문서화

## 9. CSS 작업 상세 스킬

이번 작업에서 CSS는 "빠르게 붙이는 스타일"이 아니라, 기능 확장에 버틸 수 있는 구조를 목표로 작성했습니다.

1. 구조 분리 스킬 (Global vs Page vs Component)
  - 전역 스타일은 `src/index.scss`에 모으고(기본 폰트, box-sizing, 공통 레이아웃)
  - 페이지 스타일은 `src/styles/pages/*.scss`
  - 재사용 가능한 UI 블록은 `src/styles/components/*.scss`로 분리했습니다.
  - 이 분리 덕분에 수정 영향 범위를 예측하기 쉬워졌고, 충돌이 줄었습니다.

2. BEM 기반 네이밍 스킬
  - `board-item__meta`, `board-composer__actions`, `header__link--active`처럼 블록/요소/상태를 명시했습니다.
  - 클래스 이름만 봐도 역할이 드러나므로 유지보수와 협업 시 커뮤니케이션 비용이 낮아집니다.

3. 상태 중심 스타일링 스킬
  - hover/focus/active 상태를 컴포넌트 단위로 정의해 인터랙션 일관성을 맞췄습니다.
  - 토스트 확인 박스와 인라인 경고문도 상태(UI 이벤트)에 따라 나타나도록 설계해 "행동-피드백" 연결을 강화했습니다.

4. 가독성 + 레이아웃 안정화 스킬
  - `min-width: 0`, `white-space: pre-wrap`, `gap` 기반 레이아웃을 사용해 텍스트 길이에 따른 깨짐을 줄였습니다.
  - 버튼/메타/본문 영역을 분리해 게시글 카드의 시각적 계층을 분명히 했습니다.

5. 사용자 피로도 완화 스킬
  - 강한 색상은 액션 버튼에 집중하고, 기본 배경/보더/텍스트는 중립 톤으로 유지했습니다.
  - 토스트/경고 박스는 짧은 메시지, 짧은 노출 시간, 최소한의 그림자/강조로 정보 밀도를 제어했습니다.

6. 반응형 대응 스킬
  - 헤더에서 미디어 쿼리를 사용해 모바일 구간에서는 아이콘/라벨을 단순화했습니다.
  - 데스크톱 인터랙션(확장형 네비게이션)과 모바일 사용성(좁은 폭)을 분리 대응했습니다.

## 10. 기존 구조에서 디벨롭할 때 사용한 스킬

이번 작업은 새 프로젝트를 통째로 갈아엎는 방식이 아니라, 기존 파일을 유지하면서 점진적으로 고도화하는 전략으로 진행했습니다.

1. 점진적 리팩터링 스킬
  - inline style -> SCSS 분리 -> 컴포넌트화 순서로 전환했습니다.
  - 한 번에 큰 변경을 하지 않고 단계를 나눠 회귀 위험을 낮췄습니다.

2. 기능 단위 커밋 스킬
  - "환경 정리", "홈/회원가입 스타일", "게시판 기능", "헤더 개선", "토스트 UX 보완"처럼 기능 단위로 커밋했습니다.
  - 나중에 특정 변경을 추적하거나 롤백하기 쉬운 이력이 만들어졌습니다.

3. 최소 영향 수정 스킬
  - 필요한 파일만 수정하고, 동작을 바꾸지 않는 부분은 유지했습니다.
  - 특히 알림 UX는 요구사항 변경 시에도 핵심 흐름(삭제 확인 -> 실행/취소)은 보존한 채 피드백 방식만 교체했습니다.

4. 우선순위 기반 UX 설계 스킬
  - 알림을 "확인(결정) > 경고(차단 이유) > 성공(결과)"으로 분류해 혼잡을 줄였습니다.
  - 전역 토스트만 고집하지 않고, 문맥이 필요한 피드백은 버튼 근처 로컬 경고로 전환했습니다.

5. 빌드 기반 검증 스킬
  - 주요 변경 후 `npm run build`로 컴파일/번들 기준 회귀를 반복 확인했습니다.
  - 스타일/의존성/컴포넌트 연결 이슈를 조기에 발견하는 데 효과적이었습니다.

6. 의존성 관리 스킬
  - 기능 도입 시 필요한 라이브러리(`react-toastify`, `@iconify/react`, `sass-embedded`)를 명확히 추가/정리했습니다.
  - 사용하지 않는 임시 방식(window alert 등)은 점진적으로 제거해 일관된 기술 스택을 유지했습니다.
