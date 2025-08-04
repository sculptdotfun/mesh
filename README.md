# OpenMesh

The marketplace for Model Context Protocol (MCP) servers. Discover, pay, and use AI tools in milliseconds.

## The Problem

MCP servers are revolutionizing how AI agents access tools and data. But they're missing two critical pieces: **discovery** and **monetization**.

Today: Manually configure each MCP server. No way to find new ones. No way for creators to get paid.

OpenMesh fixes this—any agent discovers any MCP server, pays instantly with x402, and gets to work.

## How It Works

```bash
# 1. Add OpenMesh to your MCP server
$ npx openmesh init --mcp
✓ Generated manifest.yaml for MCP server
✓ Auto-discovered 5 tools from your server

# 2. Publish to the registry
$ npx openmesh publish
✓ MCP server registered
✓ Tools indexed and searchable
✓ Live at https://registry.openmesh.dev/your-server

# 3. Enable payments (optional)
$ npx openmesh enable x402
✓ Payment middleware added
✓ Each tool call now costs 0.001 USDC
```

## What This Enables

**For AI Agents**:
- Discover MCP tools across the entire ecosystem
- Pay per use with x402 (no API keys!)
- Switch providers instantly based on price/performance

**For MCP Developers**:
- Monetize your MCP server with one command
- Get discovered by thousands of AI agents
- Focus on building tools, not payment infrastructure

**For the Ecosystem**:
- Anthropic's MCP handles tool standardization
- OpenMesh adds discovery and payments
- Together: a complete AI tool economy

## Project Status

### Current (v0.1-draft):
- ✅ Manifest specification drafted
- ✅ CLI architecture designed  
- ✅ Example implementations sketched
- 🚧 Registry protocol in design
- 🚧 x402 integration planned

### Not Yet Built:
- Actual CLI implementation
- Registry infrastructure
- Payment verification
- Production deployments

## Quick Start (Coming Soon)

```bash
# Install CLI
npm install -g openmesh

# For MCP server developers
openmesh init --mcp              # Create manifest from MCP server
openmesh validate                 # Test your MCP endpoints
openmesh publish                  # Add to registry

# For AI agents/developers
openmesh discover "code analysis" # Find MCP tools
openmesh test <server-name>       # Try before integrating
```

## Specification

See [SPEC.md](SPEC.md) for the complete manifest format.

## Contributing

This is a community project under SCULPT. We need:

- **MCP Integration**: Help us support more MCP features
- **CLI Development**: TypeScript implementation using MCP SDK
- **Registry Design**: How should MCP server discovery work?
- **Example Servers**: Build MCP servers with OpenMesh payments
- **Client Libraries**: Integrate OpenMesh into AI frameworks

Join the discussion:
- **Discord**: [discord.gg/sculpt](https://discord.gg/sculpt) → #openmesh
- **GitHub Issues**: Design decisions, proposals, questions

## Philosophy

- **MCP-native**: Built on Anthropic's Model Context Protocol
- **Open by default**: Apache-2 spec, MIT CLI, CC-BY registry data
- **No lock-in**: Your MCP server, your rules
- **Payments optional**: Free tools stay free, paid tools get rails
- **Agent-first**: Built for AI, not humans

## Roadmap

### Phase 1: MCP Discovery (Current)
- Manifest spec for MCP servers
- CLI for MCP server registration
- Basic registry with tool search

### Phase 2: Payment Layer (Next)
- x402 middleware for MCP
- Per-tool pricing configuration
- Payment verification system

### Phase 3: Ecosystem Growth (Future)
- Claude Desktop integration
- LangChain/AutoGen plugins
- Decentralized registry
- Advanced analytics

## License

- Specification: Apache-2.0
- CLI (when built): MIT
- Registry data: CC-BY

---

*An open experiment from [SCULPT](https://sculpt.fun)*  
*Making coordination costs approach zero*