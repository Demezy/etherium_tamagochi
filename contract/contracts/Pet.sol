// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

contract Pet {
    address public owningContract;
    // backed in, mutable
    string public name;
    uint public birthDay;
    uint public id;
    // metadata, immutable
    address payable public owner;
    // stats, immutable
    uint public level;
    uint public health;
    uint public happiness;
    uint public hunger;
    uint public energy;

    // stats, mutable
    uint public strenth;
    uint public speed;

    mapping(string => uint) public skillLevel;

    modifier onlyOwningContract() {
        require(msg.sender == owningContract);
        _;
    }

    constructor(
        string memory _name,
        uint _birthDay,
        uint _id,
        address payable _owner
    ) {
        owningContract = msg.sender;
        name = _name;
        birthDay = _birthDay;
        id = _id;
        owner = _owner;
        happiness = 100;
        health = 100;
        energy = 100;
    }

    function changeOwner(address payable newOwner) public onlyOwningContract{
      owner = newOwner;
    }

    function setStrenght(uint value) public onlyOwningContract {
        strenth = value;
    }

    function setSpeed(uint value) public onlyOwningContract {
        speed = value;
    }

    function age() public view returns (uint) {
        return (block.timestamp - birthDay) / 365 days;
    }

    function levelUp() public onlyOwningContract {
        level += 1;
    }

    function feed() public onlyOwningContract {
        hunger = add100Bounded(hunger, 1);
    }

    function makeHungry() public onlyOwningContract{
      hunger = subtract(hunger, 1);
    }

    function makeHappy() public onlyOwningContract {
        happiness = add100Bounded(happiness, 1);
    }
    function makeUnhappy() public onlyOwningContract {
        happiness = subtract(happiness, 1);
    }

    function rest() public onlyOwningContract {
        energy = add100Bounded(energy, 1);
    }

    function makeTired() public onlyOwningContract {
        energy = subtract(energy, 1);
    }

    function heal() public onlyOwningContract {
        health = add100Bounded(health, 1);
    }

    function hurt() public onlyOwningContract {
        health = subtract(health, 1);
    }

    function add100Bounded(uint a, uint b) public pure returns (uint) {
        uint result = a + b;
        require(result <= 100, "The value can't exceed 100");
        return result;
    }

    function subtract(uint a, uint b) public pure returns (uint){
      require(a >= b, "Value can't be less then 0");
      return a-b;
    }
}
