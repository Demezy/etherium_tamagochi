// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

import "./Pet.sol";

contract Auction {
    Pet public petOnAuction;
    address payable public seller;

    uint public lastsFor;
    uint public endTime;
    bool public started;

    address public highestBidder;
    uint public highestBid;

    mapping(address => uint) public bids;

    modifier onlySeller() {
        require(msg.sender == seller);
        _;
    }

    constructor(
        Pet pet,
        address payable _seller,
        uint _startingBid,
        uint _lastsFor
    ) {
        petOnAuction = pet;
        seller = _seller;
        highestBid = _startingBid;
        lastsFor = _lastsFor;
    }

    modifier auctionStarted() {
        require(started, "Auction is not yet started");
        _;
    }

    function start() public onlySeller {
        require(!started, "Auction was already started");
        require(msg.sender == seller, "Auction can be started only by seller");
        started = true;
        endTime = block.timestamp + lastsFor;
    }

    function bid() external payable auctionStarted {
        require(block.timestamp < endTime, "Auction already ended");
        require(
            msg.value + bids[msg.sender] > highestBid,
            "Highest bid was not beaten"
        );
        bids[msg.sender] += msg.value;
        highestBidder = msg.sender;
        highestBid = bids[msg.sender];
    }

    function withdraw() external {
        require(
            msg.sender != highestBidder,
            "You can't withdraw while being the highest bidder"
        );
        uint amount = bids[msg.sender];
        bids[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
    }

    function getWinner()
        external
        view
        auctionStarted
        returns (address payable)
    {
        require(block.timestamp >= endTime, "Auction is not yet ended");
        if (highestBidder == address(0)) {
            return seller;
        } else {
            return payable(highestBidder);
        }
    }

    function ended() external view returns (bool) {
        if (started == false || block.timestamp <= endTime) {
            return false;
        } else {
            return true;
        }
    }
}
