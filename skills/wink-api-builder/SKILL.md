---
name: wink-api-builder
description: Implement, review, or debug Wink API integrations using the connected Wink MCP server as source of truth for live contracts and docs.
license: Apache-2.0
compatibility: Requires a connected Wink MCP server. Designed for Agent Skills-compatible clients including Claude Code and Codex.
metadata:
  version: "0.1.0"
  standard: "Agent Skills"
---

# Wink API Builder

Use the Wink MCP as the source of truth. Do not guess endpoint shapes or copy stale schemas into code when the MCP can verify them.

## Default Workflow

1. Confirm whether the task is implementation, debugging, review, or explanation, and note the target language or repo conventions.
2. Start with `api_search` to find candidate APIs and operations.
3. Before writing code, open the exact MCP resources you need:
   - `wink://api/<api>/operation/<key>`
   - `wink://api/<api>/operation/<key>/request`
   - the primary `wink://api/<api>/operation/<key>/response/<status>`
   - `wink://api/<api>/operation/<key>/recipe` when sequence or pre-calls matter
   - `wink://api/<api>/schema/<SchemaName>` when nested objects need more detail
4. For authenticated APIs, open `wink://docs/developers/authentication.mdx` and capture the concrete setup: how to get the `Client ID` and `Secret Key`, how to exchange them for an access token, which auth header to send, and whether `Wink-Version` is required.
5. Use `docs_search` and `wink://docs/...` for any other product semantics or workflow context that is missing from OpenAPI.
6. Implement against the verified contract. Preserve Wink field names unless the host codebase already uses a deliberate translation layer.
7. Add or update narrow tests that assert request shape, response parsing, and status handling.
8. Deliver with the selected API and operation, auth setup, any remaining assumptions, and any mismatch between the code and the current MCP contract.

## Defaults

- Prefer `api_search` over browsing raw specs.
- Prefer request and response resources over inferring payloads from memory.
- Prefer small typed request and response models over loose dictionaries.
- Prefer docs for product semantics and API MCP resources for contract details.
- Prefer `wink://docs/developers/authentication.mdx` for auth setup instead of inferring token flow from security scheme names alone.

## Gotchas

- Search may return multiple plausible operations. Compare them before choosing one.
- Existing code can be stale relative to the live MCP contract. Call out the mismatch directly.
- Product behavior may live in docs even when request and response structure lives in OpenAPI.
- Authentication setup lives in docs as well as the spec. Do not stop at `oauth2` or `Bearer` labels without opening the auth guide.
- If the Wink MCP is unavailable or the contract cannot be verified, stop and report that blocker instead of guessing.

## Validation Loop

1. Make the smallest code change that matches the verified contract.
2. Run local tests or validators if they exist.
3. If live calls are not possible, re-check the implementation against the MCP resources before finalizing.
4. Only finalize once the selected operation, payload shape, and status handling are explicitly accounted for.

## Additional Resources

- For copy-ready invocations and expected response structure, see [references/examples.md](references/examples.md).
