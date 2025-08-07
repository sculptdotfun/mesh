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

## Registry Publishing

```bash
# Generate manifest
openmesh init

# Publish to registry
openmesh publish

# Registry adds metadata
published_at: "2025-01-07T12:00:00Z"
publisher: "alice@example.com"
verified: true
```

## Design Principles

1. **Start minimal** - Just ID, name, and MCP endpoint
2. **Pricing optional** - Free servers stay free
3. **Auto-discovery** - SDKs populate tool lists
4. **Registry enrichment** - Stats added server-side