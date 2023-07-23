import { ethers, upgrades } from "hardhat";

async function main() {
  // Deploying main contract
  const Ethogochi = await ethers.getContractFactory("Ethogochi");
  const ethogochiInstance = await upgrades.deployProxy(Ethogochi, [], {
    initializer: "initialize",
  });
  const ethogochi = await ethogochiInstance.waitForDeployment();
  const ethogochiAddress = await ethogochiInstance.getAddress();
  console.log("Ethogochi --> " + ethogochiAddress);

  // Depoloying race competition
  const raceCompetitionInstance = await ethers.deployContract("RaceCompetition");
  const raceCompetition = await raceCompetitionInstance.waitForDeployment();
  const raceCompetitionAddress = await raceCompetitionInstance.getAddress();
  console.log("RaceCompetition --> " + raceCompetitionAddress);

  await ethogochi.addCompetition(raceCompetitionAddress)

  // TODO: remove
  // checking if race competition exists
  console.log(await ethogochi.competitions(0))

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
