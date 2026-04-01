# 김헌영 포트폴리오 - Week2 (React + SCSS)

**Week1의 HTML/CSS 기반 자기소개 페이지를 React와 SCSS로 재구현한 프로젝트입니다.**

---

## 🛠️ 기술 스택

### **Frontend Framework & Build Tool**
- **React** v19.2.4 - UI 라이브러리
- **Vite** v8.0.1 - 고속 번들러 (번들 속도: ~400ms)
- **SCSS/SASS** v1.98.0 - CSS 전처리기

### **Development Tools**
- **ESLint** v9.39.4 - 코드 품질 검사
- **@vitejs/plugin-react** v6.0.1 - Vite React 플러그인

### **Dependencies**
```json
{
  "react": "^19.2.4",
  "react-dom": "^19.2.4",
  "sass": "^1.98.0"
}
```

---

## 📁 프로젝트 구조

```
Week2/
├── src/
│   ├── components/              # React 컴포넌트
│   │   ├── Header.jsx           # 헤더 네비게이션
│   │   ├── Hero.jsx             # 히어로 배너
│   │   ├── About.jsx            # ABOUT 섹션
│   │   ├── ProfileCard.jsx      # 프로필 카드
│   │   ├── InfoBlock.jsx        # 정보 블록
│   │   ├── Hobby.jsx            # HOBBY 섹션
│   │   └── HobbyCard.jsx        # 취미 카드
│   ├── styles/                  # SCSS 스타일
│   │   ├── index.scss           # 전역 변수 & mixin
│   │   ├── App.scss             # App 레이아웃
│   │   └── components/
│   │       ├── Header.scss
│   │       ├── Hero.scss
│   │       ├── About.scss
│   │       ├── ProfileCard.scss
│   │       ├── InfoBlock.scss
│   │       ├── Hobby.scss
│   │       └── HobbyCard.scss
│   ├── assets/                  # 이미지 자산
│   │   ├── food.jpg
│   │   ├── film.jpg
│   │   └── japan.jpg
│   ├── App.jsx                  # 메인 App 컴포넌트
│   └── main.jsx                 # React 엔트리포인트
├── public/                      # 공개 정적 파일
├── index.html                   # HTML 진입점
├── vite.config.js               # Vite 설정
├── package.json                 # 프로젝트 의존성
└── README.md
```

---

## ⚛️ React 컴포넌트 구조

### **기능 단위 분리**

#### 1. **Header 컴포넌트**
```jsx
// src/components/Header.jsx
function Header() {
  const navLinks = [
    { label: 'ABOUT', href: '#about' },
    { label: 'HOBBY', href: '#hobby' },
    { label: 'CONTACT', href: '#contact' },
  ]
  
  return (
    <header className="site-header">
      <a href="#top" className="logo">PORTFOLIO.</a>
      <nav className="main-nav">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href}>{link.label}</a>
        ))}
      </nav>
    </header>
  )
}
```

**특징**: `map()` 함수로 네비게이션 링크 동적 렌더링

---

#### 2. **Hero 컴포넌트**
```jsx
// src/components/Hero.jsx
function Hero() {
  return (
    <section className="hero" id="top">
      <h1>
        안녕하세요!<br />
        제 이름은 김헌영 입니다.<br />
        소통하는 개발자가 되고 싶어요.
      </h1>
    </section>
  )
}
```

**특징**: 정적 콘텐츠, SCSS로 반응형 타이포그래피 처리

---

#### 3. **About & 하위 컴포넌트**
```jsx
// src/components/About.jsx
function About() {
  const infoBlocks = [
    { title: 'EDUCATION', lines: ['한성대학교 컴퓨터공학부', '2021.03~2027.02'] },
    { title: 'SKILLS', lines: ['JavaScript', 'React', 'Java', 'Spring'] },
    // ...
  ]
  
  return (
    <section className="section" id="about">
      <h2 className="section-title">ABOUT</h2>
      {infoBlocks.map((block) => (
        <InfoBlock key={block.title} title={block.title} lines={block.lines} />
      ))}
    </section>
  )
}
```

**특징**: 
- **Props 활용**: `ProfileCard`, `InfoBlock`에 데이터 전달
- **map() 사용**: 정보 블록 배열 반복 렌더링
- **하위 컴포넌트**: `ProfileCard`, `InfoBlock` 재사용

---

#### 4. **Hobby 컴포넌트**
```jsx
// src/components/Hobby.jsx
function Hobby() {
  const hobbies = [
    { title: '맛있는 음식 먹기', imageSrc: foodImage, imageAlt: '맛있는 음식 사진' },
    { title: '필름 사진 찍기', imageSrc: filmImage, imageAlt: '필름 카메라로 찍은 사진' },
    { title: '여행가기', imageSrc: japanImage, imageAlt: '일본 여행 사진' },
  ]
  
  return (
    <section className="section" id="hobby">
      <div className="hobby-grid">
        {hobbies.map((hobby) => (
          <HobbyCard key={hobby.title} {...hobby} />
        ))}
      </div>
    </section>
  )
}
```

**특징**:
- **로컬 이미지 import**: `src/assets/` 경로에서 이미지 가져오기
- **Props 스프레딩**: `{...hobby}` 문법으로 객체 전개
- **map() + key**: 안전한 리스트 렌더링

---

## 🎨 SCSS 작업 방식

### **1. 변수 정의 (index.scss)**

```scss
// src/styles/index.scss
$blue: #4a86ff;
$bg: #f3f5ff;
$text-main: #000000;
$text-muted: #626682;
$text-soft: #484a64;
$line: #ebedf8;
$white: #ffffff;

$font-family: 'Inter', 'Noto Sans KR', sans-serif;
```

**관리**: 모든 색상을 변수로 중앙화하여 **일관성** 유지

---

### **2. Mixin 활용 (재사용 가능한 스타일 블록)**

```scss
// src/styles/index.scss

@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin grid-layout($columns) {
  display: grid;
  grid-template-columns: $columns;
}

@mixin responsive-width {
  width: min(1180px, calc(100% - 64px));
  margin: 0 auto;
}

@mixin card-style {
  border: 1px solid $line;
  border-radius: 16px;
  background: $white;
}
```

**사용 예**:
```scss
// src/styles/components/Header.scss
.header-inner {
  height: 100%;
  @include flex-center;           // mixin 사용
  justify-content: space-between;
}

.about-layout {
  @include grid-layout(380px 1fr); // 파라미터 전달
  gap: 40px;
}
```

---

### **3. 중첩 (Nesting) 구조**

```scss
// src/styles/components/Hobby.scss
.hobby-card {
  height: 377px;
  @include card-style;
  overflow: hidden;

  h3 {
    @include flex-center;
    background: $blue;
    font-size: 32px;
  }

  img {
    object-fit: cover;
    margin: 37px auto 0;
  }
}
```

**장점**: 선택자 계층이 명확하고 유지보수 용이

---

### **4. 반응형 디자인 (Mobile-First)**

```scss
// 데스크톱 기본 스타일
.hero h1 {
  font-size: 80px;
  line-height: 1.5;
}

// 태블릿 (1440px 이하)
@media (max-width: 1440px) {
  .hero h1 {
    font-size: 56px;
  }
}

// 모바일 (1024px 이하)
@media (max-width: 1024px) {
  .hero {
    min-height: 440px;
  }
}

// 소형 모바일 (640px 이하)
@media (max-width: 640px) {
  .hero h1 {
    font-size: 32px;
  }
}
```

**전략**:
- 3단계 브레이크포인트: 1440px, 1024px, 640px
- 모든 섹션에 일관된 반응형 규칙 적용
- `min()` 함수로 최대 너비 제한: `width: min(1180px, calc(100% - 64px))`

---

### **5. SCSS 파일 분할 구조**

```
src/styles/
├── index.scss           # 전역 변수/mixin (다른 파일에서 @use로 import)
├── App.scss             # 앱 전체 레이아웃 (.content-wrap)
└── components/
    ├── Header.scss      # @use '../index.scss' as *;로 변수/mixin 사용
    ├── Hero.scss
    ├── About.scss
    ├── ProfileCard.scss
    ├── InfoBlock.scss
    ├── Hobby.scss
    └── HobbyCard.scss
```

**import 패턴**:
```scss
@use '../index.scss' as *;  // 상위 폴더의 변수/mixin 접근
```

---

## 🚀 설치 및 실행

### **1. 설치**
```bash
npm install
```

### **2. 개발 서버 실행**
```bash
npm run dev
```
→ 브라우저에서 `http://localhost:5173` 접속

### **3. 빌드 (배포)**
```bash
npm run build
```
→ `dist/` 폴더에 최소화된 번들 생성

### **4. 린트 검사**
```bash
npm run lint
```
→ ESLint로 코드 품질 확인

---

## 📋 학습 포인트

✅ **React 기초**
- 함수형 컴포넌트 작성
- Props를 통한 데이터 전달
- `map()` 함수로 동적 렌더링 및 key 설정

✅ **SCSS/SASS 활용**
- 변수로 디자인 토큰 관리
- Mixin으로 재사용 가능한 스타일 블록 작성
- 중첩 구조로 선택자 계층 명확화
- 3단계 반응형 디자인 구현

✅ **컴포넌트 설계**
- 기능 단위로 컴포넌트 분리
- 상위 컴포넌트에서 데이터 관리
- 하위 컴포넌트는 Props만 받아 렌더링 (단일 책임)

---

## 📦 커밋 히스토리

```
fbc7cb9 - feat: Hobby 섹션 컴포넌트 및 이미지 렌더링 구현
9d17286 - feat: About 섹션 컴포넌트 및 SCSS 구현
47d89fe - feat: Hero 컴포넌트 구현
a08a83e - feat: Header 컴포넌트 구현
72e0329 - chore: 리액트 엔트리와 SCSS 기본 구조 초기화
```

**커밋 전략**: 각 섹션(Header, Hero, About, Hobby)을 독립적인 기능 단위로 나누어 커밋하여 **히스토리 추적성** 향상

---

## 📌 주요 파일 설명

| 파일 | 설명 |
|------|------|
| `src/App.jsx` | Header, Hero, About, Hobby 조합 |
| `src/styles/index.scss` | 디자인 시스템 (변수, mixin) |
| `src/components/` | 재사용 가능한 UI 컴포넌트 |
| `src/assets/` | 로컬 이미지 저장소 |
| `vite.config.js` | Vite 번들러 설정 |

---

## ✨ 특징

- ✅ **컴포넌트 기반 구조**: 재사용 가능하고 유지보수 용이
- ✅ **SCSS 중앙화**: 변수/mixin으로 일관된 스타일 관리
- ✅ **반응형 디자인**: 3단계 브레이크포인트로 모든 디바이스 대응
- ✅ **빠른 개발**: Vite의 HMR(Hot Module Replacement)로 즉시 반영
- ✅ **기능 단위 커밋**: 명확한 커밋 히스토리
