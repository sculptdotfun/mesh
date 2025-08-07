# Basic MeshExpress Example

Shows how OpenMesh SDKs provide:
- ✅ MCP compliance (`/tools/list`, `/tools/call`)
- ✅ Optional x402 micropayments (toggle on/off)
- ✅ Auto-generated manifest.yaml

## Quick Start

```bash
npm install openmesh-express
node server.js
```

## Toggle Free vs Paid

```javascript
// PAID (with x402)
const app = MeshExpress({
    x402: {amount: "0.001", asset: "USDC"}
})

// FREE (no x402)
const app = MeshExpress()  // Just omit x402 config
```

## What Happens

1. **On startup**: Writes `manifest.yaml` with discovered tools
2. **MCP endpoints**: Auto-exposes `/tools/list` and `/tools/call`
3. **Console reminder**: Prints "Run 'openmesh publish' to list on registry"
4. **Optional payments**: If x402 configured, adds payment headers

No need for `openmesh init --mcp` anymore!