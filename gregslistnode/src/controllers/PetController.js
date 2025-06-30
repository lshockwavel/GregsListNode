import { petsService } from "../services/PetService.js";
import BaseController from "../utils/BaseController.js";



export class PetController extends BaseController {
  constructor() {
    super('api/pets')
    this.router.get('/', this.getPets);
    this.router.get('/pets', this.getAllPets);
    this.router.get('/:petId', this.getOnePet);
  }

  async getAllPets(request, response, next) {
    try {
      const pets = await petsService.getAllPets();
      response.send(pets);
    } catch (error) {
      next(error);
    }
  }

  async getOnePet(request, response, next) {

    try {
      const petId = request.params.petId;
      console.log('getting', petId);

      const pet = await petsService.getOnePet(petId);
      response.sent(pet);
    } catch (error) {
      next(error);
    }
  }

  async getPets(request, response, next) {
    try {
      const query = request.query;
      console.log("??", query);

      const pets = await petsService.getPets(query);
      response.send(pets);

    } catch (error) {
      next(error);
    }
  }
}