const {Conflict} = require("http-errors");
// const bcrypt = require('bcryptjs');
const {User} = require('../../models');



const signUp = async (req, res) => {
const {email, password, subscription} = req.body;
const user = await User.findOne({email});
if (user){
    throw new Conflict ("Email in use")
}
const newUser = new User({email, subscription});
newUser.setPassword(password);
newUser.save();
// const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
// const result = await User.create({email, password, subscription});
res.status(201).json({
    status: "created",
    code: 201,
    data: {
      user: {
          email,
          subscription,
      }
    }
})
}


module.exports = signUp;


