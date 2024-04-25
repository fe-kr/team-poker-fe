export class TokenStorage {
  storage;

  constructor(storage) {
    this.storage = storage;
  }

  getItem() {
    return this.storage.getItem('token');
  }

  setItem(token) {
    return this.storage.setItem('token', token);
  }

  removeItem() {
    return this.storage.removeItem('token');
  }

  parseItem() {
    try {
      const [, userData] = this.getItem().split('.');

      return JSON.parse(atob(userData));
    } catch {
      return null;
    }
  }

  checkIsValid() {
    const { exp } = this.parseItem() || {};

    return exp && exp * 1000 > Date.now();
  }
}
