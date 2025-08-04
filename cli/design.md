# OpenMesh CLI Design Document

Version: 0.1-draft  
Status: Design Phase

## Overview

The OpenMesh CLI is a developer tool for registering, discovering, and monetizing Model Context Protocol (MCP) servers. It automates MCP server discovery and adds payment capabilities through x402.

## Command Structure

```
openmesh <command> [options]

Commands:
  init        Create manifest from MCP server
  validate    Test MCP server connectivity
  publish     Register MCP server in OpenMesh
  discover    Find MCP tools by capability
  test        Try MCP tools before integrating
  inspect     View MCP server details
  enable      Add payment middleware to MCP
  pricing     Configure per-tool pricing
  earnings    View payment analytics
  create      Create new MCP server from template
  dev         Local development with payments
  version     Show CLI version
  help        Show help for commands
```

## Command Details

### `openmesh init --mcp`

Auto-discovers MCP server capabilities:

```bash
$ openmesh init --mcp
? MCP server URL: https://analyzer.example.com/mcp
✓ Connected to MCP server
✓ Discovered 5 tools:
  - analyze_complexity: Analyze code complexity
  - format_code: Format code with AI
  - find_bugs: Find potential bugs
  - suggest_refactor: Suggest refactoring
  - generate_tests: Generate unit tests

? Enable payments? (y/N) y
? Pricing model: (per_tool/flat/subscription) per_tool
? Default price per tool: 0.001
? Currency: usdc
? Payment address: 0x742d35Cc6634C0532925a3b844Bc9e7595f7E8e
? Chain: base

✓ Created manifest.yaml
✓ Run 'openmesh validate' to test your MCP server
```

### `openmesh validate`

Tests MCP server connectivity and tools:

```bash
$ openmesh validate
✓ Valid manifest syntax
✓ MCP server reachable
✓ Successfully connected via HTTP transport
✓ Server info: code-analyzer v1.0.0
✓ Tools verified:
  - analyze_complexity ✓
  - format_code ✓
  - find_bugs ✓
  - suggest_refactor ✓
  - generate_tests ✓
✓ Resources accessible:
  - code://project/* ✓

MCP server is ready to publish!
```

### `openmesh discover`

Find MCP tools across the ecosystem:

```bash
$ openmesh discover "code analysis"
Found 12 MCP tools:

code-analyzer-mcp/analyze_complexity (0.001 USDC)
  Analyze code complexity and suggest improvements
  Server: https://analyzer.example.com/mcp
  Latency: 150ms avg

ast-tools-mcp/parse_code (FREE)
  Parse code into AST for analysis
  Server: https://ast.tools/mcp
  Latency: 50ms avg

ai-review-mcp/review_pr (0.005 USDC)
  AI-powered pull request review
  Server: https://review.ai/mcp
  Latency: 2000ms avg

Use 'openmesh inspect <server-name>' for details
```

### `openmesh test`

Try MCP tools before integrating:

```bash
$ openmesh test code-analyzer-mcp/analyze_complexity
? Provide test input (or press enter for example):
{
  "code": "function calculate(a,b,c,d,e,f,g) { ... }"
}

✓ Calling analyze_complexity...
✓ Success! (latency: 147ms, cost: 0.001 USDC)

Result:
{
  "complexity": 12,
  "issues": ["Too many parameters", "Nested conditions"],
  "suggestions": ["Consider using an options object"]
}

? Test another tool? (Y/n)
```

### `openmesh enable x402`

Add payment middleware to existing MCP server:

```bash
$ openmesh enable x402
? Configure pricing per tool? (Y/n) Y

analyze_complexity
? Price (default: 0.001): 0.001

format_code  
? Price (default: 0.001): 0.0005

find_bugs
? Price (default: 0.001): 0.002

✓ Generated payment configuration
✓ Add this to your MCP server:

import { x402Middleware } from '@openmesh/mcp-x402';

server.use(x402Middleware({
  pricing: {
    'analyze_complexity': 0.001,
    'format_code': 0.0005,
    'find_bugs': 0.002
  },
  address: '0x742d35Cc6634C0532925a3b844Bc9e7595f7E8e',
  chain: 'base'
}));
```

### `openmesh create`

Bootstrap new MCP server with OpenMesh:

```bash
$ openmesh create my-tools --template typescript
✓ Created MCP server scaffold in ./my-tools
✓ Installed dependencies
✓ Generated example tools
✓ Added OpenMesh payment middleware

Next steps:
  cd my-tools
  npm run dev         # Start development server
  openmesh init --mcp # Create manifest
  openmesh publish    # Register with OpenMesh
```

## MCP-Specific Features

### Auto-Discovery Flow

```typescript
// When running 'openmesh init --mcp'
async function discoverMCPServer(url: string) {
  const client = new MCPClient();
  await client.connect(url);
  
  // Get server metadata
  const info = await client.request('initialize');
  
  // Discover capabilities
  const tools = await client.request('tools/list');
  const resources = await client.request('resources/list');
  
  return {
    name: info.serverInfo.name,
    version: info.serverInfo.version,
    tools: tools.tools,
    resources: resources.resources
  };
}
```

### Payment Integration

```yaml
# Generated manifest.yaml
mcp:
  server_url: "https://analyzer.example.com/mcp"
  transport: "http"

pricing:
  model: "per_tool"
  tools:
    analyze_complexity: 0.001
    format_code: 0.0005
    find_bugs: 0.002
```

## Configuration

### Global Config (`~/.openmesh/config.yaml`)

```yaml
registry: https://registry.openmesh.dev
wallet: ~/.openmesh/wallet.json
default_chain: base
analytics: true
mcp:
  timeout: 30000
  retry: 3
```

### Environment Variables

```bash
OPENMESH_REGISTRY=https://custom-registry.com
OPENMESH_MCP_TIMEOUT=60000
OPENMESH_WALLET=/path/to/wallet.json
```

## Output Formats

### Default (Human-Readable)

```bash
$ openmesh inspect code-analyzer-mcp
MCP Server: code-analyzer-mcp
Version: 1.0.0
Transport: HTTP
Endpoint: https://analyzer.example.com/mcp

Tools (5):
  - analyze_complexity (0.001 USDC)
  - format_code (0.0005 USDC)  
  - find_bugs (0.002 USDC)
  - suggest_refactor (0.001 USDC)
  - generate_tests (0.003 USDC)

Performance:
  Uptime: 99.9% (30 days)
  Avg latency: 152ms
  Total calls: 45,678
  Revenue: 89.34 USDC
```

### JSON Output (`--json`)

```bash
$ openmesh discover "code" --json
{
  "results": [
    {
      "server": "code-analyzer-mcp",
      "tool": "analyze_complexity",
      "price": 0.001,
      "currency": "usdc",
      "endpoint": "https://analyzer.example.com/mcp"
    }
  ]
}
```

## Error Handling

MCP-specific error messages:

```bash
$ openmesh validate
✗ Validation failed:
  - Cannot connect to MCP server at https://analyzer.example.com/mcp
  - Server returned error: "Authentication required"
  - Tool 'analyze_code' not found in server response

Troubleshooting:
  1. Check if MCP server is running
  2. Verify transport protocol (http/stdio/websocket)
  3. Ensure server implements standard MCP protocol
```

## Development Features

### Local Testing

```bash
$ openmesh dev
✓ Starting local MCP server on port 3000
✓ Payment simulation enabled
✓ Mock wallet loaded

MCP Development Server
- Endpoint: http://localhost:3000/mcp
- Dashboard: http://localhost:3000/dashboard
- Payments: Simulated (no real charges)

Press Ctrl+C to stop
```

### Integration Testing

```typescript
// Test MCP server with OpenMesh
import { testMCPServer } from '@openmesh/cli';

await testMCPServer({
  manifest: './manifest.yaml',
  testCases: [
    {
      tool: 'analyze_complexity',
      input: { code: 'function test() {}' },
      expectedFields: ['complexity', 'suggestions']
    }
  ]
});
```

## Future Features

### Version 0.2
- `openmesh compose` - Chain multiple MCP tools
- `openmesh benchmark` - Performance testing
- `openmesh migrate` - Convert REST APIs to MCP

### Version 0.3
- Claude Desktop integration
- LangChain/AutoGen plugins
- Tool recommendation engine

### Version 1.0
- Decentralized MCP registry
- Cross-server tool composition
- SLA enforcement

## Design Principles

1. **MCP-Native**: Built specifically for MCP servers
2. **Auto-Discovery**: Minimize manual configuration
3. **Payment-First**: Easy monetization for developers
4. **Developer-Friendly**: Clear errors, helpful defaults
5. **Extensible**: Plugin system for new features

## Technical Stack

- **Language**: TypeScript (using MCP SDK)
- **MCP Client**: @modelcontextprotocol/sdk
- **CLI Framework**: Commander.js
- **Payment**: x402 protocol integration
- **Testing**: Jest with MCP mocks

---

Feedback welcome at [discord.gg/sculpt](https://discord.gg/sculpt) → #openmesh