// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "./Pet.sol";
import "./Competition.sol";
import "./Auction.sol";

contract Ethogochi is Initializable {
    address contractOwner;

    uint256 nextPetId;
    uint256 nextCompetitionId;

    mapping(uint => Pet) public pets; // petId -> pet
    mapping(uint => Competition) public competitions; // competitionId -> competition
    mapping(Pet => Auction) public auctions; // petId -> auction

    uint[32] __gap;

    modifier onlyContractOwner() {
        require(msg.sender == contractOwner);
        _;
    }

    modifier idIncrementer(uint id) {
        require(id < 2 ** 256 - 1, "Maximum number of entities is reached");
        _;
        id += 1;
    }

    function initialize() public initializer {
        contractOwner = msg.sender;
    }

    function mintPet(
        string memory _name,
        address payable petOwner
    ) public onlyContractOwner idIncrementer(nextPetId) returns (Pet) {
        uint id = nextPetId;
        nextPetId += 1;
        pets[id] = new Pet(_name, block.timestamp, nextPetId, petOwner);
        uint strenthBoost = uint(
            keccak256(
                abi.encodePacked(block.prevrandao, block.timestamp, pets[id].owner())
            )
        ) % 100;
        uint speedBoost = uint(
            keccak256(
                abi.encodePacked(
                    block.timestamp,
                    pets[id].name(),
                    pets[id].birthDay(),
                    block.prevrandao
                )
            )
        ) % 100;
        pets[id].setStrenght(strenthBoost);
        pets[id].setSpeed(speedBoost);
        return pets[id];
    }

    function breedPets(
        string memory childName,
        Pet pet1,
        Pet pet2
    ) public returns (Pet) {
        Pet newPet = mintPet(childName, payable(msg.sender));
        newPet.setStrenght(
            (pet1.strenth() + pet2.strenth() + newPet.strenth()) / 3
        );
        newPet.setSpeed(
            (pet1.strenth() + pet2.strenth() + newPet.strenth()) / 3
        );
        pet1.makeHappy();
        pet2.makeHappy();
        return newPet;
    }

    function addCompetition(
        Competition competition
    ) public idIncrementer(nextCompetitionId) onlyContractOwner {
        competitions[nextCompetitionId] = competition;
        nextCompetitionId += 1;
    }

    function createAuction(
        Pet pet,
        uint startBid,
        uint lastsFor
    ) public returns (Auction) {
        require(msg.sender == pet.owner(), "Only pet owner can sell it");
        Auction auction = new Auction(pet, pet.owner(), startBid, lastsFor);
        pet.changeOwner(payable(address(this)));
        auctions[pet] = auction;
        pet.makeUnhappy();
        return auction;
    }
    function transferPetToAuctionWinner(Pet pet) public {
      require(auctions[pet].ended(), "Auction is not started or not ended");
      address payable winner = auctions[pet].getWinner();
      pet.changeOwner(winner);
    }

}
