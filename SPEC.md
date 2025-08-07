# OpenMesh Manifest Specification

Simple YAML format for MCP server discovery.

## Minimal Example

```yaml
# manifest.yaml
version: "0.1"
id: "weather-api"
name: "Weather API"
description: "Real-time weather data"

mcp:
  transport: ["http"]
  endpoint: "https://api.example.com/mcp"
```

## With Pricing (Optional)

```yaml
version: "0.1"
id: "weather-api"
name: "Weather API"  
description: "Real-time weather data"

mcp:
  transport: ["http"]
  endpoint: "https://api.example.com/mcp"

pricing:
  model: "per_tool"      # or "free", "flat", "subscription"
  currency: "USD"
  default: 0.001         # $0.001 per call
  
  # Optional: Override per tool
  tools:
    get_forecast: 0.002
    get_alerts: 0.0005

payment:
  protocol: "x402"
  network: "base-sepolia"
  recipient: "0x742d35Cc..."
```

## Auto-Generated Fields

SDKs will auto-populate these from your MCP server:

```yaml
tools:
  - name: "get_weather"
    description: "Get current weather"
  - name: "get_forecast"
    description: "Get weather forecast"

stats:
  latency_ms: 120
  calls_total: 15234
  rating: 4.8
```

## Publishing to Registry

### Method 1: CLI
```bash
openmesh publish manifest.yaml
```

### Method 2: Direct API
```bash
curl -X POST https://registry.openmesh.dev/servers \
  -H "Content-Type: application/yaml" \
  --data-binary @manifest.yaml
```

### Method 3: SDK Auto-publish
```python
# SDKs call the same API for you
app = MeshFastAPI()  # Auto-generates and can publish
```

### What Registry Accepts
- Any valid manifest (YAML or JSON)
- From any source (SDK, CLI, direct POST, GitHub webhook)
- For any MCP server (regardless of language/framework)

The registry is **open to all** - not SDK-exclusive.

## Design Principles

1. **Start minimal** - Just ID, name, and MCP endpoint
2. **Pricing optional** - Free servers stay free
3. **Auto-discovery** - SDKs populate tool lists
4. **Registry enrichment** - Stats added server-side