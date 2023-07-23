// SPDX-License-Identifier: GPL-3
pragma solidity ^0.8.0;

import "./Pet.sol";
import "./Competition.sol";

/**
 * This is a basic implementation of a racing game as a competition that is
 * supported by `Ethogochi` smart contract
 */
contract RaceCompetition is
    Competition(
        "Need for Speed: Most Cute",
        "Simple racing comChallengingion, wins the one with the highest speed "
    )
{
    function compete(
        Pet challenger,
        Pet oppenent
    ) public view override returns (Winner) {
        if (challenger.speed() >= oppenent.speed()) {
            return Winner.Challenging;
        }
        return Winner.Challenged;
    }
}
