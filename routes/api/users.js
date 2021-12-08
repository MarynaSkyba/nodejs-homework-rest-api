const express = require('express')
const {users: ctrl} = require('../../controllers')
const {auth,validation, ctrlWrapper} = require('../../midllewares/')
 
const {joiSchema, subscriptionJoiSchema} = require('../../models/user')
const router = express.Router()


router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signUp));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logOut))
router.patch("/:contactId", auth, validation(subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription))

module.exports = router; 

//