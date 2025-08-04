# MCP Integration Examples

This directory contains example manifests and integration patterns for OpenMesh with MCP servers.

## Example Manifests

### 1. Full MCP Server with Payments (`manifest.yaml`)
- Complete example with all fields
- Per-tool pricing configuration
- Performance hints and metadata

### 2. Minimal Free MCP Server (`minimal-mcp-manifest.yaml`)
- Simplest possible manifest
- No payment configuration (free to use)
- Auto-discovers tools from MCP server

### 3. Local MCP Server (`local-mcp-manifest.yaml`)
- Uses stdio transport for local servers
- Optional payment configuration
- Good for development tools

## Integration Patterns

### Server-Side: Adding OpenMesh to Your MCP Server

```typescript
// 1. Install OpenMesh MCP middleware
npm install @openmesh/mcp-x402

// 2. Add to your MCP server
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { x402Middleware } from '@openmesh/mcp-x402';

const server = new Server({
  name: 'my-mcp-server',
  version: '1.0.0'
});

// Add payment middleware
server.use(x402Middleware({
  pricing: {
    'expensive_tool': 0.01,
    'cheap_tool': 0.0001
  },
  address: '0x...',
  chain: 'base'
}));

// Your tools work normally
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Payment already verified by middleware
  return handleToolCall(request.params.name, request.params.arguments);
});
```

### Client-Side: Using OpenMesh to Discover MCP Servers

```typescript
// 1. Install OpenMesh client
npm install @openmesh/client

// 2. Discover and use MCP tools
import { OpenMeshClient } from '@openmesh/client';

const mesh = new OpenMeshClient();

// Find MCP tools
const tools = await mesh.discover('code analysis');

// Connect to MCP server with automatic payments
const analyzer = await mesh.connect(tools[0].server);

// Use tools normally - payment handled automatically
const result = await analyzer.callTool('analyze_complexity', {
  code: mySourceCode
});
```

### LangChain Integration

```python
from langchain.tools import Tool
from openmesh import discover_mcp_tool

# Discover MCP tool via OpenMesh
code_analyzer = discover_mcp_tool("analyze_complexity")

# Wrap as LangChain tool
tool = Tool(
    name="analyze_code",
    func=code_analyzer.execute,
    description="Analyze code complexity via MCP"
)

# Use in your agent
agent.tools.append(tool)
```

### AutoGen Integration

```python
from autogen import AssistantAgent
from openmesh import MCPToolkit

# Create agent with MCP tools
agent = AssistantAgent(
    name="code_reviewer",
    tools=MCPToolkit.discover("code review")
)

# Tools are automatically configured with payments
```

## Testing Your MCP Server

```bash
# 1. Create manifest from your MCP server
openmesh init --mcp
# Enter your MCP server URL when prompted

# 2. Test connectivity
openmesh validate

# 3. Test individual tools
openmesh test your-server/tool-name

# 4. Publish to registry
openmesh publish
```

## Common Patterns

### Pattern 1: Free Tools with Optional Donations
```yaml
pricing:
  model: "donation"
  suggested: 0.001
  currency: "usdc"
```

### Pattern 2: Tiered Pricing
```yaml
tools:
  - name: "basic_analysis"
    pricing: 0.0001  # Cheap
  - name: "ai_analysis"
    pricing: 0.01    # Premium
```

### Pattern 3: Subscription Model (Future)
```yaml
pricing:
  model: "subscription"
  monthly: 10.00
  currency: "usdc"
```

## Troubleshooting

### MCP Server Not Found
```bash
# Check if server is running
curl https://your-server.com/mcp

# Verify transport protocol
openmesh validate --debug
```

### Tools Not Discovered
```bash
# Manually test MCP connection
openmesh test --mcp-direct https://your-server.com/mcp

# Check server implements tools/list
```

### Payment Issues
```bash
# Test without payments first
openmesh test --no-payment

# Verify wallet configuration
openmesh config --check-wallet
```