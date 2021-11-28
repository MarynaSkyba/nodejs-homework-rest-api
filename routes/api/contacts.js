const express = require('express')
const {contacts: ctrl} = require('../../controllers/')
const {validation, ctrlWrapper} = require('../../midllewares/')
const {favoriteJoiSchema, joiSchema} = require ('../../models/contact')

const router = express.Router()

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:contactId", ctrlWrapper(ctrl.getContactById) )

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.addContact))

router.put("/:contactId", validation(joiSchema), ctrlWrapper(ctrl.updateContact))

router.patch('/:contactId/favorite', validation(favoriteJoiSchema), ctrlWrapper(ctrl.updateStatusContact))

router.delete('/:contactId', ctrlWrapper(ctrl.removeContact))




module.exports = router
