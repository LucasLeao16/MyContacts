/* eslint-disable import/no-anonymous-default-export */

import CategoryMapper from './mappers/CategoryMapper';
import HttpClient from './utils/HttpClient';

class CategoriesService {
  constructor() {
    this.httpClient = new HttpClient('http://localhost:3001');
  }

  async listCategories(signal) {
    const categories = await this.httpClient.get(`/categories`, { signal });
    return categories.map((cateogry) => CategoryMapper.toDomain(cateogry));
  }
}
export default new CategoriesService();
