// import { ethers } from "ethers";

import { Web3 } from "web3";
import EthogochiArtifact from "./contracts/Ethogochi.sol/Ethogochi.json";
import PetArtifact from "./contracts/Pet.sol/Pet.json";
import PetStats from "../pet_stats/pet_stats";
import PetData from "../pet_repository/domain/pet_data";

export function getContract(contractAddress: string, jsonRpcUrl: string) {
  const web3 = new Web3(jsonRpcUrl);
  const contract = new web3.eth.Contract(
    EthogochiArtifact.abi,
    contractAddress,
  );
  // const provider = new ethers.JsonRpcProvider(jsonRpcUrl);
  // const contract = new ethers.Contract(
  //   contractAddress,
  //   ContractArtifact.abi,
  //   provider,
  // );
  return { web3, contract };
}

const { web3, contract } = getContract(
  "0x606a48B856189C7AC47b594752de5223f45caC64",
  "https://polygon-mumbai.g.alchemy.com/v2/JD9HMoQaFxS1HmgXOgS9sTh44Vl1xf6r",
);

export async function addCompetition(
  competitionAddress: string,
): Promise<void> {
  await contract.methods.addCompetition(competitionAddress).call();
}

export async function breedPets(
  childName: string,
  pet1Id: string,
  pet2Id: string,
  account: string,
): Promise<string> {
 // const providersAccounts = await web3.eth.getAccounts();
  const parent1 = await getPetById(parseInt(pet1Id));
  const parent2 = await getPetById(parseInt(pet2Id));
  // const defaultAccount = providersAccounts[0];
  const tx = await contract.methods.breedPets(
    childName,
    parent1.address,
    parent2.address,
  ).send(
    {
      from: account,
      gas: "1000000",
      gasPrice: "10000000000",
    },
  );
  return tx.blockHash;
  // await tx.wait(); // Wait for the transaction to be mined
  // return tx.hash; // Return the transaction hash
}

export async function getPetById(
  petId: number,
): Promise<PetData & { address: string }> {
  const petContractAddress: string = await contract.methods.pets(petId).call();
  const petContract = new web3.eth.Contract(
    PetArtifact.abi,
    petContractAddress,
  );
  const m = petContract.methods;
  return {
    id: await m.id().call(),
    owner: await m.owner().call(),
    name: await m.name().call(),
    birthDay: await m.birthDay().call(),
    experience: await m.level().call(),
    health: await m.health().call(),
    mood: await m.happiness().call(),
    hunger: await m.hunger().call(),
    address: petContractAddress,
  };
}
