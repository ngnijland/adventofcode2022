import fs from "fs";
import assert from "assert";
import path from "path";

function getCommonItemType(items: string): string {
  const compartment1 = items.slice(0, items.length / 2);
  const compartment2 = items.slice(items.length / 2);

  for (let i = 0; i < compartment1.length; i++) {
    for (let j = 0; j < compartment2.length; j++) {
      const item1 = compartment1[i];
      const item2 = compartment2[j];

      if (item1 === item2) {
        return compartment1[i];
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
  const commonItemTypes = contents.map((content) => {
    const commonType = getCommonItemType(content);
    const priority = getPriority(commonType);

    return priority;
  });

  return commonItemTypes.reduce((acc, x) => acc + x, 0);
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
  157
);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day3_1", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const input = data.trim().split("\n");
    console.log(getPrioritySum(input));
  }
);
