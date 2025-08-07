# OpenMesh Architecture

## Overview

OpenMesh = Discovery layer + optional micropayments for MCP servers.

## Components

### 1. Registry (Discovery Core)
- Search API for finding MCP servers by capability
- Pricing/latency data for agent routing
- No payment enforcement - just metadata

### 2. SDKs (73% Market Coverage)
- `openmesh-fastapi` - Wrapper for Python servers (41% of market)
- `openmesh-express` - Wrapper for Node servers (32% of market)
- Auto-generates manifest.yaml
- Re-uses existing x402 libraries

### 3. CLI
- `openmesh init` - Generate manifest
- `openmesh publish` - List on registry
- `openmesh search` - Find MCP servers

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
# FastAPI: One decorator
@mcp.tool(price_usd=0.001)
async def my_tool():
    pass
```

```javascript
// Express: Middleware
mcp.tool('my_tool', {
  priceUSD: 0.001,
  handler: async () => {}
});
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

## Not Building (Yet)

- ❌ Our own facilitator service
- ❌ Wallet management
- ❌ On-chain verification
- ❌ KYC/AML compliance

Start simple. Add complexity only when volume justifies it.