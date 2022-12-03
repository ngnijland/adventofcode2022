import fs from "fs";
import assert from "assert";
import path from "path";

type ElvesWithFood = number[][];

function caloriesSum(calories: number[]): number {
  return calories.reduce((acc, x) => acc + x, 0);
}

function getMostCalories(elvesWithFood: ElvesWithFood): number {
  const caloriesPerElf = elvesWithFood.flatMap((calories) =>
    caloriesSum(calories)
  );

  const mostCalories = caloriesPerElf.reduce(
    (acc, calories) => {
      const newMostCalories = [...acc];

      const leastCalories = Math.min(...acc);

      if (calories > leastCalories) {
        newMostCalories[acc.indexOf(leastCalories)] = calories;
      }

      return newMostCalories;
    },
    [0, 0, 0]
  );

  return caloriesSum(mostCalories);
}

assert.strictEqual(
  getMostCalories([
    [1000, 2000, 3000],
    [4000],
    [5000, 6000],
    [7000, 8000, 9000],
    [10000],
  ]),
  45000
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day1_2", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const input = data
      .trim()
      .split("\n\n")
      .map((x) => x.split("\n").map((y) => parseInt(y, 10)));
    console.log(getMostCalories(input));
  }
);
