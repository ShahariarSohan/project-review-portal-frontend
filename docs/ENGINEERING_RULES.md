# Engineering Standards & Architectural Rules

This document defines the non-negotiable engineering principles, code organization constraints, and visual design standards for the Project Review Portal frontend. Every engineer and AI agent working on this repository must adhere strictly to these rules.

---

## 1. Professional Engineering Mindset (No AI Hallucinations)

- **Write Production-Grade Code**: Code must be engineered with intent, type safety, error boundaries, and defensive checks. Do not write generic or hallucinated boilerplate.
- **Single Responsibility Principle**: Every UI component, server action, and helper must do one thing well.
- **Zero Emojis**: Never use emoji icons in UI text, headings, badges, alerts, buttons, comments, or documentation. Keep all visual indicators clean SVG icons (Hugeicons).
- **Clean Naming Conventions**: Use explicit, descriptive component names (`SubmissionFormDialog.tsx`, `ReviewActionDialog.tsx`, `TablePagination.tsx`).

---

## 2. Modularity & File Size Limits (No Monolithic Files)

- **Strict Component Length Limit**: No single UI file or component should exceed 150 to 200 lines of code. If a component grows beyond this threshold, decompose it into smaller child components.
- **Folder & Component Decomposition**:
  - `src/components/modules/projects/`:
    - `SubmissionFormDialog.tsx`: Modal dialog and form state for student project submissions.
    - `StudentSubmissionsTable.tsx`: Tabular view of student personal submissions and review notes.
    - `MentorReviewTable.tsx`: Review queue table for mentors and admins.
    - `ReviewActionDialog.tsx`: Modal for approving or rejecting submissions with feedback notes.
    - `ProjectStatsCards.tsx`: Aggregated metric cards.
  - `src/components/modules/users/`:
    - `AddMentorDialog.tsx`: Admin dialog for creating new mentors.
    - `UsersTable.tsx`: Admin user directory with role promotion actions.
  - `src/components/shared/`:
    - `TablePagination.tsx`: Reusable pagination bar with page buttons and page size selector.
    - `SelectFilter.tsx`: URL-driven dropdown filter.
    - `SearchFilter.tsx`: Debounced search input updating URL query parameters.
    - `StatusBadge.tsx`: Semantic status pill (`PENDING`, `APPROVED`, `REJECTED`).
    - `InputFieldError.tsx`: Reusable Zod error display component.
    - `EmptyState.tsx`: Reusable empty state view with title, description, and action button.
  - `src/services/`:
    - Separate server action and fetcher files for each domain (`auth`, `project`, `user`).

---

## 3. Anti-AI Design System & Visual Architecture

Avoid all stereotypical "AI-generated" visual elements (purple-to-blue gradients, neon glowing borders, floating cards, generic Roboto/Inter fonts):

- **Curated Typography System**:
  - **Headings & Brand**: Montserrat (`font-heading`, bold, geometric, authoritative).
  - **Body & Controls**: Plus Jakarta Sans (`font-body`, clean, highly legible SaaS font).
  - **Metadata, IDs & Code**: JetBrains Mono (`font-mono`, for GitHub links, submission IDs, timestamps).
- **Color Architecture**:
  - Sidebar & Topbar: Architectural Deep Slate (`#0d121c` / `#151d2a`) with crisp border dividers (`#1e293b`).
  - Content Surface: Light Slate (`#f8fafc`) with pure white card containers (`#ffffff`) and subtle borders (`#e2e8f0`).
  - Primary Accent: Deep Teal / Emerald Slate (`#0f766e` / `#0d9488`), offering a calm, institutional, professional feel.
  - Status Indicators: Amber for `PENDING`, Emerald for `APPROVED`, Rose for `REJECTED`.
- **Data-Dense SaaS UX**:
  - Clean table padding, clear badge statuses with solid dot indicators, monospaced dates, clean tabular data layout.
  - Micro-interactions: Accessible focus rings, smooth transition on table row hover (`hover:bg-slate-50/75`), clean dialogs with Backdrop Blur.

---

## 4. Resilient UI States: Loading, Empty, Error & Overflow

- **Instant Skeleton Streaming on Initial Load**:
  - The dashboard must provide src/app/dashboard/loading.tsx so that Next.js App Router immediately streams skeleton placeholders on first page load or navigation.
  - Skeletons must mirror the exact dimensions of real content (4 metric card skeletons, search/filter skeleton bar, and 5-row table skeleton) to achieve Zero Cumulative Layout Shift (CLS = 0).
  - Never display a blank white screen, unstyled text, or a generic full-page spinning wheel on initial load.

- **Explicit Empty States**:
  - If a student has submitted zero projects, do not display an empty, lifeless table. Render `EmptyState.tsx` with an illustration icon, clear messaging ("No submissions yet"), and a "Submit Your First Project" trigger button.
  - If a Mentor filter matches zero rows, render an informative "No matching submissions found" card with a "Clear Filters" button.
- **Text Overflow & Table Layout Guardrails**:
  - Long URLs and 3000-character descriptions must never break table column boundaries or cause horizontal scrolling.
  - Use `max-w-[200px] truncate` for repository and live URLs.
  - Show full review notes and descriptions within the dedicated modal dialogs.
- **Button Loading States**:
  - All form submission buttons must show an animated SVG spinner and disable immediately upon submit to eliminate race conditions and duplicate clicks.

---

## 5. Accessibility (a11y) & Usability Standards

- **Keyboard Navigation**:
  - All modals must be dismissible via the `Escape` key and prevent background scroll while open.
  - Tab navigation must be trapped inside active dialogs.
- **Accessible Controls**:
  - Every input field must have an explicit label or `aria-label`.
  - Password eye toggle buttons must provide dynamic `aria-label="Show password"` and `aria-label="Hide password"`.
  - Clear focus indicators: `focus-visible:ring-2 focus-visible:ring-teal-700/30 focus-visible:outline-none`.

---

## 6. Next.js 16 & React 19 Architectural Standards

- **Server Actions with `useActionState`**:
  - All form submissions must use native React 19 `const [state, formAction, isPending] = useActionState(serverAction, null)`.
  - Server actions validate form data with `zodValidator` and return `{ success, data, errors: [{ field, message }] }`.
  - Render error messages beneath form inputs with `<InputFieldError field="fieldName" state={state} />`.
  - No client form libraries or redundant `useEffect` hooks.
- **Server-Side Data Tables & URL Search Params**:
  - Server Components read URL `searchParams` (`?page=1&limit=10&status=PENDING&searchTerm=...`).
  - Data fetching happens server-side before HTML streams to the browser.
  - `TablePagination.tsx`, `SelectFilter.tsx`, and `SearchFilter.tsx` update URL search parameters via `useTransition()` and `router.push()`, triggering native Server Component re-renders with automatic cache revalidation.
  - **Strictly Zero Unnecessary `useEffect` hooks**: Never synchronize URL state into local component state with `useEffect`. Let the URL and Server Components drive the state.
- **Edge Route Protection (`src/middleware.ts`)**:
  - Unauthenticated requests to `/dashboard/*` redirect to `/`.
  - Authenticated requests to `/` redirect to `/dashboard`.
- **Deterministic Hydration**:
  - Format timestamps and dates consistently to prevent SSR vs client hydration mismatches.

---

## 7. Assessment Usability & Settings Page Standards

- **Three One-Click Demo Login Buttons**:
  - The login page (`/`) must display 3 prominent buttons:
    - `[Admin (Full Access)]` -> Autofills `admin@reviewportal.com` / `Admin123`.
    - `[Mentor (Reviews)]` -> Autofills `mentor@reviewportal.com` / `Mentor123`.
    - `[Student (Submissions)]` -> Autofills `student@reviewportal.com` / `Student123`.
- **Instant Student Signup**:
  - Registration at `/signup` creates active accounts (`isVerified: true`) with immediate JWT cookie issuance and redirects to `/dashboard`. No OTP verification required.
- **Settings Page Specification**:
  - In `/dashboard/settings`, the page displays a clean profile card showing: Full Name, Email (read-only), Role, and Status.
  - **Password change is strictly disabled**: No password input fields or change password submission forms.

---

---

## 9. Zero Dead Code & Unused Feature Pruning Protocol

- **Mandatory Dead Code Elimination**: No unused models, dead utility files, obsolete endpoints, or zombie functions are permitted in the codebase.
- **Pre-Removal Analysis Rule**: Before deleting any code, trace all imports, callers, and dependencies to verify that it is 100% unused and does not break active UI components or server actions.
- **Prune Boilerplate Artifacts**:
  - Remove unused service functions (e.g., legacy orgetPassword, esetPassword) that belong to superseded features.
  - Remove dead UI components, unused CSS classes, or orphaned helper utilities.
- **Cleanliness Standard**: Never leave dead code "for later" or commented-out legacy blocks. An engineered codebase must be lean, intentional, and immediately understandable to any reviewer.

## 10. Execution Phasing Protocol

- Code must be implemented **one feature at a time**.
- Before proceeding to the next feature:
  1. Compile and type-check with `npx tsc --noEmit`.
  2. Verify responsive layout, design consistency, and zero console errors.
  3. Await user review and confirmation before starting the next feature.