import fs from "fs";
import assert from "assert";
import path from "path";

type ElfInput = "A" | "B" | "C";
type YourInput = "X" | "Y" | "Z";

type Input = "ROCK" | "PAPER" | "SCISSORS";

function decryptInput(input: ElfInput | YourInput): Input {
  switch (input) {
    case "A":
    case "X": {
      return "ROCK";
    }
    case "B":
    case "Y": {
      return "PAPER";
    }
    case "C":
    case "Z": {
      return "SCISSORS";
    }
    default: {
      throw new Error("Invalid input");
    }
  }
}

function decryptGame([elfInput, yourInput]: [ElfInput, YourInput]): [
  Input,
  Input
] {
  return [decryptInput(elfInput), decryptInput(yourInput)];
}

function shapeScore(shape: Input): 1 | 2 | 3 {
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

function gameScore([elfInput, yourInput]: [Input, Input]): number {
  if (elfInput === yourInput) {
    return 3;
  }

  if (
    (elfInput === "ROCK" && yourInput === "PAPER") ||
    (elfInput === "PAPER" && yourInput === "SCISSORS") ||
    (elfInput === "SCISSORS" && yourInput === "ROCK")
  ) {
    return 6;
  }

  return 0;
}

function getRoundScore(game: [Input, Input]): number {
  return shapeScore(game[1]) + gameScore(game);
}

function getTotalScore(encryptedGames: [ElfInput, YourInput][]): number {
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
  15
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day2_1", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const input = data
      .trim()
      .split("\n")
      .map((x) => x.split(" "));
    console.log(getTotalScore(input as [ElfInput, YourInput][]));
  }
);
