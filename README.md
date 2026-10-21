# Project Review Portal - Frontend Web Client

A web client for an academic and technical project submission and review platform, built with Next.js 16 (App Router), React 19, ShadCN UI, Recharts, and TailwindCSS v4. The application delivers role-adaptive interfaces for Students, Mentors, and Administrators, featuring server-driven data tables, instant evaluation demo logins, strict multi-field duplicate detection handling, one-time review grading, and an executive analytics console.

---

## Live Deployments

- **Production Web Client**: https://project-review-portal-frontend.vercel.app
- **Production API URL**: https://project-review-portal-backend.vercel.app/api/v1
- **API Health Check**: https://project-review-portal-backend.vercel.app/

---

## Overview

The Project Review Portal frontend coordinates user workflows across three distinct roles:

- **Students** submit project repositories and live deployments, track submission statuses in real time (`PENDING`, `APPROVED`, `REJECTED`), and review mentor feedback notes.
- **Mentors** navigate a server-paginated evaluation queue, inspect project details with full metadata, and submit one-time final approval or rejection decisions with feedback notes.
- **Administrators** monitor platform health through high-density visual analytics (KPI cards and Recharts charts), oversee the review queue, manage user account states (`ACTIVE`, `SUSPENDED`, `BANNED`), and provision mentor accounts.

The client is designed with an obsidian and deep charcoal aesthetic, clean typography (Montserrat, Plus Jakarta Sans, JetBrains Mono), zero emojis, and native React 19 Server Actions.

---

## Strict Validation and Error Handling Architecture

The frontend implements client-side and server-side safeguards matching the backend's strict domain policies:

### 1. Strict Form Validation (Zod Schema)

Located in `src/zod/project.validation.ts`, the `createProjectSchema` validates input before submission:

- **Project Title (`title`)**: Trimmed string, min 3 characters, max 100 characters.
- **GitHub Repository URL (`repoUrl`)**: Trimmed string, valid URL format strictly matching `/^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+/`.
- **Live Demo URL (`liveUrl`)**: **Mandatory**, trimmed string, valid URL strictly matching `/^https:\/\/.+/` (must use secure `https://` protocol).
- **Technical Description (`description`)**: Trimmed string, min 20 characters, max 3000 characters.

Inline error messages are extracted via `zodValidator` and rendered directly beneath individual fields using the reusable `<InputFieldError />` component.

### 2. Strict Multi-Field Duplicate Conflict Handling (HTTP 409)

- When a student attempts to submit a project with a `title`, `repoUrl`, or `liveUrl` that is already registered under an active (`PENDING` or `APPROVED`) submission, the backend responds with `HTTP 409 Conflict`.
- `submitProject.ts` catches the 409 response and sets `isDuplicate: true` in the action state.
- `SubmissionFormDialog.tsx` displays a dedicated non-destructive conflict banner detailing the exact conflicting attributes (e.g. `"You already have an active or approved submission with this project title and repository URL. Duplicate submissions are not allowed."`).
- The modal remains open, preserving the student's entered text so they can modify the conflicting fields without retyping.

### 3. Anti-Spam Rate Limiting with Real-Time Countdown (HTTP 429)

- If a student exceeds the submission limit (maximum 3 submissions per 2 minutes), the backend returns `HTTP 429 Too Many Requests` containing `retryAfterSeconds`.
- `submitProject.ts` flags `isRateLimited: true` and forwards the cooldown duration.
- `SubmissionFormDialog.tsx` activates an animated interval that counts down second-by-second in real time:
  ```
  Submission limit reached (maximum 3 projects per 2 minutes).
  Cooldown resets in: 48s
  ```
- Submissions are safely blocked until the cooldown expires.

### 4. One-Time Review Immutability in the UI

- In the Mentor and Admin review views (`/dashboard` and `/dashboard/reviews`), the "Review" action button is only rendered for submissions in `PENDING` status.
- Once evaluated as `APPROVED` or `REJECTED`, the review dialog is locked and the item transitions to a read-only "View" action button opening `ProjectDetailsDialog`.
- If an unauthorized re-review request is sent, the backend returns `HTTP 400 Bad Request`, which displays an immutable decision alert.

### 5. Account Suspension and Banning UX Enforcement

- **Suspended Accounts**: Users log in normally but see a persistent, non-dismissible `AccountRestrictionBanner` at the top of the screen. In the Student view, the "Submit Project" button is replaced with a disabled `Submissions Restricted` state. In the Mentor view, review triggers are disabled.
- **Banned Accounts**: The Next.js edge proxy (`src/proxy.ts`) intercepts any request from a banned session and redirects immediately to `/banned`, preventing any dashboard data from rendering.

---

## Role-Adaptive Interface Architecture

The frontend automatically detects the authenticated user's role and renders a tailored interface:

### 1. Student Submission Portal
- **Dashboard Overview**: Displays personal submission metrics (Total Submissions, Pending Queue, Approved, Rejected).
- **Project Submission Dialog**: Accessible modal with strict GitHub URL validation, mandatory secure live demo URL, duplicate conflict banners, and cooldown timers.
- **Submissions List**: Interactive history showing submission dates, reference IDs, external links to repository and live deployment, current status badges, and mentor review notes.

### 2. Mentor Review Dashboard
- **Review Queue Table**: Server-rendered data table listing all student submissions across the institution.
- **Server-Driven Controls**: URL-backed status filtering (`All`, `PENDING`, `APPROVED`, `REJECTED`), debounced multi-field search (matching project title, student name, or email), and customizable page limits (5, 10, 20, 50).
- **Submission Details Modal**: Deep inspection dialog showing candidate name, email, submission timestamps, repository URL, live application URL, and complete description without layout clipping.
- **One-Time Review Action**: Evaluation modal allowing mentors to record an `APPROVED` or `REJECTED` decision with feedback notes. Once reviewed, the decision is permanently locked.
- **Review Statistics**: Header metric cards summarizing submission volume, pending review workload, and pass rates.

### 3. Administrator Console
- **Executive Visual Analytics (`/dashboard/analytics`)**:
  - High-density KPI cards tracking total submissions, pending backlog, approved projects, rejected projects, platform pass rate, and registered accounts.
  - Recharts Donut chart displaying the distribution of submission statuses.
  - Recharts Bar chart tracking review queue velocity and throughput.
  - Horizontal Bar chart visualizing user account composition (Students, Mentors, Admins) and account health status.
- **Centralized Review Queue (`/dashboard/reviews`)**: Full supervisory access to the submission queue with review capabilities.
- **User Directory (`/dashboard/users`)**: Directory of all registered users with role badges and account statuses.
- **User Governance**: Modal controls to toggle account status between `ACTIVE`, `SUSPENDED`, and `BANNED`. Role mutation on existing accounts is disabled.
- **Mentor Provisioning**: "Add Mentor" dialog enabling administrators to directly register new mentors with credentials.

### 4. Common Account and Settings Features
- **Profile Identity Card**: View display name, verified email (with one-click copy), assigned role, account status, and registration date.
- **Self-Service Password Updates**: Secure change password form with visibility toggles and matching verification.

---

## Evaluation Usability Features

To facilitate rapid grading and testing:

1. **Quick One-Click Demo Credentials**:
   - The login screen at `/` features three preset buttons that automatically populate credentials for each role:
     - **Admin**: `admin@reviewportal.com` / `Admin123`
     - **Mentor**: `mentor@reviewportal.com` / `Mentor123`
     - **Student**: `student@reviewportal.com` / `Student123`
2. **Instant Student Signup**:
   - Evaluators can test creating fresh student accounts via `/signup`.
   - Registration requires no email or OTP verification blockers; submitting the form immediately logs the user in and redirects to the dashboard.

---

## Technology Stack

- **Framework**: Next.js 16.2 (App Router with Turbopack)
- **UI Library**: React 19.2
- **Language**: TypeScript 5
- **Styling**: TailwindCSS v4 with CSS design tokens
- **Component Primitives**: Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-label`, `@radix-ui/react-slot`)
- **Visual Analytics**: Recharts 3.10
- **Notifications**: Sonner 2.0
- **Iconography**: Hugeicons React (`hugeicons-react`, `@hugeicons/core-free-icons`) and Lucide React
- **Validation**: Zod 4.6
- **CSS Utilities**: `class-variance-authority`, `clsx`, `tailwind-merge`

---

## Architecture and Directory Structure

The project follows the standard Next.js App Router structure with modular separation of concerns:

```
project-review-portal-frontend/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── page.tsx               # Login page with demo autofill buttons
│   │   │   └── signup/
│   │   │       └── page.tsx           # Public student registration (no OTP)
│   │   ├── banned/
│   │   │   └── page.tsx               # Access revoked termination view
│   │   ├── dashboard/
│   │   │   ├── analytics/
│   │   │   │   └── page.tsx           # Admin executive analytics charts
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx           # Mentor & Admin review queue
│   │   │   ├── settings/
│   │   │   │   └── page.tsx           # Profile identity and password settings
│   │   │   ├── users/
│   │   │   │   └── page.tsx           # Admin user directory and mentor creation
│   │   │   ├── layout.tsx             # Authenticated shell (Sidebar + Topbar)
│   │   │   ├── loading.tsx            # Streaming loading skeletons
│   │   │   └── page.tsx               # Role-adaptive default dashboard landing
│   │   ├── globals.css                # Tailwind imports and design system tokens
│   │   └── layout.tsx                 # Root layout with fonts and toast provider
│   ├── components/
│   │   ├── modules/
│   │   │   ├── admin/                 # KPI cards, Recharts charts, and admin containers
│   │   │   ├── auth/                  # LoginForm and SignupForm components
│   │   │   ├── projects/              # Submission dialog, review dialog, details dialog
│   │   │   ├── settings/              # ProfileIdentityCard and ChangePasswordCard
│   │   │   └── users/                 # User directory table, AddMentorDialog, status modal
│   │   ├── shared/
│   │   │   ├── AccountRestrictionBanner.tsx # Alert for suspended accounts
│   │   │   ├── InputFieldError.tsx    # Accessible inline validation error renderer
│   │   │   ├── SearchFilter.tsx       # Debounced URL search parameter input
│   │   │   ├── SelectFilter.tsx       # URL-backed status filter dropdown
│   │   │   ├── Sidebar.tsx            # Dynamic navigation sidebar based on user role
│   │   │   ├── StatsSkeleton.tsx      # Pulse skeleton loader for KPI metric cards
│   │   │   ├── TablePagination.tsx    # URL-driven page navigation and limit selector
│   │   │   ├── TableSkeleton.tsx      # Pulse skeleton loader for data tables
│   │   │   └── Topbar.tsx             # User profile indicator and sign-out action
│   │   └── ui/                        # Reusable Radix UI & ShadCN primitives (button, dialog, input, etc.)
│   ├── lib/
│   │   ├── getInputFieldError.ts      # Field-level error extraction helper
│   │   ├── serverFetch.ts             # Server-side HTTP client with cookie management
│   │   ├── utils.ts                   # Class merging utility (clsx + tailwind-merge)
│   │   └── zodValidator.ts            # Safe schema parsing utility for Server Actions
│   ├── proxy.ts                       # Route protection proxy intercepting unauthenticated sessions
│   ├── services/
│   │   ├── auth/                      # Server Actions: login, signup, logout, changePassword
│   │   ├── project/                   # Server Actions & fetchers: submit, get, review
│   │   └── user/                      # Server Actions & fetchers: users, mentors, status
│   └── zod/                           # Zod schemas for auth, projects, and users
├── .env.example                       # Environment configuration template
├── package.json                       # Dependencies and run scripts
├── tsconfig.json                      # TypeScript configuration
└── next.config.ts                     # Next.js build configuration
```

---

## Prerequisites

Before running the web client, ensure you have:

1. **Node.js**: v18.18.0 or higher (v20+ recommended)
2. **npm**: v9.0.0 or higher
3. **Backend API**: The `project-review-portal-backend` service running (locally on `http://localhost:5000` or via production deployment)

---

## Environment Configuration

Create a `.env.local` or `.env` file in the root directory:

```bash
cp .env.example .env.local
```

Configure the backend API URL:

| Variable | Required | Default Value | Description |
|---|:---:|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | `http://localhost:5000/api/v1` | Base URL pointing to the backend REST API (use production URL for hosted environments) |

---

## Installation and Local Setup

Follow these steps to run the frontend client locally:

```bash
# 1. Clone the repository and enter the directory
cd project-review-portal-frontend

# 2. Install dependencies
npm install

# 3. Create the environment configuration
cp .env.example .env.local

# 4. Verify the backend API is running on http://localhost:5000

# 5. Start the development server with Turbopack
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:3000
```

---

## Pre-Configured Test Accounts

The backend automatically seeds three accounts on initial startup. You can authenticate using the **One-Click Demo buttons** on the login page or enter them manually:

| Role | Email | Password | Primary Accessible Sections |
|---|---|---|---|
| **Administrator** | `admin@reviewportal.com` | `Admin123` | Analytics (`/dashboard/analytics`), Reviews (`/dashboard/reviews`), User Directory (`/dashboard/users`), Settings (`/dashboard/settings`) |
| **Mentor** | `mentor@reviewportal.com` | `Mentor123` | Review Queue (`/dashboard`), Project Evaluation Dialog, Settings (`/dashboard/settings`) |
| **Student** | `student@reviewportal.com` | `Student123` | My Submissions (`/dashboard`), Submission Form Modal, Settings (`/dashboard/settings`) |

---

## Core Architectural Patterns

### 1. Server Actions with React 19 `useActionState`
Mutations (authentication, project creation, reviews, account status updates, password changes) execute via native Next.js Server Actions. Form components utilize `useActionState`:

```tsx
const [state, formAction, isPending] = useActionState(serverActionHandler, null);
```

Server Actions parse incoming FormData using Zod validation schemas. Any validation issues return field-specific error messages that are rendered directly beneath corresponding form inputs without full page refreshes.

### 2. Server-Side Data Tables and URL Search Parameters
Data tables avoid client-side `useEffect` data fetching. Instead, Server Components read URL search parameters:
- `page`: Active page index (default: 1)
- `limit`: Number of items per page (default: 10)
- `status`: Submission status filter (`All`, `PENDING`, `APPROVED`, `REJECTED`)
- `searchTerm`: Query string searching project titles, student names, and emails

Components like `TablePagination`, `SelectFilter`, and `SearchFilter` update parameters using `useTransition()` and `router.push()`, allowing Next.js to stream freshly filtered data from the server.

---

## Page and Route Overview

| Route | Role Access | Purpose |
|---|---|---|
| `/` | Public | Login screen with one-click demo credentials and student registration link |
| `/signup` | Public | Frictionless student registration (instantly active, no OTP) |
| `/dashboard` | Authenticated | Role-adaptive home view (Student submissions or Mentor review queue) |
| `/dashboard/analytics` | ADMIN | High-density KPI cards and Recharts visual analytics |
| `/dashboard/reviews` | MENTOR, ADMIN | Filterable, server-paginated submission evaluation table |
| `/dashboard/users` | ADMIN | User account governance directory with "Add Mentor" dialog |
| `/dashboard/settings` | All Roles | Profile identity inspection and self-service password update |
| `/banned` | Intercepted | Account termination notification page |

---

## Available Scripts

In the project root directory, the following npm scripts are available:

- `npm run dev`: Starts the Next.js development server with Turbopack on port 3000.
- `npm run build`: Compiles and optimizes the Next.js production bundle.
- `npm run start`: Runs the compiled production server on port 3000.
- `npm run lint`: Executes ESLint checks across the codebase.

---

## Design System and Theming

The application utilizes a dark charcoal and slate palette:

- **Surface Architecture**:
  - Background: Clean light slate (`bg-slate-100/70`) for auth, obsidian/charcoal dark theme for dashboard cards and sidebars.
  - Borders: Structured slate borders (`border-slate-200/90`, `border-slate-800`).
- **Accent Palette**: Deep Teal (`#0f766e` / `#0d9488`) used for primary actions, active navigation states, and brand highlights.
- **Typography Hierarchy**:
  - **Headings & Brand**: Montserrat (`font-heading`)
  - **Body UI**: Plus Jakarta Sans (`font-body`)
  - **Identifiers & Code**: JetBrains Mono (`font-mono`)
- **Tone**: Professional, technical, and free of decorative emojis.
