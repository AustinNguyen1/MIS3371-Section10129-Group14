stateDiagram-v2
[*] --> Submitted: Order received

    Submitted --> Validated: Symbol, Buy/Sell, quantity,<br/>price, and cash/shares valid
    Submitted --> Rejected: Validation or price check fails

    Validated --> Accepted: Portfolio + transaction commit succeeds
    Validated --> Rejected: Update fails → rollback

    Accepted --> [*]
    Rejected --> [*]

    note right of Submitted
      transactionId assigned
      submittedAt recorded
      official record exists
    end note

    note right of Validated
      executionPrice known
      transactionValue calculated
      cash / shares verified
    end note

    note right of Accepted
      FINAL
      completedAt recorded
      cash / holdings committed
    end note

    note right of Rejected
      FINAL
      rejectionReason recorded
      portfolio unchanged or restored
      corrected order = new transaction
    end note
