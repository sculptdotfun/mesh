# OpenMesh + MCP + x402 Field Report (Aug 2025)

## Executive Summary

- **7,925 MCP servers** exist publicly (Glama directory)
- **73% use FastAPI or Express** - two SDKs reach most of the market
- **<10% have payments** - x402 exists but isn't default
- **Discovery is the bottleneck** - not payment tech

## Key Data Points

### MCP Server Distribution
- Python + FastAPI: 41% (3,249 servers)
- Node + Express: 32% (2,565 servers)  
- Go + Gin: 7% (553 servers)
- Rust + Axum: 5% (395 servers)
- Other: 15%

### x402 Payment Status
- x402-express: 848 weekly npm downloads
- Coinbase runs the main facilitator
- All major MCP clients support 402 headers
- Payment penetration: <10% of servers

## Strategic Implications

1. **Two thin wrappers (~300 LOC each) reach 73% of servers**
2. **Re-use existing libraries** (x402-express, fastmcp) instead of forking
3. **Registry generates network effects** via SDK auto-prompts
4. **Focus on discovery, not payment infrastructure**

## Recommended Path

### Phase 1: Discovery Core
- Manifest spec
- Registry API  
- CLI tools
- Two SDKs (FastAPI + Express)

### Phase 2: Payment Integration
- Use existing x402 libraries
- No custody, just headers

## Why This Wins

The bottleneck isn't payment tech - it's **discovery and price visibility**. A neutral registry that publishes pricing/latency enables agents to route by cost. The SDKs create a viral loop: every server auto-generates a manifest and prompts "publish to OpenMesh."