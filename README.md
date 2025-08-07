# OpenMesh

The discovery layer (and optional micropay-per-call layer) for Model Context Protocol (MCP) servers.

## Mission

Become the global search and instant connect layer for MCP servers, with optional x402 micropayments. Help agents find tools, help builders earn USDC per call without managing API keys.

**The Problem:** 90%+ of MCP servers are undiscoverable. 92% go unused. Builders earn $0.

## The Opportunity

**7,925 MCP servers** exist today (per Glama directory, Aug 2025). But:
- **No unified discovery** - agents can't find the right tools
- **<10% have payments** - builders can't monetize easily
- **80% use two stacks** - FastAPI (41%) and Express (32%)

OpenMesh solves this with thin wrappers that reach 80% of servers with ~300 LOC each.

## Quick Start

### For FastAPI Developers (41% of MCP servers)
```python
pip install openmesh-fastapi
# One decorator transforms your MCP server
# Auto-generates manifest.yaml
# Optional x402 in one line
```

### For Express Developers (32% of MCP servers)  
```javascript
npm install openmesh-express
// Middleware drop-in for any Express app
// Auto-discovery and manifest generation
// x402-express integration built-in
```

### For Everyone
```bash
npx openmesh init      # Generate manifest
npx openmesh publish   # List on registry
npx openmesh search    # Find MCP tools
```

## Current MCP Landscape (Aug 2025)

| Stack | Observable Signals | % of ~7,900 servers | Our Approach |
|-------|-------------------|---------------------|-------------|
| Python + FastAPI | fastapi-mcp, fastmcp | 41% (3,249) | `openmesh-fastapi` wrapper |
| Node/Express | express-mcp-handler | 32% (2,565) | `openmesh-express` wrapper |
| Go + Gin | gin-mcp | 7% (553) | Future SDK |
| Rust + Axum | rust-sdk | 5% (395) | Future SDK |
| .NET | dotnet new mcpserver | 4% (316) | Future SDK |
| Managed/Dedicated | Azure, Cloudflare | 6% (474) | Direct integration |

**Key insight**: Two thin wrappers reach 73% of all MCP servers.

## x402 Payment State

- **x402-express**: 848 weekly downloads on npm
- **Facilitator**: Coinbase hosts the reference implementation
- **Adoption**: <10% of servers have payment headers
- **Our role**: Connect existing libraries, not build new ones

## Implementation Roadmap

### Phase 1: Discovery Core (Current)
- **Manifest spec** - Define server metadata format
- **Registry API/UI** - Search and filter MCP servers
- **CLI** - `init`, `publish`, `search` commands

### Phase 2: Starter SDKs (Next)
- **openmesh-fastapi** - Re-export existing MCP/x402 libs
- **openmesh-express** - Thin wrapper around x402-express
- **Auto-manifest** - SDKs generate manifest.yaml

### Phase 3: Network Effects
- **Registry flywheel** - Every SDK prompts "publish to OpenMesh"
- **Built-in marketing** - READMEs link back to registry
- **Price routing** - Agents choose by cost/latency

### Phase 4: Scale (Future)
- Performance optimization
- Additional language SDKs
- Advanced search features

## Why This Approach Wins

1. **Minimal surface area** - Two SDKs cover 73% of servers (~300 LOC each)
2. **No payment risk** - We don't custody funds
3. **Existing momentum** - x402 libraries already have adoption (848 weekly downloads)
4. **Discovery first** - 90%+ of servers are undiscoverable today
5. **Developer habit** - Auto-manifest + "publish" prompt = viral loop

## Specification

See [SPEC.md](SPEC.md) for the complete manifest format.

## Next Engineering Steps

1. **Design manifest schema** with optional pricing block (amount, asset, network, recipient)
2. **Build two reference SDKs** that re-use existing libraries:
   - FastAPI: Use existing DI hooks + fastmcp
   - Express: Wrap x402-express middleware
3. **Publish pricing/latency** in search API for agent routing
4. **Defer facilitator** until volume data justifies it

## Contributing

Focus areas based on field report:
- **FastAPI/Express wrappers** - The 80/20 that reaches most servers
- **Registry design** - How to aggregate existing directories?
- **Price discovery** - Help agents route by cost
- **Integration examples** - Show real MCP servers using OpenMesh

## Philosophy

- **MCP-native**: Built on Anthropic's Model Context Protocol
- **Open by default**: Apache-2 spec, MIT CLI, CC-BY registry data
- **No lock-in**: Your MCP server, your rules
- **Payments optional**: Free tools stay free, paid tools get rails
- **Agent-first**: Built for AI, not humans


## License

- Specification: Apache-2.0
- CLI (when built): MIT
- Registry data: CC-BY

---

*An open experiment from [SCULPT](https://sculpt.fun)*  
*Making coordination costs approach zero*