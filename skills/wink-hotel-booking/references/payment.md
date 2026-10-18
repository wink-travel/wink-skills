# MPP payment and recovery

Keep quote and payment under the same Wink user and environment. Wink OAuth and wallet authorization are separate.

## Pay

1. Verify the unexpired quote against the specifically approved stay or delegated booking limits. If it expires before payment, requote and recheck; seek approval only for terms outside existing authority.
2. Select the `stripe` challenge from `mppChallenges`. Obtain an SPT from the connected wallet using its merchant/network identity, amount, currency and expiry. Honor wallet-required approvals. Never collect card numbers or expose credentials in chat or logs.
3. Call `agentic_booking_pay` with `request.quoteId` and `request.spt`. Retain both securely for recovery; submit only one credential.

Without a compatible wallet, continue selection and explain what is needed to pay. Do not substitute another checkout flow without authorization.

## Results and retries

- `PAYMENT_SUCCEEDED`: return `bookingConfirmationCode`; retain `chargeReference`.
- `DECLINED`: the quote is terminal. Any authorized retry needs a fresh quote checked against existing authority.
- `IN_PROGRESS`, timeout, lost response or server error after submission: wait briefly, then retry the **same quote and SPT**. Never create another payment while the outcome is unknown.

Make at most two recovery retries, honoring any retry delay. If unresolved, stop and provide the quote ID for support. Expiry or `already-consumed` does not prove payment failed. Successful identical retries return the existing booking.

For `agentic_booking_book`, follow the [standard binding](https://wink.travel/developers/agentic-payments/#payment-aware-mcp-clients) with the same authority and recovery rules. Recover through that binding; do not switch to quote/pay. Both `payment-in-progress` and `already-consumed` indicate unresolved outcomes.

## Access

Use client-managed sign-in with `mcp.read`, `marketing.read` for customization access, and `payment.write` to pay. Account access to the customization is also required. Never request tokens in chat.
