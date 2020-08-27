import { Schema, model, Model, Document } from 'mongoose'

interface UserAttrs {
  email: string
  password: string
}

interface UserModel extends Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc
}

interface UserDoc extends Document {
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

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs)

const User = model<UserDoc, UserModel>('User', userSchema)

export { User }
