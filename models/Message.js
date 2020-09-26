const { Schema, model } = require('mongoose')

const messageSchema = new Schema(
  {
		room: {
			type: String,
			required: true,
		},
    nickname: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Message', messageSchema)
