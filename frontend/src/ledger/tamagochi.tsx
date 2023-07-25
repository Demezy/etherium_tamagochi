import { ethers } from "ethers";
import CotractArtifact from "./contracts/Ethogochi.sol/Ethogochi.json";

export function getContract(contractAddress: string, jsonRpcUrl: string) {
  const provider = new ethers.JsonRpcProvider(jsonRpcUrl);
  const contract = new ethers.Contract(
    contractAddress,
    CotractArtifact.abi,
    provider,
  );
  return contract;
}

const contract = getContract("", "");


export async function addCompetition(competitionAddress: string): Promise<void> {
  await contract.addCompetition(competitionAddress);
}

export async function breedPets(childName: string, pet1Address: string, pet2Address: string): Promise<string> {
  const tx = await contract.breedPets(childName, pet1Address, pet2Address);
  await tx.wait(); // Wait for the transaction to be mined
  return tx.hash; // Return the transaction hash
}

// export async function 

