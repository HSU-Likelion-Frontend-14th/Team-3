# Week9 Product Shop

Zustand와 React Query를 활용해 구현한 상품 목록/장바구니 실습 프로젝트입니다.

## 프로젝트 개요

- 카테고리별 상품 목록 조회
- 장바구니 담기/수량 변경/삭제
- 주문하기(비동기 처리) 및 주문 완료 화면
- 카테고리별 합계 통계 표시

## 기술 스택

- React
- Vite
- Zustand
- @tanstack/react-query
- SCSS

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 기본 개발 서버 주소로 접속해 확인할 수 있습니다.

## 빌드

```bash
npm run build
npm run preview
```

## 폴더 구조

```text
src/
	api/            # 상품 조회/주문 API 모의 함수
	components/     # UI 컴포넌트
	data/           # 상품 원본 데이터
	store/          # Zustand 스토어
	App.jsx         # 페이지 조합 및 상태 연결
	main.jsx        # React Query Provider 설정
```

## 주요 구현 포인트

1. 상태 관리
- 장바구니(cart), 선택 카테고리(selectedCategory)를 Zustand로 관리합니다.

2. 서버 상태 관리
- 상품 목록은 `useQuery`로 조회하고 `staleTime`을 설정해 재조회 시 UX를 개선했습니다.
- 주문하기는 `useMutation`으로 처리하고 성공 시 장바구니를 비웁니다.

3. 렌더링 최적화
- `React.memo` + `useCallback`으로 상품 카드의 불필요한 리렌더링을 줄였습니다.
- `useMemo`로 장바구니 합계 및 카테고리별 통계를 계산합니다.

4. 사용자 경험
- 품절 상품은 담기 버튼을 비활성화합니다.
- 주문 성공 시 알림창 대신 주문 완료 화면을 표시합니다.
