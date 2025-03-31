# 지연이 투두리스트 애플리케이션

## 개요
이 프로젝트는 Next.js로 구현된 프론트엔드와 ASP.NET Core NativeAOT로 구현된 백엔드로 구성된 투두리스트 웹 애플리케이션입니다.

## 기술 스택

### 프론트엔드
- Next.js
- TypeScript
- Tailwind CSS
- MVVM 패턴 적용

### 백엔드
- ASP.NET Core 9 Minimal API (NativeAOT 지원)
- LiteDB (파일 기반 데이터베이스)
- Dapper 및 SqlKata (SQL 쿼리 빌더)
- Reactive Extensions (Rx) 및 Task-based Asynchronous Pattern (TAP)

## 주요 기능
- 월/일 기반 캘린더 뷰
- 투두 목록 조회, 추가, 수정, 삭제
- 미완료된 과거 투두 알림
- 자동 가로 스크롤링 UI 페이징
- 파스텔 톤의 노란색 테마

## 로컬 실행 방법
1. 백엔드 실행 (http://localhost:5000)
   ```
   cd backend/LaurenTodoList.Api
   dotnet run
   ```

2. 프론트엔드 실행 (http://localhost:3000)
   ```
   cd frontend/todo-app-client
   npm install
   npm run dev
   ```
