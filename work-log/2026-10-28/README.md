# 2026-10-28 — works 스냅샷 1차 반입

## 목적
제품 소개 `/works`의 화면 출처인 스냅샷 파이프라인(private `groupware-demo/tools`)이 처음으로 끝까지 돌아, 투어용 정적 HTML과 화면 이미지가 이 브랜치에 들어왔다.

## 들어온 파일
- `public/demos/works/<slug>/index.html` 10장: dashboard · approval-inbox · approval-new · approval-my-documents · approval-drafts · board-notice · board-department · board-write · board-post · calendar
- `public/images/works/` 11장: hub/01-dashboard · hub/02-dashboard-mobile · hub/04-approval · hub/07-sidebar · approval/01-hero · approval/07-numbering · board/01-hero · board/02-boards · board/03-notice · board/04-editor · board/07-writing

## 2차 반입 (같은 날 저녁)
- `public/demos/works/` +2: checkin-home(출퇴근 앱, 390 폭) · messenger(원무팀 대화방 활성 — 사진·PDF 첨부, 읽지 않은 메시지 구분선)
- `public/images/works/` +8: hub/03-messenger · messenger/01-hero · 02-rooms · 03-files · 06-desktop(임시 — 창 프레임 합성 전 1280×860 원본) · 08-retention · 09-mobile · attendance/04-wifi
- 메신저 캡처는 최신 메시지가 보이게 스크롤한 상태로 찍는다(실제 앱이 열리는 위치)

## 데이터
병원 이름(평택성모병원)만 실명이고 인물·부서·직급·문서·메시지는 전부 생성기가 만든 가상 데이터다. 오너 결정(2026-10-28): 실 직원 명단과 대조하지 않고 가상 이름 그대로 쓴다. 검사 게이트(실 사번 패턴·외부 origin·스크립트·링크·noindex·크기) 7항목 전부 통과한 뒤 커밋했다.

## 확인한 것
- 스냅샷 HTML: `<script>` 0 · 외부 origin 0 · `href`는 배너 「← 돌아가기」 1건 · noindex · 131~177 KB · `(TEST)` 표기 치환됨
- `/ko/works/tour?menu=dashboard`(로컬 dev)에서 iframe에 대시보드 스냅샷이 배너와 함께 열림
- 이미지: 2880×1800 / 1170×2532 JPEG(q86, progressive). 캡처는 미리보기 배너를 숨기고 찍는다

## 다음
checkin-home · messenger → 나머지 화면 → 51장 전부 → `lib/works/images.ts` 자리표시 0 → 게이트 통과 → 커밋·프리뷰.
