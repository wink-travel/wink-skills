# AGENTS.md

## Purpose

This repo distributes portable Wink AI skill packages for Agent Skills-compatible clients.

The primary artifact is each folder under `skills/`. A skill must remain installable in both Claude Code and Codex without maintaining separate instruction sets.

## Working Rules

- Keep one shared skill folder per capability. Do not add separate Claude-only prompt packs or duplicate Codex-only instruction copies.
- Treat `SKILL.md` as the canonical instruction set. If `agents/openai.yaml` exists, keep it aligned with the same behavior.
- Keep `SKILL.md` concise. Move detailed examples and reference material into `references/`.
- Preserve the MCP-first model. Do not bake Wink API schemas or stale endpoint catalogs into the repo.
- Prefer small, surgical edits. Update examples when workflow behavior changes.

## Versioning

- Use semantic version tags: `vMAJOR.MINOR.PATCH`.
- Keep the root `package.json` version aligned with the next public release.
- Keep each released skill's `metadata.version` aligned with the released tag that contains its latest behavior change.
- Use `PATCH` for docs, validator, tooling, formatting, or non-behavioral packaging changes.
- Use `MINOR` for new workflow guidance or expanded skill capability without breaking installation or invocation.
- Use `MAJOR` for breaking changes such as renamed skills, incompatible install layout, or materially different invocation expectations.

## Release Process

1. Make the skill and doc changes.
2. Run `npm install` if dependencies are not already present.
3. Run `npm run format`.
4. Run `npm run type-check`.
5. Run `npm run validate`.
6. Update `package.json` and any changed skill `metadata.version`.
7. Commit the release as a single coherent change.
8. Tag the release as `vX.Y.Z`.
9. Publish GitHub release notes summarizing skill behavior changes, packaging changes, and any installation impact.

## Validation

- `npm run format:check`: verify formatting
- `npm run type-check`: verify TypeScript scripts
- `npm run validate`: validate packaged skills

CI should keep running the same three checks for the published repo state.
