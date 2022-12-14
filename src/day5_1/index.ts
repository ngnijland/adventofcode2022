import fs from "fs";
import assert from "assert";
import path from "path";

function getTopCrates(
  stacks: string[][],
  moves: [number, number, number][]
): string {
  for (let i = 0; i < moves.length; i++) {
    const [amount, from, to] = moves[i];
    for (let j = 0; j < amount; j++) {
      const crate = stacks[from - 1].pop();
      stacks[to - 1].push(crate);
    }
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
  "CMZ"
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day5_1", "input"),
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
