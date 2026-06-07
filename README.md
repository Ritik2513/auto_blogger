<div align="center">

# Auto-Blogger

**AI-powered video-to-blog post generator**

Upload a recorded video → Auto-Blogger transcribes it, generates a structured blog post using OpenAI GPT, and publishes it — all from a single admin dashboard.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-auto--blogger-111827?style=flat-square&logo=vercel&logoColor=white)](#)
&nbsp;
[![Stack](https://img.shields.io/badge/Stack-MERN%20%2B%20OpenAI%20GPT-20232a?style=flat-square)](https://github.com/Ritik2513/Auto-Blogger)
&nbsp;
[![License](https://img.shields.io/badge/License-MIT-639922?style=flat-square)](LICENSE)

</div>

---

## What is Auto-Blogger?

Auto-Blogger eliminates the manual effort of turning video content into written blog posts. Instead of hiring a writer or transcribing videos by hand, content creators and marketing teams upload a recorded video — Auto-Blogger handles transcription, content structuring, and blog generation using OpenAI GPT.

The generated draft is presented in an admin dashboard where it can be reviewed, edited, and published or saved for later.

**The problem it solves:** Content teams record hours of video — tutorials, walkthroughs, interviews — but converting that into SEO-ready blog posts takes hours of manual work. Auto-Blogger reduces that to minutes.

---

## How it works

```
User uploads a recorded video
         │
         ▼
Server extracts audio from the video file
         │
         ▼
OpenAI Whisper transcribes audio → raw transcript text
         │
         ▼
Transcript sent to OpenAI GPT with a structured prompt
         │   "Convert this transcript into a well-structured blog post
         │    with a title, introduction, sections with headings,
         │    and a conclusion. Optimize for readability."
         ▼
GPT returns a formatted blog post (title + body + sections)
         │
         ▼
Draft saved to MongoDB with status: draft
         │
         ▼
Admin reviews in dashboard → edits if needed → publishes
         │
         ▼
Post goes live on the public blog frontend
```

---

## Features

### AI generation
- **Video-to-blog pipeline** — upload any recorded video and receive a fully structured blog post
- **OpenAI GPT-powered** — GPT structures the transcript into a readable, SEO-friendly article with title, headings, and conclusion
- **Audio transcription** — speech extracted and converted to text before generation
- **Editable drafts** — all AI-generated content is editable before publishing

### Admin dashboard
- **Create posts** — trigger generation from a video upload
- **Edit posts** — rich text editing of AI-generated drafts
- **Publish / unpublish** — control post visibility without deleting
- **Delete posts** — permanent removal from the database
- **Post management** — view all posts with status (draft / published)

### Public blog
- **Published posts frontend** — clean reading view for published blog content
- **Draft protection** — unpublished drafts are never visible to public readers

---

## Tech stack

| Layer | Technology |
|-------|-----------|
| Frontend | React.js, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| AI — text generation | OpenAI GPT (gpt-3.5-turbo / gpt-4) |
| AI — transcription | OpenAI Whisper API |
| Auth | JWT, httpOnly cookies |
| Deployment | Vercel (client), Render (server) |

---

## Getting started

### Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- OpenAI API key ([get one here](https://platform.openai.com/api-keys))

### 1. Clone the repository

```bash
git clone https://github.com/Ritik2513/Auto-Blogger.git
cd Auto-Blogger
```

### 2. Configure environment variables

**Server** — create `.env` in the root (or `server/` if applicable):

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

OPENAI_API_KEY=your_openai_api_key

CLIENT_URL=http://localhost:5173
```

**Client** — create `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 3. Install dependencies

```bash
# Backend
npm install

# Frontend
cd client && npm install
```

### 4. Run the application

```bash
# Terminal 1 — start the backend
npm run dev

# Terminal 2 — start the React client
cd client && npm run dev
```

Client runs at `http://localhost:5173` · API at `http://localhost:5000`

---

## Project structure

```
Auto-Blogger/
├── client/                    # React frontend
│   └── src/
│       ├── components/        # PostCard, Editor, VideoUploader, Navbar
│       ├── pages/             # Home (public blog), Admin Dashboard, Login
│       ├── context/           # Auth context
│       └── utils/             # Axios instance
│
├── controllers/               # Route handler logic
│   ├── auth.controller.js
│   ├── post.controller.js
│   └── generate.controller.js # Video upload → transcription → GPT pipeline
├── middleware/                 # JWT auth, error handler
├── models/                    # Mongoose schemas (User, Post)
├── routes/                    # Express route definitions
├── utils/                     # OpenAI client setup, audio extraction helpers
└── index.js                   # App entry point
```

---

## Data models

### Post
```
_id, title, body (markdown/html), status (draft | published),
sourceVideoUrl, transcript, generatedBy (openai model used),
authorId (ref: User), createdAt, publishedAt
```

### User
```
_id, email, passwordHash, role (admin), createdAt
```

---

## API overview

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/auth/login` | Admin login | Public |
| `GET` | `/api/posts` | Get all published posts | Public |
| `GET` | `/api/posts/:id` | Get single post | Public |
| `POST` | `/api/generate` | Upload video → generate blog draft | Admin |
| `GET` | `/api/admin/posts` | Get all posts (draft + published) | Admin |
| `PATCH` | `/api/admin/posts/:id` | Edit post content | Admin |
| `PATCH` | `/api/admin/posts/:id/publish` | Publish / unpublish post | Admin |
| `DELETE` | `/api/admin/posts/:id` | Delete post | Admin |

---

## Key engineering decisions

**OpenAI Whisper for transcription, not a third-party service**
Whisper is OpenAI's own speech-to-text model — using it alongside GPT keeps the entire AI pipeline within a single API provider, simplifying auth, billing, and error handling. It also handles accented speech and technical vocabulary significantly better than browser-based Web Speech API.

**Draft-first publishing model**
AI-generated content is never auto-published. Every post starts as a `draft` requiring manual review. This prevents hallucinated or poorly structured content from going live — important for any production content pipeline. The admin explicitly chooses when to publish.

**JWT in httpOnly cookies**
The admin dashboard is the only authenticated surface. Tokens are stored in `httpOnly` cookies rather than `localStorage` to prevent XSS-based token theft — a meaningful security consideration for a content management interface.

---

## Roadmap

- [ ] Support for YouTube URL input (not just file upload)
- [ ] SEO metadata generation (meta description, slug, keywords) via GPT
- [ ] Rich text editor (TipTap / Quill) for post editing
- [ ] Image generation per post via DALL·E
- [ ] Scheduled publishing (publish at a specific date/time)
- [ ] TypeScript migration
- [ ] Multi-user support with role-based access

---

## Author

**Ritik Kumar Gupta** — Full Stack Engineer

[Portfolio](https://ritik2513.vercel.app) · [LinkedIn](https://www.linkedin.com/in/ritik-gupta-a69253229/) · [GitHub](https://github.com/Ritik2513) · [ritikgupta2513@gmail.com](mailto:ritikgupta2513@gmail.com)
