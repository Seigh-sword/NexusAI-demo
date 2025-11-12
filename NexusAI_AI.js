/**
 * Nexus AI SDK - AI Chat Integration
 * Models: Nexus_V1, Codus_V1, Numerus_V1
 */

class NexusAI {
  constructor(config) {
    this.apiKey = config.apiKey;
    this.model = config.model || 'Nexus_V1';
    this.baseUrl = config.baseUrl || window.location.origin;
  }

  async chat(message, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}/api/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': this.apiKey
        },
        body: JSON.stringify({
          message,
          model: this.model,
          ...options
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Nexus AI Error:', error);
      throw error;
    }
  }

  setModel(model) {
    const validModels = ['Nexus_V1', 'Codus_V1', 'Numerus_V1'];
    if (validModels.includes(model)) {
      this.model = model;
    } else {
      console.warn('Invalid model. Using Nexus_V1');
      this.model = 'Nexus_V1';
    }
  }
}

// Make it globally available
if (typeof window !== 'undefined') {
  window.NexusAI = NexusAI;
}
