import { generatePath } from 'react-router-dom';

export class HistoryPath {
  readonly #path;

  constructor(path) {
    this.#path = path;
  }

  get path() {
    return this.#path;
  }

  generatePath(params) {
    return generatePath(this.#path, params);
  }
}
