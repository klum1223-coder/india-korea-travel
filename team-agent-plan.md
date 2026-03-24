# Team Agent Execution Plan
## India-Korea Educational Travel Homepage

---

## 1. Model Usage Policy (토큰 절약 원칙)

### Model Assignment Rules

| Model | 용도 | 토큰 비용 | 사용 기준 |
|-------|------|----------|----------|
| **haiku** | 단순 반복 작업 | 최저 | 정적 데이터 파일 생성, 텍스트 콘텐츠 작성, 단순 컴포넌트 복제 |
| **sonnet** | 중간 복잡도 개발 | 중간 | 개별 페이지 구현, UI 컴포넌트 개발, API 라우트 작성 |
| **opus** | 고복잡도 설계 | 최고 | 프로젝트 초기 설계, AI 파이프라인 아키텍처, 최종 통합/리뷰만 |

### 핵심 절약 원칙
1. **opus는 설계/리뷰에만 사용** — 코드 작성은 sonnet/haiku에 위임
2. **각 에이전트에 필요한 컨텍스트만 전달** — 기획안 전체를 넘기지 않고 해당 섹션만 발췌
3. **데이터 파일(JSON)은 haiku로** — 패키지 정보, 식당 DB, FAQ 등 정형 데이터
4. **유사 페이지는 1개만 sonnet으로 구현 후 나머지는 haiku로 복제 패턴 적용**
5. **병렬 실행** — 독립적인 에이전트는 동시 실행하여 총 시간 절감

---

## 2. Execution Phases & Agent Groups

### PHASE 0: Project Scaffolding (순차 실행 — 다른 모든 에이전트의 전제)

| # | Agent Name | Model | Task | 의존성 | 예상 출력 |
|---|-----------|-------|------|--------|----------|
| 0-1 | `scaffold` | **sonnet** | Next.js 14 App Router + Tailwind CSS 4 + pnpm 프로젝트 초기화. 폴더 구조, tsconfig, ESLint, .gitignore 설정. Sanity CMS 스키마 기본 구조. | 없음 | 빌드 가능한 빈 프로젝트 |

**전달 컨텍스트:** Tech Stack 섹션(6.1)만 발췌, 폴더 구조 명시

```
Expected folder structure:
src/
├── app/
│   ├── layout.tsx          (Root layout)
│   ├── page.tsx            (Home)
│   ├── about/page.tsx
│   ├── why-korea/page.tsx
│   ├── packages/
│   │   ├── page.tsx        (Package list + comparison)
│   │   └── [slug]/page.tsx (Individual package)
│   ├── experiences/page.tsx
│   ├── destinations/[city]/page.tsx
│   ├── for-schools/page.tsx
│   ├── faq/page.tsx
│   ├── gallery/page.tsx
│   ├── blog/
│   │   ├── page.tsx        (Blog list + AI Feed)
│   │   └── [slug]/page.tsx (Blog post)
│   ├── contact/page.tsx
│   └── api/
│       ├── enquiry/route.ts
│       ├── ai-blog/generate/route.ts
│       └── naver/publish/route.ts
├── components/
│   ├── ui/                 (Reusable base components)
│   ├── layout/             (Header, Footer, Nav)
│   ├── home/               (Home page sections)
│   ├── packages/           (Package-related)
│   ├── blog/               (Blog/AI Feed)
│   └── shared/             (Cross-page components)
├── lib/
│   ├── data/               (JSON data files)
│   ├── sanity/             (Sanity client + queries)
│   ├── ai/                 (AI content generation)
│   └── naver/              (Naver Blog API)
├── types/                  (TypeScript types)
└── styles/                 (Global styles)
```

---

### PHASE 1-A: Data Layer (병렬 실행 가능 — scaffold 완료 후)

정적 데이터 파일과 TypeScript 타입 정의. **전부 haiku로 처리.**

| # | Agent Name | Model | Task | 예상 출력 |
|---|-----------|-------|------|----------|
| 1A-1 | `data-packages` | **haiku** | 4개 투어 패키지 JSON 데이터 파일 생성. 기획안의 패키지 섹션(4.3) 기반. 일정, 가격, 포함/불포함 항목, 호텔 정보. | `src/lib/data/packages.json` |
| 1A-2 | `data-experiences` | **haiku** | 체험 카탈로그 JSON. 기획안 4.4 섹션의 모든 체험 항목(교육/산업/문화/K-Wave). | `src/lib/data/experiences.json` |
| 1A-3 | `data-destinations` | **haiku** | 도시별(Seoul/Busan/Daejeon/Jeju) 관광지 JSON. 기획안 4.4-F 기반. | `src/lib/data/destinations.json` |
| 1A-4 | `data-restaurants` | **haiku** | 인도 레스토랑 DB JSON. 기획안 섹션 8 기반. 서울/부산 식당 정보. | `src/lib/data/restaurants.json` |
| 1A-5 | `data-faq` | **haiku** | FAQ 데이터 JSON. 기획안 4.8 기반. 카테고리별 질문/답변. | `src/lib/data/faq.json` |
| 1A-6 | `types-gen` | **haiku** | 위 JSON 데이터에 대한 TypeScript 인터페이스/타입 정의. | `src/types/index.ts` |

**전달 컨텍스트:** 각 에이전트에 기획안의 해당 데이터 테이블만 복사해서 전달 (전체 기획안 X)

---

### PHASE 1-B: Design System (병렬 실행 가능 — scaffold 완료 후)

| # | Agent Name | Model | Task | 예상 출력 |
|---|-----------|-------|------|----------|
| 1B-1 | `design-system` | **sonnet** | Tailwind 설정(색상, 폰트, 간격), 글로벌 CSS, 기본 UI 컴포넌트 구현. 기획안 5.1-5.3 기반. Button, Card, Badge, Accordion, Section, Container 등. | `tailwind.config.ts` + `src/components/ui/*` |
| 1B-2 | `layout-components` | **sonnet** | Header(네비게이션, 모바일 메뉴), Footer(링크, 뉴스레터, 소셜), WhatsApp FAB 버튼. | `src/components/layout/*` |

**전달 컨텍스트:** 색상 팔레트, 타이포그래피, 컴포넌트 라이브러리 테이블 (5.1~5.3)

---

### PHASE 2: Core Pages (병렬 실행 — Phase 1 완료 후)

각 페이지를 독립 에이전트가 구현. **유사한 구조의 페이지는 sonnet 1개 + haiku 복제.**

| # | Agent Name | Model | Task | 의존성 | 예상 출력 |
|---|-----------|-------|------|--------|----------|
| 2-1 | `page-home` | **sonnet** | 메인 페이지 전체 구현. Hero, Value Props, How It Works, Package Cards, Experience 카드, Testimonials, For Schools CTA, **AI Live Feed 영역(빈 컴포넌트 placeholder)**, Footer. 기획안 4.1 와이어프레임 기반. | 1A, 1B | `src/app/page.tsx` + `src/components/home/*` |
| 2-2 | `page-packages` | **sonnet** | 패키지 목록 페이지 + 비교 테이블 + 개별 패키지 상세 페이지([slug]). Day-by-Day 아코디언, 가격표, Inclusions/Exclusions. **1개 패키지만 완성 → 나머지는 데이터 바인딩.** | 1A-1 | `src/app/packages/*` + `src/components/packages/*` |
| 2-3 | `page-contact` | **sonnet** | 문의 폼(React Hook Form), WhatsApp 연동, API Route(enquiry). 기획안 4.11 기반. | 1B | `src/app/contact/*` + `src/app/api/enquiry/*` |
| 2-4 | `page-why-korea` | **haiku** | Why Korea 페이지. 기획안 4.2 기반. 6 Pillars + 비교 테이블 + By the Numbers. **정적 콘텐츠 중심이므로 haiku로 충분.** | 1B | `src/app/why-korea/page.tsx` |
| 2-5 | `page-faq` | **haiku** | FAQ 페이지. 아코디언 UI + 검색 필터. faq.json 데이터 바인딩. | 1A-5, 1B | `src/app/faq/page.tsx` |
| 2-6 | `page-about` | **haiku** | About Us 페이지. Our Story, Team, Partner 로고. **정적 콘텐츠.** | 1B | `src/app/about/page.tsx` |

---

### PHASE 3: Feature Pages (병렬 실행 — Phase 2 완료 후)

| # | Agent Name | Model | Task | 의존성 | 예상 출력 |
|---|-----------|-------|------|--------|----------|
| 3-1 | `page-schools` | **sonnet** | For Schools 전용 페이지. Program Overview, Learning Outcomes 타임라인, Safety, Cost Transparency, Parent Kit, Download CTAs, Meeting 예약 폼. **전환 핵심 페이지이므로 sonnet.** | 2-1 | `src/app/for-schools/*` |
| 3-2 | `page-experiences` | **haiku** | 체험 카탈로그 페이지. 카드 그리드 + 카테고리/도시 필터. experiences.json 바인딩. **UI 패턴이 2-2(packages)와 유사하므로 haiku로 복제.** | 1A-2 | `src/app/experiences/*` |
| 3-3 | `page-destinations` | **haiku** | 도시별 페이지 ([city] 동적 라우트). destinations.json 바인딩. **패턴 반복이므로 haiku.** | 1A-3 | `src/app/destinations/*` |
| 3-4 | `page-gallery` | **haiku** | 갤러리 페이지. 이미지 그리드 + Lightbox + 카테고리 필터. **UI만 구현, 실제 이미지는 placeholder.** | 1B | `src/app/gallery/*` |

---

### PHASE 4: AI Blog Engine (순차 → 부분 병렬)

**가장 복잡한 시스템. 아키텍처 설계는 opus, 구현은 sonnet, 데이터는 haiku.**

| # | Agent Name | Model | Task | 의존성 | 예상 출력 |
|---|-----------|-------|------|--------|----------|
| 4-1 | `ai-blog-schema` | **haiku** | Sanity CMS Blog 스키마 정의. BlogPost, Category, Tag, AIGenerationLog 타입. | 0-1 | `sanity/schemas/blog.ts` |
| 4-2 | `ai-blog-engine` | **sonnet** | AI 콘텐츠 생성 핵심 엔진. Claude API 호출, 프롬프트 템플릿 시스템, 콘텐츠 유형별 생성 로직 (Today's Korea, Travel Story, K-Culture 등). 품질 체크 필터. | 4-1 | `src/lib/ai/content-generator.ts` + `src/lib/ai/prompts.ts` + `src/lib/ai/quality-check.ts` |
| 4-3 | `ai-blog-api` | **sonnet** | API Routes: POST /api/ai-blog/generate (콘텐츠 생성 트리거), GET /api/ai-blog/feed (피드 조회), Cron Job 설정 (vercel.json). | 4-2 | `src/app/api/ai-blog/*` |
| 4-4 | `ai-blog-feed-ui` | **sonnet** | 메인 페이지 AI Live Feed 컴포넌트 구현. Featured Card, Trending Cards, Tag Filter, Naver Blog Badge. 기획안 4.10.5 와이어프레임 기반. Phase 2-1의 placeholder를 실제 구현으로 교체. | 4-3, 2-1 | `src/components/blog/AILiveFeed.tsx` + 관련 컴포넌트 |
| 4-5 | `ai-blog-page` | **haiku** | 블로그 목록 페이지 + 개별 글 페이지. 피드 UI 재활용. | 4-4 | `src/app/blog/*` |
| 4-6 | `naver-integration` | **sonnet** | 네이버 블로그 자동 발행 모듈. Naver Open API OAuth, HTML 변환, 이미지 업로드, 발행/조회. Puppeteer 백업 로직. | 4-2 | `src/lib/naver/blog-publisher.ts` + `src/app/api/naver/*` |

---

### PHASE 5: Integration & Polish (순차 실행)

| # | Agent Name | Model | Task | 의존성 | 예상 출력 |
|---|-----------|-------|------|--------|----------|
| 5-1 | `integration-test` | **sonnet** | 전체 페이지 빌드 테스트, 링크 연결 확인, 반응형 체크, 타입 에러 수정. | 전체 | 빌드 성공, 에러 수정 |
| 5-2 | `seo-meta` | **haiku** | 모든 페이지 메타태그 (title, description, OG, Twitter), sitemap.xml, robots.txt, structured data (JSON-LD). | 5-1 | `src/app/layout.tsx` 수정 + `public/sitemap.xml` |

---

## 3. Execution Flow Diagram

```
PHASE 0 (순차)
  │
  └─ [0-1] scaffold (sonnet)
       │
       ├──────────────────────────────────────────┐
       │                                          │
  PHASE 1-A (병렬)                           PHASE 1-B (병렬)
       │                                          │
  ┌────┼────┬────┬────┬────┐              ┌───────┼───────┐
  │    │    │    │    │    │              │               │
 1A-1 1A-2 1A-3 1A-4 1A-5 1A-6         1B-1           1B-2
 pkg  exp  dest rest faq  types         design         layout
 (h)  (h)  (h)  (h)  (h)  (h)          (s)            (s)
  │    │    │    │    │    │              │               │
  └────┴────┴────┴────┴────┘              └───────┬───────┘
       │                                          │
       └──────────┬───────────────────────────────┘
                  │
  PHASE 2 (병렬)
  ┌────┬────┬────┬────┬────┐
  │    │    │    │    │    │
 2-1  2-2  2-3  2-4  2-5  2-6
 home pkg  cont why  faq  about
 (s)  (s)  (s)  (h)  (h)  (h)
  │    │    │    │    │    │
  └────┴────┴────┴────┴────┘
                  │
  PHASE 3 (병렬)
  ┌────┬────┬────┐
  │    │    │    │
 3-1  3-2  3-3  3-4
 sch  exp  dest gal
 (s)  (h)  (h)  (h)
  │    │    │    │
  └────┴────┴────┘
                  │
  PHASE 4 (부분 순차)
  │
  └─ [4-1] ai-blog-schema (h)
       │
       └─ [4-2] ai-blog-engine (s)
            │
       ┌────┼────────────┐
       │    │            │
      4-3  4-4          4-6
      api  feed-ui      naver
      (s)  (s)          (s)
       │    │            │
       └────┤            │
            │            │
           4-5           │
           blog-page     │
           (h)           │
            │            │
            └────────────┘
                  │
  PHASE 5 (순차)
  │
  └─ [5-1] integration-test (s)
       │
       └─ [5-2] seo-meta (h)
```

**(h) = haiku, (s) = sonnet**
**opus는 이 플로우에서 사용하지 않음 — 현재 대화(opus)가 전체 조율/리뷰 담당**

---

## 4. Token Usage Estimate

### Model별 예상 토큰 사용량

| Phase | Agent 수 | haiku | sonnet | opus | 비고 |
|-------|---------|-------|--------|------|------|
| 0 | 1 | - | 1 | - | 프로젝트 초기화 |
| 1A | 6 | 6 | - | - | 데이터 파일 (단순) |
| 1B | 2 | - | 2 | - | 디자인 시스템 |
| 2 | 6 | 3 | 3 | - | 핵심 페이지 |
| 3 | 4 | 3 | 1 | - | 기능 페이지 |
| 4 | 6 | 2 | 4 | - | AI Blog 시스템 |
| 5 | 2 | 1 | 1 | - | 통합/SEO |
| **합계** | **27** | **15 (56%)** | **12 (44%)** | **0** | |

### 토큰 절약 포인트
- **haiku 15개 에이전트 (56%)**: 단순 데이터/복제 작업 → 비용 대비 효율 극대화
- **sonnet 12개 에이전트 (44%)**: 로직이 필요한 개발만 → 품질 보장
- **opus 0개**: 현재 메인 대화에서 조율 역할만 수행 → 별도 에이전트 불필요
- **병렬 실행**: Phase 1은 최대 8개 동시, Phase 2는 6개 동시 → 시간 절감

---

## 5. Agent Context Injection Rules (컨텍스트 절약)

### 원칙: "각 에이전트에 필요한 최소한의 정보만 전달"

| Agent Type | 전달할 컨텍스트 | 전달하지 않을 것 |
|-----------|---------------|----------------|
| data-* (haiku) | 해당 데이터 테이블만 복사 (20-50줄) | 기획안 전체, 다른 섹션, 와이어프레임 |
| page-* (sonnet) | 해당 페이지 와이어프레임 + 컴포넌트 목록 + 데이터 파일 경로 | 다른 페이지 기획, 마케팅 전략, 비용 분석 |
| page-* (haiku) | 참고할 기존 페이지 경로 + 해당 페이지 기획 요약 (10줄) | 상세 와이어프레임, UX 가이드라인 |
| ai-blog-* | AI 시스템 아키텍처 섹션 (4.10) | 패키지 가격, FAQ, 식당 리스트 |
| naver-* | 네이버 연동 섹션 (4.10.4) | 홈페이지 디자인, 다른 기능들 |

### Context Size Target
- haiku 에이전트: **프롬프트 < 2,000 tokens**
- sonnet 에이전트: **프롬프트 < 5,000 tokens**
- 파일 읽기는 에이전트가 직접 수행 (컨텍스트 주입 대신)

---

## 6. Risk & Mitigation

| 리스크 | 영향 | 대응 |
|--------|------|------|
| 에이전트 간 코드 충돌 | 같은 파일 동시 수정 | 각 에이전트의 작업 파일을 명확히 분리, Phase별 순차 보장 |
| haiku 품질 미달 | 코드 오류, 불완전 | Phase 5 integration-test(sonnet)에서 일괄 검수 |
| 네이버 API 제한 | 블로그 자동 발행 불가 | Puppeteer 백업, Make(Integromat) 대안 |
| 컴포넌트 스타일 불일치 | UI 일관성 깨짐 | Phase 1B에서 디자인 시스템 먼저 확립 |
| 빌드 실패 | Phase 간 이행 불가 | 각 Phase 완료 후 `pnpm build` 확인 |

---

## 7. Execution Checklist

### 실행 전 확인사항
- [ ] Phase 0 실행 후 `pnpm dev` 정상 작동 확인
- [ ] Phase 1 실행 후 데이터 파일 import 확인 + 디자인 시스템 빌드 확인
- [ ] Phase 2 실행 후 모든 핵심 페이지 렌더링 확인
- [ ] Phase 3 실행 후 추가 페이지 렌더링 확인
- [ ] Phase 4 실행 후 AI Blog 생성 테스트 + 네이버 연동 테스트
- [ ] Phase 5 실행 후 전체 빌드 + Lighthouse 체크

### 각 Phase 완료 조건
- `pnpm build` 성공 (타입 에러 없음)
- `pnpm lint` 통과
- 해당 페이지 브라우저 렌더링 확인

---

## 8. Summary

| 항목 | 값 |
|------|------|
| 총 에이전트 수 | 27개 |
| haiku 에이전트 | 15개 (56%) — 토큰 효율 |
| sonnet 에이전트 | 12개 (44%) — 품질 보장 |
| opus 에이전트 | 0개 — 메인 대화에서 조율만 |
| 총 Phase 수 | 6개 (0~5) |
| 최대 병렬 실행 | 8개 (Phase 1) |
| 예상 총 실행 시간 | Phase별 순차, Phase 내 병렬 |

**실행 순서:** 0 → 1A+1B(병렬) → 2(병렬) → 3(병렬) → 4(부분순차) → 5(순차)

---

*Prepared: 2026-03-20*
*Status: PENDING REVIEW — 승인 후 실행*
