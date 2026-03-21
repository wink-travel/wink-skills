# Wink Skills

Public skill packages for building against the Wink API with AI coding agents. MCP-first — the agent uses the connected Wink MCP server as source of truth for live OpenAPI contracts and docs instead of bundled schemas.

## Install

Copy `skills/wink-api-builder/` into the appropriate location:

| Client      | User-level                            | Repo-local                        |
| ----------- | ------------------------------------- | --------------------------------- |
| Claude Code | `~/.claude/skills/wink-api-builder`   | `.claude/skills/wink-api-builder` |
| Codex       | `$CODEX_HOME/skills/wink-api-builder` | `.agents/skills/wink-api-builder` |

Then connect the Wink MCP server in the same environment.

**Claude Code:**

```text
/wink-api-builder add a TypeScript client for the Wink affiliate create flow
```

**Codex:**

```text
Use $wink-api-builder to add a TypeScript client for the Wink affiliate create flow.
```

See `skills/wink-api-builder/references/examples.md` for more task starters.

## Requirements

- Access to a Wink MCP server that exposes Wink docs and OpenAPI resources
- An agent client with MCP support
- Node.js 23.7+ for local script execution

## Development

```bash
npm install
npm run format
npm run type-check
npm run validate
```

See `AGENTS.md` for release and versioning rules.
