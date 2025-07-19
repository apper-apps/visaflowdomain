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
    const newClient = {
      ...clientData,
      Id: Math.max(...clients.map(c => c.Id)) + 1,
      portalLink: `portal/client-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    clients.push(newClient);
    return { ...newClient };
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