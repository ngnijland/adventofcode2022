import fs from "fs";
import assert from "assert";
import path from "path";

function caloriesSum(calories: number[]): number {
  return calories.reduce((acc, x) => acc + x, 0);
}

function getMostCalories(elvesWithFood: number[][]): number {
  const caloriesPerElf = elvesWithFood.flatMap((calories) =>
    caloriesSum(calories)
  );

  return Math.max(...caloriesPerElf);
}

assert.strictEqual(
  getMostCalories([
    [1000, 2000, 3000],
    [4000],
    [5000, 6000],
    [7000, 8000, 9000],
    [10000],
  ]),
  24000
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day1_1", "input"),
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
