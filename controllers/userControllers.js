const fs = require('fs').promises
const { handleContactsValidator } = require('../utils/fileValidator.js')
const uuid = require('uuid').v5
exports.createUserContacts = async (req, res) => {
  try {
    const { error, value } = handleContactsValidator(req.body)
    const { name, email, phone, id } = value

    if (error) return new IdError(403, error.details[0].message)
    const userNumbers = JSON.parse(
      await fs.readFile('./data/listOfContacts.json'),
    )
    const addUser = {
      name,
      email,
      phone,
      id: req.id,
    }
    userNumbers.push(addUser)
    await fs.writeFile(
      './data/listOfContacts.json',
      JSON.stringify(userNumbers),
    )
    res.status(201).json({
      contact: addUser,
    })
  } catch (error) {
    console.log(error)
  }
}
exports.getContactsList = async (req, res) => {
  try {
    const listContacts = JSON.parse(
      await fs.readFile('./data/listOfContacts.json'),
    )
    res.status(201).json({
      listContacts,
    })
  } catch (error) {
    console.log(error)
  }

  //console.log(req)
}
exports.getContactsIndex = async (req, res) => {
  const { error, value } = handleContactsValidator(req.body)
  try {
    const listContacts = JSON.parse(
      await fs.readFile('./data/listOfContacts.json'),
    )
    const { id } = req.params
    const findIdx = listContacts.find((el) => el.id === id)
    res.json(findIdx)
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
}
exports.deleteContactById = async (req, res) => {
  try {
    const { contactsArr } = req
    if (contactsArr) return res.status(200).json({ message: 'contact deleted' })
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
}
exports.updVariables = async (req, res) => {
  try {
    const { contactGrouped } = req
    res.status(200).json({ contactGrouped })
  } catch (error) {
    const err = new ErrorMessage()
    console.log(err)
  }
}
