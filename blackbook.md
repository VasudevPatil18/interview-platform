# TALENT IQ
## Technical Interview Platform
### College Project Blackbook

---

**Project Title:** Talent IQ — Real-Time Technical Interview Platform

**Submitted By:** Vasudev Patil

**Institution:** *(Fill in your college name)*

**Department:** *(Fill in your department)*

**Academic Year:** 2025–2026

---

---

# INDEX

| Sr. No. | Topic | Page |
|:-------:|-------|:----:|
| 01 | Introduction | 3 |
| | 1.1 College Profile | 3 |
| | 1.2 Project Profile | 3 |
| 02 | Proposed System | 5 |
| | 2.1 Scope & Objective | 5 |
| | 2.2 Advantages | 6 |
| | 2.3 Feasibility Study | 7 |
| | 2.3.1 Technical Feasibility | 7 |
| | 2.3.2 Economical Feasibility | 8 |
| | 2.3.3 Operational Feasibility | 8 |
| 03 | System Analysis | 9 |
| | 3.1 Existing System | 9 |
| | 3.2 Need for New System | 10 |
| | 3.3 Detailed SRS | 11 |
| 04 | System Planning | 14 |
| | 4.1 Requirement Analysis & Data Gathering | 14 |
| | 4.2 Time-line Chart | 15 |
| 05 | Tools & Environment Used | 16 |
| | 5.1 Hardware and Software Requirement | 16 |
| | 5.1.1 Software Requirement | 16 |
| | 5.1.2 Hardware Requirement | 17 |
| | 5.1.3 Technology to be Used | 17 |
| | 5.2 Server-Side and Client-Side Tools | 19 |
| 06 | System Design | 20 |
| | 6.1 UML Diagrams | 20 |
| | 6.2 Database Design | 28 |
| | 6.2.1 Data Dictionary | 28 |
| | 6.2.2 Database Relationship Diagram | 32 |
| | 6.3 E-R Diagram | 33 |
| | 6.4 User Interface Design | 34 |
| 07 | System Testing | 38 |
| | 7.1 Unit Testing | 38 |
| | 7.2 Integration Testing | 40 |
| | 7.3 System Testing | 41 |
| 08 | Limitations | 43 |
| 09 | Future Enhancement | 44 |
| 10 | References | 46 |
| | 10.1 Webliography | 46 |
| | 10.2 Bibliography | 47 |

---

# 01. INTRODUCTION

## 1.1 College Profile

*(Fill in your institution name, address, university affiliation, NAAC grade, and establishment year here.)*

Example format:
- **Institution Name:** ABC College of Engineering & Technology
- **Address:** 123, College Road, City, State — 400001
- **Affiliated To:** Mumbai University / Savitribai Phule Pune University
- **Established:** 1995
- **NAAC Grade:** A+

---

## 1.2 Project Profile

| Field | Details |
|-------|---------|
| **Project Name** | Talent IQ |
| **Project Type** | Full-Stack Web Application |
| **Domain** | Video Conferencing / Technical Interview Platform |
| **Version** | 1.0.0 |
| **Platform** | Browser-based (Cross-platform) |
| **Frontend URL** | https://interview-platform-iota-seven.vercel.app |
| **Backend URL** | https://interview-platform-3z5m.onrender.com |
| **Repository** | GitHub — VasudevPatil18/interview-platform |
| **Team Size** | 1 (Solo Project) |
| **Duration** | 8 Weeks |
| **Academic Year** | 2025–2026 |

### Brief Description

Talent IQ is a full-stack real-time technical interview platform that enables interviewers and candidates to conduct live coding sessions entirely within a browser. The platform integrates:

- **HD Video & Audio Calls** using WebRTC (Peer-to-Peer, no media server required)
- **Collaborative Code Editor** powered by Monaco Editor (the same engine as VS Code)
- **End-to-End Encrypted Code Sync** using ECDH key exchange + AES-GCM 256-bit encryption
- **Multi-language Code Execution** supporting JavaScript, Python, and Java
- **Session Scheduling** with automated email notifications and reminders
- **Mutual Feedback System** where both interviewer and candidate rate each other
- **Admin Dashboard** with user management, session monitoring, and analytics
- **Real-time Chat** during sessions with code snippet sharing support
- **Screen Sharing** capability for demonstrations
- **Notification System** with bell icon and in-app alerts

The system is deployed on Render (backend) and Vercel (frontend) with MongoDB Atlas as the cloud database, making it fully accessible from anywhere without any installation.

### Key Technical Highlights

| Feature | Technology Used |
|---------|----------------|
| P2P Video Call | WebRTC with DTLS-SRTP encryption |
| Code Encryption | ECDH (P-256) + AES-GCM 256-bit via Web Crypto API |
| Real-time Sync | Socket.io 4 with WebSocket transport |
| Code Editor | Monaco Editor (@monaco-editor/react) |
| Authentication | JWT (JSON Web Tokens) + bcrypt password hashing |
| Database | MongoDB Atlas with Mongoose ODM |
| Email | Resend API + Nodemailer fallback |
| Code Execution | Node.js vm sandbox (JS) + child_process (Python/Java) |

---

# 02. PROPOSED SYSTEM

## 2.1 Scope & Objective

### Scope

The scope of Talent IQ covers the following functional areas:

1. **User Management** — Registration, login, JWT-based authentication, password reset via email, role-based access (user/admin)
2. **Session Management** — Create instant sessions, schedule future sessions, join via meeting code, end sessions
3. **Real-time Communication** — P2P video/audio via WebRTC, real-time code sync via Socket.io, in-session chat
4. **Code Execution** — Server-side execution of JavaScript (sandboxed vm), Python (child process), and Java (JDK child process)
5. **Security** — End-to-end encrypted code transmission, bcrypt password hashing, JWT token auth, CORS protection
6. **Notifications** — In-app notification bell, email invites, meeting reminders
7. **Feedback** — Post-session mutual rating (1–5 stars) and written review
8. **Admin Panel** — User management (ban/unban), session monitoring, analytics dashboard

### Objectives

| # | Objective | Success Criteria |
|---|-----------|-----------------|
| 1 | Provide a seamless real-time coding interview environment | Two users can join, see each other's code live |
| 2 | Ensure privacy via end-to-end encrypted code transmission | Server never receives plaintext code |
| 3 | Enable session scheduling with email notifications | Candidate receives email with join link |
| 4 | Allow both parties to rate and review each other | Feedback stored and visible post-session |
| 5 | Give admins full visibility and control | Admin can ban users, view all sessions |
| 6 | Support multi-language code execution | JS, Python, Java all execute correctly |
| 7 | Deploy as a publicly accessible web application | Live URL accessible from any browser |

---

## 2.2 Advantages

| # | Advantage | Description |
|---|-----------|-------------|
| 1 | **All-in-One Platform** | Video call + code editor + scheduling in one browser tab |
| 2 | **E2E Encrypted Code** | AES-GCM 256-bit encryption; server never sees plaintext code |
| 3 | **P2P Video** | WebRTC DTLS-SRTP ensures encrypted media without a media server |
| 4 | **No Plugin Required** | Runs entirely in the browser using standard Web APIs |
| 5 | **Multi-language Support** | JavaScript, Python, and Java execution on the server |
| 6 | **Scheduling System** | Built-in interview scheduling with automated email reminders |
| 7 | **Mutual Feedback** | Both interviewer and candidate can rate each other (1–5 stars + review) |
| 8 | **Admin Controls** | Admins can manage users, sessions, and view analytics |
| 9 | **Responsive Design** | Works on desktop and mobile with adaptive layouts |
| 10 | **Free to Deploy** | Runs on free tiers of Render, Vercel, and MongoDB Atlas |
| 11 | **Real-time Cursor** | Remote cursor position visible in the code editor |
| 12 | **Screen Sharing** | Built-in screen share replaces video track seamlessly |

---

## 2.3 Feasibility Study

### 2.3.1 Technical Feasibility

Technical feasibility assesses whether the required technology is available and whether the development team has the skills to implement it.

| Component | Technology | Availability | Skill Level |
|-----------|-----------|--------------|-------------|
| Frontend Framework | React 19 + Vite 7 | ✅ Open Source | High |
| UI Library | TailwindCSS 4 + DaisyUI 5 | ✅ Open Source | High |
| Backend Runtime | Node.js 18+ | ✅ Open Source | High |
| Database | MongoDB Atlas (Free Tier) | ✅ Cloud Service | High |
| Real-time Engine | Socket.io 4 | ✅ Open Source | Medium |
| Video/Audio | WebRTC (Browser Native) | ✅ Built-in Browser API | Medium |
| Encryption | Web Crypto API (ECDH + AES-GCM) | ✅ Built-in Browser API | Medium |
| Code Editor | Monaco Editor | ✅ Open Source (MIT) | Medium |
| Email Service | Resend API (Free Tier) | ✅ Cloud Service | Low |
| Code Execution | Node.js vm + child_process | ✅ Built-in Node.js | Medium |
| Deployment | Render + Vercel (Free Tier) | ✅ Cloud Service | Low |

**Conclusion:** The project is technically feasible. All required technologies are open-source or available on free tiers, and the development team has the necessary skills.

---

### 2.3.2 Economical Feasibility

Economical feasibility evaluates whether the project can be built and maintained within budget.

**Development Cost:**

| Item | Cost |
|------|------|
| Developer Time (Solo, Academic Project) | ₹0 (self-developed) |
| Development Tools (VS Code, Git) | ₹0 (free) |
| Design Tools | ₹0 (TailwindCSS + DaisyUI) |

**Operational Cost (Monthly):**

| Service | Plan | Cost |
|---------|------|------|
| Render (Backend Hosting) | Free Tier | ₹0 |
| Vercel (Frontend Hosting) | Hobby (Free) | ₹0 |
| MongoDB Atlas | M0 Free Cluster | ₹0 |
| Resend (Email) | Free (3000 emails/month) | ₹0 |
| Domain Name | .com domain | ~₹800/year |
| TURN Server (optional) | Metered.ca Free | ₹0 |
| **Total Monthly** | | **~₹0–₹70/month** |

**Conclusion:** The project is economically feasible with near-zero operational cost, making it ideal for academic and startup use.

---

### 2.3.3 Operational Feasibility

Operational feasibility determines whether the system will be used effectively once deployed.

| Factor | Assessment |
|--------|-----------|
| **User Interface** | Clean, modern UI with DaisyUI components — minimal learning curve |
| **Browser Compatibility** | Works on Chrome 90+, Firefox 88+, Edge 90+, Safari 15+ |
| **Installation Required** | None — fully browser-based |
| **Training Required** | Minimal — intuitive interview-style workflow |
| **Admin Operations** | Simple dashboard for non-technical admins |
| **Maintenance** | Auto-deploy via GitHub → Render/Vercel pipeline |
| **Scalability** | MongoDB Atlas scales automatically; Render can be upgraded |

**Conclusion:** The system is operationally feasible. Users only need a modern browser and internet connection. No installation or technical knowledge is required.

---

# 03. SYSTEM ANALYSIS

## 3.1 Existing System

The current landscape of technical interview tools requires candidates and interviewers to use multiple separate applications simultaneously, leading to context switching, technical issues, and a fragmented experience.

| Platform | Primary Feature | Missing Features |
|----------|----------------|-----------------|
| **Google Meet / Zoom** | Video calling | No code editor, no code execution |
| **HackerRank** | Code assessment | No video call, no real-time collaboration |
| **CoderPad** | Collaborative code editor | No video call, limited scheduling |
| **LeetCode** | Problem solving | No real-time collaboration, no video |
| **Pramp** | Mock interviews | Limited scheduling, no E2E encryption |
| **Interviewing.io** | Anonymous interviews | Paid service, no self-hosting |

### Problems with Existing Systems

```
Current Interview Setup (3 separate tools):
┌─────────────────┐   ┌──────────────────┐   ┌──────────────────┐
│   Video Call    │ + │   Code Editor    │ + │   Scheduling     │
│   (Zoom/Meet)   │   │   (CoderPad)     │   │   (Calendly)     │
└─────────────────┘   └──────────────────┘   └──────────────────┘
        ↓                      ↓                      ↓
   Context Switch         No Encryption          No Integration
   Audio Issues           No Code Run            Manual Reminders
   Screen Share Only      No Video               Separate Login
```

**Key Problems Identified:**
1. Interviewers must manage 2–3 browser tabs simultaneously
2. No integrated code execution — candidates cannot test their code
3. Code shared via screen share is not encrypted
4. No unified feedback mechanism
5. Scheduling is done via separate tools with no integration
6. No admin oversight of interview sessions

---

## 3.2 Need for New System

```
Talent IQ — Unified Solution:
┌──────────────────────────────────────────────────────────=─┐
│                        TALENT IQ                           │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  HD Video    │  │  Encrypted   │  │   Scheduling +   │  │
│  │  P2P Call    │  │  Code Editor │  │   Email Alerts   │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Multi-lang  │  │   Mutual     │  │  Admin Panel +   │  │
│  │  Code Runner │  │   Feedback   │  │   Analytics      │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└────────────────────────────────────────────────────────────┘
```

The new system addresses all identified problems:

| Problem | Solution in Talent IQ |
|---------|----------------------|
| Multiple tools needed | Single browser tab for everything |
| No code execution | Built-in JS/Python/Java runner |
| Unencrypted code sharing | AES-GCM 256-bit E2E encryption |
| No feedback system | Post-session mutual rating + review |
| Manual scheduling | Built-in scheduler with email notifications |
| No admin oversight | Full admin dashboard with analytics |

---

## 3.3 Detailed SRS (Software Requirement Specification)

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-01 | User shall register with name, email, and password (min 6 chars) | High |
| FR-02 | User shall log in with email and password; receive JWT token | High |
| FR-03 | User shall reset password via email token (expires in 1 hour) | High |
| FR-04 | Host shall create an instant session with problem + difficulty | High |
| FR-05 | Host shall invite participant via email during session creation | Medium |
| FR-06 | Participant shall join session via 9-character meeting code | High |
| FR-07 | Both users shall have real-time P2P video and audio via WebRTC | High |
| FR-08 | Code editor shall sync in real-time with E2E AES-GCM encryption | High |
| FR-09 | Remote cursor position shall be visible to the other user | Medium |
| FR-10 | Users shall be able to chat during the session | Medium |
| FR-11 | Users shall execute JavaScript code via sandboxed Node.js vm | High |
| FR-12 | Users shall execute Python code via server child process | High |
| FR-13 | Users shall execute Java code via server JDK child process | High |
| FR-14 | Host shall end the session | High |
| FR-15 | Both users shall submit star rating + written feedback after session | Medium |
| FR-16 | Host shall schedule future interviews with date/time | Medium |
| FR-17 | System shall send email invite with meeting link to candidate | Medium |
| FR-18 | Admin shall view all users and sessions | High |
| FR-19 | Admin shall ban/unban users | High |
| FR-20 | Admin shall view analytics (completion rate, popular problems) | Medium |
| FR-21 | Users shall receive in-app notifications for invites and reminders | Medium |
| FR-22 | Users shall share screen during video call | Low |
| FR-23 | Users shall toggle audio and video during call | High |

### Non-Functional Requirements

| ID | Requirement | Metric |
|----|-------------|--------|
| NFR-01 | Code transmission must be end-to-end encrypted | AES-GCM 256-bit |
| NFR-02 | Video/audio must be encrypted | DTLS-SRTP (WebRTC default) |
| NFR-03 | Page load time | < 3 seconds on 10 Mbps |
| NFR-04 | Session capacity | 2 concurrent users per session |
| NFR-05 | UI responsiveness | Works on screens ≥ 320px wide |
| NFR-06 | Password security | bcrypt with salt rounds = 10 |
| NFR-07 | JWT token expiry | 7 days |
| NFR-08 | Code execution timeout | 5 seconds per run |
| NFR-09 | Code input limit | 20,000 characters maximum |
| NFR-10 | Browser support | Chrome 90+, Firefox 88+, Edge 90+ |

### System Constraints

| Constraint | Description |
|-----------|-------------|
| **P2P Limit** | WebRTC supports only 2 users per session (no SFU/MCU) |
| **TURN Server** | Users behind strict NAT may need TURN server for video |
| **Code Execution** | Python and Java must be installed on the server |
| **File Storage** | Recordings stored as base64 in MongoDB (16MB document limit) |
| **Free Tier** | Render free tier spins down after 15 min of inactivity |

---

# 04. SYSTEM PLANNING

## 4.1 Requirement Analysis & Data Gathering

### Stakeholder Analysis

| Stakeholder | Role | Primary Needs |
|-------------|------|---------------|
| **Interviewer (Host)** | Creates session, evaluates candidate | Easy session creation, code visibility, feedback |
| **Candidate (Participant)** | Joins session, writes code | Smooth join experience, code execution, feedback |
| **Admin** | Manages platform | User control, session monitoring, analytics |
| **System** | Handles signaling, encryption, notifications | Reliability, security, performance |

### Data Gathering Methods

| Method | Details |
|--------|---------|
| **Literature Survey** | Studied WebRTC, Socket.io, Web Crypto API documentation |
| **Competitive Analysis** | Analyzed HackerRank, CoderPad, Pramp, LeetCode |
| **User Interviews** | Gathered requirements from students and developers |
| **Prototype Testing** | Built and tested iterative prototypes |

### Data Flow Analysis

```
User Input → React Frontend → Axios HTTP → Express API → MongoDB
                    ↕
              Socket.io ←→ Socket Server ←→ Other User
                    ↕
              WebRTC P2P ←→ (Direct Browser-to-Browser)
```

---

## 4.2 Time-line Chart (Gantt Chart)

```
Phase                        Wk1  Wk2  Wk3  Wk4  Wk5  Wk6  Wk7  Wk8
─────────────────────────────────────────────────────────────────────────
1. Requirement Analysis      ████ ████
2. UI/UX Design                   ████ ████
3. Backend API Development             ████ ████ ████
4. Database Design                     ████ ████
5. Frontend Development                     ████ ████ ████
6. WebRTC Integration                            ████ ████
7. Socket.io & Code Sync                         ████ ████
8. E2E Encryption                                     ████
9. Code Execution Engine                              ████ ████
10. Admin Panel                                            ████ ████
11. Email & Notifications                                  ████ ████
12. Testing & Bug Fixes                                         ████ ████
13. Deployment                                                       ████
14. Documentation                                                    ████
```

### Milestone Summary

| Milestone | Target Week | Status |
|-----------|-------------|--------|
| Backend API complete | Week 4 | ✅ Done |
| Frontend UI complete | Week 5 | ✅ Done |
| WebRTC video call working | Week 6 | ✅ Done |
| E2E encryption working | Week 6 | ✅ Done |
| Code execution working | Week 7 | ✅ Done |
| Admin panel complete | Week 7 | ✅ Done |
| Deployed to production | Week 8 | ✅ Done |
| Documentation complete | Week 8 | ✅ Done |

---

# 05. TOOLS & ENVIRONMENT USED

## 5.1 Hardware and Software Requirement

### 5.1.1 Software Requirement

**Development Environment:**

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18.x LTS | Backend JavaScript runtime |
| npm | 9.x | Package manager |
| MongoDB | 6.x | NoSQL database |
| Git | 2.x | Version control |
| VS Code | Latest | Code editor (IDE) |
| Python | 3.13+ | Server-side Python code execution |
| JDK (Eclipse Temurin) | 25+ | Java compilation and execution |
| Chrome / Firefox | 90+ | Development and testing browser |

**Production Environment:**

| Service | Purpose |
|---------|---------|
| Render.com | Node.js backend hosting |
| Vercel.com | React frontend hosting |
| MongoDB Atlas | Cloud database (M0 free cluster) |
| Resend.com | Email delivery service |
| GitHub | Source code repository + CI/CD |

---

### 5.1.2 Hardware Requirement

**Server (Render Free Tier):**

| Component | Specification |
|-----------|--------------|
| CPU | 0.1 vCPU (shared) |
| RAM | 512 MB |
| Storage | Ephemeral (no persistent disk) |
| Network | Unlimited bandwidth |
| OS | Linux (Ubuntu) |

**Client (User's Device — Minimum):**

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | Dual-core 2 GHz | Quad-core 3 GHz |
| RAM | 4 GB | 8 GB |
| Storage | 1 GB free (browser cache) | 5 GB SSD |
| Network | 2 Mbps | 10 Mbps |
| Camera | 720p webcam | 1080p webcam |
| Microphone | Any built-in | Noise-cancelling headset |
| Display | 1280×720 | 1920×1080 |

---

### 5.1.3 Technology to be Used

#### Complete Technology Stack

```
╔══════════════════════════════════════════════════════════════╗
║                    TALENT IQ TECH STACK                      ║
╠══════════════════════╦═══════════════════════════════════════╣
║     FRONTEND         ║           BACKEND                     ║
║                      ║                                       ║
║  React 19            ║  Node.js 18 + Express 5               ║
║  Vite 7 (bundler)    ║  MongoDB 6 + Mongoose 8               ║
║  TailwindCSS 4       ║  Socket.io 4 (WebSocket)              ║
║  DaisyUI 5           ║  JWT (jsonwebtoken)                   ║
║  Monaco Editor       ║  Bcryptjs (password hashing)          ║
║  Socket.io-client 4  ║  Nodemailer + Resend (email)          ║
║  React Query 5       ║  Multer (file uploads)                ║
║  React Router 7      ║  Inngest (background jobs)            ║
║  Axios               ║  Node.js vm (JS sandbox)              ║
║  Web Crypto API      ║  child_process (Python/Java)          ║
║  WebRTC (native)     ║  Vitest (unit testing)                ║
║  Lucide React        ║  fast-check (property testing)        ║
║  React Hot Toast     ║                                       ║
╠══════════════════════╬═══════════════════════════════════════╣
║     DATABASE         ║         DEPLOYMENT                    ║
║                      ║                                       ║
║  MongoDB Atlas       ║  Render.com (backend)                 ║
║  Collections:        ║  Vercel.com (frontend)                ║
║  - users             ║  GitHub Actions (CI/CD)               ║
║  - sessions          ║  MongoDB Atlas (cloud DB)             ║
║  - feedbacks         ║  Resend API (email)                   ║
║  - notifications     ║  UptimeRobot (monitoring)             ║
╚══════════════════════╩═══════════════════════════════════════╝
```

#### Technology Descriptions

**React 19** — A JavaScript library for building user interfaces using a component-based architecture. Used for all frontend UI components.

**Vite 7** — A next-generation frontend build tool that provides extremely fast Hot Module Replacement (HMR) during development and optimized production builds.

**TailwindCSS 4** — A utility-first CSS framework that enables rapid UI development without writing custom CSS.

**DaisyUI 5** — A component library built on top of TailwindCSS providing pre-built UI components like buttons, cards, modals, and stats.

**Monaco Editor** — The same code editor engine that powers VS Code. Provides syntax highlighting, auto-completion, and multi-language support.

**WebRTC** — Web Real-Time Communication is a browser-native API that enables peer-to-peer audio, video, and data communication without plugins.

**Web Crypto API** — A browser-native cryptography API used for ECDH key exchange and AES-GCM encryption/decryption.

**Socket.io 4** — A real-time bidirectional event-based communication library built on WebSocket with automatic fallback to HTTP long-polling.

**Node.js + Express 5** — The backend runtime and web framework for building the REST API and WebSocket server.

**MongoDB + Mongoose** — A NoSQL document database with an ODM (Object Document Mapper) for schema definition and validation.

**JWT** — JSON Web Tokens for stateless authentication. Tokens are signed with a secret key and expire after 7 days.

**Bcryptjs** — A library for hashing passwords using the bcrypt algorithm with configurable salt rounds (10 rounds used).

---

## 5.2 Server-Side and Client-Side Tools

### Server-Side Tools

| Tool | Version | Role |
|------|---------|------|
| Express.js | 5.x | REST API framework — handles HTTP routes |
| Socket.io | 4.x | Real-time signaling server for WebRTC and code sync |
| Mongoose | 8.x | MongoDB ODM — schema definition and DB queries |
| JWT | 9.x | Stateless authentication token generation and verification |
| Bcryptjs | 3.x | Password hashing with salt rounds |
| Nodemailer | 8.x | SMTP email sending (Gmail fallback) |
| Resend | 4.x | HTTP-based email API (primary email service) |
| Multer | 2.x | Multipart form data handling for file uploads |
| Inngest | 3.x | Background job scheduling and event-driven functions |
| Node.js `vm` | Built-in | Sandboxed JavaScript code execution |
| Node.js `child_process` | Built-in | Python and Java code execution via subprocess |
| Node.js `crypto` | Built-in | SHA-256 hashing for password reset tokens |
| Cookie-parser | 1.x | HTTP cookie parsing middleware |
| CORS | 2.x | Cross-Origin Resource Sharing middleware |
| Dotenv | 17.x | Environment variable loading from .env files |

### Client-Side Tools

| Tool | Version | Role |
|------|---------|------|
| React | 19.x | UI component framework |
| React Router | 7.x | Client-side routing and navigation |
| React Query (TanStack) | 5.x | Server state management and caching |
| Axios | 1.x | HTTP client for API requests |
| Socket.io-client | 4.x | WebSocket client for real-time events |
| WebRTC | Browser Native | P2P video/audio communication |
| Web Crypto API | Browser Native | ECDH key exchange + AES-GCM encryption |
| Monaco Editor | 4.x | VS Code-powered code editor component |
| React Hot Toast | 2.x | Toast notification system |
| Lucide React | 0.5x | Icon library |
| Canvas Confetti | 1.x | Celebration animation on session completion |
| Date-fns | 4.x | Date formatting and manipulation |

---

# 06. SYSTEM DESIGN

## 6.1 UML Diagrams

### 6.1.1 Use Case Diagram

```
                    ╔══════════════════════════════════════════╗
                    ║           TALENT IQ SYSTEM               ║
                    ║                                          ║
  ┌───────────┐     ║  ○ Register / Login                      ║
  │           │─────╫─▶○ Forgot / Reset Password               ║
  │           │     ║  ○ View Dashboard                        ║
  │Interviewer│─────╫─▶○ Create Instant Session                ║
  │  (Host)   │─────╫─▶○ Schedule Interview                    ║
  │           │─────╫─▶○ Invite Participant via Email          ║
  │           │─────╫─▶○ Start Video Call                      ║
  │           │─────╫─▶○ Write & Sync Code (Encrypted)         ║
  │           │─────╫─▶○ Execute Code (JS/Python/Java)         ║
  │           │─────╫─▶○ Chat in Session                       ║
  │           │─────╫─▶○ Share Screen                          ║
  │           │─────╫─▶○ End Session                           ║
  │           │─────╫─▶○ Submit Feedback (Rating + Review)     ║
  └───────────┘     ║                                          ║
                    ║                                          ║
  ┌───────────┐     ║  ○ Join Session via Meeting Code         ║
  │           │─────╫─▶○ Start Video Call                      ║
  │ Candidate │─────╫─▶○ Write & Sync Code (Encrypted)         ║
  │(Participant)────╫─▶○ Execute Code                          ║
  │           │─────╫─▶○ Chat in Session                       ║
  │           │─────╫─▶○ Submit Feedback                       ║
  │           │─────╫─▶○ View Notifications                    ║
  └───────────┘     ║                                          ║
                    ║                                          ║
  ┌───────────┐     ║  ○ View All Users                        ║
  │           │─────╫─▶○ Ban / Unban User                      ║
  │   Admin   │─────╫─▶○ View All Sessions                     ║
  │           │─────╫─▶○ Force End Session                     ║
  │           │─────╫─▶○ View Analytics Dashboard              ║
  └───────────┘     ║  ○ View Completion Rate & Trends         ║
                    ╚══════════════════════════════════════════╝
```

---

### 6.1.2 Activity Diagram — Complete Session Flow

```
  ┌─────────────────────────────────────────────────────────────┐
  │                    SESSION ACTIVITY FLOW                     │
  └─────────────────────────────────────────────────────────────┘

  [START]
     │
     ▼
  [User Opens Browser → https://interview-platform-iota-seven.vercel.app]
     │
     ▼
  [Login / Register]
     │
     ├──── New User ────▶ [Register with Name, Email, Password]
     │                              │
     │                              ▼
     │                   [JWT Token Issued → Stored in localStorage]
     │
     ▼
  [Dashboard Page]
     │
     ├──────────────────────────────────────────────────────────┐
     │                                                          │
     ▼                                                          ▼
  [Create Session]                                    [Join via Meeting Code]
     │                                                          │
     ▼                                                          ▼
  [Select Problem + Difficulty]                    [Enter 9-char Code e.g. ABC-123-XYZ]
     │                                                          │
     ▼                                                          │
  [Optional: Enter Invite Email]                               │
     │                                                          │
     ▼                                                          │
  [Email Sent with Join Link]                                  │
     │                                                          │
     └──────────────────────┬───────────────────────────────────┘
                            │
                            ▼
                   [Session Page Loads]
                            │
                            ▼
                   [Socket.io Connects to Server]
                            │
                            ▼
                   [join-room event emitted]
                            │
                   ┌────────┴────────┐
                   ▼                 ▼
            [First User]      [Second User Joins]
            [Waits...]        [existing-users event]
                                     │
                                     ▼
                            [WebRTC Handshake Begins]
                                     │
                            ┌────────┴────────┐
                            ▼                 ▼
                     [ECDH Key Exchange]  [ICE Candidates]
                            │                 │
                            ▼                 ▼
                     [Shared AES Key]   [P2P Connection]
                            │                 │
                            └────────┬────────┘
                                     │
                                     ▼
                            [Session Active]
                            ┌────────────────┐
                            │ Video/Audio    │
                            │ Code Editor    │
                            │ Encrypted Sync │
                            │ Chat           │
                            │ Code Execution │
                            └────────────────┘
                                     │
                                     ▼
                            [Host Clicks "End Session"]
                                     │
                                     ▼
                            [Session Status → "completed"]
                                     │
                                     ▼
                            [Feedback Modal (Both Users)]
                                     │
                            ┌────────┴────────┐
                            ▼                 ▼
                     [Submit Rating]   [Submit Rating]
                     [+ Review]        [+ Review]
                            │
                            ▼
                         [Dashboard]
                            │
                         [END]
```

---

### 6.1.3 Sequence Diagram — WebRTC Connection Establishment

```
  User A (Host)        Socket Server         User B (Participant)
       │                    │                        │
       │── connect() ───────▶│                        │
       │◀── connected ───────│                        │
       │                    │                        │
       │── join-room(A) ────▶│                        │
       │◀── existing-users   │                        │
       │    (empty list)     │                        │
       │                    │                        │── connect() ──▶│
       │                    │                        │◀── connected ──│
       │                    │                        │
       │                    │◀── join-room(B) ────────│
       │◀── user-joined(B) ──│                        │
       │                    │── existing-users(A) ───▶│
       │                    │                        │
       │ [Create RTCPeerConnection]                  │
       │── offer ───────────▶│── offer ──────────────▶│
       │                    │              [Create RTCPeerConnection]
       │                    │              [setRemoteDescription(offer)]
       │                    │              [createAnswer()]
       │◀── answer ──────────│◀── answer ──────────────│
       │ [setRemoteDescription(answer)]              │
       │                    │                        │
       │── ice-candidate ───▶│── ice-candidate ───────▶│
       │◀── ice-candidate ───│◀── ice-candidate ────────│
       │                    │                        │
       │ [P2P Connection Established — Direct Browser to Browser]
       │◀══════════════════════════════════════════════│
       │         Video + Audio + Data (P2P)           │
```

---

### 6.1.4 Sequence Diagram — E2E Encrypted Code Sync

```
  User A (Host)          Socket Server          User B (Participant)
       │                      │                        │
       │── e2e-public-key(A) ─▶│── e2e-public-key(A) ──▶│
       │                      │                        │ [ECDH: derive sharedKey from A's pubKey]
       │◀─ e2e-public-key(B) ──│◀─ e2e-public-key(B) ───│
       │ [ECDH: derive sharedKey from B's pubKey]       │
       │                      │                        │
       │ [Both now have same AES-GCM 256-bit key]       │
       │                      │                        │
       │ [User A types code]   │                        │
       │ [encrypt(code, AES)]  │                        │
       │── code-change(enc) ──▶│── code-change(enc) ───▶│
       │                      │                  [decrypt(enc, AES)]
       │                      │                  [Editor updates]
       │                      │                        │
       │── code-cursor(ln,col)─▶│── code-cursor ────────▶│
       │                      │              [Remote cursor shown]
       │                      │                        │
       │ [User A runs code]    │                        │
       │── POST /api/code/run ─────────────────────────▶│ (to server)
       │◀─ { output: "..." } ──────────────────────────│
       │ [Output shown in panel]                        │
```

---

### 6.1.5 Sequence Diagram — Authentication Flow

```
  Browser (React)          Express API           MongoDB Atlas
       │                       │                      │
       │── POST /auth/signup ──▶│                      │
       │   {name, email, pass}  │                      │
       │                       │── findOne({email}) ──▶│
       │                       │◀── null (not found) ──│
       │                       │── bcrypt.hash(pass) ──│ (10 rounds)
       │                       │── User.create() ──────▶│
       │                       │◀── user document ──────│
       │                       │── jwt.sign(userId) ───│
       │◀── {user, token} ──────│                      │
       │ [Store token in localStorage]                 │
       │                       │                      │
       │── GET /auth/me ────────▶│                      │
       │   Authorization: Bearer <token>               │
       │                       │── jwt.verify(token) ──│
       │                       │── User.findById() ────▶│
       │                       │◀── user document ──────│
       │◀── {user} ─────────────│                      │
```

---

## 6.2 Database Design

### 6.2.1 Data Dictionary

The application uses MongoDB (NoSQL) with 4 collections: `users`, `sessions`, `feedbacks`, and `notifications`.

---

#### Collection: `users`

| Field | Type | Required | Unique | Default | Description |
|-------|------|----------|--------|---------|-------------|
| `_id` | ObjectId | ✅ | ✅ | Auto | MongoDB primary key |
| `name` | String | ✅ | ❌ | — | Full name of the user |
| `email` | String | ✅ | ✅ | — | Email address (login identifier) |
| `password` | String | ✅ | ❌ | — | Bcrypt hashed password (min 6 chars) |
| `profileImage` | String | ❌ | ❌ | `""` | URL to profile picture |
| `role` | String | ✅ | ❌ | `"user"` | Enum: `"user"` or `"admin"` |
| `isActive` | Boolean | ✅ | ❌ | `true` | Account active/banned status |
| `resetPasswordToken` | String | ❌ | ❌ | `null` | SHA-256 hashed reset token |
| `resetPasswordExpires` | Date | ❌ | ❌ | `null` | Token expiry (1 hour from creation) |
| `createdAt` | Date | ✅ | ❌ | Auto | Mongoose timestamp |
| `updatedAt` | Date | ✅ | ❌ | Auto | Mongoose timestamp |

**Indexes:** `email` (unique)

**Pre-save Hook:** Password is automatically hashed with bcrypt (10 salt rounds) before saving.

**Instance Method:** `comparePassword(candidatePassword)` — compares plain text with hashed password.

---

#### Collection: `sessions`

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | ✅ | Auto | MongoDB primary key |
| `problem` | String | ✅ | — | Problem title or custom name |
| `difficulty` | String | ✅ | — | Enum: `easy`, `medium`, `hard` |
| `host` | ObjectId → User | ✅ | — | Session creator (interviewer) |
| `participant` | ObjectId → User | ❌ | `null` | Joined participant (candidate) |
| `status` | String | ✅ | `"active"` | Enum: `scheduled`, `active`, `completed`, `cancelled` |
| `callId` | String | ❌ | `""` | WebRTC call identifier |
| `meetingCode` | String | ✅ | Auto | Unique 9-char code (e.g. `ABC-123-XYZ`) |
| `sessionType` | String | ✅ | `"instant"` | Enum: `instant`, `scheduled` |
| `scheduledStartTime` | Date | ❌ | `null` | Planned start time for scheduled sessions |
| `scheduledEndTime` | Date | ❌ | `null` | Planned end time |
| `duration` | Number | ❌ | `60` | Duration in minutes |
| `timezone` | String | ❌ | `"UTC"` | Timezone string |
| `interviewer` | ObjectId → User | ❌ | `null` | Interviewer (for scheduled sessions) |
| `candidate` | ObjectId → User | ❌ | `null` | Candidate (for scheduled sessions) |
| `title` | String | ❌ | `""` | Custom session title |
| `description` | String | ❌ | `""` | Session description |
| `notes` | String | ❌ | `""` | Post-session notes |
| `invitedEmails` | [String] | ❌ | `[]` | List of invited email addresses |
| `reminderSent` | Boolean | ❌ | `false` | Whether reminder email was sent |
| `actualStartTime` | Date | ❌ | `null` | Actual start time |
| `actualEndTime` | Date | ❌ | `null` | Actual end time |
| `recording.data` | String | ❌ | `null` | Base64 encoded video data |
| `recording.mimeType` | String | ❌ | `"video/webm"` | Video MIME type |
| `recording.size` | Number | ❌ | `null` | File size in bytes |
| `recording.duration` | Number | ❌ | `null` | Recording duration in seconds |
| `recording.uploadedAt` | Date | ❌ | `null` | Upload timestamp |
| `recording.uploadedBy` | ObjectId → User | ❌ | `null` | Who uploaded the recording |
| `createdAt` | Date | ✅ | Auto | Mongoose timestamp |
| `updatedAt` | Date | ✅ | Auto | Mongoose timestamp |

**Indexes:** `meetingCode` (unique, sparse)

**Pre-save Hook:** Generates unique 9-character meeting code (format: `XXX-XXX-XXX`) before first save.

---

#### Collection: `feedbacks`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | ✅ | MongoDB primary key |
| `session` | ObjectId → Session | ✅ | Related session reference |
| `givenBy` | ObjectId → User | ✅ | User who submitted the feedback |
| `givenTo` | ObjectId → User | ✅ | User who received the feedback |
| `rating` | Number | ✅ | Star rating: 1–5 (validated min/max) |
| `review` | String | ❌ | Written review text (max 500 chars) |
| `createdAt` | Date | ✅ | Mongoose timestamp |
| `updatedAt` | Date | ✅ | Mongoose timestamp |

**Indexes:** `{ session: 1, givenBy: 1 }` (unique) — prevents duplicate feedback per session per user.

---

#### Collection: `notifications`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | ✅ | MongoDB primary key |
| `user` | ObjectId → User | ✅ | Notification recipient |
| `type` | String | ✅ | Enum: `meeting_invite`, `meeting_reminder`, `session_joined`, `session_ended` |
| `title` | String | ✅ | Short notification heading |
| `message` | String | ✅ | Full notification body text |
| `session` | ObjectId → Session | ❌ | Related session (if applicable) |
| `read` | Boolean | ✅ | Read status (default: `false`) |
| `actionUrl` | String | ❌ | Deep link URL for navigation |
| `createdAt` | Date | ✅ | Mongoose timestamp |

**Indexes:** `{ user: 1, read: 1, createdAt: -1 }` — optimized for fetching unread notifications sorted by date.

---

### 6.2.2 Database Relationship Diagram

```
╔══════════════╗          ╔══════════════════════╗         ╔══════════════╗
║    USERS     ║          ║       SESSIONS       ║         ║  FEEDBACKS   ║
╠══════════════╣          ╠══════════════════════╣         ╠══════════════╣
║ _id (PK)     ║◀────────║ host (FK)            ║         ║ _id (PK)     ║
║ name         ║◀────────║ participant (FK)     ║◀──────  ║ session (FK) ║
║ email        ║◀────────║ interviewer (FK)     ║         ║ givenBy (FK) ║──▶ USERS
║ password     ║◀────────║ candidate (FK)       ║         ║ givenTo (FK) ║──▶ USERS
║ role         ║         ║ _id (PK)              ║         ║ rating (1-5) ║
║ isActive     ║         ║ problem               ║         ║ review       ║
║ profileImage ║         ║ difficulty            ║         ╚══════════════╝
╚══════════════╝         ║ status                ║
        ▲                ║ meetingCode           ║
        │                ║ sessionType           ║
        │                ║ scheduledStartTime    ║
╔══════════════╗         ║ recording { data }    ║
║NOTIFICATIONS ║         ╚══════════════════════╝
╠══════════════╣
║ _id (PK)     ║
║ user (FK)    ║──▶ USERS
║ type         ║
║ title        ║
║ message      ║
║ read         ║
║ actionUrl    ║
╚══════════════╝

Relationships:
  Session.host          → Users._id  (Many-to-One)
  Session.participant   → Users._id  (Many-to-One)
  Session.interviewer   → Users._id  (Many-to-One)
  Session.candidate     → Users._id  (Many-to-One)
  Feedback.session      → Sessions._id (Many-to-One)
  Feedback.givenBy      → Users._id  (Many-to-One)
  Feedback.givenTo      → Users._id  (Many-to-One)
  Notification.user     → Users._id  (Many-to-One)
  Notification.session  → Sessions._id (Many-to-One, optional)
```

---

## 6.3 E-R Diagram

```
  ┌─────────────┐    creates (1:N)    ┌─────────────┐
  │    USER     │────────────────────▶│   SESSION   │
  │─────────────│                     │─────────────│
  │ id (PK)     │    joins (1:N)      │ id (PK)     │
  │ name        │────────────────────▶│ problem     │
  │ email       │                     │ difficulty  │
  │ password    │                     │ status      │
  │ role        │                     │ meetingCode │
  │ isActive    │                     │ sessionType │
  └─────────────┘                     │ startTime   │
         │                            └─────────────┘
         │ receives (1:N)                    │
         ▼                                   │ has (1:N)
  ┌─────────────────┐                        ▼
  │  NOTIFICATION   │              ┌─────────────────┐
  │─────────────────│              │    FEEDBACK      │
  │ id (PK)         │              │─────────────────│
  │ userId (FK)     │              │ id (PK)          │
  │ type            │              │ sessionId (FK)   │
  │ title           │              │ givenBy (FK) ────┼──▶ USER
  │ message         │              │ givenTo (FK) ────┼──▶ USER
  │ read            │              │ rating (1-5)     │
  │ actionUrl       │              │ review           │
  └─────────────────┘              └─────────────────┘
```

**Cardinality:**
- One USER can create many SESSIONS (1:N)
- One USER can join many SESSIONS as participant (1:N)
- One SESSION can have many FEEDBACKS (1:N)
- One USER can give many FEEDBACKS (1:N)
- One USER can receive many NOTIFICATIONS (1:N)

---

## 6.4 User Interface Design (System Layout)

### Application Routes

| Route | Component | Access |
|-------|-----------|--------|
| `/` | HomePage | Public |
| `/auth` | AuthPage | Public (redirects if logged in) |
| `/forgot-password` | ForgotPasswordPage | Public |
| `/reset-password/:token` | ResetPasswordPage | Public |
| `/dashboard` | DashboardPage | Authenticated |
| `/problems` | ProblemsPage | Authenticated |
| `/problem/:id` | ProblemPage | Authenticated |
| `/session/:id` | SessionPage | Authenticated |
| `/schedule` | SchedulePage | Authenticated |
| `/admin` | AdminDashboardPage | Admin only |
| `/admin/users` | AdminUsersPage | Admin only |
| `/admin/sessions` | AdminSessionsPage | Admin only |
| `/admin/analytics` | AdminAnalyticsPage | Admin only |

---

### Home Page Layout

```
╔══════════════════════════════════════════════════════════════╗
║  NAVBAR: [Talent IQ Logo]              [Login] [Sign Up]     ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  HERO SECTION                                                ║
║  ┌─────────────────────────┐  ┌──────────────────────────┐  ║
║  │  Master Coding          │  │   [Hero Screenshot/      │  ║
║  │  Interviews Together    │  │    Illustration]         │  ║
║  │                         │  │                          │  ║
║  │  [Get Started →]        │  │                          │  ║
║  │  [View Problems]        │  │                          │  ║
║  └─────────────────────────┘  └──────────────────────────┘  ║
║                                                              ║
║  FEATURES SECTION                                            ║
║  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  ║
║  │ 📹 HD Video  │  │ 💻 Code Edit │  │ ⚡ Code Execute  │  ║
║  │ Interviews   │  │ Real-time    │  │ JS/Python/Java   │  ║
║  └──────────────┘  └──────────────┘  └──────────────────┘  ║
║                                                              ║
╠══════════════════════════════════════════════════════════════╣
║  FOOTER: Links | © 2026 Talent IQ                           ║
╚══════════════════════════════════════════════════════════════╝
```

---

### Dashboard Page Layout

```
╔══════════════════════════════════════════════════════════════╗
║  NAVBAR: [Logo] [Problems] [Dashboard] [Schedule] [🔔] [👤] ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  WELCOME SECTION                                             ║
║  ┌──────────────────────────────────────────────────────┐   ║
║  │  Welcome back, Vasudev! 👋                           │   ║
║  │  [+ Create Session]  [Join Session]                  │   ║
║  └──────────────────────────────────────────────────────┘   ║
║                                                              ║
║  STATS CARDS                                                 ║
║  ┌──────────────┐  ┌──────────────┐                         ║
║  │ 🟢 Active    │  │ 🏆 Total     │                         ║
║  │ Sessions: 3  │  │ Sessions: 47 │                         ║
║  │ [Live badge] │  │              │                         ║
║  └──────────────┘  └──────────────┘                         ║
║                                                              ║
║  ACTIVE SESSIONS          RECENT SESSIONS                    ║
║  ┌──────────────────┐     ┌──────────────────────────────┐  ║
║  │ Session Card 1   │     │ Completed Session 1          │  ║
║  │ Problem: Two Sum │     │ Problem: Binary Search       │  ║
║  │ Host: John       │     │ Rating: ⭐⭐⭐⭐⭐           │  ║
║  │ [Join →]         │     │ Date: Mar 23, 2026           │  ║
║  └──────────────────┘     └──────────────────────────────┘  ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

### Session Page Layout (Desktop)

```
╔══════════════════════════════════════════════════════════════╗
║  NAVBAR: [Logo] [Problems] [Dashboard] [Schedule] [🔔] [👤] ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  ┌─────────────────────────┬────────────────────────────┐   ║
║  │  PROBLEM DESCRIPTION    │   VIDEO CALL PANEL         │   ║
║  │  ─────────────────────  │   ──────────────────────   │   ║
║  │  📝 Two Sum             │   ┌──────────┬──────────┐  │   ║
║  │  Difficulty: 🟡 Medium  │   │ Remote   │  Local   │  │   ║
║  │                         │   │ Video    │  Video   │  │   ║
║  │  Given an array nums,   │   │ (John)   │  (You)   │  │   ║
║  │  return indices of two  │   └──────────┴──────────┘  │   ║
║  │  numbers that add up    │   [🎤] [📹] [🖥️] [📞 End] │   ║
║  │  to target.             │                            │   ║
║  │                         │   ┌────────────────────┐   │   ║
║  │  Examples:              │   │  CHAT PANEL        │   │   ║
║  │  Input: [2,7,11,15]     │   │  John: Hello!      │   │   ║
║  │  Output: [0,1]          │   │  You: Hi there!    │   │   ║
║  │                         │   │  [Type message...] │   │   ║
║  │  Meeting Code:          │   └────────────────────┘   │   ║
║  │  [ABC-123-XYZ] [Copy]   │                            │   ║
║  ├─────────────────────────┤                            │   ║
║  │  CODE EDITOR            │                            │   ║
║  │  [JavaScript ▼] [🔒 E2E Encrypted]                  │   ║
║  │  ┌─────────────────────────────────────────────┐    │   ║
║  │  │  1  function twoSum(nums, target) {          │    │   ║
║  │  │  2    // your code here                      │    │   ║
║  │  │  3  }                                        │    │   ║
║  │  │  📍 John's cursor (line 2)                   │    │   ║
║  │  └─────────────────────────────────────────────┘    │   ║
║  ├─────────────────────────┤                            │   ║
║  │  OUTPUT PANEL           │                            │   ║
║  │  [▶ Run Code]           │                            │   ║
║  │  > [1, 0]               │                            │   ║
║  └─────────────────────────┴────────────────────────────┘   ║
╚══════════════════════════════════════════════════════════════╝
```

---

### Admin Dashboard Layout

```
╔══════════════════════════════════════════════════════════════╗
║  NAVBAR: [Logo] [Problems] [Dashboard] [Schedule] [Admin]   ║
╠══════════════════════════════════════════════════════════════╣
║                                                              ║
║  Admin Dashboard                                             ║
║  Manage users, sessions, and view analytics                  ║
║                                                              ║
║  STATS GRID (with count-up animation)                        ║
║  ┌──────────────┐ ┌──────────────┐ ┌──────────┐ ┌────────┐ ║
║  │ 👥 Total     │ │ 📹 Total     │ │ ✅ Done  │ │ 📈 New │ ║
║  │ Users        │ │ Sessions     │ │ Sessions │ │ /Week  │ ║
║  │    247       │ │    1,043     │ │    891   │ │    12  │ ║
║  │ 198 active   │ │ 3 active now │ │ All time │ │ 7 days │ ║
║  └──────────────┘ └──────────────┘ └──────────┘ └────────┘ ║
║                                                              ║
║  QUICK ACTIONS                                               ║
║  ┌──────────────────┐ ┌──────────────────┐ ┌─────────────┐ ║
║  │ 👥 User Mgmt     │ │ 📹 Session Mgmt  │ │ 📊 Analytics│ ║
║  │ View & manage    │ │ Monitor sessions │ │ View trends │ ║
║  └──────────────────┘ └──────────────────┘ └─────────────┘ ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

# 07. SYSTEM TESTING

## 7.1 Unit Testing

Unit testing verifies individual functions and modules in isolation. The project uses **Vitest** as the test runner with **fast-check** for property-based testing.

**Test Files:**

| Test File | Location | Tests | Framework |
|-----------|----------|-------|-----------|
| `authController.test.js` | `backend/src/controllers/` | 17 | Vitest |
| `authController.pbt.test.js` | `backend/src/controllers/` | 1 (100 runs) | Vitest + fast-check |
| `email.test.js` | `backend/src/lib/` | 15 | Vitest |
| **Total** | | **33** | |

**Run Tests:**
```bash
cd backend
npm test
```

---

### Unit Test Cases — Auth Controller

| Test ID | Function | Input | Expected Output | Result |
|---------|----------|-------|-----------------|--------|
| UT-01 | `signup` | Valid name, email, password | 201 + user + token | ✅ Pass |
| UT-02 | `signup` | Missing name | 400 "All fields required" | ✅ Pass |
| UT-03 | `signup` | Password < 6 chars | 400 "Password too short" | ✅ Pass |
| UT-04 | `signup` | Duplicate email | 400 "Email already exists" | ✅ Pass |
| UT-05 | `login` | Valid credentials | 200 + user + token | ✅ Pass |
| UT-06 | `login` | Wrong password | 400 "Invalid credentials" | ✅ Pass |
| UT-07 | `login` | Non-existent email | 400 "Invalid credentials" | ✅ Pass |
| UT-08 | `forgotPassword` | Valid email | 200 + token saved in DB | ✅ Pass |
| UT-09 | `forgotPassword` | Missing email | 400 "Email required" | ✅ Pass |
| UT-10 | `forgotPassword` | Non-existent email | 200 (security — no reveal) | ✅ Pass |
| UT-11 | `forgotPassword` | Valid email | Token stored as SHA-256 hash | ✅ Pass |
| UT-12 | `forgotPassword` | Valid email | Token expires in 1 hour | ✅ Pass |
| UT-13 | `resetPassword` | Valid token + new password | 200 "Password reset successful" | ✅ Pass |
| UT-14 | `resetPassword` | Expired token | 400 "Invalid or expired token" | ✅ Pass |
| UT-15 | `resetPassword` | Password < 6 chars | 400 "Password too short" | ✅ Pass |
| UT-16 | `getMe` | Valid JWT | 200 + user object | ✅ Pass |
| UT-17 | `logout` | Any request | 200 + cookie cleared | ✅ Pass |

---

### Unit Test Cases — Email Module

| Test ID | Function | Scenario | Expected | Result |
|---------|----------|----------|----------|--------|
| UT-18 | `sendEmail` | SMTP not configured | Returns `{skipped: true}` | ✅ Pass |
| UT-19 | `emailTemplates.passwordReset` | With userName | Subject contains "Reset" | ✅ Pass |
| UT-20 | `emailTemplates.passwordReset` | Without userName | Falls back to "Hi there!" | ✅ Pass |
| UT-21 | `emailTemplates.passwordReset` | Any input | HTML contains reset URL | ✅ Pass |
| UT-22 | `emailTemplates.meetingInvite` | Valid params | Subject contains host name | ✅ Pass |
| UT-23 | `emailTemplates.meetingInvite` | Valid params | HTML contains meeting code | ✅ Pass |
| UT-24 | `emailTemplates.meetingInvite` | Valid params | HTML contains join URL | ✅ Pass |
| UT-25 | `emailTemplates.meetingReminder` | Valid params | Subject contains "Reminder" | ✅ Pass |

---

### Property-Based Test (PBT)

Property-based testing uses **fast-check** to generate 100 random inputs and verify invariants.

| Test ID | Property | Invariant | Runs | Result |
|---------|----------|-----------|------|--------|
| PBT-01 | `forgotPassword` with any string email | Response is always 200 or 400, never 500 | 100 | ✅ Pass |

---

## 7.2 Integration Testing

Integration testing verifies that multiple components work together correctly.

| Test ID | Scenario | Components Tested | Steps | Result |
|---------|----------|-------------------|-------|--------|
| IT-01 | Full signup flow | Auth API + MongoDB | POST /auth/signup → verify user in DB → GET /auth/me | ✅ Pass |
| IT-02 | Full login flow | Auth API + JWT | POST /auth/login → verify token → use token in header | ✅ Pass |
| IT-03 | Session creation | Session API + MongoDB | POST /api/sessions → verify meetingCode generated | ✅ Pass |
| IT-04 | Join session | Session API + MongoDB | POST /api/sessions/:code/join → verify participant set | ✅ Pass |
| IT-05 | Socket room join | Socket.io + Server | Connect → emit join-room → verify existing-users event | ✅ Pass |
| IT-06 | ECDH key exchange | Web Crypto API + Socket | Exchange public keys → derive shared key → verify match | ✅ Pass |
| IT-07 | Code encryption | Web Crypto API | Encrypt code → transmit → decrypt → verify match | ✅ Pass |
| IT-08 | Feedback submission | Feedback API + MongoDB | POST /api/feedback → verify stored → GET feedback | ✅ Pass |
| IT-09 | Notification creation | Notification API + MongoDB | Create notification → GET /api/notifications → verify | ✅ Pass |
| IT-10 | Password reset flow | Auth API + Email + MongoDB | POST /forgot-password → verify token in DB → POST /reset-password | ✅ Pass |
| IT-11 | Admin ban user | Admin API + MongoDB | PATCH /api/admin/users/:id/ban → verify isActive=false | ✅ Pass |
| IT-12 | Code execution (JS) | Code Runner API | POST /api/code/run {js code} → verify output | ✅ Pass |
| IT-13 | Code execution (Python) | Code Runner API | POST /api/code/run {python code} → verify output | ✅ Pass |

---

## 7.3 System Testing

System testing verifies the complete end-to-end behavior of the application as a whole.

### Functional System Tests

| Test ID | Test Scenario | Steps | Expected | Result |
|---------|---------------|-------|----------|--------|
| ST-01 | User Registration | Open app → Sign Up → Fill form → Submit | Account created, redirected to dashboard | ✅ Pass |
| ST-02 | User Login | Open app → Sign In → Enter credentials | JWT stored, dashboard shown | ✅ Pass |
| ST-03 | Password Reset | Forgot Password → Enter email → Check email → Reset | Password updated, can login | ✅ Pass |
| ST-04 | Create Session | Dashboard → Create Session → Select problem | Session created with meeting code | ✅ Pass |
| ST-05 | Join Session | Enter meeting code → Join | Participant added to session | ✅ Pass |
| ST-06 | Video Call | Two users in session | Both see each other's video | ✅ Pass |
| ST-07 | Code Sync | User A types code | User B sees code in real-time | ✅ Pass |
| ST-08 | Code Encryption | Inspect network traffic | Only encrypted bytes visible | ✅ Pass |
| ST-09 | Remote Cursor | User A moves cursor | User B sees cursor position | ✅ Pass |
| ST-10 | Chat | Send message in session | Other user receives instantly | ✅ Pass |
| ST-11 | Run JS Code | Write JS → Click Run | Output shown in panel | ✅ Pass |
| ST-12 | Run Python Code | Write Python → Click Run | Output shown in panel | ✅ Pass |
| ST-13 | Run Java Code | Write Java → Click Run | Output shown in panel | ✅ Pass |
| ST-14 | Screen Share | Click screen share button | Remote user sees screen | ✅ Pass |
| ST-15 | End Session | Host clicks End Session | Status → completed | ✅ Pass |
| ST-16 | Feedback Modal | Session ends | Both users see feedback form | ✅ Pass |
| ST-17 | Submit Feedback | Rate + write review → Submit | Feedback saved in DB | ✅ Pass |
| ST-18 | Schedule Interview | Schedule page → Fill form | Session created, email sent | ✅ Pass |
| ST-19 | Notification Bell | Receive invite | Bell shows unread count | ✅ Pass |
| ST-20 | Admin Ban User | Admin → Users → Ban | User cannot login | ✅ Pass |
| ST-21 | Admin Analytics | Admin → Analytics | Charts and stats shown | ✅ Pass |
| ST-22 | Theme Toggle | Click theme button | All components update colors | ✅ Pass |
| ST-23 | Responsive Design | Open on mobile (375px) | Layout adapts correctly | ✅ Pass |
| ST-24 | Show Password | Click eye icon on login | Password text visible | ✅ Pass |
| ST-25 | Count-up Animation | Load dashboard/admin | Numbers animate from 0 | ✅ Pass |

### Performance Tests

| Test ID | Scenario | Metric | Result |
|---------|----------|--------|--------|
| PT-01 | Frontend build | Build time | < 30 seconds ✅ |
| PT-02 | Page load (cold) | First Contentful Paint | < 2 seconds ✅ |
| PT-03 | API response | GET /auth/me | < 200ms ✅ |
| PT-04 | Code execution (JS) | Simple algorithm | < 100ms ✅ |
| PT-05 | Socket latency | Code sync event | < 50ms (LAN) ✅ |

### Security Tests

| Test ID | Scenario | Expected | Result |
|---------|----------|----------|--------|
| SEC-01 | Access dashboard without login | Redirect to /auth | ✅ Pass |
| SEC-02 | Access admin page as regular user | Redirect to /dashboard | ✅ Pass |
| SEC-03 | Use expired JWT token | 401 Unauthorized | ✅ Pass |
| SEC-04 | Submit feedback twice for same session | 400 Duplicate error | ✅ Pass |
| SEC-05 | Inspect code-change socket event | Only encrypted bytes | ✅ Pass |
| SEC-06 | SQL/NoSQL injection in login | Sanitized, no breach | ✅ Pass |

---

# 08. LIMITATIONS

The following limitations exist in the current version (v1.0.0) of Talent IQ:

| # | Limitation | Impact | Workaround |
|---|------------|--------|------------|
| 1 | **P2P Only (2 users max)** | Cannot support group interviews with 3+ participants | Use separate sessions for panel interviews |
| 2 | **No TURN Server** | Users behind strict corporate firewalls or symmetric NAT may fail to connect via WebRTC | Use a network that allows WebRTC (most home/mobile networks work) |
| 3 | **Render Free Tier Spin-down** | Server sleeps after 15 min of inactivity; first request takes 30–60 seconds | UptimeRobot pings server every 5 min to keep it awake |
| 4 | **Recording Size Limit** | Recordings stored as base64 in MongoDB; MongoDB document limit imeout and 1MB output buffer limit mitigate this |
| 8 | **Email Domain Restriction** | Resend free tier requires verified domain to send to arbitrary emails | Gmail SMTP fallback configured; or verify domain on Resend |
| 9 | **No Offline Support** | Application requires active internet connection at all times | Not applicable for interview platform use case |
| 10 | **Single Language per Session** | Code editor supports one language at a time per session | Switch language using the dropdown in the editor |

---

# 09. FUTURE ENHANCEMENT

The following enhancements are planned for future versions of Talent IQ:

| # | Enhancement | Description | Priority | Version |
|---|-------------|-------------|----------|---------|
| 1 | **TURN Server Integration** | Add Metered.ca or Coturn TURN server for reliable NAT traversal in all network conditions | High | v1.1 |
| 2 | **Multi-user Sessions** | Support 3–5 participants using WebRTC SFU (Selective Forwarding Unit) architecture | High | v2.0 |
| 3 | **AI Code Review** | Integrate OpenAI GPT API to provide real-time hints, code review, and complexity analysis | Medium | v1.2 |
| 4 | **Session Replay** | Record and replay entire session including code changes, cursor movements, and chat | Medium | v1.2 |
| 5 | **Cloud Recording Storage** | Migrate recordings from MongoDB base64 to Cloudinary or AWS S3 for unlimited storage | Medium | v1.1 |
| 6 | **Mobile App** | Build React Native app for iOS and Android with full feature parity | Medium | v2.0 |
| 7 | **OAuth Login** | Add Google and GitHub OAuth for one-click registration and login | Low | v1.1 |
| 8 | **Whiteboard Tool** | Add a collaborative drawing/whiteboard panel alongside the code editor | Low | v1.3 |
| 9 | **Interview Templates** | Pre-built interview templates with curated problem sets by topic and difficulty | Low | v1.2 |
| 10 | **Analytics Export** | Allow admins to export analytics data as CSV/PDF reports | Low | v1.2 |
| 11 | **Rate Limiting** | Add express-rate-limit middleware to prevent brute force attacks on auth endpoints | High | v1.1 |
| 12 | **Security Headers** | Add Helmet.js middleware for CSP, X-Frame-Options, and other security headers | High | v1.1 |
| 13 | **More Languages** | Add support for C++, Go, Rust, and TypeScript in the code runner | Medium | v1.2 |
| 14 | **Interview Scoring** | Structured scoring rubric for interviewers (problem solving, code quality, communication) | Medium | v1.3 |

---

# 10. REFERENCES

## 10.1 Webliography

| # | Resource | URL | Accessed |
|---|----------|-----|---------|
| 1 | WebRTC Official Documentation | https://webrtc.org/getting-started/overview | 2025 |
| 2 | MDN WebRTC API Reference | https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API | 2025 |
| 3 | Socket.io Documentation v4 | https://socket.io/docs/v4 | 2025 |
| 4 | Web Crypto API (MDN) | https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API | 2025 |
| 5 | ECDH Key Agreement (MDN) | https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/deriveKey | 2025 |
| 6 | Monaco Editor Documentation | https://microsoft.github.io/monaco-editor | 2025 |
| 7 | React 19 Documentation | https://react.dev | 2025 |
| 8 | Vite Documentation | https://vitejs.dev/guide | 2025 |
| 9 | TailwindCSS Documentation | https://tailwindcss.com/docs | 2025 |
| 10 | DaisyUI Components | https://daisyui.com/components | 2025 |
| 11 | MongoDB Documentation | https://www.mongodb.com/docs | 2025 |
| 12 | Mongoose ODM Documentation | https://mongoosejs.com/docs | 2025 |
| 13 | Express.js Guide | https://expressjs.com/en/guide | 2025 |
| 14 | Socket.io + WebRTC Tutorial | https://socket.io/docs/v4/webrtc | 2025 |
| 15 | JWT Introduction | https://jwt.io/introduction | 2025 |
| 16 | Bcrypt Algorithm | https://auth0.com/blog/hashing-in-action-understanding-bcrypt | 2025 |
| 17 | Vitest Documentation | https://vitest.dev | 2025 |
| 18 | fast-check (PBT) | https://fast-check.io | 2025 |
| 19 | Render Deployment Docs | https://render.com/docs | 2025 |
| 20 | Vercel Deployment Docs | https://vercel.com/docs | 2025 |
| 21 | MongoDB Atlas Docs | https://www.mongodb.com/docs/atlas | 2025 |
| 22 | Resend Email API | https://resend.com/docs | 2025 |
| 23 | Eclipse Temurin JDK | https://adoptium.net | 2025 |
| 24 | Python Official Documentation | https://docs.python.org/3 | 2025 |
| 25 | Node.js vm Module | https://nodejs.org/api/vm.html | 2025 |
| 26 | Node.js child_process | https://nodejs.org/api/child_process.html | 2025 |
| 27 | React Query (TanStack) | https://tanstack.com/query/latest | 2025 |
| 28 | Lucide React Icons | https://lucide.dev | 2025 |

---

## 10.2 Bibliography

| # | Reference |
|---|-----------|
| 1 | Grigorik, I. (2013). *High Performance Browser Networking*. O'Reilly Media. |
| 2 | Flanagan, D. (2020). *JavaScript: The Definitive Guide* (7th ed.). O'Reilly Media. |
| 3 | Chodorow, K. (2013). *MongoDB: The Definitive Guide* (2nd ed.). O'Reilly Media. |
| 4 | Cantelon, M., Harter, M., Holowaychuk, T., & Rajlich, N. (2014). *Node.js in Action*. Manning Publications. |
| 5 | Banks, A., & Porcello, E. (2020). *Learning React* (2nd ed.). O'Reilly Media. |
| 6 | Rescorla, E. (2018). *The Transport Layer Security (TLS) Protocol Version 1.3*. RFC 8446. IETF. |
| 7 | Bergkvist, A., Burnett, D., Jennings, C., & Narayanan, A. (2021). *WebRTC 1.0: Real-Time Communication Between Browsers*. W3C Recommendation. |
| 8 | Jones, M., Bradley, J., & Sakimura, N. (2015). *JSON Web Token (JWT)*. RFC 7519. IETF. |
| 9 | Provos, N., & Mazières, D. (1999). *A Future-Adaptable Password Scheme*. USENIX Annual Technical Conference. |
| 10 | Fowler, M. (2002). *Patterns of Enterprise Application Architecture*. Addison-Wesley Professional. |

---

*End of Document*

---

**Document Details:**

| Field | Value |
|-------|-------|
| Document Title | Talent IQ — College Project Blackbook |
| Version | 1.0.0 |
| Prepared By | Vasudev Patil |
| Academic Year | 2025–2026 |
| Total Pages | ~50 pages |
| Last Updated | March 2026 |
