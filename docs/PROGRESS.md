# Progress

**Completed:** live HTML audit, documentation, App Router setup, shared shell, booking demo, homepage, directory, Singapore/Dubai templates and Singapore experiences route.

**Verification:** `pnpm typecheck` passed and `pnpm lint` passed. `pnpm build` and `pnpm dev` are blocked by the local Windows execution environment (`spawn EPERM` while Next launches a worker), before any application route can start. This is an environment-level limitation, not a TypeScript/lint failure.

**Known limitations:** Local browser automation reported no available browser and the local Next runtime cannot launch due to `spawn EPERM`. Therefore screenshots, route smoke tests and hover/video behavior could not be compared locally. Exact proprietary typography and hero video are substituted; these distinctions are recorded in `REFERENCE_AUDIT.md`. Booking and newsletter are client-only, explicitly do not submit to third parties.
