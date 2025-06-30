import { dbContext } from "../db/DbContext.js"


class HousesService {

  //Get House Method for specific method
  async getHouses(query) {

    //Getting the sortBy if there is one
    const sortBy = query.order;
    delete query.order; //REVIEW If you delete sortBy (somehow), would this be a case of pass by reference and clear this out too?

    //Getting the page format set up (5 per page)
    const pageSize = 5;
    const page = query.page || 1;
    delete query.page;
    const skipAmount = (page - 1) * pageSize; //This helps set how many to skip in a given page

    //setting up the description search with using words that contain it
    const search = query.search;
    delete query.search;
    if (search) query.description = { $regex: new RegExp(search) }; // IF there is a search query, put it in a regex form to search for any word that contains that search.

    console.log('finding by', query);
    console.log('sorting by ', sortBy);
    console.log('on page:', page, skipAmount);

    //Results of the search after finding the criteria in the find method, Sorts with the order given & also createdAt, tells how many to skip by with the page number, limit how many will show with PageSize,
    //and populate the 'creator' with just name, email, and picture section.
    //REVIEW populate is basically a selector of the fields and then tells what we want to show but don't have to worry about house data?
    const houses = await dbContext.Houses.find(query).sort(sortBy + ' createdAt').skip(skipAmount).limit(pageSize).populate('creator', 'name email picture'); //REVIEW the ' createdAt' is needed to help keep it sorted by 2 variables to keep it consistent all the time?

    //Gets the total count on houses based on the query
    //REVIEW: Just wondering if the search criteria is possibly thrown off or is it due to the update query.description in line 22?
    const resultCount = await dbContext.Houses.countDocuments(query);

    //This will return with the given information in the response page. This will include the query, sort, page #, total count, and results.
    return {
      query,
      sortBy,
      pageSize: 5,
      page: parseInt(page),
      totalPages: Math.ceil(resultCount / pageSize),
      count: resultCount,
      results: houses,
    }
  }

  //Get House Method to get all houses
  //REVIEW: I initially call this method getHouses as well (trying the overload method) but it seems to default to the one above? Does Javascript not do that or am I doing something wrong?
  async getAllHouses() {
    const houses = await dbContext.Houses.find().populate('creator', 'name email picture');
    return houses;
  }

  //Get a specific house by House Id
  async getOneHouse(houseId) {
    const house = await dbContext.Houses.findById(houseId).populate('creator', 'name email picture');
    if (!house) throw new Error(`This is no house with that Id: ${houseId}`);
    return house;
  }
}

export const housesService = new HousesService();