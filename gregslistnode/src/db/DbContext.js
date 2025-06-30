import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account.js'
import { ValueSchema } from '../models/Value.js'
import { HouseSchema } from '../models/House.js';
import { PetSchema } from '../models/Pet.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);

  Houses = mongoose.model('House', HouseSchema);
  Pets = mongoose.model('Pet', PetSchema);

}

export const dbContext = new DbContext()
