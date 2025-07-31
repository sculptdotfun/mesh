# OpenMesh CLI Design Document

Version: 0.1-draft  
Status: Design Phase

## Overview

The OpenMesh CLI is a developer tool for creating, validating, and publishing service manifests to the OpenMesh registry. It follows Unix philosophy: do one thing well, compose with other tools.

## Command Structure

```
openmesh <command> [options]

Commands:
  init        Create a new manifest.yaml interactively
  validate    Check manifest syntax and semantics
  test        Test service endpoint and capabilities
  publish     Publish manifest to registry
  update      Update existing registry entry
  unpublish   Remove service from registry
  status      Check service health and metrics
  enable      Enable payment rails
  disable     Disable payment requirements
  search      Search registry for services
  export      Export manifest in different formats
  import      Import from other API formats
  version     Show CLI version
  help        Show help for commands
```

## Command Details

### `openmesh init`

Interactive manifest creation wizard:

```bash
$ openmesh init
? Service name: face-blur-api
? Description: Privacy-preserving image processing
? Runtime: python-3.12
? Endpoint URL: https://api.example.com
? Add capabilities? (Y/n) Y
? Capability name: blur_faces
? Capability description: Detect and blur faces in images
? Add another capability? (y/N) n
? Enable payments? (y/N) y
? Payment rail: x402
? Price per call: 0.001
? Currency: usdc
? Payment address: 0x742d35Cc6634C0532925a3b844Bc9e7595f7E8e
? Chain: base

✓ Created manifest.yaml
✓ Run 'openmesh validate' to check your manifest
```

### `openmesh validate`

Validates manifest syntax and tests endpoints:

```bash
$ openmesh validate
✓ Valid YAML syntax
✓ Required fields present
✓ Endpoint reachable (200 OK)
✓ Health check passed
✓ Capabilities accessible
✓ Payment configuration valid

manifest.yaml is valid and ready to publish
```

### `openmesh publish`

Publishes to registry with signature:

```bash
$ openmesh publish
? Sign manifest with wallet? (Y/n) Y
✓ Manifest signed
✓ Published to registry
✓ Service live at: https://registry.openmesh.fun/face-blur-api

Your service is now discoverable by agents worldwide
```

### `openmesh enable`

Add payment rails to existing service:

```bash
$ openmesh enable x402
? Price per call: 0.001
? Currency: usdc
? Payment address: 0x742d35Cc6634C0532925a3b844Bc9e7595f7E8e
? Chain: base

✓ Updated manifest.yaml
✓ Run 'openmesh update' to apply changes
```

### `openmesh search`

Query the registry:

```bash
$ openmesh search --capability blur_faces --max-price 0.01
Found 3 services:

1. face-blur-api (0.001 USDC)
   Privacy-preserving image processing
   Latency: 150ms (p50), Uptime: 99.9%

2. privacy-shield (0.0005 USDC)
   Fast face detection and blurring
   Latency: 95ms (p50), Uptime: 99.5%

3. blur-master-pro (FREE)
   Open source face blurring
   Latency: 300ms (p50), Uptime: 98.0%
```

## Configuration

### Global Config (`~/.openmesh/config.yaml`)

```yaml
registry: https://registry.openmesh.fun
wallet: ~/.openmesh/wallet.json
default_chain: base
analytics: true
```

### Environment Variables

```bash
OPENMESH_REGISTRY=https://custom-registry.com
OPENMESH_WALLET=/path/to/wallet.json
OPENMESH_CHAIN=ethereum
```

## Output Formats

### Default (Human-Readable)

```bash
$ openmesh status
Service: face-blur-api
Status: ✓ Healthy
Uptime: 99.9% (30 days)
Calls: 1,234,567 total
Revenue: 1,234.56 USDC
```

### JSON Output (`--json`)

```bash
$ openmesh status --json
{
  "name": "face-blur-api",
  "status": "healthy",
  "uptime_30d": 0.999,
  "total_calls": 1234567,
  "revenue_usdc": 1234.56
}
```

### Quiet Mode (`-q`)

```bash
$ openmesh validate -q && echo "Valid"
Valid
```

## Error Handling

Clear, actionable error messages:

```bash
$ openmesh validate
✗ Validation failed:
  - Missing required field: endpoint
  - Invalid runtime: python-3.13 (supported: python-3.12, node-20, go-1.21)
  - Capability 'blur_faces' missing input_schema

Fix these issues and run 'openmesh validate' again
```

## Integration Examples

### CI/CD Pipeline

```yaml
# .github/workflows/deploy.yml
- name: Validate OpenMesh manifest
  run: |
    npm install -g openmesh
    openmesh validate
    openmesh test

- name: Publish to registry
  if: github.ref == 'refs/heads/main'
  run: openmesh publish --yes
```

### Docker Integration

```dockerfile
FROM node:20-alpine
RUN npm install -g openmesh
COPY manifest.yaml .
RUN openmesh validate
```

### Pre-commit Hook

```bash
#!/bin/sh
# .git/hooks/pre-commit
if [ -f manifest.yaml ]; then
  openmesh validate --quiet || exit 1
fi
```

## Future Features

### Version 0.2

- `openmesh logs` - View service logs
- `openmesh metrics` - Detailed analytics
- `openmesh rollback` - Revert to previous manifest
- Multiple manifest support

### Version 0.3

- `openmesh compose` - Combine multiple services
- `openmesh test --load` - Load testing
- `openmesh monitor` - Real-time monitoring
- GraphQL support

### Version 1.0

- Full decentralized registry
- Multi-signature support
- Service dependencies
- Automated migrations

## Design Principles

1. **Fast by Default**: Sub-second operations
2. **Offline First**: Works without internet until publish
3. **Clear Errors**: Always suggest next steps
4. **Composable**: Unix-style, plays well with others
5. **No Lock-in**: Export/import everything

## Technical Stack Options

### Option 1: Rust
- Single binary, fast, cross-platform
- Good for cryptographic operations
- Steep learning curve

### Option 2: Go
- Simple deployment, good concurrency
- Great for networked CLI tools
- Easy to maintain

### Option 3: TypeScript/Node
- Familiar to web developers
- Easy MCP integration
- Requires Node runtime

**Recommendation**: Start with TypeScript for rapid iteration, consider Rust for v1.0

## Testing Strategy

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# E2E tests with mock registry
npm run test:e2e

# Load tests
npm run test:load
```

## Open Questions

1. Should we support multiple manifests per directory?
2. How to handle manifest inheritance/composition?
3. Should we add a `openmesh doctor` command?
4. Interactive mode vs flags for all commands?
5. How to handle private/enterprise registries?

---

Feedback welcome at [discord.gg/sculpt](https://discord.gg/sculpt) → #openmesh