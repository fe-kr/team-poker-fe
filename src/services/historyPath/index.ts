import { generatePath } from 'react-router-dom';

class HistoryPath {
  _path;

  constructor(path) {
    this._path = path;
  }

  get path() {
    return this._path;
  }

  generatePath(params) {
    return generatePath(this._path, params);
  }
}

export default HistoryPath;
