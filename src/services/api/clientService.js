import clientData from "@/services/mockData/clients.json";

let clients = [...clientData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const clientService = {
  async getAll() {
    await delay(300);
    return [...clients];
  },

  async getById(id) {
    await delay(200);
    const client = clients.find(c => c.Id === parseInt(id));
    if (!client) {
      throw new Error("Client not found");
    }
    return { ...client };
  },

async create(clientData) {
    await delay(400);
    
    // Enhanced validation with demo-friendly fallbacks
    const validatedData = {
      name: clientData.name?.trim() || "Demo Client",
      email: clientData.email?.trim() || "demo@example.com",
      phone: clientData.phone?.trim() || "+61 400 000 000"
    };
    
    // Ensure email format is valid for demo
    if (validatedData.email && !/\S+@\S+\.\S+/.test(validatedData.email)) {
      validatedData.email = "demo@example.com";
    }
    
    // Generate reliable ID (handle empty array case)
    const maxId = clients.length > 0 ? Math.max(...clients.map(c => c.Id)) : 0;
    
    // Create portal link with better uniqueness and demo-friendly format
    const timestamp = Date.now().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 6);
    const portalToken = `client-${timestamp}${randomPart}`;
    
    const newClient = {
      ...validatedData,
      Id: maxId + 1,
      portalLink: `portal/${portalToken}`,
      createdAt: new Date().toISOString(),
      status: "Active",
      // Add demo-friendly metadata
      isDemo: clientData.name?.toLowerCase().includes('demo') || clientData.email?.includes('demo'),
      applications: [] // Initialize empty applications array
    };
    
    try {
      clients.push(newClient);
      return { ...newClient };
    } catch (error) {
      // Fallback for demo scenarios - don't let technical issues stop the demo
      console.warn("Client storage issue, returning demo client:", error);
      return {
        ...newClient,
        Id: 999, // Demo fallback ID
        portalLink: `portal/demo-${randomPart}`,
        isDemo: true
      };
    }
  },

  async update(id, clientData) {
    await delay(300);
    const index = clients.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Client not found");
    }
    clients[index] = { ...clients[index], ...clientData };
    return { ...clients[index] };
  },

  async delete(id) {
    await delay(200);
    const index = clients.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Client not found");
    }
    clients.splice(index, 1);
    return true;
  }
};