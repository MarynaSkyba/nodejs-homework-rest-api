const {Schema, model} = require('mongoose')
const Joi = require('joi');
const mongoosePaginate = require('mongoose-paginate-v2');


const contactSchema = new Schema(
    {
      name: {
        type: String,
        required: [true, 'Set name for contact'],
      },
      email: {
        type: String,
      },
      phone: {
        type: String,
      },
      favorite: {
        type: Boolean,
        default: false,
      },
      owner: { 
        type: Schema.Types.ObjectId,
        ref: 'user',
      }
    }, {versionKey: false, timestamps: true}
  ) 

  const joiSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .required(),
    phone: Joi.string()
      .pattern(/[0-9]/)
      .required(),
    favorite: Joi.boolean().valid(false),
  })

  
  const favoriteJoiSchema = Joi.object({
    favorite: Joi.bool().required(),
  })

contactSchema.plugin(mongoosePaginate)

  const Contact = model("contact", contactSchema)

  module.exports = {
    Contact,
    joiSchema,
    favoriteJoiSchema
  }