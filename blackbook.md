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
┌──────────────────────────────────────────────────────────────┐
│                        TALENT IQ                             │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  HD Video    │  │  Encrypted   │  │   Scheduling +   │  │
│  │  P2P Call    │  │  Code Editor │  │   Email Alerts   │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │  Multi-lang  │  │   Mutual     │  │  Admin Panel +   │  │
│  │  Code Runner │  │   Feedback   │  │   Analytics      │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└──────────────────────────────────────────────────────────────┘
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
