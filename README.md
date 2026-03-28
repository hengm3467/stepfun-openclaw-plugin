# StepFun External Plugin Example

This directory is a repo-local prototype of a standalone StepFun provider
plugin. It is intentionally outside `extensions/` so OpenClaw does not treat it
as a bundled plugin during metadata generation, provider registry wiring, or
default enablement.

When you split this into its own repository, you can copy this directory almost
as-is and then replace the package metadata with your real publish target.

## Recommended standalone repo layout

```text
openclaw-stepfun-plugin/
  index.ts
  provider-catalog.ts
  openclaw.plugin.json
  package.json
  README.md
```

## Local install

From the standalone plugin repo root:

```bash
tmp="$(mktemp -d)"
printf '{}\n' > "$tmp/openclaw.json"
OPENCLAW_STATE_DIR="$tmp" \
OPENCLAW_CONFIG_PATH="$tmp/openclaw.json" \
openclaw plugins install .
```

Using only `OPENCLAW_STATE_DIR` is not enough when you already have an existing
default config on disk. For an isolated trial run, set both environment
variables.

## Verify the loaded plugin

```bash
OPENCLAW_STATE_DIR="$tmp" \
OPENCLAW_CONFIG_PATH="$tmp/openclaw.json" \
STEPFUN_API_KEY=test-key \
openclaw plugins inspect stepfun --json
```

Check that the inspect output includes both provider ids:

- `stepfun`
- `stepfun-plan`

## Current behavior

- Provider ids: `stepfun`, `stepfun-plan`
- Shared env var: `STEPFUN_API_KEY`
- Four setup choices:
  - Standard API key (China)
  - Step Plan API key (China)
  - Standard API key (International)
  - Step Plan API key (International)
- Env-only discovery defaults to the international endpoints
- Setup writes auth profiles for both `stepfun` and `stepfun-plan`, so the
  plugin does not rely on core auth normalization for `*-plan` variants

## First publish checklist

- Replace the example package name with the real npm or ClawHub package name you
  want to publish.
- Update the version and repository metadata in `package.json`.
- Keep `openclaw.install.minHostVersion` aligned with the oldest OpenClaw build
  you intend to support.
- If you publish source files, keep `openclaw.extensions` pointing at
  `./index.ts`.
- If you publish built output instead, change `openclaw.extensions` to the
  built entry path, typically `./dist/index.js`.
- Run one local install and one `plugins inspect` pass before attempting
  ClawHub publish.
