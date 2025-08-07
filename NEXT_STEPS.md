# Next Steps for OpenMesh

Based on field report: Focus on discovery first, payments later.

## Immediate Actions

### 1. Build Minimal Registry API
```bash
# Simple Express server with file-based storage
registry/
├── server.js         # Express API
├── data/
│   └── servers.json  # Start with JSON file
└── package.json
```

**Endpoints needed:**
- `POST /servers` - Submit manifest
- `GET /servers` - List all
- `GET /search?q=weather` - Search by keyword
- `GET /servers/:id` - Get specific server

**Why:** Can't test SDKs without somewhere to publish to.

### 2. Create FastAPI Wrapper (41% of market)
```python
# openmesh-fastapi/openmesh.py
class OpenMeshMCP:
    def __init__(self, app, name, description):
        # Add MCP routes to FastAPI app
        # Generate manifest.yaml
        
    def tool(self, price_usd=None):
        # Decorator for tools
        # Optionally add x402 headers
```

**Re-use:** 
- `fastmcp` or `fastapi-mcp` for MCP protocol
- `1shot-x402` for payments

### 3. Create Express Wrapper (32% of market)
```javascript
// openmesh-express/index.js
class OpenMeshMCP {
  constructor(app, config) {
    // Add MCP routes
    // Generate manifest
  }
  
  tool(name, { priceUSD, handler }) {
    // Register tool
    // Use x402-express if price set
  }
}
```

**Re-use:**
- `express-mcp-handler` for MCP
- `x402-express` (848 weekly downloads)

## Next Phase

### 4. Basic CLI
Just three commands to start:
```bash
openmesh init      # Interactive manifest generator
openmesh publish   # POST to registry
openmesh search    # Query registry
```

### 5. Discovery in SDKs
```python
# Add to FastAPI SDK
servers = openmesh.discover("weather")
# Returns list of weather MCP servers with pricing
```

### 6. Test with Real MCP Servers
- Find existing MCP servers on Glama
- Add OpenMesh wrapper
- Publish to our registry
- Verify discovery works

## Decision Points

### Registry Hosting
**Options:**
1. GitHub Pages + GitHub API (free, simple)
2. Vercel + Postgres (free tier)
3. Dedicated VPS ($5/month)

**Recommendation:** Start with GitHub - PRs to add servers.

### Payment Facilitator
**Options:**
1. Point to Coinbase (no compliance burden)
2. Build our own (0.5-2% revenue)

**Recommendation:** Use Coinbase until >$10k/month volume.

### SDK Distribution
**Options:**
1. PyPI + npm (standard)
2. GitHub packages
3. Direct downloads

**Recommendation:** PyPI + npm for discoverability.

## Success Metrics

First milestone:
- [ ] Registry API responds to POST/GET
- [ ] One SDK can generate manifest
- [ ] Manual test of publish flow

Second milestone:
- [ ] Both SDKs functional
- [ ] 5 example servers in registry
- [ ] Basic search works

Third milestone:
- [ ] 20+ servers in registry
- [ ] First external contributor
- [ ] x402 payment flow tested

## Blockers to Address

1. **Where to host registry?** 
   - Start with GitHub Pages + Actions

2. **How to verify MCP servers?**
   - Ping endpoint on publish
   - Daily health checks

3. **How to handle discovery without central registry?**
   - Consider federation later
   - Start centralized

## Resources Needed

- [ ] Domain for registry (openmesh.dev?)
- [ ] GitHub org or repo for registry data
- [ ] Test wallet for x402 testing
- [ ] 2-3 example MCP servers to wrap

## Skip For Now

- ❌ Complex authentication
- ❌ Our own payment facilitator  
- ❌ Fancy UI (JSON API only)
- ❌ Analytics/monitoring
- ❌ Multiple language SDKs (just Python + JS)

**Focus:** Get discovery working. Everything else is optional.