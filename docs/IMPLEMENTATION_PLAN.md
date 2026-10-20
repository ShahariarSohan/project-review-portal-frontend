# Project Review Portal - Frontend Implementation Plan

## 1. System Overview & Tech Stack
- **Framework**: Next.js 16 (App Router with Turbopack, React 19)
- **Styling**: TailwindCSS v4 with Vanilla CSS design tokens
- **Component Primitives**: ShadCN UI + Radix UI Primitives (`@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-slot`, `class-variance-authority`)
- **Iconography**: Hugeicons (`hugeicons-react`, `@hugeicons/core-free-icons`)
- **Typography**:
  - Headings & Brand: Montserrat (`font-heading`)
  - Body & UI: Plus Jakarta Sans (`font-body`)
  - Reference IDs & Code: JetBrains Mono (`font-mono`)
- **Color Architecture**: Architectural Obsidian (`#0d121c`), Deep Charcoal (`#151d2a`), Slate Border (`#243247`), Deep Teal Slate Primary (`#0f766e` / `#0d9488`).
- **Standard**: Zero emojis, clean ASCII text, zero redundant `useEffect` hooks, lean server actions with `useActionState`.

---

## 2. Role Model & Navigation Architecture

The platform provides role-adaptive layouts and interfaces for 3 distinct roles:

### Role Breakdown
1. **STUDENT**:
   - Access to Student Submission Portal.
   - Project submission dialog with GitHub URL validation and duplicate prevention.
   - Personal submissions list with real-time status badges (`PENDING`, `APPROVED`, `REJECTED`) and mentor review feedback notes.
   - Personal submission metrics.
   - Profile overview in Settings (email visible, password change disabled).
2. **MENTOR**:
   - Access to Mentor Review Dashboard.
   - Server-side paginated data table showing all student submissions.
   - Server-side status filters (`PENDING`, `APPROVED`, `REJECTED`) and search filters (by title, student name, email).
   - Dedicated **"View Details" Modal**: Inspect complete submission information, full description, repo/demo links, and review records.
   - **One-Time Review Action Modal**: Approve or reject `PENDING` projects with feedback notes (review decisions are final and cannot be modified once set).
   - Aggregated platform review statistics.
   - Profile overview in Settings (email visible, password change disabled).
3. **ADMIN**:
   - Complete supervisor access to all platform capabilities.
   - **Admin Analytics Dashboard**: High-density executive console with metric cards and production-grade ShadCN/Recharts visual charts (Submission volume, review outcomes distribution, pass rate trends).
   - Complete access to Mentor review capabilities and review queue.
   - Exclusive access to `/dashboard/users` (User Directory).
   - **"Add Mentor"** dialog to directly register new Mentors (Name, Email, Password).
   - User account status management (`ACTIVE`, `SUSPENDED`, `BANNED`). Role modification on existing accounts is disabled.
   - Profile overview in Settings (email visible, password change disabled).

---

## 3. Evaluation Usability: One-Click Demo Logins & Instant Signup

To ensure evaluators can grade the project in seconds without manual friction:

1. **3 Quick Demo Login Buttons on `/` (Login Page)**:
   - `[Admin (Full Access)]` -> Autofills `admin@reviewportal.com` / `Admin123`.
   - `[Mentor (Reviews)]` -> Autofills `mentor@reviewportal.com` / `Mentor123`.
   - `[Student (Submissions)]` -> Autofills `student@reviewportal.com` / `Student123`.
2. **Instant Student Signup (No OTP)**:
   - Evaluators can also test new account registration at `/signup` with any arbitrary email without receiving or entering OTP codes.
   - The backend immediately creates verified active student accounts and issues JWT tokens, automatically redirecting to `/dashboard`.

---

## 4. Architectural Patterns (Matching Reference Project)

1. **Server Actions with React 19 `useActionState`**:
   - Every mutation runs via native Next.js Server Actions.
   - Form components use `const [state, formAction, isPending] = useActionState(serverAction, null)`.
   - Errors are parsed via `zodValidator(payload, schema)` and rendered beneath fields with `<InputFieldError field="fieldName" state={state} />`.

2. **Server-Side Data Tables & Filters (Zero Unnecessary `useEffect`)**:
   - Server Components read URL `searchParams` (`?page=1&limit=10&status=PENDING&searchTerm=...`).
   - Server-side data fetching happens before HTML streams to the browser.
   - `TablePagination.tsx`, `SelectFilter.tsx`, and `SearchFilter.tsx` update URL search parameters via `useTransition()` and `router.push()`, triggering native Server Component re-renders with automatic cache revalidation.

---

## 5. Feature-by-Feature Implementation Sequence

### Feature 1: ShadCN UI Primitives & Validation Utilities
**Goal**: Install necessary Radix primitives and build reusable form, dialog, and feedback components.

- **Dependencies**: Install `@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-label`, `sonner`.
- **Reusable ShadCN Primitives** in src/components/ui/:
  - skeleton.tsx: Pulse skeleton primitive for instant loading states.
  - utton.tsx: ShadCN button with CVA variants.
  - `input.tsx`: Accessible input field with focus ring.
  - `textarea.tsx`: Multiline textarea for descriptions and review notes.
  - `dialog.tsx`: Accessible modal dialog for submissions, review decisions, and mentor creation.
  - `select.tsx`: Dropdown select component for status and pagination limits.
  - `badge.tsx`: Semantic status badges (`PENDING`, `APPROVED`, `REJECTED`).
  - `sonner.tsx`: Sonner toast provider for notifications.
- **Validation Helpers** in `src/lib/`:
  - `src/lib/zodValidator.ts`: Safe parser returning `{ success, data, errors: [{ field, message }] }`.
  - `src/lib/getInputFieldError.ts`: Helper returning message for a specific field from action state.
  - `src/components/shared/InputFieldError.tsx`: Reusable error display component rendering error text.
  - `src/components/shared/TableSkeleton.tsx`: Smooth animated pulse skeleton matching data table layout.
  - `src/components/shared/StatsSkeleton.tsx`: Animated card skeleton for metric cards.
  - `src/app/dashboard/loading.tsx`: Next.js streaming fallback rendering skeleton loaders on initial load.

---

### Feature 2: Authentication & Student Signup (No OTP)
**Goal**: Deliver a streamlined authentication experience with 3 One-Click Demo Login options and instant student signup.

- **Validation Schemas** in `src/zod/auth.validation.ts`:
  - `loginValidationSchema`: email, password.
  - `signupValidationSchema`: name, email, password (min 6), confirmPassword with `refine` equality check.
- **Server Actions** in `src/services/auth/`:
  - `loginUser.ts`: Validates credentials, posts to backend `/auth/login`, saves cookies, redirects to `/dashboard`.
  - `signupStudent.ts`: Validates form data, posts to backend `/auth/signup` (instantly verified, no OTP), sets auth cookies, redirects to `/dashboard`.
- **Page Implementations**:
  - `src/app/page.tsx` (Login):
    - Montserrat header and Hugeicons.
    - Integrated with `useActionState(loginUser, null)`.
    - Eye toggle for password visibility.
    - **3 Quick Demo Login buttons**:
      - `[Admin (Full Access)]`: pre-fills `admin@reviewportal.com` / `Admin123`.
      - `[Mentor (Reviews)]`: pre-fills `mentor@reviewportal.com` / `Mentor123`.
      - `[Student (Submissions)]`: pre-fills `student@reviewportal.com` / `Student123`.
    - Navigation link to `/signup`.
  - `src/app/signup/page.tsx` (Student Signup):
    - Full Name, Student Email, Password, and Confirm Password fields.
    - Integrated with `useActionState(signupStudent, null)`.
    - Direct error rendering with `<InputFieldError />`.
    - Eye toggle for password visibility.
    - On success, redirects directly to `/dashboard`.

---

### Feature 3: Student Project Submission Portal
**Goal**: Allow students to submit project details, prevent duplicates, handle rate limits, and view submission statuses with mentor feedback.

- **Validation Schema** in `src/zod/project.validation.ts`:
  - `projectSubmissionSchema`:
    - `title`: string (min 3, max 100)
    - `repoUrl`: valid URL matching git/github pattern
    - `liveUrl`: optional valid URL
    - `description`: string (min 20, max 3000)
- **Server Actions** in `src/services/project/`:
  - `submitProject.ts`: Server action validating form with `zodValidator`, sending `POST /api/v1/projects` via `serverFetch`. Catches HTTP 409 (duplicate) and HTTP 429 (rate limit with retryAfterSeconds), mapping them to a dedicated non-destructive countdown alert banner.
  - `getMySubmissions.ts`: Server fetcher calling `GET /api/v1/projects/my-submissions`.
  - `getMyStats.ts`: Server fetcher calling `GET /api/v1/projects/my-stats`.
- **Components & Views**:
  - `src/components/modules/projects/SubmissionFormDialog.tsx`:
    - Modal dialog with inputs for Title, GitHub Repo URL, Live Demo Link, and Description.
    - Form submit state with disabled button and spinner preventing duplicate submission clicks.
    - Renders server validation errors and handles duplicate/rate-limit alerts cleanly.
  - `src/app/dashboard/page.tsx` (Student View):
    - Primary "Submit New Project" CTA button.
    - Personal summary metrics: Total Submissions, Approved count, Pending count.
    - "My Submissions" list displaying Reference ID, Project Title, Repo Link, Live Link, Submission Date, Status Badge, and Mentor Review Notes.

---

### Feature 4: Mentor Review Dashboard (Server-Side Paginated Table & Server Filters)
**Goal**: Deliver a fast, server-rendered review queue with server-side pagination, server status filtering, search filter, and aggregated statistics.

- **Server-Side Fetchers & Actions** in `src/services/project/`:
  - `getProjects.ts`: Server fetcher accepting `{ page, limit, status, searchTerm }`, calling backend `/projects`.
  - `getProjectStats.ts`: Server fetcher calling backend `/projects/stats`.
  - `reviewProject.ts`: Server action calling `PATCH /api/v1/projects/:id/review`, validating status and feedback notes, and calling `revalidatePath("/dashboard")`.
- **Reusable Table & Filter Components** in `src/components/shared/`:
  - `TablePagination.tsx`:
    - Reads current page and total pages.
    - Previous, Next, and numbered page buttons.
    - Items per page selector (5, 10, 20, 50).
    - Uses `useTransition` to update URL searchParams without page reloads.
  - `SelectFilter.tsx`:
    - Status dropdown options: `All`, `PENDING`, `APPROVED`, `REJECTED`.
    - Updates `?status=` in URL searchParams.
  - `SearchFilter.tsx`:
    - Search input updating `?searchTerm=` in URL searchParams with debounce.
- **Review Action Dialog & Details Dialog**:
  - `src/components/modules/projects/ReviewActionDialog.tsx`:
    - Opens when mentor/admin clicks "Review" on any `PENDING` row.
    - **One-Time Final Decision**: Only available for projects with status `PENDING`. Once evaluated, the button is replaced by a "Reviewed" indicator or hidden in favor of the View button, locking the review decision permanently.
    - Displays project title, candidate info, links, and text.
    - Controls: "Approve" or "Reject" toggle, and textarea for feedback notes.
    - Submits via `reviewProject.ts`, shows success toast, and refreshes table via `revalidatePath`.
  - `src/components/modules/projects/ProjectDetailsDialog.tsx`:
    - Opens when mentor/admin clicks "View" button on ANY row (pending, approved, or rejected).
    - Modal displays full project metadata:
      - Project Title, Description (clean text wrap, no horizontal clipping)
      - Student Full Name and Email Address
      - Clickable GitHub Repository URL and Live Demo URL (with SVG external link icons)
      - Submission Timestamp & Last Updated Timestamp
      - Evaluation Decision Badge (`PENDING`, `APPROVED`, `REJECTED`)
      - Reviewer information & full feedback notes (if reviewed) or "Awaiting mentor evaluation" status.
- **Admin Overview & Visual Analytics**:
  - `src/components/modules/admin/AdminAnalyticsDashboard.tsx` & `AdminCharts.tsx`:
    - Designed as a real-world, data-dense engineering dashboard (zero cheesy AI gradients, zero emojis).
    - Responsive Recharts components:
      - **Submission & Review Volume Chart**: Bar or Area visualization tracking submissions vs reviews.
      - **Review Decision Distribution**: Visual breakdown of Approved, Pending, and Rejected projects with pass-rate metric display.
    - High-level KPI metric cards (Total Submissions, Pending Queue, Approvals, Rejections, Pass Rate, Total Accounts).
- **Mentor Dashboard View**:
  - Aggregated Statistics Cards (Total Submissions, Pending Queue, Approved, Rejected, Pass Rate).
  - Search and Status Filter bar.
  - Paginated Data Table with "View" details button and "Review" action (for pending items).

---

### Feature 5: Admin User Directory & Mentor Creation (Admin View)
**Goal**: Provide Admins with a directory to view all registered users, search/filter accounts, toggle/manage account status (`ACTIVE`, `SUSPENDED`, `BANNED`), and create new Mentors. Role editing is disabled.

- **Validation Schema** in `src/zod/user.validation.ts`:
  - `createMentorSchema`: name (min 2), email, password (min 6).
- **Server Actions & Fetchers** in `src/services/user/`:
  - `getAllUsers.ts`: Server fetcher calling `GET /api/v1/users`.
  - `createMentor.ts`: Server action calling `POST /api/v1/users/mentor`.
  - `updateUserStatus.ts`: Server action calling `PATCH /api/v1/users/:id/status`.
- **Components & Views**:
  - `src/components/modules/users/AddMentorDialog.tsx`:
    - Modal dialog with Name, Email, and Password fields.
    - Integrated with `useActionState(createMentor, null)`.
    - Enables Admin to create new mentors directly.
  - `src/app/dashboard/users/page.tsx`:
    - Protected: Rendered only for `ADMIN`.
    - Top bar with "Add New Mentor" action button.
    - Table of users showing Name, Email, Role badge, and Status badge.
    - Status toggle/action: Activate or Suspend account. Role changes are disabled.

---

### Feature 6: Dashboard Settings Page (Profile Identity & Read-Only Email)
**Goal**: Provide a clean profile settings page where the user can view their email, role, and details, with password changes disabled.

- **Page**: `src/app/dashboard/settings/page.tsx`
  - Profile Card displaying:
    - User Full Name
    - User Email Address (displayed with a copy/view badge, read-only)
    - Role Badge (`ADMIN`, `MENTOR`, `STUDENT`)
    - Account Status Badge (`ACTIVE`)
    - Account Member Since Date
  - Security Notice:
    - Clear informational card stating: "Password updates are managed by platform administrators. Credential modifications are disabled for assessment evaluation."
    - No password input fields or change password submission forms.

---

### Feature 7: Role-Adaptive Navigation & Final Polish
**Goal**: Unify layout and route protection based on the user's role.

- **Sidebar Navigation (`Sidebar.tsx`)**:
  - For `STUDENT`: "My Submissions", "Submit Project", "Settings".
  - For `MENTOR`: "Review Queue", "Evaluations", "Statistics", "Settings".
  - For `ADMIN`: "Review Queue", "Directory (Users)", "Platform Stats", "Settings".
- **Topbar (`Topbar.tsx`)**:
  - Displays user name, role badge (`ADMIN`, `MENTOR`, `STUDENT`), and Sign Out button.
- **Verification**:
  - Full TypeScript type check (`npx tsc --noEmit`).
  - Next.js production build (`npm run build`).
  - Zero non-ASCII or emoji characters across all files.
