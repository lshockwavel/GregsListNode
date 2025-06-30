import { housesService } from "../services/HouseService.js";
import BaseController from "../utils/BaseController.js";


export class HouseController extends BaseController {
  constructor() {
    super('api/houses')
    this.router.get('/', this.getHouses);
    this.router.get('/houses', this.getAllHouses);
    this.router.get('/:houseId', this.getOneHouse);
  }


  async getHouses(request, response, next) {
    try {
      const query = request.query;
      console.log("??", query);

      const houses = await housesService.getHouses(query);
      response.send(houses);

    } catch (error) {
      next(error);
    }
  }

  async getAllHouses(request, response, next) {
    try {
      const houses = await housesService.getAllHouses();
      response.send(houses);
    } catch (error) {
      next(error);
    }
  }

  async getOneHouse(request, response, next) {
    try {
      const houseId = request.params.houseId;
      console.log('getting', houseId);

      const house = await housesService.getOneHouse(houseId);
      response.send(house);
    } catch (error) {
      next(error);
    }
  }

}