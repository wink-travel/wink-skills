# Wink Skills

A collection of portable agent skills for working with the [Wink](https://wink.travel) platform. Each skill lives under `skills/` and works with any agent client that supports skills and MCP.

## Skills

| Skill                                              | Description                                                                                               |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| [`wink-api-builder`](skills/wink-api-builder/)     | Implement, review, or debug Wink API integrations using the connected Wink MCP server as source of truth. |
| [`wink-hotel-booking`](skills/wink-hotel-booking/) | Find and book hotels with quoted hotel cards and guided or authorized autonomous MPP payments.            |

## Install

Pick a skill from the table above and copy its folder into your agent's skill directory.

<details>
<summary><strong>Claude Code</strong></summary>

| Scope      | Path                            |
| ---------- | ------------------------------- |
| User-level | `~/.claude/skills/<skill-name>` |
| Repo-local | `.claude/skills/<skill-name>`   |

Invoke with:

```text
/<skill-name> <your prompt>
```

</details>

<details>
<summary><strong>Codex</strong></summary>

| Scope      | Path                              |
| ---------- | --------------------------------- |
| User-level | `$CODEX_HOME/skills/<skill-name>` |
| Repo-local | `.agents/skills/<skill-name>`     |

Invoke with:

```text
Use $<skill-name> to <your prompt>.
```

</details>

<details>
<summary><strong>Other agents</strong></summary>

Place the skill folder wherever your agent resolves skills from. The entry point for every skill is `SKILL.md` — point your agent at it and ensure any required MCP servers are connected.

</details>

## Requirements

- An agent client with MCP support
- Node.js 23.7+ (for local development scripts)
- Skill-specific requirements are listed in each skill's `SKILL.md`

## Development

```bash
npm install
npm run format
npm run type-check
npm run validate
```

See `AGENTS.md` for release and versioning rules.
