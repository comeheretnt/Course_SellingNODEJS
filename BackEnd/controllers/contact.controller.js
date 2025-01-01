const { Contact } = require('../models');

exports.createContact = async (req, res) => {
  try {
    const { name, email, webAdress, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const contact = await Contact.create({
      name,
      email,
      webAdress,
      message,
    });

    res.status(201).json({ message: 'Contact created successfully.', contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while creating the contact.', error: error.message });
  }
};

exports.getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching contacts.', error: error.message });
  }
};

exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while fetching the contact.', error: error.message });
  }
};

exports.updateContact = async (req, res) => {
  try {
    const { name, email, webAdress, message } = req.body;
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    contact.name = name || contact.name;
    contact.email = email || contact.email;
    contact.webAdress = webAdress || contact.webAdress;
    contact.message = message || contact.message;

    await contact.save();
    res.status(200).json({ message: 'Contact updated successfully.', contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the contact.', error: error.message });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found.' });
    }

    await contact.destroy();
    res.status(200).json({ message: 'Contact deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while deleting the contact.', error: error.message });
  }
};