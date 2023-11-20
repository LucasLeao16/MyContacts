const CategoriesRepository = require("../repositories/CategoryRepository");
class CategoryController {
  async index(request, response) {
    const categories = await CategoriesRepository.findAll();
    response.json(categories);
  }
  async show(request, response) {
    //Obter UM registro
    const { id } = request.params;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid category id" });
    }
    const contact = await CategoriesRepository.FindById(id);
    if (!contact) {
      return response.status(404).json({ error: "User not found!" });
    }
    response.json(contact);
  }
  async store(request, response) {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }
    const category = await CategoriesRepository.create({ name });
    response.status(201).json(category);
  }
  async update(request, response) {
    //editar registros
    const { id } = request.params;
    const { name } = request.body;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid category id" });
    }
    const categoryExists = await CategoriesRepository.FindById(id);
    if (!categoryExists) {
      return response.status(404).json({ error: " Category not found" });
    }
    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }

    const contact = await CategoriesRepository.update(id, name);
    response.json(contact);
  }
  async delete(request, response) {
    //Deletar um registro
    const { id } = request.params;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid category id" });
    }
    await CategoriesRepository.delete(id);
    response.sendStatus(204);
  }
}
module.exports = new CategoryController();
