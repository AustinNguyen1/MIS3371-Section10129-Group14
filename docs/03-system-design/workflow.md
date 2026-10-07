# MarketStreet — Stock Trade Order Workflow

**Main transaction:** User submits a simulated stock trade order.

```mermaid
flowchart TB
    subgraph PRESENTATION["Presentation Layer · User Interface"]
        direction TB
        START(["Start"])
        STOCK["`User selects a stock
(symbol)`"]
        TYPE["`User selects trade type
(Buy or Sell)`"]
        QUANTITY["User enters quantity"]
        SUBMIT["User submits order"]
        FIELDS{"`All required fields
completed correctly?`"}
        ERROR["`Display error
message to user`"]
        RETURN["`Return to order entry
(for user to correct)`"]
        CONFIRM["`Display confirmation
message to user`"]
        FINISH(["End"])
    end

    subgraph APPLICATION["Application Layer · Business Logic and Processing"]
        direction TB
        RECEIVE["`Application
receives order`"]
        SUBMITTED["`Set status =
Submitted`"]
        INPUT{"`Type, symbol,
and quantity valid?
(BR-1, BR-2, BR-3)`"}
        PRICE{"`Valid price
available?
(BR-6)`"}
        FUNDS{"`Enough cash
or shares?
(BR-4, BR-5)`"}
        VALIDATED["`Set status =
Validated`"]
        UPDATE["`Update cash
and holdings
(BR-7)`"]
        SUCCESS{"`Did the update
succeed?`"}
        ACCEPTED["`Set status =
Accepted`"]
        REJECTED["`Set status to Rejected
Record reason
Cash and holdings remain unchanged
(BR-8)`"]
        ROLLBACK["`Roll back update; set status to Rejected
Record reason
Cash and holdings return to previous values
(BR-8)`"]
        SEND["Send confirmation to UI"]
    end

    subgraph DATA["Data Layer · Database"]
        direction TB
        SAVE_SUBMITTED["`Save transaction record
(Status = Submitted)`"]
        SAVE_ACCOUNT["`Update account
cash / holdings`"]
        SAVE_REJECTED["`Save rejected transaction
record (including reason)`"]
        SAVE_ACCEPTED["`Save accepted
transaction record`"]
    end

    START --> STOCK
    STOCK --> TYPE
    TYPE --> QUANTITY
    QUANTITY --> SUBMIT
    SUBMIT --> FIELDS
    FIELDS -- "Yes" --> RECEIVE
    RECEIVE --> SUBMITTED
    SUBMITTED --> INPUT
    INPUT -- "Yes" --> PRICE
    PRICE -- "Yes" --> FUNDS
    FUNDS -- "Yes" --> VALIDATED
    VALIDATED --> UPDATE
    UPDATE --> SUCCESS
    SUCCESS -- "Yes" --> ACCEPTED
    ACCEPTED --> SAVE_ACCEPTED
    SAVE_ACCEPTED --> SEND
    SEND --> CONFIRM
    CONFIRM --> FINISH

    FIELDS -- "No" --> ERROR
    ERROR --> RETURN
    RETURN --> STOCK
    INPUT -- "No" --> REJECTED
    PRICE -- "No" --> REJECTED
    FUNDS -- "No" --> REJECTED
    REJECTED --> ERROR
    REJECTED --> SAVE_REJECTED
    SUCCESS -- "No" --> ROLLBACK
    ROLLBACK --> ERROR
    ROLLBACK --> SAVE_REJECTED

    SUBMITTED -.-> SAVE_SUBMITTED
    UPDATE -.-> SAVE_ACCOUNT

    classDef terminal fill:#075ca6,stroke:#075ca6,color:#ffffff,stroke-width:2px
    classDef presentationData fill:#bddafa,stroke:#316498,color:#111111,stroke-width:1.5px
    classDef application fill:#c6e8b5,stroke:#3d7136,color:#111111,stroke-width:1.5px
    classDef decision fill:#c6e8b5,stroke:#3d7136,color:#111111,stroke-width:1.5px
    classDef error fill:#ffcaca,stroke:#dc5252,color:#111111,stroke-width:1.5px
    class START,FINISH terminal
    class STOCK,TYPE,QUANTITY,SUBMIT,RETURN,CONFIRM,SAVE_SUBMITTED,SAVE_ACCOUNT,SAVE_REJECTED,SAVE_ACCEPTED presentationData
    class RECEIVE,SUBMITTED,VALIDATED,UPDATE,ACCEPTED,SEND application
    class FIELDS,INPUT,PRICE,FUNDS,SUCCESS decision
    class ERROR,REJECTED,ROLLBACK error

    linkStyle 18,19,20,21,22,23,24,25,26,27,28 stroke:#dc5252,color:#dc5252,stroke-width:2px
    linkStyle 29,30 stroke:#0969da,color:#0969da,stroke-width:2px

    %% Cash, holdings, and the Accepted record must commit together.
    %% Confirmation follows the confirmed save; uncertain storage outcomes require verification before retrying.
    %% Accepted is controlled by the application; database nodes persist the records.
```

## Legend

| Shape / Line | Meaning |
|---|---|
| Dark blue rounded box | Start / End |
| Blue rectangle | Presentation or Data process / action |
| Green rectangle | Application process / action |
| Green diamond | Decision |
| Solid arrow | Normal flow |
| Red arrow | Rejection / error flow |
| Blue dashed arrow | Database write |

## Business Rules

| Rule | Meaning |
|---|---|
| BR-1 | Trade type is Buy or Sell. |
| BR-2 | Stock symbol is recognized. |
| BR-3 | Quantity is a positive whole number. |
| BR-4 | Buy orders have enough cash to cover the trade. |
| BR-5 | Sell orders have enough shares owned. |
| BR-6 | A valid stock price is available. |
| BR-7 | Accepted trades update cash and holdings. |
| BR-8 | Rejected trades leave cash and holdings unchanged; failed updates are rolled back to previous values. |

**Save rule:** Cash, holdings, and the Accepted record are committed together before confirmation is shown.

Details: [Business rules](../02-requirements/business-rules.md) · [Trade states and exception paths](state-diagram.md) · [Three-tier architecture](architecture.md) · [Data dictionary](data-dictionary.md).
