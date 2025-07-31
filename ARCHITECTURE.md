# OpenMesh Architecture Design

Version: 0.1-draft  
Status: Design Phase

## Overview

OpenMesh consists of three core components:
1. **CLI Tool** - Local developer tool for manifest management
2. **Registry** - Decentralized discovery service
3. **Client Libraries** - Agent integration helpers

## CLI Design

### Core Commands

```bash
# Manifest Management
openmesh init          # Interactive manifest creation
openmesh validate      # Validate manifest.yaml syntax and semantics
openmesh test          # Test endpoint health and capabilities

# Registry Operations  
openmesh publish       # Publish manifest to registry
openmesh update        # Update existing registry entry
openmesh unpublish     # Remove from registry

# Payment Management
openmesh enable x402   # Add x402 payment rail
openmesh enable stripe # Add Stripe-402 rail (future)
openmesh disable       # Remove payment requirements

# Monitoring
openmesh status        # Check service health and stats
openmesh earnings      # View payment history (if enabled)

# Migration
openmesh export        # Export configuration
openmesh import        # Import from other formats
```

### Design Principles

- **Single Binary**: No runtime dependencies, works everywhere
- **Manifest-Driven**: manifest.yaml is the source of truth
- **Local-First**: Works without network until publish
- **Progressive Enhancement**: Start free, add payments later
- **Zero Lock-in**: All operations reversible

### CLI Architecture

```
openmesh CLI
├── Parser (manifest.yaml)
├── Validator
│   ├── Schema validation
│   ├── Endpoint health check
│   └── Capability verification
├── Registry Client
│   ├── Publish (HTTP POST)
│   ├── Query (HTTP GET)
│   └── Signature verification
└── Payment Adapters
    ├── x402 (Base, Solana)
    ├── Stripe-402 (planned)
    └── Lightning (future)
```

## Registry Design

### Core Requirements

- **Permissionless**: Anyone can publish
- **Immutable**: Published manifests can't be altered
- **Queryable**: Fast search by capability, price, latency
- **Decentralized**: No single point of failure
- **Free**: Reading is always free

### Registry API

```http
# Publish a manifest
POST /publish
Content-Type: application/json
X-Signature: <manifest signature>
{
  "manifest": { ... },
  "signature": "0x...",
  "timestamp": 1234567890
}

# Query services
GET /services?capability=blur_faces&max_price=0.001&max_latency=100

# Get specific manifest
GET /manifest/{service-name}

# Get health metrics
GET /health/{service-name}

# Live feed (WebSocket)
WS /feed
```

### Data Structure

```json
{
  "services": [
    {
      "name": "face-blur-api",
      "manifest_hash": "QmX...",
      "manifest": { ... },
      "published_at": "2025-01-01T00:00:00Z",
      "last_seen": "2025-01-01T00:01:00Z",
      "metrics": {
        "uptime_30d": 0.999,
        "latency_p50": 95,
        "latency_p99": 230,
        "total_calls": 1234567,
        "success_rate": 0.998
      },
      "reputation": {
        "score": 0.95,
        "reviews": 1234,
        "disputes": 2
      }
    }
  ]
}
```

### Registry Implementation Options

**Option 1: Centralized Bootstrap**
- Simple PostgreSQL + API
- Run by SCULPT initially
- Easy migration path to decentralized

**Option 2: IPFS + Smart Contract**
- Manifests on IPFS
- Index on Base/Solana
- Higher complexity, better decentralization

**Option 3: Federation**
- Multiple registry nodes
- Gossip protocol for sync
- Medium complexity, good resilience

**Recommendation**: Start with Option 1, design for Option 3

## Client Integration

### Agent Libraries

```python
# Python (for AutoGen, etc)
from openmesh import Client

mesh = Client()
services = mesh.find(
    capability="blur_faces",
    max_price=0.001,
    max_latency=100
)

result = await services[0].call(
    "blur_faces",
    image=image_data,
    payment_proof=wallet.sign(0.001)
)
```

```typescript
// TypeScript (for LangChain, etc)
import { OpenMesh } from 'openmesh';

const mesh = new OpenMesh();
const ocr = await mesh.discover({
  capability: 'extract_text',
  maxPrice: 0.002
});

const text = await ocr.call('extract_text', { image });
```

### Integration Points

- **LangChain**: Custom tool wrapper
- **AutoGen**: Agent capability provider
- **CrewAI**: Tool discovery plugin
- **Custom Agents**: Direct API calls

## Security Considerations

### Manifest Signing
- All manifests signed by service author
- Public key in manifest, verified by registry
- Prevents tampering and spoofing

### Payment Security
- x402 uses standard crypto signatures
- No payment info in manifest (just address)
- Clients verify receipts independently

### Health Probing
- Registry probes /health endpoints
- Services can't fake uptime
- Bad actors naturally filtered by reputation

## Performance Targets

- Manifest validation: <10ms
- Registry query: <50ms (p99)
- Publish latency: <1s
- Health probe interval: 60s
- Full registry sync: <10s

## Migration Path

### From Existing APIs

```bash
# Import from OpenAPI
openmesh import openapi spec.json

# Import from MCP
openmesh import mcp https://api.example.com/mcp

# Import from GraphQL
openmesh import graphql schema.graphql
```

### Between Providers

```bash
# Export current state
openmesh export > backup.json

# Switch providers
openmesh update --endpoint https://new-provider.com

# Or self-host
openmesh update --endpoint https://my-server.com
```

## Open Questions

1. Should we support manifest versioning?
2. How to handle service deprecation?
3. Should registry charge for listings?
4. How to prevent spam/abuse?
5. Standardize error responses?

## Next Steps

1. Implement CLI MVP (just init + validate)
2. Deploy test registry (PostgreSQL + REST)
3. Create example integrations
4. Gather feedback from agent developers
5. Iterate on manifest format

---

Join the discussion: [discord.gg/sculpt](https://discord.gg/sculpt) → #openmesh