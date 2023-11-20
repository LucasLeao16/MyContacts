/* eslint-disable import/no-anonymous-default-export */
class CategoryMapper {
  toDomain(persistenceCategory) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}
export default new CategoryMapper();
