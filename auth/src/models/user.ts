import { Schema, model } from 'mongoose'

interface UserAttrs {
  email: string
  password: string
}

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const User = model('User', userSchema)

const buildUser = (attrs: UserAttrs) => new User(attrs)

export { User, buildUser }
