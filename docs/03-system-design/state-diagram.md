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

## Exception / Failure Paths

The following paths show how MarketStreet handles errors that interrupt the normal transaction flow. Exception 1 occurs before a transaction record exists. Exceptions 2 and 3 occur after submission and result in the transaction entering the **Rejected** state.

```mermaid
flowchart LR
    E1(("Exception<br/>1"))
    I1["Invalid Input"]
    O1["Display error<br/>message to user"]

    E2(("Exception<br/>2"))
    I2["Business Rule<br/>Validation Failure"]
    O2["Set status to Rejected<br/>cash and holdings<br/>remain unchanged"]

    E3(("Exception<br/>3"))
    I3["Portfolio Update<br/>Failure"]
    O3["Set status to Rejected<br/>cash and holdings return<br/>to previous values"]

    E1 --> I1 --> O1
    E2 --> I2 --> O2
    E3 --> I3 --> O3

    classDef exception fill:#246b8e,stroke:#16445b,color:#ffffff,stroke-width:1.5px
    classDef failure fill:#f2a47f,stroke:#f06b27,color:#111111,stroke-width:1.5px

    class E1,E2,E3 exception
    class I1,I2,I3,O1,O2,O3 failure

    linkStyle default stroke:#c94f27,stroke-width:3px
```

| Exception | Happens at | Trigger | Result |
|---|---|---|---|
| **Exception 1 — Invalid Input** | **Draft** | The user enters invalid form data, such as an invalid trade type, stock symbol, or quantity (BR-1 to BR-3). | Display an error message. The order remains in **Draft** and nothing is saved. |
| **Exception 2 — Business Rule Validation Failure** | **Submitted → Rejected** | The application rejects the submitted trade during validation (BR-1 to BR-6), such as insufficient cash, insufficient shares, or an invalid stock price. | Set the transaction status to **Rejected**. Cash and holdings remain unchanged. |
| **Exception 3 — Portfolio Update Failure** | **Validated → Rejected** | An error occurs while committing the validated trade to the portfolio (BR-7 / BR-8). | Roll back the attempted update, set the transaction status to **Rejected**, and restore cash and holdings to their previous values. |

## States

| State | Where it lives | Saved? | Final? |
|---|---|---|---|
| **Draft** | Browser (the user's unsent order form) | No — no record, no transactionId | No |
| **Submitted** | Application | Yes | No |
| **Validated** | Application | Yes | No |
| **Accepted** | Application | Yes | Yes |
| **Rejected** | Application | Yes, with the reason | Yes |

**Draft** has a dashed border because it exists only in the browser. Form errors (BR-1 to BR-3) keep the order in Draft until the user fixes them, so nothing is saved. Once the user submits, the application re-checks BR-1 to BR-3 because browser checks can be bypassed, and checks BR-4 to BR-6, which require application data.

## Business Rules on this Diagram

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