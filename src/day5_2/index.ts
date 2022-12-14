import fs from "fs";
import assert from "assert";
import path from "path";

function getTopCrates(
  stacks: string[][],
  moves: [number, number, number][]
): string {
  for (let i = 0; i < moves.length; i++) {
    const [amount, from, to] = moves[i];

    const slice = stacks[from - 1].length - amount;
    const cratesToMove = stacks[from - 1].slice(slice);

    stacks[from - 1] = stacks[from - 1].slice(0, slice);
    stacks[to - 1].push(...cratesToMove);
  }

  return stacks.map((stack) => stack[stack.length - 1]).join("");
}

assert.strictEqual(
  getTopCrates(
    [["Z", "N"], ["M", "C", "D"], ["P"]],
    [
      [1, 2, 1],
      [3, 1, 3],
      [2, 2, 1],
      [1, 1, 2],
    ]
  ),
  "MCD"
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day5_2", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const [stacksString, movesString] = data.trim().split("\n\n");

    const stacks = stacksString.split("\n").reduceRight((acc, layer) => {
      let stack = [...acc];

      layer.split("").forEach((x, index) => {
        if (x !== "[" && x !== "]" && x !== " ") {
          const stackIndex = (index - 1) / 4;

          if (typeof stack[stackIndex] === "undefined") {
            stack[stackIndex] = [];
          }

          stack[stackIndex].push(x);
        }
      });

      return stack;
    }, []);

    const moves = movesString.split("\n").map((x) =>
      x
        .split(" ")
        .map((x) => Number(x))
        .filter((x) => !isNaN(x))
    );

    console.log(getTopCrates(stacks, moves as [number, number, number][]));
  }
);
