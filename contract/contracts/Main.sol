// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Tamagotchi is ERC721 {
    struct Pet {
        string name;
        uint256 birthDay;
        uint256 experience;
        uint256 health;
        address owner;
        uint256 mood;
        uint256 hunger;
    }

    mapping(uint256 => Pet) public pets;
    mapping(address => bool) public users;

    uint256 private petId;

    event PetCreated(
        uint256 indexed tokenId,
        string name,
        uint256 birthDay,
        address owner
    );
    event PetTransferred(uint256 indexed tokenId, address from, address to);
    event PetFed(uint256 indexed tokenId, uint256 hunger);
    event PetPlayed(uint256 indexed tokenId, uint256 mood);
    event PetHealthUpdated(uint256 indexed tokenId, uint256 health);

    constructor() ERC721("Tamagotchi", "TAMA") {}

    function createPet(
        string memory _name,
        uint256 _birthDay,
        uint256 _experience,
        uint256 _health
    ) external {
        require(!users[msg.sender], "You can only create one pet");

        petId++;
        Pet storage pet = pets[petId];
        pet.name = _name;
        pet.birthDay = _birthDay;
        pet.experience = _experience;
        pet.health = _health;
        pet.owner = msg.sender;

        _mint(msg.sender, petId);
        users[msg.sender] = true;

        emit PetCreated(petId, _name, _birthDay, msg.sender);
    }

    function transferPet(uint256 _tokenId, address _to) external {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "You don't own the pet"
        );

        Pet storage pet = pets[_tokenId];
        address from = pet.owner;
        pet.owner = _to;

        _transfer(from, _to, _tokenId);
        emit PetTransferred(_tokenId, from, _to);
    }

    function feedPet(uint256 _tokenId, uint256 _hunger) external {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "You don't own the pet"
        );

        Pet storage pet = pets[_tokenId];
        pet.hunger += _hunger;
        emit PetFed(_tokenId, pet.hunger);
    }

    function playWithPet(uint256 _tokenId, uint256 _mood) external {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "You don't own the pet"
        );

        Pet storage pet = pets[_tokenId];
        pet.mood += _mood;
        emit PetPlayed(_tokenId, pet.mood);
    }

    function updatePetHealth(uint _tokenId, uint _health) external {
        require(
            _isApprovedOrOwner(msg.sender, _tokenId),
            "You don't own the pet"
        );

        Pet storage pet = pets[_tokenId];
        pet.health = _health;
        emit PetHealthUpdated(_tokenId, pet.health);
    }

    // Addiktional game features (competitions, health care, etc.) can be added here

    // function _isApprovedOrOwner(
    //     address _spender,
    //     uint256 _tokenId
    // ) internal view returns (bool) {
    //     return
    //         _spender == ownerOf(_tokenId) ||
    //         getApproved(_tokenId) == _spender ||
    //         isApprovedForAll(ownerOf(_tokenId), _spender);
    // }
}
