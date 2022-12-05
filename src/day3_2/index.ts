import fs from "fs";
import assert from "assert";
import path from "path";

function getCommonItemType(
  items1: string,
  items2: string,
  items3: string
): string {
  for (let i = 0; i < items1.length; i++) {
    for (let j = 0; j < items2.length; j++) {
      for (let k = 0; k < items3.length; k++) {
        const item1 = items1[i];
        const item2 = items2[j];
        const item3 = items3[k];

        if (item1 === item2 && item2 === item3) {
          return item1;
        }
      }
    }
  }
}

function getPriority(itemType: string): number {
  const charCode = itemType.charCodeAt(0);

  if (charCode >= 65 && charCode <= 90) {
    return charCode - 38;
  }

  if (charCode >= 97 && charCode <= 122) {
    return charCode - 96;
  }

  throw new Error("Invalid character");
}

function getPrioritySum(contents: string[]): number {
  let prioritySum = 0;

  for (let i = 0; i < contents.length; i = i + 3) {
    const commonItemType = getCommonItemType(
      contents[i],
      contents[i + 1],
      contents[i + 2]
    );

    prioritySum = prioritySum + getPriority(commonItemType);
  }

  return prioritySum;
}

assert.strictEqual(
  getPrioritySum([
    "vJrwpWtwJgWrhcsFMMfFFhFp",
    "jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL",
    "PmmdzqPrVvPwwTWBwg",
    "wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn",
    "ttgJtRGJQctTZtZT",
    "CrZsJsPPZsGzwwsLwLmpwMDw",
  ]),
  70
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day3_2", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const input = data.trim().split("\n");
    console.log(getPrioritySum(input));
  }
);
