# OpenMesh Manifest Specification

Version: 0.1-draft  
Status: Request for Comments

## Overview

The OpenMesh manifest is a YAML file that registers Model Context Protocol (MCP) servers for discovery and monetization. It enables AI agents to find and pay for MCP tools without manual configuration.

## Manifest Format

```yaml
# manifest.yaml
version: "0.1"                    # Manifest spec version (required)
name: "code-analyzer-mcp"        # Unique identifier (required)
description: "AI-powered code analysis tools" # One-liner (required)

# MCP Configuration
mcp:
  server_url: "https://analyzer.example.com/mcp" # MCP endpoint (required)
  transport: "http"              # Transport: http | stdio | websocket
  version: "1.0.0"               # MCP server version

# Auto-discovered from MCP server (optional override)
tools:                           # List populated via MCP tools/list
  - name: "analyze_complexity"
    description: "Analyze code complexity"
    pricing: 0.001               # Override default pricing
  - name: "format_code"
    description: "Format code with AI"
    pricing: 0.0005

resources:                       # List populated via MCP resources/list
  - uri: "code://project/*"
    description: "Project code access"

# Payment configuration (optional)
pricing:
  model: "per_tool"              # Pricing model: per_tool | flat | subscription
  default: 0.001                 # Default price per tool call
  currency: "usdc"               # Currency: usdc | sol | eth
  
payment:
  rail: "x402"                   # Payment rail: x402 | stripe-402 | none
  address: "0xABC123..."         # Payment address
  chain: "base"                  # Chain: base | ethereum | solana

# Metadata
author: "alice@example.com"      # Contact (optional)
repository: "https://github.com/alice/code-analyzer" # Source (optional)
documentation: "https://docs.example.com" # Docs (optional)
license: "MIT"                   # License (optional)

# Performance hints (optional)
performance:
  latency_p50: 150              # Median latency in ms
  latency_p99: 400              # 99th percentile latency
  throughput: 500               # Requests per second
  regions: ["us-east", "eu-west"] # Available regions
```

## Field Definitions

### Required Fields

- **version**: Manifest specification version (currently "0.1")
- **name**: Unique identifier for the MCP server (lowercase, hyphens)
- **description**: One-line description for discovery
- **mcp.server_url**: HTTPS URL or local path to MCP server
- **mcp.transport**: How to connect (http, stdio, websocket)

### Auto-Discovery Fields

These fields are automatically populated by connecting to the MCP server:

- **tools**: List of available MCP tools with optional pricing overrides
- **resources**: List of MCP resources the server provides
- **mcp.version**: Detected from MCP server handshake

### Payment Fields (optional but recommended)

- **pricing.model**: How pricing works
  - `per_tool`: Each tool has individual pricing
  - `flat`: Same price for all tools
  - `subscription`: Monthly/yearly pricing
- **pricing.default**: Default price if not specified per-tool
- **payment.rail**: Payment protocol (x402 recommended)
- **payment.address**: Where payments go
- **payment.chain**: Blockchain for payments

## MCP-Specific Features

### Auto-Discovery

When running `openmesh init --mcp`, the CLI will:

1. Connect to your MCP server
2. Call `initialize` to get server metadata
3. Call `tools/list` to discover available tools
4. Call `resources/list` to find resources
5. Generate a manifest with all discovered capabilities

### Tool Pricing

```yaml
tools:
  - name: "simple_task"
    pricing: 0.0001              # Cheap operation
  - name: "complex_analysis"
    pricing: 0.01                # Expensive operation
  - name: "free_tool"
    # No pricing = uses default or free
```

## Examples

### Minimal Free MCP Server

```yaml
version: "0.1"
name: "open-tools-mcp"
description: "Free MCP tools for everyone"
mcp:
  server_url: "https://tools.example.com/mcp"
  transport: "http"
# No payment section = free to use
```

### Production MCP Server with Payments

```yaml
version: "0.1"
name: "pro-analyzer-mcp"
description: "Professional code analysis via MCP"
mcp:
  server_url: "https://analyzer.pro/mcp"
  transport: "http"
  
pricing:
  model: "per_tool"
  default: 0.001
  currency: "usdc"

payment:
  rail: "x402"
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f7E8e"
  chain: "base"

performance:
  latency_p50: 100
  latency_p99: 250
  regions: ["us-east-1", "eu-central-1", "ap-southeast-1"]
```

### Local MCP Server

```yaml
version: "0.1"
name: "local-dev-tools"
description: "Local development MCP server"
mcp:
  server_url: "stdio://./mcp-server"
  transport: "stdio"
# Local servers can still charge if desired
pricing:
  model: "flat"
  default: 0.0001
  currency: "usdc"
```

## Validation Rules

1. `name` must be globally unique in the registry
2. `mcp.server_url` must be reachable
3. MCP server must respond to standard MCP calls
4. If `pricing` is specified, payment fields are required
5. Tool names must match actual MCP server tools

## Discovery

MCP servers are indexed by:

- Tool names and descriptions
- Resource URIs and types
- Price ranges
- Geographic regions
- Performance characteristics

Example queries:
- "Find code formatting tools under $0.001"
- "Find image processing MCP servers in EU"
- "Find free documentation tools"

## Migration from Generic API

For existing non-MCP services, wrap them in an MCP server:

```bash
# Use OpenMesh MCP wrapper (future feature)
openmesh wrap-api ./openapi.json --output ./mcp-server

# Or use official MCP SDK to build a server
npm create @modelcontextprotocol/server@latest
```

## Security Considerations

- MCP servers must use HTTPS in production
- Payment addresses are verified on-chain
- Tool execution requires valid payment proof
- Rate limiting applies per tool per user

## Future Extensions

- Tool composition workflows
- Batch pricing for multiple calls
- Resource access permissions
- MCP server federation
- Performance SLAs

## Contributing

This specification is in draft. Please open issues for:

- MCP integration challenges
- Payment model suggestions
- Discovery improvements
- Security considerations

Repository: https://github.com/sculptdotfun/openmesh