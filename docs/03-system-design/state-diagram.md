# MarketStreet — State Transition Diagram

```mermaid
flowchart LR
    D["Draft<br/>user filling in the form<br/>form errors fixed here<br/>(BR-1 to BR-3)<br/>browser only · not saved"]
    S["Submitted<br/>transactionId assigned<br/>submittedAt recorded"]
    V["Validated<br/>trade type (BR-1)<br/>symbol (BR-2)<br/>quantity (BR-3)<br/>price (BR-6)<br/>cash (BR-4) or shares (BR-5)"]
    A["Accepted<br/>FINAL<br/>portfolio committed<br/>(BR-7)"]
    R["Rejected<br/>FINAL<br/>reason saved<br/>portfolio unchanged<br/>or restored (BR-8)"]

    D -- "user submits<br/>a valid form" --> S
    S -- "all checks pass<br/>(BR-1 to BR-6)" --> V
    S -- "validation fails<br/>(BR-1 to BR-6)" --> R
    V -- "commit succeeds<br/>(BR-7)" --> A
    V -- "update fails<br/>+ rollback (BR-8)" --> R

    classDef draft fill:#f6f8fa,stroke:#57606a,color:#24292f,stroke-width:2px,stroke-dasharray:6 4
    classDef submitted fill:#ddf4ff,stroke:#0969DA,color:#24292f,stroke-width:2px
    classDef validated fill:#fff8c5,stroke:#9a6700,color:#24292f,stroke-width:2px
    classDef accepted fill:#dafbe1,stroke:#1a7f37,color:#24292f,stroke-width:2px
    classDef rejected fill:#ffebe9,stroke:#cf222e,color:#24292f,stroke-width:2px
    class D draft
    class S submitted
    class V validated
    class A accepted
    class R rejected
```

## States

| State | Where it lives | Saved? | Final? |
|---|---|---|---|
| **Draft** | Browser (the user's unsent order form) | No — no record, no transactionId | No |
| **Submitted** | Application | Yes | No |
| **Validated** | Application | Yes | No |
| **Accepted** | Application | Yes | Yes |
| **Rejected** | Application | Yes, with the reason | Yes |

**Draft** has a dashed border because it exists only in the browser. Form errors (BR-1 to BR-3) keep the order in Draft until the user fixes them, so nothing is saved. Once the user submits, the application re-checks BR-1 to BR-3 (browser checks can be bypassed) and checks BR-4 to BR-6, which only the application can verify.

## Business rules on this diagram

| Rule | Meaning | Where it appears |
|---|---|---|
| BR-1 | Trade type must be Buy or Sell | Draft (browser check), Submitted → Validated / Rejected |
| BR-2 | Stock symbol must be recognized | Draft (browser check), Submitted → Validated / Rejected |
| BR-3 | Share quantity must be a positive whole number | Draft (browser check), Submitted → Validated / Rejected |
| BR-4 | Enough simulated cash for a Buy | Submitted → Validated / Rejected |
| BR-5 | Enough shares owned for a Sell | Submitted → Validated / Rejected |
| BR-6 | A valid stock price is required | Submitted → Validated / Rejected |
| BR-7 | Accepted trades update cash and holdings | Validated → Accepted |
| BR-8 | Rejected trades change nothing; a failed update is rolled back | Submitted / Validated → Rejected |

Rule numbers match [business-rules.md](../../docs/02-requirements/business-rules.md).
