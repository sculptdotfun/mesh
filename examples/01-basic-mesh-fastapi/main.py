"""
Basic OpenMesh FastAPI example
Shows MCP compliance with optional x402 toggle
"""

from openmesh_fastapi import MeshFastAPI, tool

# Option 1: WITH micropayments (x402 enabled)
app_paid = MeshFastAPI(
    name="sentiment-analyzer",
    x402={
        "amount": "0.001",
        "asset": "USDC", 
        "network": "base-mainnet",
        "recipient": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb4"
    }
)

# Option 2: FREE tools (no x402 config)
app_free = MeshFastAPI(
    name="sentiment-analyzer-free"
    # No x402 config = free to use
)

@tool(description="Analyze sentiment of text")
def sentiment(text: str) -> dict:
    """Quick sentiment analysis"""
    # Simplified logic for demo
    positive_words = ["good", "great", "excellent", "amazing"]
    negative_words = ["bad", "terrible", "awful", "horrible"]
    
    text_lower = text.lower()
    pos_count = sum(1 for word in positive_words if word in text_lower)
    neg_count = sum(1 for word in negative_words if word in text_lower)
    
    if pos_count > neg_count:
        return {"score": 0.8, "label": "positive"}
    elif neg_count > pos_count:
        return {"score": -0.8, "label": "negative"}
    else:
        return {"score": 0.0, "label": "neutral"}

@tool(description="Extract key phrases from text")
def extract_phrases(text: str, max_phrases: int = 5) -> dict:
    """Extract important phrases"""
    # Simplified extraction
    words = text.split()
    phrases = [" ".join(words[i:i+2]) for i in range(0, len(words)-1, 2)]
    return {"phrases": phrases[:max_phrases]}

if __name__ == "__main__":
    import uvicorn
    
    # Choose which app to run
    print("Starting MCP server...")
    print("✅ Auto-exposes /tools/list and /tools/call")
    print("✅ Writes manifest.yaml on startup")
    print("📝 Run 'openmesh publish' to list on registry")
    
    # Toggle between paid/free by changing this:
    uvicorn.run(app_paid, host="0.0.0.0", port=8000)  # or app_free