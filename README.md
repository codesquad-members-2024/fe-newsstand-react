# fe-newsstand-react

## 기능 요구사항

- 주차별 완성해야할 기능의 범위를 sprint단위로 설정
- 1주차
  - []
- 2주차
  - []

## 프로그래밍 요구사항

- vite 기반 환경설정 + Styled-component
- Component 설계 및 구현
  - 전체 기획서 분량을 모두 설계완료 하지 않는다.
  - 전체 구조는 방향성만 수립하고, 세부 모듈을 설계 한다.
  - 컴포넌트는 트리 구조를 상상하며 만들고, 이를 시각적으로 표현한다.(종이도 OK)
  - 기본 컴포넌트는 모두 함수 형태로 개발(Hooks API를 익히는 의미)
  - 객체표현이 필요한 경우는 클래스형태 사용하는 것은 허용.
- 상태관리
  - 상태관리를 위해서 React useState를 기본으로 먼저 사용해본다. 이후 복잡한 상태의 처리를 위해 useReducer를 사용.
  - props drilling 문제가 보이면 Context API를 적용해본다.
- 기타 리액트 훅 API
  - useEffect를 통해서 사이드이팩트 처리를 한다(데이터 통신등)
  - 기타 리액트가 제공하는 다양한 훅을 선택적으로 사용한다.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
