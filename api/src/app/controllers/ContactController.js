const ContactRepository = require("../repositories/ContactRepository");
const isValidUUID = require("../../utils/isValidUUUID");
class ContactController {
  async index(request, response) {
    //Listar todos os registros
    const { orderBy } = request.query;
    const contacts = await ContactRepository.FindAll(orderBy);

    response.json(contacts);
  }
  async show(request, response) {
    //Obter UM registro
    const { id } = request.params;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid contact id" });
    }
    const contact = await ContactRepository.FindById(id);
    if (!contact) {
      return response.status(404).json({ error: "Contact not found!" });
    }
    response.json(contact);
  }
  async store(request, response) {
    //Criar novo registro
    const { name, email, phone, category_id } = request.body;
    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }
    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: "Invalid category" });
    }
    if (email) {
      const contactExists = await ContactRepository.findByEmail(email);
      if (contactExists) {
        return response
          .status(400)
          .json({ error: "This e-mail is already in use" });
      }
    }

    const contact = await ContactRepository.create({
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    response.status(201).json(contact);
  }
  async update(request, response) {
    //editar registros
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid contact id" });
    }
    if (category_id && !isValidUUID(category_id)) {
      return response.status(400).json({ error: "Invalid category" });
    }
    if (!name) {
      return response.status(400).json({ error: "Name is required" });
    }
    const contactExists = await ContactRepository.FindById(id);
    if (!contactExists) {
      return response.status(404).json({ error: " Contact not found" });
    }

    if (email) {
      const contactByEmail = await ContactRepository.findByEmail(email);
      if (contactByEmail && contactByEmail.id != id) {
        return response
          .status(400)
          .json({ error: "This e-mail is already in use" });
      }
    }
    const contact = await ContactRepository.update(id, {
      name,
      email: email || null,
      phone,
      category_id: category_id || null,
    });
    response.json(contact);
  }

  async delete(request, response) {
    //Deletar um registro
    const { id } = request.params;
    if (!isValidUUID(id)) {
      return response.status(400).json({ error: "Invalid contact id" });
    }
    await ContactRepository.delete(id);
    response.sendStatus(204);
  }
}
module.exports = new ContactController();
