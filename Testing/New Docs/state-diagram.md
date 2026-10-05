flowchart LR
    S["Submitted<br/><small>transactionId assigned<br/>submittedAt recorded</small>"]

    V["Validated<br/><small>symbol • Buy/Sell • quantity<br/>price • cash/shares verified</small>"]

    A["Accepted<br/><small>FINAL<br/>portfolio committed</small>"]

    R["Rejected<br/><small>FINAL<br/>reason saved<br/>portfolio unchanged / restored</small>"]

    S -->|"all checks pass"| V
    S -->|"validation fails"| R
    V -->|"commit succeeds"| A
    V -->|"update fails + rollback"| R

    classDef submitted fill:#E8F0FE,stroke:#1A73E8,color:#202124,stroke-width:1.5px;
    classDef validated fill:#FEF7E0,stroke:#F9AB00,color:#202124,stroke-width:1.5px;
    classDef accepted fill:#E6F4EA,stroke:#188038,color:#202124,stroke-width:2px;
    classDef rejected fill:#FCE8E6,stroke:#D93025,color:#202124,stroke-width:2px;

    class S submitted;
    class V validated;
    class A accepted;
    class R rejected;
