import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";

require('dotenv').config()


const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
if (ALCHEMY_API_KEY == undefined){
  throw "Alchemy api key is not provided";
}

const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY;
if (MUMBAI_PRIVATE_KEY == undefined){
  throw "Mumbai private key is not provided";
}

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [MUMBAI_PRIVATE_KEY],
    },
  },
};

export default config;
