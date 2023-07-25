interface Pet {
  owner(): string;
}

interface Competition {
  challenges: Map<Pet, Map<Pet, Challenge>>;
  name: string;
  description: string;
  challenge(challenger: Pet, opponent: Pet): void;
  accept(challenger: Pet, opponent: Pet): void;
  reject(challenger: Pet, opponent: Pet): void;
  stake(challenger: Pet, opponent: Pet): void;
  compete(challenger: Pet, opponent: Pet): Winner;
  competeAndGetPrize(challenger: Pet, opponent: Pet): void;
}

interface Challenge {
  challenger: Pet;
  opponent: Pet;
  status: ChallengeStatus;
  stakedChallenging: number;
  stakedChallenged: number;
}

enum ChallengeStatus {
  NotDefined,
  Challenged,
  Accepted,
  Finished,
}

enum Winner {
  Challenging,
  Challenged,
  Both,
}

class CompetitionContract implements Competition {
  public challenges: Map<Pet, Map<Pet, Challenge>>;
  public name: string;
  public description: string;

  constructor(name: string, description: string) {
    this.challenges = new Map<Pet, Map<Pet, Challenge>>();
    this.name = name;
    this.description = description;
  }

  challenge(challenger: Pet, opponent: Pet): void {
    if (!this.challenges.has(challenger)) {
      this.challenges.set(challenger, new Map<Pet, Challenge>());
    }
    const challengerChallenges = this.challenges.get(challenger);
    if (!challengerChallenges.has(opponent)) {
      challengerChallenges.set(opponent, {
        challenger,
        opponent,
        status: ChallengeStatus.NotDefined,
        stakedChallenging: 0,
        stakedChallenged: 0,
      });
    }
    const challenge = challengerChallenges.get(opponent);
    if (
      challenge.status !== ChallengeStatus.NotDefined &&
      challenge.status !== ChallengeStatus.Finished
    ) {
      throw new Error("Challenge for this pair of pets is already defined");
    }
    challenge.status = ChallengeStatus.Challenged;
  }

  accept(challenger: Pet, opponent: Pet): void {
    const challenge = this.getChallenge(challenger, opponent);
    if (challenge.status !== ChallengeStatus.Challenged) {
      throw new Error("Not challenged");
    }
    challenge.status = ChallengeStatus.Accepted;
  }

  reject(challenger: Pet, opponent: Pet): void {
    const challenge = this.getChallenge(challenger, opponent);
    if (challenge.status !== ChallengeStatus.Challenged) {
      throw new Error("Not challenged");
    }
    this.resetChallenge(challenger, opponent);
  }

  stake(challenger: Pet, opponent: Pet): void {
    const challenge = this.getChallenge(challenger, opponent);
    if (
      challenge.status !== ChallengeStatus.Challenged &&
      challenge.status !== ChallengeStatus.Accepted
    ) {
      throw new Error("Challenge for this pair of pets is already defined");
    }
    if (challenger.owner() === msg.sender) {
      challenge.stakedChallenging += msg.value;
    } else {
      challenge.stakedChallenged += msg.value;
    }
  }

  compete(challenger: Pet, opponent: Pet): Winner {
    // TODO: Implement the competition logic here
    // You need to determine the winner based on the provided rules
    return Winner.Challenging;
  }

  competeAndGetPrize(challenger: Pet, opponent: Pet): void {
    const challenge = this.getChallenge(challenger, opponent);
    if (challenge.status !== ChallengeStatus.Accepted) {
      throw new Error("Challenge should be accepted");
    }
    const winner = this.compete(challenger, opponent);
    challenge.status = ChallengeStatus.Finished;

    switch (winner) {
      case Winner.Challenging:
        challenger.owner().transfer(
          challenge.stakedChallenged + challenge.stakedChallenging
        );
        this.resetChallenge(challenger, opponent);
        break;
      case Winner.Challenged:
        opponent.owner().transfer(
          challenge.stakedChallenged + challenge.stakedChallenging
        );
        this.resetChallenge(challenger, opponent);
        break;
      case Winner.Both:
        challenger.owner().transfer(challenge.stakedChallenging);
        opponent.owner().transfer(challenge.stakedChallenged);
        this.resetChallenge(challenger, opponent);
        break;
      default:
        throw new Error("Invalid winner");
    }
  }

  private getChallenge(challenger: Pet, opponent: Pet): Challenge {
    const challengerChallenges = this.challenges.get(challenger);
    if (
      !challengerChallenges ||
      !challengerChallenges.has(opponent)
    ) {
      throw new Error("Challenge not found");
    }
    return challengerChallenges.get(opponent);
  }

  private resetChallenge(challenger: Pet, opponent: Pet): void {
    const challenge = this.getChallenge(challenger, opponent);
    challenge.stakedChallenged = 0;
    challenge.stakedChallenging = 0;
    challenge.status = ChallengeStatus.NotDefined;
  }
}

