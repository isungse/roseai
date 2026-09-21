# 2026-09-21 쇼케이스 이미지 교체 기록

## 작업 목적

퇴근하는 여성(evening)과 캠핑하는 여성(camp) 슬라이드의 카드 이미지를 새 생성 이미지로 교체했다. 두 이미지 모두 문구의 분위기(하루의 마무리 / 쉬는 동안에도 일은 계속된다)에 맞는지 검토한 뒤 반영했다.

작업 도중 원격 `main` 에 09-14 세션 3(낮 사무실을 02 로 삽입, 순서 재배열) 이 먼저 올라가 있어, 그 순서(01 coffee · 02 office · 03 evening · 04 camp) 위에 rebase 해 반영했다.

## 반영 내용

- **슬라이드 03 (evening)**: 해 질 무렵 도심 스카이라인을 배경으로 빨간 사원증 목걸이를 걸고 사무실 건물을 나서는 여성. 기존의 트렌치코트·미소 컷을 검은 재킷·휴대폰 컷으로 교체.
- **슬라이드 04 (camp)**: 호숫가 노을 아래 캠핑 의자에서 머그컵을 든 여성. 기존의 별밤·모닥불 컷을 노을·호수 컷으로 교체.
- 원본은 16:9 (1672×941) 라 정사각 크롭이 필요했다. 중앙 크롭 대신 인물이 왼쪽 1/3 에 오고 시선 방향으로 배경이 열리도록 가로 오프셋을 정했다 (evening 0.60, camp 0.55). 짧은 변이 1600 미만이므로 업스케일하지 않고 941² JPEG q86 으로 저장.
- 이미지 파일명을 `showcase-NN-<i18nKey>.jpg` 체계로 변경했다. 교체한 03·04 뿐 아니라 01·02 도 같은 체계에 맞췄다 (내용 동일). 파일명이 바뀌므로 09-14 에 기록된 같은 파일명 교체 시의 브라우저 캐시 잔상 문제도 자연히 피한다.
- 새 이미지 내용에 맞게 한국어·영문 `alt` 텍스트를 수정했다. 제목·본문은 변경하지 않았다.
- `design-system.md` 의 이미지 에셋 파이프라인 절을 갱신했다 (파일명 체계, 16:9 원본 크롭 기준, 업스케일 금지, Pillow 변환). 09-14 의 Higgsfield 생성 절차와 캐시 주의사항은 유지.

## 변경 파일

- `public/images/showcase-01-coffee.jpg` (← `showcase-01.jpg`, 내용 동일)
- `public/images/showcase-02-office.jpg` (← `showcase-02.jpg`, 내용 동일)
- `public/images/showcase-03-evening.jpg` (신규, 구 `showcase-03.jpg` 삭제)
- `public/images/showcase-04-camp.jpg` (신규, 구 `showcase-04.jpg` 삭제)
- `lib/data/showcase.ts`
- `messages/ko.json`, `messages/en.json`
- `.claude/rules/design-system.md`

## 검증 결과

- `npm run lint`: 통과
- `npm run build`: Next.js 프로덕션 빌드 통과
- 로컬 dev 서버 `/ko`: 4장 이미지 모두 `/_next/image` 200 응답, 콘솔 오류 없음
- 슬라이드 03·04 카드에 새 이미지 렌더 확인, 새 `alt` 가 접근성 트리에 반영됨

## 보류 사항

- 없음.

## 추가 — 04 캠핑 본문 첫 줄 수정 (승인 후 반영)

별밤 사진 기준이던 첫 줄을 노을·호수 사진에 맞췄다. 나머지 문장은 그대로.

**당신이 쉬는 동안에도, 일은 계속됩니다.**

노을을 바라보는 이 시간에도 AI 에이전트는 자리를 지키고 있습니다.  
결과를 정리하고, 살펴봐야 할 일이 생기면 그때만 조용히 알려줍니다.  
그러니 지금은, 이 시간을 온전히 즐기세요.

- EN: "Even now, as the sun sets over the lake, your AI agents are still at their desks." 로 같은 위치만 교체.
- 이미지 교체 커밋: `29a55cc`. 문구 커밋은 별도 (아래 git 이력 참조).
