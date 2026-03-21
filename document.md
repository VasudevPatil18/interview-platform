# Talent IQ — Technical Project Documentation

---

## INDEX

| Sr. No. | Topic | Page |
|:-------:|-------|:----:|
| **01** | **Introduction** | — |
| | 1.1 College Profile | — |
| | 1.2 Project Profile | — |
| **02** | **Proposed System** | — |
| | 2.1 Scope & Objective | — |
| | 2.2 Advantages | — |
| | 2.3 Feasibility Study | — |
| | &nbsp;&nbsp;&nbsp;2.3.1 Technical Feasibility | — |
| | &nbsp;&nbsp;&nbsp;2.3.2 Economical Feasibility | — |
| | &nbsp;&nbsp;&nbsp;2.3.3 Operational Feasibility | — |
| **03** | **System Analysis** | — |
| | 3.1 Existing System | — |
| | 3.2 Need for New System | — |
| | 3.3 Detailed SRS (Software Requirement Specification) | — |
| **04** | **System Planning** | — |
| | 4.1 Requirement Analysis & Data Gathering | — |
| | 4.2 Time-line Chart | — |
| **05** | **Tools & Environment Used** | — |
| | 5.1 Hardware and Software Requirement | — |
| | &nbsp;&nbsp;&nbsp;5.1.1 Software Requirement | — |
| | &nbsp;&nbsp;&nbsp;5.1.2 Hardware Requirement | — |
| | &nbsp;&nbsp;&nbsp;5.1.3 Technology to be Used | — |
| | 5.2 Server-Side and Client-Side Tools | — |
| **06** | **System Design** | — |
| | 6.1 UML Diagrams (Activity, Usecase, Sequence) | — |
| | 6.2 Database Design | — |
| | &nbsp;&nbsp;&nbsp;6.2.1 Data Dictionary | — |
| | &nbsp;&nbsp;&nbsp;6.2.2 Database Relationship Diagram | — |
| | 6.3 E-R Diagram | — |
| | 6.4 User Interface Design (System Layout) | — |
| **07** | **System Testing** | — |
| | 7.1 Unit Testing | — |
| | 7.2 Integration Testing | — |
| | 7.3 System Testing | — |
| **08** | **Limitations** | — |
| **09** | **Future Enhancement** | — |
| **10** | **References** | — |
| | 10.1 Webliography | — |
| | 10.2 Bibliography | — |

---

## 01. Introduction

### 1.1 College Profile

> *(Fill in your institution name, address, and affiliation details here.)*

### 1.2 Project Profile

| Field | Details |
|-------|---------|
| **Project Name** | Talent IQ |
| **Project Type** | Web Application |
| **Domain** | Video Conferencing / Technical Interview Platform |
| **Version** | 1.0.0 |
| **Platform** | Browser-based (Cross-platform) |
| **Team Size** | *(fill in)* |
| **Duration** | *(fill in)* |

**Brief Description:**
Talent IQ is a full-stack real-time technical interview platform that enables interviewers and candidates to conduct live coding sessions with HD video calls, a collaborative code editor with end-to-end encryption, real-time chat, session recording, and mutual feedback.

---

## 02. Proposed System

### 2.1 Scope & Objective

**Scope:**
- Real-time peer-to-peer video and audio calls using WebRTC
- Collaborative code editor with live sync and E2E encryption
- Session scheduling, management, and recording
- Bidirectional post-session feedback (interviewer ↔ candidate)
- Admin dashboard for user and session management

**Objectives:**

| # | Objective |
|---|-----------|
| 1 | Provide a seamless real-time coding interview environment |
| 2 | Ensure privacy via end-to-end encrypted code transmission |
| 3 | Enable session scheduling with email notifications |
| 4 | Allow both parties to rate and review each other after sessions |
| 5 | Give admins full visibility and control over the platform |

### 2.2 Advantages

| Advantage | Description |
|-----------|-------------|
| 🔒 E2E Encrypted Code | Code is encrypted with AES-GCM 256-bit; server never sees plaintext |
| 📹 P2P Video | WebRTC DTLS-SRTP ensures encrypted media without a media server |
| 🌐 No Plugin Required | Runs entirely in the browser using Web APIs |
| 📅 Scheduling | Built-in interview scheduling with automated email reminders |
| ⭐ Mutual Feedback | Both interviewer and candidate can rate each other (1–5 stars + summary) |
| 🛡️ Admin Controls | Admins can manage users, sessions, and view analytics |
| 📱 Responsive | Works on desktop and mobile with adaptive layouts |

### 2.3 Feasibility Study

#### 2.3.1 Technical Feasibility

| Component | Technology | Feasibility |
|-----------|-----------|-------------|
| Frontend | React 19, Vite, TailwindCSS, DaisyUI | ✅ Proven stack |
| Backend | Node.js, Express 5, MongoDB | ✅ Industry standard |
| Real-time | Socket.io 4, WebRTC | ✅ Browser-native |
| Encryption | Web Crypto API (ECDH + AES-GCM) | ✅ Built into browsers |
| Code Editor | Monaco Editor (@monaco-editor/react) | ✅ VS Code engine |
| Email | Nodemailer | ✅ Widely used |

#### 2.3.2 Economical Feasibility

| Item | Cost |
|------|------|
| Hosting (Node.js + MongoDB Atlas free tier) | $0 / month |
| Domain | ~$10 / year |
| STUN Servers (Google public) | $0 |
| TURN Server (if needed for production) | ~$5–20 / month |
| **Total Estimated** | **< $30 / month** |

#### 2.3.3 Operational Feasibility

- Users only need a modern browser (Chrome, Firefox, Edge, Safari)
- No installation required
- Minimal learning curve — familiar interview-style UI
- Admin panel for non-technical management tasks

---

## 03. System Analysis

### 3.1 Existing System

| Platform | Limitations |
|----------|-------------|
| Google Meet / Zoom | No integrated code editor |
| HackerRank / CoderPad | No built-in video call |
| LeetCode | No real-time collaboration or video |
| Pramp | Limited scheduling, no E2E code encryption |

### 3.2 Need for New System

```
Existing tools force interviewers to use 2–3 separate apps simultaneously:
  ┌─────────────┐   ┌──────────────┐   ┌──────────────┐
  │  Video Call │ + │ Code Editor  │ + │  Scheduling  │
  │  (Zoom)     │   │ (CoderPad)   │   │  (Calendly)  │
  └─────────────┘   └──────────────┘   └──────────────┘
                          ↓
              Talent IQ unifies all three:
  ┌──────────────────────────────────────────────────┐
  │  Video Call + Code Editor + Scheduling + Feedback │
  └──────────────────────────────────────────────────┘
```

### 3.3 Detailed SRS (Software Requirement Specification)

#### Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-01 | User shall be able to register and log in with JWT authentication |
| FR-02 | Host shall be able to create an instant or scheduled session |
| FR-03 | Participant shall be able to join via meeting code or link |
| FR-04 | Both users shall have real-time video and audio via WebRTC |
| FR-05 | Code editor shall sync in real-time with E2E encryption |
| FR-06 | Remote cursor position shall be visible to the other user |
| FR-07 | Users shall be able to chat during the session |
| FR-08 | Host shall be able to end the session |
| FR-09 | Both users shall submit star rating + summary feedback after session |
| FR-10 | Admin shall manage users, sessions, and view analytics |
| FR-11 | System shall send email notifications for scheduled sessions |
| FR-12 | Users shall be able to reset password via email token |

#### Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | Code transmission must be end-to-end encrypted (AES-GCM 256) |
| NFR-02 | Video/audio must be encrypted via DTLS-SRTP (WebRTC default) |
| NFR-03 | Page load time < 3 seconds on standard broadband |
| NFR-04 | System must support at least 2 concurrent users per session |
| NFR-05 | UI must be responsive on screens ≥ 320px wide |
| NFR-06 | Password must be hashed with bcrypt (salt rounds = 10) |

---

## 04. System Planning

### 4.1 Requirement Analysis & Data Gathering

**Stakeholders:**

| Stakeholder | Role |
|-------------|------|
| Interviewer (Host) | Creates session, evaluates candidate, gives feedback |
| Candidate (Participant) | Joins session, writes code, gives feedback |
| Admin | Manages platform, views analytics |
| System | Handles signaling, encryption, notifications |

### 4.2 Time-line Chart (Gantt)

```
Phase                     Week:  1   2   3   4   5   6   7   8
─────────────────────────────────────────────────────────────────
Requirement Analysis             ███ ███
UI/UX Design                         ███ ███
Backend API Development                  ███ ███ ███
Frontend Development                         ███ ███ ███
WebRTC & Socket Integration                      ███ ███
E2E Encryption                                       ███
Testing & Bug Fixes                                  ███ ███
Deployment & Documentation                               ███ ███
```

---

## 05. Tools & Environment Used

### 5.1 Hardware and Software Requirement

#### 5.1.1 Software Requirement

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18+ | Backend runtime |
| MongoDB | 6+ | Database |
| npm | 9+ | Package manager |
| Git | 2+ | Version control |
| Modern Browser | Chrome 90+ / Firefox 88+ | Client runtime |

#### 5.1.2 Hardware Requirement

| Component | Minimum | Recommended |
|-----------|---------|-------------|
| CPU | Dual-core 2 GHz | Quad-core 3 GHz |
| RAM | 4 GB | 8 GB |
| Storage | 10 GB free | 20 GB SSD |
| Network | 2 Mbps | 10 Mbps |
| Camera | 720p | 1080p |
| Microphone | Any | Noise-cancelling |

#### 5.1.3 Technology to be Used

```
┌─────────────────────────────────────────────────────────────┐
│                        TALENT IQ STACK                       │
├──────────────────────┬──────────────────────────────────────┤
│     FRONTEND         │           BACKEND                    │
│                      │                                      │
│  React 19            │  Node.js + Express 5                 │
│  Vite 7              │  MongoDB + Mongoose 8                │
│  TailwindCSS 4       │  Socket.io 4                         │
│  DaisyUI 5           │  JWT Authentication                  │
│  Monaco Editor       │  Bcryptjs                            │
│  Socket.io-client    │  Nodemailer                          │
│  React Query 5       │  Inngest (background jobs)           │
│  Web Crypto API      │  Multer (file uploads)               │
│  WebRTC              │  Vitest (testing)                    │
└──────────────────────┴──────────────────────────────────────┘
```

### 5.2 Server-Side and Client-Side Tools

| Side | Tool | Role |
|------|------|------|
| Server | Express.js | REST API framework |
| Server | Socket.io | Real-time signaling & events |
| Server | Mongoose | MongoDB ODM |
| Server | JWT | Stateless authentication |
| Server | Nodemailer | Email delivery |
| Server | Inngest | Scheduled background functions |
| Client | React | UI component framework |
| Client | WebRTC | P2P video/audio |
| Client | Web Crypto API | ECDH key exchange + AES-GCM encryption |
| Client | Monaco Editor | VS Code-powered code editor |
| Client | Axios | HTTP client |
| Client | React Query | Server state management |

---

## 06. System Design

### 6.1 UML Diagrams

#### Use Case Diagram

```
                        ┌─────────────────────────────────────┐
                        │           TALENT IQ SYSTEM           │
                        │                                     │
  ┌──────────┐          │  ┌─────────────────────────────┐   │
  │          │──────────┼─▶│  Register / Login           │   │
  │          │          │  └─────────────────────────────┘   │
  │          │──────────┼─▶│  Create Session              │   │
  │          │          │  └─────────────────────────────┘   │
  │Interviewer│─────────┼─▶│  Schedule Interview          │   │
  │  (Host)  │          │  └─────────────────────────────┘   │
  │          │──────────┼─▶│  End Session                 │   │
  │          │          │  └─────────────────────────────┘   │
  │          │──────────┼─▶│  Give Feedback               │   │
  └──────────┘          │  └─────────────────────────────┘   │
                        │                                     │
  ┌──────────┐          │  ┌─────────────────────────────┐   │
  │          │──────────┼─▶│  Join Session (via code)    │   │
  │Candidate │          │  └─────────────────────────────┘   │
  │(Participant)────────┼─▶│  Write & Sync Code          │   │
  │          │          │  └─────────────────────────────┘   │
  │          │──────────┼─▶│  Video / Audio Call         │   │
  │          │          │  └─────────────────────────────┘   │
  │          │──────────┼─▶│  Chat                       │   │
  │          │          │  └─────────────────────────────┘   │
  └──────────┘          │                                     │
                        │  ┌─────────────────────────────┐   │
  ┌──────────┐          │  │  Manage Users               │   │
  │  Admin   │──────────┼─▶│  View Analytics             │   │
  └──────────┘          │  │  Force End Session          │   │
                        │  └─────────────────────────────┘   │
                        └─────────────────────────────────────┘
```

#### Activity Diagram — Session Flow

```
  [User Opens App]
        │
        ▼
  [Login / Register]
        │
        ▼
  [Dashboard]
        │
   ┌────┴────┐
   ▼         ▼
[Create   [Join via
Session]  Meeting Code]
   │         │
   └────┬────┘
        ▼
  [Session Page Loads]
        │
        ▼
  [WebRTC Handshake]──────────────────────┐
        │                                 │
        ▼                                 ▼
  [ECDH Key Exchange]            [Video/Audio Stream]
        │
        ▼
  [Shared AES-GCM Key Derived]
        │
        ▼
  [Code Editor Active]
  [Encrypted Sync ←→]
        │
        ▼
  [Host Ends Session]
        │
        ▼
  [Feedback Modal (Both Users)]
        │
        ▼
  [Dashboard]
```

#### Sequence Diagram — E2E Encrypted Code Sync

```
  User A (Host)          Socket Server          User B (Participant)
       │                      │                        │
       │──── join-room ───────▶│                        │
       │                      │──── existing-users ────▶│
       │                      │◀─── join-room ──────────│
       │                      │                        │
       │── e2e-public-key(A) ─▶│── e2e-public-key(A) ──▶│
       │                      │                        │ derive sharedKey
       │◀─ e2e-public-key(B) ──│◀─ e2e-public-key(B) ───│
       │ derive sharedKey      │                        │
       │                      │                        │
       │ [user types code]     │                        │
       │ encrypt(code, AES-GCM)│                        │
       │── code-change(enc) ──▶│── code-change(enc) ───▶│
       │                      │                  decrypt(enc)
       │                      │                  [editor updates]
       │                      │                        │
       │── code-cursor(ln,col)─▶│── code-cursor ────────▶│
       │                      │              [cursor shown in editor]
```

### 6.2 Database Design

#### 6.2.1 Data Dictionary

**Collection: `users`**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | ✅ | Auto-generated primary key |
| `name` | String | ✅ | Full name of the user |
| `email` | String | ✅ | Unique email address |
| `password` | String | ✅ | Bcrypt hashed password |
| `profileImage` | String | ❌ | URL to profile picture |
| `role` | String | ✅ | `"user"` or `"admin"` |
| `isActive` | Boolean | ✅ | Account active/banned status |
| `resetPasswordToken` | String | ❌ | SHA-256 hashed reset token |
| `resetPasswordExpires` | Date | ❌ | Token expiry timestamp |
| `createdAt` | Date | ✅ | Auto timestamp |
| `updatedAt` | Date | ✅ | Auto timestamp |

**Collection: `sessions`**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | ✅ | Auto-generated primary key |
| `problem` | String | ✅ | Problem title |
| `difficulty` | String | ✅ | `easy` / `medium` / `hard` |
| `host` | ObjectId → User | ✅ | Session creator |
| `participant` | ObjectId → User | ❌ | Joined participant |
| `status` | String | ✅ | `scheduled/active/completed/cancelled` |
| `meetingCode` | String | ✅ | Unique 9-char code (e.g. `ABC-123-XYZ`) |
| `sessionType` | String | ✅ | `instant` or `scheduled` |
| `scheduledStartTime` | Date | ❌ | Planned start time |
| `duration` | Number | ❌ | Duration in minutes |
| `callId` | String | ❌ | WebRTC call identifier |
| `recording` | Object | ❌ | `{ path, filename, size, duration }` |
| `createdAt` | Date | ✅ | Auto timestamp |

**Collection: `feedbacks`**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `_id` | ObjectId | ✅ | Auto-generated primary key |
| `session` | ObjectId → Session | ✅ | Related session |
| `givenBy` | ObjectId → User | ✅ | Feedback author |
| `givenTo` | ObjectId → User | ✅ | Feedback recipient |
| `rating` | Number | ✅ | 1–5 star rating |
| `review` | String | ❌ | Written summary (max 500 chars) |
| `createdAt` | Date | ✅ | Auto timestamp |

**Collection: `notifications`**

| Field | Type | Description |
|-------|------|-------------|
| `userId` | ObjectId → User | Notification recipient |
| `type` | String | `meeting_invite`, `reminder`, etc. |
| `title` | String | Notification heading |
| `message` | String | Notification body |
| `isRead` | Boolean | Read status |
| `actionUrl` | String | Deep link URL |

#### 6.2.2 Database Relationship Diagram

```
┌──────────────┐         ┌──────────────────┐         ┌──────────────┐
│    USERS     │         │     SESSIONS      │         │  FEEDBACKS   │
│──────────────│         │──────────────────│         │──────────────│
│ _id (PK)     │◀────────│ host (FK)        │         │ _id (PK)     │
│ name         │◀────────│ participant (FK) │◀────────│ session (FK) │
│ email        │         │ interviewer (FK) │         │ givenBy (FK) │──▶ USERS
│ password     │         │ candidate (FK)   │         │ givenTo (FK) │──▶ USERS
│ role         │         │ _id (PK)         │         │ rating       │
│ isActive     │         │ problem          │         │ review       │
└──────────────┘         │ difficulty       │         └──────────────┘
                         │ status           │
       ┌─────────────────│ meetingCode      │
       │                 │ recording        │
       ▼                 └──────────────────┘
┌──────────────┐
│NOTIFICATIONS │
│──────────────│
│ _id (PK)     │
│ userId (FK)  │──▶ USERS
│ type         │
│ title        │
│ message      │
│ isRead       │
└──────────────┘
```

### 6.3 E-R Diagram

```
  ┌──────────┐    creates    ┌──────────┐    receives   ┌──────────────┐
  │   USER   │──────────────▶│ SESSION  │◀──────────────│  FEEDBACK    │
  │          │               │          │               │              │
  │ id       │    joins      │ id       │  gives        │ id           │
  │ name     │──────────────▶│ problem  │◀──────────────│ rating       │
  │ email    │               │ difficulty│               │ review       │
  │ password │               │ status   │               │ givenBy ─────┼──▶ USER
  │ role     │               │ meetCode │               │ givenTo ─────┼──▶ USER
  └──────────┘               └──────────┘               └──────────────┘
       │                          │
       │ receives                 │ triggers
       ▼                          ▼
  ┌──────────────┐         ┌──────────────┐
  │ NOTIFICATION │         │  RECORDING   │
  │              │         │              │
  │ id           │         │ path         │
  │ type         │         │ filename     │
  │ message      │         │ size         │
  │ isRead       │         │ duration     │
  └──────────────┘         └──────────────┘
```

### 6.4 User Interface Design (System Layout)

```
┌─────────────────────────────────────────────────────────────┐
│  NAVBAR: [Logo] [Problems] [Dashboard] [Schedule] [Profile] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  SESSION PAGE LAYOUT (Desktop)                              │
│                                                             │
│  ┌──────────────────────┬──────────────────────────────┐   │
│  │  PROBLEM DESCRIPTION │   VIDEO CALL PANEL           │   │
│  │                      │                              │   │
│  │  Title               │  ┌──────────┬──────────┐    │   │
│  │  Difficulty Badge    │  │ Remote   │  Local   │    │   │
│  │  Description         │  │ Video    │  Video   │    │   │
│  │  Examples            │  └──────────┴──────────┘    │   │
│  │  Constraints         │  [🎤] [📹] [🖥️] [📞]        │   │
│  │  Meeting Code        │  ┌──────────────────────┐   │   │
│  ├──────────────────────┤  │  CHAT PANEL          │   │   │
│  │  CODE EDITOR         │  │  (collapsible)       │   │   │
│  │  [Lang ▼] [🔒 E2E]   │  └──────────────────────┘   │   │
│  │  [Monaco Editor]     │                              │   │
│  │  [Remote cursor 📍]  │                              │   │
│  ├──────────────────────┤                              │   │
│  │  OUTPUT PANEL        │                              │   │
│  │  [Run ▶]  stdout...  │                              │   │
│  └──────────────────────┴──────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## 07. System Testing

### 7.1 Unit Testing

| Test File | Tests | Status |
|-----------|-------|--------|
| `email.test.js` | 15 | ✅ Pass |
| `authController.test.js` | 17 | ✅ Pass |
| `authController.pbt.test.js` | 1 (100 runs) | ✅ Pass |
| **Total** | **33** | ✅ **All Pass** |

**Sample Unit Test Cases:**

| Test ID | Description | Expected | Result |
|---------|-------------|----------|--------|
| UT-01 | `forgotPassword` with valid email | Email sent, token saved | ✅ Pass |
| UT-02 | `forgotPassword` with missing email | 400 Bad Request | ✅ Pass |
| UT-03 | `forgotPassword` with non-existent email | Same 200 response (security) | ✅ Pass |
| UT-04 | Token stored as SHA-256 hash | DB token ≠ email token | ✅ Pass |
| UT-05 | Token expiry set to 1 hour | `expires > Date.now()` | ✅ Pass |
| UT-06 | Email template contains reset URL | URL matches pattern | ✅ Pass |
| UT-07 | Email template handles missing userName | Falls back to "Hi there!" | ✅ Pass |

### 7.2 Integration Testing

| Test ID | Scenario | Components Tested | Result |
|---------|----------|-------------------|--------|
| IT-01 | User registers → JWT issued → `/auth/me` returns user | Auth flow | ✅ |
| IT-02 | Host creates session → participant joins via code | Session + DB | ✅ |
| IT-03 | Socket join-room → existing-users emitted | Socket.io | ✅ |
| IT-04 | ECDH key exchange → shared key derived → code encrypted | E2E crypto | ✅ |
| IT-05 | Session ends → feedback modal shown to both users | Session + Feedback | ✅ |
| IT-06 | Feedback submitted → stored in DB → visible to recipient | Feedback API | ✅ |

### 7.3 System Testing

| Test ID | Scenario | Result |
|---------|----------|--------|
| ST-01 | Two users join session, video call establishes | ✅ |
| ST-02 | User A types code → User B sees it in real-time (encrypted) | ✅ |
| ST-03 | Remote cursor visible in User B's editor | ✅ |
| ST-04 | Chat messages delivered in real-time | ✅ |
| ST-05 | Screen sharing replaces video track | ✅ |
| ST-06 | Session ends → both users see feedback modal | ✅ |
| ST-07 | Admin bans user → user cannot log in | ✅ |
| ST-08 | Theme toggle → footer and all components update colors | ✅ |
| ST-09 | Frontend build completes with 0 errors, 0 lint warnings | ✅ |
| ST-10 | Password reset email contains valid hashed token | ✅ |

---

## 08. Limitations

| # | Limitation |
|---|------------|
| 1 | WebRTC requires TURN server for users behind strict NAT/firewalls (not included) |
| 2 | Maximum 2 users per session (P2P architecture) |
| 3 | Code execution uses external Piston API — requires internet access |
| 4 | No persistent code history between sessions |
| 5 | Recording is client-side only; large files may impact browser performance |
| 6 | No mobile app — browser only |

---

## 09. Future Enhancement

| # | Enhancement | Priority |
|---|-------------|----------|
| 1 | TURN server integration for reliable NAT traversal | High |
| 2 | Multi-user sessions (group interviews, 3+ participants) | High |
| 3 | AI-powered code review and hints during session | Medium |
| 4 | Persistent code history and session replay | Medium |
| 5 | Mobile app (React Native) | Medium |
| 6 | OAuth login (Google, GitHub) | Low |
| 7 | Custom problem creation by interviewers | Low |
| 8 | Whiteboard / drawing tool alongside code editor | Low |

---

## 10. References

### 10.1 Webliography

| # | Resource | URL |
|---|----------|-----|
| 1 | WebRTC Official Docs | https://webrtc.org/getting-started/overview |
| 2 | Socket.io Documentation | https://socket.io/docs/v4 |
| 3 | Web Crypto API (MDN) | https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API |
| 4 | Monaco Editor | https://microsoft.github.io/monaco-editor |
| 5 | React Documentation | https://react.dev |
| 6 | MongoDB Documentation | https://www.mongodb.com/docs |
| 7 | Express.js Guide | https://expressjs.com/en/guide |
| 8 | DaisyUI Components | https://daisyui.com/components |
| 9 | Vitest Testing | https://vitest.dev |
| 10 | Piston Code Execution API | https://github.com/engineer-man/piston |

### 10.2 Bibliography

| # | Reference |
|---|-----------|
| 1 | Grigorik, I. (2013). *High Performance Browser Networking*. O'Reilly Media. |
| 2 | Flanagan, D. (2020). *JavaScript: The Definitive Guide* (7th ed.). O'Reilly Media. |
| 3 | Banks, A., & Porcello, E. (2020). *Learning React* (2nd ed.). O'Reilly Media. |
| 4 | Chodorow, K. (2013). *MongoDB: The Definitive Guide*. O'Reilly Media. |
| 5 | RFC 8827 — WebRTC Security Architecture. IETF. |
| 6 | NIST SP 800-38D — AES-GCM Recommendation. NIST. |

---

*Document generated for Talent IQ — Technical Interview Platform*
*Version 1.0.0 | © 2025 Talent IQ*
