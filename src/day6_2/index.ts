import fs from "fs";
import assert from "assert";
import path from "path";

function startOf(markerLength: number) {
  return function (datastream: string) {
    for (let i = markerLength - 1; i < datastream.length; i++) {
      const firstX = datastream.slice(i - markerLength + 1, i + 1);

      if (new Set(firstX).size === markerLength) {
        return i + 1;
      }
    }

    throw new Error(`No ${markerLength} distinct characters`);
  };
}

function getStartOfPacket(datastream: string): number {
  return startOf(4)(datastream);
}

function getStartOfMessage(datastream: string): number {
  return startOf(14)(datastream);
}

assert.strictEqual(getStartOfPacket("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 7);
assert.strictEqual(getStartOfPacket("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
assert.strictEqual(getStartOfPacket("nppdvjthqldpwncqszvftbrmjlhg"), 6);
assert.strictEqual(getStartOfPacket("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
assert.strictEqual(getStartOfPacket("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
assert.strictEqual(getStartOfMessage("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19);
assert.strictEqual(getStartOfMessage("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23);
assert.strictEqual(getStartOfMessage("nppdvjthqldpwncqszvftbrmjlhg"), 23);
assert.strictEqual(getStartOfMessage("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 29);
assert.strictEqual(getStartOfMessage("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 26);

fs.readFile(
  path.join(__dirname, "..", "..", "src", "day6_2", "input"),
  "utf8",
  function (err: NodeJS.ErrnoException, data: string) {
    if (err) throw err;

    const input = data.trim();
    console.log(getStartOfMessage(input));
  }
);
