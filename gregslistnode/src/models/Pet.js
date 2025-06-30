import { Schema } from "mongoose";



export const PetSchema = new Schema({
  name: { type: String, minLength: 1, maxLength: 100, required: true },
  imgUrl: { type: String, minLength: 1, maxLength: 1000, required: true },
  age: { type: Number, min: 0, max: 5000, required: true },
  likes: [{ type: String, required: true }],
  isVaccinated: { type: Boolean, required: true, default: false },
  status: { type: String, enum: ['adopted', 'adoptable'], required: true, default: 'adoptable' },
  species: { type: String, enum: ['cat', 'dog', 'bird', 'capybara'], required: true, default: 'dog' },
  creatorId: { type: Schema.ObjectId, ref: 'Account', required: true }
}, { toJSON: { virtuals: true } })

PetSchema.virtual('creator', {
  localField: 'creatorId',
  ref: 'Account',
  foreignField: '_id',
  justOne: true
}) //This is just make sure the Creator Section sees as a single array or only selects the first one (since we already know there will be only one)