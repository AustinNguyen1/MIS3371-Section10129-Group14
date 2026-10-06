# Tier Responsibility Summary

Each row assigns work to the tiers shown in the [architecture diagram](architecture-v1.md).

| Responsibility | Presentation: browser | Application logic: backend | Data: database |
|---|---|---|---|
| Trade inputs and feedback | Collect fields; explain form errors | Validate submitted fields again | Store submitted trade fields |
| Account identity and access | Display the authorized account | Derive `userId` from trusted context; authorize access | Store account relationships |
| Cash and holdings | Display returned values | Check eligibility; calculate changes | Read stored values; commit changes |
| Stock price and trade value | Display estimates and execution values | Obtain a valid price; calculate official value | Store accepted execution values |
| Transaction ID | Display returned ID | Generate once for the received trade | Enforce uniqueness; persist ID |
| Status and rejection reason | Display saved outcome and reason | Control transitions; explain rejection | Persist status and reason |
| Audit timestamps | Display returned timestamps | Generate trusted event timestamps | Persist timestamps |
| Accepted trade | Confirm after a confirmed commit | Coordinate cash, shares, and Accepted record | Commit related changes together |
| Rejected trade | Display saved reason | Reject invalid trades; coordinate rollback after a known update failure | Preserve portfolio; persist rejection after rollback |
| Transaction history | Request and display history | Authorize read access; return saved trades | Read official trade records |

Details: [Trade workflow](workflow-v1.md) · [Field definitions](data-dictionary.md).
