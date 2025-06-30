import { dbContext } from "../db/DbContext.js"


class PetService {

  async getAllPets() {
    const pets = await dbContext.Pets.find().populate('creator', 'name email');
    return pets;

  }

  async getOnePet(petId) {
    const pet = await dbContext.Pets.findById(petId).populate('creator', 'name email');
    if (!pet) throw new Error(`There is no pet with that Id: ${petId}`);
    return pet;
  }

  async getPets(query) {

    const sortBy = query.order;
    delete query.order; //Is this a way to clear out memory? I thought JS is a GC

    const pageSize = 5;
    const page = query.page || 1;
    delete query.page;
    const skipAmount = (page - 1) * pageSize;

    const search = query.search;
    delete query.search;
    if (search) query.description = { $regex: new RegExp(search, 'ig') }; //in Regex method, 'i' makes it case insensitive & 'g' makes it global for the word could appear anywhere within the description string.


    console.log('finding by ', query);
    console.log('sorting by ', sortBy);
    console.log('on page: ', page, skipAmount);

    const pets = await dbContext.Pets.find(query).sort(sortBy + ' createdAt').skip(skipAmount).limit(pageSize).populate('creator', 'name email');

    const resultCount = await dbContext.Pets.countDocuments(query);

    return {
      query,
      sortBy,
      pageSize: 5,
      page: parseInt(page),
      totalPages: Math.ceil(resultCount / pageSize),
      count: resultCount,
      results: pets,
    }
  }

}

export const petsService = new PetService();