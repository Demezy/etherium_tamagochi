// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

import "./Pet.sol";

abstract contract Competition {
    address public immutable publisher;
    string public name;
    string public description;

    mapping(Pet => mapping(Pet => Challenge)) challenges; // challenger -> opponent -> challenge

    struct Challenge {
        Pet challenger;
        Pet opponent;
        ChallengeStatus status;
        uint stakedChallenging;
        uint stakedChallenged;
    }
    enum ChallengeStatus {
        NotDefined,
        Challenged,
        Accepted,
        Finished
    }

    enum Winner {
        Challenging,
        Challenged,
        Both
    }

    modifier ableToCompete(Pet challenger, Pet opponent) {
        require(
            challenges[challenger][opponent].status == ChallengeStatus.Accepted
        );
        _;
    }

    modifier oneOfOwners(Pet challenger, Pet opponent) {
        require(
            msg.sender == challenger.owner() || msg.sender == opponent.owner(),
            "You are not an owner of any of 2 pets"
        );
        _;
    }

    modifier ownerOf(Pet pet, string memory petStatus) {
        require(
            msg.sender == pet.owner(),
string(abi.encodePacked("You are not an owner of ", petStatus))
        );
        _;
    }

    constructor(string memory _name, string memory _description) {
        publisher = msg.sender;
        name = _name;
        description = _description;
    }

    function challenge(
        Pet challenger,
        Pet opponent
    ) public ownerOf(challenger, "challenger") {
        require(
            challenger.owner() != opponent.owner(),
            "You cannot challenge your own pets"
        );
        require(
            challenges[challenger][opponent].status ==
                ChallengeStatus.NotDefined ||
                challenges[challenger][opponent].status ==
                ChallengeStatus.Finished,
            "Challenge for this pair of pets is already defined "
        );
        challenges[challenger][opponent].status = ChallengeStatus.Challenged;
    }

    function accept(
        Pet challenger,
        Pet opponent
    ) public ownerOf(opponent, "opponent") {
        require(
            challenges[challenger][opponent].status ==
                ChallengeStatus.Challenged,
            "Not challenged"
        );
        challenges[challenger][opponent].status = ChallengeStatus.Accepted;
    }

    function reject(
        Pet challenger,
        Pet opponent
    ) public ownerOf(opponent, "opponent") {
        require(
            challenges[challenger][opponent].status ==
                ChallengeStatus.Challenged,
            "Not challenged"
        );
        challenges[challenger][opponent].status = ChallengeStatus.NotDefined;
    }

    function stake(
        Pet challenger,
        Pet opponent
    ) public payable oneOfOwners(challenger, opponent) {
        require(
            challenges[challenger][opponent].status ==
                ChallengeStatus.Challenged ||
                challenges[challenger][opponent].status ==
                ChallengeStatus.Accepted,
            "Challenge for this pair of pets is already defined "
        );
        if (challenger.owner() == msg.sender) {
            challenges[challenger][opponent].stakedChallenging += msg.value;
        } else {
            challenges[challenger][opponent].stakedChallenged += msg.value;
        }
    }

    function resetChallenge(Pet challenger, Pet opponent) private {
        challenges[challenger][opponent].stakedChallenged = 0;
        challenges[challenger][opponent].stakedChallenging = 0;
        challenges[challenger][opponent].status = ChallengeStatus.NotDefined;
    }

    // Function that should return a winner of a competition
    function compete(
        Pet challenger,
        Pet opponent
    ) public view virtual returns (Winner);

    function competeAndGetPrize(
        Pet challenger,
        Pet opponent
    ) public oneOfOwners(challenger, opponent) {
        require(
            challenges[challenger][opponent].status == ChallengeStatus.Accepted,
            "Challenge should accepted"
        );
        Winner winner = compete(challenger, opponent);
        challenges[challenger][opponent].status = ChallengeStatus.Finished;

        if (winner == Winner.Challenging) {
            challenger.owner().transfer(
                challenges[challenger][opponent].stakedChallenged +
                    challenges[challenger][opponent].stakedChallenging
            );
            resetChallenge(challenger, opponent);
        } else if (winner == Winner.Challenged) {
            opponent.owner().transfer(
                challenges[challenger][opponent].stakedChallenged +
                    challenges[challenger][opponent].stakedChallenging
            );
            resetChallenge(challenger, opponent);
        } else if (winner == Winner.Both) {
            challenger.owner().transfer(
                challenges[challenger][opponent].stakedChallenging
            );
            opponent.owner().transfer(
                challenges[challenger][opponent].stakedChallenged
            );
            resetChallenge(challenger, opponent);
        } else {
            assert(false);
        }
    }
}
