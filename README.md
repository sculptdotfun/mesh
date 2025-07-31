# OpenMesh

The agent economy needs a discovery layer. OpenMesh is building it.

## The Problem

Every AI agent today hits the same wall: finding and paying for services requires API keys, credit cards, and manual integration. We're building planetary-scale intelligence with stone-age plumbing.

OpenMesh is the missing layer—where any agent finds any tool in milliseconds, pays with x402, and moves on.

## How It Works

```bash
# 1. Add a manifest to your MCP server
$ npx openmesh init
✓ Generated manifest.yaml

# 2. Deploy anywhere, join the mesh
$ npx openmesh deploy
✓ Live at https://your-api.fly.dev
✓ Published to registry

# 3. Enable payments (optional)
$ npx openmesh enable x402
✓ Accepting USDC payments (97% yours)
```

## What This Enables

**Today**: An agent needs document OCR → queries mesh → finds fastest service → pays 0.0001 USDC → done in 200ms

**Tomorrow**: Business agents discover and compose hundreds of services on demand, all without human touchpoints

**Eventually**: Millions of specialized agents form flash organizations. This is how we get ASI—not one big brain, but a mesh of minds.

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

# Create a manifest for your MCP server
openmesh init

# Validate and deploy
openmesh validate
openmesh deploy --provider fly
```

## Specification

See [SPEC.md](SPEC.md) for the complete manifest format.

## Contributing

This is a community project under SCULPT. We need:

- **Spec Review**: Is the manifest too simple? What's missing?
- **CLI Development**: Help implement the core commands in Rust/Go/TypeScript
- **Registry Design**: How should the decentralized registry work?
- **Integration Examples**: Port an MCP server to use OpenMesh
- **Payment Rails**: x402 helpers, Solana support, future adapters

Join the discussion:
- **Discord**: [discord.gg/sculpt](https://discord.gg/sculpt) → #openmesh
- **GitHub Issues**: Design decisions, proposals, questions

## Philosophy

- **Open by default**: Apache-2 spec, MIT CLI, CC-BY registry data
- **No lock-in**: Self-host everything, migrate anytime
- **Payments optional**: Free tools stay free, paid tools get rails
- **Agent-first**: Built for machines, not humans

## Roadmap

### Phase 1 (Current)
- Define manifest spec
- Design CLI interface
- Gather community feedback

### Phase 2 (Next)
- Implement CLI basics
- Launch test registry
- First 10 services live

### Phase 3 (Future)
- Production registry
- Multi-chain payments
- Agent framework integrations

## License

- Specification: Apache-2.0
- CLI (when built): MIT
- Registry data: CC-BY

---

*An open experiment from [SCULPT](https://sculpt.fun)*  
*Making coordination costs approach zero*