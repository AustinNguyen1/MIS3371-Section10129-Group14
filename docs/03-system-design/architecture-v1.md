# MarketStreet - Three-Tier Architecture

**Presentation collects and displays. Application logic validates and decides. Data stores the official records.**

```mermaid
flowchart TB
    subgraph PRESENTATION["TIER 1 - PRESENTATION / BROWSER"]
        UI["`**Collect**
Stock symbol · Buy or Sell
Share quantity · Order type

**Display**
Price · Errors · Trade result
Portfolio · History`"]
    end

    subgraph APPLICATION["TIER 2 - APPLICATION LOGIC / BACKEND"]
        APP["`**Validate**
Account access · Trade input
Price · Cash · Shares

**Process**
Execution price · Trade value

**Create**
ID · Official status · Timestamps`"]
    end

    subgraph DATA["TIER 3 - DATA / DATABASE"]
        DB[("`**Store account data**
Accounts · Cash · Holdings

**Store trade records**
ID · Input · Execution values
Status · Reason · Timestamps`")]
    end

    PRICE["`**Price source**
Simulated stock prices
Fixture or market data provider`"]

    UI -- "Trade request" --> APP
    APP -- "Saved result" --> UI
    APP -- "Read records / save trade" --> DB
    DB -- "Records / save confirmation" --> APP
    APP -. "Look up symbol" .-> PRICE
    PRICE -. "Price or unavailable" .-> APP

    classDef presentation fill:#d9eaf7,stroke:#0969da,color:#24292f,stroke-width:2px
    classDef application fill:#e5e0ec,stroke:#8250df,color:#24292f,stroke-width:2px
    classDef data fill:#e2f0d9,stroke:#1a7f37,color:#24292f,stroke-width:2px
    classDef dependency fill:#f6f8fa,stroke:#57606a,color:#24292f,stroke-dasharray:5 5
    class UI presentation
    class APP application
    class DB data
    class PRICE dependency
```

Only the application accesses the database. The price source supplies the application with prices; it is a dependency outside the three tier boxes.

**Implementation status:** This is the proposed architecture. The [current prototype](../../Testing/Trade-UI/trade-ui.js) runs in the browser; the backend and persistent database are planned.

Details: [Trade workflow](workflow-v1.md) · [Data dictionary](data-dictionary.md) · [Trade states](state-diagram.md) · [Responsibility notes](short-responsibility-notes.md).
