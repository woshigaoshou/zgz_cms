export class LocalCache {
  storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }
  setCache(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  getCache(key: string) {
    const value = this.storage.getItem(key);
    return value ? JSON.parse(value) : '';
  }
  deleteCache(key: string) {
    return this.storage.removeItem(key);
  }
  clearCache() {
    this.storage.clear();
  }
}

export default new LocalCache();
