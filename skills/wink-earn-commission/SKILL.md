---
name: wink-earn-commission
description: Start earning hotel-booking commission with Wink affiliate links, curated offers and storefronts, with guided setup or user-authorized autonomous promotion.
license: Apache-2.0
metadata:
  version: "0.3.0"
  standard: "Agent Skills"
---

# Wink Earn Commission

Start earning commission through travel recommendations and attributable hotel bookings on Wink. Use connected Wink MCP tools and their live schemas. Preserve the selected environment and client-managed OAuth.

## MCP connections

Start with Studio Embeds for an existing affiliate account. Add other connections for the tasks below. These are production URLs; use the matching host for staging or local testing and keep all connections in the same environment.

| MCP             | Production URL                                    | When needed                                                                                                                                                                                 |
| --------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Studio Embeds   | https://api.wink.travel/mcp/studio/embeds         | **Essential for affiliate links.** Includes account, customization and hotel discovery, plus hotel, room and rate-plan links.                                                               |
| Distribution    | https://api.wink.travel/mcp/extranet/distribution | **Required for account creation through MCP** or direct supplier relationship requests. Existing accounts can create links without it; registration is also available in the web interface. |
| Studio Curation | https://api.wink.travel/mcp/studio/curation       | Optional — create curated collections, saved searches and ranked lists.                                                                                                                     |
| Link Manager    | https://api.wink.travel/mcp/link-manager          | Optional — build and manage a WinkLinks storefront.                                                                                                                                         |
| Analytics       | https://api.wink.travel/mcp/analytics             | **Optional, recommended** — measure attributed bookings, commission and offer performance.                                                                                                  |
| Payment         | https://api.wink.travel/mcp/payment               | Manage balances, payout destinations and withdrawals through MCP, or use the web interface.                                                                                                 |
| Settings        | https://api.wink.travel/mcp/settings              | Optional — edit account branding/settings or create and edit customizations. Reading existing accounts and customizations is included in Studio Embeds.                                     |
| Social          | https://api.wink.travel/mcp/social                | Optional — publish and schedule posts on connected social accounts when authorized.                                                                                                         |

Missing optional connections should not block basic link creation. Toolsets select available tools; account permissions still apply.

## Choose the account and objective

- Use `managing_entity_list` to discover accessible accounts. Reuse the selected affiliate account; clarify ambiguous account choices before creating assets. If a new account is needed, use the registration tools with real user-supplied details. Ask only for missing essentials.
- Load `customization_get_primary` or `customization_search` for the selected account. Authentication alone does not select an account or affiliate attribution.
- Follow the user's audience, destination, channels and commercial goals. Support comparison and guided choices, or act autonomously within delegated limits. Permission to create links does not by itself authorize publishing, outreach, ad spend or booking travellers.

## Create a useful offer

- Search eligible inventory with `studio_property_search_filtered`, or discover available suppliers through Distribution. Distinguish a discoverable hotel from an available rate and the account's right to sell it.
- Create hotel links with `transactional_url_create`, using the selected account's customization and real supplier identifier. For a room or rate-plan focus, first call `transactional_url_room_types`; a rate-plan focus also needs its matching room type.
- Choose collections, saved searches, maps or a storefront when they serve the audience better than individual links. Read [publishing options](references/publishing.md) when expanding beyond hotel links.
- Keep titles, descriptions and photos grounded in inventory. Prices require dates, occupancy and currency; do not describe an estimate as a guaranteed total or invent discounts, scarcity or commission rates.

## Publish as requested

Create drafts or publish to authorized channels according to the user's instructions. Existing standing authorization can cover repeat publishing; ask only when the next action exceeds it. Include appropriate affiliate disclosure in promotional content.

Keep attribution intact when embedding, shortening or syndicating. A generic shortened URL does not create a commission entitlement. External affiliate programs retain their own tracking and payout rules.

## Commission and payouts

- Users can earn before setting up payouts. Commission generally becomes available within 24 hours of check-in, subject to successful payment and [booking, cancellation and payout terms](https://wink.travel/portal/studio/payment-terms/).
- Use the Payment MCP or Wink web interface to view earnings, set up payout destinations and withdraw available funds. Payouts require a bank or supported Revolut account and any required verification.
- For requested withdrawals, use live available balances and fee quotes; verify the destination, currency and net payout. Withdraw only within the user's authorization.

## Verify and improve

- Read back created assets. If a write times out, check whether it succeeded before retrying; avoid duplicate accounts and links.
- Return the actual share URL. If the tool returns only an identifier, resolve it using the environment's documented short-link service. Verify the destination host, promoted hotel or collection, and account/link attribution before calling the link ready. Report wrong-host redirects instead of silently changing them.
- Report the account associated with the asset, its URL and environment, and anything still preventing publication or sale. Do not claim an asset was published because a draft exists.
- When Analytics is connected, compare attributed bookings and commission across offers. Distinguish clicks, estimates, confirmed earnings and withdrawable funds; respect the applicable booking, cancellation and payout terms.

For missing tools or current connection details, consult the [MCP guide](https://wink.travel/developers/mcp/). Verify commercial terms from the account's live hotel/channel settings and [Wink's affiliate guide](https://wink.travel/resources/hotel-affiliate-programs/).
