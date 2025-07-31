# OpenMesh Manifest Specification

Version: 0.1-draft  
Status: Request for Comments

## Overview

The OpenMesh manifest is a simple YAML file that makes any API discoverable and payable by autonomous agents. It bridges the gap between human-readable API docs and machine-readable service definitions.

## Manifest Format

```yaml
# manifest.yaml
version: "0.1"                    # Manifest spec version (required)
name: "face-blur-api"            # Unique identifier (required)
description: "Privacy-preserving image processing" # One-liner (required)

# Runtime configuration
runtime: "python-3.12"           # Runtime environment (required)
endpoint: "https://api.example.com" # Service URL (required)
health: "/health"                # Health check path (optional, default: /health)

# Capabilities (what this service can do)
capabilities:                    # List of capabilities (required)
  - name: "blur_faces"
    description: "Detect and blur faces in images"
    input_schema: "https://api.example.com/schemas/blur_faces.json"
  - name: "count_faces"
    description: "Count number of faces in image"
    input_schema: "https://api.example.com/schemas/count_faces.json"

# Payment configuration (optional)
pricing:
  model: "per_call"              # Pricing model: per_call | subscription
  amount: "0.001"                # Price per call
  currency: "usdc"               # Currency: usdc | sol | eth
  
payment:
  rail: "x402"                   # Payment rail: x402 | stripe-402 | none
  address: "0xABC123..."         # Payment address
  chain: "base"                  # Chain: base | ethereum | solana

# Metadata
author: "alice@example.com"      # Contact (optional)
repository: "https://github.com/alice/face-blur" # Source (optional)
documentation: "https://docs.example.com" # Docs (optional)
license: "MIT"                   # License (optional)

# Performance hints (optional)
performance:
  latency_p50: 100              # Median latency in ms
  latency_p99: 250              # 99th percentile latency
  throughput: 1000              # Requests per second
  regions: ["us-east", "eu-west"] # Available regions

# Requirements (optional)
requirements:
  compute: "gpu"                 # Special requirements: gpu | high-memory
  compliance: ["gdpr", "hipaa"]  # Compliance standards
```

## Field Definitions

### Required Fields

- **version**: Manifest specification version (currently "0.1")
- **name**: Unique identifier for the service (lowercase, hyphens)
- **description**: One-line description for discovery
- **runtime**: Execution environment (e.g., python-3.12, node-20, go-1.21)
- **endpoint**: HTTPS URL where the service is hosted
- **capabilities**: List of functions this service provides

### Payment Fields (optional but recommended)

- **pricing.model**: How the service charges (per_call or subscription)
- **pricing.amount**: Cost per call/month as a string
- **pricing.currency**: Payment currency (usdc, sol, eth)
- **payment.rail**: Payment protocol (x402, stripe-402, none)
- **payment.address**: Where payments should go
- **payment.chain**: Blockchain for payments

### Performance Hints (optional)

Help agents choose the right service:

- **latency_p50/p99**: Response time percentiles
- **throughput**: Maximum requests per second
- **regions**: Geographic availability

## Capabilities Schema

Each capability should reference a JSON Schema or MCP action definition:

```yaml
capabilities:
  - name: "function_name"
    description: "What this function does"
    input_schema: "URL to JSON Schema"
    output_schema: "URL to JSON Schema"
    mcp_action: "URL to MCP action definition"
```

## Example: Minimal Free Service

```yaml
version: "0.1"
name: "json-validator"
description: "Fast JSON schema validation"
runtime: "node-20"
endpoint: "https://json-validator.fly.dev"
capabilities:
  - name: "validate"
    description: "Validate JSON against schema"
```

## Example: Paid MCP Service

```yaml
version: "0.1"
name: "doc-analyzer"
description: "Advanced document analysis with LLMs"
runtime: "python-3.12"
endpoint: "https://analyzer.example.com"
health: "/healthz"

capabilities:
  - name: "extract_entities"
    description: "Extract named entities from documents"
    mcp_action: "https://analyzer.example.com/mcp/extract_entities"
  - name: "summarize"
    description: "Generate intelligent summaries"
    mcp_action: "https://analyzer.example.com/mcp/summarize"

pricing:
  model: "per_call"
  amount: "0.01"
  currency: "usdc"

payment:
  rail: "x402"
  address: "0x742d35Cc6634C0532925a3b844Bc9e7595f7E8e"
  chain: "base"

performance:
  latency_p50: 500
  latency_p99: 2000
  regions: ["us-east-1", "eu-central-1"]
```

## Validation Rules

1. `name` must be globally unique in the registry
2. `endpoint` must be a valid HTTPS URL
3. `capabilities` must have at least one entry
4. If `pricing` is specified, all pricing fields are required
5. If `payment` is specified, `rail` and `address` are required

## Discovery

Services with valid manifests are automatically indexed in the public registry. Agents can query by:

- Capability name
- Price range
- Latency requirements
- Geographic region
- Payment rail

## Future Extensions

- Batch pricing models
- SLA guarantees
- Multi-signature payments
- Dependency declarations
- Version compatibility

## Contributing

This specification is in draft. Please open issues for:

- Missing fields
- Unclear definitions
- Integration challenges
- Security concerns

Repository: https://github.com/sculptdotfun/openmesh