# 말론투자 (정적 사이트)

## 실행 방법(로컬)
정적 파일이라서 **그냥 열어도** 되지만, 공지 JSON(fetch) 때문에 로컬 서버로 보는 게 안전합니다.

1. (권장) VSCode 확장 `Live Server`로 `index.html` 실행  
2. 또는 PowerShell에서 아래 중 하나 실행 후 접속  
  - `python -m http.server 5173`
  - `npx serve . -l 5173`

## 공지사항 등록(운영자만)
`data/notices.json` 파일을 수정하면 됩니다.

- `title`: 제목
- `date`: `YYYY-MM-DD`
- `pinned`: 고정 여부(true/false)
- `content`: 문자열 배열(줄 단위)

## 페이지 구성
- 홈: `/index.html`
- 회사소개: `/company/` + 하위(`/company/overview/` 등)
- 사업영역: `/business/` + 하위(`/business/advisory/` 등)
- 고객지원: `/support/` + 하위(`/support/notice/`, `/support/press/`)

## 스타일/폰트
- 폰트: Google Fonts `Noto Sans KR`
- UI: Tailwind CDN(`https://cdn.tailwindcss.com`) 기반 + `assets/clone.css` 공통 디자인 시스템
