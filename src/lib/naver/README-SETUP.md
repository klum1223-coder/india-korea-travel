# Naver Blog Integration — Setup Guide

This module lets KoreaEdu Tours automatically publish blog posts to Naver Blog and display the latest Naver Blog posts on the homepage.

The system is designed for **graceful degradation**: if Naver is not configured, publishing is silently skipped and the homepage falls back to mock data. No runtime errors will occur.

---

## 1. Register at Naver Developer Center

1. Go to [https://developers.naver.com](https://developers.naver.com) and sign in with a Naver account.
2. Navigate to **Application > Register Application**.
3. Fill in the application name (e.g., "KoreaEdu Tours Blog").
4. Under **API Usage**, enable:
   - **Blog** (블로그) — for reading RSS / writing posts
   - **Login with Naver** (네이버 로그인) — required for the OAuth token exchange
5. Set the **Callback URL** for OAuth (e.g., `https://your-domain.com/api/naver/callback`).
6. After registration you will receive a **Client ID** and **Client Secret**.

---

## 2. Required Environment Variables

Add these to your `.env.local` file (never commit this file):

```bash
# Naver Developer application credentials
NAVER_CLIENT_ID=your_client_id_here
NAVER_CLIENT_SECRET=your_client_secret_here

# The Naver Blog ID to publish to (the part after blog.naver.com/)
# e.g., for https://blog.naver.com/koreaedu → NAVER_BLOG_ID=koreaedu
NAVER_BLOG_ID=your_blog_id_here

# OAuth 2.0 access token obtained after completing the OAuth flow (see below)
NAVER_ACCESS_TOKEN=your_access_token_here
```

For production, set these as environment variables in your hosting provider (Vercel, etc.).

---

## 3. OAuth Flow Overview

Naver uses OAuth 2.0. You need a valid access token to write posts. The steps are:

### Step 1 — Authorization request

Redirect the user (blog owner) to:

```
https://nid.naver.com/oauth2.0/authorize
  ?response_type=code
  &client_id=NAVER_CLIENT_ID
  &redirect_uri=YOUR_CALLBACK_URL
  &state=RANDOM_STATE_STRING
```

### Step 2 — Handle the callback

Naver redirects back to your callback URL with `?code=AUTH_CODE&state=...`.

Exchange the code for tokens:

```
POST https://nid.naver.com/oauth2.0/token
  grant_type=authorization_code
  &client_id=NAVER_CLIENT_ID
  &client_secret=NAVER_CLIENT_SECRET
  &code=AUTH_CODE
  &state=RANDOM_STATE_STRING
```

The response includes `access_token` and `refresh_token`.

### Step 3 — Store the token

Set `NAVER_ACCESS_TOKEN` to the returned `access_token` value.

Tokens expire after a period (typically 1 hour); use the `refresh_token` to obtain a new access token before it expires.

> **Note:** For a small editorial workflow (publishing a few posts per day), it is common practice to manually refresh the token and update the environment variable as needed, rather than building a full refresh flow.

---

## 4. Blog Write API

Once the access token is set, `publishToNaverBlog(post)` will:

1. Choose Korean content (`titleKo` / `bodyKo`) if available, otherwise English.
2. Wrap the body in Naver-compatible inline-styled HTML via `convertToNaverHTML()`.
3. Map the post's category to a Naver Blog category via `mapToNaverCategory()`.
4. POST to `https://openapi.naver.com/blog/writePost.json`.
5. Return the published post URL and store it in the post's `naverBlogUrl` field.

---

## 5. RSS Feed (Read Only — No Auth Required)

`fetchNaverBlogPosts(blogId, count)` fetches:

```
https://rss.blog.naver.com/{blogId}.xml
```

This requires no credentials. It is used to display "Latest on Naver Blog" on the homepage. If the fetch fails for any reason, it returns mock placeholder posts so the UI never breaks.

---

## 6. Graceful Degradation Summary

| Scenario | Behaviour |
|---|---|
| No env vars set | `publishToNaverBlog` logs a message and returns `{ success: false }`. No error thrown. |
| `NAVER_ACCESS_TOKEN` missing | Returns a clear error: "Naver access token not configured." |
| RSS fetch fails | `fetchNaverBlogPosts` catches the error and returns mock data. |
| `blog-posts.json` missing | POST route returns an empty list; 404 for unknown slugs. |

---

## 7. Triggering a Publish

Send a POST request to `/api/naver/publish`:

```bash
curl -X POST https://your-domain.com/api/naver/publish \
  -H "Content-Type: application/json" \
  -d '{"postSlug": "top-5-cherry-blossom-spots-seoul"}'
```

The route will find the post in `src/lib/data/blog-posts.json`, publish it, and save the returned Naver URL back to the data file.

To fetch the latest Naver Blog posts:

```bash
curl https://your-domain.com/api/naver/publish
```
