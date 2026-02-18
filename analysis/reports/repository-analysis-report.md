# Currents Example Repositories Audit Report

**Date:** 2026-02-13  
**Scope:** 26 Repositories in the `currents-examples` ecosystem  
**Objective:** Evaluate repository quality, identify redundancies, and recommend consolidation/improvements.

## 1. Executive Summary

The audit covered 26 repositories demonstrating Currents integration across various CI providers (GitHub Actions, Azure DevOps, AWS CodeBuild, Jenkins, CircleCI) and frameworks (Playwright, Cypress, Jest, Node, Vitest).

**Key Findings:**
*   **High Value:** The core CI examples for Playwright and Cypress are essential and should be preserved.
*   **Maintenance Needs:** Almost all repositories suffer from **accessibility issues**:
    *   Key configuration files (`package.json`, `cypress.config.js`, YAML workflows) are often committed as **single-line blobs**, making them difficult to read or copy.
    *   **Hardcoded Secrets/IDs**: Many repos hardcode Project IDs (e.g., `Ij0RfK`, `mdXsz8`) or use placeholder strings that cause runtime errors.
    *   **Missing Quickstarts**: READMEs often lack step-by-step instructions, environment variable requirements, or local run commands.
*   **Consolidation Opportunities:** There are overlapping repositories, particularly for GitHub Actions and basic Playwright setups, that can be merged or clearly distinguished.

## 2. Consolidation Strategy & Categorization

### A. GitHub Actions (The "Gold Standard" Candidates)
There are multiple GitHub Actions examples. We should designate one "Gold Standard" per framework and treat others as feature-specific variants.

| Repository | Framework | Status | Recommendation |
| :--- | :--- | :--- | :--- |
| **`playwright-gh-actions-demo`** | Playwright | **KEEP (Gold)** | **Primary Reference.** Comprehensive (Sharding, Orchestration, Re-run). Polish this repo. |
| `gh-actions-example` | Cypress | **KEEP (Gold)** | **Primary Reference.** Update to match Playwright demo quality. |
| `currents-actions-example` | Playwright | **RENAME/CLARIFY** | Rename to `currents-actions-feature-demo` to avoid confusion with GitHub Actions. Focuses on "Currents Actions" (rules). |
| `gh-matrix-job-url-example` | Cypress | **MERGE/LINK** | Specific advanced pattern. Mention in `gh-actions-example` advanced docs or keep as niche recipe. |
| `currents-jest-github-actions-example` | Jest | **KEEP** | Good niche example. |
| `currents-nodejs-github-actions-example` | Node Native | **KEEP** | Good niche example. |

### B. CI Provider Examples
Maintain one high-quality reference implementation per provider/framework pair.

| Provider | Cypress Repo | Playwright Repo | Recommendation |
| :--- | :--- | :--- | :--- |
| **Azure DevOps** | `azure-devops-example` | `playwright-azure-devops-example` | **Keep both.** Ensure `azure-pipelines.yml` is readable in both. |
| **AWS CodeBuild** | `aws-codebuild-example` | `playwright-aws-codebuild-example` | **Keep both.** Add `buildspec.yml` comments and local run instructions. |
| **CircleCI** | `circleci-example` | `circleci-pw-example` | **Keep both.** Update `currents.config.js` to use env vars. |
| **Jenkins** | N/A | `playwright-jenkins-example` | **FIX & EXPAND.** Current state is basic. |
| **Jenkins (Adv)** | N/A | `jenkins-last-failed` | **MERGE** features into `playwright-jenkins-example` (as advanced pipeline stage) or keep as specific "last-failed" recipe. |
| **Netlify** | `currents-netlify-example` | N/A | **UPDATE.** Focus README on Currents, not just "Astro Template". |

### C. Framework Integrations (Nx, pnpm, etc.)

| Repository | Focus | Status | Recommendation |
| :--- | :--- | :--- | :--- |
| `currents-nx-example` | Nx + Cypress | **KEEP** | Update config to remove hardcoded IDs. |
| `currents-playwright-nx-example` | Nx + Playwright | **KEEP** | Good reference. Fix formatting. |
| `currents-playwright-pnpm-example` | pnpm + Chromatic | **KEEP** | High value (shows Chromatic + Currents). |
| `currents-pnpm` | pnpm (Basic) | **DEPRECATE** | Redundant. `playwright-gh-actions-demo` or `currents-playwright-pnpm-example` covers this. |
| `currents-junit-xml-example` | JUnit/Generic | **KEEP** | Valuable for non-JS frameworks (Java, Python, etc.). |

### D. Specialized Feature Demos

| Repository | Feature | Recommendation |
| :--- | :--- | :--- |
| `currents-cypress-cucumber-example` | Cucumber | **KEEP.** Update dependencies and patch instructions. |
| `currents-playwright-bdd-cucumber-example` | Playwright BDD | **KEEP.** Add quickstart. |
| `currents-playwright-component-tests-example` | Component Testing | **KEEP.** Mark as experimental if applicable, or update. |
| `currents-playwright-coverage-example` | Coverage (Next.js) | **KEEP.** Good reference for complex setup. |
| `blog-playwright-coverage-demo` | Coverage (Blog) | **ARCHIVE/LINK.** Static content for a blog post. Add disclaimer pointing to the main coverage example. |
| `currents-playwright-orchestration-example` | Orchestration Benchmark | **KEEP.** Valuable performance demo. |

## 3. Universal Improvement Checklist
Apply these fixes to **ALL** kept repositories:

1.  **Readable Files**: Reformat single-line JSON/YAML/JS files into multi-line, indented formats.
2.  **Environment Variables**:
    *   Create `.env.example`.
    *   Replace hardcoded `projectId: "Ij0RfK"` with `process.env.CURRENTS_PROJECT_ID`.
    *   Fail fast if secrets are missing.
3.  **Quickstart Guide**:
    *   Add a standardized README section: "Prerequisites", "Setup (Env Vars)", "Run Locally", "Run in CI".
4.  **NPM Scripts**:
    *   Ensure `package.json` has `test`, `test:ci`, `report` scripts so users don't need to memorize CLI flags.
5.  **CI Build ID**:
    *   Standardize on a robust CI Build ID generation pattern (e.g., `branch-commit-runAttempt`).

## 4. Detailed Repository Audit

| Repository | Category | Action Items |
| :--- | :--- | :--- |
| `aws-codebuild-example` | CI/Cypress | Reformat files; Add `scripts`; Add `.env.example`. |
| `azure-devops-example` | CI/Cypress | Stop hardcoding Project ID; Add `.env.example`. |
| `blog-playwright-coverage-demo` | Blog | Add README explaining context; Link to main coverage repo. |
| `circleci-example` | CI/Cypress | Remove hardcoded Project ID; Format config files. |
| `circleci-pw-example` | CI/Playwright | Format files; Add Quickstart. |
| `currents-actions-example` | Feature | Rename to `currents-actions-feature-demo`; Clarify it's about "Rules". |
| `currents-cypress-cucumber-example` | Feature | Format files; Fix `test` script; Update patch instructions. |
| `currents-jest-github-actions-example` | CI/Jest | Remove hardcoded ID; Add local run instructions. |
| `currents-junit-xml-example` | Feature | Format READMEs; Add root Quickstart; Standardize scripts. |
| `currents-netlify-example` | CI/Cypress | Focus README on Currents; Fix TOML formatting. |
| `currents-nodejs-github-actions-example` | CI/Node | Format files; Remove hardcoded staging URLs. |
| `currents-nx-example` | Framework | Remove placeholder URLs; Format files. |
| `currents-playwright-bdd-cucumber-example` | Feature | Move secrets to env vars; Add Quickstart. |
| `currents-playwright-component-tests-example` | Feature | Format README; Clarify `pwc` usage. |
| `currents-playwright-coverage-example` | Feature | Env vars for secrets; Format files; Add CI workflow. |
| `currents-playwright-nx-example` | Framework | Format files; Add `.env.example`; Add `e2e` workflow. |
| `currents-playwright-orchestration-example` | Feature | Add Quickstart; Format files; Explain batching. |
| `currents-playwright-pnpm-example` | CI/Playwright | Env vars for secrets; Format files; Add `package.json` scripts. |
| `currents-pnpm` | Basic | **Deprecate** in favor of `currents-playwright-pnpm-example`. |
| `gh-actions-example` | CI/Cypress | Env vars for Project ID; Format workflow; Add local run. |
| `gh-matrix-job-url-example` | Feature | Format files; Env vars for Project ID. |
| `jenkins-last-failed` | CI/Playwright | Format files; Merge best parts into `playwright-jenkins-example`. |
| `playwright-aws-codebuild-example` | CI/Playwright | Fix README link; Add `.env.example`. |
| `playwright-azure-devops-example` | CI/Playwright | Format README/YAML; Add Quickstart. |
| `playwright-gh-actions-demo` | CI/Playwright | **Gold Standard**. Env vars for Project ID; Format YAML; Add workflow table. |
| `playwright-jenkins-example` | CI/Playwright | **Major Fixes Needed**. Add README; Fix typos; Add tests. |
