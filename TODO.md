# TODO — India-Korea Travel 수정 목록

> 최종 점검: 2026-03-26
>
> `[ ]` = 미완료 / `[x]` = 완료
>
> **코드 수정** = Claude가 작업 가능
> **사용자 작업** = 실제 정보/파일이 필요하여 사용자가 제공해야 함

---

## A. 코드 수정 (Claude 작업 가능)

### 긴급 — 404 에러 수정

- [x] **A-1. Footer 패키지 링크 slug 수정** (404 발생)
  - 파일: `src/components/layout/Footer.tsx` 라인 15-18
  - 현재: `/packages/5n6d-essential`, `8d7n-stem`, `9d8n-premium`, `10d9n-ultimate`
  - 수정: `/packages/5n6d-seoul-busan`, `8d7n-stem-industry`, `9d8n-comprehensive`, `10d9n-korea-jeju`

- [x] **A-2. 블로그 relatedPackageSlug 수정** (404 발생)
  - 파일: `src/lib/data/blog-posts.json` 라인 14, 30, 46, 62, 78
  - 현재: `seoul-gyeongju-jeju` (3개), `5n6d-seoul` (2개) — 모두 존재하지 않는 slug
  - 수정: 실제 패키지 slug로 교체 (`5n6d-seoul-busan`, `9d8n-comprehensive` 등)

- [x] **A-3. Privacy Policy / Terms 페이지 생성** (404 발생)
  - 파일: `src/app/privacy-policy/page.tsx`, `src/app/terms/page.tsx` (신규)
  - Footer에서 링크하고 있으나 페이지가 없음
  - 최소한의 템플릿 페이지라도 생성

### 높음 — 스타일/기능 수정

- [x] **A-4. 블로그 본문 prose 스타일 정의**
  - 파일: `src/styles/globals.css`
  - 문제: `.prose-content` CSS 클래스가 미정의 → 블로그 본문 `<p>`, `<a>`, `<strong>`, `<ul>` 등에 스타일 없음
  - 수정: `.prose-content` 스타일 정의 (단락 간격, 링크 색상, 볼드, 리스트 등)

- [x] **A-5. 블로그 공유 버튼 기능 구현**
  - 파일: `src/components/blog/BlogPostContent.tsx` 라인 141-175
  - 문제: WhatsApp/Facebook/Copy Link 버튼이 `<div role="button">` — onClick 없음
  - 수정: `'use client'` 전환 + 실제 공유 URL 연결 + 클립보드 복사 기능

- [x] **A-6. 블로그 상세 페이지 히어로 이미지 표시**
  - 파일: `src/components/blog/BlogPostContent.tsx` 라인 99-103
  - 문제: thumbnail 이미지 경로가 있는데도 항상 플레이스홀더 표시
  - 수정: `post.thumbnail`이 있으면 `<Image>` 컴포넌트로 렌더링

- [x] **A-7. For Schools "Download" 버튼 href 수정**
  - 파일: `src/app/for-schools/page.tsx` 라인 169, 431
  - 문제: Hero CTA + 4개 다운로드 카드 모두 `href="#"`
  - 수정: `/contact` 페이지로 연결 (실제 PDF 파일이 준비될 때까지)

- [x] **A-8. Packages 상세 "Download Itinerary" 버튼 연결**
  - 파일: `src/app/packages/[slug]/page.tsx` 라인 271
  - 문제: `<Button>` — href/onClick 없음
  - 수정: `/contact` 페이지로 연결

- [x] **A-9. Sitemap에 블로그 포스트 URL 추가**
  - 파일: `src/app/sitemap.ts`
  - 문제: 개별 블로그 포스트 5개 URL이 sitemap에 없음
  - 수정: `blog-posts.json`을 읽어 동적으로 추가

- [x] **A-10. AILiveFeed "Subscribe for Updates" 버튼 연결**
  - 파일: `src/components/blog/AILiveFeed.tsx` 라인 157-161
  - 문제: `<button>` — onClick 없음
  - 수정: Footer의 뉴스레터 섹션으로 스크롤 이동 또는 모달

- [x] **A-11. Gallery 페이지 — 기존 이미지 17장 적용**
  - 파일: `src/app/gallery/page.tsx`
  - 문제: 12개 색상 블록 placeholder만 있음
  - 수정: `public/images/experiences/` 이미지들로 실제 갤러리 구성

### 중간 — 개선 사항

- [x] **A-12. 이메일 주소 통일**
  - Header.tsx, Footer.tsx → `info@discoverkorea.edu`
  - contact/page.tsx → `info@discoverkorea.in`
  - 하나로 통일 필요

- [x] **A-13. 도메인 URL 통일**
  - sitemap.ts → `discoverkorea.edu`
  - naver publisher → `koreaedu.tours`
  - 환경변수 `NEXT_PUBLIC_SITE_URL`로 통일

- [ ] **A-14. DMZ/현대/삼성/나미섬 이미지 더 적합한 것으로 교체**
  - 파일: `src/components/home/ExperienceHighlights.tsx`
  - DMZ → 서울 야경 (무관), 현대 → DDP 인테리어 (무관)
  - 더 적합한 이미지 다운로드 후 교체

---

## B. 사용자 작업 필요 (실제 정보/파일 제공)

### 실제 연락처 정보

- [ ] **B-1. 실제 WhatsApp 번호 제공**
  - 현재 `82xxxxxxxxxx` (더미)가 Header, Footer, WhatsAppFAB, Contact, FAQ 5곳에 사용됨
  - 한국 번호와 인도 번호 각각 필요

- [ ] **B-2. 실제 전화번호 제공**
  - 한국 사무실: 현재 `+82-2-xxx-xxxx`
  - 인도 사무실: 현재 `+91-xx-xxxx-xxxx`

- [ ] **B-3. 실제 이메일 주소 결정**
  - `info@discoverkorea.edu` vs `info@discoverkorea.in` — 어느 것이 실제?

- [ ] **B-4. 실제 사무실 주소 제공**
  - 서울: 현재 `123 Gangnam-daero, Gangnam-gu` (더미)
  - 델리: 현재 `456 Connaught Place, Block A` (더미)

- [ ] **B-5. 실제 도메인 URL 결정**
  - `discoverkorea.edu` / `discoverkorea.in` / `koreaedu.tours` 중 실제 사용할 도메인

### 소셜 미디어

- [ ] **B-6. 실제 소셜 미디어 계정 URL 제공**
  - Instagram: 현재 `instagram.com/discoverkorea`
  - YouTube: 현재 `youtube.com/@discoverkorea`
  - Facebook: 현재 `facebook.com/discoverkorea`
  - 실제 계정이 아니면 해당 링크 삭제 또는 생성 필요

- [ ] **B-7. 실제 Naver Blog URL 제공**
  - 현재 `https://blog.naver.com` (네이버 메인)으로 연결됨

### 파일/자료

- [ ] **B-8. For Schools PDF 자료 제공**
  - Program Proposal PDF
  - Itinerary PDF
  - Safety Guidelines
  - Parent Info Sheet
  - 실제 파일이 있으면 `public/downloads/`에 업로드

- [ ] **B-9. 실제 여행 사진 제공 (선택)**
  - Gallery 페이지용
  - 학생 단체 사진, 캠퍼스 방문 사진 등
  - 실제 사진이 있으면 Unsplash 대체 이미지보다 훨씬 좋음

### 외부 서비스 연동

- [ ] **B-10. Contact 폼 이메일 수신 방법 결정**
  - 옵션 1: Resend / SendGrid 등 이메일 API 연동 (API 키 필요)
  - 옵션 2: Google Sheets에 저장
  - 옵션 3: Notion 데이터베이스에 저장
  - 어떤 방식을 원하는지 결정 필요

- [ ] **B-11. 뉴스레터 서비스 결정**
  - Mailchimp / ConvertKit / 자체 구현 중 선택
  - 계정 생성 + API 키 제공 필요

- [ ] **B-12. AI 블로그 생성 사용 여부 결정**
  - 사용하려면 `ANTHROPIC_API_KEY` 환경변수 설정 필요
  - 현재 in-memory 저장이라 서버 재시작 시 데이터 소실 → DB 연동 필요

- [ ] **B-13. Naver 블로그 연동 사용 여부 결정**
  - 사용하려면: 네이버 개발자 앱 등록 → Client ID/Secret 발급
  - `NAVER_CLIENT_ID`, `NAVER_CLIENT_SECRET`, `NAVER_BLOG_ID` 필요

---

## 작업 순서 추천

```
1단계 (즉시) — A-1, A-2, A-3: 404 에러 전부 수정
2단계 (오늘) — A-4, A-5, A-6, A-7, A-8: 스타일 + 기능 수정
3단계 (이번 주) — B-1~B-5: 실제 연락처 정보 입력
4단계 (다음 주) — A-9~A-14, B-6~B-9: 개선 + 자료
5단계 (추후) — B-10~B-13: 외부 서비스 연동
```
