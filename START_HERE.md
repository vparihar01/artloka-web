# Start Here

## Recommended route
1. Create a **private GitHub repository** named `artloka-web`.
2. Upload or push the contents of this folder to the repository.
3. Open the repository in **Codex**.
4. Run the Milestone 0 prompt from `docs/CODEX_EXECUTION_PLAN.md`.
5. Connect the GitHub repository to **Vercel**.
6. Deploy to a preview URL with `CATALOG_MODE=preview`.
7. Complete product claims and image QA.
8. Switch Production to `CATALOG_MODE=strict` and connect the public domain.

## First local commands
```bash
cp .env.example .env.local
npm install
npm run verify
npm run dev
```

## First Codex message
```text
Work in Plan mode. Read AGENTS.md, START_HERE.md and every file in docs/. Run the current verification commands. Audit the repository against Milestone 0 in docs/CODEX_EXECUTION_PLAN.md. Do not add on-site checkout. Create docs/AUDIT.md, fix setup blockers only, rerun npm run verify, and report changed files, results and remaining risks.
```
