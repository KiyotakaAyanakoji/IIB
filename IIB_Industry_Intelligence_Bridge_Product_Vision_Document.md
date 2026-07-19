# Product Vision Document

**Team Name:** ADAG

**Product Name:** **IIB (Industry Intelligence Bridge)**

**Date:** 11 July 2026

**Version:** 2.0

---

# 1. Vision Statement

> For students, colleges, and recruiters who struggle to discover, organize, and manage quality job and internship opportunities, **IIB (Industry Intelligence Bridge)** is a SaaS-based Job & Internship Intelligence Platform that centralizes opportunities, provides intelligent recommendations, automates placement workflows, and simplifies recruitment. Unlike traditional job portals that focus only on listings, IIB combines opportunity aggregation, resume intelligence, analytics, Excel automation, and role-based collaboration into one unified platform.

---

# 2. Problem Statement

## Problem

Students spend significant time searching across multiple websites for relevant jobs and internships. Colleges manually collect opportunities using spreadsheets, leading to duplicated records, outdated listings, inconsistent formatting, and inefficient placement workflows. Recruiters often struggle to reach the right candidates across institutions.

## Who feels this pain most

- Engineering students
- Fresh graduates
- Training & Placement Coordinators
- Colleges
- Recruiters
- Small and medium-sized companies

## Evidence / Proof Points

- Students regularly search across multiple platforms such as LinkedIn, Internshala, Wellfound, Indeed, Naukri, and company career pages.
- Placement coordinators manually maintain Excel sheets, update deadlines, remove duplicates, and distribute opportunities.
- Existing platforms rarely provide institution-focused placement management or automated Excel workflows.

---

# 3. Target User

- **Primary User:** Training & Placement Coordinators in colleges.
- **Current Workaround:** LinkedIn, Internshala, Wellfound, Indeed, Naukri, Manual Excel, Google Sheets.

---

# 4. Value Proposition

| Before                                         | After                                           |
|------------------------------------------------|-------------------------------------------------|
| Students search across many websites manually. | Personalized recommendations from one platform. |
| Placement coordinators manage Excel manually.  | Automated Excel & Google Sheets management.     |
| Recruiters struggle to reach students.         | Centralized recruiter dashboard.                |

---

# 5. Differentiator

## Existing Alternatives

- LinkedIn Jobs
- Internshala
- Wellfound
- Naukri
- Indeed
- Glassdoor
- Cutshort
- Apna

## Our Unique Advantage

- One platform for Students, Colleges, and Companies.
- Placement-centric workflows.
- Resume Intelligence.
- AI Assistance.
- Excel & Google Sheets Automation.
- Company Insights.
- Role-Based Dashboards.

---

# 6. Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- TanStack Query
- React Hook Form
- Zod

## Backend
- FastAPI
- SQLModel
- PostgreSQL
- Celery

## Authentication
- Clerk

## AI
- OpenAI
- Gemini

## Deployment
- Vercel
- Render
- Supabase
- Upstash Redis
- Docker
- GitHub Actions

---

# 7. Core MVP Features

- Authentication & RBAC
- Student Portal
- College Portal
- Company Portal
- Resume Upload & Parsing
- Job & Internship Search
- Smart Filtering
- Excel Export
- Google Sheets Sync
- Analytics Dashboard
- Notifications
- Recruiter Dashboard

---

# 8. Phase Themes


| Phase   | Days         | Theme / Focus                                                                             |
|---------|--------------|-------------------------------------------------------------------------------------------|
| Phase 1 | Day 1 – 25   | Foundation, System Architecture, Authentication, RBAC, Database, UI Design                |
| Phase 2 | Day 26 – 50  | Core Platform Modules (Student, College, Company, Recruiter, Job & Internship Management) |
| Phase 3 | Day 51 – 75  | Resume Intelligence, Recommendation Engine, Excel & Google Sheets Automation, Analytics   |
| Phase 4 | Day 76 – 100 | AI Features, Security, Performance Optimization, Testing, Deployment & Final Demo         |

---

# 9. Success Metrics

- 100+ Students
- 10+ Colleges
- 50+ Companies
- 90% Reduction in manual Excel work
- Daily synchronized opportunities

---

# 10. Research References

- LinkedIn Jobs
- Internshala
- Wellfound
- Naukri
- Indeed
- Glassdoor
- FlexJobs
- Arc.dev
- Built In

---

# 11. Team Responsibilities

| Member          | Role          | Responsibility                |
|-----------------|---------------|-------------------------------|
| Gaurav Bhosale  | Project Lead  | Backend, Database, Deployment |
| Amey Nadkar     | Frontend Lead | UI/UX, React, Documentation   |
| Dheeraj Sarfare | AI Engineer   | Resume Intelligence, AI       |
| Aditee Talekar  | QA & Research | Testing, Validation, Research |

---

# 12. Open Questions

- Public review integration strategy
- Recommendation algorithm
- Premium AI scope
- Recruiter verification
- Mobile application roadmap
- SaaS pricing model

---

## Important Notes

- **IIB = Industry Intelligence Bridge**
- Supports **Jobs + Internships**.
- Human verification is performed by Placement Coordinators.
- AI assists but does not replace human verification.
