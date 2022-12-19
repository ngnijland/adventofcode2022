import fs from "fs";
import assert from "assert";
import path from "path";

function getStartOfPacket(datastream: string): number {
  for (let i = 3; i < datastream.length; i++) {
    const firstFour = datastream.slice(i - 3, i + 1);

    if (new Set(firstFour).size === 4) {
      return i + 1;
    }
  }

  throw new Error("No unique four characters");
}

assert.strictEqual(getStartOfPacket("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 7);
assert.strictEqual(getStartOfPacket("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
assert.strictEqual(getStartOfPacket("nppdvjthqldpwncqszvftbrmjlhg"), 6);
assert.strictEqual(getStartOfPacket("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
assert.strictEqual(getStartOfPacket("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day6_1", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const input = data.trim();
    console.log(getStartOfPacket(input));
  }
);
