# SpringBoot2 & ReactJS Boilerplate

## 목적

- SpringBoot2 & ReactJS를 사용하는 환경에서 신속히 개발환경을 구축하기 위함

## 샘플 애플리케이션

- 입력된 인사말(단어)을 저장하는 간단한 Application

## 사용 프레임워크

- back-end: SpringBoot2, JPA, QueryDsl
- front-end: ReactJS, Redux Toolkit, Ant Design

## 실행 방법

1. 저장소 clone

```
git clone https://github.com/sogoagain/springboot-react-boilerplate.git
cd springboot-react-boilerplate/
```

2. front-end build

```
cd frontend
npm install
npm run build
```

3. back-end build

```
cd ../boilerplate-web
gradle boilerplate-common:bootRun
```
