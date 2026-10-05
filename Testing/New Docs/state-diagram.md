flowchart LR
    S["Submitted<br/>transactionId assigned<br/>submittedAt recorded"]
    V["Validated<br/>symbol, trade type, quantity<br/>price, cash/shares verified"]
    A["Accepted<br/>FINAL<br/>portfolio committed"]
    R["Rejected<br/>FINAL<br/>reason saved<br/>portfolio unchanged or restored"]

    S -- "all checks pass" --> V
    S -- "validation fails" --> R
    V -- "commit succeeds" --> A
    V -- "update fails + rollback" --> R
