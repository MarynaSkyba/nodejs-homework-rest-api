const {User} = require('../../models')

const updateSubscription = async (req, res) => {
    const {contactId} = req.params;
    const {subscription} =req.body
    const result = await User.findByIdAndUpdate(contactId, {subscription}, {new: true});
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        "message": "Not found"
    })

    res.json({
      status: "success",
      code: 200,
      message: "User subscription is updated",
      data:{
        result 
      }
    })
  }}

  module.exports = updateSubscription