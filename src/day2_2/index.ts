import fs from "fs";
import assert from "assert";
import path from "path";

type EncryptedElfInput = "A" | "B" | "C";
type EncryptedOutcome = "X" | "Y" | "Z";

type Input = "ROCK" | "PAPER" | "SCISSORS";
type Outcome = "LOSE" | "DRAW" | "WIN";

type Game = [Input, Outcome];

function decryptInput(input: EncryptedElfInput): Input {
  switch (input) {
    case "A": {
      return "ROCK";
    }
    case "B": {
      return "PAPER";
    }
    case "C": {
      return "SCISSORS";
    }
    default: {
      throw new Error("Invalid input");
    }
  }
}

function decryptOutcome(input: EncryptedOutcome): Outcome {
  switch (input) {
    case "X": {
      return "LOSE";
    }
    case "Y": {
      return "DRAW";
    }
    case "Z": {
      return "WIN";
    }
    default: {
      throw new Error("Invalid input");
    }
  }
}

function decryptGame([elfInput, outcome]: [
  EncryptedElfInput,
  EncryptedOutcome
]): Game {
  return [decryptInput(elfInput), decryptOutcome(outcome)];
}

function getShapeScore(shape: Input): 1 | 2 | 3 {
  switch (shape) {
    case "ROCK": {
      return 1;
    }
    case "PAPER": {
      return 2;
    }
    case "SCISSORS": {
      return 3;
    }
  }
}

function getOutcomeScore(outcome: Outcome): number {
  switch (outcome) {
    case "LOSE": {
      return 0;
    }
    case "DRAW": {
      return 3;
    }
    case "WIN": {
      return 6;
    }
  }
}

function getYourShape([elfInput, outcome]: Game): Input {
  if (outcome === "DRAW") {
    return elfInput;
  }

  if (elfInput === "ROCK") {
    if (outcome === "LOSE") {
      return "SCISSORS";
    } else {
      return "PAPER";
    }
  } else if (elfInput === "PAPER") {
    if (outcome === "LOSE") {
      return "ROCK";
    } else {
      return "SCISSORS";
    }
  } else if (elfInput === "SCISSORS") {
    if (outcome === "LOSE") {
      return "PAPER";
    } else {
      return "ROCK";
    }
  }
}

function getRoundScore(game: Game): number {
  const yourShape = getYourShape(game);
  return getShapeScore(yourShape) + getOutcomeScore(game[1]);
}

function getTotalScore(
  encryptedGames: [EncryptedElfInput, EncryptedOutcome][]
): number {
  const games = encryptedGames.map((game) => decryptGame(game));
  const roundScores = games.map((game) => getRoundScore(game));

  return roundScores.reduce((acc, score) => acc + score, 0);
}

assert.strictEqual(
  getTotalScore([
    ["A", "Y"],
    ["B", "X"],
    ["C", "Z"],
  ]),
  12
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day2_2", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const input = data
      .trim()
      .split("\n")
      .map((x) => x.split(" "));
    console.log(
      getTotalScore(input as [EncryptedElfInput, EncryptedOutcome][])
    );
  }
);
