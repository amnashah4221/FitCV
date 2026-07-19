# FitCV — AI-Powered Resume Tailoring

> Land the job. Tailor your application in one click.

FitCV reads your resume, studies the job post, and writes a cover letter that actually sounds like you — with a skills match score you can trust.

**Live Demo:** https://fit-cv-frontend-omega.vercel.app/ **Backend:** https://fit-cv-yo6i.vercel.app/

---

## What it does

- **AI Cover Letter Generation** — Upload your resume PDF + paste any job description → get a personalized cover letter streamed in real time (typing effect)
- **Skills Match Analyzer** — AI extracts skills from both your resume and the job post, compares them, and gives you a 0–100% match score with Matched ✓, Missing ✗, and Bonus ★ skill lists
- **Analysis History** — Every analysis saved to your account. Revisit, expand, copy, or delete past results
- **3 Tone Options** — Professional, Enthusiastic, or Concise — affects how the cover letter is written
- **Guest Mode** — Try the analyzer without creating an account (history not saved)
- **Works for any field** — Tech, marketing, finance, design, HR — AI handles it all, no hardcoded skill lists

---

## Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework |
| Tailwind CSS | Styling |
| React Router v6 | Client-side routing |
| Axios | API calls |
| Formik + Yup | Form validation |
| react-dropzone | PDF drag-and-drop upload |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database |
| JWT + bcryptjs | Authentication |
| Multer | File upload handling |
| pdf-parse | PDF text extraction |
| Groq SDK (Llama-3.3-70B) | AI cover letter + skills analysis |

### Infrastructure
| Service | Purpose |
|---|---|
| Vercel | Frontend deployment |
| Vercel | Backend deployment |
| MongoDB Atlas | Cloud database |
| Groq API | LLM inference |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB Atlas account (free)
- Groq API key (free) — [console.groq.com](https://console.groq.com)

### 1. Clone the repo

```bash
git clone https://github.com/amnashah4221/FitCV.git
cd FitCV
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

Start the server:

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## Key Features — Technical Highlights

### Streaming cover letter (SSE)
The cover letter is streamed token by token using Server-Sent Events — the user sees text appear in real time as Groq generates it, instead of waiting for the full response.

### AI-powered skills extraction
Instead of a hardcoded skills list, both the resume and job description are sent to Llama-3.3-70B which extracts, compares, and categorizes skills intelligently — works for any industry or role.

### JWT authentication with route guards
Protected routes on both frontend (`PrivateRoute` component) and backend (`protect` middleware). Guest mode allows analyzer access without an account — history is not saved for guests.

### PDF parsing pipeline
Resume PDF is uploaded via multipart form, stored in memory (not disk), parsed with `pdf-parse`, and the extracted text is passed directly to the AI — no temporary files stored on server.

---

## Environment Variables

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRE` | Token expiry (e.g. `7d`) |
| `GROQ_API_KEY` | Groq API key for Llama-3 |
| `PORT` | Server port (default 5000) |

---

## What I learned building this

- Streaming API responses (SSE) with React readers
- JWT auth flow with protected routes on both frontend and backend
- PDF parsing and passing binary data through an API pipeline
- Prompt engineering for structured JSON output from LLMs
- Full-stack deployment (Vercel + Railway + MongoDB Atlas)

---

## Author

**Amna Shah** — Associate Software Engineer  
[GitHub](https://github.com/amnashah4221) · amnashah4221@gmail.com
