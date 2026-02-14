# 10:30pm Plan — Repo Security & Compliance Scanner

## One-line idea

You throw in a GitHub repo; we handle **security**, **vulnerability**, and **privacy** — the stuff AI-coded apps typically struggle with. We show a score, list vulnerabilities, ideally suggest or apply fixes, and optionally check alignment with standards (e.g. SOC2).

---

## Product summary

| Layer | What we build |
|-------|----------------|
| **Input** | User pastes or connects a GitHub repo URL |
| **Processing** | Backend clones/inspects repo and sends content to our analysis engine |
| **Analysis (v0)** | Analysis tool = **OpenAI API** (or similar LLM) — reason over code, detect issues, explain, suggest fixes |
| **Output** | **Scores** (security, privacy, compliance), **vulnerability list** with file/line highlights, and optionally **fixes** and **compliance gaps** (e.g. SOC2) |

---

## UI (frontend)

- **Hosting:** Vercel-hosted website.
- **Flow:**
  1. User enters or pastes a GitHub repo URL (and optionally auth for private repos).
  2. User clicks **Analyze**.
  3. App shows:
     - **Overall score(s)** — e.g. security score, privacy score, compliance readiness.
     - **List of vulnerabilities** with severity, file path, line number, and short description.
     - **File-level highlights** — which files have issues (and ideally in-file locations).
     - Optional: **suggested fixes** (diffs or copy-paste snippets) and **compliance gaps** (e.g. “SOC2: missing access logging here”).
- Keep the first version simple: one main “analyze” action and a clear results view (scores + table/list + file drill-down).

---

## Backend

- **Responsibilities:**
  - Accept repo URL (and optional GitHub token).
  - **Clone or fetch** the repo (or use GitHub API to get file contents; clone is better for full-tree analysis).
  - **Normalize and send** relevant files (or chunks) to the **analysis tool**.
- **Analysis tool (v0):** **OpenAI API** (or equivalent) — send code + prompts to:
  - Detect security issues (injection, secrets, auth, misconfig, etc.).
  - Detect privacy issues (PII handling, logging, data exposure).
  - Optionally check for compliance patterns (SOC2-style: access control, logging, encryption, etc.).
  - Return structured findings (severity, file, line, message, suggestion).
- Later we can swap or augment with Semgrep, tree-sitter, or other static analysis and use the LLM to explain/aggregate.

---

## What we show (scores & vulnerabilities)

- **Security score** — e.g. 0–100 or grade; based on number and severity of security findings.
- **Vulnerability list** — each item: severity, file, line(s), short description, optional fix or link to standard (e.g. OWASP).
- **Privacy score / highlights** — PII handling, logging of sensitive data, exposure in errors.
- **Compliance (optional v0):** “SOC2-style” or similar — high-level checklist (access control, audit logging, encryption at rest/transit, incident response hints). Show gaps and, if possible, which files/lines relate.

Ideally we **fix** where possible: e.g. “suggested patch” or “replace this with …” so the product isn’t only “scanner” but “scanner + remediation.”

---

## Compliance (SOC2 etc.)

- **v0:** Map findings to a small set of **compliance-related themes** (e.g. “Access control”, “Audit logging”, “Secrets management”, “Data protection”) and tag issues. Show a simple “compliance readiness” or “gaps” view (e.g. “SOC2-style: 3 gaps” with file/line).
- **Later:** Deeper mapping to SOC2 control domains (or other frameworks) and more structured “evidence” (e.g. “no evidence of access reviews in code”).

---

## Tech stack (aligned with ideation)

- **Frontend:** Vercel-hosted site (e.g. Next.js or similar) — input form, Analyze button, results (scores, table, file highlights).
- **Backend:** Service that:
  - Takes repo URL (and optional token).
  - Clones or fetches repo.
  - Prepares payload for analysis (file list, contents or chunks).
  - Calls **OpenAI API** with a structured prompt (security + privacy + optional compliance).
  - Parses response into scores and vulnerability list.
  - Returns JSON to frontend.
- **Analysis (v0):** OpenAI API only. Optional later: Semgrep, tree-sitter, or custom rules for speed and coverage; LLM for explanation and fix suggestions.

---

## Thoughts pulled from ideation

- **ChatGPT convo (Nika):** Focus on AI-reasoning across files, not just pattern matching; show exploit chains and structural understanding; live “paste repo → analyze → see scores and vulns” demo; target AI Grand Prize, Most Technically Complex, YC challenge; differentiation = semantic reasoning over full repo.
- **Claude convo (Maksym):** Pipeline = clone → scan (e.g. Semgrep + tree-sitter) → optional LLM explainer; target “AI slop” security issues (missing auth, hardcoded secrets, SQL injection, permissive CORS, etc.); MVP = get analysis working first, then simple UI; narrative = “security and quality in the age of AI-generated code.”

Plan stays **close to the above product**: Vercel UI (drop repo, Analyze, scores + file-level vulnerabilities), backend that sends repo to an analysis tool, and **v0 analysis = OpenAI API**, with scores, vulnerabilities, optional fixes, and optional SOC2-style compliance view.

---

## Next steps

1. **Repo structure:** Frontend (Vercel-ready app) + backend (API that clones repo and calls OpenAI).
2. **OpenAI prompt design:** System + user prompts that return structured security/privacy/compliance findings and scores.
3. **Frontend:** Single page — repo input, Analyze, then scores + vulnerability table + file highlights.
4. **Optional:** Add Semgrep or tree-sitter later and merge their output with LLM output for richer findings.
