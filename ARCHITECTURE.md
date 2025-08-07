# OpenMesh Architecture

## Overview

OpenMesh = Discovery layer + optional micropayments for MCP servers.

## Components

### 1. Edge SDKs (MCP + optional x402)
- `openmesh-fastapi` - Python wrapper (41% of market)
- `openmesh-express` - Node wrapper (32% of market)
- **Auto-exposes** `/tools/list` & `/tools/call` (MCP compliance)
- **Auto-generates** manifest.yaml on startup
- **Optional x402** - Just pass config object, or omit for free tools
- **Prompts publish** - Prints "openmesh publish" reminder

### 2. Registry (Discovery Core)
- Search API for finding MCP servers by capability
- Pricing/latency data for agent routing
- No payment enforcement - just metadata

### 3. CLI (Optional)
- `openmesh publish` - List on registry
- `openmesh search` - Find MCP servers
- `openmesh init --mcp` - Manual manifest (rarely needed)

## Implementation Strategy

### Phase 1: Discovery
```
Registry API
├── /search       # Find servers by capability
├── /servers      # CRUD operations
└── /stats        # Usage metrics
```

### Phase 2: SDK Wrappers
```python
# FastAPI: MCP compliance + optional x402
from openmesh_fastapi import MeshFastAPI, tool

app = MeshFastAPI(
    x402={"amount":"0.001","asset":"USDC"}  # Optional
)

@tool(description="My tool")
def my_tool(input: str):
    return {"result": "processed"}
```

```javascript
// Express: MCP compliance + optional x402
const { MeshExpress, tool } = require('openmesh-express')

const app = MeshExpress({
    x402: {amount: "0.001", asset: "USDC"}  // Optional
})

tool('my_tool', 'My tool', async (input) => {
    return {result: 'processed'}
})
```

### Phase 3: Network Effects
- SDK auto-prompts: "Run 'openmesh publish'"
- Every README links to registry
- Viral adoption loop

## Payment Architecture

**We don't handle money.** We just connect existing pieces:

```
Agent → MCP Server → x402 Middleware → Coinbase Facilitator
         ↓
    OpenMesh SDK
    (adds headers)
```

## Why This Works

1. **Minimal code** - ~300 LOC per SDK
2. **No custody risk** - Point to Coinbase
3. **Discovery first** - The real problem
4. **Existing momentum** - x402-express has adoption

## Not Building

- ❌ **Facilitator service** - Use Coinbase's reference implementation
- ❌ **Payment custody** - Never touch funds
- ❌ **Wallet management** - Client handles their own
- ❌ **On-chain verification** - Facilitator's job
- ❌ **Identity/KYC** - Not our problem

We connect existing tools, not build new financial infrastructure.