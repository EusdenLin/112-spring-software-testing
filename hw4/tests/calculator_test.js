const assert = require('assert');
const { test } = require('node:test');

const Calculator = require('../src/calculator');
const { isTypedArray } = require('util/types');

// TODO: write your test cases here to kill mutants
test("Invalid month1", () => {
    assert.throws(()=>{
        Calculator.main(0, 18, 6, 18, 2024)}, new Error("invalid month1"));
    assert.throws(()=>{
        Calculator.main(13, 18, 6, 18, 2024)}, new Error("invalid month1"));

    assert.doesNotThrow(() => {
        const result = Calculator.main(12, 17, 12, 18, 2024);
        assert.strictEqual(result, 1);
    });
});

test("Invalid month2", () => {
    assert.throws(()=>{
        Calculator.main(6, 17, 0, 18, 2024)}, new Error("invalid month2"));
    assert.throws(()=>{
        Calculator.main(6, 17, 14, 18, 2024)}, new Error("invalid month2"));

    assert.doesNotThrow(() => {
        const result = Calculator.main(1, 17, 1, 18, 2024);
        assert.strictEqual(result, 1);
    });
});
test("Invalid day1", () => {
    assert.throws(()=>{
        Calculator.main(6, 32, 6, 32, 2024)}, new Error("invalid day1"));
    assert.throws(()=>{
        Calculator.main(6, 0, 6, 18, 2024)}, new Error("invalid day1"));

    assert.doesNotThrow(() => {
        const result = Calculator.main(6, 1, 6, 31, 2024);
        assert.strictEqual(result, 30);
    });
});

test("Invalid day2", () => {
    assert.throws(()=>{
        Calculator.main(6, 17, 6, 32, 2024)}, new Error("invalid day2"));
    assert.throws(()=>{
        Calculator.main(6, 17, 6, 0, 2024)}, new Error("invalid day2"));

    assert.doesNotThrow(() => {
        const result = Calculator.main(5, 31, 6, 1, 2024);
        assert.strictEqual(result, 1);
    });
});

test("Invalid year", () => {
    assert.throws(()=>{
        Calculator.main(6, 17, 6, 18, 0)}, new Error("invalid year"));
    assert.throws(()=>{
        Calculator.main(6, 17, 6, 18, 10001)}, new Error("invalid year"));
    assert.doesNotThrow(() => {
        const result = Calculator.main(6, 17, 6, 18, 10000);
        assert.strictEqual(result, 1);
    });
    assert.doesNotThrow(() => {
        const result = Calculator.main(6, 17, 6, 18, 1);
        assert.strictEqual(result, 1);
    });
});

test("Day1 should not larger than Day2", () => {
    assert.throws(()=>{
        Calculator.main(6, 18, 6, 17, 2024)},
            new Error("day1 must be less than day2 if month1 is equal to month2"));
    assert.doesNotThrow(() => {
        const result = Calculator.main(6, 17, 6, 17, 2024);
        assert.strictEqual(result, 0);
    });
});

test("Month1 should not larger than Month2", () => {
    assert.throws(()=>{
        Calculator.main(7, 17, 6, 17, 2024)},
            new Error("month1 must be less than month2"));
    assert.doesNotThrow(() => {
        const result = Calculator.main(6, 17, 6, 17, 2024);
        assert.strictEqual(result, 0);
    });
});

test("Leap years", () => {
    assert.doesNotThrow(() => {
        const result = Calculator.main(2, 29, 3, 1, 2024);
        assert.strictEqual(result, 1);
    });
    assert.doesNotThrow(() => {
        const result = Calculator.main(2, 29, 3, 1, 500);
        assert.strictEqual(result, 0);
    });
    assert.doesNotThrow(() => {
        const result = Calculator.main(2, 29, 3, 1, 400);
        assert.strictEqual(result, 1);
    });
    assert.doesNotThrow(() => {
        const result = Calculator.main(2, 28, 3, 1, 2023);
        assert.strictEqual(result, 1);
    });
});

// 測試跨越多個月的計算
test("Test main valid date range spanning multiple months", () => {
    assert.doesNotThrow(() => {
        const result = Calculator.main(6, 18, 8, 18, 2024);
        assert.strictEqual(result, 61);
    });
});