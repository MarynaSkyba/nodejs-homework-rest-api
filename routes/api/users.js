const express = require('express')
const {users: ctrl} = require('../../controllers')
const {auth, upload, validation, ctrlWrapper} = require('../../midllewares/')
 
const {joiSchema, subscriptionJoiSchema} = require('../../models/user')
const router = express.Router()


router.post("/signup", validation(joiSchema), ctrlWrapper(ctrl.signUp));
router.post("/login", validation(joiSchema), ctrlWrapper(ctrl.login));
router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));
router.get("/logout", auth, ctrlWrapper(ctrl.logOut))
// router.patch("/:contactId", auth, validation(subscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscription))
router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar))
router.get("/verify/:verificationToken", ctrlWrapper(ctrl.verifyEmail))
router.post("/verify", ctrlWrapper(ctrl.resendEmail))


module.exports = router; 
