# India-Korea Travel 작업 보고서

> 최종 업데이트: 2026-03-28

---

## 1. 디자인 전면 개선

### 1차 시각 디자인 (UI Designer) — 03/26 완료
- [x] 히어로 섹션: 서울 야경 배경 이미지 + 도트 그리드 텍스처 + 장식 링 도형 + 순차 페이드인 애니메이션
- [x] 색상 대비 WCAG AA 준수: `text-white/60` → `/80` 등 전체 조정
- [x] 카드 호버 통일: `.card-hover` 클래스 (translateY -4px + scale 1.01 + shadow-lg)
- [x] 카드 테두리 명확화: `border-surface` → `border-gray-200`
- [x] TrustBar 무한 마키 애니메이션 + 좌우 페이드
- [x] SectionHeading에 accent+secondary 2단 장식 바 추가
- [x] 통계 수치 색상: secondary → accent (CTA 버튼과 역할 분리)
- [x] 버튼: focus-visible 링 강화, hover scale, outline-white 변형 추가
- [x] 섹션 배경색 교번 리듬 조정

### 2차 디자인 업그레이드 (활력 있는 비주얼) — 03/28 완료
**CSS 시스템 강화:**
- [x] 그라데이션 CSS 변수 3종 추가 (primary, secondary, accent)
- [x] 신규 컬러: `--color-coral: #FF6B6B`, `--color-teal: #38B2AC`
- [x] 멀티레이어 그림자 시스템 (shadow-md/lg/xl + glow-primary/secondary)
- [x] 새 애니메이션 6종: slideInLeft/Right, scaleIn, shimmer, cardEntrance, gradientShift
- [x] 스태거드 입장 유틸리티 `.animate-stagger-1`~`6` (100ms 간격)
- [x] 그라데이션 텍스트 유틸리티 `.text-gradient` / `.text-gradient-secondary` / `.text-gradient-accent`
- [x] 웨이브 섹션 디바이더 `.section-wave-top` / `.section-wave-bottom`
- [x] 강화 카드 호버 `.card-hover-enhanced` (translateY -8px + 그라데이션 오버레이)
- [x] 그라데이션 버튼 `.btn-gradient` + CTA 화살표 애니메이션
- [x] 접근성: `@media (prefers-reduced-motion: reduce)` 전체 애니메이션 비활성화

**컴포넌트 업그레이드 (17개 파일):**
- [x] Hero: 애니메이션 그라데이션 오버레이 + "Educational Immersion" 골드 그라데이션 텍스트
- [x] ValueProps: 이모지 → 인라인 SVG 아이콘 6종 + 카테고리별 좌측 컬러 보더
- [x] StatsSection: 그라데이션 숫자 텍스트 + subtlePulse 애니메이션
- [x] PackageShowcase: 3색 그라데이션 상단 바 + "Best Value" 뱃지 + 글로우 호버
- [x] HowItWorks: 데스크톱 그라데이션 타임라인 연결선 + 그라데이션 번호 원
- [x] ForSchoolsCTA: 그라데이션 배경 + 3개 플로팅 장식 요소
- [x] SectionHeading: 그라데이션 제목 텍스트 + 장식 바 확대 (w-14, h-1.5)
- [x] Button: `gradient` 변형 추가 (애니메이션 그라데이션 배경)
- [x] Header: 스크롤 시 그라데이션 하단 보더 + 액티브 링크 그라데이션 배경
- [x] Footer: `bg-gradient-to-br` 배경 + 슬라이딩 언더라인 호버 효과
- [x] Experiences: 카테고리별 상단 컬러 보더 + 이미지 줌 호버 + 그라데이션 오버레이
- [x] ExperienceHighlights: 이미지 줌 + 그라데이션 오버레이 호버
- [x] Tag: 활성 상태 그라데이션 배경
- [x] PackageCard: 그라데이션 헤더 + 향상된 호버 그림자

### 구조/반응형 (UX Architect)
- [x] CSS 충돌 해결: `app/globals.css` 정리, `styles/globals.css`로 통합
- [x] 헤더 높이 CSS 변수화 (매직 넘버 제거)
- [x] main 태그 중첩 제거 (시맨틱 구조 수정)
- [x] Skip-to-content 키보드 접근성 링크 추가
- [x] 모바일 메뉴 slide-down 애니메이션 + body 스크롤 잠금
- [x] Experience 캐러셀: scroll-snap + 좌우 그라디언트 페이드 + 스와이프 힌트
- [x] 패키지 그리드: sm:2열 lg:3열 (태블릿 대응)
- [x] HowItWorks: `<ol>/<li>` 시맨틱 + 모바일 연결선 개선
- [x] 전 섹션 `aria-labelledby` / `aria-label` 추가
- [x] DM Sans 미사용 폰트 제거
- [x] `html { scroll-behavior: smooth }` 추가

---

## 2. 이미지 적용

### 1차 이미지 (03/26)
- [x] 히어로 배경: 서울 야경 스카이라인 (Unsplash 무료 라이선스)
- [x] 블로그 썸네일 5개: 벚꽃, 시장/음식, 대학 건물, 경복궁, 홍대 네온거리
- [x] 패키지 카드 배경 4개: 감천문화마을, DDP, 한복 그룹, 제주 항공뷰
- [x] PostCard / FeaturedPostCard에 next/image 적용
- [x] Gallery 페이지: placeholder 12개 → 실제 이미지 17장으로 교체

### 2차 Experiences 전체 이미지 (03/26~28) — 40개 완성
- [x] PDF 자료(info/)에서 실제 장소 사진 28개 추출 적용
  - 경복궁 수문장교대, 서울대 정문, 이화여대 ECC, 연세대 캠퍼스
  - 현대자동차 울산공장, 현대중공업 조선소, 고리원전, KARI 위성전시
  - 로봇공학센터, 기아 소하리공장, 삼성이노베이션뮤지엄 전시관
  - DMZ 도라전망대 + 제3터널, 송암성곡 천문대 돔
  - 김치만들기 수업, 태권도, K-pop 댄스, 난타쇼, 페인터즈히어로
  - DDP 야경, 북촌한옥마을, 인사동, 명동, N서울타워
  - 해동용궁사, 감천문화마을, 오륙도스카이워크
  - 에버랜드, 나미섬 메타세쿼이아길, KBS 드라마스튜디오
  - 국회도서관 외관+내부
- [x] 나머지 12개는 Pexels 무료 stock 사진 활용 (KMOU, 홍대, 청계천 등)
- [x] 이미지 불일치 7건 검수 수정:
  - KAIST: 경복궁 → 실제 KAIST 캠퍼스
  - 삼성이노베이션뮤지엄: 무관 공장 → 실제 전시관 (Integrated Circuit)
  - DMZ: 철조망 stock → 실제 도라전망대+제3터널
  - 송암성곡: NASA 은하 → 실제 천문대 돔+망원경
  - 나미섬: 야경 → 메타세쿼이아 가로수길
  - 김밥만들기: 일반 한식 → 김밥 포함 사진
  - 페인터즈히어로: 서양 화실 → 실제 공연 장면
- [x] AI 블로그 기본 썸네일 누락 수정 (`default-thumbnail.jpg` → `korean-education.jpg`)

---

## 3. 블로그 시스템 완성

- [x] 모든 AI 배지(AI, AI Live, AI Generated) 삭제
- [x] 블로그 본문 HTML 정상 렌더링 (dangerouslySetInnerHTML + sanitizeHtml)
- [x] excerpt stripHtml 처리
- [x] `.prose-content` CSS 스타일 정의 (p, a, strong, ul, blockquote 등)
- [x] 블로그 상세 히어로 이미지 조건부 렌더링 (thumbnail → Image 컴포넌트)
- [x] 공유 버튼 기능 구현 — ShareButtons 클라이언트 컴포넌트 분리
  - WhatsApp: `wa.me/?text=` 공유
  - Facebook: `sharer.php` 공유
  - Copy Link: 클립보드 복사 + "Copied!" 피드백

---

## 4. 404 에러 전면 수정

- [x] Footer 패키지 링크 slug 4개 수정 (5n6d-essential → 5n6d-seoul-busan 등)
- [x] blog-posts.json relatedPackageSlug 5개 수정 (존재하지 않는 slug → 실제 slug)
- [x] Privacy Policy 페이지 신규 생성 (`/privacy-policy`)
- [x] Terms of Service 페이지 신규 생성 (`/terms`)
- [x] For Schools 다운로드 버튼 `href="#"` → `/contact` 연결
- [x] Packages "Download Itinerary" 버튼 → `/contact` 연결

---

## 5. 데이터 일관성 수정

- [x] 이메일 주소 통일: `info@discoverkorea.in` → `info@discoverkorea.edu` (전체)
- [x] 도메인 URL 통일: naver publisher `koreaedu.tours` → `discoverkorea.edu`
- [x] Header 통계 수치 통일: "500+ students" → "50+ schools & 1000+ students" (다른 섹션과 일치)
- [x] FAQ WhatsApp URL 형식 수정 (`+` 기호 제거, 번호 통일)

---

## 6. SEO 개선

- [x] Sitemap에 블로그 포스트 5개 URL 동적 추가
- [x] "Subscribe for Updates" 버튼 → Footer 뉴스레터로 스크롤 연결
- [x] Experiences 페이지 이미지 표시 + 미존재 이미지 fallback 처리

---

## 7. 뉴스레터 자동화 시스템 구축

- [x] 구독 API: `POST /api/newsletter/subscribe` (이메일 수집, 중복 체크)
- [x] 발송 API: `POST /api/newsletter/send` (구독자에게 이메일 발송)
- [x] Footer 구독 폼 실제 연동 (loading/success/error 상태 표시)
- [x] 이메일 저장소: in-memory Set 기반 (`src/lib/newsletter/store.ts`)
- [x] 이메일 발송: Resend REST API 연동 (`src/lib/newsletter/sender.ts`)
  - `RESEND_API_KEY` 있으면 실제 발송 / 없으면 콘솔 시뮬레이션
- [x] 브랜드 색상 적용 HTML 이메일 템플릿
- [x] AI 블로그 생성 시 구독자에게 자동 뉴스레터 발송 연결

---

## 8. 보안 강화

### Rate Limiting (IP별 요청 제한)
- [x] 문의 폼: IP당 1분 5회
- [x] 뉴스레터 구독: IP당 1분 3회
- [x] 뉴스레터 발송: IP당 시간당 10회
- [x] AI 블로그 생성: IP당 시간당 5회
- [x] 네이버 발행: IP당 시간당 20회
- [x] Rate Limiter 유틸리티: `src/lib/security/rate-limiter.ts`

### API 인증
- [x] AI 블로그 생성: `AI_BLOG_API_SECRET` Bearer 인증 필수 (없으면 503)
- [x] 뉴스레터 발송: `NEWSLETTER_API_SECRET` Bearer 인증 필수 (없으면 503)
- [x] 네이버 발행: `NAVER_PUBLISH_API_SECRET` Bearer 인증 필수 (없으면 503)

### 입력값 보안
- [x] 모든 문자열 입력 `sanitizeInput()` 처리 (XSS 방지)
- [x] 이메일 `sanitizeEmail()` + `isValidEmail()` 엄격 검증
- [x] 블로그 본문 `sanitizeHtml()` — script/iframe/on* 이벤트 제거
- [x] Honeypot 필드로 봇 차단 (Contact 폼, 뉴스레터 구독)
- [x] Input Sanitizer 유틸리티: `src/lib/security/sanitize.ts`

### 보안 헤더 (next.config.ts)
- [x] `Strict-Transport-Security`: HSTS 2년 (HTTPS 강제)
- [x] `X-Frame-Options: SAMEORIGIN` (클릭재킹 방지)
- [x] `X-Content-Type-Options: nosniff` (MIME 스니핑 방지)
- [x] `Referrer-Policy: origin-when-cross-origin`
- [x] `Permissions-Policy`: 카메라/마이크/위치 접근 차단
- [x] `X-DNS-Prefetch-Control: on`

### 기타 보안
- [x] CSRF 보호: Origin 헤더 검증 (문의 폼)
- [x] 환경변수 검증 유틸리티: `src/lib/security/env.ts`

---

## 9. 전체 점검 및 버그 수정 (03/28)

- [x] Next.js 빌드 테스트: 에러 0건, 35개 페이지 정상 생성
- [x] 이미지 참조 전수 검사: 40개 experience + 블로그/히어로 전체 정상
- [x] API 라우트 5개 보안 검증 (인증, Rate Limit, CSRF, XSS 방지) 정상
- [x] 타입/데이터 정합성: packages, experiences, blog-posts, destinations 확인
- [x] Header/Footer 내비게이션 링크 전체 정상
- [x] 누락 이미지 참조 1건 수정: `content-generator.ts` default-thumbnail.jpg

---

## 10. 개발 도구 (Claude Skills 설치)

프로젝트 `.claude/skills/`에 4개 스킬 설치 (`.gitignore`에서 제외):
- **frontend-design**: React/Tailwind 디자인 품질 향상, "AI 느낌" 배제
- **web-artifacts-builder**: 복잡한 UI 컴포넌트 빌드 (React + shadcn/ui)
- **canvas-design**: 포스터/시각 에셋 디자인
- **webapp-testing**: Playwright UI 기능 테스트

---

## 기술 스택

| 항목 | 값 |
|------|---|
| Framework | Next.js 16.2.0 |
| React | 19.2.4 |
| CSS | Tailwind CSS 4 |
| 폰트 | Poppins (헤딩), Inter (본문) |
| 배포 | Vercel (자동 배포) |
| 보안 | Rate Limiting, Honeypot, CSP Headers, Input Sanitization |
| 뉴스레터 | 자체 구축 (Resend API 연동) |

## 환경변수

| 변수 | 용도 | 필수 여부 |
|------|------|-----------|
| `RESEND_API_KEY` | 이메일 발송 (뉴스레터 + 문의 알림) | 선택 (없으면 콘솔 로그) |
| `ANTHROPIC_API_KEY` | AI 블로그 생성 | 선택 (없으면 mock 데이터) |
| `AI_BLOG_API_SECRET` | AI 블로그 API 인증 | 기능 사용 시 필수 |
| `NEWSLETTER_API_SECRET` | 뉴스레터 발송 API 인증 | 기능 사용 시 필수 |
| `NAVER_PUBLISH_API_SECRET` | 네이버 발행 API 인증 | 기능 사용 시 필수 |
| `NAVER_CLIENT_ID` | 네이버 블로그 연동 | 선택 |
| `NAVER_CLIENT_SECRET` | 네이버 블로그 연동 | 선택 |
| `NAVER_BLOG_ID` | 네이버 블로그 연동 | 선택 |
| `NAVER_ACCESS_TOKEN` | 네이버 블로그 연동 | 선택 |
| `NEXT_PUBLIC_SITE_URL` | 사이트 기본 URL / CSRF 검증 | 선택 |

---

## 배포 정보

| 항목 | 값 |
|------|---|
| GitHub | https://github.com/klum1223-coder/india-korea-travel |
| Vercel | https://india-korea-travel-main.vercel.app |
| 자동 배포 | main 브랜치 push 시 자동 |

---

## 페이지별 완성도

| 페이지 | 완성도 | 비고 |
|--------|--------|------|
| `/` (홈) | 98% | 디자인 2차 업그레이드 완료, 그라데이션/애니메이션/SVG 아이콘 |
| `/packages` | 95% | 카드 그라데이션 헤더, 입장 애니메이션, Best Value 뱃지 |
| `/packages/[slug]` | 90% | 일정/가격/호텔 표시, Itinerary 버튼 연결 |
| `/experiences` | 95% | 40개 이미지 완성, 카테고리 컬러 보더, 이미지 줌 호버 |
| `/for-schools` | 85% | 다운로드 → Contact 연결 |
| `/blog` | 90% | 필터, 썸네일, prose 스타일 완료 |
| `/blog/[slug]` | 90% | 공유 버튼, 히어로 이미지, 본문 스타일 완료 |
| `/faq` | 90% | 검색/필터 작동 |
| `/contact` | 80% | 폼 작동 + honeypot 봇 차단 (이메일 발송은 API 키 필요) |
| `/destinations/[city]` | 85% | 데이터 완전 |
| `/about` | 85% | 텍스트 완전 |
| `/why-korea` | 90% | 완성 상태 |
| `/gallery` | 85% | 실제 이미지 17장 적용 |
| `/privacy-policy` | 100% | 신규 생성 완료 |
| `/terms` | 100% | 신규 생성 완료 |

---

## 남은 작업 (클라이언트 정보 필요)

> 상세 내용은 `CLIENT_CHECKLIST.md` 참조

- [ ] 실제 연락처 정보 입력 (전화번호, WhatsApp, 이메일, 주소)
- [ ] 도메인 결정 및 Vercel 커스텀 도메인 연결
- [ ] 소셜 미디어 계정 URL 교체
- [ ] For Schools PDF 자료 업로드
- [ ] 실제 투어 사진 교체
- [ ] Resend API 키 → 이메일 발송 활성화
- [ ] Anthropic API 키 → AI 블로그 활성화
- [ ] 보안 API Secret 키 생성 및 Vercel 환경변수 설정
- [ ] OG 이미지 / 로고 제작
