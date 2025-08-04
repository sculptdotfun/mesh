# OpenMesh Architecture Design

Version: 0.1-draft  
Status: Design Phase

## Overview

OpenMesh is the discovery and monetization layer for Model Context Protocol (MCP) servers. It consists of three core components:

1. **CLI Tool** - MCP server management and payment integration
2. **Registry** - Discovery service for MCP tools
3. **Client Libraries** - MCP-enhanced clients with payment support

## MCP Integration Strategy

### What MCP Provides
- Standardized tool/resource definitions
- JSON-RPC communication protocol
- Transport mechanisms (stdio, HTTP/SSE, WebSocket)
- Tool schemas and validation

### What OpenMesh Adds
- **Discovery**: Find MCP servers by capability
- **Monetization**: x402 payment integration
- **Reputation**: Quality metrics and ratings
- **Analytics**: Usage tracking and insights

## CLI Design

### Core Commands

```bash
# MCP Server Management
openmesh init --mcp      # Create manifest from MCP server
openmesh validate        # Test MCP endpoints and tools
openmesh publish         # Register MCP server

# Discovery
openmesh discover        # Find MCP tools by capability
openmesh inspect         # View server details and tools
openmesh test            # Try MCP server before integrating

# Payment Management
openmesh enable x402     # Add payment middleware to MCP
openmesh pricing         # Configure per-tool pricing
openmesh earnings        # View payment analytics

# Development
openmesh dev             # Local testing with payments
openmesh logs            # View server activity
```

### MCP Auto-Discovery

When initializing, OpenMesh connects to the MCP server and:

1. Calls `initialize` to get server info
2. Calls `tools/list` to discover available tools
3. Calls `resources/list` to find resources
4. Generates manifest with discovered capabilities

```typescript
// Auto-discovery flow
const client = new MCPClient();
await client.connect(serverUrl);

const serverInfo = await client.initialize();
const tools = await client.listTools();
const resources = await client.listResources();

// Generate manifest
const manifest = {
  name: serverInfo.name,
  mcp: {
    server_url: serverUrl,
    transport: "http",
    tools: tools.map(t => t.name),
    resources: resources.map(r => r.uri)
  }
};
```

## Registry Architecture

### MCP-Specific Features

```
Registry API
├── MCP Discovery
│   ├── Tool search (by name, description)
│   ├── Resource search (by type, URI pattern)
│   └── Capability matching
├── Server Management
│   ├── Health monitoring (via MCP ping)
│   ├── Tool availability tracking
│   └── Performance metrics
└── Payment Integration
    ├── Tool-level pricing
    ├── Usage tracking
    └── Payment verification
```

### Registry API

```http
# Discover MCP tools
GET /discover/tools?q=code+analysis&max_price=0.001
Response: [
  {
    "server": "code-analyzer-mcp",
    "tool": "analyze_complexity",
    "description": "Analyze code complexity",
    "price": 0.0005,
    "avg_latency": 150
  }
]

# Get MCP server details
GET /mcp/{server-name}
Response: {
  "name": "code-analyzer-mcp",
  "transport": "http",
  "endpoint": "https://analyzer.example.com/mcp",
  "tools": [...],
  "resources": [...],
  "pricing": {...}
}

# Real-time tool availability
WS /mcp/availability
→ {"server": "analyzer", "tool": "format_code", "available": true}
```

## MCP Payment Middleware

### Server-Side Integration

```typescript
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { x402Middleware } from '@openmesh/mcp-x402';

const server = new Server({
  name: 'code-analyzer',
  version: '1.0.0'
});

// Add payment middleware
server.use(x402Middleware({
  pricing: {
    'analyze_complexity': 0.001,
    'format_code': 0.0005,
    'refactor_function': 0.005
  },
  address: '0x...',
  chain: 'base'
}));

// Tools work normally, payment handled by middleware
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Payment already verified by middleware
  return handleToolCall(request.params.name, request.params.arguments);
});
```

### Client-Side Integration

```typescript
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { OpenMeshTransport } from '@openmesh/mcp-client';

// OpenMesh transport handles payments automatically
const transport = new OpenMeshTransport({
  serverUrl: 'https://analyzer.example.com/mcp',
  wallet: userWallet
});

const client = new Client({
  name: 'my-agent',
  version: '1.0.0'
}, {
  capabilities: {}
});

await client.connect(transport);

// Call tools normally, payment happens transparently
const result = await client.callTool('analyze_complexity', {
  code: sourceCode
});
```

## Architecture Diagram

```
┌─────────────────────────────────────────────────────┐
│                   AI Agent                           │
│  (Claude, GPT, LangChain, AutoGen, Custom)         │
└─────────────────┬───────────────────────────────────┘
                  │ MCP + x402 headers
┌─────────────────▼───────────────────────────────────┐
│              OpenMesh Client                         │
│  - Discovers MCP servers                            │
│  - Handles x402 payments                            │
│  - Routes to best server                            │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│           OpenMesh Registry                          │
│  - Indexes MCP tools/resources                      │
│  - Tracks availability                              │
│  - Monitors performance                             │
└─────────────────┬───────────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────────┐
│           MCP Servers (Enhanced)                     │
│  - Standard MCP tools/resources                     │
│  - OpenMesh payment middleware                      │
│  - Usage analytics                                  │
└─────────────────────────────────────────────────────┘
```

## Security Considerations

### MCP-Specific Security

1. **Transport Security**
   - HTTPS required for HTTP transport
   - Signature verification for stdio transport
   - Rate limiting per tool

2. **Payment Security**
   - Payment proof required before tool execution
   - Replay attack prevention
   - Tool-specific pricing enforcement

3. **Access Control**
   - Optional API key support (legacy compatibility)
   - Payment as primary authentication
   - Tool-level permissions

## Performance Targets

- MCP tool discovery: <100ms
- Payment verification: <50ms
- Tool execution: Native MCP performance
- Registry query: <50ms (p99)
- Auto-discovery: <2s for full server scan

## Migration Path

### For Existing MCP Servers

```bash
# 1. Add OpenMesh to existing MCP server
cd my-mcp-server
npm install @openmesh/mcp-x402

# 2. Create manifest
openmesh init --mcp

# 3. Add payment (optional)
openmesh enable x402

# 4. Publish
openmesh publish
```

### For New MCP Servers

```bash
# 1. Create MCP server with OpenMesh template
openmesh create my-server --template mcp-typescript

# 2. Implement your tools
# ... edit src/tools.ts ...

# 3. Configure and publish
openmesh publish
```

## Integration Examples

### LangChain Integration

```python
from langchain.tools import Tool
from openmesh import discover_mcp_tool

# Discover and use MCP tool
analyzer = discover_mcp_tool("code_analysis")
tool = Tool(
    name="analyze_code",
    func=analyzer.analyze_complexity,
    description="Analyze code complexity via MCP"
)
```

### AutoGen Integration

```python
from autogen import AssistantAgent
from openmesh import MCPToolkit

agent = AssistantAgent(
    name="analyzer",
    tools=MCPToolkit.discover("code_analysis")
)
```

## Next Steps

1. Implement MCP client with discovery
2. Build x402 middleware for MCP
3. Create registry with tool indexing
4. Develop example MCP servers
5. Test with Claude Desktop

---

Join the discussion: [discord.gg/sculpt](https://discord.gg/sculpt) → #openmesh