# 클라이언트 미팅 체크리스트

> 클라이언트에게 받아야 할 정보와 결정사항 목록
> 이 항목들이 채워져야 사이트가 완전히 운영 가능합니다.

---

## 1. 연락처 정보 (필수)

| 항목 | 현재 (더미값) | 클라이언트에게 받을 값 |
|------|-------------|---------------------|
| 한국 전화번호 | +82-2-xxx-xxxx | |
| 인도 전화번호 | +91-xx-xxxx-xxxx | |
| WhatsApp 번호 | 82xxxxxxxxxx | |
| 이메일 주소 | info@discoverkorea.edu | |
| 서울 사무실 주소 | 123 Gangnam-daero (가짜) | |
| 인도 사무실 주소 | 456 Connaught Place (가짜) | |

**적용 위치**: Header, Footer, Contact 페이지, FAQ, WhatsApp 플로팅 버튼 — 전체 일괄 교체

---

## 2. 도메인 (필수)

| 항목 | 질문 |
|------|------|
| 사용할 도메인 | discoverkorea.edu? discoverkorea.in? koreaedu.tours? 새로 구매? |
| Vercel 커스텀 도메인 연결 여부 | 현재: india-korea-travel-main.vercel.app |

**참고**: 도메인이 결정되면 Sitemap, robots.txt, OG 메타데이터, 이메일 발신 주소 등 전체 교체 필요

---

## 3. 소셜 미디어 계정 (필수)

| 플랫폼 | 현재 (더미) | 실제 URL |
|--------|-----------|---------|
| Instagram | instagram.com/discoverkorea | |
| YouTube | youtube.com/@discoverkorea | |
| Facebook | facebook.com/discoverkorea | |
| Naver Blog | blog.naver.com (메인페이지) | |

**질문**: 계정이 아직 없으면 만들어야 하나요? 어떤 플랫폼을 우선 운영할 건가요?

---

## 4. PDF 자료 (중요)

For Schools 페이지에서 다운로드 버튼이 있지만 실제 파일이 없습니다.

| 자료 | 상태 | 비고 |
|------|------|------|
| Program Proposal PDF | 미제공 | 학교 관리자용 프로그램 제안서 |
| Itinerary PDF | 미제공 | 패키지별 상세 일정표 |
| Safety Guidelines | 미제공 | 안전 관리 가이드라인 |
| Parent Info Sheet | 미제공 | 학부모 안내문 |

**현재 처리**: 다운로드 버튼 클릭 시 Contact(문의) 페이지로 이동하도록 설정됨

---

## 5. 실제 사진 (권장)

현재 Unsplash 무료 이미지를 사용 중입니다. 실제 투어 사진이 있으면 훨씬 신뢰감이 높아집니다.

| 사진 종류 | 필요 매수 | 용도 |
|-----------|---------|------|
| 학생 단체 투어 사진 | 5~10장 | Gallery, 홈페이지 |
| 캠퍼스 방문 사진 (KAIST, 연세대 등) | 3~5장 | Experiences 카드 |
| DMZ 방문 사진 | 2~3장 | Experiences 카드 |
| 산업 시설 방문 사진 (삼성, 현대 등) | 2~3장 | Experiences 카드 |
| 문화 체험 사진 (한복, 태권도 등) | 3~5장 | Gallery, Experiences |

**형식**: JPG/PNG, 가로 1200px 이상 권장

---

## 6. 외부 서비스 결정 (운영 시 필요)

### 6-1. 문의 폼 이메일 수신
현재 문의 폼(Contact) 제출 시 서버 로그에만 기록되고 이메일이 오지 않습니다.

| 옵션 | 비용 | 난이도 |
|------|------|--------|
| **Resend** (추천) | 무료 100통/일 | 쉬움 — API 키만 발급 |
| SendGrid | 무료 100통/일 | 보통 |
| Google Sheets 연동 | 무료 | 보통 |

**필요한 것**: 서비스 선택 + API 키 발급

### 6-2. 뉴스레터 이메일 발송
구독 폼은 이미 작동합니다. 실제 이메일 발송을 위해:

| 항목 | 내용 |
|------|------|
| 서비스 | Resend (이미 구축됨) |
| 필요한 것 | Resend API 키 (https://resend.com 가입 → 무료) |
| Vercel 설정 | Settings → Environment Variables → `RESEND_API_KEY` 추가 |

**참고**: 문의 폼과 뉴스레터 모두 Resend 하나로 처리 가능

### 6-3. AI 블로그 자동 생성
AI가 한국 여행 관련 블로그 글을 자동 생성하는 기능이 내장되어 있습니다.

| 항목 | 내용 |
|------|------|
| 서비스 | Claude API (Anthropic) |
| 필요한 것 | Anthropic API 키 (https://console.anthropic.com) |
| Vercel 설정 | `ANTHROPIC_API_KEY` 추가 |
| 비용 | 글 1개당 약 $0.01~0.05 |

**현재**: API 키 없이도 미리 작성된 5개 블로그 글이 표시됨

### 6-4. Naver 블로그 연동
AI가 생성한 글을 네이버 블로그에도 동시 게시하는 기능입니다.

| 항목 | 내용 |
|------|------|
| 필요한 것 | 네이버 개발자 앱 등록 → Client ID/Secret 발급 |
| Vercel 설정 | `NAVER_CLIENT_ID`, `NAVER_CLIENT_SECRET`, `NAVER_BLOG_ID` |

---

## 7. OG 이미지 (권장)

소셜 미디어에서 링크 공유 시 표시되는 미리보기 이미지입니다.

| 항목 | 사이즈 | 용도 |
|------|--------|------|
| 기본 OG 이미지 | 1200 x 630px | 홈페이지, 패키지 등 공유 시 |
| 로고 이미지 | 512 x 512px | 파비콘, 앱 아이콘 |

**질문**: 로고가 있나요? 디자인 의뢰가 필요한가요?

---

## 미팅 시 우선순위

```
1순위 (사이트 운영 필수)
  → 연락처 정보 (1번)
  → 도메인 결정 (2번)

2순위 (신뢰도 향상)
  → 소셜 미디어 계정 (3번)
  → 실제 투어 사진 (5번)

3순위 (기능 활성화)
  → Resend API 키 발급 (6-1, 6-2)
  → PDF 자료 준비 (4번)

4순위 (추후)
  → AI 블로그 API 키 (6-3)
  → 네이버 연동 (6-4)
  → OG 이미지/로고 (7번)
```
