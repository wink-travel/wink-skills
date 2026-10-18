---
name: wink-hotel-booking
description: Find and book hotels through Wink's Booking Engine MCP, showing quoted hotel cards and supporting guided or user-authorized autonomous booking.
license: Apache-2.0
metadata:
  version: "0.2.0"
  standard: "Agent Skills"
---

# Wink Hotel Booking

Use the connected Booking Engine MCP and live tool schemas. Production: `https://api.wink.travel/mcp/booking-engine`. Preserve the user's environment and use client-managed OAuth. Reference and Payment MCP servers are unnecessary.

MPP supports one room, adults only, in USD, using Stripe Shared Payment Tokens (SPTs). Tempo is coming soon. Search works without a wallet; preserve the requested occupancy.

## Find a room

- Resolve destination, dates and occupancy; apply the user's budget and preferences.
- Reuse a supplied customization, or use `managing_entity_list` followed by `customization_get_primary` or `customization_search`. Resolve ambiguous account choices; never invent identifiers.
- Resolve the destination with `destination_lookup_search_suggestions` and `destination_lookup_get`, then use `inventory_search_city` or `inventory_search_geo`. Paginate as needed.
- Load `property_inventory_get` for shortlisted hotels. Supply exactly one of `hotelIdentifier` or `urlName`. Keep hotel, guest-room and room-rate IDs distinct; retain the selected rate's inclusions, fees and cancellation terms.

## Quote and show

- Quote the selected rate with `agentic_booking_quote`, placing room details inside `request`. Quoting does not charge or confirm a booking.
- By default, show the quoted hotel card using `property_card_show` with `quoteId`, the search `userSession` and selected guest-room `roomIdentifier`. Honor requests to skip visuals; if rendering is unavailable, summarize in text.
- Use comparison cards when helpful or requested; choose which hotels to show based on the user's desired involvement. Use the card tool for photos instead of constructing Cloudinary URLs.
- Present the quoted USD stay total (`amountUsdCents / 100`), expiry and separately payable fees. Search prices and cards without `quoteId` are estimates. Keep card and quote itineraries consistent.

## Book and confirm

Let users choose from options or select and book autonomously when they delegate that authority. Check the itinerary, total cost including fees, cancellation terms and other criteria against their approval or stated limits. Ask only for missing essentials, material ambiguity or terms outside that authority. Showing the quote card need not pause an authorized autonomous booking. Browsing alone does not authorize payment.

Read [payment and recovery](references/payment.md) before obtaining an SPT or calling `agentic_booking_pay`.

Confirm success only from the server (`PAYMENT_SUCCEEDED` for the pay tool). Return the confirmation code, paid amount/currency and itinerary. For details or receipts, locate the booking using `booking_search` or `booking_search_list`, then call `booking_get` or `booking_receipt_get` with the actual booking ID.

For missing capabilities, consult the [booking guide](https://wink.travel/developers/agentic-payments/) or Wink Docs MCP rather than guessing calls.
