// eslint-disable-next-line import/no-named-as-default
import BaseModel from './BaseModel';

class Letter extends BaseModel {
  static get idColumn() {
    return 'id';
  }

  static get tableName() {
    return 'letters';
  }
}

export default Letter;
