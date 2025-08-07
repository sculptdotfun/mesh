# Changelog

## v0.0.1 (Current) - Specification Only

**⚠️ No implementation yet** - This is a design document and roadmap.

### Proposed Features (Not Built)
- **Language-specific SDKs** that handle MCP compliance automatically
  - `openmesh-fastapi` for Python/FastAPI (41% of MCP servers)
  - `openmesh-express` for Node/Express (32% of MCP servers)
- **Auto-MCP compliance** - SDKs expose `/tools/list` and `/tools/call` 
- **Auto-manifest generation** - SDKs write `manifest.yaml` on startup
- **Optional x402 toggle** - Pass config for payments, omit for free tools
- **Console prompts** - SDKs print "openmesh publish" reminder

### Changed
- **CLI now optional** - Most devs won't need `openmesh init --mcp`
- **SDK-first approach** - Install SDK, add decorator/middleware, done
- **Simplified onboarding** - From 3 steps to 1 line of code

### Technical Details
- SDKs auto-discover tools via decorators/function registration
- MCP endpoints follow Anthropic's Model Context Protocol spec
- x402 headers only added when config provided
- Manifest includes tool descriptions, pricing (if configured)

### Examples
- `01-basic-mesh-fastapi/` - Python sentiment analyzer with x402 toggle
- `02-basic-mesh-express/` - Node translation service with x402 toggle

### Not Yet Implemented
- Registry API (publishing target)
- Tool discovery from registry
- Health monitoring
- Analytics

---

## Roadmap

### v0.2
- Working registry with search
- SDK discovery methods (`MeshFastAPI.search()`)
- Basic health checks

### v0.3
- Additional language SDKs (Go, Rust)
- Performance metrics
- Advanced search filters

### v0.4
- Federation support
- Multi-registry aggregation
- Tool composition