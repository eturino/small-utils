import { forEachInSequence, mapInSequence } from "..";

describe("forEachInSequence", () => {
  it("should run a function on each item in a sequence, not returning", async () => {
    const sequence = [1, 2, 3];
    const spy = [] as number[];
    await forEachInSequence(sequence, async (item) => {
      spy.push(item + 1);
    });
    expect(spy).toEqual([2, 3, 4]);
  });
});

describe("mapInSequence, returning", () => {
  it("should run a function on each item in a sequence", async () => {
    const sequence = [1, 2, 3];
    const result = await mapInSequence(sequence, (item) => Promise.resolve(item + 1));
    expect(result).toEqual([2, 3, 4]);
  });
});
