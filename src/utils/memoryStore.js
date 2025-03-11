class MemoryStore {
  constructor() {
    if (MemoryStore.instance) {
      return MemoryStore.instance;
    }
    this.memory = {};
    MemoryStore.instance = this;
  }

  get(userId) {
    return this.memory[userId] || {};
  }

  set(userId, data) {
    this.memory[userId] = data;
    return this.memory[userId];
  }

  setInitialContext(userId, message) {
    if (!this.memory[userId] || !this.memory[userId].initial_context) {
      this.memory[userId] = {
        initial_context: message,
        timestamp: new Date().toISOString(),
        conversation: [message],
        updates: {},
      };
      return true;
    }
    return false;
  }

  addToConversation(userId, message) {
    if (!this.memory[userId]) {
      return this.setInitialContext(userId, message);
    }

    if (!this.memory[userId].conversation) {
      this.memory[userId].conversation = [];
    }

    this.memory[userId].conversation.push(message);
    return this.memory[userId];
  }

  update(userId, updates) {
    const current = this.get(userId);
    this.memory[userId] = {
      ...current,
      updates: { ...current.updates, ...updates },
    };
    return this.memory[userId];
  }

  hasInitialContext(userId) {
    return !!(this.memory[userId] && this.memory[userId].initial_context);
  }
}

const memoryStore = new MemoryStore();
module.exports = memoryStore;
