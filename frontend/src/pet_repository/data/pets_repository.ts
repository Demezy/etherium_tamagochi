import { getPetById } from "../../ledger/tamagochi";
import PetData from "../domain/pet_data";

const PetsRepository = {
  async petById(id: number): Promise<PetData> {
    // return {
    //   owner: "owner address placeholder",
    //   name: "pet name example",
    //   birthDay: Date.now(),
    //   experience: 0,
    //   health: 100,
    //   hunger: 100,
    //   mood: 100,
    // };
    const petData = await getPetById(id) ;
    return petData as PetData;
  },
};

export default PetsRepository;
