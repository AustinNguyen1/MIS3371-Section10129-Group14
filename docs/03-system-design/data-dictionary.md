# MarketStreet — Data Dictionary

The data dictionary defines the fields used to submit, validate, execute, and record a simulated stock trade in MarketStreet.

## Core Transaction Fields

| Field | Business Meaning | Category | Type | Required? | Source | Rule / Constraint | Example |
|---|---|---|---|---|---|---|---|
| `transactionId` | Unique identifier for one submitted trade | System | string | Yes — system generated | Application | Generated once when the application receives a trade; must be unique and immutable | `TRD-00418` |
| `userId` | Identifies the user placing the trade | Derived / reference | string | Yes | Authenticated account/application | Must identify the account placing the trade; not trusted from browser input | `U10427` |
| `stockSymbol` | Stock being bought or sold | User | string | Yes | User | Must be a recognized stock symbol | `AAPL` |
| `tradeType` | Whether the user is buying or selling | User | enum | Yes | User | `Buy` or `Sell` only | `Buy` |
| `shareQuantity` | Number of shares requested | User | integer | Yes | User | Must be a positive whole number | `5` |
| `orderType` | Type of order selected on the form | User | enum | Yes | User | `Market` or `Limit`; current execution supports Market only and rejects Limit as unsupported | `Market` |
| `limitPrice` | Price entered for a Limit order | User | decimal | Conditional | User | Only relevant to Limit orders; not used for execution in the current workflow | `null` |
| `executionPrice` | Simulated price per share used for an accepted trade | Derived | decimal | If accepted | Application / market-data API | Must be a valid positive price | `185.50` |
| `transactionValue` | Total simulated value of an accepted trade | Derived | decimal | If accepted | Application | `shareQuantity × executionPrice` | `927.50` |
| `priceTimestamp` | Time associated with the market price used for validation/execution | Derived / audit | datetime | If price obtained | Market-data API | Used to verify that the market price is current enough for the trade | `2026-09-20T20:21:09Z` |
| `status` | Current official trade state | System | enum | Yes — system controlled | Application | `Submitted`, `Validated`, `Accepted`, or `Rejected`; only allowed state transitions may occur | `Accepted` |
| `rejectionReason` | Explanation of why a trade was rejected | System | string | If rejected | Application | Required when status is `Rejected` | `Insufficient cash` |
| `submittedAt` | Time the application received the trade | System / audit | datetime | Yes — system generated | Application | Set when the official trade record is created | `2026-09-20T20:21:08Z` |
| `validatedAt` | Time the trade passed validation | System / audit | datetime | If validated | Application | Set when status becomes `Validated` | `2026-09-20T20:21:09Z` |
| `completedAt` | Time the trade reached a final outcome | System / audit | datetime | If final | Application | Set when status becomes `Accepted` or `Rejected` | `2026-09-20T20:21:10Z` |
| `updatedAt` | Time the official trade record was last updated | System / audit | datetime | Yes — system generated | Application | Updated whenever the transaction record changes | `2026-09-20T20:21:10Z` |

Details: [Trade states](state-diagram.md) · [Trade processing and saves](workflow.md) · [Tier responsibilities](short-responsibility-notes.md).
