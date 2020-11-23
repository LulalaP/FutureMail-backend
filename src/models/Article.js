// eslint-disable-next-line import/no-named-as-default
import BaseModel from './BaseModel';

class Article extends BaseModel {
  static get idColumn() {
    return 'id';
  }

  static get tableName() {
    return 'articles';
  }
}

export default Article;
