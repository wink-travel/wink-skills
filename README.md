# Wink Skills

Portable skill packages for building against the Wink API with AI coding agents. Works with any agent client that supports skills and MCP — the agent uses the connected Wink MCP server as source of truth for live OpenAPI contracts and docs instead of bundled schemas.

## Install

Copy `skills/wink-api-builder/` into your agent's skill directory. The exact path depends on the tool you use.

<details>
<summary><strong>Claude Code</strong></summary>

| Scope     | Path                                  |
| --------- | ------------------------------------- |
| User-level | `~/.claude/skills/wink-api-builder`   |
| Repo-local | `.claude/skills/wink-api-builder`     |

Invoke with:

```text
/wink-api-builder add a TypeScript client for the Wink affiliate create flow
```

</details>

<details>
<summary><strong>Codex</strong></summary>

| Scope     | Path                                  |
| --------- | ------------------------------------- |
| User-level | `$CODEX_HOME/skills/wink-api-builder` |
| Repo-local | `.agents/skills/wink-api-builder`     |

Invoke with:

```text
Use $wink-api-builder to add a TypeScript client for the Wink affiliate create flow.
```

</details>

<details>
<summary><strong>Other agents</strong></summary>

Place the skill folder wherever your agent resolves skills from. The skill entry point is `SKILL.md` — point your agent at it, and ensure the Wink MCP server is connected in the same environment.

</details>

Then connect the Wink MCP server in the same environment.

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
