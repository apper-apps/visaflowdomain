import applicationData from "@/services/mockData/applications.json";

let applications = [...applicationData];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const applicationService = {
  async getAll() {
    await delay(300);
    return [...applications];
  },

  async getById(id) {
    await delay(200);
    const application = applications.find(a => a.Id === parseInt(id));
    if (!application) {
      throw new Error("Application not found");
    }
    return { ...application };
  },

  async getByClientId(clientId) {
    await delay(250);
    return applications.filter(a => a.clientId === parseInt(clientId)).map(a => ({ ...a }));
  },

  async create(applicationData) {
    await delay(400);
    const newApplication = {
      ...applicationData,
      Id: Math.max(...applications.map(a => a.Id)) + 1,
      status: "New",
      documents: applicationData.documents || [],
      messages: applicationData.messages || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    applications.push(newApplication);
    return { ...newApplication };
  },

  async update(id, applicationData) {
    await delay(300);
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    applications[index] = { 
      ...applications[index], 
      ...applicationData,
      updatedAt: new Date().toISOString()
    };
    return { ...applications[index] };
  },

  async updateStatus(id, status) {
    await delay(250);
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    applications[index].status = status;
    applications[index].updatedAt = new Date().toISOString();
    return { ...applications[index] };
  },

  async addMessage(id, message) {
    await delay(200);
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    
    const newMessage = {
      ...message,
      Id: (applications[index].messages?.length || 0) + 1,
      timestamp: new Date().toISOString()
    };
    
    if (!applications[index].messages) {
      applications[index].messages = [];
    }
    
    applications[index].messages.push(newMessage);
    applications[index].updatedAt = new Date().toISOString();
    
    return { ...applications[index] };
  },

  async delete(id) {
    await delay(200);
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Application not found");
    }
    applications.splice(index, 1);
    return true;
  }
};