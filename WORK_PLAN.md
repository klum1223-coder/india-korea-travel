# India-Korea Travel 작업 현황

> 최종 업데이트: 2026-03-26

---

## 완료된 작업

### 1. 디자인 개선 (UI Designer + UX Architect)

**시각 디자인**
- [x] 히어로 섹션: 도트 그리드 텍스처 + 장식 링 도형 + 순차 페이드인 애니메이션
- [x] 색상 대비 WCAG AA 준수: `text-white/60` → `/80` 등 전체 조정
- [x] 카드 호버 통일: `.card-hover` 클래스 (translateY -4px + scale 1.01 + shadow-lg)
- [x] 카드 테두리 명확화: `border-surface` → `border-gray-200`
- [x] TrustBar 무한 마키 애니메이션 + 좌우 페이드
- [x] SectionHeading에 accent+secondary 2단 장식 바 추가
- [x] 통계 수치 색상: secondary → accent (CTA 버튼과 역할 분리)
- [x] 버튼: focus-visible 링 강화, hover scale, outline-white 변형 추가
- [x] 섹션 배경색 교번 리듬 조정

**구조/반응형**
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

### 2. 이미지 적용

- [x] 히어로 배경: 서울 야경 스카이라인 (Unsplash)
- [x] 블로그 썸네일 5개: 벚꽃, 시장/음식, 대학 건물, 경복궁, 홍대 네온거리
- [x] 체험 카드 이미지 8개: 경복궁, 한복, DDP 건축, DDP 인테리어, 벚꽃 야경, 홍대, 서울 야경 등
- [x] 패키지 카드 배경 4개: 감천문화마을, DDP, 한복 그룹, 제주 항공뷰
- [x] PostCard / FeaturedPostCard에 next/image 적용
- [x] 이미지-내용 매칭 2차 개선 (K-pop→홍대, KAIST→대학건물, 삼성→DDP 등)

### 3. 블로그 정리

- [x] 모든 AI 배지(AI, AI Live, AI Generated) 삭제
- [x] 블로그 본문 HTML 태그 정상 렌더링 (dangerouslySetInnerHTML)
- [x] excerpt에 HTML 태그 혼입 방지 (stripHtml 처리)

---

## 미완료 작업 (우선순위순)

### P0 — 배포 전 필수

#### 1. Footer 패키지 링크 슬러그 오류 수정
- **파일**: `src/components/layout/Footer.tsx`
- **문제**: `tourPackages` 배열의 href가 실제 슬러그와 불일치 → 404 발생
- **현재**: `/packages/5n6d-essential`, `/packages/8d7n-stem`, `/packages/9d8n-premium`, `/packages/10d9n-ultimate`
- **수정 필요**: `/packages/5n6d-seoul-busan`, `/packages/8d7n-stem-industry`, `/packages/9d8n-comprehensive`, `/packages/10d9n-korea-jeju`

#### 2. 실제 연락처 정보 입력
- **파일**: Header.tsx, Footer.tsx, Contact 페이지
- **작업**: 더미 전화번호(`+82-2-xxx-xxxx`), 이메일, WhatsApp 번호를 실제 값으로 교체
- **작업**: Contact 페이지 주소(`123 Gangnam-daero` 등) 실제 주소로 교체

#### 3. 도메인 URL 통일
- **문제**: sitemap.ts(`discoverkorea.edu`), naver publisher(`koreaedu.tours`), Footer/Header 등 도메인이 불일치
- **작업**: 실제 도메인 결정 후 `NEXT_PUBLIC_SITE_URL` 환경변수로 통일

#### 4. 블로그 본문 스타일링
- **파일**: `src/styles/globals.css`
- **문제**: `prose-content` CSS 클래스가 미정의 → 블로그 본문의 `<p>`, `<a>`, `<strong>` 등에 스타일 없음
- **작업**: Tailwind의 `@apply` 또는 직접 CSS로 prose-content 스타일 정의

#### 5. 블로그 relatedPackageSlug 수정
- **파일**: `src/lib/data/blog-posts.json`
- **문제**: `relatedPackageSlug`에 존재하지 않는 슬러그(`seoul-gyeongju-jeju`, `5n6d-seoul`) 사용
- **작업**: 실제 패키지 슬러그로 교체 (`5n6d-seoul-busan`, `8d7n-stem-industry` 등)

### P1 — 배포 후 빠른 시일 내

#### 6. OG 이미지 설정
- **파일**: `src/app/layout.tsx`, 각 페이지의 metadata
- **문제**: 소셜 공유 시 이미지가 표시되지 않음
- **작업**: 기본 OG 이미지 제작 (1200x630), 블로그 포스트는 썸네일을 OG 이미지로 사용

#### 7. 문의 폼 백엔드 연결
- **파일**: `src/app/api/enquiry/route.ts`
- **현재**: `console.log`만 출력
- **작업**: 이메일 발송 (SendGrid, Resend 등) 또는 DB 저장 (Supabase 등) 연동

#### 8. For Schools 다운로드 자료 추가
- **파일**: `src/app/for-schools/page.tsx`
- **문제**: 4개 다운로드 버튼이 `href="#"` → 클릭 시 아무 동작 없음
- **작업**: 실제 PDF 프로포절 파일을 `public/downloads/`에 추가하고 href 연결

#### 9. 블로그 공유 버튼 기능 구현
- **파일**: `src/components/blog/BlogPostContent.tsx`
- **문제**: WhatsApp, Facebook, Copy Link 공유 버튼이 동작하지 않음
- **작업**: 각 버튼에 실제 공유 URL 연결 + 클립보드 복사 기능

#### 10. 뉴스레터 폼 연결
- **파일**: `src/components/layout/Footer.tsx`
- **현재**: `e.preventDefault()`만 있음
- **작업**: Mailchimp, ConvertKit, 또는 자체 API 연동

### P2 — 추후 개선

#### 11. 갤러리 페이지 이미지 추가
- **파일**: `src/app/gallery/page.tsx`
- **현재**: 12개 색상 블록 placeholder ("Photo Coming Soon")
- **작업**: 실제 한국 여행 사진을 추가하고 갤러리 그리드 구현

#### 12. experiences 페이지 이미지 적용
- **파일**: experiences.json의 `image` 필드 + experiences 페이지 컴포넌트
- **문제**: 40개 체험 항목 중 대부분의 이미지 파일이 없음
- **작업**: 주요 체험에 실제 이미지 추가, 경험 카드에 이미지 렌더링

#### 13. SEO 메타데이터 보완
- `experiences`, `faq` 페이지는 `'use client'`라 metadata export 불가
- 해결: 별도의 layout.tsx 또는 generateMetadata 패턴 적용
- sitemap.ts에 블로그 포스트 개별 URL 추가

#### 14. 다국어(한국어) 지원
- 블로그 포스트에 `titleKo`, `bodyKo` 필드가 이미 존재
- Header에 "EN" 언어 전환 버튼이 시각적으로만 존재
- i18n 라우팅 또는 클라이언트 사이드 언어 전환 구현 필요

#### 15. 네이버 블로그 연동 완성
- OAuth 콜백 라우트 미구현
- 토큰 갱신 자동화 없음
- 실제 네이버 블로그 계정 URL로 교체 필요

#### 16. AI 블로그 생성 저장소 영속화
- **현재**: in-memory 저장소 (서버 재시작 시 초기화)
- **작업**: 파일 기반 또는 DB 기반 저장소로 교체

#### 17. 소셜 미디어 계정 연결
- Instagram, YouTube, Facebook 실제 계정 URL로 교체
- 가능하면 각 플랫폼 피드 임베드 검토

---

## 기술 스택

| 항목 | 값 |
|------|---|
| Framework | Next.js 16.2.0 |
| React | 19.2.4 |
| CSS | Tailwind CSS 4 |
| 폰트 | Poppins (헤딩), Inter (본문) |
| 배포 타겟 | Vercel |

## 환경변수 (선택)

| 변수 | 용도 | 기본값 |
|------|------|--------|
| `ANTHROPIC_API_KEY` | AI 블로그 생성 | mock 데이터 |
| `NAVER_CLIENT_ID` | 네이버 블로그 연동 | 기능 비활성화 |
| `NAVER_CLIENT_SECRET` | 네이버 블로그 연동 | 기능 비활성화 |
| `NAVER_BLOG_ID` | 네이버 블로그 연동 | 기능 비활성화 |
| `NAVER_ACCESS_TOKEN` | 네이버 블로그 연동 | 기능 비활성화 |
| `NEXT_PUBLIC_SITE_URL` | 사이트 기본 URL | `https://www.koreaedu.tours` |

---

## 페이지별 완성도

| 페이지 | 완성도 | 비고 |
|--------|--------|------|
| `/` (홈) | 95% | 이미지, 디자인, 애니메이션 완료 |
| `/packages` | 90% | 데이터 완전, 비교표 작동 |
| `/packages/[slug]` | 90% | 일정/가격/호텔 모두 표시 |
| `/experiences` | 85% | 필터 작동, 이미지 부재 |
| `/for-schools` | 80% | 다운로드 버튼 미연결 |
| `/blog` | 85% | 필터 작동, 본문 스타일링 필요 |
| `/blog/[slug]` | 80% | 공유 버튼 미작동, prose 스타일 없음 |
| `/faq` | 90% | 검색/필터 작동, 메타데이터 없음 |
| `/contact` | 75% | 폼 작동하나 백엔드 미연결 |
| `/destinations/[city]` | 85% | 데이터 완전, 이미지 부재 |
| `/about` | 85% | 텍스트 완전, 이미지 없음 |
| `/why-korea` | 90% | 완성 상태 |
| `/gallery` | 10% | 완전한 placeholder 상태 |
