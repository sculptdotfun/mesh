/**
 * Basic OpenMesh Express example
 * Shows MCP compliance with optional x402 toggle
 */

const { MeshExpress, tool } = require('openmesh-express')

// Option 1: WITH micropayments (x402 enabled)
const appPaid = MeshExpress({
    name: 'translation-service',
    x402: {
        amount: '0.001',
        asset: 'USDC',
        network: 'base-mainnet',
        recipient: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4'
    }
})

// Option 2: FREE tools (no x402 config)
const appFree = MeshExpress({
    name: 'translation-service-free'
    // No x402 config = free to use
})

// Define tools (work with both paid and free)
tool('translate', 'Translate text between languages', async ({ text, from, to }) => {
    // Simplified translation logic
    const translations = {
        'hello': { 'es': 'hola', 'fr': 'bonjour' },
        'goodbye': { 'es': 'adiós', 'fr': 'au revoir' }
    }
    
    const key = text.toLowerCase()
    if (translations[key] && translations[key][to]) {
        return {
            original: text,
            translated: translations[key][to],
            from,
            to
        }
    }
    
    // Fallback mock translation
    return {
        original: text,
        translated: `[${to}] ${text}`,
        from,
        to
    }
})

tool('detect_language', 'Detect language of text', async ({ text }) => {
    // Simplified detection
    const patterns = {
        'es': /[áéíóúñ]/i,
        'fr': /[àâçéèêëïîôùûü]/i,
        'en': /^[a-zA-Z\s]+$/
    }
    
    for (const [lang, pattern] of Object.entries(patterns)) {
        if (pattern.test(text)) {
            return { language: lang, confidence: 0.8 }
        }
    }
    
    return { language: 'en', confidence: 0.5 }
})

// Start server
const PORT = process.env.PORT || 3000

// Toggle between paid/free by changing this:
const app = appPaid  // or appFree

app.listen(PORT, () => {
    console.log('Starting MCP server...')
    console.log('✅ Auto-exposes /tools/list and /tools/call')
    console.log('✅ Writes manifest.yaml on startup')
    console.log('📝 Run "openmesh publish" to list on registry')
    console.log(`Server running on port ${PORT}`)
})